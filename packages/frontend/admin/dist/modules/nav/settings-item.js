import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from '@affine/admin/components/ui/accordion';
import { buttonVariants } from '@affine/admin/components/ui/button';
import { cn } from '@affine/admin/utils';
import { SettingsIcon } from '@blocksuite/icons/rc';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { cssVarV2 } from '@toeverything/theme/v2';
import { NavLink } from 'react-router-dom';
import { KNOWN_CONFIG_GROUPS, UNKNOWN_CONFIG_GROUPS } from '../settings/config';
import { NormalSubItem } from './collapsible-item';
import { useNav } from './context';
export const SettingsItem = ({ isCollapsed }) => {
    const { setCurrentModule } = useNav();
    if (isCollapsed) {
        return (_jsxs(NavigationMenuPrimitive.Root, { className: "flex-none relative", orientation: "vertical", children: [_jsx(NavigationMenuPrimitive.List, { children: _jsxs(NavigationMenuPrimitive.Item, { children: [_jsx(NavigationMenuPrimitive.Trigger, { className: "[&>svg]:hidden m-0 p-0", children: _jsx(NavLink, { to: '/admin/settings', className: cn(buttonVariants({
                                        variant: 'ghost',
                                        className: 'w-10 h-10',
                                        size: 'icon',
                                    })), style: ({ isActive }) => ({
                                        backgroundColor: isActive
                                            ? cssVarV2('selfhost/button/sidebarButton/bg/select')
                                            : undefined,
                                    }), children: _jsx(SettingsIcon, { fontSize: 20 }) }) }), _jsx(NavigationMenuPrimitive.Content, { children: _jsxs("ul", { className: "border rounded-lg w-full flex flex-col p-1 min-w-[160px] max-h-[200px] overflow-y-auto", style: {
                                        backgroundColor: cssVarV2('layer/background/overlayPanel'),
                                        borderColor: cssVarV2('layer/insideBorder/blackBorder'),
                                    }, children: [KNOWN_CONFIG_GROUPS.map(group => (_jsx("li", { className: "flex", children: _jsx(NavLink, { to: `/admin/settings/${group.module}`, className: cn(buttonVariants({
                                                    variant: 'ghost',
                                                    className: 'p-2 rounded-[6px] text-[14px] w-full justify-start font-normal',
                                                })), style: ({ isActive }) => ({
                                                    backgroundColor: isActive
                                                        ? cssVarV2('selfhost/button/sidebarButton/bg/select')
                                                        : undefined,
                                                }), onClick: () => setCurrentModule?.(group.module), children: group.name }) }, group.module))), UNKNOWN_CONFIG_GROUPS.map(group => (_jsx("li", { className: "flex", children: _jsx(NavLink, { to: `/admin/settings/${group.module}`, className: cn(buttonVariants({
                                                    variant: 'ghost',
                                                    className: 'p-2 rounded-[6px] text-[14px] w-full justify-start font-normal',
                                                })), style: ({ isActive }) => ({
                                                    backgroundColor: isActive
                                                        ? cssVarV2('selfhost/button/sidebarButton/bg/select')
                                                        : undefined,
                                                }), onClick: () => setCurrentModule?.(group.module), children: group.name }) }, group.module)))] }) })] }) }), _jsx(NavigationMenuPrimitive.Viewport, { className: "absolute z-10 left-11 top-0" })] }));
    }
    return (_jsx(Accordion, { type: "multiple", className: "w-full overflow-hidden", children: _jsxs(AccordionItem, { value: "item-1", className: "border-b-0 h-full flex flex-col gap-1 w-full", children: [_jsx(NavLink, { to: '/admin/settings', className: cn(buttonVariants({
                        variant: 'ghost',
                    }), 'justify-start flex-none w-full px-2'), style: ({ isActive }) => ({
                        backgroundColor: isActive
                            ? cssVarV2('selfhost/button/sidebarButton/bg/select')
                            : undefined,
                    }), children: _jsx(AccordionTrigger, { className: 'flex items-center justify-between w-full [&[data-state=closed]>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360', children: _jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "flex items-center p-0.5 mr-2", children: _jsx(SettingsIcon, { fontSize: 20 }) }), _jsx("span", { children: "Settings" })] }) }) }), _jsx(AccordionContent, { className: "h-full overflow-hidden w-full pb-0", children: _jsxs(ScrollAreaPrimitive.Root, { className: cn('relative overflow-hidden w-full h-full'), children: [_jsxs(ScrollAreaPrimitive.Viewport, { className: "h-full w-full rounded-[inherit] [&>div]:!block", children: [KNOWN_CONFIG_GROUPS.map(group => (_jsx(NormalSubItem, { module: group.module, title: group.name, changeModule: setCurrentModule }, group.module))), _jsx(Accordion, { type: "multiple", className: "w-full", children: _jsxs(AccordionItem, { value: "item-1", className: "border-b-0", children: [_jsx(AccordionTrigger, { className: "ml-8 py-2 px-2 rounded [&[data-state=closed]>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360", children: "Experimental" }), _jsx(AccordionContent, { className: "flex flex-col gap-1 py-1", children: UNKNOWN_CONFIG_GROUPS.map(group => (_jsx(NormalSubItem, { module: group.module, title: group.name, changeModule: setCurrentModule }, group.module))) })] }) })] }), _jsx(ScrollAreaPrimitive.ScrollAreaScrollbar, { className: cn('flex touch-none select-none transition-colors', 'h-full w-2.5 border-l border-l-transparent p-[1px]'), children: _jsx(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" }) }), _jsx(ScrollAreaPrimitive.Corner, {})] }) })] }) }));
};
//# sourceMappingURL=settings-item.js.map