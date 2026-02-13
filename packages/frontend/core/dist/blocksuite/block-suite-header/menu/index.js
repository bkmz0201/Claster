import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { notify, toast, useConfirmModal } from '@affine/component';
import { Menu, MenuItem, MenuSeparator, MenuSub, } from '@affine/component/ui/menu';
import { PageHistoryModal } from '@affine/core/components/affine/page-history-modal';
import { useGuard } from '@affine/core/components/guard';
import { useBlockSuiteMetaHelper } from '@affine/core/components/hooks/affine/use-block-suite-meta-helper';
import { useEnableCloud } from '@affine/core/components/hooks/affine/use-enable-cloud';
import { useExportPage } from '@affine/core/components/hooks/affine/use-export-page';
import { Export, MoveToTrash } from '@affine/core/components/page-list';
import { IsFavoriteIcon } from '@affine/core/components/pure/icons';
import { useDetailPageHeaderResponsive } from '@affine/core/desktop/pages/workspace/detail-page/use-header-responsive';
import { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import { EditorService } from '@affine/core/modules/editor';
import { OpenInAppService } from '@affine/core/modules/open-in-app/services';
import { GuardService } from '@affine/core/modules/permissions';
import { ShareMenuContent } from '@affine/core/modules/share-menu';
import { WorkbenchService } from '@affine/core/modules/workbench';
import { ViewService } from '@affine/core/modules/workbench/services/view';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { DuplicateIcon, EdgelessIcon, EditIcon, FrameIcon, HistoryIcon, ImportIcon, InformationIcon, LocalWorkspaceIcon, OpenInNewIcon, PageIcon, ShareIcon, SplitViewIcon, TocIcon, } from '@blocksuite/icons/rc';
import { useLiveData, useService, useServiceOptional, } from '@toeverything/infra';
import { useCallback, useState } from 'react';
import { HeaderDropDownButton } from '../../../components/pure/header-drop-down-button';
import { useFavorite } from '../favorite';
import { HistoryTipsModal } from './history-tips-modal';
import { shareMenu } from './style.css';
export const PageHeaderMenuButton = ({ rename, page, isJournal, containerWidth, }) => {
    const workspace = useService(WorkspaceService).workspace;
    const editorService = useService(EditorService);
    const isInTrash = useLiveData(editorService.editor.doc.meta$.map(meta => meta.trash));
    const [historyModalOpen, setHistoryModalOpen] = useState(false);
    const [openHistoryTipsModal, setOpenHistoryTipsModal] = useState(false);
    const handleMenuOpenChange = useCallback((open) => {
        if (open) {
            track.$.header.docOptions.open();
        }
    }, []);
    const openHistoryModal = useCallback(() => {
        track.$.header.history.open();
        if (workspace.flavour !== 'local') {
            return setHistoryModalOpen(true);
        }
        return setOpenHistoryTipsModal(true);
    }, [setOpenHistoryTipsModal, workspace.flavour]);
    if (isInTrash) {
        return null;
    }
    return (_jsxs(_Fragment, { children: [_jsx(Menu, { items: _jsx(PageHeaderMenuItem, { page: page, containerWidth: containerWidth, rename: rename, isJournal: isJournal, openHistoryModal: openHistoryModal }), contentOptions: {
                    align: 'center',
                }, rootOptions: {
                    onOpenChange: handleMenuOpenChange,
                }, children: _jsx(HeaderDropDownButton, {}) }), workspace.flavour !== 'local' ? (_jsx(PageHistoryModal, { docCollection: workspace.docCollection, open: historyModalOpen, pageId: page.id, onOpenChange: setHistoryModalOpen })) : null, _jsx(HistoryTipsModal, { open: openHistoryTipsModal, setOpen: setOpenHistoryTipsModal })] }));
};
// fixme: refactor this file
const PageHeaderMenuItem = ({ rename, page, isJournal, containerWidth, openHistoryModal, }) => {
    const pageId = page?.id;
    const t = useI18n();
    const { hideShare } = useDetailPageHeaderResponsive(containerWidth);
    const confirmEnableCloud = useEnableCloud();
    const workspace = useService(WorkspaceService).workspace;
    const guardService = useService(GuardService);
    const editorService = useService(EditorService);
    const currentMode = useLiveData(editorService.editor.mode$);
    const primaryMode = useLiveData(editorService.editor.doc.primaryMode$);
    const workbench = useService(WorkbenchService).workbench;
    const openInAppService = useServiceOptional(OpenInAppService);
    const { favorite, toggleFavorite } = useFavorite(pageId);
    const { duplicate } = useBlockSuiteMetaHelper();
    const view = useService(ViewService).view;
    const openSidePanel = useCallback((id) => {
        workbench.openSidebar();
        view.activeSidebarTab(id);
    }, [workbench, view]);
    const openAllFrames = useCallback(() => {
        openSidePanel('frame');
    }, [openSidePanel]);
    const openOutlinePanel = useCallback(() => {
        openSidePanel('outline');
    }, [openSidePanel]);
    const workspaceDialogService = useService(WorkspaceDialogService);
    const openInfoModal = useCallback(() => {
        track.$.header.pageInfo.open();
        workspaceDialogService.open('doc-info', { docId: pageId });
    }, [workspaceDialogService, pageId]);
    const handleOpenInNewTab = useCallback(() => {
        workbench.openDoc(pageId, {
            at: 'new-tab',
        });
    }, [pageId, workbench]);
    const handleOpenInSplitView = useCallback(() => {
        workbench.openDoc(pageId, {
            at: 'tail',
        });
    }, [pageId, workbench]);
    const { openConfirmModal } = useConfirmModal();
    const handleOpenTrashModal = useCallback(() => {
        track.$.header.docOptions.deleteDoc();
        openConfirmModal({
            title: t['com.affine.moveToTrash.confirmModal.title'](),
            description: t['com.affine.moveToTrash.confirmModal.description']({
                title: editorService.editor.doc.title$.value || t['Untitled'](),
            }),
            cancelText: t['com.affine.confirmModal.button.cancel'](),
            confirmText: t.Delete(),
            confirmButtonOptions: {
                variant: 'error',
            },
            onConfirm: async () => {
                const canTrash = await guardService.can('Doc_Trash', pageId);
                if (!canTrash) {
                    toast(t['com.affine.no-permission']());
                    return;
                }
                editorService.editor.doc.moveToTrash();
            },
        });
    }, [editorService.editor.doc, guardService, openConfirmModal, pageId, t]);
    const handleRename = useCallback(() => {
        rename?.();
        track.$.header.docOptions.renameDoc();
    }, [rename]);
    const handleSwitchMode = useCallback(() => {
        const mode = primaryMode === 'page' ? 'edgeless' : 'page';
        editorService.editor.setMode(mode);
        editorService.editor.doc.setPrimaryMode(mode);
        track.$.header.docOptions.switchPageMode({
            mode,
        });
        notify.success({
            title: primaryMode === 'page'
                ? t['com.affine.toastMessage.defaultMode.edgeless.title']()
                : t['com.affine.toastMessage.defaultMode.page.title'](),
            message: primaryMode === 'page'
                ? t['com.affine.toastMessage.defaultMode.edgeless.message']()
                : t['com.affine.toastMessage.defaultMode.page.message'](),
        });
    }, [primaryMode, editorService, t]);
    const exportHandler = useExportPage();
    const handleDuplicate = useCallback(() => {
        duplicate(pageId);
        track.$.header.docOptions.createDoc({
            control: 'duplicate',
        });
    }, [duplicate, pageId]);
    const handleOpenDocs = useCallback((result) => {
        const { docIds, entryId, isWorkspaceFile } = result;
        // If the imported file is a workspace file, open the entry page.
        if (isWorkspaceFile && entryId) {
            workbench.openDoc(entryId);
        }
        else if (!docIds.length) {
            return;
        }
        // Open all the docs when there are multiple docs imported.
        if (docIds.length > 1) {
            workbench.openAll();
        }
        else {
            // Otherwise, open the only doc.
            workbench.openDoc(docIds[0]);
        }
    }, [workbench]);
    const handleOpenImportModal = useCallback(() => {
        track.$.header.importModal.open();
        workspaceDialogService.open('import', undefined, payload => {
            if (!payload) {
                return;
            }
            handleOpenDocs(payload);
        });
    }, [workspaceDialogService, handleOpenDocs]);
    const handleShareMenuOpenChange = useCallback((open) => {
        if (open) {
            track.$.sharePanel.$.open();
        }
    }, []);
    const handleToggleFavorite = useCallback(() => {
        track.$.header.docOptions.toggleFavorite();
        toggleFavorite();
    }, [toggleFavorite]);
    const showResponsiveMenu = hideShare;
    const ResponsiveMenuItems = (_jsxs(_Fragment, { children: [hideShare ? (_jsx(MenuSub, { subContentOptions: {
                    sideOffset: 12,
                    alignOffset: -8,
                    // to handle overflow when the width is not enough
                    collisionPadding: 20,
                }, items: _jsx("div", { className: shareMenu, children: _jsx(ShareMenuContent, { workspaceMetadata: workspace.meta, currentPage: page, onEnableAffineCloud: () => confirmEnableCloud(workspace, {
                            openPageId: page.id,
                        }) }) }), triggerOptions: {
                    prefixIcon: _jsx(ShareIcon, {}),
                }, subOptions: {
                    onOpenChange: handleShareMenuOpenChange,
                }, children: t['com.affine.share-menu.shareButton']() })) : null, _jsx(MenuSeparator, {})] }));
    const onOpenInDesktop = useCallback(() => {
        openInAppService?.showOpenInAppPage();
    }, [openInAppService]);
    const canEdit = useGuard('Doc_Update', pageId);
    const canMoveToTrash = useGuard('Doc_Trash', pageId);
    return (_jsxs(_Fragment, { children: [showResponsiveMenu ? ResponsiveMenuItems : null, !isJournal && (_jsx(MenuItem, { prefixIcon: _jsx(EditIcon, {}), "data-testid": "editor-option-menu-rename", onSelect: handleRename, disabled: !canEdit, children: t['Rename']() })), _jsx(MenuItem, { prefixIcon: primaryMode === 'page' ? _jsx(EdgelessIcon, {}) : _jsx(PageIcon, {}), "data-testid": "editor-option-menu-edgeless", onSelect: handleSwitchMode, disabled: !canEdit, children: primaryMode === 'page'
                    ? t['com.affine.editorDefaultMode.edgeless']()
                    : t['com.affine.editorDefaultMode.page']() }), _jsx(MenuItem, { "data-testid": "editor-option-menu-favorite", onSelect: handleToggleFavorite, prefixIcon: _jsx(IsFavoriteIcon, { favorite: favorite }), children: favorite
                    ? t['com.affine.favoritePageOperation.remove']()
                    : t['com.affine.favoritePageOperation.add']() }), _jsx(MenuSeparator, {}), _jsx(MenuItem, { prefixIcon: _jsx(OpenInNewIcon, {}), "data-testid": "editor-option-menu-open-in-new-tab", onSelect: handleOpenInNewTab, children: t['com.affine.workbench.tab.page-menu-open']() }), BUILD_CONFIG.isElectron && (_jsx(MenuItem, { prefixIcon: _jsx(SplitViewIcon, {}), "data-testid": "editor-option-menu-open-in-split-new", onSelect: handleOpenInSplitView, children: t['com.affine.workbench.split-view.page-menu-open']() })), _jsx(MenuSeparator, {}), _jsx(MenuItem, { prefixIcon: _jsx(InformationIcon, {}), "data-testid": "editor-option-menu-info", onSelect: openInfoModal, children: t['com.affine.page-properties.page-info.view']() }), currentMode === 'page' ? (_jsx(MenuItem, { prefixIcon: _jsx(TocIcon, {}), "data-testid": "editor-option-toc", onSelect: openOutlinePanel, children: t['com.affine.header.option.view-toc']() })) : (_jsx(MenuItem, { prefixIcon: _jsx(FrameIcon, {}), "data-testid": "editor-option-frame", onSelect: openAllFrames, children: t['com.affine.header.option.view-frame']() })), _jsx(MenuItem, { prefixIcon: _jsx(HistoryIcon, {}), "data-testid": "editor-option-menu-history", onSelect: openHistoryModal, children: t['com.affine.history.view-history-version']() }), _jsx(MenuSeparator, {}), !isJournal && (_jsx(MenuItem, { prefixIcon: _jsx(DuplicateIcon, {}), "data-testid": "editor-option-menu-duplicate", onSelect: handleDuplicate, children: t['com.affine.header.option.duplicate']() })), _jsx(MenuItem, { prefixIcon: _jsx(ImportIcon, {}), "data-testid": "editor-option-menu-import", onSelect: handleOpenImportModal, children: t['Import']() }), _jsx(Export, { exportHandler: exportHandler, pageMode: currentMode }), _jsx(MenuSeparator, {}), _jsx(MoveToTrash, { "data-testid": "editor-option-menu-delete", onSelect: handleOpenTrashModal, disabled: !canMoveToTrash }), BUILD_CONFIG.isWeb && workspace.flavour !== 'local' ? (_jsx(MenuItem, { prefixIcon: _jsx(LocalWorkspaceIcon, {}), "data-testid": "editor-option-menu-link", onSelect: onOpenInDesktop, children: t['com.affine.header.option.open-in-desktop']() })) : null] }));
};
//# sourceMappingURL=index.js.map