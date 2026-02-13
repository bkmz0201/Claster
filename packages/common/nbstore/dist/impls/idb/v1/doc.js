import { once } from 'lodash-es';
import { applyUpdate, Doc as YDoc, } from 'yjs';
import { share } from '../../../connection';
import { DocStorageBase, } from '../../../storage';
import { getIdConverter } from '../../../utils/id-converter';
import { DocIDBConnection } from './db';
/**
 * We use a fixed timestamp in v1 because the v1 should never be changed.
 * This date is chosen because it is large enough to overwrite some previous error data.
 * In our sync storage, only a larger timestamp can overwrite smaller one.
 */
const CONST_TIMESTAMP = new Date(1893456000000);
/**
 * @deprecated readonly
 */
export class IndexedDBV1DocStorage extends DocStorageBase {
    static { this.identifier = 'IndexedDBV1DocStorage'; }
    constructor(opts) {
        super({
            ...opts,
            readonlyMode: true,
        });
        this.connection = share(new DocIDBConnection());
        this.getIdConverter = once(async () => {
            const idConverter = getIdConverter({
                getDocBuffer: async (id) => {
                    if (!this.db) {
                        return null;
                    }
                    const trx = this.db.transaction('workspace', 'readonly');
                    const record = await trx.store.get(id);
                    if (!record?.updates.length) {
                        return null;
                    }
                    if (record.updates.length === 1) {
                        return record.updates[0].update;
                    }
                    return await this.mergeUpdates(record.updates.map(update => update.update));
                },
            }, this.spaceId);
            return await idConverter;
        });
    }
    get db() {
        return this.connection.inner;
    }
    get name() {
        return 'idb(old)';
    }
    async getDoc(docId) {
        if (!this.db) {
            return null;
        }
        const oldId = (await this.getIdConverter()).newIdToOldId(docId);
        const rawDoc = await this.rawGetDoc(oldId);
        return rawDoc
            ? {
                docId: rawDoc.docId,
                bin: rawDoc.bin,
                timestamp: CONST_TIMESTAMP,
            }
            : null;
    }
    async getDocSnapshot() {
        return null;
    }
    async pushDocUpdate(update) {
        // no more writes to old db
        return { docId: update.docId, timestamp: CONST_TIMESTAMP };
    }
    async deleteDoc(docId) {
        if (!this.db) {
            return;
        }
        const oldId = (await this.getIdConverter()).newIdToOldId(docId);
        const trx = this.db.transaction('workspace', 'readwrite');
        await trx.store.delete(oldId);
    }
    async getDocTimestamps() {
        if (!this.db) {
            return {};
        }
        const idConverter = await this.getIdConverter();
        const oldIds = [this.spaceId];
        const rootDocBuffer = await this.rawGetDoc(this.spaceId);
        if (rootDocBuffer) {
            const ydoc = new YDoc({
                guid: this.spaceId,
            });
            applyUpdate(ydoc, rootDocBuffer.bin);
            // get all ids from rootDoc.meta.pages.[*].id, trust this id as normalized id
            const normalizedDocIds = ydoc.getMap('meta')?.get('pages')
                ?.map(i => i.get('id'))
                .filter(i => !!i);
            const spaces = ydoc.getMap('spaces');
            for (const pageId of normalizedDocIds ?? []) {
                const subdoc = spaces?.get(pageId);
                if (subdoc && subdoc instanceof YDoc) {
                    oldIds.push(subdoc.guid);
                }
            }
        }
        const trx = this.db.transaction('workspace', 'readonly');
        const allKeys = await trx.store.getAllKeys();
        oldIds.push(...allKeys.filter(k => k.startsWith(`db$${this.spaceId}$`)));
        oldIds.push(...allKeys.filter(k => k.match(new RegExp(`^userdata\\$[\\w-]+\\$${this.spaceId}$`))));
        return Object.fromEntries(oldIds.map(id => [idConverter.oldIdToNewId(id), CONST_TIMESTAMP]));
    }
    async getDocTimestamp(_docId) {
        return null;
    }
    async setDocSnapshot() {
        return false;
    }
    async getDocUpdates() {
        return [];
    }
    async markUpdatesMerged() {
        return 0;
    }
    async rawGetDoc(id) {
        if (!this.db) {
            return null;
        }
        const trx = this.db.transaction('workspace', 'readonly');
        const record = await trx.store.get(id);
        if (!record?.updates.length) {
            return null;
        }
        if (record.updates.length === 1) {
            return {
                docId: id,
                bin: record.updates[0].update,
                timestamp: new Date(record.updates[0].timestamp),
            };
        }
        return {
            docId: id,
            bin: await this.mergeUpdates(record.updates.map(update => update.update)),
            timestamp: new Date(record.updates.at(-1)?.timestamp ?? Date.now()),
        };
    }
}
//# sourceMappingURL=doc.js.map