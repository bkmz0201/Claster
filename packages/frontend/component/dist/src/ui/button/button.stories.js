import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AfFiNeIcon, ArrowRightBigIcon, FolderIcon, } from '@blocksuite/icons/rc';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { Switch } from '../switch';
import { Button } from './button';
import * as styles from './button.stories.css';
export default {
    title: 'UI/Button',
    component: Button,
};
// const Template: StoryFn<ButtonProps> = args => <Button {...args} />;
const types = [
    'primary',
    'secondary',
    'plain',
    'error',
    'success',
];
const sizes = ['default', 'large', 'extraLarge'];
const Groups = ({ children, ...props }) => {
    return (_jsxs("table", { className: styles.table, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("td", { children: "Type/Size" }), sizes.map(size => (_jsx("td", { children: size }, size)))] }) }), _jsx("tbody", { children: types.map(type => (_jsxs("tr", { children: [_jsx("td", { children: type }), sizes.map(size => (_jsx("td", { children: _jsx(Button, { variant: type, size: size, ...props, children: children ?? `${size} - ${type}` }) }, size)))] }, type))) })] }));
};
export const Default = () => _jsx(Groups, {});
export const WithIcon = () => {
    return _jsx(Groups, { prefix: _jsx(FolderIcon, {}), suffix: _jsx("span", { children: "\uD83D\uDE80" }) });
};
export const Loading = () => {
    const [loading, setLoading] = useState(false);
    const toggleLoading = useCallback(() => setLoading(v => !v), []);
    useEffect(() => {
        setInterval(toggleLoading, 1000);
    }, [toggleLoading]);
    return _jsx(Groups, { loading: loading, prefix: _jsx(FolderIcon, {}) });
};
export const OverrideViaClassName = () => {
    const [overrideBg, setOverrideBg] = useState(false);
    const [overrideTextColor, setOverrideTextColor] = useState(false);
    const [overrideBorder, setOverrideBorder] = useState(false);
    const [overrideFontSize, setOverrideFontSize] = useState(false);
    const [overridePrefixSize, setOverridePrefixSize] = useState(false);
    const [overrideSuffixSize, setOverrideSuffixSize] = useState(false);
    const [overridePrefixColor, setOverridePrefixColor] = useState(false);
    const [overrideSuffixColor, setOverrideSuffixColor] = useState(false);
    return (_jsxs("div", { children: [_jsxs("div", { className: styles.settings, children: [_jsxs("section", { children: [_jsx("span", { children: "Override background color" }), _jsx(Switch, { checked: overrideBg, onChange: setOverrideBg })] }), _jsxs("section", { children: [_jsx("span", { children: "Override text color" }), _jsx(Switch, { checked: overrideTextColor, onChange: setOverrideTextColor })] }), _jsxs("section", { children: [_jsx("span", { children: "Override border color" }), _jsx(Switch, { checked: overrideBorder, onChange: setOverrideBorder })] }), _jsxs("section", { children: [_jsx("span", { children: "Override font size" }), _jsx(Switch, { checked: overrideFontSize, onChange: setOverrideFontSize })] }), _jsxs("section", { children: [_jsx("span", { children: "Override prefix size" }), _jsx(Switch, { checked: overridePrefixSize, onChange: setOverridePrefixSize })] }), _jsxs("section", { children: [_jsx("span", { children: "Override suffix size" }), _jsx(Switch, { checked: overrideSuffixSize, onChange: setOverrideSuffixSize })] }), _jsxs("section", { children: [_jsx("span", { children: "Override prefix color" }), _jsx(Switch, { checked: overridePrefixColor, onChange: setOverridePrefixColor })] }), _jsxs("section", { children: [_jsx("span", { children: "Override suffix color" }), _jsx(Switch, { checked: overrideSuffixColor, onChange: setOverrideSuffixColor })] })] }), _jsx(Groups, { prefix: _jsx(FolderIcon, {}), suffix: _jsx(ArrowRightBigIcon, {}), className: clsx({
                    [styles.overrideBackground]: overrideBg,
                    [styles.overrideTextColor]: overrideTextColor,
                    [styles.overrideBorder]: overrideBorder,
                    [styles.overrideFontSize]: overrideFontSize,
                }), prefixClassName: clsx({
                    [styles.overrideIconSize]: overridePrefixSize,
                    [styles.overrideIconColor]: overridePrefixColor,
                }), suffixClassName: clsx({
                    [styles.overrideIconSize]: overrideSuffixSize,
                    [styles.overrideIconColor]: overrideSuffixColor,
                }) })] }));
};
export const FixedWidth = () => {
    const widths = [60, 100, 120, 160, 180];
    return (_jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: 4 }, children: widths.map(width => (_jsx(Button, { prefix: _jsx(AfFiNeIcon, {}), style: { width }, children: "This is a width fixed button" }, width))) }));
};
export const Disabled = () => {
    return _jsx(Groups, { disabled: true });
};
//# sourceMappingURL=button.stories.js.map