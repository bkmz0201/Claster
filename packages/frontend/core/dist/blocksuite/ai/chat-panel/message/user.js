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
import { ShadowlessElement } from '@blocksuite/affine/std';
import { css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import {} from '../../components/ai-chat-messages';
let ChatMessageUser = (() => {
    let _classSuper = WithDisposable(ShadowlessElement);
    let _item_decorators;
    let _item_initializers = [];
    let _item_extraInitializers = [];
    let _testId_decorators;
    let _testId_initializers = [];
    let _testId_extraInitializers = [];
    return class ChatMessageUser extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _item_decorators = [property({ attribute: false })];
            _testId_decorators = [property({ attribute: 'data-testid', reflect: true })];
            __esDecorate(this, null, _item_decorators, { kind: "accessor", name: "item", static: false, private: false, access: { has: obj => "item" in obj, get: obj => obj.item, set: (obj, value) => { obj.item = value; } }, metadata: _metadata }, _item_initializers, _item_extraInitializers);
            __esDecorate(this, null, _testId_decorators, { kind: "accessor", name: "testId", static: false, private: false, access: { has: obj => "testId" in obj, get: obj => obj.testId, set: (obj, value) => { obj.testId = value; } }, metadata: _metadata }, _testId_initializers, _testId_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    chat-message-user {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .chat-message-user {
      display: flex;
      flex-direction: column;
      max-width: calc(100% - 58px);
    }

    .chat-content-images {
      display: flex;
      justify-content: flex-end;

      .images-row {
        margin-left: auto;
      }
    }

    .text-content-wrapper {
      align-self: flex-end;
    }
  `; }
        #item_accessor_storage = __runInitializers(this, _item_initializers, void 0);
        get item() { return this.#item_accessor_storage; }
        set item(value) { this.#item_accessor_storage = value; }
        #testId_accessor_storage = (__runInitializers(this, _item_extraInitializers), __runInitializers(this, _testId_initializers, 'chat-message-user'));
        get testId() { return this.#testId_accessor_storage; }
        set testId(value) { this.#testId_accessor_storage = value; }
        renderContent() {
            const { item } = this;
            return html `
      ${item.attachments
                ? html `<chat-content-images
            class="chat-content-images"
            .images=${item.attachments}
          ></chat-content-images>`
                : nothing}
      <div
        class="text-content-wrapper"
        data-test-id="chat-content-user-text"
        style="max-width: 100%;"
      >
        <chat-content-pure-text .text=${item.content}></chat-content-pure-text>
      </div>
    `;
        }
        render() {
            return html ` <div class="chat-message-user">${this.renderContent()}</div> `;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _testId_extraInitializers);
        }
    };
})();
export { ChatMessageUser };
//# sourceMappingURL=user.js.map