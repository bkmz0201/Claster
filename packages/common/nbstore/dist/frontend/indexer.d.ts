import type { AggregateOptions, IndexerSchema, Query, SearchOptions } from '../storage';
import type { IndexerPreferOptions, IndexerSync } from '../sync/indexer';
export declare class IndexerFrontend {
    readonly sync: IndexerSync;
    constructor(sync: IndexerSync);
    get state$(): import("rxjs").Observable<import("..").IndexerSyncState>;
    docState$(docId: string): import("rxjs").Observable<import("..").IndexerDocSyncState>;
    search<T extends keyof IndexerSchema, const O extends SearchOptions<T>>(table: T, query: Query<T>, options?: O & {
        prefer?: IndexerPreferOptions;
    }): Promise<import("..").SearchResult<T, O & {
        prefer?: IndexerPreferOptions;
    }>>;
    aggregate<T extends keyof IndexerSchema, const O extends AggregateOptions<T>>(table: T, query: Query<T>, field: keyof IndexerSchema[T], options?: O & {
        prefer?: IndexerPreferOptions;
    }): Promise<import("..").AggregateResult<T, O & {
        prefer?: IndexerPreferOptions;
    }>>;
    search$<T extends keyof IndexerSchema, const O extends SearchOptions<T>>(table: T, query: Query<T>, options?: O & {
        prefer?: IndexerPreferOptions;
    }): import("rxjs").Observable<import("..").SearchResult<T, O & {
        prefer?: IndexerPreferOptions;
    }>>;
    aggregate$<T extends keyof IndexerSchema, const O extends AggregateOptions<T>>(table: T, query: Query<T>, field: keyof IndexerSchema[T], options?: O & {
        prefer?: IndexerPreferOptions;
    }): import("rxjs").Observable<import("..").AggregateResult<T, O & {
        prefer?: IndexerPreferOptions;
    }>>;
    addPriority(docId: string, priority: number): () => void;
    waitForCompleted(signal?: AbortSignal): Promise<void>;
    waitForDocCompleted(docId: string, signal?: AbortSignal): Promise<void>;
    waitForDocCompletedWithPriority(docId: string, priority: number, signal?: AbortSignal): Promise<void>;
}
//# sourceMappingURL=indexer.d.ts.map