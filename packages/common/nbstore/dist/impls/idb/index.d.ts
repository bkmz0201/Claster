import { IndexedDBBlobStorage } from './blob';
import { IndexedDBBlobSyncStorage } from './blob-sync';
import { IndexedDBDocStorage } from './doc';
import { IndexedDBDocSyncStorage } from './doc-sync';
import { IndexedDBIndexerStorage } from './indexer';
import { IndexedDBIndexerSyncStorage } from './indexer-sync';
export * from './blob';
export * from './blob-sync';
export * from './doc';
export * from './doc-sync';
export * from './indexer';
export * from './indexer-sync';
export declare const idbStorages: (typeof IndexedDBDocStorage | typeof IndexedDBBlobStorage | typeof IndexedDBDocSyncStorage | typeof IndexedDBBlobSyncStorage | typeof IndexedDBIndexerStorage | typeof IndexedDBIndexerSyncStorage)[];
export declare const idbStoragesIndexerOnly: (typeof IndexedDBIndexerStorage | typeof IndexedDBIndexerSyncStorage)[];
//# sourceMappingURL=index.d.ts.map