import { DummyConnection } from '../../../connection';
import { DocStorageBase, } from '../../../storage';
import { getIdConverter } from '../../../utils/id-converter';
import { isEmptyUpdate } from '../../../utils/is-empty-update';
import { apis } from './db';
/**
 * We use a fixed timestamp in v1 because the v1 should never be changed.
 * This date is chosen because it is large enough to overwrite some previous error data.
 * In our sync storage, only a larger timestamp can overwrite smaller one.
 */
const CONST_TIMESTAMP = new Date(1893456000000);
/**
 * @deprecated readonly
 */
export class SqliteV1DocStorage extends DocStorageBase {
    static { this.identifier = 'SqliteV1DocStorage'; }
    constructor(options) {
        super({ ...options, readonlyMode: true });
        this.cachedIdConverter = null;
        this.connection = new DummyConnection();
    }
    get db() {
        if (!apis) {
            throw new Error('Not in electron context.');
        }
        return apis;
    }
    async pushDocUpdate(update) {
        // no more writes
        return { docId: update.docId, timestamp: CONST_TIMESTAMP };
    }
    async getDoc(docId) {
        const idConverter = await this.getIdConverter();
        const bin = await this.db.getDocAsUpdates(this.options.type, this.options.id, idConverter.newIdToOldId(docId));
        if (isEmptyUpdate(bin)) {
            return null;
        }
        return {
            docId,
            bin,
            timestamp: CONST_TIMESTAMP,
        };
    }
    async getDocTimestamps() {
        const timestamps = await this.db.getDocTimestamps(this.options.type, this.options.id);
        if (!timestamps) {
            return {};
        }
        const idConverter = await this.getIdConverter();
        return timestamps.reduce((ret, { docId }) => {
            ret[idConverter.oldIdToNewId(docId ?? this.options.id)] =
                CONST_TIMESTAMP;
            return ret;
        }, {});
    }
    async deleteDoc() {
        return;
    }
    async getDocSnapshot() {
        return null;
    }
    async getDocTimestamp() {
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
    async getIdConverter() {
        if (this.cachedIdConverter) {
            return await this.cachedIdConverter;
        }
        this.cachedIdConverter = getIdConverter({
            getDocBuffer: async (id) => {
                if (!this.db) {
                    return null;
                }
                const updates = await this.db.getDocAsUpdates(this.options.type, this.options.id, id);
                if (isEmptyUpdate(updates)) {
                    return null;
                }
                if (!updates) {
                    return null;
                }
                return updates;
            },
        }, this.spaceId);
        return await this.cachedIdConverter;
    }
}
//# sourceMappingURL=doc.js.map