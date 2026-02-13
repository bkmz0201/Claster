import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import type { DragLocationHistory, DropTargetRecord, ElementDragType, ExternalDragType } from '@atlaskit/pragmatic-drag-and-drop/types';
import { type Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { type Instruction, type ItemMode } from '@atlaskit/pragmatic-drag-and-drop-hitbox/tree-item';
import type { DNDData, fromExternalData } from './types';
export type DropTargetDropEvent<D extends DNDData> = {
    treeInstruction: Instruction | null;
    closestEdge: Edge | null;
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
    self: DropTargetRecord;
};
export type DropTargetDragEvent<D extends DNDData> = DropTargetDropEvent<D>;
export type DropTargetTreeInstruction = Instruction;
export type ExternalDragPayload = ExternalDragType['payload'];
export type DropTargetGetFeedback<D extends DNDData> = Parameters<NonNullable<Parameters<typeof dropTargetForElements>[0]['canDrop']>>[0] & {
    source: {
        data: D['draggable'];
    };
} & {
    treeInstruction: Instruction | null;
    closestEdge: Edge | null;
};
type DropTargetGet<T, D extends DNDData> = T | ((data: DropTargetGetFeedback<D>) => T);
export interface DropTargetOptions<D extends DNDData = DNDData> {
    data?: DropTargetGet<D['dropTarget'], D>;
    canDrop?: DropTargetGet<boolean, D>;
    dropEffect?: DropTargetGet<'copy' | 'link' | 'move', D>;
    isSticky?: DropTargetGet<boolean, D>;
    treeInstruction?: {
        block?: Instruction['type'][];
        mode: ItemMode;
        currentLevel: number;
        indentPerLevel: number;
    };
    closestEdge?: {
        allowedEdges: Edge[];
    };
    onDrop?: (data: DropTargetDropEvent<D>) => void;
    onDrag?: (data: DropTargetDragEvent<D>) => void;
    onDragEnter?: (data: DropTargetDragEvent<D>) => void;
    onDragLeave?: (data: DropTargetDragEvent<D>) => void;
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
export declare const useDropTarget: <D extends DNDData = DNDData>(getOptions?: () => DropTargetOptions<D>, deps?: any[]) => {
    dropTargetRef: import("react").RefObject<any>;
    readonly draggedOver: boolean;
    readonly draggedOverDraggable: (import("@atlaskit/pragmatic-drag-and-drop/element/adapter").ElementDragPayload & {
        data: D["draggable"];
    }) | null;
    readonly draggedOverPosition: {
        /**
         * relative position to the drop target element top-left corner
         */
        relativeX: number;
        relativeY: number;
        clientX: number;
        clientY: number;
    };
    readonly dropEffect: "link" | "copy" | "move" | null;
    treeInstruction: Instruction | null;
    closestEdge: import("@atlaskit/pragmatic-drag-and-drop-hitbox/dist/types/types").Edge | null;
};
export {};
//# sourceMappingURL=drop-target.d.ts.map