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
import { WithDisposable } from '@blocksuite/affine/global/lit';
import { scrollbarStyle } from '@blocksuite/affine/shared/styles';
import { ShadowlessElement } from '@blocksuite/affine/std';
import { css, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import throttle from 'lodash-es/throttle';
let AIScrollableTextRenderer = (() => {
    let _classSuper = WithDisposable(ShadowlessElement);
    let _answer_decorators;
    let _answer_initializers = [];
    let _answer_extraInitializers = [];
    let _state_decorators;
    let _state_initializers = [];
    let _state_extraInitializers = [];
    let _textRendererOptions_decorators;
    let _textRendererOptions_initializers = [];
    let _textRendererOptions_extraInitializers = [];
    let _maxHeight_decorators;
    let _maxHeight_initializers = [];
    let _maxHeight_extraInitializers = [];
    let _autoScroll_decorators;
    let _autoScroll_initializers = [];
    let _autoScroll_extraInitializers = [];
    let __scrollableTextRenderer_decorators;
    let __scrollableTextRenderer_initializers = [];
    let __scrollableTextRenderer_extraInitializers = [];
    return class AIScrollableTextRenderer extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _answer_decorators = [property({ attribute: false })];
            _state_decorators = [property({ attribute: false })];
            _textRendererOptions_decorators = [property({ attribute: false })];
            _maxHeight_decorators = [property({ attribute: false })];
            _autoScroll_decorators = [property({ attribute: false })];
            __scrollableTextRenderer_decorators = [query('.ai-scrollable-text-renderer')];
            __esDecorate(this, null, _answer_decorators, { kind: "accessor", name: "answer", static: false, private: false, access: { has: obj => "answer" in obj, get: obj => obj.answer, set: (obj, value) => { obj.answer = value; } }, metadata: _metadata }, _answer_initializers, _answer_extraInitializers);
            __esDecorate(this, null, _state_decorators, { kind: "accessor", name: "state", static: false, private: false, access: { has: obj => "state" in obj, get: obj => obj.state, set: (obj, value) => { obj.state = value; } }, metadata: _metadata }, _state_initializers, _state_extraInitializers);
            __esDecorate(this, null, _textRendererOptions_decorators, { kind: "accessor", name: "textRendererOptions", static: false, private: false, access: { has: obj => "textRendererOptions" in obj, get: obj => obj.textRendererOptions, set: (obj, value) => { obj.textRendererOptions = value; } }, metadata: _metadata }, _textRendererOptions_initializers, _textRendererOptions_extraInitializers);
            __esDecorate(this, null, _maxHeight_decorators, { kind: "accessor", name: "maxHeight", static: false, private: false, access: { has: obj => "maxHeight" in obj, get: obj => obj.maxHeight, set: (obj, value) => { obj.maxHeight = value; } }, metadata: _metadata }, _maxHeight_initializers, _maxHeight_extraInitializers);
            __esDecorate(this, null, _autoScroll_decorators, { kind: "accessor", name: "autoScroll", static: false, private: false, access: { has: obj => "autoScroll" in obj, get: obj => obj.autoScroll, set: (obj, value) => { obj.autoScroll = value; } }, metadata: _metadata }, _autoScroll_initializers, _autoScroll_extraInitializers);
            __esDecorate(this, null, __scrollableTextRenderer_decorators, { kind: "accessor", name: "_scrollableTextRenderer", static: false, private: false, access: { has: obj => "_scrollableTextRenderer" in obj, get: obj => obj._scrollableTextRenderer, set: (obj, value) => { obj._scrollableTextRenderer = value; } }, metadata: _metadata }, __scrollableTextRenderer_initializers, __scrollableTextRenderer_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .ai-scrollable-text-renderer {
      overflow-y: auto;
    }

    ${scrollbarStyle('.ai-scrollable-text-renderer')};
  `; }
        updated(_changedProperties) {
            if (this.autoScroll &&
                _changedProperties.has('answer') &&
                (this.state === 'generating' || this.state === 'finished')) {
                this._throttledScrollToEnd();
            }
        }
        render() {
            const { answer, state, textRendererOptions } = this;
            return html ` <style>
        .ai-scrollable-text-renderer {
          max-height: ${this.maxHeight}px;
        }
      </style>
      <div class="ai-scrollable-text-renderer" @wheel=${this._onWheel}>
        <text-renderer
          .answer=${answer}
          .state=${state}
          .options=${textRendererOptions}
        ></text-renderer>
      </div>`;
        }
        #answer_accessor_storage;
        get answer() { return this.#answer_accessor_storage; }
        set answer(value) { this.#answer_accessor_storage = value; }
        #state_accessor_storage;
        get state() { return this.#state_accessor_storage; }
        set state(value) { this.#state_accessor_storage = value; }
        #textRendererOptions_accessor_storage;
        get textRendererOptions() { return this.#textRendererOptions_accessor_storage; }
        set textRendererOptions(value) { this.#textRendererOptions_accessor_storage = value; }
        #maxHeight_accessor_storage;
        get maxHeight() { return this.#maxHeight_accessor_storage; }
        set maxHeight(value) { this.#maxHeight_accessor_storage = value; }
        #autoScroll_accessor_storage;
        get autoScroll() { return this.#autoScroll_accessor_storage; }
        set autoScroll(value) { this.#autoScroll_accessor_storage = value; }
        #_scrollableTextRenderer_accessor_storage;
        get _scrollableTextRenderer() { return this.#_scrollableTextRenderer_accessor_storage; }
        set _scrollableTextRenderer(value) { this.#_scrollableTextRenderer_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._lastScrollHeight = 0;
            this._scrollToEnd = () => {
                requestAnimationFrame(() => {
                    if (!this._scrollableTextRenderer) {
                        return;
                    }
                    const scrollHeight = this._scrollableTextRenderer.scrollHeight || 0;
                    if (scrollHeight > this._lastScrollHeight) {
                        this._lastScrollHeight = scrollHeight;
                        // Scroll when scroll height greater than maxheight
                        this._scrollableTextRenderer?.scrollTo({
                            top: scrollHeight,
                        });
                    }
                });
            };
            this._throttledScrollToEnd = throttle(this._scrollToEnd, 300);
            this._onWheel = (e) => {
                e.stopPropagation();
                if (this.state === 'generating') {
                    e.preventDefault();
                }
            };
            this.#answer_accessor_storage = __runInitializers(this, _answer_initializers, void 0);
            this.#state_accessor_storage = (__runInitializers(this, _answer_extraInitializers), __runInitializers(this, _state_initializers, void 0));
            this.#textRendererOptions_accessor_storage = (__runInitializers(this, _state_extraInitializers), __runInitializers(this, _textRendererOptions_initializers, void 0));
            this.#maxHeight_accessor_storage = (__runInitializers(this, _textRendererOptions_extraInitializers), __runInitializers(this, _maxHeight_initializers, 320));
            this.#autoScroll_accessor_storage = (__runInitializers(this, _maxHeight_extraInitializers), __runInitializers(this, _autoScroll_initializers, true));
            this.#_scrollableTextRenderer_accessor_storage = (__runInitializers(this, _autoScroll_extraInitializers), __runInitializers(this, __scrollableTextRenderer_initializers, null));
            __runInitializers(this, __scrollableTextRenderer_extraInitializers);
        }
    };
})();
export { AIScrollableTextRenderer };
export const createAIScrollableTextRenderer = (textRendererOptions, maxHeight, autoScroll) => {
    return (answer, state) => {
        return html `<ai-scrollable-text-renderer
      .answer=${answer}
      .state=${state}
      .textRendererOptions=${textRendererOptions}
      .maxHeight=${maxHeight}
      .autoScroll=${autoScroll}
    ></ai-scrollable-text-renderer>`;
    };
};
//# sourceMappingURL=ai-scrollable-text-renderer.js.map