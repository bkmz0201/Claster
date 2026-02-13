import { useCallback, useSyncExternalStore } from 'react';
const getOnLineStatus = () => typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
    ? navigator.onLine
    : true;
export function useSystemOnline() {
    return useSyncExternalStore(useCallback(onStoreChange => {
        window.addEventListener('online', onStoreChange);
        window.addEventListener('offline', onStoreChange);
        return () => {
            window.removeEventListener('online', onStoreChange);
            window.removeEventListener('offline', onStoreChange);
        };
    }, []), useCallback(() => getOnLineStatus(), []), useCallback(() => true, []));
}
//# sourceMappingURL=use-system-online.js.map