import { jsx as _jsx } from "react/jsx-runtime";
import { shadowSticker } from './style.css';
export const ShadowSticker = ({ color = '#F9E8FF', width, animate = true, children, }) => {
    return (_jsx("div", { "data-animate": animate, className: shadowSticker, style: {
            backgroundColor: color,
            width,
        }, children: children }));
};
//# sourceMappingURL=shadow-sticker.js.map