import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton } from '@affine/component';
import { IsFavoriteIcon } from '@affine/core/components/pure/icons';
import { CompatibleFavoriteItemsAdapter } from '@affine/core/modules/favorite';
import { WorkbenchLink } from '@affine/core/modules/workbench';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback } from 'react';
import { content, item, prefixIcon, suffixIcon } from './styles.css';
export const TagItem = ({ tag }) => {
    const favAdapter = useService(CompatibleFavoriteItemsAdapter);
    const isFavorite = useLiveData(favAdapter.isFavorite$(tag.id, 'tag'));
    const color = useLiveData(tag.color$);
    const name = useLiveData(tag.value$);
    const toggle = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        favAdapter.toggle(tag.id, 'tag');
    }, [favAdapter, tag.id]);
    return (_jsxs(WorkbenchLink, { to: `/tag/${tag.id}`, className: item, children: [_jsx("div", { className: prefixIcon, style: { color } }), _jsx("span", { className: content, children: name }), _jsx(IconButton, { className: suffixIcon, onClick: toggle, icon: _jsx(IsFavoriteIcon, { favorite: isFavorite }), size: "24" })] }));
};
//# sourceMappingURL=item.js.map