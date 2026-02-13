import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { buttonVariants } from '@affine/admin/components/ui/button';
import { cn } from '@affine/admin/utils';
import { cssVarV2 } from '@toeverything/theme/v2';
import { NavLink } from 'react-router-dom';
export const NavItem = ({ icon, label, to, isCollapsed }) => {
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
        }), children: [icon, label] }));
};
//# sourceMappingURL=nav-item.js.map