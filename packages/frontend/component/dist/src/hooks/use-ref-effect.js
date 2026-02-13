/**
 * modified version of useRefEffect from https://github.com/jantimon/react-use-ref-effect/blob/master/src/index.tsx
 */
import { useDebugValue, useEffect, useState } from 'react';
// internalRef is used as a reference and therefore save to be used inside an effect
/* eslint-disable react-hooks/exhaustive-deps */
// the `process.env.NODE_ENV !== 'production'` condition is resolved by the build tool
const noop = () => { };
/**
 * `useRefEffect` returns a mutable ref object to be connected with a DOM Node.
 *
 * The returned object will persist for the full lifetime of the component.
 * Accepts a function that contains imperative, possibly effectful code.
 *
 * @param effect Imperative function that can return a cleanup function
 * @param deps If present, effect will only activate if the ref or the values in the list change.
 */
export const useRefEffect = (effect, dependencies = []) => {
    // Use the initial state as mutable reference
    const internalRef = useState(() => {
        let currentValue = null;
        let cleanupPreviousEffect = noop;
        let currentDeps;
        /**
         * React.RefCallback
         */
        const setRefValue = (newElement) => {
            // Only execute if dependencies or element changed:
            if (internalRef.dependencies_ !== currentDeps ||
                currentValue !== newElement) {
                currentValue = newElement;
                currentDeps = internalRef.dependencies_;
                internalRef.cleanup_();
                if (newElement) {
                    cleanupPreviousEffect = internalRef.effect_(newElement) || noop;
                }
            }
        };
        return {
            /** Execute the effects cleanup function */
            cleanup_: () => {
                cleanupPreviousEffect();
                cleanupPreviousEffect = noop;
            },
            ref_: Object.defineProperty(setRefValue, 'current', {
                get: () => currentValue,
                set: setRefValue,
            }),
        };
    })[0];
    // Show the current ref value in development
    // in react dev tools
    if (BUILD_CONFIG.debug) {
        useDebugValue(internalRef.ref_.current);
    }
    // Keep a ref to the latest callback
    internalRef.effect_ = effect;
    useEffect(() => {
        // Run effect if dependencies change
        internalRef.ref_(internalRef.ref_.current);
        return () => {
            if (internalRef.dependencies_ === dependencies) {
                internalRef.cleanup_();
                internalRef.dependencies_ = [];
            }
        };
    }, // Keep a ref to the latest dependencies
    (internalRef.dependencies_ = dependencies));
    return internalRef.ref_;
};
//# sourceMappingURL=use-ref-effect.js.map