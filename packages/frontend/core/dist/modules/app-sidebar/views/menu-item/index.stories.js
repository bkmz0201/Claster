import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SettingsIcon } from '@blocksuite/icons/rc';
import { useState } from 'react';
import { MenuItem, MenuLinkItem } from './index';
export default {
    title: 'Components/AppSidebar/MenuItem',
    component: MenuItem,
};
export const Default = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (_jsxs("main", { style: { width: '240px' }, children: [_jsx(MenuItem, { icon: _jsx(SettingsIcon, {}), onClick: () => alert('opened'), children: "Normal Item" }), _jsx(MenuLinkItem, { icon: _jsx(SettingsIcon, {}), to: "/test", onClick: () => alert('opened'), children: "Normal Link Item" }), _jsx(MenuLinkItem, { active: true, icon: _jsx(SettingsIcon, {}), to: "/test", onClick: () => alert('opened'), children: "Primary Item" }), _jsx(MenuItem, { collapsed: collapsed, onCollapsedChange: setCollapsed, icon: _jsx(SettingsIcon, {}), onClick: () => alert('opened'), children: "Collapsible Item" })] }));
};
//# sourceMappingURL=index.stories.js.map