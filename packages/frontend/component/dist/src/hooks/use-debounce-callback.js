import { debounce } from 'lodash-es';
import { useEffect, useMemo, useRef } from 'react';
export const useDebounceCallback = (callback, delay, options) => {
    const callbackRef = useRef(callback);
    const debouncedCallback = useMemo(() => debounce(callbackRef.current, delay, options), [delay, options]);
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);
    useEffect(() => {
        return () => {
            debouncedCallback.cancel();
        };
    }, [debouncedCallback]);
    return debouncedCallback;
};
//# sourceMappingURL=use-debounce-callback.js.map