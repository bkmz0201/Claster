import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { WorkbenchLink } from '@affine/core/modules/workbench';
import { ArrowDownSmallIcon } from '@blocksuite/icons/rc';
import clsx from 'clsx';
import React, {} from 'react';
import * as styles from './index.css';
const stopPropagation = e => {
    e.stopPropagation();
};
/**
 * This component is not a generic component.
 * It is used for the app sidebar.
 */
export const MenuItem = React.forwardRef(({ onClick, icon, active, children, disabled, collapsed, onCollapsedChange, postfix, postfixDisplay = 'hover', ...props }, ref) => {
    const collapsible = onCollapsedChange !== undefined;
    return (_jsxs("div", { ref: ref, ...props, onClick: onClick, className: clsx([styles.root, props.className]), "data-active": active, "data-disabled": disabled, "data-collapsible": collapsible, tabIndex: 0, children: [icon && (_jsxs("div", { className: styles.iconsContainer, "data-collapsible": collapsible, children: [collapsible && (_jsx("div", { "data-disabled": collapsed === undefined ? true : undefined, onClick: e => {
                            e.stopPropagation();
                            e.preventDefault(); // for links
                            onCollapsedChange?.(!collapsed);
                        }, "data-testid": "fav-collapsed-button", className: styles.collapsedIconContainer, children: _jsx(ArrowDownSmallIcon, { className: styles.collapsedIcon, "data-collapsed": collapsed !== false }) })), React.cloneElement(icon, {
                        className: clsx([styles.icon, icon.props.className]),
                    })] })), _jsx("div", { className: styles.content, children: children }), postfix ? (_jsx("div", { className: styles.postfix, "data-postfix-display": postfixDisplay, onClick: stopPropagation, children: postfix })) : null] }));
});
MenuItem.displayName = 'MenuItem';
export const MenuLinkItem = React.forwardRef(({ to, linkComponent: LinkComponent = WorkbenchLink, ...props }, ref) => {
    return (_jsx(LinkComponent, { to: to, className: styles.linkItemRoot, children: _jsx(MenuItem, { ref: ref, ...props }) }));
});
MenuLinkItem.displayName = 'MenuLinkItem';
//# sourceMappingURL=index.js.map