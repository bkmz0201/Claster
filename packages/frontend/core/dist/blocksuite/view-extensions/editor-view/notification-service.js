import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input, notify, toast, toReactNode, } from '@affine/component';
import { NotificationExtension, } from '@blocksuite/affine/shared/services';
export class NotificationServiceImpl {
    constructor(closeConfirmModal, openConfirmModal) {
        this.closeConfirmModal = closeConfirmModal;
        this.openConfirmModal = openConfirmModal;
        this.confirm = async ({ title, message, confirmText, cancelText, abort, }) => {
            return new Promise(resolve => {
                this.openConfirmModal({
                    title: toReactNode(title),
                    description: toReactNode(message),
                    confirmText,
                    confirmButtonOptions: {
                        variant: 'primary',
                    },
                    cancelText,
                    onConfirm: () => {
                        resolve(true);
                    },
                    onCancel: () => {
                        resolve(false);
                    },
                });
                abort?.addEventListener('abort', () => {
                    resolve(false);
                    this.closeConfirmModal();
                });
            });
        };
        this.prompt = async ({ title, message, confirmText, placeholder, cancelText, autofill, abort, }) => {
            return new Promise(resolve => {
                let value = autofill || '';
                const description = (_jsxs("div", { children: [_jsx("span", { style: { marginBottom: 12 }, children: toReactNode(message) }), _jsx(Input, { autoSelect: true, placeholder: placeholder, defaultValue: value, onChange: e => (value = e) })] }));
                this.openConfirmModal({
                    title: toReactNode(title),
                    description: description,
                    confirmText: confirmText ?? 'Confirm',
                    confirmButtonOptions: {
                        variant: 'primary',
                    },
                    cancelText: cancelText ?? 'Cancel',
                    onConfirm: () => {
                        resolve(value);
                    },
                    onCancel: () => {
                        resolve(null);
                    },
                    autoFocusConfirm: false,
                });
                abort?.addEventListener('abort', () => {
                    resolve(null);
                    this.closeConfirmModal();
                });
            });
        };
        this.toast = (message, options) => {
            return toast(message, options);
        };
        this.notify = (notification) => {
            const accentToNotify = {
                error: notify.error,
                success: notify.success,
                warning: notify.warning,
                info: notify,
            };
            const fn = accentToNotify[notification.accent || 'info'];
            if (!fn) {
                throw new Error('Invalid notification accent');
            }
            const toAffineNotificationActions = (actions) => {
                if (!actions)
                    return undefined;
                return actions.map(({ label, onClick, key }) => {
                    return {
                        key,
                        label: toReactNode(label),
                        onClick,
                    };
                });
            };
            const toastId = fn({
                title: toReactNode(notification.title),
                message: toReactNode(notification.message),
                actions: toAffineNotificationActions(notification.actions),
                onDismiss: notification.onClose,
            }, {
                duration: notification.duration || 0,
                onDismiss: notification.onClose,
                onAutoClose: notification.onClose,
            });
            notification.abort?.addEventListener('abort', () => {
                notify.dismiss(toastId);
            });
        };
        this.notifyWithUndoAction = (options) => {
            this.notify(options);
        };
    }
}
export function patchNotificationService({ closeConfirmModal, openConfirmModal, }) {
    const notificationService = new NotificationServiceImpl(closeConfirmModal, openConfirmModal);
    return NotificationExtension(notificationService);
}
//# sourceMappingURL=notification-service.js.map