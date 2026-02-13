import { applyUpdate, Doc, encodeStateAsUpdate } from 'yjs';
export function mergeUpdates(updates) {
    if (updates.length === 0) {
        return new Uint8Array();
    }
    if (updates.length === 1) {
        return updates[0];
    }
    const doc = new Doc();
    doc.transact(() => {
        updates.forEach(update => {
            applyUpdate(doc, update);
        });
    });
    return encodeStateAsUpdate(doc);
}
//# sourceMappingURL=merge-updates.js.map