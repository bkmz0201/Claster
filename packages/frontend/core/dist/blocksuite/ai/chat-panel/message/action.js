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
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import {} from '../../components/ai-chat-messages';
import { HISTORY_IMAGE_ACTIONS } from '../const';
let ChatMessageAction = (() => {
    let _classSuper = WithDisposable(ShadowlessElement);
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _item_decorators;
    let _item_initializers = [];
    let _item_extraInitializers = [];
    let _testId_decorators;
    let _testId_initializers = [];
    let _testId_extraInitializers = [];
    return class ChatMessageAction extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _host_decorators = [property({ attribute: false })];
            _item_decorators = [property({ attribute: false })];
            _testId_decorators = [property({ attribute: 'data-testid', reflect: true })];
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _item_decorators, { kind: "accessor", name: "item", static: false, private: false, access: { has: obj => "item" in obj, get: obj => obj.item, set: (obj, value) => { obj.item = value; } }, metadata: _metadata }, _item_initializers, _item_extraInitializers);
            __esDecorate(this, null, _testId_decorators, { kind: "accessor", name: "testId", static: false, private: false, access: { has: obj => "testId" in obj, get: obj => obj.testId, set: (obj, value) => { obj.testId = value; } }, metadata: _metadata }, _testId_initializers, _testId_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        #host_accessor_storage = __runInitializers(this, _host_initializers, void 0);
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #item_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _item_initializers, void 0));
        get item() { return this.#item_accessor_storage; }
        set item(value) { this.#item_accessor_storage = value; }
        #testId_accessor_storage = (__runInitializers(this, _item_extraInitializers), __runInitializers(this, _testId_initializers, 'chat-message-action'));
        get testId() { return this.#testId_accessor_storage; }
        set testId(value) { this.#testId_accessor_storage = value; }
        renderHeader() {
            return html `
      <div class="user-info">
        <chat-assistant-avatar></chat-assistant-avatar>
      </div>
    `;
        }
        renderContent() {
            const { host, item } = this;
            switch (item.action) {
                case 'Create a presentation':
                    return html `<action-slides
          .host=${host}
          .item=${item}
        ></action-slides>`;
                case 'Make it real':
                    return html `<action-make-real
          .host=${host}
          .item=${item}
        ></action-make-real>`;
                case 'Brainstorm mindmap':
                    return html `<action-mindmap
          .host=${host}
          .item=${item}
        ></action-mindmap>`;
                case 'Explain this image':
                case 'Generate a caption':
                    return html `<action-image-to-text
          .host=${host}
          .item=${item}
        ></action-image-to-text>`;
                default:
                    if (HISTORY_IMAGE_ACTIONS.includes(item.action)) {
                        return html `<action-image
            .host=${host}
            .item=${item}
          ></action-image>`;
                    }
                    return html `<action-text
          .item=${item}
          .host=${host}
          .isCode=${item.action === 'Explain this code' ||
                        item.action === 'Check code error'}
        ></action-text>`;
            }
        }
        render() {
            return html ` ${this.renderHeader()} ${this.renderContent()} `;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _testId_extraInitializers);
        }
    };
})();
export { ChatMessageAction };
//# sourceMappingURL=action.js.map