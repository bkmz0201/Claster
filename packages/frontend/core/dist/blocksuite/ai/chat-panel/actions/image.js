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
import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import {} from '../../components/ai-chat-messages';
let ActionImage = (() => {
    let _classSuper = WithDisposable(ShadowlessElement);
    let _item_decorators;
    let _item_initializers = [];
    let _item_extraInitializers = [];
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _testId_decorators;
    let _testId_initializers = [];
    let _testId_extraInitializers = [];
    return class ActionImage extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _item_decorators = [property({ attribute: false })];
            _host_decorators = [property({ attribute: false })];
            _testId_decorators = [property({ attribute: 'data-testid', reflect: true })];
            __esDecorate(this, null, _item_decorators, { kind: "accessor", name: "item", static: false, private: false, access: { has: obj => "item" in obj, get: obj => obj.item, set: (obj, value) => { obj.item = value; } }, metadata: _metadata }, _item_initializers, _item_extraInitializers);
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _testId_decorators, { kind: "accessor", name: "testId", static: false, private: false, access: { has: obj => "testId" in obj, get: obj => obj.testId, set: (obj, value) => { obj.testId = value; } }, metadata: _metadata }, _testId_initializers, _testId_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        #item_accessor_storage = __runInitializers(this, _item_initializers, void 0);
        get item() { return this.#item_accessor_storage; }
        set item(value) { this.#item_accessor_storage = value; }
        #host_accessor_storage = (__runInitializers(this, _item_extraInitializers), __runInitializers(this, _host_initializers, void 0));
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #testId_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _testId_initializers, 'action-image'));
        get testId() { return this.#testId_accessor_storage; }
        set testId(value) { this.#testId_accessor_storage = value; }
        render() {
            const images = this.item.messages[1]?.attachments ?? this.item.messages[0].attachments;
            return html `<action-wrapper .host=${this.host} .item=${this.item}>
      <div style=${styleMap({ marginBottom: '12px' })}>
        ${images
                ? html `<chat-content-images
              .images=${images}
              data-testid="original-image"
            ></chat-content-images>`
                : nothing}
      </div>
    </action-wrapper>`;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _testId_extraInitializers);
        }
    };
})();
export { ActionImage };
//# sourceMappingURL=image.js.map