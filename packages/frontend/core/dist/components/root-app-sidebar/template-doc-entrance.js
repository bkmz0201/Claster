import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Menu, MenuSeparator } from '@affine/component';
import { MenuItem as SidebarMenuItem } from '@affine/core/modules/app-sidebar/views';
import { TemplateListMenuAdd, TemplateListMenuContentScrollable, } from '@affine/core/modules/template-doc/view/template-list-menu';
import { useI18n } from '@affine/i18n';
import track from '@affine/track';
import { TemplateIcon } from '@blocksuite/icons/rc';
import { useCallback, useState } from 'react';
export const TemplateDocEntrance = () => {
    const t = useI18n();
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = useCallback(() => {
        setMenuOpen(prev => !prev);
    }, []);
    const onMenuOpenChange = useCallback((open) => {
        if (open)
            track.$.sidebar.template.openTemplateListMenu();
        setMenuOpen(open);
    }, []);
    return (_jsx(SidebarMenuItem, { "data-testid": "sidebar-template-doc-entrance", icon: _jsx(TemplateIcon, {}), onClick: toggleMenu, children: _jsx(Menu, { rootOptions: { open: menuOpen, onOpenChange: onMenuOpenChange }, contentOptions: {
                side: 'right',
                align: 'end',
                alignOffset: -4,
                sideOffset: 16,
                style: { width: 280 },
            }, items: _jsx(TemplateListMenuContentScrollable, { asLink: true, suffixItems: _jsxs(_Fragment, { children: [_jsx(MenuSeparator, {}), _jsx(TemplateListMenuAdd, {})] }) }), children: _jsx("span", { children: t['Template']() }) }) }));
};
//# sourceMappingURL=template-doc-entrance.js.map