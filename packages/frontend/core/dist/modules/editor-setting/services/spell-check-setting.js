import { LiveData, Service } from '@toeverything/infra';
const SPELL_CHECK_SETTING_KEY = 'spellCheckState';
export class SpellCheckSettingService extends Service {
    constructor(globalStateService, i18n, desktopApiService) {
        super();
        this.globalStateService = globalStateService;
        this.i18n = i18n;
        this.desktopApiService = desktopApiService;
        this.enabled$ = LiveData.from(this.globalStateService.globalState.watch(SPELL_CHECK_SETTING_KEY), { enabled: false });
        // this will be called even during initialization
        this.i18n.i18next.on('languageChanged', (language) => {
            this.desktopApiService.handler.ui
                .onLanguageChange(language)
                .catch(err => {
                console.error(err);
            });
        });
    }
    setEnabled(enabled) {
        this.globalStateService.globalState.set(SPELL_CHECK_SETTING_KEY, {
            enabled,
        });
    }
}
//# sourceMappingURL=spell-check-setting.js.map