import { jsx as _jsx } from "react/jsx-runtime";
import { IconButton, MenuItem, MenuSeparator, toast, useConfirmModal, } from '@affine/component';
import { usePageHelper } from '@affine/core/blocksuite/block-suite-page-list/utils';
import { IsFavoriteIcon } from '@affine/core/components/pure/icons';
import { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import { DocsService } from '@affine/core/modules/doc';
import { FavoriteService } from '@affine/core/modules/favorite';
import { GlobalCacheService } from '@affine/core/modules/storage';
import { TagService } from '@affine/core/modules/tag';
import { WorkbenchService } from '@affine/core/modules/workbench';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { DeleteIcon, FolderIcon, PlusIcon, SplitViewIcon, } from '@blocksuite/icons/rc';
import { useLiveData, useServices } from '@toeverything/infra';
import { useCallback, useMemo } from 'react';
import { TagRenameSubMenu } from './dialog';
export const useNavigationPanelTagNodeOperations = (tagId, { openNodeCollapsed, }) => {
    const t = useI18n();
    const { workbenchService, workspaceService, tagService, favoriteService, workspaceDialogService, globalCacheService, } = useServices({
        WorkbenchService,
        WorkspaceService,
        TagService,
        DocsService,
        FavoriteService,
        WorkspaceDialogService,
        GlobalCacheService,
    });
    const { openConfirmModal } = useConfirmModal();
    const favorite = useLiveData(favoriteService.favoriteList.favorite$('tag', tagId));
    const tagRecord = useLiveData(tagService.tagList.tagByTagId$(tagId));
    const { createPage } = usePageHelper(workspaceService.workspace.docCollection);
    const handleNewDoc = useCallback(() => {
        if (tagRecord) {
            const newDoc = createPage();
            tagRecord?.tag(newDoc.id);
            track.$.navigationPanel.tags.createDoc();
            openNodeCollapsed();
        }
    }, [createPage, openNodeCollapsed, tagRecord]);
    const handleMoveToTrash = useCallback(() => {
        tagService.tagList.deleteTag(tagId);
        track.$.navigationPanel.organize.deleteOrganizeItem({ type: 'tag' });
        toast(t['com.affine.tags.delete-tags.toast']());
    }, [t, tagId, tagService.tagList]);
    const handleOpenInSplitView = useCallback(() => {
        workbenchService.workbench.openTag(tagId, {
            at: 'beside',
        });
        track.$.navigationPanel.organize.openInSplitView({ type: 'tag' });
    }, [tagId, workbenchService]);
    const handleToggleFavoriteTag = useCallback(() => {
        favoriteService.favoriteList.toggle('tag', tagId);
        track.$.navigationPanel.organize.toggleFavorite({
            type: 'tag',
        });
    }, [favoriteService, tagId]);
    const handleOpenInNewTab = useCallback(() => {
        workbenchService.workbench.openTag(tagId, {
            at: 'new-tab',
        });
        track.$.navigationPanel.organize.openInNewTab({ type: 'tag' });
    }, [tagId, workbenchService]);
    const handleRename = useCallback((newName) => {
        if (tagRecord && tagRecord.value$.value !== newName) {
            tagRecord.rename(newName);
            track.$.navigationPanel.organize.renameOrganizeItem({
                type: 'tag',
            });
        }
    }, [tagRecord]);
    const handleChangeColor = useCallback((color) => {
        if (tagRecord && tagRecord.color$.value !== color) {
            tagRecord.changeColor(color);
        }
    }, [tagRecord]);
    const handleChangeNameOrColor = useCallback((name, color) => {
        if (name !== undefined) {
            handleRename(name);
        }
        if (color !== undefined) {
            handleChangeColor(color);
        }
    }, [handleChangeColor, handleRename]);
    const handleOpenDocSelector = useCallback(() => {
        const initialIds = tagRecord?.pageIds$.value;
        workspaceDialogService.open('doc-selector', {
            init: initialIds ?? [],
            onBeforeConfirm(ids, cb) {
                const hasRemoved = initialIds?.some(id => !ids?.includes(id));
                if (hasRemoved &&
                    globalCacheService.globalCache.get('mobile:tags:will-be-removed-warning-read') !== true) {
                    openConfirmModal({
                        title: t['com.affine.m.selector.remove-warning.title'](),
                        description: t['com.affine.m.selector.remove-warning.message']({
                            type: t['com.affine.m.selector.type-doc'](),
                            where: t['com.affine.m.selector.where-tag'](),
                        }),
                        cancelText: t['com.affine.m.selector.remove-warning.cancel'](),
                        confirmText: t['com.affine.m.selector.remove-warning.confirm'](),
                        reverseFooter: true,
                        onConfirm: () => {
                            globalCacheService.globalCache.set('mobile:tags:will-be-removed-warning-read', true);
                            cb();
                        },
                    });
                }
                else {
                    cb();
                }
            },
        }, selectedIds => {
            if (selectedIds === undefined) {
                return;
            }
            const newIds = selectedIds.filter(id => !initialIds?.includes(id));
            const removedIds = initialIds?.filter(id => !selectedIds.includes(id));
            newIds.forEach(id => tagRecord?.tag(id));
            removedIds?.forEach(id => tagRecord?.untag(id));
        });
    }, [
        tagRecord,
        workspaceDialogService,
        globalCacheService.globalCache,
        openConfirmModal,
        t,
    ]);
    return useMemo(() => ({
        favorite,
        handleNewDoc,
        handleMoveToTrash,
        handleOpenInSplitView,
        handleToggleFavoriteTag,
        handleOpenInNewTab,
        handleRename,
        handleChangeColor,
        handleChangeNameOrColor,
        handleOpenDocSelector,
    }), [
        favorite,
        handleChangeColor,
        handleChangeNameOrColor,
        handleMoveToTrash,
        handleNewDoc,
        handleOpenInNewTab,
        handleOpenInSplitView,
        handleRename,
        handleToggleFavoriteTag,
        handleOpenDocSelector,
    ]);
};
export const useNavigationPanelTagNodeOperationsMenu = (tagId, option) => {
    const t = useI18n();
    const { favorite, handleNewDoc, handleMoveToTrash, handleOpenInSplitView, handleToggleFavoriteTag, handleChangeNameOrColor, handleOpenDocSelector, } = useNavigationPanelTagNodeOperations(tagId, option);
    return useMemo(() => [
        {
            index: 0,
            inline: true,
            view: (_jsx(IconButton, { size: "16", onClick: handleNewDoc, children: _jsx(PlusIcon, {}) })),
        },
        {
            index: 10,
            view: (_jsx(TagRenameSubMenu, { onConfirm: handleChangeNameOrColor, tagId: tagId, menuProps: { triggerOptions: { 'data-testid': 'rename-tag' } } })),
        },
        {
            index: 11,
            view: _jsx(MenuSeparator, {}),
        },
        {
            index: 12,
            view: (_jsx(MenuItem, { prefixIcon: _jsx(FolderIcon, {}), onClick: handleOpenDocSelector, children: t['com.affine.m.explorer.tag.manage-docs']() })),
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
            view: (_jsx(MenuItem, { prefixIcon: _jsx(IsFavoriteIcon, { favorite: !!favorite }), onClick: handleToggleFavoriteTag, children: favorite
                    ? t['com.affine.favoritePageOperation.remove']()
                    : t['com.affine.favoritePageOperation.add']() })),
        },
        {
            index: 9999,
            view: _jsx(MenuSeparator, {}, "menu-separator"),
        },
        {
            index: 10000,
            view: (_jsx(MenuItem, { type: 'danger', prefixIcon: _jsx(DeleteIcon, {}), onClick: handleMoveToTrash, children: t['Delete']() })),
        },
    ], [
        favorite,
        handleChangeNameOrColor,
        handleMoveToTrash,
        handleNewDoc,
        handleOpenDocSelector,
        handleOpenInSplitView,
        handleToggleFavoriteTag,
        t,
        tagId,
    ]);
};
//# sourceMappingURL=operations.js.map