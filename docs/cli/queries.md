---
outline: 2
---

# Query command examples

Inputs and outputs below were captured from the built command using synthetic settings. Colours preserve the executable's actual ANSI choices; JSON remains colour-free. These reference fixtures use example.invalid hosts and are separate from the 127.0.0.1 quick-start fixture. Placeholder fixture paths must be replaced with your local paths. No external server was contacted.

Start with the [CLI quick start](/cli/quick-start) for a complete fixture you can create and query immediately. See the [full output reference](/reference/cli-output) for every captured case.

## list (terminal)
```sh
heidisql-js list --file <fixture-directory>\portable_settings.txt --color
```

Exit code: 0.

### stdout

<pre class="cli-output" v-pre><code><span style="color:#72f088;">• </span>Demo (Private key: C:\keys\example.ppk)</code></pre>

## list (JSON)
```sh
heidisql-js list --file <fixture-directory>\portable_settings.txt --json
```

Exit code: 0.

### stdout

```json
[
  {
    "path": "Demo",
    "host": "db.example.invalid",
    "protocol": "mysql",
    "keyFile": "C:\\keys\\example.ppk",
    "remoteDirectory": ""
  }
]
```

## list (table)
```sh
heidisql-js list --file <fixture-directory>\portable_settings.txt --table --color
```

Exit code: 0.

### stdout

<pre class="cli-output" v-pre><code><span style="color:#76e3ea;">┌</span><span style="color:#76e3ea;">──────</span><span style="color:#76e3ea;">┬</span><span style="color:#76e3ea;">────────────────────</span><span style="color:#76e3ea;">┬</span><span style="color:#76e3ea;">──────────</span><span style="color:#76e3ea;">┬</span><span style="color:#76e3ea;">─────────────────────</span><span style="color:#76e3ea;">┬</span><span style="color:#76e3ea;">────────</span><span style="color:#76e3ea;">┐</span>
<span style="color:#76e3ea;">│</span> <span style="font-weight:700;"></span><span style="color:#f0f3f6;font-weight:700;">Path</span><span style="font-weight:700;"></span> <span style="color:#76e3ea;">│</span> <span style="font-weight:700;"></span><span style="color:#f0f3f6;font-weight:700;">Host              </span><span style="font-weight:700;"></span> <span style="color:#76e3ea;">│</span> <span style="font-weight:700;"></span><span style="color:#f0f3f6;font-weight:700;">Protocol</span><span style="font-weight:700;"></span> <span style="color:#76e3ea;">│</span> <span style="font-weight:700;"></span><span style="color:#f0f3f6;font-weight:700;">Private key        </span><span style="font-weight:700;"></span> <span style="color:#76e3ea;">│</span> <span style="font-weight:700;"></span><span style="color:#f0f3f6;font-weight:700;">Remote</span><span style="font-weight:700;"></span> <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">├</span><span style="color:#76e3ea;">──────</span><span style="color:#76e3ea;">┼</span><span style="color:#76e3ea;">────────────────────</span><span style="color:#76e3ea;">┼</span><span style="color:#76e3ea;">──────────</span><span style="color:#76e3ea;">┼</span><span style="color:#76e3ea;">─────────────────────</span><span style="color:#76e3ea;">┼</span><span style="color:#76e3ea;">────────</span><span style="color:#76e3ea;">┤</span>
<span style="color:#76e3ea;">│</span> Demo <span style="color:#76e3ea;">│</span> db.example.invalid <span style="color:#76e3ea;">│</span> mysql    <span style="color:#76e3ea;">│</span> C:\keys\example.ppk <span style="color:#76e3ea;">│</span>        <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">└</span><span style="color:#76e3ea;">──────</span><span style="color:#76e3ea;">┴</span><span style="color:#76e3ea;">────────────────────</span><span style="color:#76e3ea;">┴</span><span style="color:#76e3ea;">──────────</span><span style="color:#76e3ea;">┴</span><span style="color:#76e3ea;">─────────────────────</span><span style="color:#76e3ea;">┴</span><span style="color:#76e3ea;">────────</span><span style="color:#76e3ea;">┘</span></code></pre>

## search
```sh
heidisql-js search example --file <fixture-directory>\portable_settings.txt --color
```

Exit code: 0.

### stdout

<pre class="cli-output" v-pre><code>Found 1 profile

