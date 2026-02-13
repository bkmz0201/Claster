import { notify } from '@affine/component';
import { DebugLogger } from '@affine/debug';
import { getOrCreateI18n, i18nCompletenesses, SUPPORTED_LANGUAGES, } from '@affine/i18n';
import { effect, Entity, fromPromise, LiveData } from '@toeverything/infra';
import { catchError, EMPTY, exhaustMap } from 'rxjs';
const logger = new DebugLogger('i18n');
function mapLanguageInfo(language = 'en') {
    const languageInfo = SUPPORTED_LANGUAGES[language];
    return {
        key: language,
        name: languageInfo.name,
        originalName: languageInfo.originalName,
        completeness: i18nCompletenesses[language],
    };
}
export class I18n extends Entity {
    get i18next() {
        return this.i18n;
    }
    constructor(cache) {
        super();
        this.cache = cache;
        this.i18n = getOrCreateI18n();
        this.currentLanguageKey$ = LiveData.from(this.cache.watch('i18n_lng'), undefined);
        this.currentLanguage$ = this.currentLanguageKey$
            .distinctUntilChanged()
            .map(mapLanguageInfo);
        this.languageList = 
        // @ts-expect-error same key indexing
        Object.keys(SUPPORTED_LANGUAGES).map(mapLanguageInfo);
        this.changeLanguage = effect(exhaustMap((language) => fromPromise(() => this.i18n.changeLanguage(language)).pipe(catchError(error => {
            notify({
                theme: 'error',
                title: 'Failed to change language',
                message: 'Error occurs when loading language files',
            });
            logger.error('Failed to change language', error);
            return EMPTY;
        }))));
        this.i18n.on('languageChanged', (language) => {
            document.documentElement.lang = language;
            this.cache.set('i18n_lng', language);
        });
    }
    init() {
        this.changeLanguage(this.currentLanguageKey$.value ?? 'en');
    }
}
//# sourceMappingURL=i18n.js.map