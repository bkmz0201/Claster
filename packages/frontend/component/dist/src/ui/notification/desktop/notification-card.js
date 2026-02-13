import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { CloseIcon, InformationFillDuotoneIcon } from '@blocksuite/icons/rc';
import clsx from 'clsx';
import { useCallback } from 'react';
import { Button, IconButton } from '../../button';
import { FlexWrapper } from '../../layout/wrapper';
import { getCardVars } from '../utils';
import * as styles from './styles.css';
export const DesktopNotificationCard = ({ notification, }) => {
    const t = useI18n();
    const { theme = 'info', style = 'normal', icon = _jsx(InformationFillDuotoneIcon, {}), iconColor, thumb, actions, error, title, alignMessage = 'title', onDismiss, rootAttrs, } = notification;
    const errorI18nKey = error ? `error.${error.name}` : undefined;
    const errorTitle = errorI18nKey && errorI18nKey in t
        ? t[errorI18nKey](error?.data)
        : undefined;
    return (_jsxs("div", { style: getCardVars(style, theme, iconColor), "data-with-icon": icon ? '' : undefined, ...rootAttrs, className: clsx(styles.card, rootAttrs?.className), children: [thumb, _jsxs("div", { className: styles.cardInner, children: [_jsxs("header", { className: styles.header, children: [icon ? (_jsx("div", { className: clsx(styles.icon, styles.headAlignWrapper), children: icon })) : null, _jsx("div", { className: styles.title, children: title || errorTitle }), _jsx("div", { "data-float": !!thumb, className: clsx(styles.headAlignWrapper, styles.closeButton), children: _jsx(IconButton, { "data-testid": "notification-close-button", onClick: onDismiss, children: _jsx(CloseIcon, { className: styles.closeIcon, width: 16, height: 16 }) }) })] }), notification.message ? (_jsx("main", { "data-align": alignMessage, className: styles.main, children: notification.message })) : null, actions?.length ? (_jsx("footer", { children: _jsx(FlexWrapper, { marginTop: 8, justifyContent: "flex-end", gap: "12px", children: actions?.map(action => (_jsx(NotificationCardAction, { action: action, onDismiss: onDismiss }, action.key))) }) })) : null] })] }));
};
const NotificationCardAction = ({ action, onDismiss, }) => {
    const onActionClicked = useCallback(() => {
        action.onClick()?.catch(console.error);
        if (action.autoClose !== false) {
            onDismiss?.();
        }
    }, [action, onDismiss]);
    return (_jsx(Button, { variant: "plain", "data-testid": action.key, className: styles.actionButton, onClick: onActionClicked, ...action.buttonProps, children: action.label }));
};
//# sourceMappingURL=notification-card.js.map