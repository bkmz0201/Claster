import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { AnimatedFolderIcon, IconButton, MenuItem, MenuSeparator, MenuSub, notify, } from '@affine/component';
import { usePageHelper } from '@affine/core/blocksuite/block-suite-page-list/utils';
import { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import { CompatibleFavoriteItemsAdapter } from '@affine/core/modules/favorite';
import { FeatureFlagService } from '@affine/core/modules/feature-flag';
import { NavigationPanelService } from '@affine/core/modules/navigation-panel';
import { OrganizeService, } from '@affine/core/modules/organize';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import track from '@affine/track';
import { DeleteIcon, FolderIcon, LayerIcon, PageIcon, PlusIcon, PlusThickIcon, RemoveFolderIcon, TagsIcon, } from '@blocksuite/icons/rc';
import { useLiveData, useService, useServices } from '@toeverything/infra';
import { difference } from 'lodash-es';
import { useCallback, useMemo } from 'react';
import { AddItemPlaceholder } from '../../layouts/add-item-placeholder';
import { NavigationPanelTreeNode } from '../../tree/node';
import { NavigationPanelCollectionNode } from '../collection';
import { NavigationPanelDocNode } from '../doc';
import { NavigationPanelTagNode } from '../tag';
import { FolderCreateTip, FolderRenameSubMenu } from './dialog';
import { FavoriteFolderOperation } from './operations';
export const NavigationPanelFolderNode = ({ nodeId, operations, parentPath, }) => {
    const { organizeService } = useServices({
        OrganizeService,
    });
    const node = useLiveData(organizeService.folderTree.folderNode$(nodeId));
    const type = useLiveData(node?.type$);
    const data = useLiveData(node?.data$);
    const additionalOperations = useMemo(() => {
        if (!type || !node) {
            return;
        }
        if (typeof operations === 'function') {
            return operations(type, node);
        }
        return operations;
    }, [node, operations, type]);
    if (!node) {
        return;
    }
    if (type === 'folder') {
        return (_jsx(NavigationPanelFolderNodeFolder, { node: node, operations: additionalOperations, parentPath: parentPath }));
    }
    if (!data)
        return null;
    if (type === 'doc') {
        return (_jsx(NavigationPanelDocNode, { docId: data, operations: additionalOperations, parentPath: parentPath }));
    }
    else if (type === 'collection') {
        return (_jsx(NavigationPanelCollectionNode, { collectionId: data, operations: additionalOperations, parentPath: parentPath }));
    }
    else if (type === 'tag') {
        return (_jsx(NavigationPanelTagNode, { tagId: data, operations: additionalOperations, parentPath: parentPath }));
    }
    return;
};
const NavigationPanelFolderIcon = ({ collapsed, className, draggedOver, treeInstruction, }) => (_jsx(AnimatedFolderIcon, { className: className, open: !collapsed || (!!draggedOver && treeInstruction?.type === 'make-child') }));
const NavigationPanelFolderNodeFolder = ({ node, operations: additionalOperations, parentPath, }) => {
    const t = useI18n();
    const { workspaceService, featureFlagService, workspaceDialogService } = useServices({
        WorkspaceService,
        CompatibleFavoriteItemsAdapter,
        FeatureFlagService,
        WorkspaceDialogService,
    });
    const name = useLiveData(node.name$);
    const enableEmojiIcon = useLiveData(featureFlagService.flags.enable_emoji_folder_icon.$);
    const navigationPanelService = useService(NavigationPanelService);
    const path = useMemo(() => [...parentPath, `folder-${node.id}`], [parentPath, node.id]);
    const collapsed = useLiveData(navigationPanelService.collapsed$(path));
    const setCollapsed = useCallback((value) => {
        navigationPanelService.setCollapsed(path, value);
    }, [navigationPanelService, path]);
    const { createPage } = usePageHelper(workspaceService.workspace.docCollection);
    const handleDelete = useCallback(() => {
        node.delete();
        track.$.navigationPanel.organize.deleteOrganizeItem({
            type: 'folder',
        });
        notify.success({
            title: t['com.affine.rootAppSidebar.organize.delete.notify-title']({
                name,
            }),
            message: t['com.affine.rootAppSidebar.organize.delete.notify-message'](),
        });
    }, [name, node, t]);
    const children = useLiveData(node.sortedChildren$);
    const handleRename = useCallback((newName) => {
        node.rename(newName);
    }, [node]);
    const handleNewDoc = useCallback(() => {
        const newDoc = createPage();
        node.createLink('doc', newDoc.id, node.indexAt('before'));
        track.$.navigationPanel.folders.createDoc();
        track.$.navigationPanel.organize.createOrganizeItem({
            type: 'link',
            target: 'doc',
        });
        setCollapsed(false);
    }, [createPage, node, setCollapsed]);
    const handleCreateSubfolder = useCallback((name) => {
        node.createFolder(name, node.indexAt('before'));
        track.$.navigationPanel.organize.createOrganizeItem({ type: 'folder' });
        setCollapsed(false);
    }, [node, setCollapsed]);
    const handleAddToFolder = useCallback((type) => {
        const initialIds = children
            .filter(node => node.type$.value === type)
            .map(node => node.data$.value)
            .filter(Boolean);
        const selector = type === 'doc'
            ? 'doc-selector'
            : type === 'collection'
                ? 'collection-selector'
                : 'tag-selector';
        workspaceDialogService.open(selector, {
            init: initialIds,
        }, selectedIds => {
            if (selectedIds === undefined) {
                return;
            }
            const newItemIds = difference(selectedIds, initialIds);
            const removedItemIds = difference(initialIds, selectedIds);
            const removedItems = children.filter(node => !!node.data$.value && removedItemIds.includes(node.data$.value));
            newItemIds.forEach(id => {
                node.createLink(type, id, node.indexAt('after'));
            });
            removedItems.forEach(node => node.delete());
            const updated = newItemIds.length + removedItems.length;
            updated && setCollapsed(false);
        });
        track.$.navigationPanel.organize.createOrganizeItem({
            type: 'link',
            target: type,
        });
    }, [children, node, setCollapsed, workspaceDialogService]);
    const createSubTipRenderer = useCallback(({ input }) => {
        return _jsx(FolderCreateTip, { input: input, parentName: name });
    }, [name]);
    const folderOperations = useMemo(() => {
        return [
            {
                index: 0,
                inline: true,
                view: (_jsx(IconButton, { size: "16", onClick: handleNewDoc, tooltip: t['com.affine.rootAppSidebar.explorer.organize-add-tooltip'](), children: _jsx(PlusIcon, {}) })),
            },
            {
                index: 98,
                view: (_jsx(FolderRenameSubMenu, { initialName: name, onConfirm: handleRename, menuProps: {
                        triggerOptions: { 'data-testid': 'rename-folder' },
                    } })),
            },
            {
                index: 99,
                view: _jsx(MenuSeparator, {}),
            },
            {
                index: 100,
                view: (_jsx(FolderRenameSubMenu, { text: t['com.affine.rootAppSidebar.organize.folder.create-subfolder'](), title: t['com.affine.rootAppSidebar.organize.folder.create-subfolder'](), onConfirm: handleCreateSubfolder, descRenderer: createSubTipRenderer, icon: _jsx(FolderIcon, {}), menuProps: {
                        triggerOptions: { 'data-testid': 'create-subfolder' },
                    } })),
            },
            {
                index: 102,
                view: (_jsx(MenuSub, { triggerOptions: {
                        prefixIcon: _jsx(PlusThickIcon, {}),
                    }, items: _jsxs(_Fragment, { children: [_jsx(MenuItem, { prefixIcon: _jsx(PageIcon, {}), onClick: () => handleAddToFolder('doc'), children: t['com.affine.rootAppSidebar.organize.folder.add-docs']() }), _jsx(MenuItem, { onClick: () => handleAddToFolder('tag'), prefixIcon: _jsx(TagsIcon, {}), children: t['com.affine.rootAppSidebar.organize.folder.add-tags']() }), _jsx(MenuItem, { onClick: () => handleAddToFolder('collection'), prefixIcon: _jsx(LayerIcon, {}), children: t['com.affine.rootAppSidebar.organize.folder.add-collections']() })] }), children: t['com.affine.rootAppSidebar.organize.folder.add-others']() })),
            },
            {
                index: 200,
                view: node.id ? _jsx(FavoriteFolderOperation, { id: node.id }) : null,
            },
            {
                index: 9999,
                view: _jsx(MenuSeparator, {}, "menu-separator"),
            },
            {
                index: 10000,
                view: (_jsx(MenuItem, { type: 'danger', prefixIcon: _jsx(DeleteIcon, {}), onClick: handleDelete, children: t['com.affine.rootAppSidebar.organize.delete']() })),
            },
        ];
    }, [
        createSubTipRenderer,
        handleAddToFolder,
        handleCreateSubfolder,
        handleDelete,
        handleNewDoc,
        handleRename,
        name,
        node.id,
        t,
    ]);
    const finalOperations = useMemo(() => {
        if (additionalOperations) {
            return [...additionalOperations, ...folderOperations];
        }
        return folderOperations;
    }, [additionalOperations, folderOperations]);
    const childrenOperations = useCallback((type, node) => {
        if (type === 'doc' || type === 'collection' || type === 'tag') {
            return [
                {
                    index: 999,
                    view: (_jsx(MenuItem, { type: 'danger', prefixIcon: _jsx(RemoveFolderIcon, {}), "data-event-props": "$.navigationPanel.organize.deleteOrganizeItem", "data-event-args-type": node.type$.value, onClick: () => node.delete(), children: t['com.affine.rootAppSidebar.organize.delete-from-folder']() })),
                },
            ];
        }
        return [];
    }, [t]);
    const handleCollapsedChange = useCallback((collapsed) => {
        if (collapsed) {
            setCollapsed(true);
        }
        else {
            setCollapsed(false);
        }
    }, [setCollapsed]);
    return (_jsxs(NavigationPanelTreeNode, { icon: NavigationPanelFolderIcon, name: name, extractEmojiAsIcon: enableEmojiIcon, collapsed: collapsed, setCollapsed: handleCollapsedChange, operations: finalOperations, "data-testid": `navigation-panel-folder-${node.id}`, "aria-label": name, "data-role": "navigation-panel-folder", children: [children.map(child => (_jsx(NavigationPanelFolderNode, { nodeId: child.id, operations: childrenOperations, parentPath: path }, child.id))), _jsx(AddItemPlaceholder, { label: t['com.affine.rootAppSidebar.organize.folder.new-doc'](), onClick: handleNewDoc, "data-testid": "new-folder-in-folder-button" })] }));
};
//# sourceMappingURL=index.js.map