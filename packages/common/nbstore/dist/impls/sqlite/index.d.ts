import { SqliteBlobStorage } from './blob';
import { SqliteBlobSyncStorage } from './blob-sync';
import { SqliteDocStorage } from './doc';
import { SqliteDocSyncStorage } from './doc-sync';
import { SqliteIndexerStorage } from './indexer';
export * from './blob';
export * from './blob-sync';
export { bindNativeDBApis, type NativeDBApis } from './db';
export * from './doc';
export * from './doc-sync';
export * from './indexer';
export declare const sqliteStorages: (typeof SqliteDocStorage | typeof SqliteBlobStorage | typeof SqliteDocSyncStorage | typeof SqliteBlobSyncStorage | typeof SqliteIndexerStorage)[];
//# sourceMappingURL=index.d.ts.map