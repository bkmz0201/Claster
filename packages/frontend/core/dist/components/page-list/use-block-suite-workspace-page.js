import { DebugLogger } from '@affine/debug';
import { DisposableGroup } from '@blocksuite/affine/global/disposable';
import { useEffect, useState } from 'react';
const logger = new DebugLogger('useBlockSuiteWorkspacePage');
export function useDocCollectionPage(docCollection, pageId) {
    const [page, setPage] = useState(pageId ? (docCollection.getDoc(pageId)?.getStore() ?? null) : null);
    useEffect(() => {
        const group = new DisposableGroup();
        group.add(docCollection.slots.docListUpdated.subscribe(() => {
            if (!pageId) {
                setPage(null);
            }
            else {
                setPage(docCollection.getDoc(pageId)?.getStore() ?? null);
            }
        }));
        return () => {
            group.dispose();
        };
    }, [docCollection, pageId]);
    useEffect(() => {
        if (page && !page.loaded) {
            try {
                page.load();
            }
            catch (err) {
                logger.error('Failed to load page', err);
            }
        }
    }, [page]);
    useEffect(() => {
        if (page?.id !== pageId) {
            setPage(pageId ? (docCollection.getDoc(pageId)?.getStore() ?? null) : null);
        }
    }, [docCollection, page?.id, pageId]);
    return page;
}
//# sourceMappingURL=use-block-suite-workspace-page.js.map