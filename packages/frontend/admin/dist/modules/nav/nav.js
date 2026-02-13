import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { buttonVariants } from '@affine/admin/components/ui/button';
import { cn } from '@affine/admin/utils';
import { AccountIcon, SelfhostIcon } from '@blocksuite/icons/rc';
import { cssVarV2 } from '@toeverything/theme/v2';
import { NavLink } from 'react-router-dom';
import { ServerVersion } from './server-version';
import { SettingsItem } from './settings-item';
import { UserDropdown } from './user-dropdown';
const NavItem = ({ icon, label, to, isCollapsed }) => {
    if (isCollapsed) {
        return (_jsx(NavLink, { to: to, className: cn(buttonVariants({
                variant: 'ghost',
                className: 'w-10 h-10',
                size: 'icon',
            })), style: ({ isActive }) => ({
                backgroundColor: isActive
                    ? cssVarV2('selfhost/button/sidebarButton/bg/select')
                    : undefined,
                '&:hover': {
                    backgroundColor: cssVarV2('selfhost/button/sidebarButton/bg/hover'),
                },
            }), children: icon }));
    }
    return (_jsxs(NavLink, { to: to, className: cn(buttonVariants({
            variant: 'ghost',
        }), 'justify-start flex-none text-sm font-medium px-2'), style: ({ isActive }) => ({
            backgroundColor: isActive
                ? cssVarV2('selfhost/button/sidebarButton/bg/select')
                : undefined,
            '&:hover': {
                backgroundColor: cssVarV2('selfhost/button/sidebarButton/bg/hover'),
            },
        }), children: [_jsx("span", { className: "flex items-center p-0.5 mr-2", children: icon }), label] }));
};
export function Nav({ isCollapsed = false }) {
    return (_jsxs("div", { className: cn('flex flex-col gap-4 py-2 justify-between flex-grow h-full overflow-hidden', isCollapsed && 'overflow-visible'), children: [_jsxs("nav", { className: cn('flex flex-1 flex-col gap-1 px-2 flex-grow overflow-hidden', isCollapsed && 'items-center px-0 gap-1 overflow-visible'), children: [_jsx(NavItem, { to: "/admin/accounts", icon: _jsx(AccountIcon, { fontSize: 20 }), label: "Accounts", isCollapsed: isCollapsed }), _jsx(SettingsItem, { isCollapsed: isCollapsed }), _jsx(NavItem, { to: "/admin/about", icon: _jsx(SelfhostIcon, { fontSize: 20 }), label: "About", isCollapsed: isCollapsed })] }), _jsxs("div", { className: cn('flex gap-2 px-2 flex-col overflow-hidden', isCollapsed && 'items-center px-0 gap-1'), children: [_jsx(UserDropdown, { isCollapsed: isCollapsed }), isCollapsed ? null : _jsx(ServerVersion, {})] })] }));
}
//# sourceMappingURL=nav.js.map