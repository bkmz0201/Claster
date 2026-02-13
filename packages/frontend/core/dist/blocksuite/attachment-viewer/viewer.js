import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton, Menu, MenuItem } from '@affine/component';
import { 
//EditIcon,
LocalDataIcon, MoreHorizontalIcon, ZoomDownIcon, ZoomUpIcon, } from '@blocksuite/icons/rc';
import clsx from 'clsx';
import { useState } from 'react';
import { download } from './utils';
import * as styles from './viewer.css';
const items = [
    /*
    {
      name: 'Rename',
      icon: <EditIcon />,
      action(_model: AttachmentBlockModel) {},
    },
    */
    {
        name: 'Download',
        icon: _jsx(LocalDataIcon, {}),
        action: download,
    },
];
export const MenuItems = ({ model }) => items.map(({ name, icon, action }) => (_jsx(MenuItem, { onClick: () => {
        action(model).catch(console.error);
    }, prefixIcon: icon, children: name }, name)));
export const Titlebar = ({ model, name, ext, size, zoom = 100, }) => {
    const [openMenu, setOpenMenu] = useState(false);
    return (_jsxs("div", { className: styles.titlebar, children: [_jsxs("div", { className: styles.titlebarChild, children: [_jsxs("div", { className: styles.titlebarName, children: [_jsx("div", { children: name }), _jsxs("span", { children: [".", ext] })] }), _jsx("div", { children: size }), _jsx(IconButton, { icon: _jsx(LocalDataIcon, {}), onClick: () => {
                            download(model).catch(console.error);
                        } }), _jsx(Menu, { items: _jsx(MenuItems, { model: model }), rootOptions: {
                            open: openMenu,
                            onOpenChange: setOpenMenu,
                        }, contentOptions: {
                            side: 'bottom',
                            align: 'center',
                            avoidCollisions: false,
                        }, children: _jsx(IconButton, { icon: _jsx(MoreHorizontalIcon, {}) }) })] }), _jsxs("div", { className: clsx([
                    styles.titlebarChild,
                    'zoom',
                    {
                        show: false,
                    },
                ]), children: [_jsx(IconButton, { icon: _jsx(ZoomDownIcon, {}) }), _jsxs("div", { children: [zoom, "%"] }), _jsx(IconButton, { icon: _jsx(ZoomUpIcon, {}) })] })] }));
};
//# sourceMappingURL=viewer.js.map