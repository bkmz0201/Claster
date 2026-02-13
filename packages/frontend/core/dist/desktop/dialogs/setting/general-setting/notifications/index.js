import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { notify, Switch } from '@affine/component';
import { SettingHeader, SettingRow, SettingWrapper, } from '@affine/component/setting-components';
import { UserSettingsService, } from '@affine/core/modules/cloud';
import { UserFriendlyError } from '@affine/error';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useEffect, useMemo, useState } from 'react';
import * as styles from './style.css';
export const NotificationSettings = () => {
    const t = useI18n();
    const userSettingsService = useService(UserSettingsService);
    useEffect(() => {
        userSettingsService.revalidate();
    }, [userSettingsService]);
    const userSettings = useLiveData(userSettingsService.userSettings$);
    const [isMutating, setIsMutating] = useState(false);
    const error = useLiveData(userSettingsService.error$);
    const errorMessage = useMemo(() => {
        if (error) {
            const userFriendlyError = UserFriendlyError.fromAny(error);
            return t[`error.${userFriendlyError.name}`](userFriendlyError.data);
        }
        return null;
    }, [error, t]);
    const disable = !userSettings || isMutating;
    const handleUpdate = useCallback((key, value) => {
        setIsMutating(true);
        userSettingsService
            .updateUserSettings({
            [key]: value,
        })
            .catch(err => {
            const userFriendlyError = UserFriendlyError.fromAny(err);
            notify.error({
                title: t[`error.${userFriendlyError.name}`](userFriendlyError.data),
            });
        })
            .finally(() => {
            setIsMutating(false);
        });
    }, [userSettingsService, t]);
    return (_jsxs(_Fragment, { children: [_jsx(SettingHeader, { title: t['com.affine.setting.notifications.header.title'](), subtitle: t['com.affine.setting.notifications.header.description']() }), _jsxs(SettingWrapper, { title: t['com.affine.setting.notifications.email.title'](), children: [!userSettings && errorMessage && (_jsxs(_Fragment, { children: [_jsx("div", { className: styles.errorMessage, children: errorMessage }), _jsx("br", {})] })), _jsx(SettingRow, { name: t['com.affine.setting.notifications.email.mention.title'](), desc: t['com.affine.setting.notifications.email.mention.subtitle'](), children: _jsx(Switch, { "data-testid": "notification-email-mention-trigger", checked: userSettings?.receiveMentionEmail ?? false, disabled: disable, onChange: checked => handleUpdate('receiveMentionEmail', checked) }) }), _jsx(SettingRow, { name: t['com.affine.setting.notifications.email.invites.title'](), desc: t['com.affine.setting.notifications.email.invites.subtitle'](), children: _jsx(Switch, { "data-testid": "notification-email-invites-trigger", checked: userSettings?.receiveInvitationEmail ?? false, disabled: disable, onChange: checked => handleUpdate('receiveInvitationEmail', checked) }) }), _jsx(SettingRow, { name: t['com.affine.setting.notifications.email.comments.title'](), desc: t['com.affine.setting.notifications.email.comments.subtitle'](), children: _jsx(Switch, { "data-testid": "notification-email-comments-trigger", checked: userSettings?.receiveCommentEmail ?? false, disabled: disable, onChange: checked => handleUpdate('receiveCommentEmail', checked) }) })] })] }));
};
//# sourceMappingURL=index.js.map