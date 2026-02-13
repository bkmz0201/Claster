import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton, Menu, MenuItem, toast, useConfirmModal, usePromptModal, } from '@affine/component';
import { useBlockSuiteMetaHelper } from '@affine/core/components/hooks/affine/use-block-suite-meta-helper';
import { useCatchEventCallback } from '@affine/core/components/hooks/use-catch-event-hook';
import { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import { DocsService } from '@affine/core/modules/doc';
import { CompatibleFavoriteItemsAdapter, FavoriteService, } from '@affine/core/modules/favorite';
import { WorkbenchService } from '@affine/core/modules/workbench';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { DeleteIcon, DeletePermanentlyIcon, DuplicateIcon, EditIcon, FilterIcon, FilterMinusIcon, InformationIcon, MoreVerticalIcon, OpenInNewIcon, PlusIcon, ResetIcon, SplitViewIcon, } from '@blocksuite/icons/rc';
import { useLiveData, useService, useServices } from '@toeverything/infra';
import { useCallback, useState } from 'react';
import { CollectionService, } from '../../modules/collection';
import { useGuard } from '../guard';
import { IsFavoriteIcon } from '../pure/icons';
import { FavoriteTag } from './components/favorite-tag';
import * as styles from './list.css';
import { DisablePublicSharing, MoveToTrash } from './operation-menu-items';
import { CreateOrEditTag } from './tags/create-tag';
import { ColWrapper } from './utils';
const tooltipSideTop = { side: 'top' };
const tooltipSideTopAlignEnd = { side: 'top', align: 'end' };
const PageOperationCellMenuItem = ({ isInAllowList, page, onRemoveFromAllowList, }) => {
    const t = useI18n();
    const { workspaceService, compatibleFavoriteItemsAdapter: favAdapter, workbenchService, } = useServices({
        WorkspaceService,
        CompatibleFavoriteItemsAdapter,
        WorkbenchService,
    });
    const canMoveToTrash = useGuard('Doc_Trash', page.id);
    const currentWorkspace = workspaceService.workspace;
    const favourite = useLiveData(favAdapter.isFavorite$(page.id, 'doc'));
    const workbench = workbenchService.workbench;
    const { duplicate } = useBlockSuiteMetaHelper();
    const docRecord = useLiveData(useService(DocsService).list.doc$(page.id));
    const blocksuiteDoc = currentWorkspace.docCollection.getDoc(page.id);
    const workspaceDialogService = useService(WorkspaceDialogService);
    const onOpenInfoModal = useCallback(() => {
        if (blocksuiteDoc?.id) {
            track.$.docInfoPanel.$.open();
            workspaceDialogService.open('doc-info', { docId: blocksuiteDoc.id });
        }
    }, [blocksuiteDoc?.id, workspaceDialogService]);
    const onDisablePublicSharing = useCallback(() => {
        // TODO(@EYHN): implement disable public sharing
        toast('Successfully disabled', {
            portal: document.body,
        });
    }, []);
    const { openConfirmModal } = useConfirmModal();
    const onRemoveToTrash = useCallback(() => {
        if (!docRecord) {
            return;
        }
        track.allDocs.list.docMenu.deleteDoc();
        openConfirmModal({
            title: t['com.affine.moveToTrash.confirmModal.title'](),
            description: t['com.affine.moveToTrash.confirmModal.description']({
                title: docRecord.title$.value || t['Untitled'](),
            }),
            cancelText: t['com.affine.confirmModal.button.cancel'](),
            confirmText: t.Delete(),
            confirmButtonOptions: {
                variant: 'error',
            },
            onConfirm: () => {
                docRecord.moveToTrash();
            },
        });
    }, [docRecord, openConfirmModal, t]);
    const onOpenInSplitView = useCallback(() => {
        track.allDocs.list.docMenu.openInSplitView();
        workbench.openDoc(page.id, { at: 'tail' });
    }, [page.id, workbench]);
    const onOpenInNewTab = useCallback(() => {
        workbench.openDoc(page.id, { at: 'new-tab' });
    }, [page.id, workbench]);
    const onToggleFavoritePage = useCallback(() => {
        const status = favAdapter.isFavorite(page.id, 'doc');
        favAdapter.toggle(page.id, 'doc');
        toast(status
            ? t['com.affine.toastMessage.removedFavorites']()
            : t['com.affine.toastMessage.addedFavorites']());
    }, [page.id, favAdapter, t]);
    const onToggleFavoritePageOption = useCallback(() => {
        track.allDocs.list.docMenu.toggleFavorite();
        onToggleFavoritePage();
    }, [onToggleFavoritePage]);
    const onDuplicate = useCallback(() => {
        duplicate(page.id, false);
        track.allDocs.list.docMenu.createDoc({
            control: 'duplicate',
        });
    }, [duplicate, page.id]);
    const handleRemoveFromAllowList = useCallback(() => {
        if (onRemoveFromAllowList) {
            onRemoveFromAllowList();
            track.collection.docList.docMenu.removeOrganizeItem({ type: 'doc' });
        }
    }, [onRemoveFromAllowList]);
    return (_jsxs(_Fragment, { children: [page.isPublic && (_jsx(DisablePublicSharing, { "data-testid": "disable-public-sharing", onSelect: onDisablePublicSharing })), isInAllowList && (_jsx(MenuItem, { onClick: handleRemoveFromAllowList, prefixIcon: _jsx(FilterMinusIcon, {}), children: t['Remove special filter']() })), _jsx(MenuItem, { onClick: onToggleFavoritePageOption, prefixIcon: _jsx(IsFavoriteIcon, { favorite: favourite }), children: favourite
                    ? t['com.affine.favoritePageOperation.remove']()
                    : t['com.affine.favoritePageOperation.add']() }), _jsx(MenuItem, { onClick: onOpenInfoModal, prefixIcon: _jsx(InformationIcon, {}), children: t['com.affine.page-properties.page-info.view']() }), _jsx(MenuItem, { onClick: onOpenInNewTab, prefixIcon: _jsx(OpenInNewIcon, {}), children: t['com.affine.workbench.tab.page-menu-open']() }), BUILD_CONFIG.isElectron ? (_jsx(MenuItem, { onClick: onOpenInSplitView, prefixIcon: _jsx(SplitViewIcon, {}), children: t['com.affine.workbench.split-view.page-menu-open']() })) : null, _jsx(MenuItem, { prefixIcon: _jsx(DuplicateIcon, {}), onSelect: onDuplicate, children: t['com.affine.header.option.duplicate']() }), _jsx(MoveToTrash, { "data-testid": "move-to-trash", onSelect: onRemoveToTrash, disabled: !canMoveToTrash })] }));
};
export const PageOperationCell = ({ isInAllowList, page, onRemoveFromAllowList, }) => {
    const t = useI18n();
    const { compatibleFavoriteItemsAdapter: favAdapter } = useServices({
        CompatibleFavoriteItemsAdapter,
    });
    const favourite = useLiveData(favAdapter.isFavorite$(page.id, 'doc'));
    const onToggleFavoritePage = useCallback(() => {
        const status = favAdapter.isFavorite(page.id, 'doc');
        favAdapter.toggle(page.id, 'doc');
        toast(status
            ? t['com.affine.toastMessage.removedFavorites']()
            : t['com.affine.toastMessage.addedFavorites']());
    }, [page.id, favAdapter, t]);
    return (_jsxs(_Fragment, { children: [_jsx(ColWrapper, { hideInSmallContainer: true, "data-testid": "page-list-item-favorite", "data-favorite": favourite ? true : undefined, className: styles.favoriteCell, children: _jsx(FavoriteTag, { onClick: onToggleFavoritePage, active: favourite }) }), _jsx(ColWrapper, { alignment: "start", children: _jsx(Menu, { items: _jsx(PageOperationCellMenuItem, { page: page, isInAllowList: isInAllowList, onRemoveFromAllowList: onRemoveFromAllowList }), contentOptions: {
                        align: 'end',
                    }, children: _jsx(IconButton, { "data-testid": "page-list-operation-button", size: "20", children: _jsx(MoreVerticalIcon, {}) }) }) })] }));
};
export const TrashOperationCell = ({ onPermanentlyDeletePage, onRestorePage, }) => {
    const t = useI18n();
    const { openConfirmModal } = useConfirmModal();
    const onConfirmPermanentlyDelete = useCatchEventCallback(e => {
        e.preventDefault();
        openConfirmModal({
            title: `${t['com.affine.trashOperation.deletePermanently']()}?`,
            description: t['com.affine.trashOperation.deleteDescription'](),
            cancelText: t['Cancel'](),
            confirmText: t['com.affine.trashOperation.delete'](),
            confirmButtonOptions: {
                variant: 'error',
            },
            onConfirm: onPermanentlyDeletePage,
        });
    }, [onPermanentlyDeletePage, openConfirmModal, t]);
    const handleRestorePage = useCatchEventCallback(e => {
        e.preventDefault();
        onRestorePage();
    }, [onRestorePage]);
    return (_jsxs(ColWrapper, { flex: 1, children: [_jsx(IconButton, { tooltip: t['com.affine.trashOperation.restoreIt'](), tooltipOptions: tooltipSideTop, "data-testid": "restore-page-button", style: { marginRight: '12px' }, onClick: handleRestorePage, size: "20", children: _jsx(ResetIcon, {}) }), _jsx(IconButton, { tooltip: t['com.affine.trashOperation.deletePermanently'](), tooltipOptions: tooltipSideTopAlignEnd, "data-testid": "delete-page-button", onClick: onConfirmPermanentlyDelete, className: styles.deleteButton, iconClassName: styles.deleteIcon, size: "20", children: _jsx(DeletePermanentlyIcon, {}) })] }));
};
export const CollectionOperationCell = ({ collectionMeta, }) => {
    const t = useI18n();
    const { compatibleFavoriteItemsAdapter: favAdapter, workspaceDialogService, collectionService, docsService, } = useServices({
        CompatibleFavoriteItemsAdapter,
        WorkspaceDialogService,
        CollectionService,
        DocsService,
    });
    const collectionId = collectionMeta.id;
    const { openConfirmModal } = useConfirmModal();
    const favourite = useLiveData(favAdapter.isFavorite$(collectionId, 'collection'));
    const { openPromptModal } = usePromptModal();
    const handlePropagation = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
    }, []);
    const handleEditName = useCallback((event) => {
        handlePropagation(event);
        openPromptModal({
            title: t['com.affine.editCollection.renameCollection'](),
            label: t['com.affine.editCollectionName.name'](),
            inputOptions: {
                placeholder: t['com.affine.editCollectionName.name.placeholder'](),
            },
            confirmText: t['com.affine.editCollection.save'](),
            cancelText: t['com.affine.editCollection.button.cancel'](),
            confirmButtonOptions: {
                variant: 'primary',
            },
            onConfirm(name) {
                collectionService.updateCollection(collectionId, {
                    name,
                });
            },
        });
    }, [collectionId, collectionService, handlePropagation, openPromptModal, t]);
    const handleEdit = useCallback((event) => {
        handlePropagation(event);
        workspaceDialogService.open('collection-editor', {
            collectionId: collectionId,
        });
    }, [handlePropagation, workspaceDialogService, collectionId]);
    const handleDelete = useCallback(() => {
        return collectionService.deleteCollection(collectionId);
    }, [collectionId, collectionService]);
    const onToggleFavoriteCollection = useCallback(() => {
        const status = favAdapter.isFavorite(collectionId, 'collection');
        favAdapter.toggle(collectionId, 'collection');
        toast(status
            ? t['com.affine.toastMessage.removedFavorites']()
            : t['com.affine.toastMessage.addedFavorites']());
    }, [favAdapter, collectionId, t]);
    const createAndAddDocument = useCallback(() => {
        const newDoc = docsService.createDoc();
        collectionService.addDocToCollection(collectionId, newDoc.id);
    }, [docsService, collectionService, collectionId]);
    const onConfirmAddDocToCollection = useCallback(() => {
        openConfirmModal({
            title: t['com.affine.collection.add-doc.confirm.title'](),
            description: t['com.affine.collection.add-doc.confirm.description'](),
            cancelText: t['Cancel'](),
            confirmText: t['Confirm'](),
            confirmButtonOptions: {
                variant: 'primary',
            },
            onConfirm: createAndAddDocument,
        });
    }, [createAndAddDocument, openConfirmModal, t]);
    return (_jsxs(_Fragment, { children: [_jsx(ColWrapper, { hideInSmallContainer: true, "data-testid": "page-list-item-favorite", "data-favorite": favourite ? true : undefined, className: styles.favoriteCell, children: _jsx(FavoriteTag, { onClick: onToggleFavoriteCollection, active: favourite }) }), _jsx(IconButton, { onClick: handleEditName, tooltip: t['com.affine.collection.menu.rename'](), tooltipOptions: tooltipSideTop, children: _jsx(EditIcon, {}) }), _jsx(IconButton, { onClick: handleEdit, tooltip: t['com.affine.collection.menu.edit'](), tooltipOptions: tooltipSideTop, children: _jsx(FilterIcon, {}) }), _jsx(ColWrapper, { alignment: "start", children: _jsx(Menu, { items: _jsxs(_Fragment, { children: [_jsx(MenuItem, { onClick: onToggleFavoriteCollection, prefixIcon: _jsx(IsFavoriteIcon, { favorite: favourite }), children: favourite
                                    ? t['com.affine.favoritePageOperation.remove']()
                                    : t['com.affine.favoritePageOperation.add']() }), _jsx(MenuItem, { onClick: onConfirmAddDocToCollection, prefixIcon: _jsx(PlusIcon, {}), children: t['New Page']() }), _jsx(MenuItem, { onClick: handleDelete, prefixIcon: _jsx(DeleteIcon, {}), type: "danger", "data-testid": "delete-collection", children: t['Delete']() })] }), contentOptions: {
                        align: 'end',
                    }, children: _jsx(IconButton, { "data-testid": "collection-item-operation-button", children: _jsx(MoreVerticalIcon, {}) }) }) })] }));
};
export const TagOperationCell = ({ tag, onTagDelete, }) => {
    const t = useI18n();
    const [open, setOpen] = useState(false);
    const { favoriteService } = useServices({
        FavoriteService,
    });
    const favourite = useLiveData(favoriteService.favoriteList.isFavorite$('tag', tag.id));
    const handleDelete = useCallback(() => {
        onTagDelete([tag.id]);
    }, [onTagDelete, tag.id]);
    const onToggleFavoriteCollection = useCallback(() => {
        favoriteService.favoriteList.toggle('tag', tag.id);
    }, [favoriteService, tag.id]);
    return (_jsxs(_Fragment, { children: [_jsx(ColWrapper, { hideInSmallContainer: true, "data-testid": "page-list-item-favorite", "data-favorite": favourite ? true : undefined, className: styles.favoriteCell, children: _jsx(FavoriteTag, { onClick: onToggleFavoriteCollection, active: favourite }) }), _jsx("div", { className: styles.editTagWrapper, "data-show": open, children: _jsx("div", { style: { width: '100%' }, children: _jsx(CreateOrEditTag, { open: open, onOpenChange: setOpen, tagMeta: tag }) }) }), _jsx(IconButton, { tooltip: t['Rename'](), tooltipOptions: tooltipSideTop, onClick: useCallback((e) => {
                    e.preventDefault();
                    setOpen(true);
                }, [setOpen]), children: _jsx(EditIcon, {}) }), _jsx(ColWrapper, { alignment: "start", children: _jsx(Menu, { items: _jsx(MenuItem, { prefixIcon: _jsx(DeleteIcon, {}), type: "danger", onSelect: handleDelete, "data-testid": "delete-tag", children: t['Delete']() }), contentOptions: {
                        align: 'end',
                    }, children: _jsx(IconButton, { "data-testid": "tag-item-operation-button", children: _jsx(MoreVerticalIcon, {}) }) }) })] }));
};
//# sourceMappingURL=operation-cell.js.map