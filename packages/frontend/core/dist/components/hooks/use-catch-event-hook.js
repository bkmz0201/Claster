import {} from 'react';
import { useAsyncCallback } from './affine-async-hooks';
export const useCatchEventCallback = (cb, deps) => {
    return useAsyncCallback(async (e, ...args) => {
        e.stopPropagation();
        await cb(e, ...args);
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps);
};
//# sourceMappingURL=use-catch-event-hook.js.map