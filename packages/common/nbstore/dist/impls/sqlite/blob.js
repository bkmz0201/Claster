import { share } from '../../connection';
import { BlobStorageBase } from '../../storage';
import { NativeDBConnection } from './db';
export class SqliteBlobStorage extends BlobStorageBase {
    static { this.identifier = 'SqliteBlobStorage'; }
    constructor(options) {
        super();
        this.options = options;
        this.isReadonly = false;
        this.connection = share(new NativeDBConnection(this.options));
    }
    get db() {
        return this.connection.apis;
    }
    async get(key) {
        return this.db.getBlob(key);
    }
    async set(blob) {
        await this.db.setBlob(blob);
    }
    async delete(key, permanently) {
        await this.db.deleteBlob(key, permanently);
    }
    async release() {
        await this.db.releaseBlobs();
    }
    async list() {
        return this.db.listBlobs();
    }
}
//# sourceMappingURL=blob.js.map