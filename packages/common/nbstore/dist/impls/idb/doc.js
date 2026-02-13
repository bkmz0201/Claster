import { share } from '../../connection';
import { DocStorageBase, } from '../../storage';
import { IDBConnection } from './db';
import { IndexedDBLocker } from './lock';
export class IndexedDBDocStorage extends DocStorageBase {
    constructor() {
        super(...arguments);
        this.connection = share(new IDBConnection(this.options));
        this.locker = new IndexedDBLocker(this.connection);
        this.docUpdateListener = 0;
        this.handleChannelMessage = (event) => {
            if (event.data.type === 'update') {
                this.emit('update', event.data.update, event.data.origin);
            }
        };
    }
    static { this.identifier = 'IndexedDBDocStorage'; }
    get db() {
        return this.connection.inner.db;
    }
    get channel() {
        return this.connection.inner.channel;
    }
    async pushDocUpdate(update, origin) {
        let timestamp = new Date();
        let retry = 0;
        while (true) {
            try {
                const trx = this.db.transaction(['updates', 'clocks'], 'readwrite');
                await trx.objectStore('updates').add({
                    ...update,
                    createdAt: timestamp,
                });
                await trx.objectStore('clocks').put({ docId: update.docId, timestamp });
                trx.commit();
            }
            catch (e) {
                if (e instanceof Error && e.name === 'ConstraintError') {
                    retry++;
                    if (retry < 10) {
                        timestamp = new Date(timestamp.getTime() + 1);
                        continue;
                    }
                }
                throw e;
            }
            break;
        }
        this.emit('update', {
            docId: update.docId,
            bin: update.bin,
            timestamp,
            editor: update.editor,
        }, origin);
        this.channel.postMessage({
            type: 'update',
            update: {
                docId: update.docId,
                bin: update.bin,
                timestamp,
                editor: update.editor,
            },
            origin,
        });
        return { docId: update.docId, timestamp };
    }
    async getDocSnapshot(docId) {
        const trx = this.db.transaction('snapshots', 'readonly');
        const record = await trx.store.get(docId);
        if (!record) {
            return null;
        }
        return {
            docId,
            bin: record.bin,
            timestamp: record.updatedAt,
        };
    }
    async deleteDoc(docId) {
        const trx = this.db.transaction(['snapshots', 'updates', 'clocks'], 'readwrite');
        const idx = trx.objectStore('updates').index('docId');
        const iter = idx.iterate(IDBKeyRange.only(docId));
        for await (const { value } of iter) {
            await trx.objectStore('updates').delete([value.docId, value.createdAt]);
        }
        await trx.objectStore('snapshots').delete(docId);
        await trx.objectStore('clocks').delete(docId);
    }
    async getDocTimestamps(after = new Date(0)) {
        const trx = this.db.transaction('clocks', 'readonly');
        const clocks = await trx.store.getAll();
        return clocks.reduce((ret, cur) => {
            if (cur.timestamp > after) {
                ret[cur.docId] = cur.timestamp;
            }
            return ret;
        }, {});
    }
    async getDocTimestamp(docId) {
        const trx = this.db.transaction('clocks', 'readonly');
        return (await trx.store.get(docId)) ?? null;
    }
    async setDocSnapshot(snapshot) {
        const trx = this.db.transaction('snapshots', 'readwrite');
        const record = await trx.store.get(snapshot.docId);
        if (!record || record.updatedAt < snapshot.timestamp) {
            await trx.store.put({
                docId: snapshot.docId,
                bin: snapshot.bin,
                createdAt: record?.createdAt ?? snapshot.timestamp,
                updatedAt: snapshot.timestamp,
            });
        }
        trx.commit();
        return true;
    }
    async getDocUpdates(docId) {
        const trx = this.db.transaction('updates', 'readonly');
        const updates = await trx.store.index('docId').getAll(docId);
        return updates.map(update => ({
            docId,
            bin: update.bin,
            timestamp: update.createdAt,
        }));
    }
    async markUpdatesMerged(docId, updates) {
        const trx = this.db.transaction('updates', 'readwrite');
        await Promise.all(updates.map(update => trx.store.delete([docId, update.timestamp])));
        trx.commit();
        return updates.length;
    }
    subscribeDocUpdate(callback) {
        if (this.docUpdateListener === 0) {
            this.channel.addEventListener('message', this.handleChannelMessage);
        }
        this.docUpdateListener++;
        const dispose = super.subscribeDocUpdate(callback);
        return () => {
            dispose();
            this.docUpdateListener--;
            if (this.docUpdateListener === 0) {
                this.channel.removeEventListener('message', this.handleChannelMessage);
            }
        };
    }
}
//# sourceMappingURL=doc.js.map