import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { monitorForExternal } from '@atlaskit/pragmatic-drag-and-drop/external/adapter';
import { useContext, useEffect, useMemo } from 'react';
import { getAdaptedEventArgs } from './common';
import { DNDContext } from './context';
function monitorGet(get, options) {
    if (get === undefined) {
        return undefined;
    }
    return ((args) => {
        const adaptedArgs = getAdaptedEventArgs(args, options.fromExternalData);
        return typeof get === 'function'
            ? get(adaptedArgs)
            : {
                ...adaptedArgs,
                ...get,
            };
    });
}
export const useDndMonitor = (getOptions = () => ({}), deps = []) => {
    const dropTargetContext = useContext(DNDContext);
    const options = useMemo(() => {
        const opts = getOptions();
        const allowExternal = opts.allowExternal ?? !!opts.fromExternalData;
        return {
            ...opts,
            allowExternal,
            fromExternalData: allowExternal
                ? (opts.fromExternalData ??
                    dropTargetContext.fromExternalData)
                : undefined,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps, getOptions, dropTargetContext.fromExternalData]);
    const monitorOptions = useMemo(() => {
        return {
            canMonitor: monitorGet(options.canMonitor, options),
            onDragStart: monitorGet(options.onDragStart, options),
            onDrag: monitorGet(options.onDrag, options),
            onDrop: monitorGet(options.onDrop, options),
            onDropTargetChange: monitorGet(options.onDropTargetChange, options),
        };
    }, [options]);
    useEffect(() => {
        return monitorForElements(monitorOptions);
    }, [monitorOptions]);
    useEffect(() => {
        if (!options.fromExternalData) {
            return;
        }
        // @ts-expect-error external & element adapter types have some subtle differences
        return monitorForExternal(monitorOptions);
    }, [monitorOptions, options.fromExternalData]);
};
export { monitorForElements };
//# sourceMappingURL=monitor.js.map