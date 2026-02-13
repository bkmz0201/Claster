import { share } from '../../connection';
import { BlobStorageBase, } from '../../storage';
import { IDBConnection } from './db';
export class IndexedDBBlobStorage extends BlobStorageBase {
    static { this.identifier = 'IndexedDBBlobStorage'; }
    constructor(options) {
        super();
        this.options = options;
        this.isReadonly = false;
        this.connection = share(new IDBConnection(this.options));
    }
    get db() {
        return this.connection.inner.db;
    }
    async get(key) {
        const trx = this.db.transaction(['blobs', 'blobData'], 'readonly');
        const blob = await trx.objectStore('blobs').get(key);
        const data = await trx.objectStore('blobData').get(key);
        if (!blob || blob.deletedAt || !data) {
            return null;
        }
        return {
            ...blob,
            data: data.data,
        };
    }
    async set(blob) {
        const trx = this.db.transaction(['blobs', 'blobData'], 'readwrite');
        await trx.objectStore('blobs').put({
            key: blob.key,
            mime: blob.mime,
            size: blob.data.byteLength,
            createdAt: new Date(),
            deletedAt: null,
        });
        await trx.objectStore('blobData').put({
            key: blob.key,
            data: blob.data,
        });
    }
    async delete(key, permanently) {
        if (permanently) {
            const trx = this.db.transaction(['blobs', 'blobData'], 'readwrite');
            await trx.objectStore('blobs').delete(key);
            await trx.objectStore('blobData').delete(key);
        }
        else {
            const trx = this.db.transaction('blobs', 'readwrite');
            const blob = await trx.store.get(key);
            if (blob) {
                await trx.store.put({
                    ...blob,
                    deletedAt: new Date(),
                });
            }
        }
    }
    async release() {
        const trx = this.db.transaction(['blobs', 'blobData'], 'readwrite');
        const it = trx.objectStore('blobs').iterate();
        for await (const item of it) {
            if (item.value.deletedAt) {
                await item.delete();
                await trx.objectStore('blobData').delete(item.value.key);
            }
        }
    }
    async list() {
        const trx = this.db.transaction('blobs', 'readonly');
        const it = trx.store.iterate();
        const blobs = [];
        for await (const item of it) {
            if (!item.value.deletedAt) {
                blobs.push(item.value);
            }
        }
        return blobs;
    }
}
//# sourceMappingURL=blob.js.map