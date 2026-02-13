import { DummyConnection } from '../../connection';
export class DummyBlobSyncStorage {
    constructor() {
        this.storageType = 'blobSync';
        this.connection = new DummyConnection();
    }
    setBlobUploadedAt() {
        return Promise.resolve();
    }
    getBlobUploadedAt() {
        return Promise.resolve(new Date());
    }
}
//# sourceMappingURL=blob-sync.js.map