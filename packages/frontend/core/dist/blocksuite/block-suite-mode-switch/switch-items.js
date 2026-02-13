import { jsx as _jsx } from "react/jsx-runtime";
import { Tooltip } from '@affine/component';
import { InternalLottie, } from '@affine/component/internal-lottie';
import { useI18n } from '@affine/i18n';
import { cloneElement, useState } from 'react';
import edgelessHover from './animation-data/edgeless-hover.json';
import pageHover from './animation-data/page-hover.json';
const HoverAnimateController = ({ children, ...props }) => {
    const [startAnimate, setStartAnimate] = useState(false);
    return (_jsx("div", { onMouseEnter: () => setStartAnimate(true), onMouseLeave: () => setStartAnimate(false), ...props, children: cloneElement(children, {
            isStopped: !startAnimate,
            speed: 1,
            width: 20,
            height: 20,
        }) }));
};
const pageLottieOptions = {
    loop: false,
    autoplay: false,
    animationData: pageHover,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
};
const edgelessLottieOptions = {
    loop: false,
    autoplay: false,
    animationData: edgelessHover,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
};
export const PageSwitchItem = (props) => {
    const t = useI18n();
    return (_jsx(Tooltip, { content: t['com.affine.header.mode-switch.page'](), shortcut: ['$alt', 'S'], side: "bottom", children: _jsx(HoverAnimateController, { ...props, children: _jsx(InternalLottie, { options: pageLottieOptions }) }) }));
};
export const EdgelessSwitchItem = (props) => {
    const t = useI18n();
    return (_jsx(Tooltip, { content: t['com.affine.header.mode-switch.edgeless'](), shortcut: ['$alt', 'S'], side: "bottom", children: _jsx(HoverAnimateController, { ...props, children: _jsx(InternalLottie, { options: edgelessLottieOptions }) }) }));
};
//# sourceMappingURL=switch-items.js.map