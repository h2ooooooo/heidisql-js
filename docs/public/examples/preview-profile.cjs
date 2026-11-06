// preview-profile.cjs
async function main() {
    const {HeidiSqlProfileSource, createHeidiSqlWriter} = await import('@jalsoedesign/heidisql-core');

    const source = await HeidiSqlProfileSource.fromFile(process.argv[2] ?? './portable_settings.txt');
    const selected = source.get('Demo');

    if (!selected) {
        throw new Error('The demo profile is missing');
    }

    // Plan a new saved profile in the same synthetic settings; do not apply it.
    const targetPath = 'Imported';
    const writer = createHeidiSqlWriter(source.source, {mode: 'create'});
    const preview = await writer.plan([{
        ...selected,
        path: targetPath,
        name: 'Imported',
    }]);

    console.log('Source profile: ' + selected.path);
    console.log('Destination profile: ' + targetPath);
    console.log('Planned operations: ' + preview.changes.map(change => change.operation).join(', '));
    console.log('Native settings written: no');
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
