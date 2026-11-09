function required(name) {
    const value = process.env[name];

    if (!value) {
        throw new Error('Set ' + name);
    }

    return value;
}

async function main() {
    const nativeSettings = required('NATIVE_SETTINGS');
    const profilePath = required('PROFILE_PATH');

    const {HeidiSqlProfileSource} = await import('@jalsoedesign/heidisql-core');
    const {createDocklineBridge} = await import('@jalsoedesign/portline-dockline');
    const source = await HeidiSqlProfileSource.fromFile(nativeSettings);
    const bridge = createDocklineBridge({source});
    await bridge.withSsh(profilePath, async session => {
        const result = await session.exec('uname', ['-a'], {timeout: '10s'});
        console.log(result.stdout.trimEnd());
    }, {
        connectionId: 'ssh',
        hostFingerprint: process.env.SSH_HOST_KEY_SHA256,
        password: process.env.REMOTE_PASSWORD,
        passphrase: process.env.KEY_PASSPHRASE,
        privateKeyPath: process.env.PRIVATE_KEY_PATH,
        agent: process.env.SSH_AGENT,
        timeoutMs: 30000,
    });
}

main().catch(error => {
    console.error(error instanceof Error ? error.message : 'Connection failed');
    process.exitCode = 1;
});
