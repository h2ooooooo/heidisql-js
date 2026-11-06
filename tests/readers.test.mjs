import assert from 'node:assert/strict';
import {test} from 'node:test';
import {mkdtemp, mkdir, writeFile, rm} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

async function fixture(t) {
    const directory = await mkdtemp(path.join(os.tmpdir(), 'portline fixtures '));
    t.after(() => rm(directory, {recursive: true, force: true}));

    return directory;
}
function cli(args) {
    return spawnSync(process.execPath, ['packages/cli/bin/cli.js', ...args], {encoding: 'utf8'});
}
import {HeidiSqlProfileSource, decodeHeidiSqlPassword} from '../packages/core/dist/index.js';

test('portable settings separate database and SSH credentials and preserve native options', async t => {
    const directory = await fixture(t);
    const filename = path.join(directory, 'portable_settings.txt');
    const settings = {
        Host: 'database.internal', User: 'dbuser', Password: '71781', Port: 3307,
        NetType: 2, SSHtunnelHost: 'gateway.example', SSHtunnelHostPort: 2222,
        SSHtunnelUser: 'deploy', SSHtunnelPrivateKey: 'C:\\keys\\id.ppk',
        SSHtunnelPassword: '71781', Extension: 'retained',
    };
    await writeFile(filename, Object.entries(settings).map(([key, value]) =>
        'Servers\\folder\\work\\' + key + '\t' + (typeof value === 'number' ? 3 : 1) + '\t' + value).join('\r\n'));
    const source = await HeidiSqlProfileSource.open({file: filename});
    const profile = source.get('folder/work');

    assert.equal(profile.connections[0].protocol, 'mysql');
    assert.deepEqual(profile.connections[0].via, ['ssh']);
    assert.equal(profile.connections[1].endpoint.host, 'gateway.example');
    assert.equal(profile.connections[1].authentication[0].path.value, 'C:\\keys\\id.ppk');
    assert.equal(source.getNativeSettings('folder\\work').Extension, 'retained');
    assert.ok(!JSON.stringify(profile).includes('71781'));
    assert.equal(decodeHeidiSqlPassword('71781'), 'pw');
    assert.equal(decodeHeidiSqlPassword('6F2420'), '漢');
    assert.equal(decodeHeidiSqlPassword('invalid'), undefined);
    assert.deepEqual(await source.resolve(profile.connections[0].authentication[0].credential), {state: 'available', value: 'pw'});
    assert.deepEqual(await source.resolve(profile.connections[1].authentication[1].credential), {state: 'available', value: 'pw'});
    const hidden = cli(['search', 'work', '--file', filename]);
    const revealed = cli(['get', 'folder/work', '--file', filename, '--show-password', '--json']);

    assert.equal(hidden.status, 0, hidden.stderr);
    assert.match(hidden.stdout, /\(hidden\*\)/);
    assert.match(hidden.stdout, /Enable passwords with --show-password/);
    assert.equal(JSON.parse(revealed.stdout).password, 'pw');
});

test('running portable override wins over installed registry and reports version', async t => {
    const directory = await fixture(t);
    const filename = path.join(directory, 'custom settings.txt');
    await writeFile(filename, '');
    const result = await HeidiSqlProfileSource.discover({
        platform: 'win32',
        registryReader: {exists: async () => true, read: async () => []},
        processReader: {list: async () => [{
            executablePath: path.join(directory, 'heidisql.exe'),
            applicationVersion: '12.0',
            arguments: ['--psettings=' + filename],
        }]},
    });

    assert.equal(result.selectedBy, 'running-application');
    assert.equal(result.candidates.find(item => item.id === result.selectedSourceId).location, filename);
});

test('invalid options fail as parseable JSON', () => {
    const result = cli(['list', '--registry-view', 'wrong', '--json']);

    assert.equal(result.status, 1);
    assert.match(JSON.parse(result.stderr).error, /Registry view/);
});
