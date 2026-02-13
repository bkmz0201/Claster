import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from '@affine/component';
import { useCallback, useState } from 'react';
import * as styles from './string-cell.css';
export const StringCell = ({ value, custom, onValueChange, }) => {
    const [inputValue, setInputValue] = useState(custom ?? '');
    const onInput = useCallback((color) => {
        onValueChange?.(color || undefined);
        setInputValue(color);
    }, [onValueChange]);
    return (_jsxs("div", { style: { display: 'flex', gap: 8, flexDirection: 'column' }, children: [_jsx("div", { className: styles.row, children: value }), _jsx(Input, { placeholder: "Input value to override", style: { width: '100%' }, value: inputValue, onChange: onInput })] }));
};
//# sourceMappingURL=string-cell.js.map