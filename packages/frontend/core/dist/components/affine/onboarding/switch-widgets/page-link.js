import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LinkedPageIcon } from '@blocksuite/icons/rc';
import { pageLink, pageLinkIcon, pageLinkLabel } from '../articles/blocks.css';
export const PageLink = ({ children }) => {
    return (_jsxs("a", { className: pageLink, children: [_jsx(LinkedPageIcon, { className: pageLinkIcon }), _jsx("span", { className: pageLinkLabel, children: children })] }));
};
//# sourceMappingURL=page-link.js.map