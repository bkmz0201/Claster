import { Text, } from '@blocksuite/affine/store';
import { useCallback } from 'react';
export function useReferenceLinkHelper(docCollection) {
    const addReferenceLink = useCallback((pageId, referenceId) => {
        const page = docCollection?.getDoc(pageId)?.getStore();
        if (!page) {
            return;
        }
        const text = new Text([
            {
                insert: ' ',
                attributes: {
                    reference: {
                        type: 'Subpage',
                        pageId: referenceId,
                    },
                },
            },
        ]);
        const [frame] = page.getModelsByFlavour('affine:note');
        frame && page.addBlock('affine:paragraph', { text }, frame.id);
    }, [docCollection]);
    return {
        addReferenceLink,
    };
}
//# sourceMappingURL=use-reference-link-helper.js.map