import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton, Menu, MenuItem, useConfirmModal, } from '@affine/component';
import { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import { DocsService } from '@affine/core/modules/doc';
import { CompatibleFavoriteItemsAdapter } from '@affine/core/modules/favorite';
import { GuardService } from '@affine/core/modules/permissions';
import { WorkbenchService } from '@affine/core/modules/workbench';
import { useI18n } from '@affine/i18n';
import track from '@affine/track';
import { DeleteIcon, DuplicateIcon, InformationIcon, MoreVerticalIcon, OpenInNewIcon, SplitViewIcon, } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useContext } from 'react';
import { useBlockSuiteMetaHelper } from '../../hooks/affine/use-block-suite-meta-helper';
import { IsFavoriteIcon } from '../../pure/icons';
import { DocExplorerContext } from '../context';
/**
 * Favorite Operation
 */
const ToggleFavorite = ({ docId }) => {
    const t = useI18n();
    const favAdapter = useService(CompatibleFavoriteItemsAdapter);
    const favourite = useLiveData(favAdapter.isFavorite$(docId, 'doc'));
    const toggleFavorite = useCallback(() => {
        favAdapter.toggle(docId, 'doc');
        track.allDocs.list.docMenu.toggleFavorite();
    }, [docId, favAdapter]);
    return (_jsx(MenuItem, { prefixIcon: _jsx(IsFavoriteIcon, { favorite: favourite }), onClick: toggleFavorite, "data-testid": "doc-list-operation-favorite", children: favourite
            ? t['com.affine.favoritePageOperation.remove']()
            : t['com.affine.favoritePageOperation.add']() }));
};
/**
 * Doc Info Operation
 */
const DocInfo = ({ docId }) => {
    const t = useI18n();
    const workspaceDialogService = useService(WorkspaceDialogService);
    const onOpenInfoModal = useCallback(() => {
        if (docId) {
            track.allDocs.list.docMenu.openDocInfo();
            workspaceDialogService.open('doc-info', { docId });
        }
    }, [docId, workspaceDialogService]);
    return (_jsx(MenuItem, { onClick: onOpenInfoModal, prefixIcon: _jsx(InformationIcon, {}), children: t['com.affine.page-properties.page-info.view']() }));
};
/**
 * Open in New Tab Operation
 */
const NewTab = ({ docId }) => {
    const t = useI18n();
    const workbench = useService(WorkbenchService).workbench;
    const onOpenInNewTab = useCallback(() => {
        track.allDocs.list.doc.openDoc();
        track.allDocs.list.docMenu.openInNewTab();
        workbench.openDoc(docId, { at: 'new-tab' });
    }, [docId, workbench]);
    return (_jsx(MenuItem, { onClick: onOpenInNewTab, prefixIcon: _jsx(OpenInNewIcon, {}), children: t['com.affine.workbench.tab.page-menu-open']() }));
};
/**
 * Open in Split View Operation
 */
const SplitView = ({ docId }) => {
    const t = useI18n();
    const workbench = useService(WorkbenchService).workbench;
    const onOpenInSplitView = useCallback(() => {
        track.allDocs.list.doc.openDoc();
        track.allDocs.list.docMenu.openInSplitView();
        workbench.openDoc(docId, { at: 'tail' });
    }, [docId, workbench]);
    return (_jsx(MenuItem, { onClick: onOpenInSplitView, prefixIcon: _jsx(SplitViewIcon, {}), children: t['com.affine.workbench.split-view.page-menu-open']() }));
};
/**
 * Duplicate Operation
 */
const Duplicate = ({ docId }) => {
    const { duplicate } = useBlockSuiteMetaHelper();
    const t = useI18n();
    const onDuplicate = useCallback(() => {
        duplicate(docId, false);
        track.allDocs.list.docMenu.createDoc({
            control: 'duplicate',
        });
    }, [docId, duplicate]);
    return (_jsx(MenuItem, { prefixIcon: _jsx(DuplicateIcon, {}), onSelect: onDuplicate, children: t['com.affine.header.option.duplicate']() }));
};
/**
 * Move to Trash Operation
 */
const MoveToTrash = ({ docId }) => {
    const t = useI18n();
    const docsService = useService(DocsService);
    const { openConfirmModal } = useConfirmModal();
    const doc = useLiveData(docsService.list.doc$(docId));
    const guardService = useService(GuardService);
    const canTrash = useLiveData(guardService.can$('Doc_Trash', docId));
    const onMoveToTrash = useCallback(() => {
        if (!doc) {
            return;
        }
        track.allDocs.list.docMenu.deleteDoc();
        openConfirmModal({
            title: t['com.affine.moveToTrash.confirmModal.title'](),
            description: t['com.affine.moveToTrash.confirmModal.description']({
                title: doc.title$.value || t['Untitled'](),
            }),
            cancelText: t['com.affine.confirmModal.button.cancel'](),
            confirmText: t.Delete(),
            confirmButtonOptions: {
                variant: 'error',
            },
            onConfirm: () => {
                doc.moveToTrash();
            },
        });
    }, [doc, openConfirmModal, t]);
    return (_jsx(MenuItem, { prefixIcon: _jsx(DeleteIcon, {}), "data-testid": "doc-list-operation-trash", onClick: onMoveToTrash, disabled: !canTrash, children: t['com.affine.moveToTrash.title']() }));
};
export const MoreMenuContent = (props) => {
    return (_jsxs(_Fragment, { children: [_jsx(ToggleFavorite, { ...props }), _jsx(DocInfo, { ...props }), _jsx(NewTab, { ...props }), BUILD_CONFIG.isElectron ? _jsx(SplitView, { ...props }) : null, _jsx(Duplicate, { ...props }), _jsx(MoveToTrash, { ...props })] }));
};
export const MoreMenu = ({ docId, children, contentOptions, ...menuProps }) => {
    return (_jsx(Menu, { items: _jsx(MoreMenuContent, { docId: docId }), contentOptions: {
            ...contentOptions,
            onClick: e => {
                // prevent external click events from being triggered
                e.stopPropagation();
                contentOptions?.onClick?.(e);
            },
        }, ...menuProps, children: children }));
};
export const MoreMenuButton = ({ docId, iconProps, ...menuProps }) => {
    const contextValue = useContext(DocExplorerContext);
    const showMoreOperation = useLiveData(contextValue.showMoreOperation$);
    if (!showMoreOperation) {
        return null;
    }
    return (_jsx(MoreMenu, { docId: docId, ...menuProps, children: _jsx(IconButton, { "data-testid": "doc-list-operation-button", icon: _jsx(MoreVerticalIcon, {}), ...iconProps }) }));
};
//# sourceMappingURL=more-menu.js.map