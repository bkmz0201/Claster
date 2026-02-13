import en from './en.json';
export type Language = 'en' | 'zh-Hans' | 'zh-Hant' | 'fr' | 'es' | 'es-AR' | 'es-CL' | 'pl' | 'de' | 'ru' | 'ja' | 'it' | 'ca' | 'da' | 'hi' | 'sv-SE' | 'ur' | 'ar' | 'uk' | 'ko' | 'pt-BR' | 'fa';
export type LanguageResource = typeof en;
export declare const SUPPORTED_LANGUAGES: Record<Language, {
    name: string;
    originalName: string;
    flagEmoji: string;
    resource: LanguageResource | (() => Promise<{
        default: Partial<LanguageResource>;
    }>);
}>;
//# sourceMappingURL=index.d.ts.map