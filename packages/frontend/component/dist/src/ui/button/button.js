import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import { cloneElement, forwardRef, useCallback, useMemo } from 'react';
import { useAutoFocus } from '../../hooks';
import { Loading } from '../loading';
import { Tooltip } from '../tooltip';
import * as styles from './button.css';
const IconSlot = ({ icon, loading, className, variant, ...attrs }) => {
    const showLoadingHere = loading !== undefined;
    const visible = icon || loading;
    const loadingStrokeColor = useMemo(() => {
        const usePureWhite = variant &&
            ['primary', 'error', 'success'].includes(variant);
        return usePureWhite ? '#fff' : undefined;
    }, [variant]);
    return visible ? (_jsxs("div", { className: clsx(styles.icon, className), ...attrs, children: [showLoadingHere && loading ? (_jsx(Loading, { size: "100%", strokeColor: loadingStrokeColor })) : null, icon && !loading
                ? cloneElement(icon, {
                    width: '100%',
                    height: '100%',
                    ...icon.props,
                })
                : null] })) : null;
};
export const Button = forwardRef(({ variant = 'secondary', size = 'default', children, disabled, block, loading, className, withoutHover, prefix, prefixClassName, prefixStyle, suffix, suffixClassName, suffixStyle, contentClassName, contentStyle, tooltip, tooltipShortcut, tooltipOptions, autoFocus, onClick, ...otherProps }, upstreamRef) => {
    const ref = useAutoFocus(autoFocus);
    const handleClick = useCallback((e) => {
        if (loading || disabled)
            return;
        onClick?.(e);
    }, [disabled, loading, onClick]);
    const buttonRef = (el) => {
        ref.current = el;
        if (upstreamRef) {
            if (typeof upstreamRef === 'function') {
                upstreamRef(el);
            }
            else {
                upstreamRef.current = el;
            }
        }
    };
    return (_jsx(Tooltip, { content: tooltip, shortcut: tooltipShortcut, ...tooltipOptions, children: _jsxs("button", { ...otherProps, ref: buttonRef, className: clsx(styles.button, className), "data-loading": loading || undefined, "data-block": block || undefined, disabled: disabled, "data-disabled": disabled || undefined, "data-size": size, "data-variant": variant, "data-no-hover": withoutHover || BUILD_CONFIG.isMobileEdition || undefined, "data-mobile": BUILD_CONFIG.isMobileEdition, onClick: handleClick, children: [_jsx(IconSlot, { icon: prefix, loading: loading, className: prefixClassName, style: prefixStyle, variant: variant }), children ? (_jsx("span", { className: clsx(styles.content, contentClassName), style: contentStyle, children: children })) : null, _jsx(IconSlot, { icon: suffix, className: suffixClassName, style: suffixStyle })] }) }));
});
Button.displayName = 'Button';
export default Button;
//# sourceMappingURL=button.js.map