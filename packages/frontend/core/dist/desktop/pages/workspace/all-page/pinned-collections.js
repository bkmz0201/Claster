import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Divider, IconButton, Menu, MenuItem, Tooltip, } from '@affine/component';
import { AddFilterMenu } from '@affine/core/components/filter/add-filter';
import { CollectionService, PinnedCollectionService, } from '@affine/core/modules/collection';
import { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import { useI18n } from '@affine/i18n';
import track from '@affine/track';
import { CloseIcon, CollectionsIcon, EditIcon, FilterIcon, PlusIcon, } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useMemo, useState } from 'react';
import * as styles from './pinned-collections.css';
export const PinnedCollectionItem = ({ record, isActive, onClick, onClickRemove, }) => {
    const t = useI18n();
    const collectionService = useService(CollectionService);
    const collection = useLiveData(collectionService.collection$(record.collectionId));
    const name = useLiveData(collection?.name$);
    if (!collection) {
        return null;
    }
    return (_jsxs("div", { className: styles.item, role: "button", "data-active": isActive ? 'true' : undefined, onClick: onClick, children: [_jsx("span", { className: styles.itemContent, children: name ?? t['Untitled']() }), isActive && (_jsx(IconButton, { className: styles.closeButton, size: "16", onClick: e => {
                    e.stopPropagation();
                    onClickRemove();
                }, children: _jsx(CloseIcon, {}) }))] }));
};
export const PinnedCollections = ({ activeCollectionId, onActiveAll, onActiveCollection, onAddFilter, hiddenAdd, }) => {
    const t = useI18n();
    const workspaceDialogService = useService(WorkspaceDialogService);
    const pinnedCollectionService = useService(PinnedCollectionService);
    const pinnedCollections = useLiveData(pinnedCollectionService.sortedPinnedCollections$);
    const handleAddPinnedCollection = (collectionId) => {
        pinnedCollectionService.addPinnedCollection({
            collectionId,
            index: pinnedCollectionService.indexAt('after'),
        });
    };
    return (_jsxs("div", { className: styles.container, children: [_jsx("div", { className: styles.item, "data-active": activeCollectionId === null ? 'true' : undefined, onClick: () => {
                    // only fire onActiveAll if the collection is not already active
                    if (activeCollectionId !== null) {
                        track.allDocs.header.navigation.navigatePinedCollectionRouter({
                            control: 'all',
                        });
                        onActiveAll();
                    }
                }, role: "button", children: t['com.affine.all-docs.pinned-collection.all']() }), pinnedCollections.map((record, index) => (_jsx(PinnedCollectionItem, { record: record, isActive: activeCollectionId === record.collectionId, onClick: () => {
                    // only fire onActiveCollection if the collection is not already active
                    if (activeCollectionId !== record.collectionId) {
                        track.allDocs.header.navigation.navigatePinedCollectionRouter({
                            control: 'user-custom-collection',
                        });
                        onActiveCollection(record.collectionId);
                    }
                }, onClickRemove: () => {
                    const nextCollectionId = pinnedCollections[index - 1]?.collectionId;
                    if (nextCollectionId) {
                        onActiveCollection(nextCollectionId);
                    }
                    else {
                        onActiveAll();
                    }
                    pinnedCollectionService.removePinnedCollection(record.collectionId);
                } }, record.collectionId))), !hiddenAdd && (_jsx(AddPinnedCollection, { onPinCollection: handleAddPinnedCollection, onAddFilter: onAddFilter })), _jsx("div", { style: { flex: 1 } }), activeCollectionId && (_jsx(Tooltip, { content: t['com.affine.all-docs.pinned-collection.edit'](), children: _jsx(IconButton, { size: "16", className: styles.editIconButton, onClick: () => {
                        track.allDocs.header.collection.editCollection();
                        workspaceDialogService.open('collection-editor', {
                            collectionId: activeCollectionId,
                        });
                    }, children: _jsx(EditIcon, {}) }) }))] }));
};
export const AddPinnedCollection = ({ onPinCollection, onAddFilter, }) => {
    return (_jsx(Menu, { items: _jsx(AddPinnedCollectionMenuContent, { onPinCollection: onPinCollection, onAddFilter: onAddFilter }), children: _jsx(IconButton, { size: "16", children: _jsx(PlusIcon, {}) }) }));
};
export const AddPinnedCollectionMenuContent = ({ onPinCollection, onAddFilter, }) => {
    const [addingFilter, setAddingFilter] = useState(false);
    const collectionService = useService(CollectionService);
    const collectionMetas = useLiveData(collectionService.collectionMetas$);
    const pinnedCollectionService = useService(PinnedCollectionService);
    const pinnedCollections = useLiveData(pinnedCollectionService.pinnedCollections$);
    const unpinnedCollectionMetas = useMemo(() => collectionMetas.filter(meta => !pinnedCollections.some(collection => collection.collectionId === meta.id)), [pinnedCollections, collectionMetas]);
    const t = useI18n();
    return !addingFilter ? (_jsxs(_Fragment, { children: [_jsx(MenuItem, { prefixIcon: _jsx(FilterIcon, {}), onClick: e => {
                    // prevent default to avoid closing the menu
                    e.preventDefault();
                    setAddingFilter(true);
                }, children: t['com.affine.filter']() }), unpinnedCollectionMetas.length > 0 && _jsx(Divider, {}), unpinnedCollectionMetas.map(meta => (_jsx(MenuItem, { prefixIcon: _jsx(CollectionsIcon, {}), suffixIcon: _jsx(PlusIcon, {}), onClick: () => {
                    track.allDocs.header.collection.addPinnedCollection();
                    onPinCollection(meta.id);
                }, children: meta.name ?? t['Untitled']() }, meta.id)))] })) : (_jsx(AddFilterMenu, { onBack: () => setAddingFilter(false), onAdd: onAddFilter }));
};
//# sourceMappingURL=pinned-collections.js.map