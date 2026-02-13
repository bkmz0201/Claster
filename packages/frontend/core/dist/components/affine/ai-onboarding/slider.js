import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
import {} from 'react';
import * as styles from './slider.css';
/**
 * TODO(@catsjuice): extract to @affine/ui
 * @returns
 */
export const Slider = ({ rootRef, items, className, preload = 1, activeIndex = 0, transitionDuration = 300, transitionTimingFunction = 'cubic-bezier(.33,.36,0,1)', itemRenderer, ...attrs }) => {
    const count = items.length;
    const unit = Math.floor(100 / count);
    return (_jsx("div", { ref: rootRef, className: clsx(className, styles.slider), ...attrs, children: _jsx("div", { className: styles.sliderContent, style: {
                width: `${items.length * 100}%`,
                transform: `translateX(-${activeIndex * unit}%)`,
                transition: `transform ${transitionDuration}ms ${transitionTimingFunction}`,
            }, children: items?.map((item, index) => (_jsx("div", { className: styles.slideItem, children: preload === undefined || Math.abs(index - activeIndex) <= preload
                    ? itemRenderer?.(item, index)
                    : null }, `${item}-${index}`))) }) }));
};
//# sourceMappingURL=slider.js.map