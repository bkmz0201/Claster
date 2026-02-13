import { noop } from 'lodash-es';
import { applyUpdate, Doc, encodeStateAsUpdate, encodeStateVector, UndoManager, } from 'yjs';
import { DocStorageBase } from './doc';
export class HistoricalDocStorage extends DocStorageBase {
    constructor(opts) {
        super(opts);
        this.on('snapshot', snapshot => {
            this.createHistory(snapshot.docId, snapshot).catch(noop);
        });
    }
    async setDocSnapshot(snapshot, prevSnapshot) {
        const success = await this.upsertDocSnapshot(snapshot, prevSnapshot);
        if (success) {
            this.emit('snapshot', snapshot, prevSnapshot);
        }
        return success;
    }
    async rollbackDoc(docId, timestamp, editor) {
        const toSnapshot = await this.getHistory(docId, timestamp);
        if (!toSnapshot) {
            throw new Error('Can not find the version to rollback to.');
        }
        const fromSnapshot = await this.getDoc(docId);
        if (!fromSnapshot) {
            throw new Error('Can not find the current version of the doc.');
        }
        const change = this.generateRevertUpdate(fromSnapshot.bin, toSnapshot.bin);
        await this.pushDocUpdate({ docId, bin: change, editor }, 'rollback');
        // force create a new history record after rollback
        await this.createHistory(docId, fromSnapshot);
    }
    generateRevertUpdate(fromNewerBin, toOlderBin) {
        const newerDoc = new Doc();
        applyUpdate(newerDoc, fromNewerBin);
        const olderDoc = new Doc();
        applyUpdate(olderDoc, toOlderBin);
        const newerState = encodeStateVector(newerDoc);
        const olderState = encodeStateVector(olderDoc);
        const diff = encodeStateAsUpdate(newerDoc, olderState);
        const undoManager = new UndoManager(Array.from(olderDoc.share.values()));
        applyUpdate(olderDoc, diff);
        undoManager.undo();
        return encodeStateAsUpdate(olderDoc, newerState);
    }
}
//# sourceMappingURL=history.js.map