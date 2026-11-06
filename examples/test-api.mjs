import assert from 'node:assert/strict';
import {mkdtemp, mkdir, writeFile, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {HeidiSqlProfileSource} from '@jalsoedesign/heidisql-core';

const files = {
    "portable_settings.txt": "Servers\\Demo\\Host\t1\t127.0.0.1\nServers\\Demo\\User\t1\tanalyst\nServers\\Demo\\NetType\t3\t2\nServers\\Demo\\SSHtunnelHost\t1\t127.0.0.1\nServers\\Demo\\SSHtunnelUser\t1\tdeploy\nServers\\Demo\\SSHtunnelPrivateKey\t1\tC:\\keys\\example.ppk"
};
const directory = await mkdtemp(path.join(tmpdir(), 'profile-api-demo-'));

try {
    for (const [name, contents] of Object.entries(files)) {
        const target = path.join(directory, name);

        await mkdir(path.dirname(target), {recursive: true});
        await writeFile(target, contents);
    }

    const source = await HeidiSqlProfileSource.fromFile(path.join(directory, 'portable_settings.txt'));
    const profiles = source.list();

    assert.ok(profiles.length > 0);

    for (const profile of profiles) {
        const connections = profile.connections.map(connection => ({
            protocol: connection.protocol,
            host: connection.endpoint?.host ?? null,
        }));

        console.log(JSON.stringify({path: profile.path, connections}));
    }

    const selected = source.get(profiles[0].path);
    const matches = source.search('127.0.0.1', {fields: 'all'});

    assert.equal(selected.path, profiles[0].path);
    assert.ok(matches.length > 0);
    console.log('Exact selection:', selected.path);
    console.log('Host matches:', matches.length);
    console.log('Metadata only; no remote connection.');
} finally {
    await rm(directory, {recursive: true, force: true});
    console.log('Temporary files removed.');
}
