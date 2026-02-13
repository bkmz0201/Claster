import { useLayoutEffect, useRef } from 'react';
export const useAutoFocus = (autoFocus) => {
    const ref = useRef(null);
    useLayoutEffect(() => {
        if (ref.current && autoFocus) {
            // to avoid clicking on something focusable(e.g MenuItem),
            // then the input will not be focused
            setTimeout(() => {
                ref.current?.focus();
            }, 0);
        }
    }, [autoFocus]);
    return ref;
};
export const useAutoSelect = (autoSelect) => {
    const ref = useRef(null);
    useLayoutEffect(() => {
        if (ref.current && autoSelect) {
            setTimeout(() => {
                ref.current?.select();
            }, 0);
        }
    }, [autoSelect, ref]);
    return ref;
};
//# sourceMappingURL=focus-and-select.js.map