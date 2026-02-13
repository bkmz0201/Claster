import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Scrollable } from '@affine/component';
import { PageDetailLoading } from '@affine/component/page-detail-skeleton';
import { AIProvider } from '@affine/core/blocksuite/ai';
import { EditorOutlineViewer } from '@affine/core/blocksuite/outline-viewer';
import { AffineErrorBoundary } from '@affine/core/components/affine/affine-error-boundary';
import { useGuard } from '@affine/core/components/guard';
import { PageNotFound } from '@affine/core/desktop/pages/404';
import { EditorService } from '@affine/core/modules/editor';
import { DebugLogger } from '@affine/debug';
import { DisposableGroup } from '@blocksuite/affine/global/disposable';
import { Bound } from '@blocksuite/affine/global/gfx';
import { RefNodeSlotsProvider } from '@blocksuite/affine/inlines/reference';
import { GfxControllerIdentifier } from '@blocksuite/affine/std/gfx';
import { FrameworkScope, useLiveData, useService, useServices, } from '@toeverything/infra';
import clsx from 'clsx';
import { lazy, Suspense, useCallback, useEffect } from 'react';
import { WorkbenchService } from '../../../workbench';
import { PeekViewService } from '../../services/peek-view';
import { useEditor } from '../utils';
import * as styles from './doc-peek-view.css';
const logger = new DebugLogger('doc-peek-view');
// Lazy load BlockSuiteEditor to break circular dependency
const BlockSuiteEditor = lazy(() => import('@affine/core/blocksuite/block-suite-editor').then(module => ({
    default: module.BlockSuiteEditor,
})));
function fitViewport(editor, xywh) {
    try {
        if (!editor.host) {
            throw new Error('editor host is not ready');
        }
        const gfx = editor.host.std.get(GfxControllerIdentifier);
        const viewport = gfx.viewport;
        viewport.onResize();
        if (xywh) {
            const newViewport = {
                xywh: xywh,
                padding: [60, 20, 20, 20],
            };
            viewport.setViewportByBound(Bound.deserialize(newViewport.xywh), newViewport.padding, false);
        }
        else {
            gfx.fitToScreen({
                smooth: false,
            });
        }
    }
    catch (e) {
        logger.warn('failed to fitViewPort', e);
    }
}
function DocPeekPreviewEditor({ xywh, }) {
    const { editorService } = useServices({
        EditorService,
    });
    const editor = editorService.editor;
    const doc = editor.doc;
    const workspace = editor.doc.workspace;
    const mode = useLiveData(editor.mode$);
    const defaultOpenProperty = useLiveData(editor.defaultOpenProperty$);
    const workbench = useService(WorkbenchService).workbench;
    const peekView = useService(PeekViewService).peekView;
    const editorElement = useLiveData(editor.editorContainer$);
    const isInTrash = useLiveData(doc.record.trash$);
    const handleOnEditorReady = useCallback((editorContainer) => {
        const disposableGroup = new DisposableGroup();
        const refNodeSlots = editorContainer.std.getOptional(RefNodeSlotsProvider);
        if (!refNodeSlots)
            return;
        // doc change event inside peek view should be handled by peek view
        disposableGroup.add(
        // todo(@pengx17): seems not working
        refNodeSlots.docLinkClicked.subscribe(options => {
            if (options.host !== editorContainer.host) {
                return;
            }
            peekView
                .open({
                docRef: { docId: options.pageId },
                ...options.params,
            })
                .catch(console.error);
        }));
        const unbind = editor.bindEditorContainer(editorContainer);
        if (mode === 'edgeless') {
            fitViewport(editorContainer, xywh);
        }
        return () => {
            unbind();
            disposableGroup.dispose();
        };
    }, [editor, mode, peekView, xywh]);
    useEffect(() => {
        const disposables = [];
        const openHandler = (params) => {
            if (!params) {
                return;
            }
            if (doc) {
                workbench.openDoc(doc.id);
                peekView.close();
                // chat panel open is already handled in <DetailPageImpl />
            }
        };
        disposables.push(AIProvider.slots.requestOpenWithChat.subscribe(openHandler));
        disposables.push(AIProvider.slots.requestSendWithChat.subscribe(openHandler));
        return () => disposables.forEach(d => d.unsubscribe());
    }, [doc, peekView, workbench, workspace.id]);
    const openOutlinePanel = useCallback(() => {
        workbench.openDoc(doc.id);
        workbench.openSidebar();
        workbench.activeView$.value.activeSidebarTab('outline');
        peekView.close();
    }, [doc, peekView, workbench]);
    const canEdit = useGuard('Doc_Update', doc.id);
    const readonly = !canEdit || isInTrash;
    return (_jsxs(AffineErrorBoundary, { children: [_jsxs(Scrollable.Root, { children: [_jsx(Scrollable.Viewport, { className: clsx('affine-page-viewport', styles.affineDocViewport), children: _jsx(Suspense, { fallback: _jsx(PageDetailLoading, {}), children: _jsx(BlockSuiteEditor, { className: styles.editor, mode: mode, page: doc.blockSuiteDoc, readonly: readonly, onEditorReady: handleOnEditorReady, defaultOpenProperty: defaultOpenProperty }) }) }), _jsx(Scrollable.Scrollbar, {})] }), !BUILD_CONFIG.isMobileEdition && !BUILD_CONFIG.isMobileWeb ? (_jsx(EditorOutlineViewer, { editor: editorElement?.host ?? null, show: mode === 'page', openOutlinePanel: openOutlinePanel })) : null] }));
}
export function DocPeekPreview({ docRef, animating, }) {
    const { docId, blockIds, elementIds, mode, xywh, databaseId, databaseDocId, databaseRowId, } = docRef;
    const { doc, editor, loading } = useEditor(docId, mode, {
        blockIds,
        elementIds,
    }, databaseId && databaseRowId && databaseDocId
        ? {
            docId: databaseDocId,
            databaseId,
            databaseRowId,
            type: 'database',
        }
        : undefined, !animating);
    const canAccess = useGuard('Doc_Read', docId);
    // if sync engine has been synced and the page is null, show 404 page.
    if (!doc || !editor || !canAccess) {
        return loading || canAccess === undefined ? (_jsx(PageDetailLoading, {}, "current-page-is-null")) : (_jsx(PageNotFound, { noPermission: true }));
    }
    return (_jsx(FrameworkScope, { scope: doc.scope, children: _jsx(FrameworkScope, { scope: editor.scope, children: _jsx(DocPeekPreviewEditor, { xywh: xywh }) }) }));
}
//# sourceMappingURL=doc-peek-view.js.map