import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { RadioGroup } from '../radio';
import * as styles from './styles.css';
// for reference
RadioGroup;
/**
 * @deprecated
 * use {@link RadioGroup } instead
 */
export const RadioButton = forwardRef(({ children, className, spanStyle, ...props }, ref) => {
    return (_jsxs(RadixRadioGroup.Item, { ref: ref, ...props, className: clsx(styles.radioButton, className), children: [_jsx("span", { className: clsx(styles.radioUncheckedButton, spanStyle), children: children }), _jsx(RadixRadioGroup.Indicator, { className: clsx(styles.radioButtonContent, spanStyle), children: children })] }));
});
RadioButton.displayName = 'RadioButton';
/**
 * @deprecated
 * use {@link RadioGroup} instead
 */
export const RadioButtonGroup = forwardRef(({ className, style, width, ...props }, ref) => {
    return (_jsx(RadixRadioGroup.Root, { ref: ref, className: clsx(styles.radioButtonGroup, className), style: { width, ...style }, ...props }));
});
RadioButtonGroup.displayName = 'RadioButtonGroup';
//# sourceMappingURL=radio.js.map