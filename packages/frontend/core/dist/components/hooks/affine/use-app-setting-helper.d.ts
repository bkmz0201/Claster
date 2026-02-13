import type { AppSetting } from '@toeverything/infra';
export declare function useAppSettingHelper(): {
    appSettings: AppSetting;
    updateSettings: <K extends keyof AppSetting>(key: K, value: AppSetting[K]) => void;
};
//# sourceMappingURL=use-app-setting-helper.d.ts.map