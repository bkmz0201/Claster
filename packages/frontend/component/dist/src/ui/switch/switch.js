import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// components/switch.tsx
import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import { useCallback, useMemo, useState } from 'react';
import * as styles from './index.css';
export const Switch = ({ checked: checkedProp = false, onChange: onChangeProp, children, className, disabled, style, size: propsSize, padding: propsPadding, ...otherProps }) => {
    const size = propsSize ?? (BUILD_CONFIG.isMobileEdition ? 24 : 26);
    const padding = propsPadding ?? (BUILD_CONFIG.isMobileEdition ? 2 : 3);
    const [checkedState, setCheckedState] = useState(checkedProp);
    const checked = onChangeProp ? checkedProp : checkedState;
    const onChange = useCallback((event) => {
        if (disabled) {
            return;
        }
        const newChecked = event.target.checked;
        if (onChangeProp)
            onChangeProp(newChecked);
        else
            setCheckedState(newChecked);
    }, [disabled, onChangeProp]);
    const labelStyle = useMemo(() => ({
        ...assignInlineVars({
            [styles.switchHeightVar]: `${size}px`,
            [styles.switchPaddingVar]: `${padding}px`,
        }),
        ...style,
    }), [size, padding, style]);
    return (_jsxs("label", { className: clsx(styles.labelStyle, className), style: labelStyle, ...otherProps, children: [children, _jsx("input", { className: clsx(styles.inputStyle), type: "checkbox", value: checked ? 'on' : 'off', checked: checked, onChange: onChange }), _jsx("span", { className: clsx(styles.switchStyle, {
                    [styles.switchCheckedStyle]: checked,
                    [styles.switchDisabledStyle]: disabled,
                }) })] }));
};
//# sourceMappingURL=switch.js.map