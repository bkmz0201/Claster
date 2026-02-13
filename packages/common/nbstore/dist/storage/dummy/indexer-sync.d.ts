import { DummyConnection } from '../../connection';
import { type DocIndexedClock, IndexerSyncStorageBase } from '../indexer-sync';
export declare class DummyIndexerSyncStorage extends IndexerSyncStorageBase {
    connection: DummyConnection;
    getDocIndexedClock(_docId: string): Promise<DocIndexedClock | null>;
    setDocIndexedClock(_docClock: DocIndexedClock): Promise<void>;
    clearDocIndexedClock(_docId: string): Promise<void>;
}
//# sourceMappingURL=indexer-sync.d.ts.map