import type { AwarenessStorage } from './awareness';
import type { BlobStorage } from './blob';
import type { BlobSyncStorage } from './blob-sync';
import type { DocStorage } from './doc';
import type { DocSyncStorage } from './doc-sync';
import type { IndexerStorage } from './indexer';
import type { IndexerSyncStorage } from './indexer-sync';
import type { StorageType } from './storage';
type Storages = DocStorage | BlobStorage | BlobSyncStorage | DocSyncStorage | AwarenessStorage | IndexerStorage | IndexerSyncStorage;
export type SpaceStorageOptions = {
    [K in StorageType]?: Storages & {
        storageType: K;
    };
};
export declare class SpaceStorage {
    protected readonly storages: {
        [K in StorageType]: Storages & {
            storageType: K;
        };
    };
    private readonly event;
    private readonly disposables;
    constructor(storages: SpaceStorageOptions);
    get<T extends StorageType>(type: T): Extract<Storages, {
        storageType: T;
    }>;
    connect(): void;
    disconnect(): void;
    waitForConnected(signal?: AbortSignal): Promise<void>;
    destroy(): Promise<void>;
}
export * from './awareness';
export * from './blob';
export * from './blob-sync';
export * from './doc';
export * from './doc-sync';
export * from './errors';
export * from './history';
export * from './indexer';
export * from './storage';
//# sourceMappingURL=index.d.ts.map