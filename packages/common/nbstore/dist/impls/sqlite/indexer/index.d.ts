import { Observable } from 'rxjs';
import type { AggregateOptions, AggregateResult, IndexerDocument, Query, SearchOptions, SearchResult } from '../../../storage';
import { IndexerStorageBase } from '../../../storage';
import { IndexerSchema } from '../../../storage/indexer/schema';
import { NativeDBConnection, type SqliteNativeDBOptions } from '../db';
export declare class SqliteIndexerStorage extends IndexerStorageBase {
    static readonly identifier = "SqliteIndexerStorage";
    readonly recommendRefreshInterval: number;
    readonly connection: NativeDBConnection;
    readonly isReadonly = false;
    private readonly tableUpdate$;
    constructor(options: SqliteNativeDBOptions);
    private watchTableUpdated;
    search<T extends keyof IndexerSchema, const O extends SearchOptions<T>>(table: T, query: Query<T>, options?: O): Promise<SearchResult<T, O>>;
    aggregate<T extends keyof IndexerSchema, const O extends AggregateOptions<T>>(table: T, query: Query<T>, field: keyof IndexerSchema[T], options?: O): Promise<AggregateResult<T, O>>;
    search$<T extends keyof IndexerSchema, const O extends SearchOptions<T>>(table: T, query: Query<T>, options?: O): Observable<SearchResult<T, O>>;
    aggregate$<T extends keyof IndexerSchema, const O extends AggregateOptions<T>>(table: T, query: Query<T>, field: keyof IndexerSchema[T], options?: O): Observable<AggregateResult<T, O>>;
    deleteByQuery<T extends keyof IndexerSchema>(table: T, query: Query<T>): Promise<void>;
    insert<T extends keyof IndexerSchema>(table: T, document: IndexerDocument<T>): Promise<void>;
    delete<T extends keyof IndexerSchema>(table: T, id: string): Promise<void>;
    update<T extends keyof IndexerSchema>(table: T, document: IndexerDocument<T>): Promise<void>;
    refresh<T extends keyof IndexerSchema>(_table: T): Promise<void>;
    refreshIfNeed(): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map