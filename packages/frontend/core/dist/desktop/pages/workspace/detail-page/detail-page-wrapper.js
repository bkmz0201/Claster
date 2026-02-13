import { jsx as _jsx } from "react/jsx-runtime";
import { DocsService } from '@affine/core/modules/doc';
import { EditorsService } from '@affine/core/modules/editor';
import { ViewService } from '@affine/core/modules/workbench/services/view';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { FrameworkScope, useLiveData, useService } from '@toeverything/infra';
import { useEffect, useLayoutEffect, useState, } from 'react';
const useLoadDoc = (pageId) => {
    const currentWorkspace = useService(WorkspaceService).workspace;
    const docsService = useService(DocsService);
    const docRecordList = docsService.list;
    const docListReady = useLiveData(docRecordList.isReady$);
    const docRecord = useLiveData(docRecordList.doc$(pageId));
    const viewService = useService(ViewService);
    const [doc, setDoc] = useState(null);
    const [editor, setEditor] = useState(null);
    useLayoutEffect(() => {
        if (!docRecord) {
            return;
        }
        const { doc, release } = docsService.open(pageId);
        setDoc(doc);
        const editor = doc.scope.get(EditorsService).createEditor();
        const unbind = editor.bindWorkbenchView(viewService.view);
        setEditor(editor);
        return () => {
            unbind();
            editor.dispose();
            release();
        };
    }, [docRecord, docsService, pageId, viewService.view]);
    // set sync engine priority target
    useEffect(() => {
        return currentWorkspace.engine.doc.addPriority(pageId, 10);
    }, [currentWorkspace, pageId]);
    const isInTrash = useLiveData(doc?.meta$.map(meta => meta.trash));
    useEffect(() => {
        if (doc && isInTrash) {
            doc.blockSuiteDoc.readonly = true;
        }
    }, [doc, isInTrash]);
    return {
        doc,
        editor,
        docListReady,
    };
};
/**
 * A common wrapper for detail page for both mobile and desktop page.
 * It only contains the logic for page loading, context setup, but not the page content.
 */
export const DetailPageWrapper = ({ pageId, children, skeleton, notFound, canAccess, }) => {
    const { doc, editor, docListReady } = useLoadDoc(pageId);
    // if sync engine has been synced and the page is null, show 404 page.
    if (docListReady && !doc) {
        return notFound;
    }
    if (canAccess === undefined || !doc || !editor) {
        return skeleton;
    }
    else if (!canAccess) {
        return notFound;
    }
    return (_jsx(FrameworkScope, { scope: doc.scope, children: _jsx(FrameworkScope, { scope: editor.scope, children: children }) }));
};
//# sourceMappingURL=detail-page-wrapper.js.map