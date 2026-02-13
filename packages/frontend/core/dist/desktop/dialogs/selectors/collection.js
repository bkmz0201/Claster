import { jsx as _jsx } from "react/jsx-runtime";
import { Modal, toast } from '@affine/component';
import { collectionHeaderColsDef, CollectionListItemRenderer, FavoriteTag, ListTableHeader, VirtualizedList, } from '@affine/core/components/page-list';
import { SelectorLayout } from '@affine/core/components/page-list/selector/selector-layout';
import { CollectionService, } from '@affine/core/modules/collection';
import { CompatibleFavoriteItemsAdapter } from '@affine/core/modules/favorite';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { cssVar } from '@toeverything/theme';
import { useCallback, useMemo, useState } from 'react';
const FavoriteOperation = ({ collection }) => {
    const t = useI18n();
    const favAdapter = useService(CompatibleFavoriteItemsAdapter);
    const isFavorite = useLiveData(favAdapter.isFavorite$(collection.id, 'collection'));
    const onToggleFavoriteCollection = useCallback(() => {
        favAdapter.toggle(collection.id, 'collection');
        toast(isFavorite
            ? t['com.affine.toastMessage.removedFavorites']()
            : t['com.affine.toastMessage.addedFavorites']());
    }, [collection.id, favAdapter, isFavorite, t]);
    return (_jsx(FavoriteTag, { style: { marginRight: 8 }, onClick: onToggleFavoriteCollection, active: isFavorite }));
};
export const CollectionSelectorDialog = ({ close, init: selectedCollectionIds, }) => {
    const t = useI18n();
    const collectionService = useService(CollectionService);
    const workspace = useService(WorkspaceService).workspace;
    const collections = useLiveData(collectionService.collectionMetas$);
    const [selection, setSelection] = useState(selectedCollectionIds);
    const [keyword, setKeyword] = useState('');
    const collectionMetas = useMemo(() => {
        const collectionsList = collections.filter(meta => {
            const reg = new RegExp(keyword, 'i');
            return reg.test(meta.title);
        });
        return collectionsList;
    }, [collections, keyword]);
    const collectionItemRenderer = useCallback((item) => {
        return _jsx(CollectionListItemRenderer, { ...item });
    }, []);
    const collectionHeaderRenderer = useCallback(() => {
        return _jsx(ListTableHeader, { headerCols: collectionHeaderColsDef });
    }, []);
    const collectionOperationRenderer = useCallback((item) => {
        return _jsx(FavoriteOperation, { collection: item });
    }, []);
    return (_jsx(Modal, { open: true, onOpenChange: () => close(), withoutCloseButton: true, width: "calc(100% - 32px)", height: "80%", contentOptions: {
            style: {
                padding: 0,
                maxWidth: 976,
                background: cssVar('backgroundPrimaryColor'),
            },
        }, children: _jsx(SelectorLayout, { searchPlaceholder: t['com.affine.selector-collection.search.placeholder'](), selectedCount: selection.length, onSearch: setKeyword, onClear: () => setSelection([]), onCancel: () => close(), onConfirm: () => close(selection), children: _jsx(VirtualizedList, { selectable: true, draggable: false, selectedIds: selection, onSelectedIdsChange: setSelection, items: collectionMetas, itemRenderer: collectionItemRenderer, rowAsLink: true, docCollection: workspace.docCollection, operationsRenderer: collectionOperationRenderer, headerRenderer: collectionHeaderRenderer }) }) }));
};
//# sourceMappingURL=collection.js.map