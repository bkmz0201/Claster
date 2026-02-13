import { type Observable } from 'rxjs';
import { DummyConnection } from '../../connection';
import { type AggregateOptions, type AggregateResult, type IndexerDocument, type IndexerSchema, IndexerStorageBase, type Query, type SearchOptions, type SearchResult } from '../indexer';
export declare class DummyIndexerStorage extends IndexerStorageBase {
    readonly isReadonly = true;
    readonly connection: DummyConnection;
    search<T extends keyof IndexerSchema, const O extends SearchOptions<T>>(_table: T, _query: Query<T>, _options?: O): Promise<SearchResult<T, O>>;
    aggregate<T extends keyof IndexerSchema, const O extends AggregateOptions<T>>(_table: T, _query: Query<T>, _field: keyof IndexerSchema[T], _options?: O): Promise<AggregateResult<T, O>>;
    search$<T extends keyof IndexerSchema, const O extends SearchOptions<T>>(_table: T, _query: Query<T>, _options?: O): Observable<SearchResult<T, O>>;
    aggregate$<T extends keyof IndexerSchema, const O extends AggregateOptions<T>>(_table: T, _query: Query<T>, _field: keyof IndexerSchema[T], _options?: O): Observable<AggregateResult<T, O>>;
    deleteByQuery<T extends keyof IndexerSchema>(_table: T, _query: Query<T>): Promise<void>;
    insert<T extends keyof IndexerSchema>(_table: T, _document: IndexerDocument<T>): Promise<void>;
    delete<T extends keyof IndexerSchema>(_table: T, _id: string): Promise<void>;
    update<T extends keyof IndexerSchema>(_table: T, _document: IndexerDocument<T>): Promise<void>;
    refresh<T extends keyof IndexerSchema>(_table: T): Promise<void>;
    refreshIfNeed(): Promise<void>;
}
//# sourceMappingURL=indexer.d.ts.map