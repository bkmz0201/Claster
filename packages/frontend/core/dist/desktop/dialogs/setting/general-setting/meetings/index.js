import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, IconButton, Menu, MenuItem, MenuTrigger, Switch, } from '@affine/component';
import { SettingHeader, SettingRow, SettingWrapper, } from '@affine/component/setting-components';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { DesktopApiService } from '@affine/core/modules/desktop-api';
import { MeetingSettingsService } from '@affine/core/modules/media/services/meeting-settings';
import { Trans, useI18n } from '@affine/i18n';
import { ArrowRightSmallIcon, DoneIcon, InformationFillDuotoneIcon, } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useEffect, useMemo, useState } from 'react';
import * as styles from './styles.css';
import { useEnableRecording } from './use-enable-recording';
import { MeetingsWelcomePage } from './welcome-page';
const RecordingModes = [
    'prompt',
    'auto-start',
    'none',
];
const RecordingModeMenu = () => {
    const meetingSettingsService = useService(MeetingSettingsService);
    const settings = useLiveData(meetingSettingsService.settings$);
    const t = useI18n();
    const options = useMemo(() => {
        return RecordingModes.map(mode => ({
            label: t[`com.affine.settings.meetings.record.recording-mode.${mode}`](),
            value: mode,
        }));
    }, [t]);
    const currentMode = settings.recordingMode;
    const handleRecordingModeChange = useCallback((mode) => {
        meetingSettingsService.setRecordingMode(mode);
    }, [meetingSettingsService]);
    return (_jsx(Menu, { items: options.map(option => {
            return (_jsx(MenuItem, { title: option.label, onSelect: () => handleRecordingModeChange(option.value), "data-selected": currentMode === option.value, children: option.label }, option.value));
        }), children: _jsx(MenuTrigger, { style: { fontWeight: 600, width: '250px' }, block: true, children: options.find(option => option.value === currentMode)?.label }) }));
};
const PermissionSettingRow = ({ nameKey, descriptionKey, permissionSettingKey, hasPermission, onOpenPermissionSetting, }) => {
    const t = useI18n();
    const handleClick = () => {
        const result = onOpenPermissionSetting();
        if (result instanceof Promise) {
            result.catch(error => {
                console.error('Error opening permission setting:', error);
            });
        }
    };
    return (_jsx(SettingRow, { name: t[nameKey](), desc: _jsxs(_Fragment, { children: [t[descriptionKey](), !hasPermission && (_jsx("span", { onClick: handleClick, className: styles.permissionSetting, children: t[permissionSettingKey]() }))] }), children: _jsx(IconButton, { icon: hasPermission ? (_jsx(DoneIcon, {})) : (_jsx(InformationFillDuotoneIcon, { className: styles.noPermissionIcon })), onClick: handleClick }) }));
};
const MeetingsSettingsMain = () => {
    const t = useI18n();
    const meetingSettingsService = useService(MeetingSettingsService);
    const desktopApiService = useService(DesktopApiService);
    const settings = useLiveData(meetingSettingsService.settings$);
    const [recordingFeatureAvailable, setRecordingFeatureAvailable] = useState(false);
    const [permissions, setPermissions] = useState();
    useEffect(() => {
        meetingSettingsService
            .isRecordingFeatureAvailable()
            .then(available => {
            setRecordingFeatureAvailable(available ?? false);
        })
            .catch(() => {
            setRecordingFeatureAvailable(false);
        });
        meetingSettingsService
            .checkMeetingPermissions()
            .then(permission => {
            setPermissions(permission);
        })
            .catch(err => console.log(err));
    }, [meetingSettingsService]);
    const handleEnabledChange = useEnableRecording();
    const handleAutoSummaryChange = useCallback((checked) => {
        meetingSettingsService.setAutoSummary(checked);
    }, [meetingSettingsService]);
    const handleAutoTodoChange = useCallback((checked) => {
        meetingSettingsService.setAutoTodo(checked);
    }, [meetingSettingsService]);
    const handleOpenPermissionSetting = useAsyncCallback(async (type) => {
        await meetingSettingsService.askForMeetingPermission(type);
        await meetingSettingsService.showRecordingPermissionSetting(type);
    }, [meetingSettingsService]);
    const handleOpenSavedRecordings = useAsyncCallback(async () => {
        await meetingSettingsService.openSavedRecordings();
    }, [meetingSettingsService]);
    const handleRestartApp = useAsyncCallback(async () => {
        await desktopApiService.handler.ui.restartApp();
    }, [desktopApiService]);
    return (_jsxs("div", { className: styles.meetingWrapper, children: [_jsx(SettingHeader, { beta: true, title: t['com.affine.settings.meetings'](), subtitle: _jsxs(_Fragment, { children: [t['com.affine.settings.meetings.setting.prompt'](), _jsx("br", {}), _jsx(Trans, { i18nKey: "com.affine.settings.meetings.setting.prompt.2", components: {
                                strong: _jsx("strong", {}),
                            } })] }) }), _jsx(SettingRow, { name: t['com.affine.settings.meetings.enable.title'](), desc: _jsx(Trans, { i18nKey: "com.affine.settings.meetings.enable.description", components: {
                        1: (_jsx("a", { className: styles.link, href: "https://discord.com/channels/959027316334407691/1358384103925350542", target: "_blank", rel: "noreferrer" })),
                    } }), children: _jsx(Switch, { checked: settings.enabled, onChange: handleEnabledChange, "data-testid": "meetings-enable-switch" }) }), recordingFeatureAvailable && (_jsxs(_Fragment, { children: [_jsxs(SettingWrapper, { disabled: !settings.enabled, title: t['com.affine.settings.meetings.record.header'](), children: [_jsx(SettingRow, { name: t['com.affine.settings.meetings.record.recording-mode'](), desc: t['com.affine.settings.meetings.record.recording-mode.description'](), children: _jsx(RecordingModeMenu, {}) }), _jsx(SettingRow, { name: t['com.affine.settings.meetings.record.open-saved-file'](), desc: t['com.affine.settings.meetings.record.open-saved-file.description'](), children: _jsx(IconButton, { icon: _jsx(ArrowRightSmallIcon, {}), onClick: handleOpenSavedRecordings }) })] }), _jsxs(SettingWrapper, { disabled: !settings.enabled, title: t['com.affine.settings.meetings.transcription.header'](), children: [_jsx(SettingRow, { name: t['com.affine.settings.meetings.transcription.auto-summary'](), desc: t['com.affine.settings.meetings.transcription.auto-summary.description'](), children: _jsx(Switch, { checked: settings.autoTranscriptionSummary, onChange: handleAutoSummaryChange, "data-testid": "meetings-auto-summary-switch" }) }), _jsx(SettingRow, { name: t['com.affine.settings.meetings.transcription.auto-todo'](), desc: t['com.affine.settings.meetings.transcription.auto-todo.description'](), children: _jsx(Switch, { checked: settings.autoTranscriptionTodo, onChange: handleAutoTodoChange, "data-testid": "meetings-auto-todo-switch" }) })] }), environment.isMacOs && (_jsxs(SettingWrapper, { title: t['com.affine.settings.meetings.privacy.header'](), children: [_jsx(PermissionSettingRow, { nameKey: "com.affine.settings.meetings.privacy.screen-system-audio-recording", descriptionKey: "com.affine.settings.meetings.privacy.screen-system-audio-recording.description", permissionSettingKey: "com.affine.settings.meetings.privacy.screen-system-audio-recording.permission-setting", hasPermission: permissions?.screen || false, onOpenPermissionSetting: () => handleOpenPermissionSetting('screen') }), _jsx(PermissionSettingRow, { nameKey: "com.affine.settings.meetings.privacy.microphone", descriptionKey: "com.affine.settings.meetings.privacy.microphone.description", permissionSettingKey: "com.affine.settings.meetings.privacy.microphone.permission-setting", hasPermission: permissions?.microphone || false, onOpenPermissionSetting: () => handleOpenPermissionSetting('microphone') })] })), _jsx(SettingWrapper, { children: _jsx(SettingRow, { name: t['com.affine.settings.meetings.privacy.issues'](), desc: t['com.affine.settings.meetings.privacy.issues.description'](), children: _jsx(Button, { onClick: handleRestartApp, children: t['com.affine.settings.meetings.privacy.issues.restart']() }) }) })] }))] }));
};
export const MeetingsSettings = () => {
    const meetingSettingsService = useService(MeetingSettingsService);
    const settings = useLiveData(meetingSettingsService.settings$);
    const accepted = settings.betaDisclaimerAccepted || settings.enabled;
    if (!accepted) {
        return _jsx(MeetingsWelcomePage, {});
    }
    return _jsx(MeetingsSettingsMain, {});
};
//# sourceMappingURL=index.js.map