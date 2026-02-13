import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { InformationIcon } from '@blocksuite/icons/rc';
import { useCallback, useState } from 'react';
import { Button } from '../button';
import { Tooltip } from '../tooltip';
import { Menu, MenuItem, MenuSeparator, MenuSub } from './index';
export default {
    title: 'UI/Menu',
    component: Menu,
};
const Template = args => (_jsx(Menu, { ...args, contentOptions: {
        style: {
            width: '500px',
        },
    }, children: _jsx(Button, { children: "menu trigger" }) }));
const items = [
    {
        label: 'default menu item 1',
    },
    {
        label: 'menu item with icon',
        prefixIcon: _jsx(InformationIcon, {}),
    },
    {
        label: (_jsx(Tooltip, { align: "start", content: "Write, Draw, and Plan All at Once Notion Open Source Alternative One\n          hyper-fused platform for wildly creative minds", children: _jsx("span", { children: "Write, Draw, and Plan All at Once Notion Open Source Alternative One hyper-fused platform for wildly creative minds" }) })),
        block: true,
    },
    {
        label: 'default disabled menu item',
        disabled: true,
    },
    {
        label: 'danger menu item',
        type: 'danger',
        block: true,
        prefixIcon: _jsx(InformationIcon, {}),
    },
    {
        label: 'warning menu item',
        type: 'warning',
        divider: true,
    },
    {
        label: 'menu item with sub menu',
        subItems: [
            {
                label: 'sub menu item 1',
            },
            {
                label: 'sub menu item 1',
            },
        ],
    },
    {
        label: 'menu item with deep sub menu',
        subItems: [
            {
                label: 'sub menu item 1',
            },
            {
                label: 'sub menu with sub',
                subItems: [
                    {
                        label: 'sub menu item 2-1',
                    },
                    {
                        label: 'sub menu item 2-2',
                    },
                    {
                        label: 'sub menu item 2-3',
                    },
                ],
            },
        ],
    },
];
export const Default = Template.bind(undefined);
const ItemRender = ({ label, divider, subItems, ...otherProps }) => {
    const onSelect = useCallback(() => {
        console.log('value', label);
    }, [label]);
    if (subItems) {
        return (_jsxs(_Fragment, { children: [_jsx(MenuSub, { items: subItems.map((props, i) => (_jsx(ItemRender, { ...props }, i))), triggerOptions: otherProps, children: label }), divider ? _jsx(MenuSeparator, {}) : null] }));
    }
    return (_jsxs(_Fragment, { children: [_jsx(MenuItem, { onSelect: onSelect, ...otherProps, children: label }), divider ? _jsx(MenuSeparator, {}) : null] }));
};
Default.args = {
    items: items.map((props, i) => {
        return _jsx(ItemRender, { ...props }, i);
    }),
};
const selectList = [
    { name: 'AFFiNE', value: '1' },
    { name: 'blocksuite', value: '2' },
    { name: 'octobase', value: '3' },
    { name: 'virgo', value: '4' },
];
const SelectItems = ({ selectedValue, onSelect, }) => {
    return selectList.map(({ name, value }) => (_jsx(MenuItem, { selected: selectedValue === value, onSelect: () => onSelect(value), children: name }, value)));
};
const AsSelectTemplate = () => {
    const [value, setValue] = useState('1');
    const name = selectList.find(item => item.value === value)?.name;
    return (_jsx(Menu, { items: _jsx(SelectItems, { selectedValue: value, onSelect: setValue }), children: _jsxs(Button, { children: ["selected: ", name] }) }));
};
export const AsSelect = AsSelectTemplate.bind({});
//# sourceMappingURL=menu.stories.js.map