import type { Observable } from 'rxjs';
import type { DocStorage, DocSyncStorage } from '../../storage';
import type { PeerStorageOptions } from '../types';
export interface DocSyncState {
    total: number;
    syncing: number;
    synced: boolean;
    retrying: boolean;
    errorMessage: string | null;
}
export interface DocSyncDocState {
    synced: boolean;
    syncing: boolean;
    retrying: boolean;
    errorMessage: string | null;
}
export interface DocSync {
    readonly state$: Observable<DocSyncState>;
    docState$(docId: string): Observable<DocSyncDocState>;
    waitForSynced(docId?: string, abort?: AbortSignal): Promise<void>;
    addPriority(id: string, priority: number): () => void;
    resetSync(): Promise<void>;
}
export declare class DocSyncImpl implements DocSync {
    readonly storages: PeerStorageOptions<DocStorage>;
    readonly sync: DocSyncStorage;
    private readonly peers;
    private abort;
    private readonly _state$;
    state$: Observable<DocSyncState>;
    constructor(storages: PeerStorageOptions<DocStorage>, sync: DocSyncStorage);
    /**
     * for testing
     */
    static get dummy(): DocSyncImpl;
    private _docState$;
    docState$(docId: string): Observable<DocSyncDocState>;
    waitForSynced(docId?: string, abort?: AbortSignal): Promise<void>;
    start(): void;
    stop(): void;
    addPriority(id: string, priority: number): () => void;
    resetSync(): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map