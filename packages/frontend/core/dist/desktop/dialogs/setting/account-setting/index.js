import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { FlexWrapper, Input, notify } from '@affine/component';
import { SettingHeader, SettingRow, SettingWrapper, } from '@affine/component/setting-components';
import { Avatar } from '@affine/component/ui/avatar';
import { Button } from '@affine/component/ui/button';
import { useSignOut } from '@affine/core/components/hooks/affine/use-sign-out';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { useCatchEventCallback } from '@affine/core/components/hooks/use-catch-event-hook';
import { Upload } from '@affine/core/components/pure/file-upload';
import { GlobalDialogService } from '@affine/core/modules/dialogs';
import { SubscriptionPlan } from '@affine/graphql';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { ArrowRightSmallIcon, CameraIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService, useServices } from '@toeverything/infra';
import { useCallback, useEffect, useState } from 'react';
import { AuthService, ServerService } from '../../../../modules/cloud';
import { AIUsagePanel } from './ai-usage-panel';
import { DeleteAccount } from './delete-account';
import { StorageProgress } from './storage-progress';
import * as styles from './style.css';
export const UserAvatar = () => {
    const t = useI18n();
    const session = useService(AuthService).session;
    const account = useLiveData(session.account$);
    const handleUpdateUserAvatar = useAsyncCallback(async (file) => {
        try {
            track.$.settingsPanel.accountSettings.uploadAvatar();
            await session.uploadAvatar(file);
            notify.success({ title: 'Update user avatar success' });
        }
        catch (e) {
            // TODO(@catsjuice): i18n
            notify.error({
                title: 'Update user avatar failed',
                message: String(e),
            });
        }
    }, [session]);
    const handleRemoveUserAvatar = useCatchEventCallback(async () => {
        track.$.settingsPanel.accountSettings.removeAvatar();
        await session.removeAvatar();
    }, [session]);
    return (_jsx(Upload, { accept: "image/gif,image/jpeg,image/jpg,image/png,image/svg", fileChange: handleUpdateUserAvatar, "data-testid": "upload-user-avatar", children: _jsx(Avatar, { size: 56, name: account?.label, url: account?.avatar, hoverIcon: _jsx(CameraIcon, {}), onRemove: account?.avatar ? handleRemoveUserAvatar : undefined, avatarTooltipOptions: { content: t['Click to replace photo']() }, removeTooltipOptions: { content: t['Remove photo']() }, "data-testid": "user-setting-avatar", removeButtonProps: {
                ['data-testid']: 'user-setting-remove-avatar-button',
            } }) }));
};
export const AvatarAndName = () => {
    const t = useI18n();
    const session = useService(AuthService).session;
    const account = useLiveData(session.account$);
    const [input, setInput] = useState(account?.label ?? '');
    const allowUpdate = !!input && input !== account?.label;
    const handleUpdateUserName = useAsyncCallback(async () => {
        if (account === null) {
            return;
        }
        if (!allowUpdate) {
            return;
        }
        try {
            track.$.settingsPanel.accountSettings.updateUserName();
            await session.updateLabel(input);
        }
        catch (e) {
            notify.error({
                title: 'Failed to update user name.',
                message: String(e),
            });
        }
    }, [account, allowUpdate, session, input]);
    return (_jsx(SettingRow, { name: t['com.affine.settings.profile'](), desc: t['com.affine.settings.profile.message'](), spreadCol: false, children: _jsxs(FlexWrapper, { style: { margin: '12px 0 24px 0' }, alignItems: "center", children: [_jsx(UserAvatar, {}), _jsxs("div", { className: styles.profileInputWrapper, children: [_jsx("label", { children: t['com.affine.settings.profile.name']() }), _jsxs(FlexWrapper, { alignItems: "center", children: [_jsx(Input, { defaultValue: input, "data-testid": "user-name-input", placeholder: t['com.affine.settings.profile.placeholder'](), maxLength: 64, minLength: 0, style: { width: 280, height: 32 }, onChange: setInput, onEnter: handleUpdateUserName }), allowUpdate ? (_jsx(Button, { "data-testid": "save-user-name", onClick: handleUpdateUserName, style: {
                                        marginLeft: '12px',
                                    }, children: t['com.affine.editCollection.save']() })) : null] })] })] }) }));
};
const StoragePanel = ({ onChangeSettingState, }) => {
    const t = useI18n();
    const onUpgrade = useCallback(() => {
        track.$.settingsPanel.accountUsage.viewPlans({
            plan: SubscriptionPlan.Pro,
        });
        onChangeSettingState?.({
            activeTab: 'plans',
            scrollAnchor: 'cloudPricingPlan',
        });
    }, [onChangeSettingState]);
    return (_jsx(SettingRow, { name: t['com.affine.storage.title'](), desc: "", spreadCol: false, children: _jsx(StorageProgress, { onUpgrade: onUpgrade }) }));
};
export const AccountSetting = ({ onChangeSettingState, }) => {
    const { authService, serverService, globalDialogService } = useServices({
        AuthService,
        ServerService,
        GlobalDialogService,
    });
    const serverFeatures = useLiveData(serverService.server.features$);
    const t = useI18n();
    const session = authService.session;
    useEffect(() => {
        session.revalidate();
    }, [session]);
    const account = useLiveData(session.account$);
    const openSignOutModal = useSignOut();
    const onChangeEmail = useCallback(() => {
        if (!account) {
            return;
        }
        globalDialogService.open('verify-email', {
            server: serverService.server.baseUrl,
            changeEmail: !!account.info?.emailVerified,
        });
    }, [account, globalDialogService, serverService.server.baseUrl]);
    const onPasswordButtonClick = useCallback(() => {
        globalDialogService.open('change-password', {
            server: serverService.server.baseUrl,
        });
    }, [globalDialogService, serverService.server.baseUrl]);
    if (!account) {
        return null;
    }
    return (_jsxs(_Fragment, { children: [_jsx(SettingHeader, { title: t['com.affine.setting.account'](), subtitle: t['com.affine.setting.account.message'](), "data-testid": "account-title" }), _jsx(AvatarAndName, {}), _jsxs(SettingWrapper, { children: [_jsx(SettingRow, { name: t['com.affine.settings.email'](), desc: account.email, children: _jsx(Button, { onClick: onChangeEmail, children: account.info?.emailVerified
                                ? t['com.affine.settings.email.action.change']()
                                : t['com.affine.settings.email.action.verify']() }) }), _jsx(SettingRow, { name: t['com.affine.settings.password'](), desc: t['com.affine.settings.password.message'](), children: _jsx(Button, { onClick: onPasswordButtonClick, children: account.info?.hasPassword
                                ? t['com.affine.settings.password.action.change']()
                                : t['com.affine.settings.password.action.set']() }) }), _jsx(StoragePanel, { onChangeSettingState: onChangeSettingState }), serverFeatures?.copilot && (_jsx(AIUsagePanel, { onChangeSettingState: onChangeSettingState })), _jsx(SettingRow, { name: t[`Sign out`](), desc: t['com.affine.setting.sign.out.message'](), style: { cursor: 'pointer' }, "data-testid": "sign-out-button", onClick: openSignOutModal, children: _jsx(ArrowRightSmallIcon, {}) })] }), _jsx(DeleteAccount, {})] }));
};
//# sourceMappingURL=index.js.map