<span style="color:#76e3ea;">┌</span><span style="color:#76e3ea;">──────────────────</span><span style="color:#76e3ea;">┬</span><span style="color:#76e3ea;">─────────────────────────────────────────────────────────</span><span style="color:#76e3ea;">┐</span>
<span style="color:#76e3ea;">│</span> <span style="font-weight:700;"></span><span style="color:#f0f3f6;font-weight:700;">Label           </span><span style="font-weight:700;"></span> <span style="color:#76e3ea;">│</span> <span style="font-weight:700;"></span><span style="color:#f0f3f6;font-weight:700;">Value                                                  </span><span style="font-weight:700;"></span> <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">├</span><span style="color:#76e3ea;">──────────────────</span><span style="color:#76e3ea;">┼</span><span style="color:#76e3ea;">─────────────────────────────────────────────────────────</span><span style="color:#76e3ea;">┤</span>
<span style="color:#76e3ea;">│</span> Name             <span style="color:#76e3ea;">│</span> Demo                                                    <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Path             <span style="color:#76e3ea;">│</span> Demo                                                    <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Protocol         <span style="color:#76e3ea;">│</span> mysql                                                   <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Host             <span style="color:#76e3ea;">│</span> db.example.invalid                                      <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Port             <span style="color:#76e3ea;">│</span> 3306                                                    <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Username         <span style="color:#76e3ea;">│</span> analyst                                                 <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Password         <span style="color:#76e3ea;">│</span>                                                         <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Passphrase       <span style="color:#76e3ea;">│</span>                                                         <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Credential state <span style="color:#76e3ea;">│</span> not-stored                                              <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Authentication   <span style="color:#76e3ea;">│</span> database/password: not-stored; ssh/password: not-stored <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Private key      <span style="color:#76e3ea;">│</span> C:\keys\example.ppk                                     <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Remote           <span style="color:#76e3ea;">│</span>                                                         <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">└</span><span style="color:#76e3ea;">──────────────────</span><span style="color:#76e3ea;">┴</span><span style="color:#76e3ea;">─────────────────────────────────────────────────────────</span><span style="color:#76e3ea;">┘</span></code></pre>

## get (JSON)
```sh
heidisql-js get Demo --file <fixture-directory>\portable_settings.txt --json
```

Exit code: 0.

### stdout

```json
{
  "name": "Demo",
  "path": "Demo",
  "protocol": "mysql",
  "host": "db.example.invalid",
  "port": 3306,
  "user": "analyst",
  "password": "(hidden)",
  "passphrase": "(hidden)",
  "credentialState": "not-stored",
  "credentials": [
    {
      "connectionId": "database",
      "kind": "password",
      "state": "not-stored"
    },
    {
      "connectionId": "ssh",
      "kind": "password",
      "state": "not-stored"
    }
  ],
  "authentication": "database/password: not-stored; ssh/password: not-stored",
  "keyFile": "C:\\keys\\example.ppk",
  "remoteDirectory": "",
  "connections": [
    {
      "id": "database",
      "kind": "database",
      "database": "",
      "protocol": "mysql",
      "endpoint": {
        "host": "db.example.invalid",
        "port": 3306,
        "username": "analyst"
      },
      "authentication": [
        {
          "type": "password",
          "credential": {
            "sourceId": "heidisql:<fixture-directory>\\portable_settings.txt",
            "id": "[\"Demo\",\"primary\"]",
            "state": "not-stored",
            "kind": "password"
          }
        }
      ],
      "via": [
        "ssh"
      ]
    },
    {
      "id": "ssh",
      "kind": "ssh",
      "protocol": "ssh",
      "endpoint": {
        "host": "shell.example.invalid",
        "port": 22,
        "username": "deploy"
      },
      "authentication": [
        {
          "type": "private-key",
          "path": {
            "value": "C:\\keys\\example.ppk",
            "format": "native"
          },
          "format": "ppk"
        },
        {
          "type": "password",
          "credential": {
            "sourceId": "heidisql:<fixture-directory>\\portable_settings.txt",
            "id": "[\"Demo\",\"ssh\"]",
            "state": "not-stored",
            "kind": "password"
          }
        }
      ]
    }
  ],
  "diagnostics": [],
  "source": {
    "id": "heidisql:<fixture-directory>\\portable_settings.txt",
    "application": "heidisql",
    "location": "<fixture-directory>\\portable_settings.txt",
    "storage": [
      {
        "kind": "file",
        "path": "<fixture-directory>\\portable_settings.txt"
      }
    ]
  }
}
```

## get a property
```sh
heidisql-js get Demo host --file <fixture-directory>\portable_settings.txt --json
```

Exit code: 0.

### stdout

```json
"db.example.invalid"
```

## source
```sh
heidisql-js source --file <fixture-directory>\portable_settings.txt --json
```

Exit code: 0.

### stdout

```json
{
  "id": "heidisql:<fixture-directory>\\portable_settings.txt",
  "application": "heidisql",
  "location": "<fixture-directory>\\portable_settings.txt",
  "storage": [
    {
      "kind": "file",
      "path": "<fixture-directory>\\portable_settings.txt"
    }
  ]
}
```

## sources
```sh
heidisql-js sources --file <fixture-directory>\portable_settings.txt --json
```

Exit code: 0.

### stdout

```json
{
  "candidates": [
    {
      "id": "heidisql:<fixture-directory>\\portable_settings.txt",
      "application": "heidisql",
      "location": "<fixture-directory>\\portable_settings.txt",
      "storage": [
        {
          "kind": "file",
          "path": "<fixture-directory>\\portable_settings.txt"
        }
      ]
    }
  ],
  "selectedSourceId": "heidisql:<fixture-directory>\\portable_settings.txt",
  "selectedBy": "explicit",
  "diagnostics": []
}
```
