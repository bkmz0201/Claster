import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MobileMenu, MobileMenuItem } from '@affine/component';
import { ArrowDownSmallIcon } from '@blocksuite/icons/rc';
import clsx from 'clsx';
import { useCallback, useMemo, useRef, } from 'react';
import * as styles from './dropdown-select.css';
export const SettingDropdownSelect = ({ options = [], value, emitValue = true, onChange, className, menuOptions, native = true, ...attrs }) => {
    const selectedItem = useMemo(() => options.find(opt => opt.value === value), [options, value]);
    if (native) {
        return (_jsx(NativeSettingDropdownSelect, { options: options, value: value, emitValue: emitValue, onChange: onChange, ...attrs }));
    }
    return (_jsx(MobileMenu, { items: options.map(opt => (_jsx(MobileMenuItem, { divide: true, selected: value === opt.value, "data-testid": opt.testId, onSelect: () => emitValue ? onChange?.(opt.value) : onChange?.(opt), style: opt.style, children: opt.label }, opt.value))), ...menuOptions, children: _jsxs("div", { "data-testid": "dropdown-select-trigger", className: clsx(styles.root, className), ...attrs, children: [_jsx("span", { className: styles.label, children: selectedItem?.label ?? '' }), _jsx(ArrowDownSmallIcon, { className: styles.icon })] }) }));
};
export const NativeSettingDropdownSelect = ({ options = [], value, emitValue = true, onChange, className, ...attrs }) => {
    const nativeSelectRef = useRef(null);
    const selectedItem = useMemo(() => options.find(opt => opt.value === value), [options, value]);
    const handleChange = useCallback((e) => {
        const value = e.target.value;
        const opt = options.find(opt => opt.value === value);
        if (emitValue) {
            onChange?.(e.target.value);
        }
        else {
            onChange?.(opt);
        }
    }, [emitValue, onChange, options]);
    return (_jsxs("div", { "data-testid": "dropdown-select-trigger", className: clsx(styles.root, className), ...attrs, children: [_jsx("span", { className: styles.label, children: selectedItem?.label ?? '' }), _jsx(ArrowDownSmallIcon, { className: styles.icon }), _jsx("select", { className: styles.nativeSelect, ref: nativeSelectRef, value: value, onChange: handleChange, "data-testid": "native-dropdown-select-trigger", children: options.map(opt => (_jsx("option", { value: opt.value, children: opt.label }, opt.value))) })] }));
};
//# sourceMappingURL=dropdown-select.js.map