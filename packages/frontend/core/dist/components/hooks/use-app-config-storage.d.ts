import type { AppConfigSchema } from '@toeverything/infra';
import { AppConfigStorage } from '@toeverything/infra';
import type { Dispatch } from 'react';
/**
 * Helper class to get/set app config from main process
 */
declare class AppConfigProxy {
    value: AppConfigSchema;
    getSync(): Promise<AppConfigSchema>;
    setSync(): Promise<void>;
    get(): AppConfigSchema;
    set(data: AppConfigSchema): void;
}
export declare const appConfigProxy: AppConfigProxy;
export declare const appConfigStorage: AppConfigStorage;
export declare function useAppConfigStorage(): [
    AppConfigSchema,
    Dispatch<AppConfigSchema>
];
export declare function useAppConfigStorage(key: keyof AppConfigSchema): [AppConfigSchema[typeof key], Dispatch<AppConfigSchema[typeof key]>];
export {};
//# sourceMappingURL=use-app-config-storage.d.ts.map