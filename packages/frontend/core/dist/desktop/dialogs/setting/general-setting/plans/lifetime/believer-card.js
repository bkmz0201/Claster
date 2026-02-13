import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import { bgAFFiNERaw, bgIconsRaw } from './assets';
import { bg, card, content } from './believer-card.css';
export const BelieverCard = ({ children, type, className, ...attrs }) => {
    return (_jsxs("div", { className: clsx(card, className), "data-type": type, ...attrs, children: [_jsx("div", { className: bg, dangerouslySetInnerHTML: { __html: `${bgAFFiNERaw}${bgIconsRaw}` } }), _jsx("div", { className: content, children: children })] }));
};
//# sourceMappingURL=believer-card.js.map