import { appSettingAtom } from '@toeverything/infra';
import { useAtom } from 'jotai';
import { useCallback, useMemo } from 'react';
export function useAppSettingHelper() {
    const [appSettings, setAppSettings] = useAtom(appSettingAtom);
    const updateSettings = useCallback((key, value) => {
        setAppSettings(prevSettings => ({ ...prevSettings, [key]: value }));
    }, [setAppSettings]);
    return useMemo(() => ({
        appSettings,
        updateSettings,
    }), [appSettings, updateSettings]);
}
//# sourceMappingURL=use-app-setting-helper.js.map