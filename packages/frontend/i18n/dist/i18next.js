import { DebugLogger } from '@affine/debug';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from './resources';
const logger = new DebugLogger('i18n');
const defaultLng = 'en';
let _instance = null;
export const getOrCreateI18n = () => {
    if (!_instance) {
        _instance = i18next.createInstance();
        _instance
            .use(initReactI18next)
            .use({
            type: 'backend',
            init: () => { },
            read: (lng, _ns, callback) => {
                const resource = SUPPORTED_LANGUAGES[lng].resource;
                if (typeof resource === 'function') {
                    resource()
                        .then(data => {
                        logger.info(`Loaded i18n ${lng} resource`);
                        callback(null, data.default);
                    })
                        .catch(err => {
                        logger.error(`Failed to load i18n ${lng} resource`, err);
                        callback(null, null);
                    });
                }
                else {
                    callback(null, resource);
                }
            },
        })
            .init({
            lng: defaultLng,
            fallbackLng: code => {
                // always fallback to english
                const fallbacks = [defaultLng];
                const langPart = code.split('-')[0];
                // fallback xx-YY to xx, e.g. es-AR to es
                // fallback zh-Hant to zh-Hans
                if (langPart === 'cn') {
                    fallbacks.push('zh-Hans');
                }
                else if (langPart !== code &&
                    SUPPORTED_LANGUAGES[code]) {
                    fallbacks.unshift(langPart);
                }
                return fallbacks;
            },
            supportedLngs: Object.keys(SUPPORTED_LANGUAGES),
            debug: false,
            partialBundledLanguages: true,
            resources: {
                [defaultLng]: {
                    translation: SUPPORTED_LANGUAGES[defaultLng].resource,
                },
            },
            interpolation: {
                escapeValue: false, // not needed for react as it escapes by default
            },
        })
            .then(() => {
            logger.info('i18n initialized');
        })
            .catch(() => { });
    }
    return _instance;
};
export function isI18nString(value) {
    if (typeof value === 'string') {
        return true;
    }
    if (typeof value === 'object' && value !== null) {
        return 'i18nKey' in value;
    }
    return false;
}
export function createI18nWrapper(getI18nFn) {
    const I18nMethod = {
        t(key, options) {
            if (typeof key === 'object' && 'i18nKey' in key) {
                options = key.options;
                key = key.i18nKey;
            }
            const i18n = getI18nFn();
            if (i18n.exists(key)) {
                return i18n.t(key, options);
            }
            else {
                // unknown translate key 'xxx.xxx' returns itself
                return key;
            }
        },
        get language() {
            const i18n = getI18nFn();
            return i18n.language;
        },
        changeLanguage(lng) {
            const i18n = getI18nFn();
            return i18n.changeLanguage(lng);
        },
        get on() {
            const i18n = getI18nFn();
            return i18n.on.bind(i18n);
        },
    };
    return new Proxy(I18nMethod, {
        get(self, key) {
            if (key in self) {
                // @ts-expect-error allow
                return self[key];
            }
            return I18nMethod.t.bind(null, key);
        },
        has(self, key) {
            if (key in self) {
                return true;
            }
            const i18n = getI18nFn();
            if (i18n.exists(key)) {
                return true;
            }
            return false;
        },
    });
}
/**
 * I18n['com.affine.xxx']({ arg1: 'hello' }) -> '中文 hello'
 */
export const I18n = createI18nWrapper(getOrCreateI18n);
//# sourceMappingURL=i18next.js.map