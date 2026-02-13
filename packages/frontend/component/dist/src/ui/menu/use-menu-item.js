import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { DoneIcon } from '@blocksuite/icons/rc';
import clsx from 'clsx';
import { mobileMenuItem } from './mobile/styles.css';
import * as styles from './styles.css';
export const useMenuItem = ({ children: propsChildren, type = 'default', className: propsClassName, prefix, prefixIcon, prefixIconClassName, suffix, suffixIcon, suffixIconClassName, checked, selected, block, disabled, ...otherProps }) => {
    const className = clsx(styles.menuItem, {
        danger: disabled ? false : type === 'danger',
        warning: disabled ? false : type === 'warning',
        disabled,
        checked,
        selected,
        block,
        [mobileMenuItem]: BUILD_CONFIG.isMobileEdition,
    }, propsClassName);
    const children = (_jsxs(_Fragment, { children: [prefix, prefixIcon ? (_jsx("div", { className: clsx(styles.menuItemIcon, prefixIconClassName), children: prefixIcon })) : null, _jsx("span", { className: styles.menuSpan, children: propsChildren }), suffixIcon ? (_jsx("div", { className: clsx(styles.menuItemIcon, suffixIconClassName), children: suffixIcon })) : null, suffix, checked || selected ? (_jsx("div", { className: clsx(styles.menuItemIcon, 'selected'), children: _jsx(DoneIcon, {}) })) : null] }));
    return {
        children,
        className,
        otherProps,
    };
};
//# sourceMappingURL=use-menu-item.js.map