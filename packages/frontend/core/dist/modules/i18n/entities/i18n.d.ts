import { type Language } from '@affine/i18n';
import { Entity, LiveData } from '@toeverything/infra';
import type { GlobalCache } from '../../storage';
export type LanguageInfo = {
    key: Language;
    name: string;
    originalName: string;
    completeness: number;
};
export declare class I18n extends Entity {
    private readonly cache;
    private readonly i18n;
    get i18next(): import("i18next").i18n;
    readonly currentLanguageKey$: LiveData<Language | undefined>;
    readonly currentLanguage$: LiveData<LanguageInfo>;
    readonly languageList: Array<LanguageInfo>;
    constructor(cache: GlobalCache);
    init(): void;
    changeLanguage: import("@toeverything/infra").Effect<string>;
}
//# sourceMappingURL=i18n.d.ts.map