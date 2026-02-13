import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ToggleRightIcon } from '@blocksuite/icons/rc';
import clsx from 'clsx';
import { forwardRef } from 'react';
import * as styles from './index.css';
export const CategoryDivider = forwardRef(({ label, children, className, collapsed, setCollapsed, ...otherProps }, ref) => {
    const collapsible = collapsed !== undefined;
    return (_jsxs("div", { className: clsx(styles.root, className), ref: ref, role: "switch", onClick: () => setCollapsed?.(!collapsed), "data-collapsed": collapsed, "data-collapsible": collapsible, ...otherProps, children: [_jsxs("div", { className: styles.label, children: [label, collapsible ? (_jsx(ToggleRightIcon, { width: 16, height: 16, "data-testid": "category-divider-collapse-button", className: styles.collapseIcon })) : null] }), _jsx("div", { className: styles.actions, onClick: e => e.stopPropagation(), children: children })] }));
});
CategoryDivider.displayName = 'CategoryDivider';
//# sourceMappingURL=index.js.map