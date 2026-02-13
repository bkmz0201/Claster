import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
import { useId } from 'react';
import * as styles from './simple-color-picker.css';
export const SimpleColorPicker = ({ value, setValue, className, ...attrs }) => {
    const id = useId();
    return (_jsx("label", { htmlFor: id, children: _jsx("div", { style: { backgroundColor: value }, className: clsx(styles.wrapper, className), ...attrs, children: _jsx("input", { className: styles.input, type: "color", name: id, id: id, value: value, onChange: e => setValue(e.target.value) }) }) }));
};
//# sourceMappingURL=simple-color-picker.js.map