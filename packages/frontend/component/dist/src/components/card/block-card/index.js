import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import * as styles from './styles.css';
export const BlockCard = forwardRef(({ left, title, desc, right, disabled, onClick, ...props }, ref) => {
    return (_jsxs("div", { ref: ref, className: styles.blockCard, role: "button", "aria-disabled": disabled, onClick: disabled ? undefined : onClick, ...props, children: [left && _jsx("div", { className: styles.blockCardAround, children: left }), _jsxs("div", { className: styles.blockCardContent, children: [_jsx("div", { children: title }), _jsx("div", { className: styles.blockCardDesc, children: desc })] }), right && _jsx("div", { className: styles.blockCardAround, children: right })] }));
});
BlockCard.displayName = 'BlockCard';
//# sourceMappingURL=index.js.map