import { jsx as _jsx } from "react/jsx-runtime";
import { Modal, toast } from '@affine/component';
import { FavoriteTag, ListTableHeader, tagHeaderColsDef, TagListItemRenderer, VirtualizedList, } from '@affine/core/components/page-list';
import { SelectorLayout } from '@affine/core/components/page-list/selector/selector-layout';
import { FavoriteService } from '@affine/core/modules/favorite';
import { TagService } from '@affine/core/modules/tag';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { cssVar } from '@toeverything/theme';
import { useCallback, useMemo, useState } from 'react';
const FavoriteOperation = ({ tag }) => {
    const t = useI18n();
    const favoriteService = useService(FavoriteService);
    const isFavorite = useLiveData(favoriteService.favoriteList.isFavorite$('tag', tag.id));
    const onToggleFavoriteCollection = useCallback(() => {
        favoriteService.favoriteList.toggle('tag', tag.id);
        toast(isFavorite
            ? t['com.affine.toastMessage.removedFavorites']()
            : t['com.affine.toastMessage.addedFavorites']());
    }, [favoriteService.favoriteList, tag.id, isFavorite, t]);
    return (_jsx(FavoriteTag, { style: { marginRight: 8 }, onClick: onToggleFavoriteCollection, active: isFavorite }));
};
export const TagSelectorDialog = ({ close, init: selectedTagIds, }) => {
    const t = useI18n();
    const workspace = useService(WorkspaceService).workspace;
    const tagList = useService(TagService).tagList;
    const [selection, setSelection] = useState(selectedTagIds);
    const [keyword, setKeyword] = useState('');
    const tagMetas = useLiveData(tagList.tagMetas$);
    const filteredTagMetas = useMemo(() => {
        return tagMetas.filter(tag => {
            const reg = new RegExp(keyword, 'i');
            return reg.test(tag.name);
        });
    }, [keyword, tagMetas]);
    const tagItemRenderer = useCallback((item) => {
        return _jsx(TagListItemRenderer, { ...item });
    }, []);
    const tagOperationRenderer = useCallback((item) => {
        return _jsx(FavoriteOperation, { tag: item });
    }, []);
    const tagHeaderRenderer = useCallback(() => {
        return _jsx(ListTableHeader, { headerCols: tagHeaderColsDef });
    }, []);
    return (_jsx(Modal, { open: true, onOpenChange: () => close(), withoutCloseButton: true, width: "calc(100% - 32px)", height: "80%", contentOptions: {
            style: {
                padding: 0,
                maxWidth: 976,
                background: cssVar('backgroundPrimaryColor'),
            },
        }, children: _jsx(SelectorLayout, { searchPlaceholder: t['com.affine.selector-tag.search.placeholder'](), selectedCount: selection.length, onSearch: setKeyword, onConfirm: () => close(selection), onCancel: close, onClear: () => setSelection([]), children: _jsx(VirtualizedList, { selectable: true, draggable: false, selectedIds: selection, onSelectedIdsChange: setSelection, items: filteredTagMetas, docCollection: workspace.docCollection, itemRenderer: tagItemRenderer, operationsRenderer: tagOperationRenderer, headerRenderer: tagHeaderRenderer }) }) }));
};
//# sourceMappingURL=tag.js.map