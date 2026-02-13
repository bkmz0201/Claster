import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { useAutoFocus, useAutoSelect } from '../../hooks';
import { useDebounceCallback } from '../../hooks/use-debounce-callback';
// RowInput component that is used in the selector layout for search input
// handles composition events and enter key press
export const RowInput = forwardRef(function RowInput({ disabled, onChange: propsOnChange, className, style = {}, onEnter, onKeyDown, onBlur, autoFocus, autoSelect, debounce, ...otherProps }, upstreamRef) {
    const [composing, setComposing] = useState(false);
    const focusRef = useAutoFocus(autoFocus);
    const selectRef = useAutoSelect(autoSelect);
    const inputRef = useCallback((el) => {
        focusRef.current = el;
        selectRef.current = el;
        if (upstreamRef) {
            if (typeof upstreamRef === 'function') {
                upstreamRef(el);
            }
            else {
                upstreamRef.current = el;
            }
        }
    }, [focusRef, selectRef, upstreamRef]);
    // use native blur event to get event after unmount
    // don't use useLayoutEffect here, because the cleanup function will be called before unmount
    useEffect(() => {
        if (!onBlur)
            return;
        selectRef.current?.addEventListener('blur', onBlur);
        return () => {
            // oxlint-disable-next-line react-hooks/exhaustive-deps
            selectRef.current?.removeEventListener('blur', onBlur);
        };
    }, [onBlur, selectRef]);
    const handleChange = useCallback((e) => {
        propsOnChange?.(e.target.value);
    }, [propsOnChange]);
    const debounceHandleChange = useDebounceCallback(handleChange, debounce);
    const handleKeyDown = useCallback((e) => {
        onKeyDown?.(e);
        if (e.key !== 'Enter' || composing) {
            return;
        }
        onEnter?.(e.currentTarget.value);
    }, [onKeyDown, composing, onEnter]);
    const handleCompositionStart = useCallback(() => {
        setComposing(true);
    }, []);
    const handleCompositionEnd = useCallback(() => {
        setComposing(false);
    }, []);
    return (_jsx("input", { className: className, ref: inputRef, disabled: disabled, style: style, onChange: debounce ? debounceHandleChange : handleChange, onKeyDown: handleKeyDown, onCompositionStart: handleCompositionStart, onCompositionEnd: handleCompositionEnd, ...otherProps }));
});
//# sourceMappingURL=row-input.js.map