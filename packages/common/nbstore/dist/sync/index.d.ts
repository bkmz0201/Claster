import { type Observable } from 'rxjs';
import type { SpaceStorage } from '../storage';
import { AwarenessSyncImpl } from './awareness';
import { BlobSyncImpl } from './blob';
import { DocSyncImpl, type DocSyncState } from './doc';
import { IndexerSyncImpl } from './indexer';
import type { PeerStorageOptions } from './types';
export type { BlobSyncState } from './blob';
export type { DocSyncDocState, DocSyncState } from './doc';
export type { IndexerDocSyncState, IndexerPreferOptions, IndexerSyncState, } from './indexer';
export interface SyncState {
    doc?: DocSyncState;
}
export declare class Sync {
    readonly storages: PeerStorageOptions<SpaceStorage>;
    readonly doc: DocSyncImpl;
    readonly blob: BlobSyncImpl;
    readonly awareness: AwarenessSyncImpl;
    readonly indexer: IndexerSyncImpl;
    readonly state$: Observable<SyncState>;
    constructor(storages: PeerStorageOptions<SpaceStorage>);
    start(): void;
    stop(): void;
}
//# sourceMappingURL=index.d.ts.map