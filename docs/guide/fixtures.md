# Synthetic settings for examples

These files contain loopback endpoints and illustrative key paths. They do not require an account, an installed HeidiSQL application or an actual private key. Reading them opens no connection.

## Download or copy

<a href="/examples/fixtures/portable_settings.txt" download="portable_settings.txt"><code>portable_settings.txt</code></a>

Save the files under the shown names in an empty working directory. Create parent directories where shown. These are settings files on the host, not paths on a remote server. Keep this directory separate from installed application settings.

### `portable_settings.txt`

```text
Servers\Demo\Host	1	127.0.0.1
Servers\Demo\User	1	analyst
Servers\Demo\NetType	3	2
Servers\Demo\SSHtunnelHost	1	127.0.0.1
Servers\Demo\SSHtunnelUser	1	deploy
Servers\Demo\SSHtunnelPrivateKey	1	C:\keys\example.ppk
```

The portable format uses actual tab characters between each key, type and value. Download the file if a text editor changes tabs into spaces.

Continue with the [API quick start](/api/quick-start) or [CLI quick start](/cli/quick-start).
