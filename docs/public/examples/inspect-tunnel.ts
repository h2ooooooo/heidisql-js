// inspect-tunnel.ts
import {HeidiSqlProfileSource} from '@jalsoedesign/heidisql-core';

const source = await HeidiSqlProfileSource.fromFile(process.argv[2] ?? './portable_settings.txt');
const profile = source.get('Demo');
const database = profile?.connections.find(connection => connection.kind === 'database');
const ssh = profile?.connections.find(connection => connection.id === 'ssh');

if (!database || !ssh) {
    throw new Error('The fixture must contain a database connection and SSH tunnel');
}

console.log('Database: ' + database.protocol + ' ' + database.endpoint.host + ':' + database.endpoint.port);
console.log('SSH: ' + ssh.endpoint.host + ':' + ssh.endpoint.port);
console.log('Database via: ' + database.via?.join(', '));
console.log('SSH authentication: ' + ssh.authentication.map(method => method.type).join(', '));
console.log('No SQL query or SSH tunnel was opened.');
