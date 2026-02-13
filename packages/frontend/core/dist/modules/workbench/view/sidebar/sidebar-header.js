import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton } from '@affine/component';
import { RightSidebarIcon } from '@blocksuite/icons/rc';
import * as styles from './sidebar-header.css';
function Container({ children, style, className, }) {
    return (_jsx("div", { "data-testid": "header", style: style, className: className, children: children }));
}
const ToggleButton = ({ onToggle }) => {
    return (_jsx(IconButton, { size: "24", onClick: onToggle, "data-testid": "right-sidebar-close", children: _jsx(RightSidebarIcon, {}) }));
};
export const Header = ({ children, onToggle }) => {
    return (_jsxs(Container, { className: styles.header, children: [children, !BUILD_CONFIG.isElectron && (_jsxs(_Fragment, { children: [_jsx("div", { className: styles.spacer }), _jsx(ToggleButton, { onToggle: onToggle })] }))] }));
};
//# sourceMappingURL=sidebar-header.js.map