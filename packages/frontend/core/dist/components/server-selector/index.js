import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Menu, MenuItem, MenuTrigger, Tooltip, } from '@affine/component';
import { useMemo } from 'react';
import { triggerStyle } from './style.css';
export const ServerSelector = ({ servers, selectedSeverName, onSelect, contentOptions, }) => {
    const menuItems = useMemo(() => {
        return servers.map(server => (_jsx(Tooltip, { content: `${server.config$.value.serverName} (${server.baseUrl})`, children: _jsxs(MenuItem, { onSelect: () => onSelect(server), children: [server.config$.value.serverName, " (", server.baseUrl, ")"] }, server.id) }, server.id)));
    }, [servers, onSelect]);
    return (_jsx(Menu, { items: menuItems, contentOptions: {
            ...contentOptions,
            style: {
                ...contentOptions?.style,
                width: 'var(--radix-dropdown-menu-trigger-width)',
            },
        }, children: _jsx(MenuTrigger, { tooltip: selectedSeverName, className: triggerStyle, children: selectedSeverName }) }));
};
//# sourceMappingURL=index.js.map