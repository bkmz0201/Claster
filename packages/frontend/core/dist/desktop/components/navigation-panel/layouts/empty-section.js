import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/component';
import clsx from 'clsx';
import { cloneElement, forwardRef, } from 'react';
import * as styles from './empty-section.css';
export const NavigationPanelEmptySection = forwardRef(function NavigationPanelEmptySection({ icon: Icon, message, messageTestId, actionText, children, className, onActionClick, ...attrs }, ref) {
    const icon = typeof Icon === 'function' ? (_jsx(Icon, { className: styles.icon })) : (cloneElement(Icon, { className: styles.icon }));
    return (_jsxs("div", { className: clsx(styles.content, className), ref: ref, ...attrs, children: [_jsx("div", { className: styles.iconWrapper, children: icon }), _jsx("div", { "data-testid": messageTestId, className: styles.message, children: message }), actionText ? (_jsx(Button, { className: styles.newButton, onClick: onActionClick, children: actionText })) : null, children] }));
});
//# sourceMappingURL=empty-section.js.map