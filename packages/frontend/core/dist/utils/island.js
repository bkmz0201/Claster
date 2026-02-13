import { jsx as _jsx } from "react/jsx-runtime";
import { LiveData, useLiveData } from '@toeverything/infra';
import { nanoid } from 'nanoid';
import { forwardRef, useEffect, useImperativeHandle, useRef, } from 'react';
import { createPortal } from 'react-dom';
export const createIsland = () => {
    const targetLiveData$ = new LiveData(null);
    const provided$ = new LiveData(false);
    let mounted = false;
    return {
        id: nanoid(),
        Target: forwardRef(function IslandTarget({ ...other }, ref) {
            const target = useRef(null);
            useImperativeHandle(ref, () => target.current, []);
            useEffect(() => {
                if (mounted === true) {
                    throw new Error('Island should not be mounted more than once');
                }
                mounted = true;
                targetLiveData$.next(target.current);
                return () => {
                    mounted = false;
                    targetLiveData$.next(null);
                };
            }, []);
            return _jsx("div", { ...other, ref: target });
        }),
        Provider: ({ children }) => {
            const target = useLiveData(targetLiveData$);
            useEffect(() => {
                if (provided$.value === true && BUILD_CONFIG.debug) {
                    throw new Error('Island should not be provided more than once');
                }
                provided$.next(true);
                return () => {
                    provided$.next(false);
                };
            }, []);
            return target ? createPortal(children, target) : null;
        },
        provided$,
    };
};
//# sourceMappingURL=island.js.map