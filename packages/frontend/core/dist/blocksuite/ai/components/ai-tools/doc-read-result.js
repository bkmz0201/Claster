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
import { PageIcon, ViewIcon } from '@blocksuite/icons/lit';
import { ShadowlessElement } from '@blocksuite/std';
import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
let DocReadResult = (() => {
    let _classSuper = WithDisposable(ShadowlessElement);
    let _data_decorators;
    let _data_initializers = [];
    let _data_extraInitializers = [];
    let _width_decorators;
    let _width_initializers = [];
    let _width_extraInitializers = [];
    let _peekViewService_decorators;
    let _peekViewService_initializers = [];
    let _peekViewService_extraInitializers = [];
    return class DocReadResult extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _data_decorators = [property({ attribute: false })];
            _width_decorators = [property({ attribute: false })];
            _peekViewService_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _data_decorators, { kind: "accessor", name: "data", static: false, private: false, access: { has: obj => "data" in obj, get: obj => obj.data, set: (obj, value) => { obj.data = value; } }, metadata: _metadata }, _data_initializers, _data_extraInitializers);
            __esDecorate(this, null, _width_decorators, { kind: "accessor", name: "width", static: false, private: false, access: { has: obj => "width" in obj, get: obj => obj.width, set: (obj, value) => { obj.width = value; } }, metadata: _metadata }, _width_initializers, _width_extraInitializers);
            __esDecorate(this, null, _peekViewService_decorators, { kind: "accessor", name: "peekViewService", static: false, private: false, access: { has: obj => "peekViewService" in obj, get: obj => obj.peekViewService, set: (obj, value) => { obj.peekViewService = value; } }, metadata: _metadata }, _peekViewService_initializers, _peekViewService_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        #data_accessor_storage = __runInitializers(this, _data_initializers, void 0);
        get data() { return this.#data_accessor_storage; }
        set data(value) { this.#data_accessor_storage = value; }
        #width_accessor_storage = (__runInitializers(this, _data_extraInitializers), __runInitializers(this, _width_initializers, void 0));
        get width() { return this.#width_accessor_storage; }
        set width(value) { this.#width_accessor_storage = value; }
        #peekViewService_accessor_storage = (__runInitializers(this, _width_extraInitializers), __runInitializers(this, _peekViewService_initializers, void 0));
        get peekViewService() { return this.#peekViewService_accessor_storage; }
        set peekViewService(value) { this.#peekViewService_accessor_storage = value; }
        renderToolCall() {
            // TODO: get document name by doc_id
            return html `<tool-call-card
      .name=${`Reading document`}
      .icon=${ViewIcon()}
      .width=${this.width}
    ></tool-call-card>`;
        }
        renderToolResult() {
            if (this.data.type !== 'tool-result') {
                return nothing;
            }
            // TODO: better markdown rendering
            return html `<tool-result-card
      .name=${`Read "${this.data.result.title}"`}
      .icon=${ViewIcon()}
      .width=${this.width}
      .results=${[
                {
                    title: this.data.result.title,
                    icon: PageIcon(),
                    content: this.data.result.markdown,
                    onClick: () => {
                        const docId = this.data.result.docId;
                        if (!docId) {
                            return;
                        }
                        this.peekViewService.peekView
                            .open({
                            type: 'doc',
                            docRef: { docId },
                        })
                            .catch(console.error);
                    },
                },
            ]}
    ></tool-result-card>`;
        }
        render() {
            if (this.data.type === 'tool-call') {
                return this.renderToolCall();
            }
            if (this.data.type === 'tool-result') {
                return this.renderToolResult();
            }
            return nothing;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _peekViewService_extraInitializers);
        }
    };
})();
export { DocReadResult };
//# sourceMappingURL=doc-read-result.js.map