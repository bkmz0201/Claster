import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton, Input, Menu, MenuItem } from '@affine/component';
import { MoreHorizontalIcon } from '@blocksuite/icons/rc';
import { cssVar } from '@toeverything/theme';
import { useCallback, useState } from 'react';
import * as styles from '../theme-editor.css';
import { SimpleColorPicker } from './simple-color-picker';
export const ColorCell = ({ value, custom, onValueChange, }) => {
    const [inputValue, setInputValue] = useState(value);
    const onInput = useCallback((color) => {
        onValueChange?.(color);
        setInputValue(color);
    }, [onValueChange]);
    return (_jsxs("div", { className: styles.colorCell, children: [_jsxs("div", { children: [_jsxs("div", { "data-override": !!custom, className: styles.colorCellRow, children: [_jsx("div", { className: styles.colorCellColor, style: { backgroundColor: value } }), _jsx("div", { className: styles.colorCellValue, children: value })] }), _jsxs("div", { "data-empty": !custom, "data-custom": true, className: styles.colorCellRow, children: [_jsx("div", { className: styles.colorCellColor, style: { backgroundColor: custom } }), _jsx("div", { className: styles.colorCellValue, children: custom })] })] }), _jsx(Menu, { contentOptions: { style: { background: cssVar('white') } }, items: _jsxs("ul", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: [_jsx(SimpleColorPicker, { value: inputValue, setValue: onInput, className: styles.colorCellInput }), _jsx(Input, { value: inputValue, onChange: onInput, placeholder: "Input color" }), custom ? (_jsx(MenuItem, { type: "danger", onClick: () => onValueChange?.(), children: "Recover" })) : null] }), children: _jsx(IconButton, { size: "14", icon: _jsx(MoreHorizontalIcon, {}) }) })] }));
};
//# sourceMappingURL=color-cell.js.map