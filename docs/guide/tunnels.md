# Database sessions and SSH tunnels

A HeidiSQL session can contain a database endpoint and a separate SSH connection. Their ports, usernames and credentials have different roles. A profile read describes the relationship without opening either connection.

## Inspect the relationship

Install `@jalsoedesign/heidisql-core`, follow [language setup](/guide/examples), and save the <a href="/examples/fixtures/portable_settings.txt" download="portable_settings.txt"><code>synthetic portable settings</code></a> beside the selected program variant.

::: code-group

```ts [TypeScript]
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
```

```js [JavaScript]
// inspect-tunnel.js
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
```

```js [MJS]
// inspect-tunnel.mjs
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
```

```js [CommonJS]
// inspect-tunnel.cjs
async function main() {
    const {HeidiSqlProfileSource} = await import('@jalsoedesign/heidisql-core');

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
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
```

:::

### Run it

::: code-group

```sh [TypeScript]
npx tsx inspect-tunnel.ts
```

```sh [JavaScript]
node inspect-tunnel.js
```

```sh [MJS]
node inspect-tunnel.mjs
```

```sh [CommonJS]
node inspect-tunnel.cjs
```

:::

### Output

```text
Database: mysql 127.0.0.1:3306
SSH: 127.0.0.1:22
Database via: ssh
SSH authentication: private-key, password
No SQL query or SSH tunnel was opened.
```

Download: <a href="/examples/inspect-tunnel.ts" download="inspect-tunnel.ts">TypeScript</a> · <a href="/examples/inspect-tunnel.js" download="inspect-tunnel.js">JavaScript</a> · <a href="/examples/inspect-tunnel.mjs" download="inspect-tunnel.mjs">MJS</a> · <a href="/examples/inspect-tunnel.cjs" download="inspect-tunnel.cjs">CommonJS</a>

The database's `via` list points to the SSH connection ID in the same profile. Select `ssh` when syncing only the tunnel endpoint to an SSH application. Password references for the database and tunnel are independent; a private-key path is a file on the host.

## What happens after a read

Use a database client to run SQL or import/export data. Use a suitable SSH implementation for tunnelling and host verification. This library supplies saved metadata; it does not run queries, dump databases or create a live tunnel.

See [supported projections](/guide/limitations), [connecting a selected profile](/api/integration) and [writing/sync](/guide/writing).
