import { LiveData, Service } from '@toeverything/infra';
import { defaults } from 'lodash-es';
const MENUBAR_SETTING_KEY = 'menubarState';
const defaultTraySetting = {
    enabled: true,
    minimizeToTray: false,
    closeToTray: false,
    startMinimized: false,
    openOnLeftClick: false,
};
export class TraySettingService extends Service {
    constructor(globalStateService) {
        super();
        this.globalStateService = globalStateService;
        this.settings$ = LiveData.computed(get => {
            const value = get(LiveData.from(this.globalStateService.globalState.watch(MENUBAR_SETTING_KEY), undefined));
            return defaults(value, defaultTraySetting);
        });
    }
    get settings() {
        return this.settings$.value;
    }
    setEnabled(enabled) {
        this.globalStateService.globalState.set(MENUBAR_SETTING_KEY, {
            ...this.settings$.value,
            enabled: enabled,
        });
    }
    setMinimizeToTray(minimizeToTray) {
        this.globalStateService.globalState.set(MENUBAR_SETTING_KEY, {
            ...this.settings$.value,
            minimizeToTray: minimizeToTray,
        });
    }
    setCloseToTray(closeToTray) {
        this.globalStateService.globalState.set(MENUBAR_SETTING_KEY, {
            ...this.settings$.value,
            closeToTray: closeToTray,
        });
    }
    setStartMinimized(startMinimized) {
        this.globalStateService.globalState.set(MENUBAR_SETTING_KEY, {
            ...this.settings$.value,
            startMinimized: startMinimized,
        });
    }
    setOpenOnLeftClick(openOnLeftClick) {
        this.globalStateService.globalState.set(MENUBAR_SETTING_KEY, {
            ...this.settings$.value,
            openOnLeftClick: openOnLeftClick,
        });
    }
}
//# sourceMappingURL=tray-settings.js.map