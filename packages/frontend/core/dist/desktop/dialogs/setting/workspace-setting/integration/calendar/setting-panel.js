import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Input, Modal, notify } from '@affine/component';
import { IntegrationService } from '@affine/core/modules/integration';
import { useI18n } from '@affine/i18n';
import track from '@affine/track';
import { PlusIcon, TodayIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useState } from 'react';
import { IntegrationCardIcon } from '../card';
import { IntegrationSettingHeader } from '../setting';
import * as styles from './setting-panel.css';
import { SubscriptionSetting } from './subscription-setting';
export const CalendarSettingPanel = () => {
    const t = useI18n();
    const calendar = useService(IntegrationService).calendar;
    const subscriptions = useLiveData(calendar.subscriptions$);
    return (_jsxs(_Fragment, { children: [_jsx(IntegrationSettingHeader, { icon: _jsx(TodayIcon, {}), name: t['com.affine.integration.calendar.name'](), desc: t['com.affine.integration.calendar.desc'](), divider: false }), _jsxs("div", { className: styles.list, children: [subscriptions.map(subscription => (_jsx(SubscriptionSetting, { subscription: subscription }, subscription.url))), _jsx(AddSubscription, {})] })] }));
};
const AddSubscription = () => {
    const t = useI18n();
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState('');
    const [verifying, setVerifying] = useState(false);
    const calendar = useService(IntegrationService).calendar;
    const handleOpen = useCallback(() => {
        setOpen(true);
    }, []);
    const handleClose = useCallback(() => {
        setOpen(false);
        setUrl('');
    }, []);
    const handleInputChange = useCallback((value) => {
        setUrl(value);
    }, []);
    const handleAddSub = useCallback(() => {
        const _url = url.trim();
        const exists = calendar.getSubscription(_url);
        if (exists) {
            notify.error({
                title: t['com.affine.integration.calendar.new-duplicate-error-title'](),
                message: t['com.affine.integration.calendar.new-duplicate-error-content'](),
            });
            return;
        }
        setVerifying(true);
        calendar
            .createSubscription(_url)
            .then(() => {
            setOpen(false);
            setUrl('');
            track.$.settingsPanel.integrationList.connectIntegration({
                type: 'calendar',
                control: 'Calendar Setting',
                result: 'success',
            });
        })
            .catch(() => {
            notify.error({
                title: t['com.affine.integration.calendar.new-error'](),
            });
        })
            .finally(() => {
            setVerifying(false);
        });
    }, [calendar, t, url]);
    return (_jsxs(_Fragment, { children: [_jsx(Button, { prefix: _jsx(PlusIcon, {}), size: "large", onClick: handleOpen, className: styles.newButton, children: t['com.affine.integration.calendar.new-subscription']() }), _jsxs(Modal, { open: open, onOpenChange: setOpen, persistent: true, withoutCloseButton: true, contentOptions: { className: styles.newDialog }, children: [_jsxs("header", { className: styles.newDialogHeader, children: [_jsx(IntegrationCardIcon, { children: _jsx(TodayIcon, {}) }), _jsx("div", { className: styles.newDialogTitle, children: t['com.affine.integration.calendar.new-title']() })] }), _jsxs("div", { className: styles.newDialogContent, children: [_jsx("div", { className: styles.newDialogLabel, children: t['com.affine.integration.calendar.new-url-label']() }), _jsx(Input, { type: "text", value: url, onChange: handleInputChange, placeholder: "https://example.com/calendar.ics", onEnter: handleAddSub })] }), _jsxs("footer", { className: styles.newDialogFooter, children: [_jsx(Button, { onClick: handleClose, children: t['Cancel']() }), _jsx(Button, { variant: "primary", onClick: handleAddSub, loading: verifying, children: t['com.affine.integration.calendar.new-subscription']() })] })] })] }));
};
//# sourceMappingURL=setting-panel.js.map