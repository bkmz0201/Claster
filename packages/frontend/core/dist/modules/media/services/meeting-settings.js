import { LiveData, Service } from '@toeverything/infra';
import { defaults } from 'lodash-es';
import { DesktopApiService } from '../../desktop-api';
const MEETING_SETTINGS_KEY = 'meetingSettings';
const defaultMeetingSettings = {
    enabled: false,
    betaDisclaimerAccepted: false,
    recordingSavingMode: 'new-doc',
    autoTranscriptionSummary: true,
    autoTranscriptionTodo: true,
    recordingMode: 'prompt',
};
export class MeetingSettingsService extends Service {
    constructor(globalStateService) {
        super();
        this.globalStateService = globalStateService;
        this.desktopApiService = this.framework.getOptional(DesktopApiService);
        this.settings$ = LiveData.computed(get => {
            const value = get(LiveData.from(this.globalStateService.globalState.watch(MEETING_SETTINGS_KEY), undefined));
            return defaults(value, defaultMeetingSettings);
        });
        this.setRecordingMode = (mode) => {
            const currentMode = this.settings.recordingMode;
            if (currentMode === mode) {
                return;
            }
            this.globalStateService.globalState.set(MEETING_SETTINGS_KEY, {
                ...this.settings,
                recordingMode: mode,
            });
        };
    }
    get settings() {
        return this.settings$.value;
    }
    setBetaDisclaimerAccepted(accepted) {
        this.globalStateService.globalState.set(MEETING_SETTINGS_KEY, {
            ...this.settings$.value,
            betaDisclaimerAccepted: accepted,
        });
    }
    // we do not want the caller to directly set the settings,
    // there could be some side effects when the settings are changed.
    async setEnabled(enabled) {
        const currentEnabled = this.settings.enabled;
        if (currentEnabled === enabled) {
            return;
        }
        if (!(await this.isRecordingFeatureAvailable())) {
            return;
        }
        this.globalStateService.globalState.set(MEETING_SETTINGS_KEY, {
            ...this.settings$.value,
            enabled,
        });
        // when the user enable the recording feature the first time,
        // the app may prompt the user to allow the recording feature by MacOS.
        // when the user allows the recording feature, the app may be required to restart.
        if (enabled) {
            // if the user already enabled the recording feature, we need to disable it
            const successful = await this.desktopApiService?.handler.recording.setupRecordingFeature();
            if (!successful) {
                throw new Error('Failed to setup recording feature');
            }
        }
        else {
            // check if there is any ongoing recording
            const ongoingRecording = await this.desktopApiService?.handler.recording.getCurrentRecording();
            if (ongoingRecording &&
                ongoingRecording.status !== 'new' &&
                ongoingRecording.status !== 'ready') {
                throw new Error('There is an ongoing recording, please stop it first');
            }
            // if the user disabled the recording feature, we need to setup the recording feature
            await this.desktopApiService?.handler.recording.disableRecordingFeature();
        }
    }
    setRecordingSavingMode(mode) {
        this.globalStateService.globalState.set(MEETING_SETTINGS_KEY, {
            ...this.settings$.value,
            recordingSavingMode: mode,
        });
    }
    setAutoSummary(autoSummary) {
        this.globalStateService.globalState.set(MEETING_SETTINGS_KEY, {
            ...this.settings$.value,
            autoTranscriptionSummary: autoSummary,
        });
    }
    setAutoTodo(autoTodo) {
        this.globalStateService.globalState.set(MEETING_SETTINGS_KEY, {
            ...this.settings$.value,
            autoTranscriptionTodo: autoTodo,
        });
    }
    // this is a desktop-only feature for MacOS version 14.2 and above
    async isRecordingFeatureAvailable() {
        return this.desktopApiService?.handler.recording.checkRecordingAvailable();
    }
    async checkMeetingPermissions() {
        return this.desktopApiService?.handler.recording.checkMeetingPermissions();
    }
    // the following methods are only available on MacOS right?
    async showRecordingPermissionSetting(type) {
        return this.desktopApiService?.handler.recording.showRecordingPermissionSetting(type);
    }
    async askForMeetingPermission(type) {
        return this.desktopApiService?.handler.recording.askForMeetingPermission(type);
    }
    async openSavedRecordings() {
        // todo: open the saved recordings folder
        await this.desktopApiService?.handler.recording.showSavedRecordings();
    }
}
//# sourceMappingURL=meeting-settings.js.map