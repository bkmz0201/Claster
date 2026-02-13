import { DummyConnection } from '../../connection';
import {} from '../doc';
export class DummyDocStorage {
    constructor() {
        this.spaceId = '';
        this.storageType = 'doc';
        this.isReadonly = true;
        this.connection = new DummyConnection();
    }
    getDoc(_docId) {
        return Promise.resolve(null);
    }
    getDocDiff(_docId, _state) {
        return Promise.resolve(null);
    }
    pushDocUpdate(update, _origin) {
        return Promise.resolve({
            docId: update.docId,
            timestamp: new Date(),
        });
    }
    getDocTimestamp(_docId) {
        return Promise.resolve(null);
    }
    getDocTimestamps(_after) {
        return Promise.resolve({});
    }
    deleteDoc(_docId) {
        return Promise.resolve();
    }
    subscribeDocUpdate(_callback) {
        return () => { };
    }
}
//# sourceMappingURL=doc.js.map