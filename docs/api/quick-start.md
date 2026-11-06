# API quick start

Read saved sessions, select one by exact path and search connection metadata. This example uses synthetic settings on the host and does not connect to a server.

## Install

```sh
npm install @jalsoedesign/heidisql-core
```

Use Node.js 22.22.2 or newer. Follow [language setup](/guide/examples) for TypeScript tooling and JavaScript module configuration.

## Save the fixture

Save <a href="/examples/fixtures/portable_settings.txt" download="portable_settings.txt"><code>portable_settings.txt</code></a> at the shown path.

::: details Fixture contents

```text
Servers\Demo\Host	1	127.0.0.1
Servers\Demo\User	1	analyst
Servers\Demo\NetType	3	2
Servers\Demo\SSHtunnelHost	1	127.0.0.1
Servers\Demo\SSHtunnelUser	1	deploy
Servers\Demo\SSHtunnelPrivateKey	1	C:\keys\example.ppk
```

:::

Download the file to preserve the actual tab delimiters.

## Read the settings

Save the selected language tab as `read-sessions.ts` or its matching variant, beside the fixture.

::: code-group

```ts [TypeScript]
// read-sessions.ts
import {HeidiSqlProfileSource} from '@jalsoedesign/heidisql-core';

const source = await HeidiSqlProfileSource.fromFile(process.argv[2] ?? './portable_settings.txt');

const profiles = source.list();
const selected = source.get('Demo');

if (!selected) {
    throw new Error('The demo profile is missing');
}

console.log('Profiles: ' + profiles.length);
console.log('Selected: ' + selected.path);

for (const connection of selected.connections) {
    console.log(connection.id + ': ' + connection.protocol + ' ' + connection.endpoint.host + ':' + connection.endpoint.port);
}

console.log('Host matches: ' + source.search('127.0.0.1', {fields: 'all'}).length);
console.log('Metadata only: no server connection.');
```

```js [JavaScript]
// read-sessions.js
import {HeidiSqlProfileSource} from '@jalsoedesign/heidisql-core';

const source = await HeidiSqlProfileSource.fromFile(process.argv[2] ?? './portable_settings.txt');

const profiles = source.list();
const selected = source.get('Demo');

if (!selected) {
    throw new Error('The demo profile is missing');
}

console.log('Profiles: ' + profiles.length);
console.log('Selected: ' + selected.path);

for (const connection of selected.connections) {
    console.log(connection.id + ': ' + connection.protocol + ' ' + connection.endpoint.host + ':' + connection.endpoint.port);
}

console.log('Host matches: ' + source.search('127.0.0.1', {fields: 'all'}).length);
console.log('Metadata only: no server connection.');
```

```js [MJS]
// read-sessions.mjs
import {HeidiSqlProfileSource} from '@jalsoedesign/heidisql-core';

const source = await HeidiSqlProfileSource.fromFile(process.argv[2] ?? './portable_settings.txt');

const profiles = source.list();
const selected = source.get('Demo');

if (!selected) {
    throw new Error('The demo profile is missing');
}

console.log('Profiles: ' + profiles.length);
console.log('Selected: ' + selected.path);

for (const connection of selected.connections) {
    console.log(connection.id + ': ' + connection.protocol + ' ' + connection.endpoint.host + ':' + connection.endpoint.port);
}

console.log('Host matches: ' + source.search('127.0.0.1', {fields: 'all'}).length);
console.log('Metadata only: no server connection.');
```

```js [CommonJS]
// read-sessions.cjs
async function main() {
    const {HeidiSqlProfileSource} = await import('@jalsoedesign/heidisql-core');

    const source = await HeidiSqlProfileSource.fromFile(process.argv[2] ?? './portable_settings.txt');

    const profiles = source.list();
    const selected = source.get('Demo');

    if (!selected) {
        throw new Error('The demo profile is missing');
    }

    console.log('Profiles: ' + profiles.length);
    console.log('Selected: ' + selected.path);

    for (const connection of selected.connections) {
        console.log(connection.id + ': ' + connection.protocol + ' ' + connection.endpoint.host + ':' + connection.endpoint.port);
    }

    console.log('Host matches: ' + source.search('127.0.0.1', {fields: 'all'}).length);
    console.log('Metadata only: no server connection.');
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
npx tsx read-sessions.ts
```

```sh [JavaScript]
node read-sessions.js
```

```sh [MJS]
node read-sessions.mjs
```

```sh [CommonJS]
node read-sessions.cjs
```

:::

### Output

```text
Profiles: 1
Selected: Demo
database: mysql 127.0.0.1:3306
ssh: ssh 127.0.0.1:22
Host matches: 1
Metadata only: no server connection.
```

Download: <a href="/examples/read-sessions.ts" download="read-sessions.ts">TypeScript</a> · <a href="/examples/read-sessions.js" download="read-sessions.js">JavaScript</a> · <a href="/examples/read-sessions.mjs" download="read-sessions.mjs">MJS</a> · <a href="/examples/read-sessions.cjs" download="read-sessions.cjs">CommonJS</a>

## Continue by task

Continue with [profile queries](/api/profiles), [storage and discovery](/guide/storage), or [previewing a change](/guide/writing). Validation, unsupported settings and source lifetimes are explained in the corresponding guides and [API reference](/reference/api).
