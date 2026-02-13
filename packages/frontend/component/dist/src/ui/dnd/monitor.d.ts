import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import type { DragLocationHistory, ElementDragType } from '@atlaskit/pragmatic-drag-and-drop/types';
import type { DNDData, fromExternalData } from './types';
export type MonitorGetFeedback<D extends DNDData = DNDData> = Parameters<NonNullable<Parameters<typeof monitorForElements>[0]['canMonitor']>>[0] & {
    source: {
        data: D['draggable'];
    };
};
type MonitorGet<T, D extends DNDData = DNDData> = T | ((data: MonitorGetFeedback<D>) => T);
export type MonitorDragEvent<D extends DNDData = DNDData> = {
    /**
     * Location history for the drag operation
     */
    location: DragLocationHistory;
    /**
     * Data associated with the entity that is being dragged
     */
    source: Exclude<ElementDragType['payload'], 'data'> & {
        data: D['draggable'];
    };
};
export interface MonitorOptions<D extends DNDData = DNDData> {
    canMonitor?: MonitorGet<boolean, D>;
    onDragStart?: (data: MonitorDragEvent<D>) => void;
    onDrag?: (data: MonitorDragEvent<D>) => void;
    onDrop?: (data: MonitorDragEvent<D>) => void;
    onDropTargetChange?: (data: MonitorDragEvent<D>) => void;
    /**
     * external data adapter.
     * Will use the external data adapter from the context if not provided.
     */
    fromExternalData?: fromExternalData<D>;
    /**
     * Make the drop target allow external data.
     * If this is undefined, it will be set to true if fromExternalData is provided.
     *
     * @default undefined
     */
    allowExternal?: boolean;
}
export declare const useDndMonitor: <D extends DNDData = DNDData>(getOptions?: () => MonitorOptions<D>, deps?: any[]) => void;
export { monitorForElements };
//# sourceMappingURL=monitor.d.ts.map