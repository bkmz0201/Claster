import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cssVar } from '@toeverything/theme';
import clsx from 'clsx';
import {} from 'react';
import { getCommand } from '../../utils/keyboard-mapping';
import * as styles from './styles.css';
const TooltipShortcut = ({ shortcut, className, }) => {
    const commands = (Array.isArray(shortcut) ? shortcut : [shortcut])
        .map(cmd => cmd.trim())
        .map(cmd => getCommand(cmd));
    return (_jsx("div", { className: clsx(styles.shortcut, className), children: commands.map((cmd, index) => (_jsx("div", { className: styles.command, "data-length": cmd.length, children: cmd }, `${index}-${cmd}`))) }));
};
export const Tooltip = ({ children, content, side = 'top', align = 'center', shortcut, options, rootOptions, portalOptions, shortcutClassName, }) => {
    if (!content) {
        return children;
    }
    const { className, ...contentOptions } = options || {};
    const { style: contentStyle, ...restContentOptions } = contentOptions;
    return (_jsx(TooltipPrimitive.Provider, { children: _jsxs(TooltipPrimitive.Root, { delayDuration: 500, ...rootOptions, children: [_jsx(TooltipPrimitive.Trigger, { asChild: true, children: children }), _jsx(TooltipPrimitive.Portal, { ...portalOptions, children: _jsx(TooltipPrimitive.Content, { className: clsx(styles.tooltipContent, className), side: side, align: align, sideOffset: 5, style: { zIndex: cssVar('zIndexPopover'), ...contentStyle }, ...restContentOptions, children: shortcut ? (_jsxs("div", { className: styles.withShortcut, children: [_jsx("div", { className: styles.withShortcutContent, children: content }), _jsx(TooltipShortcut, { shortcut: shortcut, className: shortcutClassName })] })) : (content) }) })] }) }));
};
//# sourceMappingURL=tooltip.js.map