import { jsx as _jsx } from "react/jsx-runtime";
import { Menu } from '@affine/component';
import { useEffect, useRef } from 'react';
export const FilterValueMenu = ({ isDraft, rootOptions, contentOptions, onDraftCompleted, ...otherProps }) => {
    const menuRef = useRef(null);
    useEffect(() => {
        if (isDraft) {
            menuRef.current?.changeOpen(true);
        }
    }, [isDraft]);
    return (_jsx(Menu, { ref: menuRef, rootOptions: {
            onClose: onDraftCompleted,
            ...rootOptions,
        }, contentOptions: {
            alignOffset: -4,
            ...contentOptions,
        }, ...otherProps }));
};
//# sourceMappingURL=filter-value-menu.js.map