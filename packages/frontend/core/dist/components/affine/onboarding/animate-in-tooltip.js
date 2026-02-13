import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button } from '@affine/component';
import * as styles from './animate-in-tooltip.css';
export const AnimateInTooltip = ({ onNext, visible, }) => {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: styles.tooltip, children: ["AFFiNE is a workspace with fully merged docs, ", _jsx("br", {}), "whiteboards and databases"] }), _jsx("div", { className: styles.next, children: visible ? (_jsx(Button, { variant: "primary", size: "extraLarge", onClick: onNext, children: "Next" })) : null })] }));
};
//# sourceMappingURL=animate-in-tooltip.js.map