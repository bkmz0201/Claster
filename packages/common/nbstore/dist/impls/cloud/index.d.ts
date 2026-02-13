import { CloudAwarenessStorage } from './awareness';
import { CloudBlobStorage } from './blob';
import { CloudDocStorage } from './doc';
import { StaticCloudDocStorage } from './doc-static';
import { CloudIndexerStorage } from './indexer';
export * from './awareness';
export * from './blob';
export * from './doc';
export * from './doc-static';
export * from './indexer';
export * from './socket';
export declare const cloudStorages: (typeof CloudBlobStorage | typeof StaticCloudDocStorage | typeof CloudIndexerStorage | typeof CloudDocStorage | typeof CloudAwarenessStorage)[];
//# sourceMappingURL=index.d.ts.map