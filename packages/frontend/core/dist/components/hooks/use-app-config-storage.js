import { apis } from '@affine/electron-api';
import { AppConfigStorage, defaultAppConfig } from '@toeverything/infra';
import { useEffect, useMemo, useState } from 'react';
/**
 * Helper class to get/set app config from main process
 */
class AppConfigProxy {
    constructor() {
        this.value = defaultAppConfig;
    }
    async getSync() {
        if (!apis) {
            throw new Error('electron apis is not found');
        }
        return (this.value = await apis.configStorage.get());
    }
    async setSync() {
        if (!apis) {
            throw new Error('electron apis is not found');
        }
        await apis.configStorage.set(this.value);
    }
    get() {
        return this.value;
    }
    set(data) {
        this.value = data;
        this.setSync().catch(console.error);
    }
}
export const appConfigProxy = new AppConfigProxy();
const storage = BUILD_CONFIG.isElectron
    ? new AppConfigStorage({
        config: defaultAppConfig,
        get: () => appConfigProxy.get(),
        set: v => appConfigProxy.set(v),
    })
    : new AppConfigStorage({
        config: defaultAppConfig,
        get: () => JSON.parse(localStorage.getItem('app_config') ?? 'null'),
        set: config => localStorage.setItem('app_config', JSON.stringify(config)),
    });
export const appConfigStorage = storage;
/**
 * Get reactive app config
 * @param key
 * @returns
 */
export function useAppConfigStorage(key) {
    const [_config, _setConfig] = useState(storage.get());
    useEffect(() => {
        storage.set(_config);
    }, [_config]);
    const value = useMemo(() => (key ? _config[key] : _config), [_config, key]);
    const setValue = useMemo(() => {
        if (key) {
            return (value) => {
                _setConfig(cfg => ({ ...cfg, [key]: value }));
            };
        }
        else {
            return (config) => {
                _setConfig(config);
            };
        }
    }, [_setConfig, key]);
    return [value, setValue];
}
//# sourceMappingURL=use-app-config-storage.js.map