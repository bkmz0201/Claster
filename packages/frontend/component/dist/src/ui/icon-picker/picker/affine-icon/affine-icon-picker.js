import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import keywords from '@blocksuite/icons/keywords/en.json';
import * as allIcons from '@blocksuite/icons/rc';
import { cssVarV2 } from '@toeverything/theme/v2';
import { startTransition, useCallback, useEffect, useState } from 'react';
import { IconButton } from '../../../button';
import Input from '../../../input';
import { Menu } from '../../../menu';
import { Scrollable } from '../../../scrollbar';
import { AffineIconRenderer } from '../../renderer/affine-icon';
import * as pickerStyles from '../picker.css';
import * as styles from './affine-icon-picker.css';
const icons = keywords['Emoji Panel'];
const colorList = [
    cssVarV2.block.callout.icon.red,
    cssVarV2.block.callout.icon.orange,
    cssVarV2.block.callout.icon.yellow,
    cssVarV2.block.callout.icon.green,
    cssVarV2.block.callout.icon.teal,
    cssVarV2.block.callout.icon.blue,
    cssVarV2.block.callout.icon.purple,
    cssVarV2.block.callout.icon.magenta,
    cssVarV2.block.callout.icon.grey,
];
const useRecentIcons = () => {
    const [recentIcons, setRecentIcons] = useState([]);
    useEffect(() => {
        const recentIcons = localStorage.getItem('recentIcons');
        setRecentIcons(recentIcons ? recentIcons.split(',') : []);
    }, []);
    const add = useCallback((icon) => {
        setRecentIcons(prevRecentIcons => {
            const newRecentIcons = [
                icon,
                ...prevRecentIcons.filter(e => e !== icon),
            ].slice(0, 10);
            localStorage.setItem('recentIcons', newRecentIcons.join(','));
            return newRecentIcons;
        });
    }, []);
    return {
        recentIcons,
        add,
    };
};
export const AffineIconPicker = ({ onSelect, }) => {
    const [filteredIcons, setFilteredIcons] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [color, setColor] = useState(cssVarV2.block.callout.icon.blue);
    const { recentIcons, add: addRecentIcon } = useRecentIcons();
    useEffect(() => {
        startTransition(() => {
            if (!keyword) {
                setFilteredIcons(icons);
                return;
            }
            setFilteredIcons(icons.filter(icon => icon.keywords.some(kw => kw.includes(keyword.toLowerCase()))));
        });
    }, [keyword]);
    const handleIconSelect = useCallback((icon) => {
        addRecentIcon(icon);
        onSelect?.(icon, color);
    }, [addRecentIcon, onSelect, color]);
    return (_jsxs("div", { className: pickerStyles.root, children: [_jsxs("header", { className: pickerStyles.searchContainer, children: [_jsx(Input, { value: keyword, onChange: setKeyword, className: pickerStyles.searchInput, preFix: _jsx("div", { style: { marginLeft: 10, lineHeight: 0 }, children: _jsx(allIcons.SearchIcon, { style: { color: cssVarV2.icon.primary, fontSize: 16 } }) }), placeholder: "Filter..." }), _jsx(Menu, { contentOptions: {
                            side: 'bottom',
                            align: 'center',
                            sideOffset: 4,
                        }, items: _jsx("div", { className: styles.colorList, children: colorList.map(color => (_jsx(IconButton, { size: 18, style: { padding: 2 }, icon: _jsx("div", { className: styles.colorDot, style: { background: color } }), onClick: () => setColor(color) }, color))) }), children: _jsx(IconButton, { size: 18, style: {
                                width: 32,
                                height: 32,
                                border: `1px solid ${cssVarV2.layer.insideBorder.border}`,
                            }, icon: _jsx("div", { className: styles.colorDot, style: { background: color } }) }) })] }), _jsxs(Scrollable.Root, { className: pickerStyles.iconScrollRoot, children: [_jsxs(Scrollable.Viewport, { className: pickerStyles.scrollViewport, children: [recentIcons.length ? (_jsxs("div", { className: pickerStyles.group, children: [_jsx("div", { className: pickerStyles.groupName, "data-group-name": "Recent", children: "Recent" }), _jsx("div", { className: pickerStyles.groupGrid, children: recentIcons.map(iconName => (_jsx(IconButton, { size: 24, style: { padding: 4 }, icon: _jsx(AffineIconRenderer, { style: { color }, name: iconName }), onClick: () => handleIconSelect(iconName) }, iconName))) })] })) : null, _jsxs("div", { className: pickerStyles.group, children: [_jsx("div", { className: pickerStyles.groupName, "data-group-name": "Recent", children: "Icons" }), _jsx("div", { className: pickerStyles.groupGrid, children: filteredIcons.map(icon => {
                                            return (_jsx(IconButton, { size: 24, style: { padding: 4 }, icon: _jsx(AffineIconRenderer, { style: { color }, name: icon.name }), onClick: () => handleIconSelect(icon.name) }, icon.name));
                                        }) })] })] }), _jsx(Scrollable.Scrollbar, {})] })] }));
};
//# sourceMappingURL=affine-icon-picker.js.map