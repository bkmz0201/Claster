import { LiveData, Service } from '@toeverything/infra';
import type { DesktopApiService } from '../../desktop-api';
import type { I18n } from '../../i18n';
import type { GlobalStateService } from '../../storage';
export declare class SpellCheckSettingService extends Service {
    private readonly globalStateService;
    private readonly i18n;
    private readonly desktopApiService;
    constructor(globalStateService: GlobalStateService, i18n: I18n, desktopApiService: DesktopApiService);
    enabled$: LiveData<{
        enabled?: boolean | undefined;
    } | undefined>;
    setEnabled(enabled: boolean): void;
}
//# sourceMappingURL=spell-check-setting.d.ts.map