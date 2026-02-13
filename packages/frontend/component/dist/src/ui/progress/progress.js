import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as RadixProgress from '@radix-ui/react-progress';
import * as RadixSlider from '@radix-ui/react-slider';
import clsx from 'clsx';
import * as styles from './progress.css';
export const Progress = ({ value, onChange, onBlur, readonly, className, style, testId, }) => {
    return (_jsxs("div", { className: clsx(styles.root, className), style: style, "data-testid": testId, children: [_jsxs(RadixProgress.Root, { className: styles.progress, value: value, children: [_jsx(RadixProgress.Indicator, { className: styles.indicator, style: { width: `${value}%` } }), !readonly ? (_jsx(RadixSlider.Root, { className: styles.sliderRoot, min: 0, max: 100, value: [value], onValueChange: values => onChange?.(values[0]), onBlur: onBlur, children: _jsx(RadixSlider.Thumb, { className: styles.thumb }) })) : null] }), _jsxs("div", { className: styles.label, children: [value, "%"] })] }));
};
//# sourceMappingURL=progress.js.map