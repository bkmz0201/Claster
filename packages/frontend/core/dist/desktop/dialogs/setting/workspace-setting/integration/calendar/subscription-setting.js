import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, InlineEdit, Menu, useConfirmModal } from '@affine/component';
import { IntegrationService, } from '@affine/core/modules/integration';
import { useI18n } from '@affine/i18n';
import track from '@affine/track';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useMemo, useState } from 'react';
import { IntegrationSettingToggle } from '../setting';
import * as styles from './subscription-setting.css';
export const SubscriptionSetting = ({ subscription, }) => {
    const t = useI18n();
    const [menuOpen, setMenuOpen] = useState(false);
    const calendar = useService(IntegrationService).calendar;
    const config = useLiveData(subscription.config$);
    const name = useLiveData(subscription.name$) || t['Untitled']();
    const handleColorChange = useCallback((color) => {
        calendar.updateSubscription(subscription.url, { color });
        setMenuOpen(false);
    }, [calendar, subscription.url]);
    const toggleShowEvents = useCallback(() => {
        calendar.updateSubscription(subscription.url, {
            showEvents: !config?.showEvents,
        });
    }, [calendar, subscription.url, config?.showEvents]);
    const toggleShowAllDayEvents = useCallback(() => {
        calendar.updateSubscription(subscription.url, {
            showAllDayEvents: !config?.showAllDayEvents,
        });
    }, [calendar, subscription.url, config?.showAllDayEvents]);
    const handleNameChange = useCallback((value) => {
        calendar.updateSubscription(subscription.url, { name: value });
    }, [calendar, subscription.url]);
    if (!config)
        return null;
    return (_jsxs("div", { className: styles.card, children: [_jsxs("div", { className: styles.header, children: [_jsx(Menu, { rootOptions: { open: menuOpen, onOpenChange: setMenuOpen }, contentOptions: { alignOffset: -6 }, items: _jsx(ColorPicker, { activeColor: config.color, onChange: handleColorChange }), children: _jsx("div", { className: styles.colorPickerTrigger, style: { color: config.color } }) }), _jsx(InlineEdit, { className: styles.name, editable: true, trigger: "click", value: name, onChange: handleNameChange }), _jsx(UnsubscribeButton, { url: subscription.url, name: name })] }), _jsx("div", { className: styles.divider }), _jsx(IntegrationSettingToggle, { name: t['com.affine.integration.calendar.show-events'](), desc: t['com.affine.integration.calendar.show-events-desc'](), checked: !!config.showEvents, onChange: toggleShowEvents }), _jsx("div", { "data-collapsed": !config.showEvents, className: styles.allDayEventsContainer, children: _jsxs("div", { className: styles.allDayEventsContent, children: [_jsx("div", { className: styles.divider }), _jsx(IntegrationSettingToggle, { name: t['com.affine.integration.calendar.show-all-day-events'](), checked: !!config.showAllDayEvents, onChange: toggleShowAllDayEvents })] }) })] }));
};
const UnsubscribeButton = ({ url, name }) => {
    const t = useI18n();
    const calendar = useService(IntegrationService).calendar;
    const { openConfirmModal } = useConfirmModal();
    const handleUnsubscribe = useCallback(() => {
        openConfirmModal({
            title: t['com.affine.integration.calendar.unsubscribe'](),
            children: t.t('com.affine.integration.calendar.unsubscribe-content', {
                name,
            }),
            onConfirm: () => {
                calendar.deleteSubscription(url);
                track.$.settingsPanel.integrationList.disconnectIntegration({
                    type: 'calendar',
                    control: 'Calendar Setting',
                });
            },
            confirmText: t['com.affine.integration.calendar.unsubscribe'](),
            confirmButtonOptions: {
                variant: 'error',
            },
        });
    }, [calendar, name, openConfirmModal, t, url]);
    return (_jsx(Button, { variant: "error", onClick: handleUnsubscribe, children: t['com.affine.integration.calendar.unsubscribe']() }));
};
const ColorPicker = ({ activeColor, onChange, }) => {
    const calendar = useService(IntegrationService).calendar;
    const colors = useMemo(() => calendar.colors, [calendar]);
    return (_jsx("ul", { className: styles.colorPicker, children: colors.map(color => (_jsx("li", { onClick: () => onChange(color), "data-active": color === activeColor, className: styles.colorPickerItem, style: { color } }, color))) }));
};
//# sourceMappingURL=subscription-setting.js.map