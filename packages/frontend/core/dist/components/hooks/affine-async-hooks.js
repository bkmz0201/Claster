import React, {} from 'react';
/**
 * App should provide a global error handler for async callback in the root.
 */
export const AsyncCallbackContext = React.createContext(e => {
    console.error(e);
});
/**
 * Translate async function to sync function and handle error automatically.
 * Only accept void function, return data here is meaningless.
 */
export function useAsyncCallback(callback, deps) {
    const handleAsyncError = React.useContext(AsyncCallbackContext);
    return React.useCallback((...args) => {
        // oxlint-disable-next-line exhaustive-deps
        callback(...args).catch(e => handleAsyncError(e));
    }, [...deps] // eslint-disable-line react-hooks/exhaustive-deps
    );
}
//# sourceMappingURL=affine-async-hooks.js.map