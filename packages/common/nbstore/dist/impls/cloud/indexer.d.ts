import { Observable } from 'rxjs';
import { type AggregateOptions, type AggregateResult, type IndexerDocument, type IndexerSchema, IndexerStorageBase, type Query, type SearchOptions, type SearchResult } from '../../storage/indexer';
import { HttpConnection } from './http';
interface CloudIndexerStorageOptions {
    serverBaseUrl: string;
    id: string;
}
export declare class CloudIndexerStorage extends IndexerStorageBase {
    private readonly options;
    static readonly identifier = "CloudIndexerStorage";
    readonly isReadonly = true;
    readonly connection: HttpConnection;
    constructor(options: CloudIndexerStorageOptions);
    search<T extends keyof IndexerSchema, const O extends SearchOptions<T>>(table: T, query: Query<T>, options?: O): Promise<SearchResult<T, O>>;
    search$<T extends keyof IndexerSchema, const O extends SearchOptions<T>>(table: T, query: Query<T>, options?: O): Observable<SearchResult<T, O>>;
    aggregate<T extends keyof IndexerSchema, const O extends AggregateOptions<T>>(table: T, query: Query<T>, field: keyof IndexerSchema[T], options?: O): Promise<AggregateResult<T, O>>;
    aggregate$<T extends keyof IndexerSchema, const O extends AggregateOptions<T>>(table: T, query: Query<T>, field: keyof IndexerSchema[T], options?: O): Observable<AggregateResult<T, O>>;
    deleteByQuery<T extends keyof IndexerSchema>(_table: T, _query: Query<T>): Promise<void>;
    insert<T extends keyof IndexerSchema>(_table: T, _document: IndexerDocument<T>): Promise<void>;
    delete<T extends keyof IndexerSchema>(_table: T, _id: string): Promise<void>;
    update<T extends keyof IndexerSchema>(_table: T, _document: IndexerDocument<T>): Promise<void>;
    refresh<T extends keyof IndexerSchema>(_table: T): Promise<void>;
    refreshIfNeed(): Promise<void>;
}
export {};
//# sourceMappingURL=indexer.d.ts.map