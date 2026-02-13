import { jsx as _jsx } from "react/jsx-runtime";
import { IconButton, MenuItem, MenuSeparator, toast } from '@affine/component';
import { usePageHelper } from '@affine/core/blocksuite/block-suite-page-list/utils';
import { IsFavoriteIcon } from '@affine/core/components/pure/icons';
import { DocsService } from '@affine/core/modules/doc';
import { FavoriteService } from '@affine/core/modules/favorite';
import { TagService } from '@affine/core/modules/tag';
import { WorkbenchService } from '@affine/core/modules/workbench';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { DeleteIcon, OpenInNewIcon, PlusIcon, SplitViewIcon, } from '@blocksuite/icons/rc';
import { useLiveData, useServices } from '@toeverything/infra';
import { useCallback, useMemo } from 'react';
export const useNavigationPanelTagNodeOperations = (tagId, { openNodeCollapsed, }) => {
    const t = useI18n();
    const { workbenchService, workspaceService, tagService, favoriteService } = useServices({
        WorkbenchService,
        WorkspaceService,
        TagService,
        DocsService,
        FavoriteService,
    });
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
    return useMemo(() => [
        {
            index: 0,
            inline: true,
            view: (_jsx(IconButton, { size: "16", onClick: handleNewDoc, "data-testid": "tag-add-doc-button", tooltip: t['com.affine.rootAppSidebar.explorer.tag-add-tooltip'](), children: _jsx(PlusIcon, {}) })),
        },
        {
            index: 50,
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
            view: (_jsx(MenuItem, { type: 'danger', prefixIcon: _jsx(DeleteIcon, {}), onClick: handleMoveToTrash, "data-testid": "tag-delete-button", children: t['Delete']() })),
        },
    ], [
        favorite,
        handleMoveToTrash,
        handleNewDoc,
        handleOpenInNewTab,
        handleOpenInSplitView,
        handleToggleFavoriteTag,
        t,
    ]);
};
//# sourceMappingURL=operations.js.map