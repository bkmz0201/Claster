import type { PointerEventState } from '@blocksuite/affine/std';
import { BaseTool, type GfxModel } from '@blocksuite/affine/std/gfx';
import { Subject } from 'rxjs';
export declare class CopilotTool extends BaseTool {
    static toolName: string;
    private _dragging;
    draggingAreaUpdated: Subject<boolean | void>;
    dragLastPoint: [number, number];
    dragStartPoint: [number, number];
    get allowDragWithRightButton(): boolean;
    get area(): DOMRect;
    get processing(): boolean;
    get selectedElements(): GfxModel[];
    private initDragState;
    private clearDragState;
    abort(): void;
    activate(): void;
    deactivate(): void;
    dragEnd(): void;
    dragMove(e: PointerEventState): void;
    dragStart(e: PointerEventState): void;
    mounted(): void;
    pointerDown(e: PointerEventState): void;
    private isUseCopilot;
    updateDragPointsWith(selectedElements: GfxModel[], padding?: number): void;
    updateSelectionWith(selectedElements: GfxModel[], padding?: number): void;
}
//# sourceMappingURL=copilot-tool.d.ts.map