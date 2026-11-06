# CLI quick start

List, search and select a synthetic saved session without reading installed settings or connecting to a server.

## Install

```sh
npm install --global @jalsoedesign/heidisql-cli
```

For project-local use, install without `--global` and prefix commands with `npm exec --`. See [runtime requirements](/guide/installation).

## Save the fixture

Use the [synthetic settings files](/guide/fixtures): <a href="/examples/fixtures/portable_settings.txt" download="portable_settings.txt"><code>portable_settings.txt</code></a>. Run from their parent working directory. The selected file is `./portable_settings.txt`. Key paths are illustrative metadata and require no key file.

## Get one property

```sh
heidisql-js get Demo host --file ./portable_settings.txt --json
```

Exit code: `0`.

Standard output:

```json
"127.0.0.1"
```

## List profiles

```sh
heidisql-js list --file ./portable_settings.txt --json
```

Exit code: `0`.

Standard output:

```json
[
  {
    "path": "Demo",
    "host": "127.0.0.1",
    "protocol": "mysql",
    "keyFile": "C:\\keys\\example.ppk",
    "remoteDirectory": ""
  }
]
```

## Continue by task

Use [query commands](/cli/queries) for coloured search output and JSON, or [writing commands](/cli/writing) for separate preview/apply operations. Contributor fixture runners live in [local demos](/guide/local-demo).
