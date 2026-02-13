/* oxlint-disable @typescript-eslint/no-non-null-assertion */
import { DefaultTool } from '@blocksuite/affine/blocks/surface';
import { IS_MAC } from '@blocksuite/affine/global/env';
import { Bound, getCommonBoundWithRotation, } from '@blocksuite/affine/global/gfx';
import { BaseTool, MouseButton, } from '@blocksuite/affine/std/gfx';
import { on } from '@blocksuite/affine-shared/utils';
import { isEqual } from 'lodash-es';
import { Subject } from 'rxjs';
import { AFFINE_AI_PANEL_WIDGET, } from '../widgets/ai-panel/ai-panel.js';
export class CopilotTool extends BaseTool {
    constructor() {
        super(...arguments);
        this._dragging = false;
        // eslint-disable-next-line rxjs/finnish
        this.draggingAreaUpdated = new Subject();
        this.dragLastPoint = [0, 0];
        this.dragStartPoint = [0, 0];
    }
    static { this.toolName = 'copilot'; }
    get allowDragWithRightButton() {
        return true;
    }
    get area() {
        const start = new DOMPoint(this.dragStartPoint[0], this.dragStartPoint[1]);
        const end = new DOMPoint(this.dragLastPoint[0], this.dragLastPoint[1]);
        const minX = Math.min(start.x, end.x);
        const minY = Math.min(start.y, end.y);
        const maxX = Math.max(start.x, end.x);
        const maxY = Math.max(start.y, end.y);
        return new DOMRect(minX, minY, maxX - minX, maxY - minY);
    }
    // AI processing
    get processing() {
        const aiPanel = this.gfx.std.view.getWidget(AFFINE_AI_PANEL_WIDGET, this.doc.root.id);
        return aiPanel && aiPanel.state !== 'hidden';
    }
    get selectedElements() {
        return this.gfx.selection.selectedElements;
    }
    initDragState(e) {
        this.dragStartPoint = this.gfx.viewport.toModelCoord(e.x, e.y);
        this.dragLastPoint = this.dragStartPoint;
    }
    clearDragState() {
        this._dragging = false;
        this.dragStartPoint = [0, 0];
        this.dragLastPoint = [0, 0];
    }
    abort() {
        this.clearDragState();
        this.gfx.tool.setTool(DefaultTool);
    }
    activate() {
        this.gfx.viewport.locked = true;
    }
    deactivate() {
        this.gfx.viewport.locked = false;
    }
    dragEnd() {
        if (!this._dragging)
            return;
        this._dragging = false;
        this.draggingAreaUpdated.next(true);
    }
    dragMove(e) {
        if (!this._dragging)
            return;
        this.dragLastPoint = this.gfx.viewport.toModelCoord(e.x, e.y);
        const area = this.area;
        const bound = new Bound(area.x, area.y, area.width, area.height);
        if (area.width & area.height) {
            const elements = this.gfx.getElementsByBound(bound);
            const set = new Set(elements);
            this.gfx.selection.set({
                elements: Array.from(set).map(element => element.id),
                editing: false,
                inoperable: true,
            });
        }
        this.draggingAreaUpdated.next();
    }
    dragStart(e) {
        if (this.processing)
            return;
        this.initDragState(e);
        this._dragging = true;
        this.draggingAreaUpdated.next();
    }
    mounted() {
        this.addHook('pointerDown', downEvent => {
            const dispose = on(document, 'pointerup', upEvent => {
                if (this.isUseCopilot(upEvent) &&
                    isEqual(this.dragStartPoint, this.dragLastPoint)) {
                    this.abort();
                }
                dispose();
            });
            if (this.isUseCopilot(downEvent.raw)) {
                this.clearDragState();
                this.controller.setTool(CopilotTool);
                return false;
            }
            return;
        });
    }
    pointerDown(e) {
        if (this.processing) {
            e.raw.stopPropagation();
            return;
        }
        this.gfx.tool.setTool(DefaultTool);
    }
    isUseCopilot(event) {
        return (event.button === MouseButton.SECONDARY ||
            (event.button === MouseButton.MAIN && IS_MAC
                ? event.metaKey
                : event.ctrlKey));
    }
    updateDragPointsWith(selectedElements, padding = 0) {
        const bounds = getCommonBoundWithRotation(selectedElements).expand(padding / this.gfx.viewport.zoom);
        this.dragStartPoint = bounds.tl;
        this.dragLastPoint = bounds.br;
    }
    updateSelectionWith(selectedElements, padding = 0) {
        const { selection } = this.gfx;
        selection.clear();
        this.updateDragPointsWith(selectedElements, padding);
        selection.set({
            elements: selectedElements.map(e => e.id),
            editing: false,
            inoperable: true,
        });
        this.draggingAreaUpdated.next(true);
    }
}
//# sourceMappingURL=copilot-tool.js.map