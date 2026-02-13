import { type DocIndexedClock, IndexerSyncStorageBase } from '../../storage/indexer-sync';
import { IDBConnection, type IDBConnectionOptions } from './db';
export declare class IndexedDBIndexerSyncStorage extends IndexerSyncStorageBase {
    private readonly options;
    static readonly identifier = "IndexedDBIndexerSyncStorage";
    readonly connection: IDBConnection;
    constructor(options: IDBConnectionOptions);
    getDocIndexedClock(docId: string): Promise<DocIndexedClock | null>;
    setDocIndexedClock(docClock: DocIndexedClock): Promise<void>;
    clearDocIndexedClock(docId: string): Promise<void>;
}
//# sourceMappingURL=indexer-sync.d.ts.map