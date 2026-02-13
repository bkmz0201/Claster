var _a;
import { BlockSuiteError, ErrorCode } from '@blocksuite/global/exceptions';
import { Bound } from '@blocksuite/global/gfx';
import { computed, effect, signal } from '@preact/signals-core';
import { nothing } from 'lit';
import { GfxControllerIdentifier } from '../../gfx/identifiers.js';
import { SurfaceSelection } from '../../selection/index.js';
import { BlockComponent } from './block-component.js';
export function isGfxBlockComponent(element) {
    return element?.[GfxElementSymbol] === true;
}
export const GfxElementSymbol = Symbol('GfxElement');
function updateTransform(element) {
    if (element.transformState$.value === 'idle')
        return;
    const { viewport } = element.gfx;
    element.dataset.viewportState = viewport.serializeRecord();
    element.style.transformOrigin = '0 0';
    element.style.transform = element.getCSSTransform();
}
function updateBlockVisibility(view) {
    if (view.transformState$.value === 'active') {
        view.style.visibility = 'visible';
        view.style.pointerEvents = 'auto';
        view.classList.remove('block-idle');
        view.classList.add('block-active');
    }
    else {
        view.style.visibility = 'hidden';
        view.style.pointerEvents = 'none';
        view.classList.remove('block-active');
        view.classList.add('block-idle');
    }
}
function handleGfxConnection(instance) {
    instance.style.position = 'absolute';
    instance.disposables.add(instance.gfx.viewport.viewportUpdated.subscribe(() => {
        updateTransform(instance);
    }));
    instance.disposables.add(instance.store.slots.blockUpdated.subscribe(({ type, id }) => {
        if (id === instance.model.id && type === 'update') {
            updateTransform(instance);
        }
    }));
    instance.disposables.add(effect(() => {
        updateBlockVisibility(instance);
        updateTransform(instance);
    }));
}
export class GfxBlockComponent extends BlockComponent {
    constructor() {
        super(...arguments);
        this[_a] = true;
        this.transformState$ = signal('active');
        this.onDragMove = ({ dx, dy, currentBound }) => {
            this.model.xywh = currentBound.moveDelta(dx, dy).serialize();
        };
    }
    static { _a = GfxElementSymbol; }
    get gfx() {
        return this.std.get(GfxControllerIdentifier);
    }
    connectedCallback() {
        super.connectedCallback();
        handleGfxConnection(this);
    }
    onDragStart() {
        this.model.stash('xywh');
    }
    onDragEnd() {
        this.model.pop('xywh');
    }
    onBoxSelected(_) { }
    getCSSTransform() {
        const viewport = this.gfx.viewport;
        const { translateX, translateY, zoom } = viewport;
        const bound = Bound.deserialize(this.model.xywh);
        const scaledX = bound.x * zoom;
        const scaledY = bound.y * zoom;
        const deltaX = scaledX - bound.x;
        const deltaY = scaledY - bound.y;
        return `translate(${translateX + deltaX}px, ${translateY + deltaY}px) scale(${zoom})`;
    }
    getRenderingRect() {
        const { xywh$ } = this.model;
        if (!xywh$) {
            throw new BlockSuiteError(ErrorCode.GfxBlockElementError, `Error on rendering '${this.model.flavour}': Gfx block's model should have 'xywh' property.`);
        }
        const [x, y, w, h] = JSON.parse(xywh$.value);
        return { x, y, w, h, zIndex: this.toZIndex() };
    }
    renderBlock() {
        const { x, y, w, h, zIndex } = this.getRenderingRect();
        if (this.style.left !== `${x}px`)
            this.style.left = `${x}px`;
        if (this.style.top !== `${y}px`)
            this.style.top = `${y}px`;
        if (this.style.width !== `${w}px`)
            this.style.width = `${w}px`;
        if (this.style.height !== `${h}px`)
            this.style.height = `${h}px`;
        if (this.style.zIndex !== zIndex)
            this.style.zIndex = zIndex;
        return this.renderGfxBlock();
    }
    renderGfxBlock() {
        return nothing;
    }
    renderPageContent() {
        return nothing;
    }
    async scheduleUpdate() {
        const parent = this.parentElement;
        if (this.hasUpdated || !parent || !('scheduleUpdateChildren' in parent)) {
            return super.scheduleUpdate();
        }
        else {
            await parent.scheduleUpdateChildren(this.model.id);
            return super.scheduleUpdate();
        }
    }
    toZIndex() {
        return this.gfx.layer.getZIndex(this.model).toString() ?? '0';
    }
    updateZIndex() {
        this.style.zIndex = this.toZIndex();
    }
}
export function toGfxBlockComponent(CustomBlock) {
    var _b;
    // @ts-expect-error ignore
    return class extends CustomBlock {
        constructor() {
            super(...arguments);
            this[_b] = true;
            this.transformState$ = signal('active');
            this.selected$ = computed(() => {
                const selection = this.std.selection.value.find(selection => selection.blockId === this.model?.id);
                if (!selection)
                    return false;
                return selection.is(SurfaceSelection);
            });
        }
        static { _b = GfxElementSymbol; }
        onDragMove({ dx, dy, currentBound }) {
            this.model.xywh = currentBound.moveDelta(dx, dy).serialize();
        }
        onDragStart() {
            this.model.stash('xywh');
        }
        onDragEnd() {
            this.model.pop('xywh');
        }
        onBoxSelected(_) { }
        get gfx() {
            return this.std.get(GfxControllerIdentifier);
        }
        connectedCallback() {
            super.connectedCallback();
            handleGfxConnection(this);
        }
        // eslint-disable-next-line sonarjs/no-identical-functions
        getCSSTransform() {
            const viewport = this.gfx.viewport;
            const { translateX, translateY, zoom } = viewport;
            const bound = Bound.deserialize(this.model.xywh);
            const scaledX = bound.x * zoom;
            const scaledY = bound.y * zoom;
            const deltaX = scaledX - bound.x;
            const deltaY = scaledY - bound.y;
            return `translate(${translateX + deltaX}px, ${translateY + deltaY}px) scale(${zoom})`;
        }
        // eslint-disable-next-line sonarjs/no-identical-functions
        getRenderingRect() {
            const { xywh$ } = this.model;
            if (!xywh$) {
                throw new BlockSuiteError(ErrorCode.GfxBlockElementError, `Error on rendering '${this.model.flavour}': Gfx block's model should have 'xywh' property.`);
            }
            const [x, y, w, h] = JSON.parse(xywh$.value);
            return { x, y, w, h, zIndex: this.toZIndex() };
        }
        renderBlock() {
            const { x, y, w, h, zIndex } = this.getRenderingRect();
            this.style.left = `${x}px`;
            this.style.top = `${y}px`;
            this.style.width = typeof w === 'number' ? `${w}px` : w;
            this.style.height = typeof h === 'number' ? `${h}px` : h;
            this.style.zIndex = zIndex;
            return this.renderGfxBlock();
        }
        renderGfxBlock() {
            return this.renderPageContent();
        }
        renderPageContent() {
            return super.renderBlock();
        }
        // eslint-disable-next-line sonarjs/no-identical-functions
        async scheduleUpdate() {
            const parent = this.parentElement;
            if (this.hasUpdated || !parent || !('scheduleUpdateChildren' in parent)) {
                return super.scheduleUpdate();
            }
            else {
                await parent.scheduleUpdateChildren(this.model.id);
                return super.scheduleUpdate();
            }
        }
        toZIndex() {
            return this.gfx.layer.getZIndex(this.model).toString() ?? '0';
        }
        updateZIndex() {
            this.style.zIndex = this.toZIndex();
        }
    };
}
//# sourceMappingURL=gfx-block-component.js.map