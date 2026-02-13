import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowDownSmallIcon } from '@blocksuite/icons/rc';
import clsx from 'clsx';
import { forwardRef } from 'react';
import * as styles from './styles.css';
export const DropdownButton = forwardRef(({ onClickDropDown, children, size = 'default', className, ...props }, ref) => {
    const handleClickDropDown = e => {
        e.stopPropagation();
        onClickDropDown?.(e);
    };
    return (_jsxs("button", { ref: ref, "data-size": size, className: clsx(styles.dropdownBtn, className), ...props, children: [_jsx("span", { children: children }), _jsx("span", { className: styles.divider }), _jsx("span", { className: styles.dropdownWrapper, onClick: handleClickDropDown, children: _jsx(ArrowDownSmallIcon, { className: styles.dropdownIcon, width: 16, height: 16 }) })] }));
});
DropdownButton.displayName = 'DropdownButton';
//# sourceMappingURL=dropdown-button.js.map