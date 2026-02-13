var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
import { WithDisposable } from '@blocksuite/global/lit';
import { batch } from '@preact/signals-core';
import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { isGfxBlockComponent, ShadowlessElement, } from '../view';
import { PropTypes, requiredProperties } from '../view/decorators/required';
import { GfxControllerIdentifier } from './identifiers';
import { GfxBlockElementModel } from './model/gfx-block-model';
import { Viewport } from './viewport';
/**
 * A wrapper around `requestConnectedFrame` that only calls at most once in one frame
 */
export function requestThrottledConnectedFrame(func, element) {
    let raqId = undefined;
    let latestArgs = [];
    return ((...args) => {
        latestArgs = args;
        if (raqId === undefined) {
            raqId = requestAnimationFrame(() => {
                raqId = undefined;
                if (!element || element.isConnected) {
                    func(...latestArgs);
                }
            });
        }
    });
}
let GfxViewportElement = (() => {
    let _classDecorators = [requiredProperties({
            viewport: PropTypes.instanceOf(Viewport),
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = WithDisposable(ShadowlessElement);
    let _getModelsInViewport_decorators;
    let _getModelsInViewport_initializers = [];
    let _getModelsInViewport_extraInitializers = [];
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _maxConcurrentRenders_decorators;
    let _maxConcurrentRenders_initializers = [];
    let _maxConcurrentRenders_extraInitializers = [];
    let _enableChildrenSchedule_decorators;
    let _enableChildrenSchedule_initializers = [];
    let _enableChildrenSchedule_extraInitializers = [];
    let _viewport_decorators;
    let _viewport_initializers = [];
    let _viewport_extraInitializers = [];
    var GfxViewportElement = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _getModelsInViewport_decorators = [property({ attribute: false })];
            _host_decorators = [property({ attribute: false })];
            _maxConcurrentRenders_decorators = [property({ type: Number })];
            _enableChildrenSchedule_decorators = [property({ attribute: false })];
            _viewport_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _getModelsInViewport_decorators, { kind: "accessor", name: "getModelsInViewport", static: false, private: false, access: { has: obj => "getModelsInViewport" in obj, get: obj => obj.getModelsInViewport, set: (obj, value) => { obj.getModelsInViewport = value; } }, metadata: _metadata }, _getModelsInViewport_initializers, _getModelsInViewport_extraInitializers);
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _maxConcurrentRenders_decorators, { kind: "accessor", name: "maxConcurrentRenders", static: false, private: false, access: { has: obj => "maxConcurrentRenders" in obj, get: obj => obj.maxConcurrentRenders, set: (obj, value) => { obj.maxConcurrentRenders = value; } }, metadata: _metadata }, _maxConcurrentRenders_initializers, _maxConcurrentRenders_extraInitializers);
            __esDecorate(this, null, _enableChildrenSchedule_decorators, { kind: "accessor", name: "enableChildrenSchedule", static: false, private: false, access: { has: obj => "enableChildrenSchedule" in obj, get: obj => obj.enableChildrenSchedule, set: (obj, value) => { obj.enableChildrenSchedule = value; } }, metadata: _metadata }, _enableChildrenSchedule_initializers, _enableChildrenSchedule_extraInitializers);
            __esDecorate(this, null, _viewport_decorators, { kind: "accessor", name: "viewport", static: false, private: false, access: { has: obj => "viewport" in obj, get: obj => obj.viewport, set: (obj, value) => { obj.viewport = value; } }, metadata: _metadata }, _viewport_initializers, _viewport_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            GfxViewportElement = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    gfx-viewport {
      position: absolute;
      left: 0;
      top: 0;
      contain: size layout style;
      display: block;
      transform: none;
    }

    /* CSS for idle blocks that are hidden but maintain layout */
    .block-idle {
      visibility: hidden;
      pointer-events: none;
      will-change: transform;
      contain: size layout style;
    }

    /* CSS for active blocks participating in viewport transformations */
    .block-active {
      visibility: visible;
      pointer-events: auto;
    }
  `; }
        connectedCallback() {
            super.connectedCallback();
            const viewportUpdateCallback = () => {
                this._refreshViewport();
            };
            if (!this.enableChildrenSchedule) {
                delete this.scheduleUpdateChildren;
            }
            this._hideOutsideAndNoSelectedBlock();
            this.disposables.add(this.viewport.viewportUpdated.subscribe(() => viewportUpdateCallback()));
            this.disposables.add(this.viewport.sizeUpdated.subscribe(() => viewportUpdateCallback()));
        }
        render() {
            return html ``;
        }
        _getSelectedModels() {
            if (!this.host)
                return new Set();
            const gfx = this.host.std.get(GfxControllerIdentifier);
            return new Set(gfx.selection.surfaceSelections
                .flatMap(({ elements }) => elements)
                .map(id => gfx.getElementById(id))
                .filter(e => e instanceof GfxBlockElementModel));
        }
        #getModelsInViewport_accessor_storage;
        get getModelsInViewport() { return this.#getModelsInViewport_accessor_storage; }
        set getModelsInViewport(value) { this.#getModelsInViewport_accessor_storage = value; }
        #host_accessor_storage;
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #maxConcurrentRenders_accessor_storage;
        get maxConcurrentRenders() { return this.#maxConcurrentRenders_accessor_storage; }
        set maxConcurrentRenders(value) { this.#maxConcurrentRenders_accessor_storage = value; }
        #enableChildrenSchedule_accessor_storage;
        get enableChildrenSchedule() { return this.#enableChildrenSchedule_accessor_storage; }
        set enableChildrenSchedule(value) { this.#enableChildrenSchedule_accessor_storage = value; }
        #viewport_accessor_storage;
        get viewport() { return this.#viewport_accessor_storage; }
        set viewport(value) { this.#viewport_accessor_storage = value; }
        setBlocksActive(blockIds) {
            if (!this.host)
                return;
            const gfx = this.host.std.get(GfxControllerIdentifier);
            batch(() => {
                blockIds.forEach(id => {
                    const view = gfx.view.get(id);
                    if (isGfxBlockComponent(view)) {
                        view.transformState$.value = 'active';
                    }
                });
            });
        }
        setBlocksIdle(blockIds) {
            if (!this.host)
                return;
            const gfx = this.host.std.get(GfxControllerIdentifier);
            batch(() => {
                blockIds.forEach(id => {
                    const view = gfx.view.get(id);
                    if (isGfxBlockComponent(view)) {
                        view.transformState$.value = 'idle';
                    }
                });
            });
        }
        constructor() {
            super(...arguments);
            this._hideOutsideAndNoSelectedBlock = () => {
                if (!this.host)
                    return;
                const gfx = this.host.std.get(GfxControllerIdentifier);
                const currentViewportModels = this.getModelsInViewport();
                const currentSelectedModels = this._getSelectedModels();
                const shouldBeVisible = new Set([
                    ...currentViewportModels,
                    ...currentSelectedModels,
                ]);
                const previousVisible = this._lastVisibleModels
                    ? new Set(this._lastVisibleModels)
                    : new Set();
                batch(() => {
                    // Step 1: Activate all the blocks that should be visible
                    shouldBeVisible.forEach(model => {
                        const view = gfx.view.get(model);
                        if (!isGfxBlockComponent(view))
                            return;
                        view.transformState$.value = 'active';
                    });
                    // Step 2: Hide all the blocks that should not be visible
                    previousVisible.forEach(model => {
                        if (shouldBeVisible.has(model))
                            return;
                        const view = gfx.view.get(model);
                        if (!isGfxBlockComponent(view))
                            return;
                        view.transformState$.value = 'idle';
                    });
                });
                this._lastVisibleModels = shouldBeVisible;
            };
            this._pendingChildrenUpdates = [];
            this._refreshViewport = requestThrottledConnectedFrame(() => {
                this._hideOutsideAndNoSelectedBlock();
            }, this);
            this._updatingChildrenFlag = false;
            this.scheduleUpdateChildren = (id) => {
                const { promise, resolve } = Promise.withResolvers();
                this._pendingChildrenUpdates.push({ id, resolve });
                if (!this._updatingChildrenFlag) {
                    this._updatingChildrenFlag = true;
                    const schedule = () => {
                        if (this._pendingChildrenUpdates.length) {
                            const childToUpdates = this._pendingChildrenUpdates.splice(0, this.maxConcurrentRenders);
                            childToUpdates.forEach(({ resolve }) => resolve());
                            if (this._pendingChildrenUpdates.length) {
                                requestAnimationFrame(() => {
                                    this.isConnected && schedule();
                                });
                            }
                            else {
                                this._updatingChildrenFlag = false;
                            }
                        }
                    };
                    requestAnimationFrame(() => {
                        this.isConnected && schedule();
                    });
                }
                return promise;
            };
            this.#getModelsInViewport_accessor_storage = __runInitializers(this, _getModelsInViewport_initializers, () => new Set());
            this.#host_accessor_storage = (__runInitializers(this, _getModelsInViewport_extraInitializers), __runInitializers(this, _host_initializers, void 0));
            this.#maxConcurrentRenders_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _maxConcurrentRenders_initializers, 2));
            this.#enableChildrenSchedule_accessor_storage = (__runInitializers(this, _maxConcurrentRenders_extraInitializers), __runInitializers(this, _enableChildrenSchedule_initializers, true));
            this.#viewport_accessor_storage = (__runInitializers(this, _enableChildrenSchedule_extraInitializers), __runInitializers(this, _viewport_initializers, void 0));
            __runInitializers(this, _viewport_extraInitializers);
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return GfxViewportElement = _classThis;
})();
export { GfxViewportElement };
//# sourceMappingURL=viewport-element.js.map