import { jsx as _jsx } from "react/jsx-runtime";
import { ArrowDownSmallIcon } from '@blocksuite/icons/rc';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { Button } from '../button';
export const MenuTrigger = forwardRef(function MenuTrigger({ children, className, contentStyle, ...otherProps }, ref) {
    return (_jsx(Button, { ref: ref, suffix: _jsx(ArrowDownSmallIcon, {}), className: clsx(className), contentStyle: { width: 0, flex: 1, textAlign: 'start', ...contentStyle }, ...otherProps, children: children }));
});
//# sourceMappingURL=menu-trigger.js.map