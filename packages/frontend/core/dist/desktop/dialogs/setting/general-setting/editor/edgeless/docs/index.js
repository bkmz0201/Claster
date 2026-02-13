import { getAFFiNEWorkspaceSchema } from '@affine/core/modules/workspace';
import { WorkspaceImpl } from '@affine/core/modules/workspace/impls/workspace';
import { Transformer } from '@blocksuite/affine/store';
import { Doc as YDoc } from 'yjs';
export const getCollection = (() => {
    let collection = null;
    return function () {
        if (collection) {
            return collection;
        }
        collection = new WorkspaceImpl({
            id: 'edgeless-settings',
            rootDoc: new YDoc({ guid: 'edgeless-settings' }),
        });
        collection.meta.initialize();
        return collection;
    };
})();
const docMap = new Map();
async function loadNote() {
    return (await import('./note.json')).default;
}
async function loadPen() {
    return (await import('./pen.json')).default;
}
async function loadShape() {
    return (await import('./shape.json')).default;
}
async function loadFrame() {
    return (await import('./frame.json')).default;
}
async function loadFlow() {
    return (await import('./flow.json')).default;
}
async function loadText() {
    return (await import('./text.json')).default;
}
async function loadConnector() {
    return (await import('./connector.json')).default;
}
async function loadMindmap() {
    return (await import('./mindmap.json')).default;
}
const loaders = {
    note: loadNote,
    pen: loadPen,
    shape: loadShape,
    frame: loadFrame,
    flow: loadFlow,
    text: loadText,
    connector: loadConnector,
    mindmap: loadMindmap,
};
export async function getDocByName(name) {
    if (docMap.get(name)) {
        return docMap.get(name);
    }
    const promise = initDoc(name);
    docMap.set(name, promise);
    return promise;
}
async function initDoc(name) {
    const snapshot = (await loaders[name]());
    const collection = getCollection();
    const transformer = new Transformer({
        schema: getAFFiNEWorkspaceSchema(),
        blobCRUD: collection.blobSync,
        docCRUD: {
            create: (id) => collection.createDoc(id).getStore({ id }),
            get: (id) => collection.getDoc(id)?.getStore({ id }) ?? null,
            delete: (id) => collection.removeDoc(id),
        },
        middlewares: [],
    });
    return await transformer.snapshotToDoc(snapshot);
}
//# sourceMappingURL=index.js.map