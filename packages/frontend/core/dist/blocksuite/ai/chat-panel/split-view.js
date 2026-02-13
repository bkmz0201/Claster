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
import { SignalWatcher, WithDisposable } from '@blocksuite/affine/global/lit';
import { ShadowlessElement } from '@blocksuite/std';
import { css, html, nothing, } from 'lit';
import { property, query, state } from 'lit/decorators.js';
let ChatPanelSplitView = (() => {
    let _classSuper = SignalWatcher(WithDisposable(ShadowlessElement));
    let _minWidthPercent_decorators;
    let _minWidthPercent_initializers = [];
    let _minWidthPercent_extraInitializers = [];
    let _open_decorators;
    let _open_initializers = [];
    let _open_extraInitializers = [];
    let _left_decorators;
    let _left_initializers = [];
    let _left_extraInitializers = [];
    let _right_decorators;
    let _right_initializers = [];
    let _right_extraInitializers = [];
    let __handle_decorators;
    let __handle_initializers = [];
    let __handle_extraInitializers = [];
    let __left_decorators;
    let __left_initializers = [];
    let __left_extraInitializers = [];
    let __right_decorators;
    let __right_initializers = [];
    let __right_extraInitializers = [];
    let _isDragging_decorators;
    let _isDragging_initializers = [];
    let _isDragging_extraInitializers = [];
    let _isTransitioning_decorators;
    let _isTransitioning_initializers = [];
    let _isTransitioning_extraInitializers = [];
    return class ChatPanelSplitView extends _classSuper {
        constructor() {
            super(...arguments);
            this.#minWidthPercent_accessor_storage = __runInitializers(this, _minWidthPercent_initializers, 20);
            this.#open_accessor_storage = (__runInitializers(this, _minWidthPercent_extraInitializers), __runInitializers(this, _open_initializers, false));
            this.#left_accessor_storage = (__runInitializers(this, _open_extraInitializers), __runInitializers(this, _left_initializers, null));
            this.#right_accessor_storage = (__runInitializers(this, _left_extraInitializers), __runInitializers(this, _right_initializers, null));
            this.#_handle_accessor_storage = (__runInitializers(this, _right_extraInitializers), __runInitializers(this, __handle_initializers, void 0));
            this.#_left_accessor_storage = (__runInitializers(this, __handle_extraInitializers), __runInitializers(this, __left_initializers, void 0));
            this.#_right_accessor_storage = (__runInitializers(this, __left_extraInitializers), __runInitializers(this, __right_initializers, void 0));
            this.#isDragging_accessor_storage = (__runInitializers(this, __right_extraInitializers), __runInitializers(this, _isDragging_initializers, false));
            this.#isTransitioning_accessor_storage = (__runInitializers(this, _isDragging_extraInitializers), __runInitializers(this, _isTransitioning_initializers, false));
            this._storeKey = (__runInitializers(this, _isTransitioning_extraInitializers), 'chat-panel-split-view-size');
            this._percent = this._getInitialSize();
            this._initialBox = null;
            this._initialX = null;
            this._initialPercent = null;
            this._rafId = null;
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _minWidthPercent_decorators = [property({ attribute: false })];
            _open_decorators = [property({ attribute: false })];
            _left_decorators = [property({ attribute: false })];
            _right_decorators = [property({ attribute: false })];
            __handle_decorators = [query('.ai-chat-panel-split-view-divider-handle')];
            __left_decorators = [query('.ai-chat-panel-split-view-left')];
            __right_decorators = [query('.ai-chat-panel-split-view-right')];
            _isDragging_decorators = [state()];
            _isTransitioning_decorators = [state()];
            __esDecorate(this, null, _minWidthPercent_decorators, { kind: "accessor", name: "minWidthPercent", static: false, private: false, access: { has: obj => "minWidthPercent" in obj, get: obj => obj.minWidthPercent, set: (obj, value) => { obj.minWidthPercent = value; } }, metadata: _metadata }, _minWidthPercent_initializers, _minWidthPercent_extraInitializers);
            __esDecorate(this, null, _open_decorators, { kind: "accessor", name: "open", static: false, private: false, access: { has: obj => "open" in obj, get: obj => obj.open, set: (obj, value) => { obj.open = value; } }, metadata: _metadata }, _open_initializers, _open_extraInitializers);
            __esDecorate(this, null, _left_decorators, { kind: "accessor", name: "left", static: false, private: false, access: { has: obj => "left" in obj, get: obj => obj.left, set: (obj, value) => { obj.left = value; } }, metadata: _metadata }, _left_initializers, _left_extraInitializers);
            __esDecorate(this, null, _right_decorators, { kind: "accessor", name: "right", static: false, private: false, access: { has: obj => "right" in obj, get: obj => obj.right, set: (obj, value) => { obj.right = value; } }, metadata: _metadata }, _right_initializers, _right_extraInitializers);
            __esDecorate(this, null, __handle_decorators, { kind: "accessor", name: "_handle", static: false, private: false, access: { has: obj => "_handle" in obj, get: obj => obj._handle, set: (obj, value) => { obj._handle = value; } }, metadata: _metadata }, __handle_initializers, __handle_extraInitializers);
            __esDecorate(this, null, __left_decorators, { kind: "accessor", name: "_left", static: false, private: false, access: { has: obj => "_left" in obj, get: obj => obj._left, set: (obj, value) => { obj._left = value; } }, metadata: _metadata }, __left_initializers, __left_extraInitializers);
            __esDecorate(this, null, __right_decorators, { kind: "accessor", name: "_right", static: false, private: false, access: { has: obj => "_right" in obj, get: obj => obj._right, set: (obj, value) => { obj._right = value; } }, metadata: _metadata }, __right_initializers, __right_extraInitializers);
            __esDecorate(this, null, _isDragging_decorators, { kind: "accessor", name: "isDragging", static: false, private: false, access: { has: obj => "isDragging" in obj, get: obj => obj.isDragging, set: (obj, value) => { obj.isDragging = value; } }, metadata: _metadata }, _isDragging_initializers, _isDragging_extraInitializers);
            __esDecorate(this, null, _isTransitioning_decorators, { kind: "accessor", name: "isTransitioning", static: false, private: false, access: { has: obj => "isTransitioning" in obj, get: obj => obj.isTransitioning, set: (obj, value) => { obj.isTransitioning = value; } }, metadata: _metadata }, _isTransitioning_initializers, _isTransitioning_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .ai-chat-panel-split-view {
      --gap: 0px;
      --drag-size: 10px;
      display: flex;
      align-items: stretch;
      height: 100%;
    }
    .ai-chat-panel-split-view[data-dragging='true'] {
      cursor: col-resize;
    }
    .ai-chat-panel-split-view-right {
      position: relative;
    }
    .ai-chat-panel-split-view-left,
    .ai-chat-panel-split-view-right,
    .ai-chat-panel-split-view-divider {
      flex-shrink: 0;
      flex-grow: 0;
    }
    .ai-chat-panel-split-view-left,
    .ai-chat-panel-split-view-right {
      transition: width 0.23s ease;
    }
    .ai-chat-panel-split-view[data-dragging='true']
      .ai-chat-panel-split-view-left,
    .ai-chat-panel-split-view[data-dragging='true']
      .ai-chat-panel-split-view-right {
      transition: none;
    }
    .ai-chat-panel-split-view-divider {
      width: var(--gap);
      position: relative;
    }
    .ai-chat-panel-split-view[data-open='false']
      .ai-chat-panel-split-view-divider {
      width: 0;
      visibility: hidden;
      pointer-events: none;
    }
    .ai-chat-panel-split-view-divider-handle {
      width: var(--drag-size);
      height: 100%;
      position: absolute;
      top: 0;
      left: calc((var(--drag-size) - var(--gap)) / 2 * -1);
      cursor: col-resize;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ai-chat-panel-split-view-divider-handle::after {
      content: '';
      width: 2px;
      height: 100%;
      background-color: var(--affine-v2-button-primary);
      opacity: 0;
      transition:
        opacity 0.23s ease,
        width 0.23s ease;
    }
    .ai-chat-panel-split-view[data-dragging='true']
      .ai-chat-panel-split-view-divider-handle::after {
      width: 4px;
      opacity: 1;
    }
    .ai-chat-panel-split-view-divider-handle:hover::after {
      opacity: 1;
    }
  `; }
        #minWidthPercent_accessor_storage;
        get minWidthPercent() { return this.#minWidthPercent_accessor_storage; }
        set minWidthPercent(value) { this.#minWidthPercent_accessor_storage = value; }
        #open_accessor_storage;
        get open() { return this.#open_accessor_storage; }
        set open(value) { this.#open_accessor_storage = value; }
        #left_accessor_storage;
        get left() { return this.#left_accessor_storage; }
        set left(value) { this.#left_accessor_storage = value; }
        #right_accessor_storage;
        get right() { return this.#right_accessor_storage; }
        set right(value) { this.#right_accessor_storage = value; }
        #_handle_accessor_storage;
        get _handle() { return this.#_handle_accessor_storage; }
        set _handle(value) { this.#_handle_accessor_storage = value; }
        #_left_accessor_storage;
        get _left() { return this.#_left_accessor_storage; }
        set _left(value) { this.#_left_accessor_storage = value; }
        #_right_accessor_storage;
        get _right() { return this.#_right_accessor_storage; }
        set _right(value) { this.#_right_accessor_storage = value; }
        #isDragging_accessor_storage;
        get isDragging() { return this.#isDragging_accessor_storage; }
        set isDragging(value) { this.#isDragging_accessor_storage = value; }
        #isTransitioning_accessor_storage;
        get isTransitioning() { return this.#isTransitioning_accessor_storage; }
        set isTransitioning(value) { this.#isTransitioning_accessor_storage = value; }
        _getInitialSize() {
            try {
                const last = localStorage.getItem(this._storeKey);
                return last ? Number.parseInt(last) : 50;
            }
            catch {
                return 50;
            }
        }
        _setInitialSize(size) {
            try {
                localStorage.setItem(this._storeKey, size.toString());
            }
            catch {
                console.error('Failed to set initial size');
            }
        }
        _onDragStart(x) {
            this.isDragging = true;
            this._initialBox = this.getBoundingClientRect();
            this._initialX = x;
            this._initialPercent = this._percent;
        }
        _onDragMove(x) {
            const offset = x - (this._initialX || 0);
            const offsetPercent = (offset / (this._initialBox?.width || 1)) * 100;
            this._percent = Math.max(this.minWidthPercent, Math.min(100 - this.minWidthPercent, Number(((this._initialPercent || 0) + offsetPercent).toFixed(0))));
            this._updateSize();
        }
        _onDragEnd() {
            this.isDragging = false;
            this._setInitialSize(this._percent);
        }
        _updateSize() {
            if (this._rafId) {
                cancelAnimationFrame(this._rafId);
            }
            this._rafId = requestAnimationFrame(() => {
                if (this.open && this._left && this._right) {
                    const leftPercent = this._percent;
                    const rightPercent = 100 - leftPercent;
                    this._left.style.width = `${leftPercent}%`;
                    this._right.style.width = `${rightPercent}%`;
                }
                if (!this.open && this._left) {
                    this._left.style.width = '100%';
                }
            });
        }
        firstUpdated(changed) {
            super.firstUpdated(changed);
            if (this._left) {
                this.disposables.addFromEvent(this._left, 'transitionstart', () => {
                    this.isTransitioning = true;
                });
                this.disposables.addFromEvent(this._left, 'transitionend', () => {
                    this.isTransitioning = false;
                });
            }
            if (this._handle) {
                // mouse
                let onMouseMove = (e) => {
                    this._onDragMove(e.clientX);
                };
                const onMouseUp = () => {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                    this._onDragEnd();
                };
                this.disposables.addFromEvent(this._handle, 'mousedown', e => {
                    e.stopPropagation();
                    e.preventDefault();
                    this._onDragStart(e.clientX);
                    document.addEventListener('mousemove', onMouseMove);
                    document.addEventListener('mouseup', onMouseUp);
                });
                // touch
                let onTouchMove = (e) => {
                    this._onDragMove(e.touches[0].clientX);
                };
                const onTouchEnd = () => {
                    document.removeEventListener('touchmove', onTouchMove);
                    document.removeEventListener('touchend', onTouchEnd);
                    this._onDragEnd();
                };
                this.disposables.addFromEvent(this._handle, 'touchstart', e => {
                    e.stopPropagation();
                    e.preventDefault();
                    this._onDragStart(e.touches[0].clientX);
                    document.addEventListener('touchmove', onTouchMove);
                    document.addEventListener('touchend', onTouchEnd);
                });
            }
        }
        updated(changed) {
            super.updated(changed);
            if (changed.has('open')) {
                this._updateSize();
            }
        }
        render() {
            return html `<div
      class="ai-chat-panel-split-view"
      data-open=${this.open}
      data-dragging=${this.isDragging}
    >
      <div class="ai-chat-panel-split-view-left">${this.left}</div>
      <div class="ai-chat-panel-split-view-divider">
        <div class="ai-chat-panel-split-view-divider-handle"></div>
      </div>
      ${this.open || this.isTransitioning
                ? html ` <div class="ai-chat-panel-split-view-right">${this.right}</div>`
                : nothing}
    </div>`;
        }
    };
})();
export { ChatPanelSplitView };
//# sourceMappingURL=split-view.js.map