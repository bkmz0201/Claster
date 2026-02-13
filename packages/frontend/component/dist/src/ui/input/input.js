import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import { forwardRef } from 'react';
import { RowInput } from './row-input';
import { input, inputWrapper, mobileInputWrapper } from './style.css';
export const Input = forwardRef(function Input({ disabled, onChange: propsOnChange, noBorder = false, className, status = 'default', style = {}, inputStyle = {}, size = 'default', preFix, endFix, onEnter, onKeyDown, onBlur, autoFocus, autoSelect, ...otherProps }, upstreamRef) {
    return (_jsxs("div", { className: clsx(BUILD_CONFIG.isMobileEdition ? mobileInputWrapper : inputWrapper, className, {
            // status
            disabled: disabled,
            'no-border': noBorder,
            // color
            error: status === 'error',
            success: status === 'success',
            warning: status === 'warning',
            default: status === 'default',
            // size
            large: size === 'large',
            'extra-large': size === 'extraLarge',
        }), style: {
            ...style,
        }, children: [preFix, _jsx(RowInput, { className: clsx(input, {
                    large: size === 'large',
                    'extra-large': size === 'extraLarge',
                }), ref: upstreamRef, disabled: disabled, style: inputStyle, onChange: propsOnChange, onEnter: onEnter, onKeyDown: onKeyDown, onBlur: onBlur, autoFocus: autoFocus, autoSelect: autoSelect, ...otherProps }), endFix] }));
});
//# sourceMappingURL=input.js.map