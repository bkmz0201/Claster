import { useSyncExternalStore } from 'react';
function noopSubscribe() {
    return () => { };
}
function nullGetSnapshot() {
    return null;
}
function undefinedGetSnapshot() {
    return undefined;
}
/**
 * subscribe LiveData and return the value.
 */
export function useLiveData(liveData) {
    return useSyncExternalStore(liveData ? liveData.reactSubscribe : noopSubscribe, liveData
        ? liveData.reactGetSnapshot
        : liveData === undefined
            ? undefinedGetSnapshot
            : nullGetSnapshot);
}
//# sourceMappingURL=react.js.map