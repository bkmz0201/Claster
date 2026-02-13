import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Menu, MenuItem } from '@affine/component';
import { ServersService } from '@affine/core/modules/cloud';
import { useI18n } from '@affine/i18n';
import { ArrowDownSmallIcon, CloudWorkspaceIcon, DoneIcon, LocalWorkspaceIcon, SelfhostIcon, } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import { useCallback, useMemo, useState, } from 'react';
import * as styles from './server-selector.css';
export const ServerSelector = ({ selectedId, onChange, placeholder, className, ...props }) => {
    const t = useI18n();
    const [open, setOpen] = useState(false);
    const serversService = useService(ServersService);
    const servers = useLiveData(serversService.servers$);
    const selectedServer = useMemo(() => {
        return servers.find(s => s.id === selectedId);
    }, [selectedId, servers]);
    const serverName = useLiveData(selectedServer?.config$.selector(c => c.serverName));
    const selectedServerName = selectedId === 'local'
        ? t['com.affine.workspaceList.workspaceListType.local']()
        : serverName;
    return (_jsx(Menu, { rootOptions: {
            open,
            onOpenChange: setOpen,
        }, contentOptions: {
            style: {
                maxWidth: 432,
                width: 'calc(100dvw - 68px)',
            },
        }, items: _jsxs("ul", { className: styles.list, "data-testid": "server-selector-list", children: [_jsx(LocalSelectorItem, { onSelect: onChange, active: selectedId === 'local' }), servers.map(server => (_jsx(ServerSelectorItem, { server: server, onSelect: onChange, active: selectedId === server.id }, server.id)))] }), children: _jsxs("div", { "data-testid": "server-selector-trigger", className: clsx(styles.trigger, className), ...props, children: [selectedServerName ?? placeholder, _jsx(ArrowDownSmallIcon, { className: clsx(styles.arrow, { open }) })] }) }));
};
const LocalSelectorItem = ({ onSelect, active, }) => {
    const t = useI18n();
    const handleSelect = useCallback(() => {
        onSelect?.('local');
    }, [onSelect]);
    return (_jsx(MenuItem, { "data-testid": "local", className: styles.item, prefixIcon: _jsx(LocalWorkspaceIcon, {}), onClick: handleSelect, suffixIcon: active ? _jsx(DoneIcon, { className: styles.done }) : null, children: t['com.affine.workspaceList.workspaceListType.local']() }));
};
const ServerSelectorItem = ({ server, onSelect, active, }) => {
    const name = useLiveData(server.config$.selector(c => c.serverName));
    const Icon = server.id === 'affine-cloud' ? CloudWorkspaceIcon : SelfhostIcon;
    const handleSelect = useCallback(() => {
        onSelect?.(server.id);
    }, [onSelect, server.id]);
    return (_jsx(MenuItem, { "data-testid": server.id, className: styles.item, prefixIcon: _jsx(Icon, {}), onClick: handleSelect, suffixIcon: active ? _jsx(DoneIcon, { className: styles.done }) : null, children: name }));
};
//# sourceMappingURL=server-selector.js.map