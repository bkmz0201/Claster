import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, IconButton } from '@affine/component/ui/button';
import { useI18n } from '@affine/i18n';
import { CloseIcon } from '@blocksuite/icons/rc';
import { cssVar } from '@toeverything/theme';
import { useCallback } from 'react';
import * as styles from './index.css';
export const LocalDemoTips = ({ onClose, isLoggedIn, onLogin, onEnableCloud, }) => {
    const t = useI18n();
    const buttonLabel = isLoggedIn
        ? t['Enable AFFiNE Cloud']()
        : t['Sign in and Enable']();
    const handleClick = useCallback(() => {
        if (isLoggedIn) {
            return onEnableCloud();
        }
        return onLogin();
    }, [isLoggedIn, onEnableCloud, onLogin]);
    return (_jsxs("div", { className: styles.tipsContainer, "data-testid": "local-demo-tips", children: [_jsx("div", { className: styles.tipsMessage, children: t['com.affine.banner.local-warning']() }), _jsxs("div", { className: styles.tipsRightItem, children: [_jsx(Button, { style: { background: cssVar('white') }, onClick: handleClick, children: buttonLabel }), _jsx(IconButton, { onClick: onClose, size: "20", "data-testid": "local-demo-tips-close-button", children: _jsx(CloseIcon, {}) })] })] }));
};
export default LocalDemoTips;
//# sourceMappingURL=local-demo-tips.js.map