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
import { createTextRenderer } from '../../components/text-renderer';
let ChatContentRichText = (() => {
    let _classSuper = WithDisposable(ShadowlessElement);
    let _text_decorators;
    let _text_initializers = [];
    let _text_extraInitializers = [];
    let _state_decorators;
    let _state_initializers = [];
    let _state_extraInitializers = [];
    let _extensions_decorators;
    let _extensions_initializers = [];
    let _extensions_extraInitializers = [];
    let _affineFeatureFlagService_decorators;
    let _affineFeatureFlagService_initializers = [];
    let _affineFeatureFlagService_extraInitializers = [];
    let _theme_decorators;
    let _theme_initializers = [];
    let _theme_extraInitializers = [];
    return class ChatContentRichText extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _text_decorators = [property({ attribute: false })];
            _state_decorators = [property({ attribute: false })];
            _extensions_decorators = [property({ attribute: false })];
            _affineFeatureFlagService_decorators = [property({ attribute: false })];
            _theme_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _text_decorators, { kind: "accessor", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
            __esDecorate(this, null, _state_decorators, { kind: "accessor", name: "state", static: false, private: false, access: { has: obj => "state" in obj, get: obj => obj.state, set: (obj, value) => { obj.state = value; } }, metadata: _metadata }, _state_initializers, _state_extraInitializers);
            __esDecorate(this, null, _extensions_decorators, { kind: "accessor", name: "extensions", static: false, private: false, access: { has: obj => "extensions" in obj, get: obj => obj.extensions, set: (obj, value) => { obj.extensions = value; } }, metadata: _metadata }, _extensions_initializers, _extensions_extraInitializers);
            __esDecorate(this, null, _affineFeatureFlagService_decorators, { kind: "accessor", name: "affineFeatureFlagService", static: false, private: false, access: { has: obj => "affineFeatureFlagService" in obj, get: obj => obj.affineFeatureFlagService, set: (obj, value) => { obj.affineFeatureFlagService = value; } }, metadata: _metadata }, _affineFeatureFlagService_initializers, _affineFeatureFlagService_extraInitializers);
            __esDecorate(this, null, _theme_decorators, { kind: "accessor", name: "theme", static: false, private: false, access: { has: obj => "theme" in obj, get: obj => obj.theme, set: (obj, value) => { obj.theme = value; } }, metadata: _metadata }, _theme_initializers, _theme_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        #text_accessor_storage = __runInitializers(this, _text_initializers, void 0);
        get text() { return this.#text_accessor_storage; }
        set text(value) { this.#text_accessor_storage = value; }
        #state_accessor_storage = (__runInitializers(this, _text_extraInitializers), __runInitializers(this, _state_initializers, 'finished'));
        get state() { return this.#state_accessor_storage; }
        set state(value) { this.#state_accessor_storage = value; }
        #extensions_accessor_storage = (__runInitializers(this, _state_extraInitializers), __runInitializers(this, _extensions_initializers, void 0));
        get extensions() { return this.#extensions_accessor_storage; }
        set extensions(value) { this.#extensions_accessor_storage = value; }
        #affineFeatureFlagService_accessor_storage = (__runInitializers(this, _extensions_extraInitializers), __runInitializers(this, _affineFeatureFlagService_initializers, void 0));
        get affineFeatureFlagService() { return this.#affineFeatureFlagService_accessor_storage; }
        set affineFeatureFlagService(value) { this.#affineFeatureFlagService_accessor_storage = value; }
        #theme_accessor_storage = (__runInitializers(this, _affineFeatureFlagService_extraInitializers), __runInitializers(this, _theme_initializers, void 0));
        get theme() { return this.#theme_accessor_storage; }
        set theme(value) { this.#theme_accessor_storage = value; }
        render() {
            const { text } = this;
            return html `${createTextRenderer({
                customHeading: true,
                extensions: this.extensions,
                affineFeatureFlagService: this.affineFeatureFlagService,
                theme: this.theme,
            })(text, this.state)}`;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _theme_extraInitializers);
        }
    };
})();
export { ChatContentRichText };
//# sourceMappingURL=rich-text.js.map