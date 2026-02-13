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
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { AIStarIconWithAnimation } from '../_common/icons';
let AILoading = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _stopGenerating_decorators;
    let _stopGenerating_initializers = [];
    let _stopGenerating_extraInitializers = [];
    let _testId_decorators;
    let _testId_initializers = [];
    let _testId_extraInitializers = [];
    return class AILoading extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _stopGenerating_decorators = [property({ attribute: false })];
            _testId_decorators = [property({ attribute: 'data-testid', reflect: true })];
            __esDecorate(this, null, _stopGenerating_decorators, { kind: "accessor", name: "stopGenerating", static: false, private: false, access: { has: obj => "stopGenerating" in obj, get: obj => obj.stopGenerating, set: (obj, value) => { obj.stopGenerating = value; } }, metadata: _metadata }, _stopGenerating_initializers, _stopGenerating_extraInitializers);
            __esDecorate(this, null, _testId_decorators, { kind: "accessor", name: "testId", static: false, private: false, access: { has: obj => "testId" in obj, get: obj => obj.testId, set: (obj, value) => { obj.testId = value; } }, metadata: _metadata }, _testId_initializers, _testId_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      width: 100%;
    }

    .generating-tip {
      display: flex;
      width: 100%;
      height: 22px;
      align-items: center;
      gap: 8px;

      color: var(--light-brandColor, #1e96eb);

      .text {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        flex: 1 0 0;

        /* light/smMedium */
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px; /* 157.143% */
      }

      .left,
      .right {
        display: flex;
        width: 20px;
        height: 20px;
        justify-content: center;
        align-items: center;
      }
    }
  `; }
        #stopGenerating_accessor_storage = __runInitializers(this, _stopGenerating_initializers, void 0);
        get stopGenerating() { return this.#stopGenerating_accessor_storage; }
        set stopGenerating(value) { this.#stopGenerating_accessor_storage = value; }
        #testId_accessor_storage = (__runInitializers(this, _stopGenerating_extraInitializers), __runInitializers(this, _testId_initializers, 'ai-loading'));
        get testId() { return this.#testId_accessor_storage; }
        set testId(value) { this.#testId_accessor_storage = value; }
        render() {
            return html `
      <div class="generating-tip">
        <div class="left">${AIStarIconWithAnimation}</div>
        <div class="text">AI is generating...</div>
      </div>
    `;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _testId_extraInitializers);
        }
    };
})();
export { AILoading };
//# sourceMappingURL=ai-loading.js.map