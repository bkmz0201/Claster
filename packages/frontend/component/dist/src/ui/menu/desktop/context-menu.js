import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as RadixContextMenu from '@radix-ui/react-context-menu';
import clsx from 'clsx';
import * as styles from '../styles.css';
import { DesktopMenuContext } from './context';
import * as desktopStyles from './styles.css';
const ContextMenuContextValue = {
    type: 'context-menu',
};
export const ContextMenu = ({ children, onOpenChange, dir, modal, items, contentProps, ...props }) => {
    return (_jsx(DesktopMenuContext.Provider, { value: ContextMenuContextValue, children: _jsxs(RadixContextMenu.Root, { onOpenChange: onOpenChange, dir: dir, modal: modal, children: [_jsx(RadixContextMenu.Trigger, { ...props, children: children }), _jsx(RadixContextMenu.Portal, { children: _jsx(RadixContextMenu.Content, { className: clsx(styles.menuContent, desktopStyles.contentAnimation, contentProps?.className), style: {
                            zIndex: 'var(--affine-z-index-popover)',
                            ...contentProps?.style,
                        }, ...contentProps, children: items }) })] }) }));
};
//# sourceMappingURL=context-menu.js.map