import { share } from '../../connection';
import { IndexerSyncStorageBase, } from '../../storage/indexer-sync';
import { IDBConnection } from './db';
export class IndexedDBIndexerSyncStorage extends IndexerSyncStorageBase {
    static { this.identifier = 'IndexedDBIndexerSyncStorage'; }
    constructor(options) {
        super();
        this.options = options;
        this.connection = share(new IDBConnection(this.options));
    }
    async getDocIndexedClock(docId) {
        const tx = this.connection.inner.db.transaction('indexerSync', 'readonly');
        const store = tx.store;
        const result = await store.get(docId);
        return result
            ? {
                docId: result.docId,
                timestamp: result.indexedClock,
                indexerVersion: result.indexerVersion ?? 0,
            }
            : null;
    }
    async setDocIndexedClock(docClock) {
        const tx = this.connection.inner.db.transaction('indexerSync', 'readwrite');
        const store = tx.store;
        await store.put({
            docId: docClock.docId,
            indexedClock: docClock.timestamp,
            indexerVersion: docClock.indexerVersion,
        });
    }
    async clearDocIndexedClock(docId) {
        const tx = this.connection.inner.db.transaction('indexerSync', 'readwrite');
        const store = tx.store;
        await store.delete(docId);
    }
}
//# sourceMappingURL=indexer-sync.js.map