import { jsx as _jsx } from "react/jsx-runtime";
import { Menu } from '@affine/component';
import {} from 'react';
export const DropdownMenu = ({ items, trigger, }) => {
    return (_jsx(Menu, { items: items, contentOptions: {
            style: {
                width: '250px',
            },
        }, children: trigger }));
};
//# sourceMappingURL=menu.js.map