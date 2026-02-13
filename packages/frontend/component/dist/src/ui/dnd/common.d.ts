import type { DNDData, fromExternalData } from './types';
export declare const isExternalDrag: <D extends DNDData>(args: {
    source: {
        data: D["draggable"];
    };
}) => boolean;
export declare const getAdaptedEventArgs: <D extends DNDData, Args extends {
    source: {
        data: D["draggable"];
    };
}>(args: Args, fromExternalData?: fromExternalData<D>, isDropEvent?: boolean) => Args;
//# sourceMappingURL=common.d.ts.map