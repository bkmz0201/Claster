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
import { css, html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { getAIPanelWidget } from '../utils/ai-widgets';
import { preprocessHtml } from '../utils/html';
let AIAnswerWrapper = (() => {
    let _classSuper = LitElement;
    let _options_decorators;
    let _options_initializers = [];
    let _options_extraInitializers = [];
    return class AIAnswerWrapper extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _options_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _options_decorators, { kind: "accessor", name: "options", static: false, private: false, access: { has: obj => "options" in obj, get: obj => obj.options, set: (obj, value) => { obj.options = value; } }, metadata: _metadata }, _options_initializers, _options_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      border-radius: 4px;
      border: 1px solid var(--affine-border-color);
      box-shadow: var(--affine-shadow-1);
      background: var(--affine-background-secondary-color);
      overflow: hidden;
    }

    ::slotted(.ai-answer-iframe) {
      width: 100%;
      height: 100%;
      border: none;
    }

    ::slotted(.ai-answer-image) {
      width: 100%;
      height: 100%;
    }
  `; }
        #options_accessor_storage = __runInitializers(this, _options_initializers, undefined);
        get options() { return this.#options_accessor_storage; }
        set options(value) { this.#options_accessor_storage = value; }
        render() {
            return html `<style>
        :host {
          height: ${this.options?.height
                ? this.options?.height + 'px'
                : '100%'};
        }
      </style>
      <slot></slot> `;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _options_extraInitializers);
        }
    };
})();
export { AIAnswerWrapper };
export const createIframeRenderer = (host, options) => {
    return (answer, state) => {
        if (state === 'generating') {
            const panel = getAIPanelWidget(host);
            panel.generatingElement?.updateLoadingProgress(2);
            return nothing;
        }
        if (state !== 'finished' && state !== 'error') {
            return nothing;
        }
        const template = html `<iframe
      class="ai-answer-iframe"
      sandbox="allow-scripts"
      scrolling="no"
      allowfullscreen
      .srcdoc=${preprocessHtml(answer)}
    >
    </iframe>`;
        return html `<ai-answer-wrapper .options=${options}
      >${template}</ai-answer-wrapper
    >`;
    };
};
export const createImageRenderer = (host, options) => {
    return (answer, state) => {
        if (state === 'generating') {
            const panel = getAIPanelWidget(host);
            panel.generatingElement?.updateLoadingProgress(2);
            return nothing;
        }
        if (state !== 'finished' && state !== 'error') {
            return nothing;
        }
        const template = html `<style>
      .ai-answer-image img{
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    </style>
    <div class="ai-answer-image" data-testid="ai-answer-image">
      <img src=${answer}></img>
    </div>`;
        return html `<ai-answer-wrapper .options=${options}
      >${template}</ai-answer-wrapper
    >`;
    };
};
//# sourceMappingURL=wrapper.js.map