import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Switch } from '@affine/component';
import { DoneIcon } from '@blocksuite/icons/rc';
import clsx from 'clsx';
import { IntegrationCardIcon } from './card';
import * as styles from './setting.css';
export const IntegrationSettingHeader = ({ icon, name, desc, action, divider = true, }) => {
    return (_jsxs("header", { className: styles.header, "data-divider": divider, children: [_jsx(IntegrationCardIcon, { className: styles.headerIcon, children: icon }), _jsxs("div", { className: styles.headerContent, children: [_jsx("h1", { className: styles.headerTitle, children: name }), _jsx("p", { className: styles.headerCaption, children: desc })] }), action] }));
};
export const IntegrationSettingItem = ({ name, desc, children, className, ...props }) => {
    return (_jsxs("div", { "data-has-desc": !!desc, className: clsx(styles.settingItem, className), ...props, children: [_jsxs("div", { children: [name && _jsx("h6", { className: styles.settingName, children: name }), desc && _jsx("p", { className: styles.settingDesc, children: desc })] }), _jsx("div", { children: children })] }));
};
export const IntegrationSettingToggle = ({ name, desc, checked, onChange, }) => {
    return (_jsx(IntegrationSettingItem, { name: name, desc: desc, children: _jsx(Switch, { checked: checked, onChange: onChange }) }));
};
export const IntegrationSettingTextRadioGroup = ({ items, checked, onChange, }) => {
    return (_jsx("div", { className: styles.textRadioGroup, children: items.map(item => (_jsxs("div", { onClick: () => onChange(item.value), className: styles.textRadioGroupItem, children: [_jsxs("div", { children: [_jsx("div", { className: styles.textRadioGroupItemName, children: item.name }), item.desc && (_jsx("div", { className: styles.textRadioGroupItemDesc, children: item.desc }))] }), _jsx("div", { className: styles.textRadioGroupItemCheckWrapper, children: checked === item.value ? _jsx(DoneIcon, {}) : null })] }, item.value))) }));
};
//# sourceMappingURL=setting.js.map