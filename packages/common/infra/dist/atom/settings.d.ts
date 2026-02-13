export type AppSetting = {
    clientBorder: boolean;
    windowFrameStyle: 'frameless' | 'NativeTitleBar';
    enableBlurBackground: boolean;
    enableNoisyBackground: boolean;
    autoCheckUpdate: boolean;
    autoDownloadUpdate: boolean;
    enableTelemetry: boolean;
    showLinkedDocInSidebar: boolean;
};
export declare const windowFrameStyleOptions: AppSetting['windowFrameStyle'][];
export declare const APP_SETTINGS_STORAGE_KEY = "affine-settings";
type SetStateAction<Value> = Value | ((prev: Value) => Value);
export declare const appSettingAtom: import("jotai").WritableAtom<AppSetting, [SetStateAction<Partial<AppSetting>>], void>;
export {};
//# sourceMappingURL=settings.d.ts.map