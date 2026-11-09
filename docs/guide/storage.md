# Storage and discovery

The recipes below use `HeidiSqlProfileSource` imported from the library as in the [API quick start](/api/quick-start). These are contextual recipes for explicitly selected native storage, rather than independent runnable files.

Read native Windows registry sessions, .reg exports or typed `portable_settings.txt` files. Running portable configuration takes priority when discovery can establish its location; an explicit source always wins. Database and SSH credentials remain separate.

## Discover before selecting

::: code-group

```ts [TypeScript]
import {HeidiSqlProfileSource} from '@jalsoedesign/heidisql-core';

const discovery = await HeidiSqlProfileSource.discover();
console.log(discovery.candidates, discovery.selectedSourceId, discovery.diagnostics);
```

```js [JavaScript]
import {HeidiSqlProfileSource} from '@jalsoedesign/heidisql-core';

const discovery = await HeidiSqlProfileSource.discover();
console.log(discovery.candidates, discovery.selectedSourceId, discovery.diagnostics);
```

```js [MJS]
import {HeidiSqlProfileSource} from '@jalsoedesign/heidisql-core';

const discovery = await HeidiSqlProfileSource.discover();
console.log(discovery.candidates, discovery.selectedSourceId, discovery.diagnostics);
```

```js [CommonJS]
const {HeidiSqlProfileSource} = await import('@jalsoedesign/heidisql-core');

const discovery = await HeidiSqlProfileSource.discover();
console.log(discovery.candidates, discovery.selectedSourceId, discovery.diagnostics);
```

:::

Candidates carry source identity, storage kind and location, registry view where relevant, and an executable/version when discovery actually establishes them. An absent selected source means the caller must choose; it does not mean all candidates should be merged.

~~~sh
heidisql-js sources --json
heidisql-js list --source <source-id> --json
~~~

Use `open(options)` to apply discovery and open the selected source. Explicit source options take priority. Do not infer active storage or application version from an arbitrary file path.

## Native data and projection

A profile can contain a database connection plus an SSH connection referenced through via. Select the ssh connection when syncing only a tunnel endpoint to another SSH application. Supported writes cover TCP MySQL, PostgreSQL and MSSQL sessions with one SSH tunnel. Updating a database session from an SSH-only profile requires an existing destination database session. Running SQL, database export and import are outside this profile adapter.

`getNativeSettings(name)` is an explicit escape hatch for application-specific values. It can contain saved credentials and should not be serialized or logged as ordinary profile metadata.



## Discovery and database limits

Built-in live registry/process inspection requires Windows; .reg exports and typed portable settings can be read as files independently. For a running executable, discovery recognizes -psettings= or `--psettings`= with an absolute path. A relative override cannot be resolved from the executable's location and leaves the active source unresolved. Adjacent `portable_settings.txt` is recognized; a portable.lock marker without a readable portable file does not establish registry storage.

Database and SSH tunnel endpoints are independent. The native SSH port field is `SSHtunnelHostPort`; it is not the database Port field. The normalized writer supports the documented TCP MySQL/PostgreSQL/MSSQL projection and one SSH hop. Local, named-pipe, SQLite and unknown transports are not converted into executable TCP/SSH connections. Native SSL/driver/advanced settings do not become a universal database connection object. No SQL query, dump/import/export or live tunnel is performed.

Executable/version metadata is evidence from inspection when available, not a guarantee for every explicit path. Native session values remain separate from the normalized projection.

The existing-file probe establishes portable selection only when that file exists. With no readable portable file and no portable.lock evidence, the current executable probe can fall back to registry storage. This is discovery evidence rather than proof of every launcher override; choose the explicit native source when the running store cannot be established.

For an explicit live operation after selecting a profile, use [the shared connection walkthrough](/api/integration). Native-only execution requirements are represented as `unsupportedOptions`; reading a profile does not grant permission to discard them.
