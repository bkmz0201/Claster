import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Scrollable } from '@affine/component';
import { PageDetailLoading } from '@affine/component/page-detail-skeleton';
import { AIProvider } from '@affine/core/blocksuite/ai';
import { EditorOutlineViewer } from '@affine/core/blocksuite/outline-viewer';
import { AffineErrorBoundary } from '@affine/core/components/affine/affine-error-boundary';
// import { PageAIOnboarding } from '@affine/core/components/affine/ai-onboarding';
import { GlobalPageHistoryModal } from '@affine/core/components/affine/page-history-modal';
import { CommentSidebar } from '@affine/core/components/comment/sidebar';
import { useGuard } from '@affine/core/components/guard';
import { useAppSettingHelper } from '@affine/core/components/hooks/affine/use-app-setting-helper';
import { useEnableAI } from '@affine/core/components/hooks/affine/use-enable-ai';
import { useRegisterBlocksuiteEditorCommands } from '@affine/core/components/hooks/affine/use-register-blocksuite-editor-commands';
import { useActiveBlocksuiteEditor } from '@affine/core/components/hooks/use-block-suite-editor';
import { PageDetailEditor } from '@affine/core/components/page-detail-editor';
import { WorkspacePropertySidebar } from '@affine/core/components/properties/sidebar';
import { TrashPageFooter } from '@affine/core/components/pure/trash-page-footer';
import { TopTip } from '@affine/core/components/top-tip';
import { ServerService } from '@affine/core/modules/cloud';
import { DocService } from '@affine/core/modules/doc';
import { EditorService } from '@affine/core/modules/editor';
import { FeatureFlagService } from '@affine/core/modules/feature-flag';
import { GlobalContextService } from '@affine/core/modules/global-context';
import { PeekViewService } from '@affine/core/modules/peek-view';
import { RecentDocsService } from '@affine/core/modules/quicksearch';
import { useIsActiveView, ViewBody, ViewHeader, ViewService, ViewSidebarTab, WorkbenchService, } from '@affine/core/modules/workbench';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { isNewTabTrigger } from '@affine/core/utils';
import { ServerFeature } from '@affine/graphql';
import track from '@affine/track';
import { DisposableGroup } from '@blocksuite/affine/global/disposable';
import { RefNodeSlotsProvider } from '@blocksuite/affine/inlines/reference';
import { AiIcon, CommentIcon, ExportIcon, FrameIcon, PropertyIcon, TocIcon, TodayIcon, } from '@blocksuite/icons/rc';
import { FrameworkScope, useLiveData, useService, useServices, } from '@toeverything/infra';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageNotFound } from '../../404';
import * as styles from './detail-page.css';
import { DetailPageHeader } from './detail-page-header';
import { DetailPageWrapper } from './detail-page-wrapper';
import { EditorAdapterPanel } from './tabs/adapter';
import { EditorChatPanel } from './tabs/chat';
import { EditorFramePanel } from './tabs/frame';
import { EditorJournalPanel } from './tabs/journal';
import { EditorOutlinePanel } from './tabs/outline';
const DetailPageImpl = memo(function DetailPageImpl() {
    const { workbenchService, viewService, editorService, docService, workspaceService, globalContextService, } = useServices({
        WorkbenchService,
        ViewService,
        EditorService,
        DocService,
        WorkspaceService,
        GlobalContextService,
    });
    const workbench = workbenchService.workbench;
    const editor = editorService.editor;
    const view = viewService.view;
    const workspace = workspaceService.workspace;
    const globalContext = globalContextService.globalContext;
    const doc = docService.doc;
    const mode = useLiveData(editor.mode$);
    const activeSidebarTab = useLiveData(view.activeSidebarTab$);
    const isInTrash = useLiveData(doc.meta$.map(meta => meta.trash));
    const editorContainer = useLiveData(editor.editorContainer$);
    const isSideBarOpen = useLiveData(workbench.sidebarOpen$);
    const { appSettings } = useAppSettingHelper();
    const chatPanelRef = useRef(null);
    const peekView = useService(PeekViewService).peekView;
    const isActiveView = useIsActiveView();
    // TODO(@eyhn): remove jotai here
    const [_, setActiveBlockSuiteEditor] = useActiveBlocksuiteEditor();
    const enableAI = useEnableAI();
    const featureFlagService = useService(FeatureFlagService);
    const enableAdapterPanel = useLiveData(featureFlagService.flags.enable_adapter_panel.$);
    const serverService = useService(ServerService);
    const serverConfig = useLiveData(serverService.server.config$);
    // comment may not be supported by the server
    const enableComment = workspace.flavour !== 'local' &&
        serverConfig.features.includes(ServerFeature.Comment);
    useEffect(() => {
        if (isActiveView) {
            setActiveBlockSuiteEditor(editorContainer);
        }
    }, [editorContainer, isActiveView, setActiveBlockSuiteEditor]);
    useEffect(() => {
        const disposables = [];
        const openHandler = (params) => {
            if (!params) {
                return;
            }
            workbench.openSidebar();
            view.activeSidebarTab('chat');
        };
        disposables.push(AIProvider.slots.requestOpenWithChat.subscribe(openHandler));
        disposables.push(AIProvider.slots.requestSendWithChat.subscribe(openHandler));
        return () => disposables.forEach(d => d.unsubscribe());
    }, [activeSidebarTab, view, workbench]);
    useEffect(() => {
        if (isActiveView) {
            globalContext.docId.set(doc.id);
            globalContext.isDoc.set(true);
            return () => {
                globalContext.docId.set(null);
                globalContext.isDoc.set(false);
            };
        }
        return;
    }, [doc, globalContext, isActiveView]);
    useEffect(() => {
        if (isActiveView) {
            globalContext.docMode.set(mode);
            return () => {
                globalContext.docMode.set(null);
            };
        }
        return;
    }, [doc, globalContext, isActiveView, mode]);
    useEffect(() => {
        if (isActiveView) {
            globalContext.isTrashDoc.set(!!isInTrash);
            return () => {
                globalContext.isTrashDoc.set(null);
            };
        }
        return;
    }, [globalContext, isActiveView, isInTrash]);
    useRegisterBlocksuiteEditorCommands(editor, isActiveView);
    const onLoad = useCallback((editorContainer) => {
        const std = editorContainer.std;
        const disposable = new DisposableGroup();
        if (std) {
            const refNodeSlots = std.getOptional(RefNodeSlotsProvider);
            if (refNodeSlots) {
                disposable.add(
                // the event should not be emitted by AffineReference
                refNodeSlots.docLinkClicked.subscribe(({ pageId, params, openMode, event, host }) => {
                    if (host !== editorContainer.host) {
                        return;
                    }
                    openMode ??=
                        event && isNewTabTrigger(event)
                            ? 'open-in-new-tab'
                            : 'open-in-active-view';
                    if (openMode === 'open-in-new-view') {
                        track.doc.editor.toolbar.openInSplitView();
                    }
                    else if (openMode === 'open-in-center-peek') {
                        track.doc.editor.toolbar.openInPeekView();
                    }
                    else if (openMode === 'open-in-new-tab') {
                        track.doc.editor.toolbar.openInNewTab();
                    }
                    if (openMode !== 'open-in-center-peek') {
                        const at = (() => {
                            if (openMode === 'open-in-active-view') {
                                return 'active';
                            }
                            // split view is only supported on electron
                            if (openMode === 'open-in-new-view') {
                                return BUILD_CONFIG.isElectron ? 'tail' : 'new-tab';
                            }
                            if (openMode === 'open-in-new-tab') {
                                return 'new-tab';
                            }
                            return 'active';
                        })();
                        workbench.openDoc({
                            docId: pageId,
                            mode: params?.mode,
                            blockIds: params?.blockIds,
                            elementIds: params?.elementIds,
                            refreshKey: nanoid(),
                        }, {
                            at: at,
                            show: true,
                        });
                    }
                    else {
                        peekView
                            .open({
                            docRef: {
                                docId: pageId,
                            },
                            ...params,
                        })
                            .catch(console.error);
                    }
                }));
            }
        }
        const unbind = editor.bindEditorContainer(editorContainer, editorContainer.docTitle, // set from proxy
        scrollViewportRef.current);
        return () => {
            unbind();
            disposable.dispose();
        };
    }, [editor, workbench, peekView]);
    const [hasScrollTop, setHasScrollTop] = useState(false);
    const openOutlinePanel = useCallback(() => {
        workbench.openSidebar();
        view.activeSidebarTab('outline');
    }, [workbench, view]);
    const scrollViewportRef = useRef(null);
    const handleScroll = useCallback((e) => {
        const scrollTop = e.currentTarget.scrollTop;
        const hasScrollTop = scrollTop > 0;
        setHasScrollTop(hasScrollTop);
    }, []);
    const [dragging, setDragging] = useState(false);
    const canEdit = useGuard('Doc_Update', doc.id);
    const readonly = !canEdit || isInTrash;
    return (_jsxs(FrameworkScope, { scope: editor.scope, children: [_jsx(ViewHeader, { children: _jsx(DetailPageHeader, { page: doc.blockSuiteDoc, workspace: workspace, onDragging: setDragging }) }), _jsx(ViewBody, { children: _jsxs("div", { className: styles.mainContainer, "data-dynamic-top-border": BUILD_CONFIG.isElectron, "data-has-scroll-top": hasScrollTop, children: [_jsxs(AffineErrorBoundary, { children: [_jsx(TopTip, { pageId: doc.id, workspace: workspace }), _jsxs(Scrollable.Root, { children: [_jsx(Scrollable.Viewport, { onScroll: handleScroll, ref: scrollViewportRef, "data-dragging": dragging, className: clsx('affine-page-viewport', styles.affineDocViewport, styles.editorContainer), children: _jsx(PageDetailEditor, { onLoad: onLoad, readonly: readonly }) }), _jsx(Scrollable.Scrollbar, { className: clsx({
                                                [styles.scrollbar]: !appSettings.clientBorder,
                                            }) })] }), _jsx(EditorOutlineViewer, { editor: editorContainer?.host ?? null, show: mode === 'page' && !isSideBarOpen, openOutlinePanel: openOutlinePanel })] }, doc.id), isInTrash ? _jsx(TrashPageFooter, {}) : null] }) }), enableAI && (_jsx(ViewSidebarTab, { tabId: "chat", icon: _jsx(AiIcon, {}), unmountOnInactive: false, children: _jsx(EditorChatPanel, { editor: editorContainer, ref: chatPanelRef }) })), _jsx(ViewSidebarTab, { tabId: "properties", icon: _jsx(PropertyIcon, {}), children: _jsxs(Scrollable.Root, { className: styles.sidebarScrollArea, children: [_jsx(Scrollable.Viewport, { children: _jsx(WorkspacePropertySidebar, {}) }), _jsx(Scrollable.Scrollbar, {})] }) }), _jsx(ViewSidebarTab, { tabId: "journal", icon: _jsx(TodayIcon, {}), children: _jsxs(Scrollable.Root, { className: styles.sidebarScrollArea, children: [_jsx(Scrollable.Viewport, { children: _jsx(EditorJournalPanel, {}) }), _jsx(Scrollable.Scrollbar, {})] }) }), _jsx(ViewSidebarTab, { tabId: "outline", icon: _jsx(TocIcon, {}), children: _jsxs(Scrollable.Root, { className: styles.sidebarScrollArea, children: [_jsx(Scrollable.Viewport, { children: _jsx(EditorOutlinePanel, { editor: editorContainer?.host ?? null }) }), _jsx(Scrollable.Scrollbar, {})] }) }), _jsx(ViewSidebarTab, { tabId: "frame", icon: _jsx(FrameIcon, {}), children: _jsxs(Scrollable.Root, { className: styles.sidebarScrollArea, children: [_jsx(Scrollable.Viewport, { children: _jsx(EditorFramePanel, { editor: editorContainer?.host ?? null }) }), _jsx(Scrollable.Scrollbar, {})] }) }), enableAdapterPanel && (_jsx(ViewSidebarTab, { tabId: "adapter", icon: _jsx(ExportIcon, {}), children: _jsx(Scrollable.Root, { className: styles.sidebarScrollArea, children: _jsx(Scrollable.Viewport, { children: _jsx(EditorAdapterPanel, { host: editorContainer?.host ?? null }) }) }) })), workspace.flavour !== 'local' && enableComment && (_jsx(ViewSidebarTab, { tabId: "comment", icon: _jsx(CommentIcon, {}), children: _jsxs(Scrollable.Root, { className: styles.sidebarScrollArea, children: [_jsx(Scrollable.Viewport, { children: _jsx(CommentSidebar, {}) }), _jsx(Scrollable.Scrollbar, {})] }) })), _jsx(GlobalPageHistoryModal, {})] }));
});
export const Component = () => {
    const params = useParams();
    const recentPages = useService(RecentDocsService);
    useEffect(() => {
        if (params.pageId) {
            const pageId = params.pageId;
            localStorage.setItem('last_page_id', pageId);
            recentPages.addRecentDoc(pageId);
        }
    }, [params, recentPages]);
    const pageId = params.pageId;
    const canAccess = useGuard('Doc_Read', pageId ?? '');
    return pageId ? (_jsx(DetailPageWrapper, { pageId: pageId, canAccess: canAccess, skeleton: _jsx(PageDetailLoading, {}), notFound: _jsx(PageNotFound, { noPermission: true }), children: _jsx(DetailPageImpl, {}) })) : null;
};
//# sourceMappingURL=detail-page.js.map