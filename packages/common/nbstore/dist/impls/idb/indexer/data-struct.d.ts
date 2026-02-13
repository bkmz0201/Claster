import { type IDBPDatabase, type IDBPTransaction, type StoreNames } from 'idb';
import { type AggregateOptions, type AggregateResult, type IndexerDocument, IndexerSchema, type Query, type SearchOptions, type SearchResult } from '../../../storage';
import type { DocStorageSchema } from '../schema';
import { type InvertedIndex } from './inverted-index';
import { Match } from './match';
export type DataStructRWTransaction = IDBPTransaction<DocStorageSchema, ArrayLike<StoreNames<DocStorageSchema>>, 'readwrite'>;
export type DataStructROTransaction = IDBPTransaction<DocStorageSchema, ArrayLike<StoreNames<DocStorageSchema>>, 'readonly' | 'readwrite'>;
export declare class DataStruct {
    database: IDBPDatabase<DocStorageSchema>;
    invertedIndex: Map<string, Map<string, InvertedIndex>>;
    constructor();
    private update;
    private insert;
    private deleteByNid;
    private delete;
    private deleteByQuery;
    batchWrite(trx: DataStructRWTransaction, table: keyof IndexerSchema, deleteByQueries: Query<any>[], deletes: string[], inserts: IndexerDocument<any>[], updates: IndexerDocument<any>[]): Promise<void>;
    matchAll(trx: DataStructROTransaction, table: keyof IndexerSchema): Promise<Match>;
    queryRaw(trx: DataStructROTransaction, table: keyof IndexerSchema, query: Query<any>, cache?: QueryCache): Promise<Match>;
    clear(trx: DataStructRWTransaction): Promise<void>;
    search(trx: DataStructROTransaction, table: keyof IndexerSchema, query: Query<any>, options?: SearchOptions<any>): Promise<SearchResult<any, any>>;
    aggregate(trx: DataStructROTransaction, table: keyof IndexerSchema, query: Query<any>, field: string, options?: AggregateOptions<any>): Promise<AggregateResult<any, any>>;
    readonly(database: IDBPDatabase<DocStorageSchema>): Promise<IDBPTransaction<DocStorageSchema, ("indexerMetadata" | "indexerRecords" | "invertedIndex")[], "readonly">>;
    readwrite(database: IDBPDatabase<DocStorageSchema>): Promise<IDBPTransaction<DocStorageSchema, ("indexerMetadata" | "indexerRecords" | "invertedIndex")[], "readwrite">>;
    private resultNode;
    measure(name: string): Promise<{
        [Symbol.dispose]: () => void;
    }>;
}
declare class QueryCache {
    private readonly cache;
    get(query: Query<any>): Match | undefined;
    set(query: Query<any>, match: Match): void;
}
export {};
//# sourceMappingURL=data-struct.d.ts.map