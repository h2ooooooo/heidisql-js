import path from 'node:path';
import type {ConnectionDefinition, SourceReference} from '@jalsoedesign/portline-abstract';
import {
    NativeProfileSource, credential, discoverNativeSources, exists, fileSource, nativeProfile,
    parseRegistryExport, port, privateKey, readText, registrySource, requireSource, text, windowsRegistry,
} from '@jalsoedesign/portline-platform';
import type {NativeDiscoveryOptions, NativeSession, NativeValue, RegistryReader} from '@jalsoedesign/portline-platform';

const registryKey = 'HKCU\\Software\\HeidiSQL\\Servers';

export function parseHeidiSqlPortable(contents: string): NativeSession[] {
    const sessions = new Map<string, Record<string, NativeValue>>();

    for (const line of contents.split(/\r?\n/)) {
        const fields = line.split('\t');

        if (fields.length !== 3 || !fields[0].startsWith('Servers\\')) {
            continue;
        }

        const separator = fields[0].lastIndexOf('\\');
        const name = fields[0].slice(8, separator);
        const property = fields[0].slice(separator + 1);
        const settings = sessions.get(name) ?? Object.create(null);

        settings[property] = fields[1] === '3' ? Number(fields[2]) : fields[2];
        sessions.set(name, settings);
    }

    return [...sessions].map(([name, settings]) => ({name, settings}));
}

/** HeidiSQL's historical obfuscation is decoded only on explicit credential access. */
export function decodeHeidiSqlPassword(value: string): string | undefined {
    if (!value) {
        return '';
    }

    const unicode = value.endsWith('0');
    const encoded = unicode ? value.slice(0, -1) : value;
    const salt = Number(encoded.slice(-1));
    const width = unicode ? 4 : 2;
    const digits = encoded.slice(0, -1);

    if (!/^[1-9]$/.test(encoded.slice(-1)) || digits.length % width || !/^[a-f\d]*$/i.test(digits)) {
        return undefined;
    }

    let result = '';

    for (let index = 0; index < digits.length; index += width) {
        const number = parseInt(digits.slice(index, index + width), 16) - salt;
        const code = number < 0 ? number + (unicode ? 65536 : 255) : number;

        result += String.fromCharCode(code);
    }

    return result;
}

function heidiPasswordState(value: string) {
    if (!value) {
        return 'not-stored';
    }

    const unicode = value.endsWith('0');
    const encoded = unicode ? value.slice(0, -1) : value;
    const digits = encoded.slice(0, -1);

    return /^[1-9]$/.test(encoded.slice(-1)) && digits.length % (unicode ? 4 : 2) === 0 &&
        /^[a-f\d]*$/i.test(digits) ? 'available' : 'unsupported';
}

export class HeidiSqlProfileSource extends NativeProfileSource {
    public static fromSessions(source: SourceReference, sessions: readonly NativeSession[]) {
        const profiles = sessions.filter(session => text(session.settings, 'Folder') !== '1' &&
            text(session.settings, 'Host')).map(session => {
            const settings = session.settings;
            const netType = Number(text(settings, 'NetType', '0'));
            const mysql = [0, 1, 2, 11, 16].includes(netType);
            const pgsql = [8, 9].includes(netType);
            const mssql = [3, 4, 5, 6, 7].includes(netType);
            const protocol = mysql ? 'mysql' : pgsql ? 'postgresql' : mssql ? 'mssql' :
                [10, 17].includes(netType) ? 'sqlite' : 'native-' + netType;
            const defaultTunnel = [2, 9, 16].includes(netType);
            const active = text(settings, 'SSHtunnelActive');
            const tunnel = active === '1' || ((!active || active === '-1') && defaultTunnel);
            const tcp = [0, 2, 4, 8, 9, 11, 12, 14, 16].includes(netType);
            const connections: ConnectionDefinition[] = [{
                id: 'database',
                ...(tcp ? {kind: 'database' as const, database: text(settings, 'Databases')} :
                    {kind: 'unsupported' as const}),
                protocol,
                endpoint: {
                    host: text(settings, 'Host'),
                    port: tcp ? port(text(settings, 'Port'), pgsql ? 5432 : mssql ? 1433 :
                        [12, 14].includes(netType) ? 3050 : 3306) : 0,
                    username: text(settings, 'User'),
                },
                authentication: [{
                    type: 'password',
                    credential: credential(source, JSON.stringify([session.name, 'primary']), heidiPasswordState(text(settings, 'Password'))),
                }],
                via: tunnel ? ['ssh'] : undefined,
            }];

            if (tunnel) {
                connections.push({
                    id: 'ssh',
                    kind: 'ssh',
                    protocol: 'ssh',
                    endpoint: {
                        host: text(settings, 'SSHtunnelHost', text(settings, 'Host')),
                        port: port(text(settings, 'SSHtunnelHostPort'), 22),
                        username: text(settings, 'SSHtunnelUser'),
                    },
                    authentication: [
                        ...privateKey(text(settings, 'SSHtunnelPrivateKey')),
                        {
                            type: 'password',
                            credential: credential(source, JSON.stringify([session.name, 'ssh']),
                                heidiPasswordState(text(settings, 'SSHtunnelPassword'))),
                        },
                    ],
                });
            }

            return {...nativeProfile(source, session.name, connections),
                diagnostics: tcp ? [] : [{code: 'native-non-tcp-database', severity: 'warning' as const,
                    message: 'Local, named-pipe or unknown database transport requires native handling'}]};
        });

        const snapshot = new Map(sessions.map(session => [session.name, structuredClone(session.settings)]));

        return new HeidiSqlProfileSource(source, profiles, sessions, async reference => {
            const [name, connection] = JSON.parse(reference.id);
            const tunnel = connection === 'ssh';
            const settings = snapshot.get(name);

            if (!settings) {
                return {state: 'unavailable'};
            }

            const value = decodeHeidiSqlPassword(text(settings, tunnel ? 'SSHtunnelPassword' : 'Password'));

            return value === undefined ? {state: 'unsupported'} : {state: 'available', value};
        });
    }

