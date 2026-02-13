import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as Sliders from '@radix-ui/react-slider';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { clamp } from 'lodash-es';
import { useRef } from 'react';
import * as styles from './index.css';
// migrate https://github.com/radix-ui/primitives/blob/660060a765634e9cc7bf4513f41e8dabc9824d74/packages/react/slider/src/Slider.tsx#L708 to align step markers with thumbs
function calcStepMarkOffset(index, maxIndex, thumbSize) {
    const percent = convertValueToPercentage(index, 0, maxIndex);
    const thumbInBoundsOffset = getThumbInBoundsOffset(thumbSize, percent, 1);
    return `calc(${percent}% + ${thumbInBoundsOffset}px)`;
    function convertValueToPercentage(value, min, max) {
        const maxSteps = max - min;
        const percentPerStep = 100 / maxSteps;
        const percentage = percentPerStep * (value - min);
        return clamp(percentage, 0, 100);
    }
    function getThumbInBoundsOffset(width, left, direction) {
        const halfWidth = width / 2;
        const halfPercent = 50;
        const offset = linearScale([0, halfPercent], [0, halfWidth]);
        return (halfWidth - offset(left) * direction) * direction;
    }
    function linearScale(input, output) {
        return (value) => {
            if (input[0] === input[1] || output[0] === output[1])
                return output[0];
            const ratio = (output[1] - output[0]) / (input[1] - input[0]);
            return output[0] + ratio * (value - input[0]);
        };
    }
}
export const Slider = ({ value, min = 0, max = 10, step, width = 250, nodes, containerStyle, rootStyle, trackStyle, rangeStyle, thumbStyle, noteStyle, thumbSize = 14, disabled, ...props }) => {
    const sliderRef = useRef(null);
    return (_jsx("div", { style: {
            ...containerStyle,
            ...assignInlineVars({
                [styles.thumbSize]: thumbSize ? `${thumbSize}px` : undefined,
            }),
            width: width ? `${width}px` : undefined,
        }, children: _jsx(Sliders.Root, { value: value, min: min, max: max, step: step, style: rootStyle, className: styles.root, ...props, disabled: disabled, children: _jsxs(Sliders.Track, { className: styles.trackStyle, ref: sliderRef, children: [_jsx("div", { className: styles.fakeTrackStyle, style: trackStyle, children: _jsx(Sliders.Range, { className: styles.filledTrackStyle, style: rangeStyle }) }), !!nodes &&
                        nodes.map((nodeValue, index) => (_jsx("div", { className: styles.nodeStyle, "data-active": value && value[0] >= nodeValue, "data-disabled": disabled, style: {
                                left: calcStepMarkOffset(index, nodes.length - 1, thumbSize / 2),
                                transform: index === 0
                                    ? 'translateY(-50%)'
                                    : index === nodes.length - 1
                                        ? 'translateY(-50%) translateX(-100%)'
                                        : undefined,
                                ...noteStyle,
                            } }, nodeValue))), _jsx(Sliders.Thumb, { className: styles.thumbStyle, style: thumbStyle })] }) }) }));
};
//# sourceMappingURL=slider.js.map