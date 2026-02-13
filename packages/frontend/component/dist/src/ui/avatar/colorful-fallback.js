import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DefaultAvatarBottomItemStyle, DefaultAvatarBottomItemWithAnimationStyle, DefaultAvatarContainerStyle, DefaultAvatarMiddleItemStyle, DefaultAvatarMiddleItemWithAnimationStyle, DefaultAvatarTopItemStyle, } from './style.css';
const colorsSchema = [
    ['#FF0000', '#FF00E5', '#FFAE73'],
    ['#FF5C00', '#FFC700', '#FFE073'],
    ['#FFDA16', '#FFFBA6', '#FFBE73'],
    ['#8CD317', '#FCFF5C', '#67CAE9'],
    ['#28E19F', '#89FFC6', '#39A880'],
    ['#35B7E0', '#77FFCE', '#5076FF'],
    ['#3D39FF', '#77BEFF', '#3502FF'],
    ['#BD08EB', '#755FFF', '#6967E4'],
];
export const ColorfulFallback = ({ char }) => {
    const colors = useMemo(() => {
        const index = char.toUpperCase().charCodeAt(0);
        return colorsSchema[index % colorsSchema.length];
    }, [char]);
    const timer = useRef(null);
    const [topColor, middleColor, bottomColor] = colors;
    const [isHover, setIsHover] = useState(false);
    useEffect(() => {
        return () => void (timer.current && clearTimeout(timer.current));
    }, []);
    return (_jsxs("div", { className: DefaultAvatarContainerStyle, onMouseEnter: () => {
            timer.current = setTimeout(() => {
                setIsHover(true);
            }, 300);
        }, onMouseLeave: () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
            setIsHover(false);
        }, children: [_jsx("div", { className: DefaultAvatarTopItemStyle, style: { background: bottomColor } }), _jsx("div", { className: clsx(DefaultAvatarMiddleItemStyle, {
                    [DefaultAvatarMiddleItemWithAnimationStyle]: isHover,
                }), style: { background: middleColor } }), _jsx("div", { className: clsx(DefaultAvatarBottomItemStyle, {
                    [DefaultAvatarBottomItemWithAnimationStyle]: isHover,
                }), style: { background: topColor } })] }));
};
export default ColorfulFallback;
//# sourceMappingURL=colorful-fallback.js.map