    public static async fromFile(filename: string) {
        const contents = await readText(filename);
        const sessions = /^\s*(Windows Registry Editor|REGEDIT4)/.test(contents) ?
            parseRegistryExport(contents, registryKey) : parseHeidiSqlPortable(contents);

        return HeidiSqlProfileSource.fromSessions(fileSource('heidisql', filename), sessions);
    }

    public static async fromRegistry(
        key = registryKey,
        reader: RegistryReader = windowsRegistry,
        view: '32' | '64' | 'default' = 'default',
    ) {
        const source = registrySource('heidisql', key, view);

        return HeidiSqlProfileSource.fromSessions(source, await reader.read(source.storage![0] as Parameters<RegistryReader['read']>[0]));
    }

    public static async discover(options: NativeDiscoveryOptions = {}) {
        return discoverNativeSources({
            application: 'heidisql',
            registryKey,
            processNames: ['heidisql.exe'],
            portableNames: ['portable_settings.txt'],
            defaultDirectories: [
                path.join(process.env.ProgramFiles ?? 'C:\\Program Files', 'HeidiSQL'),
                path.join(process.env['ProgramFiles(x86)'] ?? 'C:\\Program Files (x86)', 'HeidiSQL'),
            ],
            async forExecutable(executable, registry) {
                const override = executable.arguments.find(argument => /^--?psettings=/i.test(argument));
                const filename = override ? override.slice(override.indexOf('=') + 1) :
                    path.join(path.dirname(executable.executablePath), 'portable_settings.txt');

                if (!path.isAbsolute(filename)) {
                    // A process working directory cannot be inferred from its executable.
                    return undefined;
                }

                if (await exists(filename)) {
                    return fileSource('heidisql', filename);
                }

                if (await exists(path.join(path.dirname(executable.executablePath), 'portable.lock'))) {
                    return undefined;
                }

                return registry;
            },
        }, options);
    }

    public static async open(options: NativeDiscoveryOptions = {}) {
        const source = requireSource(await HeidiSqlProfileSource.discover(options));
        const storage = source.storage![0];

        if (storage.kind === 'directory') {
            throw new Error('HeidiSQL requires a portable settings file or registry source');
        }

        const result = storage.kind === 'registry' ? await HeidiSqlProfileSource.fromRegistry(
            storage.hive + '\\' + storage.key, options.registryReader, storage.view,
        ) : await HeidiSqlProfileSource.fromFile(storage.path);

        return new HeidiSqlProfileSource(source, result.list().map(profile => ({...profile, source})), result.list().map(profile => ({
            name: profile.id,
            settings: result.getNativeSettings(profile.id)!,
        })), reference => result.resolve(reference));
    }
}
export {HeidiSqlProfileSource as HeidiSQL};
export const discoverHeidiSqlSources = HeidiSqlProfileSource.discover;

export * from './writing.js';
