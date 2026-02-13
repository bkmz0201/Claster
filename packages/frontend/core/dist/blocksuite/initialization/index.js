import { NoteDisplayMode, } from '@blocksuite/affine/model';
import { Text } from '@blocksuite/affine/store';
export function initDocFromProps(doc, props, options = {}) {
    doc.load(() => {
        const pageBlockId = doc.addBlock('affine:page', props?.page || { title: new Text(options.title || '') });
        const surfaceId = doc.addBlock('affine:surface', props?.surface || {}, pageBlockId);
        const noteBlockId = doc.addBlock('affine:note', {
            ...props?.note,
            displayMode: NoteDisplayMode.DocAndEdgeless,
        }, pageBlockId);
        const paragraphBlockId = doc.addBlock('affine:paragraph', props?.paragraph || {}, noteBlockId);
        props?.onStoreLoad?.(doc, {
            noteId: noteBlockId,
            paragraphId: paragraphBlockId,
            surfaceId,
        });
        doc.history.undoManager.clear();
    });
}
//# sourceMappingURL=index.js.map