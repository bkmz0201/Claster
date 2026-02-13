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
import { unsafeCSSVar, unsafeCSSVarV2 } from '@blocksuite/affine/shared/theme';
import { ShadowlessElement } from '@blocksuite/affine/std';
import { css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
let ChatContentPureText = (() => {
    let _classSuper = ShadowlessElement;
    let _text_decorators;
    let _text_initializers = [];
    let _text_extraInitializers = [];
    let _testId_decorators;
    let _testId_initializers = [];
    let _testId_extraInitializers = [];
    return class ChatContentPureText extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _text_decorators = [property({ attribute: false })];
            _testId_decorators = [property({ attribute: 'data-testid', reflect: true })];
            __esDecorate(this, null, _text_decorators, { kind: "accessor", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
            __esDecorate(this, null, _testId_decorators, { kind: "accessor", name: "testId", static: false, private: false, access: { has: obj => "testId" in obj, get: obj => obj.testId, set: (obj, value) => { obj.testId = value; } }, metadata: _metadata }, _testId_initializers, _testId_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .chat-content-pure-text {
      display: inline-block;
      text-align: left;
      max-width: 100%;
      max-height: 500px;
      overflow-y: auto;
      overflow-x: hidden;
      background: ${unsafeCSSVarV2('aI/userTextBackground')};
      border-radius: 8px;
      padding: 12px;
      white-space: pre-wrap;
      word-wrap: break-word;
      scrollbar-width: auto;
    }

    .chat-content-pure-text::-webkit-scrollbar {
      width: 4px;
    }

    .chat-content-pure-text::-webkit-scrollbar-thumb {
      background-color: ${unsafeCSSVar('borderColor')};
      border-radius: 3px;
    }

    .chat-content-pure-text::-webkit-scrollbar-track {
      background: transparent;
    }
  `; }
        #text_accessor_storage = __runInitializers(this, _text_initializers, '');
        get text() { return this.#text_accessor_storage; }
        set text(value) { this.#text_accessor_storage = value; }
        #testId_accessor_storage = (__runInitializers(this, _text_extraInitializers), __runInitializers(this, _testId_initializers, 'chat-content-pure-text'));
        get testId() { return this.#testId_accessor_storage; }
        set testId(value) { this.#testId_accessor_storage = value; }
        stopPropagation(event) {
            event.stopPropagation();
        }
        render() {
            return this.text.length > 0
                ? // prettier-ignore
                    html `<div class="chat-content-pure-text" @copy=${this.stopPropagation}>${this.text}</div>`
                : nothing;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _testId_extraInitializers);
        }
    };
})();
export { ChatContentPureText };
//# sourceMappingURL=pure-text.js.map