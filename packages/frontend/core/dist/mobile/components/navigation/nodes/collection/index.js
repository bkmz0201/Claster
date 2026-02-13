import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { MenuItem, notify } from '@affine/component';
import { CollectionService, } from '@affine/core/modules/collection';
import { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import { GlobalContextService } from '@affine/core/modules/global-context';
import { NavigationPanelService } from '@affine/core/modules/navigation-panel';
import { ShareDocsListService } from '@affine/core/modules/share-doc';
import { useI18n } from '@affine/i18n';
import track from '@affine/track';
import { FilterMinusIcon, ViewLayersIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService, useServices } from '@toeverything/infra';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AddItemPlaceholder } from '../../layouts/add-item-placeholder';
import { NavigationPanelTreeNode } from '../../tree/node';
import { NavigationPanelDocNode } from '../doc';
import { useNavigationPanelCollectionNodeOperations, useNavigationPanelCollectionNodeOperationsMenu, } from './operations';
const CollectionIcon = () => _jsx(ViewLayersIcon, {});
export const NavigationPanelCollectionNode = ({ collectionId, operations: additionalOperations, parentPath, }) => {
    const t = useI18n();
    const { globalContextService, collectionService, workspaceDialogService } = useServices({
        GlobalContextService,
        CollectionService,
        WorkspaceDialogService,
    });
    const navigationPanelService = useService(NavigationPanelService);
    const active = useLiveData(globalContextService.globalContext.collectionId.$) ===
        collectionId;
    const path = useMemo(() => [...parentPath, `collection-${collectionId}`], [parentPath, collectionId]);
    const collapsed = useLiveData(navigationPanelService.collapsed$(path));
    const setCollapsed = useCallback((value) => {
        navigationPanelService.setCollapsed(path, value);
    }, [navigationPanelService, path]);
    const collection = useLiveData(collectionService.collection$(collectionId));
    const name = useLiveData(collection?.name$);
    const handleOpenCollapsed = useCallback(() => {
        setCollapsed(false);
    }, [setCollapsed]);
    const handleEditCollection = useCallback(() => {
        if (!collection) {
            return;
        }
        workspaceDialogService.open('collection-editor', {
            collectionId: collection.id,
        });
    }, [collection, workspaceDialogService]);
    const collectionOperations = useNavigationPanelCollectionNodeOperationsMenu(collectionId, handleOpenCollapsed, handleEditCollection);
    const { handleAddDocToCollection } = useNavigationPanelCollectionNodeOperations(collectionId, handleOpenCollapsed, handleEditCollection);
    const finalOperations = useMemo(() => {
        if (additionalOperations) {
            return [...additionalOperations, ...collectionOperations];
        }
        return collectionOperations;
    }, [additionalOperations, collectionOperations]);
    if (!collection) {
        return null;
    }
    return (_jsx(NavigationPanelTreeNode, { icon: CollectionIcon, name: name || t['Untitled'](), collapsed: collapsed, setCollapsed: setCollapsed, to: `/collection/${collection.id}`, active: active, operations: finalOperations, "data-testid": `navigation-panel-collection-${collectionId}`, children: _jsx(NavigationPanelCollectionNodeChildren, { collection: collection, onAddDoc: handleAddDocToCollection, path: path }) }));
};
const NavigationPanelCollectionNodeChildren = ({ collection, onAddDoc, path, }) => {
    const t = useI18n();
    const { shareDocsListService, collectionService } = useServices({
        ShareDocsListService,
        CollectionService,
    });
    useEffect(() => {
        // TODO(@eyhn): loading & error UI
        shareDocsListService.shareDocs?.revalidate();
    }, [shareDocsListService]);
    const allowList = useLiveData(collection.allowList$);
    const handleRemoveFromAllowList = useCallback((id) => {
        track.$.navigationPanel.collections.removeOrganizeItem({ type: 'doc' });
        collectionService.removeDocFromCollection(collection.id, id);
        notify.success({
            message: t['com.affine.collection.removePage.success'](),
        });
    }, [collection.id, collectionService, t]);
    const [filteredDocIds, setFilteredDocIds] = useState([]);
    useEffect(() => {
        const subscription = collection.watch().subscribe(docIds => {
            setFilteredDocIds(docIds);
        });
        return () => subscription.unsubscribe();
    }, [collection]);
    return (_jsxs(_Fragment, { children: [filteredDocIds.map(docId => (_jsx(NavigationPanelDocNode, { docId: docId, parentPath: path, operations: allowList
                    ? [
                        {
                            index: 99,
                            view: (_jsx(MenuItem, { prefixIcon: _jsx(FilterMinusIcon, {}), onClick: () => handleRemoveFromAllowList(docId), children: t['Remove special filter']() })),
                        },
                    ]
                    : [] }, docId))), _jsx(AddItemPlaceholder, { label: t['New Page'](), onClick: onAddDoc })] }));
};
//# sourceMappingURL=index.js.map