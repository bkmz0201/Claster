import { DummyConnection } from '../../connection';
import { IndexerSyncStorageBase } from '../indexer-sync';
export class DummyIndexerSyncStorage extends IndexerSyncStorageBase {
    constructor() {
        super(...arguments);
        this.connection = new DummyConnection();
    }
    getDocIndexedClock(_docId) {
        return Promise.resolve(null);
    }
    setDocIndexedClock(_docClock) {
        return Promise.resolve();
    }
    clearDocIndexedClock(_docId) {
        return Promise.resolve();
    }
}
//# sourceMappingURL=indexer-sync.js.map