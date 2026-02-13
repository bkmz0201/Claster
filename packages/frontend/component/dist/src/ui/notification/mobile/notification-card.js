import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { CloseIcon, InformationFillDuotoneIcon } from '@blocksuite/icons/rc';
import { useCallback, useState } from 'react';
import { Button, IconButton } from '../../button';
import { Modal } from '../../modal';
import { getCardVars } from '../utils';
import * as styles from './styles.css';
export function MobileNotificationCard({ notification, }) {
    const { theme = 'info', style = 'normal', icon = _jsx(InformationFillDuotoneIcon, {}), iconColor, onDismiss, error, } = notification;
    const t = useI18n();
    const errorI18nKey = error ? `error.${error.name}` : undefined;
    const errorTitle = errorI18nKey && errorI18nKey in t
        ? t[errorI18nKey](error?.data)
        : undefined;
    const [animated, setAnimated] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const handleShowDetail = useCallback(() => {
        setAnimated(true);
        setShowDetail(true);
    }, []);
    const handleHideDetail = useCallback(() => {
        setShowDetail(false);
        onDismiss?.();
    }, [onDismiss]);
    return showDetail ? (_jsx(MobileNotifyDetail, { notification: notification, onClose: handleHideDetail })) : (_jsxs("div", { "data-animated": animated, onClick: handleShowDetail, className: styles.toastRoot, style: getCardVars(style, theme, iconColor), children: [_jsx("span", { className: styles.toastIcon, children: icon }), _jsx("span", { className: styles.toastLabel, children: notification.title || errorTitle })] }));
}
const MobileNotifyDetail = ({ notification, onClose, }) => {
    const { theme = 'info', style = 'normal', icon = _jsx(InformationFillDuotoneIcon, {}), iconColor, title, message, actions, error, } = notification;
    const t = useI18n();
    const errorI18nKey = error ? `error.${error.name}` : undefined;
    const errorTitle = errorI18nKey && errorI18nKey in t
        ? t[errorI18nKey](error?.data)
        : undefined;
    const handleOpenChange = useCallback((open) => {
        if (!open)
            onClose();
    }, [onClose]);
    return (_jsx(Modal, { open: true, withoutCloseButton: true, width: "100%", minHeight: 60, animation: "slideBottom", onOpenChange: handleOpenChange, contentWrapperStyle: getCardVars(style, theme, iconColor), contentOptions: { style: { padding: '12px 0' } }, children: _jsxs("div", { className: styles.detailCard, onClick: e => e.stopPropagation(), children: [_jsxs("header", { className: styles.detailHeader, children: [_jsx("span", { className: styles.detailIcon, children: icon }), _jsx("span", { className: styles.detailLabel, children: title || errorTitle }), _jsx(IconButton, { onClick: onClose, icon: _jsx(CloseIcon, {}) })] }), _jsx("main", { className: styles.detailContent, children: message }), _jsx("div", { className: styles.detailActions, children: actions?.map(action => (_jsx(NotificationCardAction, { action: action, onDismiss: onClose }, action.key))) })] }) }));
};
const NotificationCardAction = ({ action, onDismiss, }) => {
    const onActionClicked = useCallback(() => {
        action.onClick()?.catch(console.error);
        if (action.autoClose !== false) {
            onDismiss?.();
        }
    }, [action, onDismiss]);
    return (_jsx(Button, { onClick: onActionClicked, ...action.buttonProps, children: action.label }));
};
//# sourceMappingURL=notification-card.js.map