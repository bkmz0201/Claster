import { share } from '../../connection';
import { BlobSyncStorageBase } from '../../storage';
import { IDBConnection } from './db';
export class IndexedDBBlobSyncStorage extends BlobSyncStorageBase {
    static { this.identifier = 'IndexedDBBlobSyncStorage'; }
    constructor(options) {
        super();
        this.options = options;
        this.connection = share(new IDBConnection(this.options));
    }
    get db() {
        return this.connection;
    }
    async setBlobUploadedAt(peer, blobId, uploadedAt) {
        const trx = this.db.inner.db.transaction('blobSync', 'readwrite');
        await trx.store.put({
            peer,
            key: blobId,
            uploadedAt,
        });
    }
    async getBlobUploadedAt(peer, blobId) {
        const trx = this.db.inner.db.transaction('blobSync', 'readonly');
        const record = await trx.store.get([peer, blobId]);
        return record?.uploadedAt ?? null;
    }
}
//# sourceMappingURL=blob-sync.js.map