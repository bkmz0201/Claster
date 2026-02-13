import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { WorkspaceService } from '@affine/core/modules/workspace';
import { Trans } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useMemo, useRef, useState } from 'react';
import { CollectionService, } from '../../../modules/collection';
import { ListFloatingToolbar } from '../components/list-floating-toolbar';
import { collectionHeaderColsDef } from '../header-col-def';
import { CollectionOperationCell } from '../operation-cell';
import { CollectionListItemRenderer } from '../page-group';
import { ListTableHeader } from '../page-header';
import { VirtualizedList } from '../virtualized-list';
import { CollectionListHeader } from './collection-list-header';
export const VirtualizedCollectionList = ({ setHideHeaderCreateNewCollection, handleCreateCollection, }) => {
    const listRef = useRef(null);
    const [showFloatingToolbar, setShowFloatingToolbar] = useState(false);
    const [selectedCollectionIds, setSelectedCollectionIds] = useState([]);
    const collectionService = useService(CollectionService);
    const collectionMetas = useLiveData(collectionService.collectionMetas$);
    const currentWorkspace = useService(WorkspaceService).workspace;
    const filteredSelectedCollectionIds = useMemo(() => {
        const ids = new Set(collectionMetas.map(collection => collection.id));
        return selectedCollectionIds.filter(id => ids.has(id));
    }, [collectionMetas, selectedCollectionIds]);
    const hideFloatingToolbar = useCallback(() => {
        listRef.current?.toggleSelectable();
    }, []);
    const collectionOperationRenderer = useCallback((item) => {
        const collection = item;
        return (_jsx(CollectionOperationCell, { collectionMeta: collection }));
    }, []);
    const collectionHeaderRenderer = useCallback(() => {
        return _jsx(ListTableHeader, { headerCols: collectionHeaderColsDef });
    }, []);
    const collectionItemRenderer = useCallback((item) => {
        return _jsx(CollectionListItemRenderer, { ...item });
    }, []);
    const handleDelete = useCallback(() => {
        if (selectedCollectionIds.length === 0) {
            return;
        }
        for (const collectionId of selectedCollectionIds) {
            collectionService.deleteCollection(collectionId);
        }
        hideFloatingToolbar();
    }, [collectionService, hideFloatingToolbar, selectedCollectionIds]);
    return (_jsxs(_Fragment, { children: [_jsx(VirtualizedList, { ref: listRef, selectable: "toggle", draggable: true, atTopThreshold: 80, atTopStateChange: setHideHeaderCreateNewCollection, onSelectionActiveChange: setShowFloatingToolbar, heading: _jsx(CollectionListHeader, { onCreate: handleCreateCollection }), selectedIds: filteredSelectedCollectionIds, onSelectedIdsChange: setSelectedCollectionIds, items: collectionMetas, itemRenderer: collectionItemRenderer, rowAsLink: true, docCollection: currentWorkspace.docCollection, operationsRenderer: collectionOperationRenderer, headerRenderer: collectionHeaderRenderer }), _jsx(ListFloatingToolbar, { open: showFloatingToolbar, content: _jsxs(Trans, { i18nKey: "com.affine.collection.toolbar.selected", count: selectedCollectionIds.length, children: [_jsx("div", { style: { color: 'var(--affine-text-secondary-color)' }, children: { count: selectedCollectionIds.length } }), "selected"] }), onClose: hideFloatingToolbar, onDelete: handleDelete })] }));
};
//# sourceMappingURL=virtualized-collection-list.js.map