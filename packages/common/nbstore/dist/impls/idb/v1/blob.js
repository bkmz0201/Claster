import { share } from '../../../connection';
import { BlobStorageBase } from '../../../storage';
import { BlobIDBConnection } from './db';
/**
 * @deprecated readonly
 */
export class IndexedDBV1BlobStorage extends BlobStorageBase {
    static { this.identifier = 'IndexedDBV1BlobStorage'; }
    constructor(options) {
        super();
        this.options = options;
        this.isReadonly = true;
        this.connection = share(new BlobIDBConnection(this.options));
    }
    get db() {
        return this.connection.inner;
    }
    async get(key) {
        if (!this.db) {
            return null;
        }
        const trx = this.db.transaction('blob', 'readonly');
        const blob = await trx.store.get(key);
        if (!blob) {
            return null;
        }
        return {
            key,
            mime: '',
            createdAt: new Date(),
            data: new Uint8Array(blob),
        };
    }
    async delete(key, permanently) {
        if (!this.db) {
            return;
        }
        if (permanently) {
            const trx = this.db.transaction('blob', 'readwrite');
            await trx.store.delete(key);
        }
    }
    async list() {
        if (!this.db) {
            return [];
        }
        const trx = this.db.transaction('blob', 'readonly');
        const it = trx.store.iterate();
        const records = [];
        for await (const { key, value } of it) {
            records.push({
                key,
                mime: '',
                size: value.byteLength,
                createdAt: new Date(),
            });
        }
        return records;
    }
    async set() {
        // no more writes
    }
    async release() {
        // no more writes
    }
}
//# sourceMappingURL=blob.js.map