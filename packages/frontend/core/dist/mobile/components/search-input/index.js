import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAutoFocus } from '@affine/component';
import { getFigmaSquircleSvgPath } from '@blocksuite/affine/shared/utils';
import { SearchIcon } from '@blocksuite/icons/rc';
import clsx from 'clsx';
import { debounce } from 'lodash-es';
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState, } from 'react';
import * as styles from './style.css';
export const SearchInput = forwardRef(function SearchInput({ className, style, placeholder = 'Search', value = '', height = 44, cornerRadius = 10, cornerSmoothing = 0.6, autoFocus, debounce: debounceDuration, onInput, onClick, ...attrs }, upstreamRef) {
    const focusRef = useAutoFocus(autoFocus);
    const containerRef = useRef(null);
    const [width, setWidth] = useState(window.innerWidth);
    const [inputValue, setInputValue] = useState(value);
    const clipPath = useMemo(() => getFigmaSquircleSvgPath({
        width,
        height,
        cornerRadius,
        cornerSmoothing,
    }), [cornerRadius, cornerSmoothing, height, width]);
    useEffect(() => {
        setWidth(containerRef.current?.offsetWidth ?? 0);
    }, []);
    const emitValue = useMemo(() => {
        const cb = (value) => onInput?.(value);
        return debounceDuration ? debounce(cb, debounceDuration) : cb;
    }, [debounceDuration, onInput]);
    const handleInput = useCallback(e => {
        const value = e.currentTarget.value;
        setInputValue(value);
        emitValue(value);
    }, [emitValue]);
    const inputRef = (el) => {
        focusRef.current = el;
        if (upstreamRef) {
            if (typeof upstreamRef === 'function') {
                upstreamRef(el);
            }
            else {
                upstreamRef.current = el;
            }
        }
    };
    return (_jsxs("div", { onClick: onClick, ref: containerRef, className: clsx(styles.wrapper, className), style: { ...style, height, clipPath: `path('${clipPath}')` }, children: [_jsx("div", { className: styles.prefixIcon, children: _jsx(SearchIcon, { width: "20", height: "20" }) }), _jsx("input", { ref: inputRef, ...attrs, type: "search", inputMode: "search", value: inputValue, onInput: handleInput, className: styles.input }), !inputValue ? (_jsx("div", { className: styles.placeholder, children: placeholder })) : null] }));
});
//# sourceMappingURL=index.js.map