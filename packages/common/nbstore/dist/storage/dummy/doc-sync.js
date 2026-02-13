import { DummyConnection } from '../../connection';
import { DocSyncStorageBase } from '../doc-sync';
export class DummyDocSyncStorage extends DocSyncStorageBase {
    constructor() {
        super(...arguments);
        this.connection = new DummyConnection();
    }
    getPeerRemoteClock(_peer, _docId) {
        return Promise.resolve(null);
    }
    getPeerRemoteClocks(_peer) {
        return Promise.resolve({});
    }
    setPeerRemoteClock(_peer, _clock) {
        return Promise.resolve();
    }
    getPeerPulledRemoteClock(_peer, _docId) {
        return Promise.resolve(null);
    }
    getPeerPulledRemoteClocks(_peer) {
        return Promise.resolve({});
    }
    setPeerPulledRemoteClock(_peer, _clock) {
        return Promise.resolve();
    }
    getPeerPushedClock(_peer, _docId) {
        return Promise.resolve(null);
    }
    getPeerPushedClocks(_peer) {
        return Promise.resolve({});
    }
    setPeerPushedClock(_peer, _clock) {
        return Promise.resolve();
    }
    clearClocks() {
        return Promise.resolve();
    }
}
//# sourceMappingURL=doc-sync.js.map