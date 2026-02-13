import { DummyConnection } from '../../../connection';
import { BlobStorageBase } from '../../../storage';
import { apis } from './db';
/**
 * @deprecated readonly
 */
export class SqliteV1BlobStorage extends BlobStorageBase {
    static { this.identifier = 'SqliteV1BlobStorage'; }
    constructor(options) {
        super();
        this.options = options;
        this.connection = new DummyConnection();
        this.isReadonly = true;
    }
    get db() {
        if (!apis) {
            throw new Error('Not in electron context.');
        }
        return apis;
    }
    async get(key) {
        const data = await this.db.getBlob(this.options.type, this.options.id, key);
        if (!data) {
            return null;
        }
        return {
            key,
            data,
            mime: '',
            createdAt: new Date(),
        };
    }
    async list() {
        const keys = await this.db.getBlobKeys(this.options.type, this.options.id);
        return keys.map(key => ({
            key,
            mime: '',
            size: 0,
            createdAt: new Date(),
        }));
    }
    async delete() {
        // no more deletes
    }
    async set() {
        // no more writes
    }
    async release() {
        // no more writes
    }
}
//# sourceMappingURL=blob.js.map