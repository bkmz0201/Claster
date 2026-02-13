import { jsx as _jsx } from "react/jsx-runtime";
import { UserFeatureService } from '@affine/core/modules/cloud/services/user-feature';
import { FeatureFlagService } from '@affine/core/modules/feature-flag';
import { MeetingSettingsService } from '@affine/core/modules/media/services/meeting-settings';
import { useI18n } from '@affine/i18n';
import { AppearanceIcon, ExperimentIcon, FolderIcon, InformationIcon, KeyboardIcon, MeetingIcon, NotificationIcon, PenIcon, } from '@blocksuite/icons/rc';
import { useLiveData, useServices } from '@toeverything/infra';
import { useEffect, useMemo } from 'react';
import { AuthService, ServerService } from '../../../../modules/cloud';
import { AboutAffine } from './about';
import { AppearanceSettings } from './appearance';
import { BackupSettingPanel } from './backup';
import { BillingSettings } from './billing';
import { EditorSettings } from './editor';
import { ExperimentalFeatures } from './experimental-features';
import { PaymentIcon, UpgradeIcon } from './icons';
import { MeetingsSettings } from './meetings';
import { NotificationSettings } from './notifications';
import { AFFiNEPricingPlans } from './plans';
import { Shortcuts } from './shortcuts';
export const useGeneralSettingList = () => {
    const t = useI18n();
    const { authService, serverService, userFeatureService, featureFlagService, meetingSettingsService, } = useServices({
        AuthService,
        ServerService,
        UserFeatureService,
        FeatureFlagService,
        MeetingSettingsService,
    });
    const status = useLiveData(authService.session.status$);
    const loggedIn = status === 'authenticated';
    const hasPaymentFeature = useLiveData(serverService.server.features$.map(f => f?.payment));
    const enableEditorSettings = useLiveData(featureFlagService.flags.enable_editor_settings.$);
    useEffect(() => {
        userFeatureService.userFeature.revalidate();
    }, [userFeatureService]);
    const meetingSettings = useLiveData(meetingSettingsService.settings$);
    return useMemo(() => {
        const settings = [
            {
                key: 'appearance',
                title: t['com.affine.settings.appearance'](),
                icon: _jsx(AppearanceIcon, {}),
                testId: 'appearance-panel-trigger',
            },
            {
                key: 'shortcuts',
                title: t['com.affine.keyboardShortcuts.title'](),
                icon: _jsx(KeyboardIcon, {}),
                testId: 'shortcuts-panel-trigger',
            },
        ];
        if (loggedIn) {
            settings.push({
                key: 'notifications',
                title: t['com.affine.setting.notifications'](),
                icon: _jsx(NotificationIcon, {}),
                testId: 'notifications-panel-trigger',
            });
        }
        if (enableEditorSettings) {
            // add editor settings to second position
            settings.splice(1, 0, {
                key: 'editor',
                title: t['com.affine.settings.editorSettings'](),
                icon: _jsx(PenIcon, {}),
                testId: 'editor-panel-trigger',
            });
        }
        if ((environment.isMacOs || environment.isWindows) &&
            BUILD_CONFIG.isElectron) {
            settings.push({
                key: 'meetings',
                title: t['com.affine.settings.meetings'](),
                icon: _jsx(MeetingIcon, {}),
                testId: 'meetings-panel-trigger',
                beta: !meetingSettings?.enabled,
            });
        }
        if (hasPaymentFeature) {
            settings.splice(4, 0, {
                key: 'plans',
                title: t['com.affine.payment.title'](),
                icon: _jsx(UpgradeIcon, {}),
                testId: 'plans-panel-trigger',
            });
            if (loggedIn) {
                settings.splice(4, 0, {
                    key: 'billing',
                    title: t['com.affine.payment.billing-setting.title'](),
                    icon: _jsx(PaymentIcon, {}),
                    testId: 'billing-panel-trigger',
                });
            }
        }
        if (BUILD_CONFIG.isElectron) {
            settings.push({
                key: 'backup',
                title: t['com.affine.settings.workspace.backup'](),
                icon: _jsx(FolderIcon, {}),
                testId: 'backup-panel-trigger',
            });
        }
        settings.push({
            key: 'experimental-features',
            title: t['com.affine.settings.workspace.experimental-features'](),
            icon: _jsx(ExperimentIcon, {}),
            testId: 'experimental-features-trigger',
        }, {
            key: 'about',
            title: t['com.affine.aboutAFFiNE.title'](),
            icon: _jsx(InformationIcon, {}),
            testId: 'about-panel-trigger',
        });
        return settings;
    }, [
        t,
        loggedIn,
        enableEditorSettings,
        meetingSettings?.enabled,
        hasPaymentFeature,
    ]);
};
export const GeneralSetting = ({ activeTab, onChangeSettingState, }) => {
    switch (activeTab) {
        case 'shortcuts':
            return _jsx(Shortcuts, {});
        case 'notifications':
            return _jsx(NotificationSettings, {});
        case 'editor':
            return _jsx(EditorSettings, {});
        case 'appearance':
            return _jsx(AppearanceSettings, {});
        case 'meetings':
            return _jsx(MeetingsSettings, {});
        case 'about':
            return _jsx(AboutAffine, {});
        case 'plans':
            return _jsx(AFFiNEPricingPlans, {});
        case 'billing':
            return _jsx(BillingSettings, { onChangeSettingState: onChangeSettingState });
        case 'experimental-features':
            return _jsx(ExperimentalFeatures, {});
        case 'backup':
            return _jsx(BackupSettingPanel, {});
        default:
            return null;
    }
};
//# sourceMappingURL=index.js.map