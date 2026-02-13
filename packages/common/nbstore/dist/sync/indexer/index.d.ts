import { Observable } from 'rxjs';
import { type AggregateOptions, type AggregateResult, type DocStorage, type IndexerSchema, type IndexerStorage, type Query, type SearchOptions, type SearchResult } from '../../storage';
import type { IndexerSyncStorage } from '../../storage/indexer-sync';
import type { PeerStorageOptions } from '../types';
export type IndexerPreferOptions = 'local' | 'remote';
export interface IndexerSyncState {
    paused: boolean;
    batterySaveMode: boolean;
    /**
     * Number of documents currently in the indexing queue
     */
    indexing: number;
    /**
     * Indicates whether all documents have been successfully indexed
     *
     * This is only for UI display purposes. For logical operations, please use `waitForCompleted()`
     */
    completed: boolean;
    /**
     * Total number of documents in the workspace
     */
    total: number;
    errorMessage: string | null;
}
export interface IndexerDocSyncState {
    /**
     * Indicates whether this document is currently in the indexing queue
     */
    indexing: boolean;
    /**
     * Indicates whether this document has been successfully indexed
     *
     * This is only for UI display purposes. For logical operations, please use `waitForDocCompleted()`
     */
    completed: boolean;
}
export interface IndexerSync {
    state$: Observable<IndexerSyncState>;
    docState$(docId: string): Observable<IndexerDocSyncState>;
    addPriority(docId: string, priority: number): () => void;
    waitForCompleted(signal?: AbortSignal): Promise<void>;
    waitForDocCompleted(docId: string, signal?: AbortSignal): Promise<void>;
    search<T extends keyof IndexerSchema, const O extends SearchOptions<T>>(table: T, query: Query<T>, options?: O & {
        prefer?: IndexerPreferOptions;
    }): Promise<SearchResult<T, O>>;
    aggregate<T extends keyof IndexerSchema, const O extends AggregateOptions<T>>(table: T, query: Query<T>, field: keyof IndexerSchema[T], options?: O & {
        prefer?: IndexerPreferOptions;
    }): Promise<AggregateResult<T, O>>;
    search$<T extends keyof IndexerSchema, const O extends SearchOptions<T>>(table: T, query: Query<T>, options?: O & {
        prefer?: IndexerPreferOptions;
    }): Observable<SearchResult<T, O>>;
    aggregate$<T extends keyof IndexerSchema, const O extends AggregateOptions<T>>(table: T, query: Query<T>, field: keyof IndexerSchema[T], options?: O & {
        prefer?: IndexerPreferOptions;
    }): Observable<AggregateResult<T, O>>;
}
export declare class IndexerSyncImpl implements IndexerSync {
    readonly doc: DocStorage;
    readonly peers: PeerStorageOptions<IndexerStorage>;
    readonly indexerSync: IndexerSyncStorage;
    /**
     * increase this number to re-index all docs
     */
    readonly INDEXER_VERSION = 2;
    private abort;
    private readonly rootDocId;
    private readonly status;
    private readonly indexer;
    private readonly remote?;
    private lastRefreshed;
    state$: Observable<IndexerSyncState>;
    docState$(docId: string): Observable<IndexerDocSyncState>;
    waitForCompleted(signal?: AbortSignal): Promise<void>;
    waitForDocCompleted(docId: string, signal?: AbortSignal): Promise<void>;
    constructor(doc: DocStorage, peers: PeerStorageOptions<IndexerStorage>, indexerSync: IndexerSyncStorage);
    enableBatterySaveMode(): void;
    disableBatterySaveMode(): void;
    pauseSync(): void;
    resumeSync(): void;
    start(): void;
    stop(): void;
    addPriority(id: string, priority: number): () => void;
    private mainLoop;
    private retryLoop;
    private refreshIfNeed;
    /**
     * Get all docs from the root doc, without deleted docs
     */
    private getAllDocsFromRootDoc;
    private tryNativeCrawlDocData;
    private getAllDocsFromIndexer;
    search<T extends keyof IndexerSchema, const O extends SearchOptions<T>>(table: T, query: Query<T>, options?: O & {
        prefer?: IndexerPreferOptions;
    }): Promise<SearchResult<T, O>>;
    aggregate<T extends keyof IndexerSchema, const O extends AggregateOptions<T>>(table: T, query: Query<T>, field: keyof IndexerSchema[T], options?: O & {
        prefer?: IndexerPreferOptions;
    }): Promise<AggregateResult<T, O>>;
    search$<T extends keyof IndexerSchema, const O extends SearchOptions<T>>(table: T, query: Query<T>, options?: O & {
        prefer?: IndexerPreferOptions;
    }): Observable<SearchResult<T, O>>;
    aggregate$<T extends keyof IndexerSchema, const O extends AggregateOptions<T>>(table: T, query: Query<T>, field: keyof IndexerSchema[T], options?: O & {
        prefer?: IndexerPreferOptions;
    }): Observable<AggregateResult<T, O>>;
}
//# sourceMappingURL=index.d.ts.map