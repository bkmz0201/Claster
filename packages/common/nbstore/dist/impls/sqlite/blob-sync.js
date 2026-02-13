import { share } from '../../connection';
import { BlobSyncStorageBase } from '../../storage';
import { NativeDBConnection } from './db';
export class SqliteBlobSyncStorage extends BlobSyncStorageBase {
    static { this.identifier = 'SqliteBlobSyncStorage'; }
    constructor(options) {
        super();
        this.options = options;
        this.connection = share(new NativeDBConnection(this.options));
    }
    get db() {
        return this.connection.apis;
    }
    async setBlobUploadedAt(peer, blobId, uploadedAt) {
        await this.db.setBlobUploadedAt(peer, blobId, uploadedAt);
    }
    async getBlobUploadedAt(peer, blobId) {
        return this.db.getBlobUploadedAt(peer, blobId);
    }
}
//# sourceMappingURL=blob-sync.js.map