import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import { card, cardContent, cardDesc, cardFooter, cardHeader, cardIcon, cardStatus, cardTitle, } from './card.css';
export const IntegrationCard = ({ className, link, ...props }) => {
    return link ? (_jsx("a", { className: clsx(className, card), ...props, href: link, target: "_blank", rel: "noreferrer" })) : (_jsx("div", { className: clsx(className, card), ...props }));
};
export const IntegrationCardIcon = ({ className, ...props }) => {
    return _jsx("div", { className: clsx(cardIcon, className), ...props });
};
export const IntegrationCardHeader = ({ className, icon, title, status, ...props }) => {
    return (_jsxs("header", { className: clsx(cardHeader, className), ...props, children: [_jsx(IntegrationCardIcon, { children: icon }), _jsxs("div", { children: [_jsx("div", { className: cardTitle, children: title }), status ? _jsx("div", { className: cardStatus, children: status }) : null] })] }));
};
export const IntegrationCardContent = ({ className, desc, ...props }) => {
    return (_jsx("div", { className: clsx(cardContent, className), ...props, children: _jsx("div", { className: cardDesc, children: desc }) }));
};
export const IntegrationCardFooter = ({ className, ...props }) => {
    return _jsx("footer", { className: clsx(cardFooter, className), ...props });
};
//# sourceMappingURL=card.js.map