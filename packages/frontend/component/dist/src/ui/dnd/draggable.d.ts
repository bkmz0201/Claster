import type { BaseEventPayload, DropTargetRecord, ElementDragType } from '@atlaskit/pragmatic-drag-and-drop/types';
import { type DNDData, type DraggableGet, type toExternalData } from './types';
export interface DraggableOptions<D extends DNDData = DNDData> {
    data?: DraggableGet<D['draggable']>;
    toExternalData?: toExternalData<D>;
    onDragStart?: (data: BaseEventPayload<ElementDragType>) => void;
    onDrag?: (data: BaseEventPayload<ElementDragType>) => void;
    onDrop?: (data: BaseEventPayload<ElementDragType>) => void;
    onDropTargetChange?: (data: BaseEventPayload<ElementDragType>) => void;
    canDrag?: DraggableGet<boolean>;
    disableDragPreview?: boolean;
    dragPreviewPosition?: DraggableDragPreviewPosition;
}
export type DraggableDragPreviewPosition = 'pointer-outside' | 'pointer-center' | 'native';
export type DraggableCustomDragPreviewProps = React.PropsWithChildren<{
    position?: DraggableDragPreviewPosition;
}>;
export declare const useDraggable: <D extends DNDData = DNDData>(getOptions?: () => DraggableOptions<D>, deps?: any[]) => {
    readonly dragging: boolean;
    readonly draggingPosition: {
        offsetX: number;
        offsetY: number;
        clientX: number;
        clientY: number;
        outWindow: boolean;
    };
    readonly CustomDragPreview: import("react").FC<DraggableCustomDragPreviewProps>;
    readonly dropTarget: (DropTargetRecord & {
        data: D["dropTarget"];
    })[];
    dragRef: import("react").RefObject<any>;
    dragHandleRef: import("react").RefObject<any>;
};
//# sourceMappingURL=draggable.d.ts.map