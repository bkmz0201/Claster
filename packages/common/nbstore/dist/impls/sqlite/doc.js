import { share } from '../../connection';
import { DocStorageBase, } from '../../storage';
import { NativeDBConnection } from './db';
export class SqliteDocStorage extends DocStorageBase {
    constructor() {
        super(...arguments);
        this.connection = share(new NativeDBConnection(this.options));
    }
    static { this.identifier = 'SqliteDocStorage'; }
    get db() {
        return this.connection.apis;
    }
    async pushDocUpdate(update, origin) {
        const timestamp = await this.db.pushUpdate(update.docId, update.bin);
        this.emit('update', {
            docId: update.docId,
            bin: update.bin,
            timestamp,
            editor: update.editor,
        }, origin);
        return { docId: update.docId, timestamp };
    }
    async deleteDoc(docId) {
        await this.db.deleteDoc(docId);
    }
    async getDocTimestamps(after) {
        const clocks = await this.db.getDocClocks(after);
        return clocks.reduce((ret, cur) => {
            ret[cur.docId] = cur.timestamp;
            return ret;
        }, {});
    }
    async getDocTimestamp(docId) {
        return this.db.getDocClock(docId);
    }
    async getDocSnapshot(docId) {
        const snapshot = await this.db.getDocSnapshot(docId);
        if (!snapshot) {
            return null;
        }
        return snapshot;
    }
    async setDocSnapshot(snapshot) {
        return this.db.setDocSnapshot({
            docId: snapshot.docId,
            bin: snapshot.bin,
            timestamp: snapshot.timestamp,
        });
    }
    async getDocUpdates(docId) {
        return this.db.getDocUpdates(docId);
    }
    markUpdatesMerged(docId, updates) {
        return this.db.markUpdatesMerged(docId, updates.map(update => update.timestamp));
    }
    async crawlDocData(docId) {
        const result = await this.db.crawlDocData(docId);
        return normalizeNativeCrawlResult(result);
    }
}
function normalizeNativeCrawlResult(result) {
    if (!isRecord(result)) {
        console.warn('[nbstore] crawlDocData returned non-object result');
        return null;
    }
    if (typeof result.title !== 'string' ||
        typeof result.summary !== 'string' ||
        !Array.isArray(result.blocks)) {
        console.warn('[nbstore] crawlDocData result missing basic fields');
        return null;
    }
    const { title, summary } = result;
    const rawBlocks = result.blocks;
    const blocks = [];
    for (const block of rawBlocks) {
        const normalized = normalizeBlock(block);
        if (normalized) {
            blocks.push(normalized);
        }
    }
    if (blocks.length === 0) {
        console.warn('[nbstore] crawlDocData has no valid blocks');
        return null;
    }
    return {
        blocks,
        title,
        summary,
    };
}
function normalizeBlock(block) {
    if (!isRecord(block)) {
        return null;
    }
    const blockId = readStringField(block, 'blockId');
    const flavour = readStringField(block, 'flavour');
    if (!blockId || !flavour) {
        return null;
    }
    return {
        blockId,
        flavour,
        content: readStringArrayField(block, 'content'),
        blob: readStringArrayField(block, 'blob'),
        refDocId: readStringArrayField(block, 'refDocId'),
        refInfo: readStringArrayField(block, 'refInfo'),
        parentFlavour: readStringField(block, 'parentFlavour'),
        parentBlockId: readStringField(block, 'parentBlockId'),
        additional: safeAdditionalField(block),
    };
}
function readStringField(target, key) {
    const value = readField(target, key);
    return typeof value === 'string' && value ? value : undefined;
}
function readStringArrayField(target, key) {
    const value = readField(target, key);
    if (Array.isArray(value)) {
        const filtered = value.filter((item) => typeof item === 'string' && item.length > 0);
        return filtered.length ? filtered : undefined;
    }
    if (typeof value === 'string' && value.length > 0) {
        return [value];
    }
    return undefined;
}
function safeAdditionalField(target) {
    const value = readField(target, 'additional');
    if (typeof value !== 'string' || value.length === 0) {
        return undefined;
    }
    try {
        const parsed = JSON.parse(value);
        return JSON.stringify(parsed);
    }
    catch {
        console.warn('[nbstore] ignore invalid additional payload in crawlDocData block');
        return undefined;
    }
}
function readField(target, key) {
    return target[key] ?? target[toSnakeCase(key)];
}
function toSnakeCase(key) {
    return key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}
function isRecord(value) {
    return typeof value === 'object' && value !== null;
}
//# sourceMappingURL=doc.js.map