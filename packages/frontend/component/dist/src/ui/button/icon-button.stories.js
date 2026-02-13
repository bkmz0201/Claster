import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AfFiNeIcon } from '@blocksuite/icons/rc';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { Switch } from '../switch';
import * as styles from './button.stories.css';
import { IconButton } from './icon-button';
export default {
    title: 'UI/IconButton',
    component: IconButton,
};
const types = ['plain', 'solid', 'danger'];
const sizes = ['12', '14', '16', '20', '24'];
const Groups = ({ children, ...props }) => {
    return (_jsxs("table", { className: styles.table, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("td", { children: "Type/Size" }), sizes.map(size => (_jsx("td", { children: size }, size)))] }) }), _jsx("tbody", { children: types.map(type => (_jsxs("tr", { children: [_jsx("td", { children: type }), sizes.map(size => (_jsx("td", { children: _jsx(IconButton, { variant: type, size: size, ...props, children: children ?? _jsx(AfFiNeIcon, {}) }) }, size)))] }, type))) })] }));
};
export const Default = () => _jsx(Groups, {});
export const Loading = () => {
    const [loading, setLoading] = useState(false);
    const toggleLoading = useCallback(() => setLoading(v => !v), []);
    useEffect(() => {
        setInterval(toggleLoading, 1000);
    }, [toggleLoading]);
    return _jsx(Groups, { loading: loading });
};
export const OverrideViaClassName = () => {
    const [overrideBg, setOverrideBg] = useState(false);
    const [overrideBorder, setOverrideBorder] = useState(false);
    const [overridePrefixColor, setOverridePrefixColor] = useState(false);
    return (_jsxs("div", { children: [_jsxs("div", { className: styles.settings, children: [_jsxs("section", { children: [_jsx("span", { children: "Override background color" }), _jsx(Switch, { checked: overrideBg, onChange: setOverrideBg })] }), _jsxs("section", { children: [_jsx("span", { children: "Override border color" }), _jsx(Switch, { checked: overrideBorder, onChange: setOverrideBorder })] }), _jsxs("section", { children: [_jsx("span", { children: "Override icon color" }), _jsx(Switch, { checked: overridePrefixColor, onChange: setOverridePrefixColor })] })] }), _jsx(Groups, { className: clsx({
                    [styles.overrideBackground]: overrideBg,
                    [styles.overrideBorder]: overrideBorder,
                }), iconClassName: clsx({
                    [styles.overrideIconColor]: overridePrefixColor,
                }) })] }));
};
export const CustomSize = () => {
    const sizes = [
        [13, 2],
        [15, 2],
        [17, 2],
        [19, 2],
        [21, 3],
        [23, 3],
        [25, 3],
        [27, 3],
        [29, 4],
        [31, 4],
        [33, 4],
        [35, 4],
    ];
    return types.map(type => {
        return (_jsx("div", { children: _jsx("div", { style: { display: 'flex', gap: 4, alignItems: 'center' }, children: sizes.map(size => (_jsxs("div", { style: {
                        fontSize: 10,
                        textAlign: 'center',
                        color: 'rgba(100, 100, 100, 0.5)',
                    }, children: [_jsx(IconButton, { size: size[0], style: { padding: size[1] }, variant: type, children: _jsx(AfFiNeIcon, {}) }), _jsxs("div", { style: { marginTop: 8 }, children: ["Size: ", size[0], "px"] }), _jsxs("div", { style: { marginTop: 2 }, children: ["Padding: ", size[1], "px"] })] }, size[0]))) }) }, type));
    });
};
export const Disabled = () => _jsx(Groups, { disabled: true });
//# sourceMappingURL=icon-button.stories.js.map