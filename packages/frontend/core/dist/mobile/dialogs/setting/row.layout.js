import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ConfigModal } from '@affine/core/components/mobile';
import { DualLinkIcon } from '@blocksuite/icons/rc';
import * as styles from './style.css';
export const RowLayout = ({ label, children, href, onClick, }) => {
    const content = (_jsxs(ConfigModal.Row, { "data-testid": "setting-row", className: styles.baseSettingItem, onClick: onClick, children: [_jsx("div", { className: styles.baseSettingItemName, children: label }), _jsx("div", { className: styles.baseSettingItemAction, children: children ||
                    (href ? _jsx(DualLinkIcon, { className: styles.linkIcon }) : null) })] }));
    return href ? (_jsx("a", { target: "_blank", href: href, rel: "noreferrer", children: content })) : (content);
};
//# sourceMappingURL=row.layout.js.map