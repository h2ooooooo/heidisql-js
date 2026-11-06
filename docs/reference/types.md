<!-- Generated from public package declarations by scripts/generate-api-docs.mjs. -->
# TypeScript reference

These signatures come from the public package entry points and their re-exports. Build the libraries and run `npm run docs:api` to update them. Use the API guide for behavior and examples.

## @jalsoedesign/heidisql-core

### index.d.ts

```ts
import type { SourceReference } from '@jalsoedesign/portline-abstract';
import { NativeProfileSource } from '@jalsoedesign/portline-platform';
import type { NativeDiscoveryOptions, NativeSession, RegistryReader } from '@jalsoedesign/portline-platform';
export declare function parseHeidiSqlPortable(contents: string): NativeSession[];
/** HeidiSQL's historical obfuscation is decoded only on explicit credential access. */
export declare function decodeHeidiSqlPassword(value: string): string | undefined;
export declare class HeidiSqlProfileSource extends NativeProfileSource {
    static fromSessions(source: SourceReference, sessions: readonly NativeSession[]): HeidiSqlProfileSource;
    static fromFile(filename: string): Promise<HeidiSqlProfileSource>;
    static fromRegistry(key?: string, reader?: RegistryReader, view?: '32' | '64' | 'default'): Promise<HeidiSqlProfileSource>;
    static discover(options?: NativeDiscoveryOptions): Promise<import("@jalsoedesign/portline-platform").DiscoveryResult>;
    static open(options?: NativeDiscoveryOptions): Promise<HeidiSqlProfileSource>;
}
export { HeidiSqlProfileSource as HeidiSQL };
export declare const discoverHeidiSqlSources: typeof HeidiSqlProfileSource.discover;
export * from './writing.js';
```

### writing.d.ts

```ts
import { NativeProfileWriter } from '@jalsoedesign/portline-platform';
import type { NativeWriteOptions } from '@jalsoedesign/portline-platform';
import type { SourceReference } from '@jalsoedesign/portline-abstract';
export declare function createHeidiSqlWriter(source: SourceReference, options?: Omit<NativeWriteOptions, 'source' | 'application'>): NativeProfileWriter;
```
