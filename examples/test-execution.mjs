import assert from 'node:assert/strict';
import {createDocklineBridge} from '@jalsoedesign/portline-dockline';
import {HeidiSqlProfileSource} from '../packages/core/dist/index.js';

const source = HeidiSqlProfileSource.fromSessions({id: 'fixture', application: 'heidisql'}, [{
    name: 'site', settings: {
        Host: 'database.internal', User: 'database-user', NetType: '2',
        SSHtunnelHost: 'ssh.example', SSHtunnelUser: 'alice',
    },
}]);
const bridge = createDocklineBridge({source});
const options = {password: 'fixture-password', hostFingerprint: 'SHA256:' + 'A'.repeat(43)};
const config = await bridge.toSshConfig('site', {...options, connectionId: 'ssh'});
assert.equal(config.host, 'ssh.example');
assert.equal(config.username, 'alice');
await assert.rejects(bridge.toSshConfig('site', {...options, connectionId: 'database'}), /SSH|unsupported|capability/i);
console.log('HeidiSQL SSH endpoint selected independently of its database endpoint.');
