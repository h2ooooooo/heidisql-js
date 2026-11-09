---
layout: home
hero:
  name: HeidiSQL JS
  text: Reuse saved database and tunnel settings.
  tagline: Bring HeidiSQL connection settings into code and terminal commands.
  actions:
    - theme: brand
      text: API documentation
      link: /api/
    - theme: alt
      text: CLI documentation
      link: /cli/
---

Source code: [GitHub repository](https://github.com/h2ooooooo/heidisql-js).

HeidiSQL already stores the database endpoint and, when configured, the SSH tunnel used to reach it. HeidiSQL JS lets scripts read those saved settings without keeping another connection configuration. Inspect the database and tunnel separately, find the required profile, or preview a supported settings change.

[How it works](/guide/how-it-works) explains where settings are read, how the native format is interpreted and what happens on the host.

## Start with a working example

| Goal | Start here |
| --- | --- |
| Read settings from code | [API quick start with output](/api/quick-start) |
| Inspect settings from a terminal | [CLI quick start with output](/cli/quick-start) |
| Try everything without installed settings | [Synthetic fixtures](/guide/fixtures) |
| Preview a supported settings change | [Preview, review and apply](/guide/writing) |
| Separate database and SSH authentication | [Tunnel example](/guide/tunnels) |

## What the library does

Read portable typed settings, registry exports or the live Windows registry. Database endpoints and SSH tunnels remain separate, with independent authentication metadata.

Read operations describe saved metadata without opening a remote session. Use [Dockline](https://h2ooooooo.github.io/dockline/) for transfers/SSH and [Dockline Keys](https://h2ooooooo.github.io/dockline/keys/) for key loading and conversion. SQL queries and database import/export require a separate database implementation.

Part of the [Portline family](https://h2ooooooo.github.io/portline/libraries/), with each application library maintained in its own repository.

## Reuse a saved connection

[Connect a selected profile](/api/integration) through the optional shared Portline–Dockline integration. Use the same scoped execution API across application readers while keeping native parsing and metadata queries free of transport dependencies.
