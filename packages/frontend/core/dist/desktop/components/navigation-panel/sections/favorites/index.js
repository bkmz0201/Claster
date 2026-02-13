import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton, useDropTarget, } from '@affine/component';
import { usePageHelper } from '@affine/core/blocksuite/block-suite-page-list/utils';
import { FavoriteService, isFavoriteSupportType, } from '@affine/core/modules/favorite';
import { NavigationPanelService } from '@affine/core/modules/navigation-panel';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { inferOpenMode } from '@affine/core/utils';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { PlusIcon } from '@blocksuite/icons/rc';
import { useLiveData, useServices } from '@toeverything/infra';
import { useCallback, useMemo } from 'react';
import { CollapsibleSection } from '../../layouts/collapsible-section';
import { NavigationPanelCollectionNode } from '../../nodes/collection';
import { NavigationPanelDocNode } from '../../nodes/doc';
import { NavigationPanelFolderNode } from '../../nodes/folder';
import { NavigationPanelTagNode } from '../../nodes/tag';
import { DropEffect, NavigationPanelTreeRoot } from '../../tree';
import { favoriteChildrenCanDrop, favoriteChildrenDropEffect, favoriteRootCanDrop, favoriteRootDropEffect, } from './dnd';
import { RootEmpty } from './empty';
export const NavigationPanelFavorites = () => {
    const { favoriteService, workspaceService, navigationPanelService } = useServices({
        FavoriteService,
        WorkspaceService,
        NavigationPanelService,
    });
    const path = useMemo(() => ['favorites'], []);
    const favorites = useLiveData(favoriteService.favoriteList.sortedList$);
    const isLoading = useLiveData(favoriteService.favoriteList.isLoading$);
    const t = useI18n();
    const { createPage } = usePageHelper(workspaceService.workspace.docCollection);
    const handleDrop = useCallback((data) => {
        if (data.source.data.entity?.type &&
            isFavoriteSupportType(data.source.data.entity.type)) {
            favoriteService.favoriteList.add(data.source.data.entity.type, data.source.data.entity.id, favoriteService.favoriteList.indexAt('before'));
            track.$.navigationPanel.organize.toggleFavorite({
                type: data.source.data.entity.type,
                on: true,
            });
            track.$.navigationPanel.favorites.drop({
                type: data.source.data.entity.type,
            });
            navigationPanelService.setCollapsed(path, false);
        }
    }, [navigationPanelService, favoriteService.favoriteList, path]);
    const handleCreateNewFavoriteDoc = useCallback(e => {
        const newDoc = createPage(undefined, { at: inferOpenMode(e) });
        favoriteService.favoriteList.add('doc', newDoc.id, favoriteService.favoriteList.indexAt('before'));
        navigationPanelService.setCollapsed(path, false);
    }, [createPage, navigationPanelService, favoriteService.favoriteList, path]);
    const handleOnChildrenDrop = useCallback((favorite, data) => {
        if (data.treeInstruction?.type === 'reorder-above' ||
            data.treeInstruction?.type === 'reorder-below') {
            if (data.source.data.from?.at === 'navigation-panel:favorite:list' &&
                data.source.data.entity?.type &&
                isFavoriteSupportType(data.source.data.entity.type)) {
                // is reordering
                favoriteService.favoriteList.reorder(data.source.data.entity.type, data.source.data.entity.id, favoriteService.favoriteList.indexAt(data.treeInstruction?.type === 'reorder-above'
                    ? 'before'
                    : 'after', favorite));
                track.$.navigationPanel.organize.orderOrganizeItem({
                    type: data.source.data.entity.type,
                });
            }
            else if (data.source.data.entity?.type &&
                isFavoriteSupportType(data.source.data.entity.type)) {
                favoriteService.favoriteList.add(data.source.data.entity.type, data.source.data.entity.id, favoriteService.favoriteList.indexAt(data.treeInstruction?.type === 'reorder-above'
                    ? 'before'
                    : 'after', favorite));
                track.$.navigationPanel.organize.toggleFavorite({
                    type: data.source.data.entity.type,
                    on: true,
                });
                track.$.navigationPanel.favorites.drop({
                    type: data.source.data.entity.type,
                });
            }
            else {
                return; // not supported
            }
        }
    }, [favoriteService]);
    const { dropTargetRef, draggedOverDraggable, draggedOverPosition } = useDropTarget(() => ({
        data: {
            at: 'navigation-panel:favorite:root',
        },
        onDrop: handleDrop,
        canDrop: favoriteRootCanDrop,
        allowExternal: true,
    }), [handleDrop]);
    return (_jsx(CollapsibleSection, { path: path, title: t['com.affine.rootAppSidebar.favorites'](), headerRef: dropTargetRef, testId: "navigation-panel-favorites", headerTestId: "navigation-panel-favorite-category-divider", actions: _jsxs(_Fragment, { children: [_jsx(IconButton, { "data-testid": "navigation-panel-bar-add-favorite-button", "data-event-props": "$.navigationPanel.favorites.createDoc", "data-event-args-control": "addFavorite", onClick: handleCreateNewFavoriteDoc, onAuxClick: handleCreateNewFavoriteDoc, size: "16", tooltip: t['com.affine.rootAppSidebar.explorer.fav-section-add-tooltip'](), children: _jsx(PlusIcon, {}) }), draggedOverDraggable && (_jsx(DropEffect, { position: draggedOverPosition, dropEffect: favoriteRootDropEffect({
                        source: draggedOverDraggable,
                        treeInstruction: null,
                    }) }))] }), children: _jsx(NavigationPanelTreeRoot, { placeholder: _jsx(RootEmpty, { onDrop: handleDrop, isLoading: isLoading }), children: favorites.map(favorite => (_jsx(NavigationPanelFavoriteNode, { favorite: favorite, onDrop: handleOnChildrenDrop, parentPath: path }, favorite.id))) }) }));
};
const childLocation = {
    at: 'navigation-panel:favorite:list',
};
const NavigationPanelFavoriteNode = ({ favorite, onDrop, parentPath, }) => {
    const handleOnChildrenDrop = useCallback((data) => {
        onDrop(favorite, data);
    }, [favorite, onDrop]);
    return favorite.type === 'doc' ? (_jsx(NavigationPanelDocNode, { docId: favorite.id, location: childLocation, onDrop: handleOnChildrenDrop, dropEffect: favoriteChildrenDropEffect, canDrop: favoriteChildrenCanDrop, parentPath: parentPath }, favorite.id)) : favorite.type === 'tag' ? (_jsx(NavigationPanelTagNode, { tagId: favorite.id, location: childLocation, onDrop: handleOnChildrenDrop, dropEffect: favoriteChildrenDropEffect, canDrop: favoriteChildrenCanDrop, parentPath: parentPath }, favorite.id)) : favorite.type === 'folder' ? (_jsx(NavigationPanelFolderNode, { nodeId: favorite.id, location: childLocation, onDrop: handleOnChildrenDrop, dropEffect: favoriteChildrenDropEffect, canDrop: favoriteChildrenCanDrop, parentPath: parentPath }, favorite.id)) : (_jsx(NavigationPanelCollectionNode, { collectionId: favorite.id, location: childLocation, onDrop: handleOnChildrenDrop, dropEffect: favoriteChildrenDropEffect, canDrop: favoriteChildrenCanDrop, parentPath: parentPath }, favorite.id));
};
//# sourceMappingURL=index.js.map