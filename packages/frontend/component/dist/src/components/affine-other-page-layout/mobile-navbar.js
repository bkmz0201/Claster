import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { IconButton } from '@affine/component/ui/button';
import { Menu, MenuItem } from '@affine/component/ui/menu';
import { CloseIcon, PropertyIcon } from '@blocksuite/icons/rc';
import { useState } from 'react';
import * as styles from './index.css';
import { useNavConfig } from './use-nav-config';
export const MobileNavbar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const navConfig = useNavConfig();
    const menuItems = (_jsx(_Fragment, { children: navConfig.map(item => {
            return (_jsx(MenuItem, { onClick: () => {
                    open(item.path, '_blank');
                }, className: styles.menuItem, children: item.title }, item.title));
        }) }));
    return (_jsx("div", { className: styles.hideInWideScreen, children: _jsx(Menu, { items: menuItems, contentOptions: {
                className: styles.menu,
                sideOffset: 20,
            }, rootOptions: {
                open: openMenu,
                onOpenChange: setOpenMenu,
            }, children: _jsx(IconButton, { variant: "plain", size: "24", className: styles.iconButton, children: openMenu ? _jsx(CloseIcon, {}) : _jsx(PropertyIcon, {}) }) }) }));
};
//# sourceMappingURL=mobile-navbar.js.map