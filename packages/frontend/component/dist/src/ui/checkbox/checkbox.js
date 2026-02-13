import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// components/checkbox.tsx
import clsx from 'clsx';
import { useCallback, useEffect, useRef } from 'react';
import * as icons from './icons';
import * as styles from './index.css';
export const Checkbox = ({ checked, onChange, indeterminate, disabled, animation, name, label, inputClassName, labelClassName, className, ...otherProps }) => {
    const inputRef = useRef(null);
    const handleChange = useCallback((event) => {
        const newChecked = event.target.checked;
        onChange?.(event, newChecked);
        const inputElement = inputRef.current;
        if (newChecked && inputElement && animation) {
            playCheckAnimation(inputElement.parentElement).catch(console.error);
        }
    }, [onChange, animation]);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.indeterminate = !!indeterminate;
        }
    }, [indeterminate]);
    const icon = indeterminate
        ? icons.indeterminate
        : checked
            ? icons.checked
            : icons.unchecked;
    return (_jsxs("div", { className: clsx(styles.root, className, disabled && styles.disabled), role: "checkbox", ...otherProps, children: [icon, _jsx("input", { ref: inputRef, "data-testid": "affine-checkbox", className: clsx(styles.input, inputClassName), type: "checkbox", value: checked ? 'on' : 'off', id: name, name: name, checked: checked, onChange: handleChange }), label ? (_jsx("label", { htmlFor: name, className: clsx(labelClassName), children: label })) : null] }));
};
export const playCheckAnimation = async (refElement) => {
    const sparkingEl = document.createElement('div');
    sparkingEl.classList.add('affine-check-animation');
    sparkingEl.style.cssText = `
    position: absolute;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    font-size: inherit;
  `;
    refElement.append(sparkingEl);
    await sparkingEl.animate([
        {
            boxShadow: '0 -18px 0 -8px #1e96eb, 16px -8px 0 -8px #1e96eb, 16px 8px 0 -8px #1e96eb, 0 18px 0 -8px #1e96eb, -16px 8px 0 -8px #1e96eb, -16px -8px 0 -8px #1e96eb',
        },
    ], { duration: 240, easing: 'ease', fill: 'forwards' }).finished;
    await sparkingEl.animate([
        {
            boxShadow: '0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent, 32px 16px 0 -10px transparent, 0 36px 0 -10px transparent, -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent',
        },
    ], { duration: 360, easing: 'ease', fill: 'forwards' }).finished;
    sparkingEl.remove();
};
//# sourceMappingURL=checkbox.js.map