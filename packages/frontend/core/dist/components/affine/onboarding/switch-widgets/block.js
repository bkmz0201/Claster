import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { onboardingBlock } from './style.css';
export const OnboardingBlock = ({ bg, mode, style, children, offset, position, fromPosition, enterDelay, leaveDelay, edgelessOnly, customStyle, sub, }) => {
    const baseStyles = {
        '--bg': bg,
        '--enter-delay': enterDelay ? `${enterDelay}ms` : '0ms',
        '--leave-delay': leaveDelay ? `${leaveDelay}ms` : '0ms',
        zIndex: position ? 1 : 0,
        position: position || fromPosition ? 'absolute' : 'relative',
    };
    if (mode === 'page') {
        if (fromPosition) {
            baseStyles.left = fromPosition.x ?? 'unset';
            baseStyles.top = fromPosition.y ?? 'unset';
        }
    }
    else {
        if (offset) {
            baseStyles.transform = `translate(${offset.x}px, ${offset.y}px)`;
        }
        if (position) {
            baseStyles.left = position.x ?? 'unset';
            baseStyles.top = position.y ?? 'unset';
        }
    }
    const blockStyles = {
        ...baseStyles,
        ...style,
        ...customStyle?.[mode === 'page' ? 'page' : 'edgeless'],
    };
    return (_jsxs("div", { style: blockStyles, onMouseDown: e => {
            e.stopPropagation();
        }, className: onboardingBlock, "data-mode": mode, "data-bg-mode": bg && mode !== 'page', "data-invisible": mode === 'page' && edgelessOnly, children: [children, sub ? _jsx(OnboardingBlock, { mode: mode, ...sub }) : null] }));
};
//# sourceMappingURL=block.js.map