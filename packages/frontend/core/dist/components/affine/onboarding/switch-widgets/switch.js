import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { EdgelessIcon, PageIcon } from '@blocksuite/icons/rc';
import clsx from 'clsx';
import * as styles from './style.css';
export const EdgelessSwitchButtons = ({ mode, className, onSwitchToPageMode, onSwitchToEdgelessMode, ...attrs }) => {
    return (_jsxs("div", { "data-mode": mode, className: clsx(styles.switchButtons, className), ...attrs, children: [_jsx("div", { className: styles.switchButton, "data-active": mode === 'page', onClick: onSwitchToPageMode, children: _jsx(PageIcon, {}) }), _jsx("div", { className: styles.switchButton, "data-active": mode === 'edgeless', onClick: onSwitchToEdgelessMode, children: _jsx(EdgelessIcon, {}) })] }));
};
//# sourceMappingURL=switch.js.map