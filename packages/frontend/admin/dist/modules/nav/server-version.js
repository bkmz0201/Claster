import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cssVarV2 } from '@toeverything/theme/v2';
import { useCallback } from 'react';
import { Button } from '../../components/ui/button';
import { useServerConfig } from '../common';
export const ServerVersion = () => {
    const serverConfig = useServerConfig();
    const availableUpgrade = serverConfig?.availableUpgrade;
    const version = serverConfig?.version;
    const handleClick = useCallback(() => {
        if (availableUpgrade) {
            window.open(availableUpgrade.url, '_blank');
        }
    }, [availableUpgrade]);
    if (availableUpgrade) {
        return (_jsx(Button, { variant: "outline", className: "flex items-center justify-center gap-1 text-xs p-2 font-medium w-full overflow-hidden", onClick: handleClick, title: `New Version ${availableUpgrade.version} Available`, children: _jsxs("span", { className: "overflow-hidden text-ellipsis space-x-1", children: [_jsx("span", { children: "New Version" }), _jsx("span", { children: availableUpgrade.version }), _jsx("span", { children: "Available" })] }) }));
    }
    return (_jsxs("div", { className: "inline-flex items-center justify-between pt-2 border-t px-2 text-xs flex-nowrap gap-1", style: {
            color: cssVarV2('text/tertiary'),
        }, children: [_jsx("span", { children: "ServerVersion" }), _jsx("span", { className: "overflow-hidden text-ellipsis whitespace-nowrap", title: version, children: `v${version}` })] }));
};
//# sourceMappingURL=server-version.js.map