---
outline: 2
---

# CLI output reference

These examples were captured from the actual built CLI using synthetic native settings. No remote connection was made. Paths are normalized for portability. Terminal examples preserve the executable's ANSI color choices; JSON examples are color-free. The [complete input reference](/reference/cli-help) lists command help.

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

## full record

```sh
heidisql-js get Demo --file <fixture-directory>\portable_settings.txt --full --json
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

## recursive list

```sh
heidisql-js list --file <fixture-directory>\portable_settings.txt --recurse --json
```

Exit code: 0.

### stdout

```json
{
  "name": "Root",
  "folders": [],
  "profiles": [
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
  ]
}
```

## missing profile

```sh
heidisql-js get does-not-exist --file <fixture-directory>\portable_settings.txt --json
```

Exit code: 1.

### stderr

```json
{"error":"Could not find profile by path \"does-not-exist\""}
```

## write status

```sh
heidisql-js write-status --file <fixture-directory>\portable_settings.txt --json
```

Exit code: 0.

### stdout

```json
{
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
  },
  "revision": "e666525b6975df1f3f6b8fe6dd9e30005cc2a04a2b8f8087baf638561c39504d",
  "diagnostics": [],
  "lock": "unlocked",
  "application": "closed"
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

## write preview

```sh
heidisql-js write --file <fixture-directory>\portable_settings.txt --input <fixture-directory>\heidisql-js-profiles.json --json
```

Exit code: 0.

### stdout

```json
{
  "schemaVersion": 1,
  "sourceId": "heidisql:<fixture-directory>\\portable_settings.txt",
  "application": "heidisql",
  "mode": "create",
  "allowLossy": false,
  "registryMode": "transactional",
  "expectedRevision": "e666525b6975df1f3f6b8fe6dd9e30005cc2a04a2b8f8087baf638561c39504d",
  "inspection": {
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
    },
    "revision": "e666525b6975df1f3f6b8fe6dd9e30005cc2a04a2b8f8087baf638561c39504d",
    "diagnostics": [],
    "lock": "unlocked",
    "application": "closed"
  },
  "changes": [
    {
      "profileId": "Imported",
      "operation": "create",
      "fields": [
        "Host",
        "User",
        "Port",
        "NetType",
        "SSHtunnelActive",
        "SSHtunnelHost",
        "SSHtunnelHostPort",
        "SSHtunnelUser",
        "SSHtunnelPrivateKey"
      ]
    }
  ],
  "diagnostics": [
    {
      "code": "metadata-only-sync",
      "severity": "warning",
      "message": "Stored secrets, private key contents, trust policies and application-specific settings are not copied"
    }
  ],
  "mutations": [
    {
      "operation": "create",
      "path": "Imported",
      "profile": {
        "id": "Demo",
        "path": "Imported",
        "name": "Imported",
        "source": {
          "id": "heidisql:<fixture-directory>\\portable_settings.txt",
          "application": "heidisql"
        },
        "connections": [
          {
            "id": "database",
            "endpoint": {
              "host": "db.example.invalid",
              "port": 3306,
              "username": "analyst"
            },
            "authentication": [
              {
                "type": "password",
                "credential": {
                  "sourceId": "omitted",
                  "id": "omitted",
                  "kind": "password",
                  "state": "not-stored"
                }
              }
            ],
            "via": [
              "ssh"
            ],
            "kind": "database",
            "protocol": "mysql",
            "database": ""
          },
          {
            "id": "ssh",
            "endpoint": {
              "host": "shell.example.invalid",
              "port": 22,
              "username": "deploy"
            },
            "authentication": [
              {
                "type": "private-key",
                "path": {
                  "value": "C:\\keys\\example.ppk"
                },
                "format": "ppk"
              },
              {
                "type": "password",
                "credential": {
                  "sourceId": "omitted",
                  "id": "omitted",
                  "kind": "password",
                  "state": "not-stored"
                }
              }
            ],
            "kind": "ssh",
            "protocol": "ssh"
          }
        ],
        "diagnostics": []
      }
    }
  ],
  "digest": "f979e199879c331385e3d9aec9982462cc403fd057e6deb32d29351d9e7f5a89"
}
```

## invalid apply

```sh
heidisql-js apply --file <fixture-directory>\portable_settings.txt --plan <fixture-directory>\missing-plan.json --json
```

Exit code: 1.

### stderr

```json
{"error":"ENOENT: no such file or directory, stat '<fixture-directory>\\missing-plan.json'"}
```

## Write and sync result contracts

write and sync both emit `NativeWritePreview`: schemaVersion, application, sourceId, expectedRevision, mode, `allowLossy`, optional `registryMode`/scope, inspection, diagnostics, changes, sanitized mutations and a digest. They never apply settings. A digest detects an edited plan; it is not a signature. Sync requires an installed source adapter and explicit connection selection for multi-connection profiles.

Successful apply emits `{applied: true, sourceId, changes, backups}`. It performs guard checks and commits separately; this documentation does not execute apply against a real application store. write-status emits source, revision, application, lock and diagnostics. These write commands emit JSON even without `--json`; `--json` also requests JSON errors.

Read/query success uses stdout; shared query/write failures use stderr and exit 1. Help and successful/empty reads exit 0. With `--json`, ordinary errors have an error string. Registry refusals can additionally include code, nativeCode, operation, `recoveryRequired` and backups. Do not treat a failed lookup as an empty successful list.

Stored credentials remain hidden by default. `--show-password` explicitly changes credential visibility and may report unavailable/locked/unsupported states. Keys and remote directories appear only when present. Captured examples contain no real credential values.
