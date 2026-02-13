import { Observable } from 'rxjs';
import type { AggregateOptions, AggregateResult, IndexerDocument, IndexerSchema, Query, SearchOptions, SearchResult } from '../../../storage';
import { IndexerStorageBase } from '../../../storage';
import { IDBConnection, type IDBConnectionOptions } from '../db';
export declare class IndexedDBIndexerStorage extends IndexerStorageBase {
    private readonly options;
    static readonly identifier = "IndexedDBIndexerStorage";
    recommendRefreshInterval: number;
    readonly connection: IDBConnection;
    isReadonly: boolean;
    private readonly data;
    private readonly tableUpdate$;
    /**
     * The write operations of IndexedDBIndexerStorage are first cached in pendingUpdates,
     * and then committed to IndexedDB in a batch through the refresh method.
     */
    private readonly pendingUpdates;
    get channel(): BroadcastChannel;
    get database(): import("idb").IDBPDatabase<import("../schema").DocStorageSchema>;
    constructor(options: IDBConnectionOptions);
    search<T extends keyof IndexerSchema, const O extends SearchOptions<T>>(table: T, query: Query<T>, options?: O): Promise<SearchResult<T, O>>;
    aggregate<T extends keyof IndexerSchema, const O extends AggregateOptions<T>>(table: T, query: Query<T>, field: keyof IndexerSchema[T], options?: O): Promise<AggregateResult<T, O>>;
    search$<T extends keyof IndexerSchema, const O extends SearchOptions<T>>(table: T, query: Query<T>, options?: O): Observable<SearchResult<T, O>>;
    aggregate$<T extends keyof IndexerSchema, const O extends AggregateOptions<T>>(table: T, query: Query<T>, field: keyof IndexerSchema[T], options?: O): Observable<AggregateResult<T, O>>;
    deleteByQuery<T extends keyof IndexerSchema>(table: T, query: Query<T>): Promise<void>;
    insert<T extends keyof IndexerSchema>(table: T, document: IndexerDocument): Promise<void>;
    delete<T extends keyof IndexerSchema>(table: T, id: string): Promise<void>;
    update<T extends keyof IndexerSchema>(table: T, document: IndexerDocument): Promise<void>;
    refresh<T extends keyof IndexerSchema>(table: T): Promise<void>;
    refreshIfNeed(): Promise<void>;
    private watchTableUpdated;
    emitTableUpdated(table: keyof IndexerSchema): void;
}
//# sourceMappingURL=index.d.ts.map