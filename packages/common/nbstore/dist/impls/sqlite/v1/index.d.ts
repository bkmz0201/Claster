import { SqliteV1BlobStorage } from './blob';
import { SqliteV1DocStorage } from './doc';
export * from './blob';
export { bindNativeDBV1Apis } from './db';
export * from './doc';
export declare const sqliteV1Storages: (typeof SqliteV1DocStorage | typeof SqliteV1BlobStorage)[];
//# sourceMappingURL=index.d.ts.map