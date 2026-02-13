import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton } from '@affine/component';
import { IsFavoriteIcon } from '@affine/core/components/pure/icons';
import { CompatibleFavoriteItemsAdapter } from '@affine/core/modules/favorite';
import { WorkbenchLink } from '@affine/core/modules/workbench';
import { ViewLayersIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback } from 'react';
import { item, name, prefixIcon, suffixIcon } from './styles.css';
export const CollectionListItem = ({ meta }) => {
    const favAdapter = useService(CompatibleFavoriteItemsAdapter);
    const isFavorite = useLiveData(favAdapter.isFavorite$(meta.id, 'collection'));
    const toggle = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        favAdapter.toggle(meta.id, 'collection');
    }, [favAdapter, meta.id]);
    return (_jsxs(WorkbenchLink, { to: `/collection/${meta.id}`, className: item, children: [_jsx(ViewLayersIcon, { className: prefixIcon }), _jsx("span", { className: name, children: meta.title }), _jsx(IconButton, { className: suffixIcon, onClick: toggle, icon: _jsx(IsFavoriteIcon, { favorite: isFavorite }), size: "24" })] }));
};
//# sourceMappingURL=item.js.map