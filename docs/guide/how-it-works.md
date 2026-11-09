# How HeidiSQL JS works

HeidiSQL JS reads saved database sessions and their SSH tunnel settings from storage on the host. Reading a profile does not open a database connection, create a tunnel or run a SQL query.

## Find the settings source

The Windows registry store is `HKCU\Software\HeidiSQL\Servers`. `HKCU` means `HKEY_CURRENT_USER`, the current Windows user's registry hive. A session named `Demo` has settings beneath `Servers\Demo`. Portable installations can use `portable_settings.txt`, and registry-export files can be read explicitly.

Discovery considers registry and portable candidates. For a running executable it checks an absolute `-psettings=` or `--psettings=` argument, or an adjacent `portable_settings.txt`. HeidiSQL documents the portable override in its [command-line help](https://www.heidisql.com/help.php#commandline). A relative override cannot be resolved from the executable path alone. A `portable.lock` marker without a readable settings file is not treated as evidence to switch to registry storage. Select a source explicitly when discovery is ambiguous.

Live registry reads enumerate the selected key on the host. File reads use the selected export or portable file; they do not query a remote Windows registry or the database server.

## Interpret HeidiSQL's native values

1. Read the selected registry key or file.
2. Parse a registry export or the portable file's tab-separated records.
3. Group portable `Servers\session\setting` records into saved sessions. The native type field distinguishes numeric and text values.
4. Interpret `NetType` and related fields to identify supported database transport and SSH tunnel settings.
5. Return profile metadata, credential references and diagnostics for native transports without a supported projection.

### A portable settings record

This synthetic record shows literal tab separators as `<TAB>`:

```text
Servers\Demo\NetType<TAB>3<TAB>2
```

| Stored part | Meaning |
| --- | --- |
| `Servers\Demo\NetType` | Setting `NetType` in session `Demo`. |
| `3` | Integer storage type; the final field is parsed as a number. Text records such as `Host` use type `1`. |
| `2` | The setting's value: `ntMySQL_SSHtunnel`, MariaDB/MySQL through an SSH tunnel. This is independent of the preceding storage type. |

HeidiSQL's [`TNetType` enum in `dbstructures.pas`](https://github.com/HeidiSQL/HeidiSQL/blob/master/source/dbstructures.pas) defines network-type values, including `0` for MySQL TCP/IP and `9` for PostgreSQL through SSH. Its [`TAppSettings.ImportSettings` and `ExportSettings` in `apphelpers.pas`](https://github.com/HeidiSQL/HeidiSQL/blob/master/source/apphelpers.pas) implement the three-field portable representation. The library's [`parseHeidiSqlPortable` definition](/reference/types#jalsoedesign-heidisql-core) describes the parser entry point.

### Database and SSH settings have different roles

For one synthetic session, these native fields map to two connections:

| Native fields | Normalized connection |
| --- | --- |
| `Host=db.internal.example`, `Port=3306`, `User=analyst` | `database`: MySQL endpoint and database username. |
| `SSHtunnelHost=ssh.example.test`, `SSHtunnelHostPort=22`, `SSHtunnelUser=deploy` | `ssh`: SSH endpoint and SSH username. |
| `NetType=2` with `SSHtunnelActive=1` | The database connection's `via` list contains `ssh`, the SSH connection ID. |

`SSHtunnelHostPort` is the server's SSH port. HeidiSQL's similarly named `SSHtunnelPort` is the local forwarding port and is not substituted for it. See HeidiSQL's [`TConnectionParameters.LoadFromRegistry` in `dbconnection.pas`](https://github.com/HeidiSQL/HeidiSQL/blob/master/source/dbconnection.pas) for the native field mapping, and the [tunnel example with output](/guide/tunnels) for the profile relationship.

## Handle credentials separately

Database and SSH tunnel passwords are independent stored values. Supported historical HeidiSQL obfuscation is decoded only during explicit credential resolution. Unsupported representations remain marked unsupported. A saved SSH private-key path refers to a file on the host; profile reading does not load or copy its contents. See the [credential-resolution API](/reference/api#read-a-source).

Native settings can contain stored credential representations, so inspect selected fields instead of logging an entire raw session.

## Use the result

A source is a snapshot; reopen it after native settings change. A database client is responsible for queries, imports and exports. An SSH implementation is responsible for a live tunnel and host verification.

Start with the [API example](/api/quick-start), [CLI example](/cli/quick-start) or [tunnel example](/guide/tunnels). [Profile writing](/guide/writing) is a separate preview/apply workflow with application, revision and lock checks.

## Shared execution after native interpretation

The source now exposes normalized execution details alongside metadata. `@jalsoedesign/portline-dockline` performs the shared mapping and delegates live sessions to optional Dockline clients. Native-only requirements appear in `unsupportedOptions`; they are refused rather than dropped. Read [the scoped source-to-session walkthrough](/api/integration) for supported operations and explicit trust/authentication options.
