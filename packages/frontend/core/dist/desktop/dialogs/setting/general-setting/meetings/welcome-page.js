import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/component';
import { MeetingSettingsService } from '@affine/core/modules/media/services/meeting-settings';
import { Trans, useI18n } from '@affine/i18n';
import { DualLinkIcon } from '@blocksuite/icons/rc';
import { useService } from '@toeverything/infra';
import { useTheme } from 'next-themes';
import { useCallback } from 'react';
import meetingAppsDark from './meeting-apps.dark.assets.svg';
import meetingAppsLight from './meeting-apps.light.assets.svg';
import { useEnableRecording } from './use-enable-recording';
import * as styles from './welcome-page.css';
export const MeetingsWelcomePage = () => {
    const t = useI18n();
    const meetingSettingsService = useService(MeetingSettingsService);
    const enableRecording = useEnableRecording();
    const getStartedClicked = useCallback(() => {
        meetingSettingsService.setBetaDisclaimerAccepted(true);
        enableRecording(true);
    }, [meetingSettingsService, enableRecording]);
    const theme = useTheme();
    const meetingApps = theme.resolvedTheme === 'dark' ? meetingAppsDark : meetingAppsLight;
    return (_jsxs("div", { className: styles.root, children: [_jsxs("div", { className: styles.titleWrapper, children: [_jsxs("div", { className: styles.title, children: [t['com.affine.settings.meetings.setting.welcome'](), _jsx("div", { className: styles.beta, children: "Beta" })] }), _jsx("div", { className: styles.subtitle, children: t['com.affine.settings.meetings.setting.prompt']() })] }), _jsx("div", { className: styles.meetingAppsWrapper, children: _jsx("img", { src: meetingApps, alt: "meeting-apps" }) }), _jsxs("div", { className: styles.hintsContainer, children: [_jsxs("div", { className: styles.hints, children: [_jsx(Trans, { className: styles.hints, i18nKey: "com.affine.settings.meetings.setting.welcome.hints", components: {
                                    strong: _jsx("strong", {}),
                                    ul: _jsx("ul", {}),
                                    li: _jsx("li", {}),
                                } }), _jsxs("a", { className: styles.learnMoreLink, href: "https://discord.com/channels/959027316334407691/1358384103925350542", target: "_blank", rel: "noreferrer", children: [t['com.affine.settings.meetings.setting.welcome.learn-more'](), _jsx(DualLinkIcon, { className: styles.linkIcon })] }), _jsx("div", { className: styles.betaFreePrompt, children: _jsx(Trans, { i18nKey: "com.affine.settings.meetings.setting.prompt.2", components: {
                                        strong: _jsx("strong", {}),
                                    } }) })] }), _jsx(Button, { onClick: getStartedClicked, variant: "primary", className: styles.getStartedButton, children: t['com.affine.settings.workspace.experimental-features.get-started']() })] })] }));
};
//# sourceMappingURL=welcome-page.js.map