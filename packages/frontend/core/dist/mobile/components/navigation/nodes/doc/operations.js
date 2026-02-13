import { jsx as _jsx } from "react/jsx-runtime";
import { MenuItem, MenuSeparator, MenuSub, toast, useConfirmModal, } from '@affine/component';
import { usePageHelper } from '@affine/core/blocksuite/block-suite-page-list/utils';
import { Guard } from '@affine/core/components/guard';
import { useBlockSuiteMetaHelper } from '@affine/core/components/hooks/affine/use-block-suite-meta-helper';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { IsFavoriteIcon } from '@affine/core/components/pure/icons';
import { DocsService } from '@affine/core/modules/doc';
import { CompatibleFavoriteItemsAdapter } from '@affine/core/modules/favorite';
import { WorkbenchService } from '@affine/core/modules/workbench';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { preventDefault } from '@affine/core/utils';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { DeleteIcon, DuplicateIcon, InformationIcon, LinkedPageIcon, OpenInNewIcon, } from '@blocksuite/icons/rc';
import { useLiveData, useService, useServices } from '@toeverything/infra';
import { useCallback, useMemo } from 'react';
import { DocFrameScope, DocInfoSheet } from '../../../doc-info';
import { DocRenameSubMenu } from './dialog';
export const useNavigationPanelDocNodeOperations = (docId, options) => {
    const t = useI18n();
    const { workbenchService, workspaceService, docsService, compatibleFavoriteItemsAdapter, } = useServices({
        DocsService,
        WorkbenchService,
        WorkspaceService,
        CompatibleFavoriteItemsAdapter,
    });
    const { openConfirmModal } = useConfirmModal();
    const docRecord = useLiveData(docsService.list.doc$(docId));
    const { createPage } = usePageHelper(workspaceService.workspace.docCollection);
    const favorite = useLiveData(useMemo(() => {
        return compatibleFavoriteItemsAdapter.isFavorite$(docId, 'doc');
    }, [docId, compatibleFavoriteItemsAdapter]));
    const { duplicate } = useBlockSuiteMetaHelper();
    const handleDuplicate = useCallback(() => {
        duplicate(docId, true);
        track.$.navigationPanel.docs.createDoc();
    }, [docId, duplicate]);
    const handleMoveToTrash = useCallback(() => {
        if (!docRecord) {
            return;
        }
        openConfirmModal({
            title: t['com.affine.moveToTrash.title'](),
            description: t['com.affine.moveToTrash.confirmModal.description']({
                title: docRecord.title$.value,
            }),
            confirmText: t['com.affine.moveToTrash.confirmModal.confirm'](),
            cancelText: t['com.affine.moveToTrash.confirmModal.cancel'](),
            confirmButtonOptions: {
                variant: 'error',
            },
            onConfirm() {
                docRecord.moveToTrash();
                track.$.navigationPanel.docs.deleteDoc({
                    control: 'button',
                });
                toast(t['com.affine.toastMessage.movedTrash']());
            },
        });
    }, [docRecord, openConfirmModal, t]);
    const handleOpenInNewTab = useCallback(() => {
        workbenchService.workbench.openDoc(docId, {
            at: 'new-tab',
        });
        track.$.navigationPanel.organize.openInNewTab({
            type: 'doc',
        });
    }, [docId, workbenchService]);
    const handleOpenInSplitView = useCallback(() => {
        workbenchService.workbench.openDoc(docId, {
            at: 'beside',
        });
        track.$.navigationPanel.organize.openInSplitView({
            type: 'doc',
        });
    }, [docId, workbenchService.workbench]);
    const handleAddLinkedPage = useAsyncCallback(async () => {
        const newDoc = createPage();
        // TODO: handle timeout & error
        await docsService.addLinkedDoc(docId, newDoc.id);
        track.$.navigationPanel.docs.createDoc({ control: 'linkDoc' });
        track.$.navigationPanel.docs.linkDoc({ control: 'createDoc' });
        options.openNodeCollapsed();
    }, [createPage, docId, docsService, options]);
    const handleToggleFavoriteDoc = useCallback(() => {
        compatibleFavoriteItemsAdapter.toggle(docId, 'doc');
        track.$.navigationPanel.organize.toggleFavorite({
            type: 'doc',
        });
    }, [docId, compatibleFavoriteItemsAdapter]);
    const handleRename = useAsyncCallback(async (newName) => {
        await docsService.changeDocTitle(docId, newName);
        track.$.navigationPanel.organize.renameOrganizeItem({ type: 'doc' });
    }, [docId, docsService]);
    return useMemo(() => ({
        favorite,
        handleAddLinkedPage,
        handleDuplicate,
        handleToggleFavoriteDoc,
        handleOpenInSplitView,
        handleOpenInNewTab,
        handleMoveToTrash,
        handleRename,
    }), [
        favorite,
        handleAddLinkedPage,
        handleDuplicate,
        handleMoveToTrash,
        handleOpenInNewTab,
        handleOpenInSplitView,
        handleRename,
        handleToggleFavoriteDoc,
    ]);
};
export const useNavigationPanelDocNodeOperationsMenu = (docId, options) => {
    const t = useI18n();
    const { favorite, handleAddLinkedPage, handleDuplicate, handleToggleFavoriteDoc, handleOpenInNewTab, handleMoveToTrash, handleRename, } = useNavigationPanelDocNodeOperations(docId, options);
    const docService = useService(DocsService);
    const docRecord = useLiveData(docService.list.doc$(docId));
    const title = useLiveData(docRecord?.title$);
    return useMemo(() => [
        {
            index: 10,
            view: (_jsx(Guard, { docId: docId, permission: "Doc_Update", children: canEdit => (_jsx(DocRenameSubMenu, { onConfirm: handleRename, initialName: title, disabled: !canEdit })) })),
        },
        {
            index: 11,
            view: _jsx(MenuSeparator, {}),
        },
        {
            index: 50,
            view: (_jsx(MenuSub, { triggerOptions: {
                    prefixIcon: _jsx(InformationIcon, {}),
                    onClick: preventDefault,
                }, title: title ?? t['unnamed'](), items: _jsx(DocFrameScope, { docId: docId, children: _jsx(DocInfoSheet, { docId: docId }) }), children: _jsx("span", { children: t['com.affine.page-properties.page-info.view']() }) })),
        },
        {
            index: 97,
            view: (_jsx(Guard, { docId: docId, permission: "Doc_Update", children: canEdit => (_jsx(MenuItem, { prefixIcon: _jsx(LinkedPageIcon, {}), onClick: handleAddLinkedPage, disabled: !canEdit, children: t['com.affine.page-operation.add-linked-page']() })) })),
        },
        {
            index: 98,
            view: (_jsx(MenuItem, { prefixIcon: _jsx(DuplicateIcon, {}), onClick: handleDuplicate, children: t['com.affine.header.option.duplicate']() })),
        },
        {
            index: 99,
            view: (_jsx(MenuItem, { prefixIcon: _jsx(OpenInNewIcon, {}), onClick: handleOpenInNewTab, children: t['com.affine.workbench.tab.page-menu-open']() })),
        },
        {
            index: 199,
            view: (_jsx(MenuItem, { prefixIcon: _jsx(IsFavoriteIcon, { favorite: favorite }), onClick: handleToggleFavoriteDoc, children: favorite
                    ? t['com.affine.favoritePageOperation.remove']()
                    : t['com.affine.favoritePageOperation.add']() })),
        },
        {
            index: 9999,
            view: _jsx(MenuSeparator, {}, "menu-separator"),
        },
        {
            index: 10000,
            view: (_jsx(Guard, { docId: docId, permission: "Doc_Trash", children: canMoveToTrash => (_jsx(MenuItem, { type: 'danger', prefixIcon: _jsx(DeleteIcon, {}), onClick: handleMoveToTrash, disabled: !canMoveToTrash, children: t['com.affine.moveToTrash.title']() })) })),
        },
    ], [
        docId,
        favorite,
        handleAddLinkedPage,
        handleDuplicate,
        handleMoveToTrash,
        handleOpenInNewTab,
        handleRename,
        handleToggleFavoriteDoc,
        t,
        title,
    ]);
};
//# sourceMappingURL=operations.js.map