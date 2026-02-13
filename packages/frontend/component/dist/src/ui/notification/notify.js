import { jsx as _jsx } from "react/jsx-runtime";
import { UserFriendlyError } from '@affine/error';
import { InformationFillDuotoneIcon, SingleSelectCheckSolidIcon, } from '@blocksuite/icons/rc';
import { toast } from 'sonner';
import { DesktopNotificationCard } from './desktop/notification-card';
import { DesktopNotificationCenter } from './desktop/notification-center';
import { MobileNotificationCard } from './mobile/notification-card';
import { MobileNotificationCenter } from './mobile/notification-center';
const NotificationCard = BUILD_CONFIG.isMobileEdition
    ? MobileNotificationCard
    : DesktopNotificationCard;
const NotificationCenter = BUILD_CONFIG.isMobileEdition
    ? MobileNotificationCenter
    : DesktopNotificationCenter;
export { NotificationCenter };
/**
 *
 * @returns {string} toastId
 */
export function notify(notification, options) {
    return toast.custom(id => {
        const onDismiss = () => {
            notification.onDismiss?.();
            toast.dismiss(id);
        };
        return _jsx(NotificationCard, { notification: { ...notification, onDismiss } });
    }, options);
}
notify.error = (notification, options) => {
    if (notification instanceof UserFriendlyError) {
        notification = {
            error: notification,
        };
    }
    return notify({
        icon: _jsx(InformationFillDuotoneIcon, {}),
        style: 'normal',
        theme: 'error',
        ...notification,
    }, options);
};
notify.success = (notification, options) => {
    return notify({
        icon: _jsx(SingleSelectCheckSolidIcon, {}),
        style: 'normal',
        theme: 'success',
        ...notification,
    }, options);
};
notify.warning = (notification, options) => {
    return notify({
        icon: _jsx(InformationFillDuotoneIcon, {}),
        style: 'normal',
        theme: 'warning',
        ...notification,
    }, options);
};
notify.custom = (Component, options) => {
    return toast.custom(id => {
        return _jsx(Component, { onDismiss: () => toast.dismiss(id) });
    }, options);
};
notify.dismiss = toast.dismiss;
//# sourceMappingURL=notify.js.map