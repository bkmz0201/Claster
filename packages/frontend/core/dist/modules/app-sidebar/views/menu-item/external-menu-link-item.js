import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DualLinkIcon } from '@blocksuite/icons/rc';
import { cssVarV2 } from '@toeverything/theme/v2';
import { MenuLinkItem } from './index';
const RawLink = ({ children, to, className, }) => {
    const href = typeof to === 'string' ? to : to.pathname;
    return (_jsx("a", { className: className, href: href, target: "_blank", rel: "noreferrer", children: children }));
};
export const ExternalMenuLinkItem = ({ href, icon, label, }) => {
    return (_jsxs(MenuLinkItem, { to: href, linkComponent: RawLink, icon: icon, children: [label, _jsx(DualLinkIcon, { width: 12, height: 12, style: { marginLeft: 4, color: cssVarV2('icon/tertiary') } })] }));
};
//# sourceMappingURL=external-menu-link-item.js.map