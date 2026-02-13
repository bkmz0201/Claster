import { Observable } from 'rxjs';
import { type Doc as YDoc } from 'yjs';
import type { DocRecord, DocStorage } from '../storage';
import type { DocSync } from '../sync/doc';
type Job = {
    type: 'load';
    docId: string;
} | {
    type: 'save';
    docId: string;
    update: Uint8Array;
} | {
    type: 'apply';
    docId: string;
    update: Uint8Array;
};
interface DocFrontendOptions {
    mergeUpdates?: (updates: Uint8Array[]) => Promise<Uint8Array> | Uint8Array;
}
export type DocFrontendDocState = {
    /**
     * some data is available in yjs doc instance
     */
    ready: boolean;
    /**
     * data is loaded from local doc storage and applied to yjs doc instance
     */
    loaded: boolean;
    /**
     * some data is being applied to yjs doc instance, or some data is being saved to local doc storage
     */
    updating: boolean;
    /**
     * the doc is syncing with remote peers
     */
    syncing: boolean;
    /**
     * the doc is synced with remote peers
     */
    synced: boolean;
    /**
     * the doc is retrying to sync with remote peers
     */
    syncRetrying: boolean;
    /**
     * the error message when syncing with remote peers
     */
    syncErrorMessage: string | null;
};
export type DocFrontendState = {
    /**
     * total number of docs
     */
    total: number;
    /**
     * number of docs that have been loaded to yjs doc instance
     */
    loaded: number;
    /**
     * some data is being applied to yjs doc instance, or some data is being saved to local doc storage
     */
    updating: boolean;
    /**
     * number of docs that are syncing with remote peers
     */
    syncing: number;
    /**
     * whether all docs are synced with remote peers
     */
    synced: boolean;
    /**
     * whether the doc is retrying to sync with remote peers
     */
    syncRetrying: boolean;
    /**
     * the error message when syncing with remote peers
     */
    syncErrorMessage: string | null;
};
export declare class DocFrontend {
    readonly storage: DocStorage;
    private readonly sync;
    readonly options: DocFrontendOptions;
    private readonly uniqueId;
    private readonly prioritySettings;
    private readonly status;
    private readonly statusUpdatedSubject$;
    private readonly abort;
    constructor(storage: DocStorage, sync: DocSync, options?: DocFrontendOptions);
    private _docState$;
    docState$(docId: string): Observable<DocFrontendDocState>;
    private readonly _state$;
    state$: Observable<DocFrontendState>;
    start(): void;
    stop(): void;
    private mainLoop;
    /**
     * Connect a doc to the frontend, the doc will sync with the doc storage.
     * @param doc - The doc to connect
     */
    connectDoc(doc: YDoc): void;
    readonly jobs: {
        load: (job: Job & {
            type: "load";
        }, signal?: AbortSignal) => Promise<void>;
        save: (docId: string, jobs: (Job & {
            type: "save";
        })[], signal?: AbortSignal) => Promise<void>;
        apply: (job: Job & {
            type: "apply";
        }, signal?: AbortSignal) => Promise<void>;
    };
    event: {
        onStorageUpdate: (update: DocRecord, origin?: string) => void;
    };
    /**
     * Disconnect a doc from the frontend, the doc will stop syncing with the doc storage.
     * It's not recommended to use this method directly, better to use `doc.destroy()`.
     *
     * @param doc - The doc to disconnect
     */
    disconnectDoc(doc: YDoc): void;
    addPriority(id: string, priority: number): () => void;
    private _connectDoc;
    private schedule;
    private isApplyingUpdate;
    applyUpdate(docId: string, update: Uint8Array): void;
    private readonly handleDocUpdate;
    protected mergeUpdates(updates: Uint8Array[]): Uint8Array<ArrayBufferLike> | Promise<Uint8Array<ArrayBufferLike>>;
    waitForUpdated(docId?: string, abort?: AbortSignal): Promise<void>;
    waitForDocLoaded(docId: string, abort?: AbortSignal): Promise<void>;
    waitForSynced(docId?: string, abort?: AbortSignal): Promise<void>;
    waitForDocReady(docId: string, abort?: AbortSignal): Promise<void>;
    resetSync(): Promise<void>;
}
export {};
//# sourceMappingURL=doc.d.ts.map