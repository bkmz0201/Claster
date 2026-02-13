import { useMemo } from 'react';
export function useDocCollectionHelper(docCollection) {
    return useMemo(() => ({
        createDoc: (pageId) => {
            return docCollection.createDoc(pageId).getStore();
        },
    }), [docCollection]);
}
//# sourceMappingURL=use-block-suite-workspace-helper.js.map