import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as Popover from '@radix-ui/react-popover';
import * as Toolbar from '@radix-ui/react-toolbar';
import clsx from 'clsx';
import * as styles from './floating-toolbar.css';
export function FloatingToolbar({ children, style, className, open, }) {
    return (_jsxs(Popover.Root, { open: open, children: [_jsx(Popover.Anchor, { className: className, style: style }), _jsx(Popover.Portal, { children: _jsx(Popover.Content, { side: "top", className: styles.popoverContent, children: _jsx(Toolbar.Root, { "data-testid": "floating-toolbar", className: clsx(styles.root), children: children }) }) })] }));
}
// freestyle item that allows user to do anything
export function FloatingToolbarItem({ children, }) {
    return _jsx("div", { className: styles.item, children: children });
}
// a typical button that has icon and label
export function FloatingToolbarButton({ icon, type, onClick, className, style, label, ...props }) {
    return (_jsxs(Toolbar.Button, { onClick: onClick, className: clsx(styles.button, type === 'danger' && styles.danger, className), style: style, ...props, children: [_jsx("div", { className: styles.buttonIcon, children: icon }), label] }));
}
export function FloatingToolbarSeparator() {
    return _jsx(Toolbar.Separator, { className: styles.separator });
}
FloatingToolbar.Item = FloatingToolbarItem;
FloatingToolbar.Separator = FloatingToolbarSeparator;
FloatingToolbar.Button = FloatingToolbarButton;
//# sourceMappingURL=floating-toolbar.js.map