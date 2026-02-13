import { jsx as _jsx } from "react/jsx-runtime";
import { Menu } from '@affine/component';
import { MenuItem } from '@affine/core/modules/app-sidebar/views';
import { NotificationCountService } from '@affine/core/modules/notification';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { NotificationIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useState } from 'react';
import { NotificationList } from '../notification/list';
import * as styles from './notification-button.style.css';
const Badge = ({ count, onClick }) => {
    if (count === 0) {
        return null;
    }
    return (_jsx("div", { className: styles.badge, onClick: onClick, children: count > 99 ? '99+' : count }));
};
export const NotificationButton = () => {
    const notificationCountService = useService(NotificationCountService);
    const notificationCount = useLiveData(notificationCountService.count$);
    const t = useI18n();
    const [notificationListOpen, setNotificationListOpen] = useState(false);
    const handleNotificationListOpenChange = useCallback((open) => {
        if (open) {
            track.$.sidebar.notifications.openInbox({
                unreadCount: notificationCountService.count$.value,
            });
        }
        setNotificationListOpen(open);
    }, [notificationCountService.count$.value]);
    return (_jsx(Menu, { rootOptions: {
            open: notificationListOpen,
            onOpenChange: handleNotificationListOpenChange,
        }, contentOptions: {
            side: 'right',
            sideOffset: -50,
        }, items: _jsx(NotificationList, {}), children: _jsx(MenuItem, { icon: _jsx(NotificationIcon, {}), postfix: _jsx(Badge, { count: notificationCount }), active: notificationListOpen, postfixDisplay: "always", children: _jsx("span", { "data-testid": "notification-button", children: t['com.affine.rootAppSidebar.notifications']() }) }) }));
};
//# sourceMappingURL=notification-button.js.map