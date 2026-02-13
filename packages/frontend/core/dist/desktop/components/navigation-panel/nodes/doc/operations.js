import { jsx as _jsx } from "react/jsx-runtime";
import { IconButton, MenuItem, MenuSeparator, toast, useConfirmModal, } from '@affine/component';
import { usePageHelper } from '@affine/core/blocksuite/block-suite-page-list/utils';
import { Guard } from '@affine/core/components/guard';
import { useAppSettingHelper } from '@affine/core/components/hooks/affine/use-app-setting-helper';
import { useBlockSuiteMetaHelper } from '@affine/core/components/hooks/affine/use-block-suite-meta-helper';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { IsFavoriteIcon } from '@affine/core/components/pure/icons';
import { DocsService } from '@affine/core/modules/doc';
import { CompatibleFavoriteItemsAdapter } from '@affine/core/modules/favorite';
import { GuardService } from '@affine/core/modules/permissions';
import { WorkbenchService } from '@affine/core/modules/workbench';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { DeleteIcon, DuplicateIcon, InformationIcon, LinkedPageIcon, OpenInNewIcon, PlusIcon, SplitViewIcon, } from '@blocksuite/icons/rc';
import { useLiveData, useServices } from '@toeverything/infra';
import { useCallback, useMemo, useState } from 'react';
export const useNavigationPanelDocNodeOperations = (docId, options) => {
    const t = useI18n();
    const { workbenchService, workspaceService, docsService, compatibleFavoriteItemsAdapter, guardService, } = useServices({
        DocsService,
        WorkbenchService,
        WorkspaceService,
        CompatibleFavoriteItemsAdapter,
        GuardService,
    });
    const { openConfirmModal } = useConfirmModal();
    const [addLinkedPageLoading, setAddLinkedPageLoading] = useState(false);
    const docRecord = useLiveData(docsService.list.doc$(docId));
    const { appSettings } = useAppSettingHelper();
    const { createPage } = usePageHelper(workspaceService.workspace.docCollection);
    const favorite = useLiveData(useMemo(() => {
        return compatibleFavoriteItemsAdapter.isFavorite$(docId, 'doc');
    }, [docId, compatibleFavoriteItemsAdapter]));
    const { duplicate } = useBlockSuiteMetaHelper();
    const handleDuplicate = useCallback(() => {
        duplicate(docId, true);
        track.$.navigationPanel.docs.createDoc();
    }, [docId, duplicate]);
    const handleOpenInfoModal = useCallback(() => {
        track.$.docInfoPanel.$.open();
        options.openInfoModal();
    }, [options]);
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
        track.$.navigationPanel.docs.openDoc();
        track.$.navigationPanel.organize.openInNewTab({
            type: 'doc',
        });
    }, [docId, workbenchService]);
    const handleOpenInSplitView = useCallback(() => {
        workbenchService.workbench.openDoc(docId, {
            at: 'beside',
        });
        track.$.navigationPanel.docs.openDoc();
        track.$.navigationPanel.organize.openInSplitView({
            type: 'doc',
        });
    }, [docId, workbenchService.workbench]);
    const handleAddLinkedPage = useAsyncCallback(async () => {
        setAddLinkedPageLoading(true);
        try {
            const canEdit = await guardService.can('Doc_Update', docId);
            if (!canEdit) {
                toast(t['com.affine.no-permission']());
                return;
            }
            const newDoc = createPage();
            // TODO: handle timeout & error
            await docsService.addLinkedDoc(docId, newDoc.id);
            track.$.navigationPanel.docs.createDoc({ control: 'linkDoc' });
            track.$.navigationPanel.docs.linkDoc({ control: 'createDoc' });
            options.openNodeCollapsed();
        }
        finally {
            setAddLinkedPageLoading(false);
        }
    }, [createPage, guardService, docId, docsService, options, t]);
    const handleToggleFavoriteDoc = useCallback(() => {
        compatibleFavoriteItemsAdapter.toggle(docId, 'doc');
        track.$.navigationPanel.organize.toggleFavorite({
            type: 'doc',
        });
    }, [docId, compatibleFavoriteItemsAdapter]);
    return useMemo(() => [
        ...(appSettings.showLinkedDocInSidebar
            ? [
                {
                    index: 0,
                    inline: true,
                    view: (_jsx(IconButton, { size: "16", icon: _jsx(PlusIcon, {}), tooltip: t['com.affine.rootAppSidebar.explorer.doc-add-tooltip'](), onClick: handleAddLinkedPage, loading: addLinkedPageLoading, disabled: addLinkedPageLoading })),
                },
            ]
            : []),
        {
            index: 50,
            view: (_jsx(MenuItem, { prefixIcon: _jsx(InformationIcon, {}), onClick: handleOpenInfoModal, children: t['com.affine.page-properties.page-info.view']() })),
        },
        {
            index: 99,
            view: (_jsx(Guard, { docId: docId, permission: "Doc_Update", children: canEdit => (_jsx(MenuItem, { prefixIcon: _jsx(LinkedPageIcon, {}), onClick: handleAddLinkedPage, disabled: !canEdit, children: t['com.affine.page-operation.add-linked-page']() })) })),
        },
        {
            index: 99,
            view: (_jsx(MenuItem, { prefixIcon: _jsx(DuplicateIcon, {}), onClick: handleDuplicate, children: t['com.affine.header.option.duplicate']() })),
        },
        {
            index: 99,
            view: (_jsx(MenuItem, { prefixIcon: _jsx(OpenInNewIcon, {}), onClick: handleOpenInNewTab, children: t['com.affine.workbench.tab.page-menu-open']() })),
        },
        ...(BUILD_CONFIG.isElectron
            ? [
                {
                    index: 100,
                    view: (_jsx(MenuItem, { prefixIcon: _jsx(SplitViewIcon, {}), onClick: handleOpenInSplitView, children: t['com.affine.workbench.split-view.page-menu-open']() })),
                },
            ]
            : []),
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
        addLinkedPageLoading,
        appSettings.showLinkedDocInSidebar,
        docId,
        favorite,
        handleAddLinkedPage,
        handleDuplicate,
        handleMoveToTrash,
        handleOpenInNewTab,
        handleOpenInSplitView,
        handleOpenInfoModal,
        handleToggleFavoriteDoc,
        t,
    ]);
};
//# sourceMappingURL=operations.js.map