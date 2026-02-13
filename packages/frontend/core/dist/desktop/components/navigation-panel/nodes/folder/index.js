import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { AnimatedCollectionsIcon, AnimatedFolderIcon, IconButton, MenuItem, MenuSeparator, MenuSub, notify, } from '@affine/component';
import { usePageHelper } from '@affine/core/blocksuite/block-suite-page-list/utils';
import { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import { CompatibleFavoriteItemsAdapter } from '@affine/core/modules/favorite';
import { FeatureFlagService } from '@affine/core/modules/feature-flag';
import { NavigationPanelService } from '@affine/core/modules/navigation-panel';
import { OrganizeService, } from '@affine/core/modules/organize';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { Unreachable } from '@affine/env/constant';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { DeleteIcon, FolderIcon, PageIcon, PlusIcon, PlusThickIcon, RemoveFolderIcon, TagsIcon, } from '@blocksuite/icons/rc';
import { useLiveData, useService, useServices } from '@toeverything/infra';
import { difference } from 'lodash-es';
import { useCallback, useMemo, useState } from 'react';
import { NavigationPanelTreeNode, } from '../../tree';
import { NavigationPanelCollectionNode } from '../collection';
import { NavigationPanelDocNode } from '../doc';
import { NavigationPanelTagNode } from '../tag';
import { FolderEmpty } from './empty';
import { FavoriteFolderOperation } from './operations';
export const NavigationPanelFolderNode = ({ nodeId, onDrop, defaultRenaming, operations, location, dropEffect, canDrop, reorderable, parentPath, }) => {
    const { organizeService } = useServices({
        OrganizeService,
    });
    const node = useLiveData(organizeService.folderTree.folderNode$(nodeId));
    const type = useLiveData(node?.type$);
    const data = useLiveData(node?.data$);
    const handleDrop = useCallback((data) => {
        if (!node) {
            return;
        }
        onDrop?.(data, node);
    }, [node, onDrop]);
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
        return (_jsx(NavigationPanelFolderNodeFolder, { node: node, onDrop: handleDrop, defaultRenaming: defaultRenaming, operations: additionalOperations, dropEffect: dropEffect, reorderable: reorderable, canDrop: canDrop, parentPath: parentPath }));
    }
    else if (type === 'doc') {
        return (data && (_jsx(NavigationPanelDocNode, { docId: data, location: location, onDrop: handleDrop, reorderable: reorderable, canDrop: canDrop, dropEffect: dropEffect, operations: additionalOperations, parentPath: parentPath })));
    }
    else if (type === 'collection') {
        return (data && (_jsx(NavigationPanelCollectionNode, { collectionId: data, location: location, onDrop: handleDrop, canDrop: canDrop, reorderable: reorderable, dropEffect: dropEffect, operations: additionalOperations, parentPath: parentPath })));
    }
    else if (type === 'tag') {
        return (data && (_jsx(NavigationPanelTagNode, { tagId: data, location: location, onDrop: handleDrop, canDrop: canDrop, reorderable: true, dropEffect: dropEffect, operations: additionalOperations, parentPath: parentPath })));
    }
    return;
};
// Define outside the `NavigationPanelFolderNodeFolder` to avoid re-render(the close animation won't play)
const NavigationPanelFolderIcon = ({ collapsed, className, draggedOver, treeInstruction, }) => (_jsx(AnimatedFolderIcon, { className: className, open: !collapsed || (!!draggedOver && treeInstruction?.type === 'make-child') }));
const NavigationPanelFolderNodeFolder = ({ node, onDrop, defaultRenaming, location, operations: additionalOperations, canDrop, dropEffect, reorderable, parentPath, }) => {
    const t = useI18n();
    const { workspaceService, featureFlagService, workspaceDialogService } = useServices({
        WorkspaceService,
        CompatibleFavoriteItemsAdapter,
        FeatureFlagService,
        WorkspaceDialogService,
    });
    const navigationPanelService = useService(NavigationPanelService);
    const name = useLiveData(node.name$);
    const enableEmojiIcon = useLiveData(featureFlagService.flags.enable_emoji_folder_icon.$);
    const path = useMemo(() => [...(parentPath ?? []), `folder-${node.id}`], [parentPath, node.id]);
    const collapsed = useLiveData(navigationPanelService.collapsed$(path));
    const setCollapsed = useCallback((value) => {
        navigationPanelService.setCollapsed(path, value);
    }, [navigationPanelService, path]);
    const [newFolderId, setNewFolderId] = useState(null);
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
    const dndData = useMemo(() => {
        if (!node.id) {
            throw new Unreachable();
        }
        return {
            draggable: {
                entity: {
                    type: 'folder',
                    id: node.id,
                },
                from: location,
            },
            dropTarget: {
                at: 'navigation-panel:organize:folder',
            },
        };
    }, [location, node.id]);
    const handleRename = useCallback((newName) => {
        node.rename(newName);
    }, [node]);
    const handleDropOnFolder = useCallback((data) => {
        if (data.source.data.entity?.type) {
            track.$.navigationPanel.folders.drop({
                type: data.source.data.entity.type,
            });
        }
        if (data.treeInstruction?.type === 'make-child') {
            if (data.source.data.entity?.type === 'folder') {
                if (node.id === data.source.data.entity.id ||
                    node.beChildOf(data.source.data.entity.id)) {
                    return;
                }
                node.moveHere(data.source.data.entity.id, node.indexAt('before'));
                track.$.navigationPanel.organize.moveOrganizeItem({ type: 'folder' });
            }
            else if (data.source.data.entity?.type === 'collection' ||
                data.source.data.entity?.type === 'doc' ||
                data.source.data.entity?.type === 'tag') {
                if (data.source.data.from?.at ===
                    'navigation-panel:organize:folder-node') {
                    node.moveHere(data.source.data.from.nodeId, node.indexAt('before'));
                    track.$.navigationPanel.organize.moveOrganizeItem({
                        type: 'link',
                        target: data.source.data.entity?.type,
                    });
                }
                else {
                    node.createLink(data.source.data.entity?.type, data.source.data.entity.id, node.indexAt('before'));
                    track.$.navigationPanel.organize.createOrganizeItem({
                        type: 'link',
                        target: data.source.data.entity?.type,
                    });
                }
            }
        }
        else {
            onDrop?.(data);
        }
    }, [node, onDrop]);
    const handleDropEffect = useCallback(data => {
        if (data.treeInstruction?.type === 'make-child') {
            if (data.source.data.entity?.type === 'folder') {
                if (node.id === data.source.data.entity.id ||
                    node.beChildOf(data.source.data.entity.id)) {
                    return;
                }
                return 'move';
            }
            else if (data.source.data.from?.at === 'navigation-panel:organize:folder-node') {
                return 'move';
            }
            else if (data.source.data.entity?.type === 'collection' ||
                data.source.data.entity?.type === 'doc' ||
                data.source.data.entity?.type === 'tag') {
                return 'link';
            }
        }
        else {
            return dropEffect?.(data);
        }
        return;
    }, [dropEffect, node]);
    const handleDropOnPlaceholder = useCallback((data) => {
        if (data.source.data.entity?.type) {
            track.$.navigationPanel.folders.drop({
                type: data.source.data.entity.type,
            });
        }
        if (data.source.data.entity?.type === 'folder') {
            if (node.id === data.source.data.entity.id ||
                node.beChildOf(data.source.data.entity.id)) {
                return;
            }
            node.moveHere(data.source.data.entity.id, node.indexAt('before'));
            track.$.navigationPanel.organize.moveOrganizeItem({ type: 'folder' });
        }
        else if (data.source.data.entity?.type === 'collection' ||
            data.source.data.entity?.type === 'doc' ||
            data.source.data.entity?.type === 'tag') {
            if (data.source.data.from?.at === 'navigation-panel:organize:folder-node') {
                node.moveHere(data.source.data.from.nodeId, node.indexAt('before'));
                track.$.navigationPanel.organize.moveOrganizeItem({
                    type: data.source.data.entity?.type,
                });
            }
            else {
                node.createLink(data.source.data.entity?.type, data.source.data.entity.id, node.indexAt('before'));
                track.$.navigationPanel.organize.createOrganizeItem({
                    type: 'link',
                    target: data.source.data.entity?.type,
                });
            }
        }
    }, [node]);
    const handleDropOnChildren = useCallback((data, dropAtNode) => {
        if (!dropAtNode || !dropAtNode.id) {
            return;
        }
        if (data.source.data.entity?.type) {
            track.$.navigationPanel.folders.drop({
                type: data.source.data.entity.type,
            });
        }
        if (data.treeInstruction?.type === 'reorder-above' ||
            data.treeInstruction?.type === 'reorder-below') {
            const at = data.treeInstruction?.type === 'reorder-below' ? 'after' : 'before';
            if (data.source.data.entity?.type === 'folder') {
                if (node.id === data.source.data.entity.id ||
                    node.beChildOf(data.source.data.entity.id)) {
                    return;
                }
                node.moveHere(data.source.data.entity.id, node.indexAt(at, dropAtNode.id));
                track.$.navigationPanel.organize.moveOrganizeItem({ type: 'folder' });
            }
            else if (data.source.data.entity?.type === 'collection' ||
                data.source.data.entity?.type === 'doc' ||
                data.source.data.entity?.type === 'tag') {
                if (data.source.data.from?.at ===
                    'navigation-panel:organize:folder-node') {
                    node.moveHere(data.source.data.from.nodeId, node.indexAt(at, dropAtNode.id));
                    track.$.navigationPanel.organize.moveOrganizeItem({
                        type: 'link',
                        target: data.source.data.entity?.type,
                    });
                }
                else {
                    node.createLink(data.source.data.entity?.type, data.source.data.entity.id, node.indexAt(at, dropAtNode.id));
                    track.$.navigationPanel.organize.createOrganizeItem({
                        type: 'link',
                        target: data.source.data.entity?.type,
                    });
                }
            }
        }
        else if (data.treeInstruction?.type === 'reparent') {
            const currentLevel = data.treeInstruction.currentLevel;
            const desiredLevel = data.treeInstruction.desiredLevel;
            if (currentLevel === desiredLevel + 1) {
                onDrop?.({
                    ...data,
                    treeInstruction: {
                        type: 'reorder-below',
                        currentLevel,
                        indentPerLevel: data.treeInstruction.indentPerLevel,
                    },
                });
                return;
            }
            else {
                onDrop?.({
                    ...data,
                    treeInstruction: {
                        ...data.treeInstruction,
                        currentLevel: currentLevel - 1,
                    },
                });
            }
        }
    }, [node, onDrop]);
    const handleDropEffectOnChildren = useCallback(data => {
        if (data.treeInstruction?.type === 'reorder-above' ||
            data.treeInstruction?.type === 'reorder-below') {
            if (data.source.data.entity?.type === 'folder') {
                if (node.id === data.source.data.entity.id ||
                    node.beChildOf(data.source.data.entity.id)) {
                    return;
                }
                return 'move';
            }
            else if (data.source.data.from?.at ===
                'navigation-panel:organize:folder-node') {
                return 'move';
            }
            else if (data.source.data.entity?.type === 'collection' ||
                data.source.data.entity?.type === 'doc' ||
                data.source.data.entity?.type === 'tag') {
                return 'link';
            }
        }
        else if (data.treeInstruction?.type === 'reparent') {
            const currentLevel = data.treeInstruction.currentLevel;
            const desiredLevel = data.treeInstruction.desiredLevel;
            if (currentLevel === desiredLevel + 1) {
                dropEffect?.({
                    ...data,
                    treeInstruction: {
                        type: 'reorder-below',
                        currentLevel,
                        indentPerLevel: data.treeInstruction.indentPerLevel,
                    },
                });
                return;
            }
            else {
                dropEffect?.({
                    ...data,
                    treeInstruction: {
                        ...data.treeInstruction,
                        currentLevel: currentLevel - 1,
                    },
                });
            }
        }
        return;
    }, [dropEffect, node]);
    const handleCanDrop = useMemo(() => args => {
        const entityType = args.source.data.entity?.type;
        if (args.treeInstruction && args.treeInstruction?.type !== 'make-child') {
            return ((typeof canDrop === 'function' ? canDrop(args) : canDrop) ?? true);
        }
        if (args.source.data.entity?.type === 'folder') {
            if (node.id === args.source.data.entity.id ||
                node.beChildOf(args.source.data.entity.id)) {
                return false;
            }
            return true;
        }
        else if (args.source.data.from?.at === 'navigation-panel:organize:folder-node') {
            return true;
        }
        else if (entityType === 'collection' ||
            entityType === 'doc' ||
            entityType === 'tag') {
            return true;
        }
        return false;
    }, [canDrop, node]);
    const handleChildrenCanDrop = useMemo(() => args => {
        const entityType = args.source.data.entity?.type;
        if (args.source.data.entity?.type === 'folder') {
            if (node.id === args.source.data.entity.id ||
                node.beChildOf(args.source.data.entity.id)) {
                return false;
            }
            return true;
        }
        else if (args.source.data.from?.at === 'navigation-panel:organize:folder-node') {
            return true;
        }
        else if (entityType === 'collection' ||
            entityType === 'doc' ||
            entityType === 'tag') {
            return true;
        }
        return false;
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
    const handleCreateSubfolder = useCallback(() => {
        const newFolderId = node.createFolder(t['com.affine.rootAppSidebar.organize.new-folders'](), node.indexAt('before'));
        track.$.navigationPanel.organize.createOrganizeItem({ type: 'folder' });
        setCollapsed(false);
        setNewFolderId(newFolderId);
    }, [node, setCollapsed, t]);
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
    const folderOperations = useMemo(() => {
        return [
            {
                index: 0,
                inline: true,
                view: (_jsx(IconButton, { size: "16", onClick: handleNewDoc, tooltip: t['com.affine.rootAppSidebar.explorer.organize-add-tooltip'](), children: _jsx(PlusIcon, {}) })),
            },
            {
                index: 100,
                view: (_jsx(MenuItem, { prefixIcon: _jsx(FolderIcon, {}), onClick: handleCreateSubfolder, children: t['com.affine.rootAppSidebar.organize.folder.create-subfolder']() })),
            },
            {
                index: 101,
                view: (_jsx(MenuItem, { prefixIcon: _jsx(PageIcon, {}), onClick: () => handleAddToFolder('doc'), children: t['com.affine.rootAppSidebar.organize.folder.add-docs']() })),
            },
            {
                index: 102,
                view: (_jsx(MenuSub, { triggerOptions: {
                        prefixIcon: _jsx(PlusThickIcon, {}),
                    }, items: _jsxs(_Fragment, { children: [_jsx(MenuItem, { onClick: () => handleAddToFolder('tag'), prefixIcon: _jsx(TagsIcon, {}), children: t['com.affine.rootAppSidebar.organize.folder.add-tags']() }), _jsx(MenuItem, { onClick: () => handleAddToFolder('collection'), prefixIcon: _jsx(AnimatedCollectionsIcon, { closed: false }), children: t['com.affine.rootAppSidebar.organize.folder.add-collections']() })] }), children: t['com.affine.rootAppSidebar.organize.folder.add-others']() })),
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
        handleAddToFolder,
        handleCreateSubfolder,
        handleDelete,
        handleNewDoc,
        node,
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
            setNewFolderId(null); // reset new folder id to clear the renaming state
            setCollapsed(true);
        }
        else {
            setCollapsed(false);
        }
    }, [setCollapsed]);
    return (_jsx(NavigationPanelTreeNode, { icon: NavigationPanelFolderIcon, name: name, dndData: dndData, onDrop: handleDropOnFolder, defaultRenaming: defaultRenaming, renameable: true, extractEmojiAsIcon: enableEmojiIcon, reorderable: reorderable, collapsed: collapsed, setCollapsed: handleCollapsedChange, onRename: handleRename, operations: finalOperations, canDrop: handleCanDrop, childrenPlaceholder: _jsx(FolderEmpty, { canDrop: handleCanDrop, onDrop: handleDropOnPlaceholder }), dropEffect: handleDropEffect, "data-testid": `navigation-panel-folder-${node.id}`, explorerIconConfig: node.id ? { where: 'folder', id: node.id } : null, children: children.map(child => (_jsx(NavigationPanelFolderNode, { nodeId: child.id, defaultRenaming: child.id === newFolderId, onDrop: handleDropOnChildren, operations: childrenOperations, dropEffect: handleDropEffectOnChildren, canDrop: handleChildrenCanDrop, location: {
                at: 'navigation-panel:organize:folder-node',
                nodeId: child.id,
            }, parentPath: path }, child.id))) }));
};
//# sourceMappingURL=index.js.map