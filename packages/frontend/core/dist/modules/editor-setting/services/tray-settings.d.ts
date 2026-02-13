import { LiveData, Service } from '@toeverything/infra';
import type { GlobalStateService } from '../../storage';
export declare class TraySettingService extends Service {
    private readonly globalStateService;
    constructor(globalStateService: GlobalStateService);
    readonly settings$: LiveData<{
        enabled: boolean;
        openOnLeftClick: boolean;
        minimizeToTray: boolean;
        closeToTray: boolean;
        startMinimized: boolean;
    }>;
    get settings(): {
        enabled: boolean;
        openOnLeftClick: boolean;
        minimizeToTray: boolean;
        closeToTray: boolean;
        startMinimized: boolean;
    };
    setEnabled(enabled: boolean): void;
    setMinimizeToTray(minimizeToTray: boolean): void;
    setCloseToTray(closeToTray: boolean): void;
    setStartMinimized(startMinimized: boolean): void;
    setOpenOnLeftClick(openOnLeftClick: boolean): void;
}
//# sourceMappingURL=tray-settings.d.ts.map