import { jsx as _jsx } from "react/jsx-runtime";
import * as ContextMenu from '@radix-ui/react-context-menu';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useContext } from 'react';
import { useMenuItem } from '../use-menu-item';
import { DesktopMenuContext } from './context';
export const DesktopMenuItem = (props) => {
    const { type } = useContext(DesktopMenuContext);
    const { className, children, otherProps } = useMenuItem(props);
    if (type === 'dropdown-menu') {
        return (_jsx(DropdownMenu.Item, { className: className, ...otherProps, children: children }));
    }
    if (type === 'context-menu') {
        return (_jsx(ContextMenu.Item, { className: className, ...otherProps, children: children }));
    }
    return null;
};
//# sourceMappingURL=item.js.map