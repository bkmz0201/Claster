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
import { ShadowlessElement, } from '@blocksuite/affine/std';
import { css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
let ChatContentStreamObjects = (() => {
    let _classSuper = WithDisposable(ShadowlessElement);
    let _answer_decorators;
    let _answer_initializers = [];
    let _answer_extraInitializers = [];
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _std_decorators;
    let _std_initializers = [];
    let _std_extraInitializers = [];
    let _state_decorators;
    let _state_initializers = [];
    let _state_extraInitializers = [];
    let _width_decorators;
    let _width_initializers = [];
    let _width_extraInitializers = [];
    let _extensions_decorators;
    let _extensions_initializers = [];
    let _extensions_extraInitializers = [];
    let _affineFeatureFlagService_decorators;
    let _affineFeatureFlagService_initializers = [];
    let _affineFeatureFlagService_extraInitializers = [];
    let _theme_decorators;
    let _theme_initializers = [];
    let _theme_extraInitializers = [];
    let _independentMode_decorators;
    let _independentMode_initializers = [];
    let _independentMode_extraInitializers = [];
    let _notificationService_decorators;
    let _notificationService_initializers = [];
    let _notificationService_extraInitializers = [];
    let _docDisplayService_decorators;
    let _docDisplayService_initializers = [];
    let _docDisplayService_extraInitializers = [];
    let _peekViewService_decorators;
    let _peekViewService_initializers = [];
    let _peekViewService_extraInitializers = [];
    let _onOpenDoc_decorators;
    let _onOpenDoc_initializers = [];
    let _onOpenDoc_extraInitializers = [];
    return class ChatContentStreamObjects extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _answer_decorators = [property({ attribute: false })];
            _host_decorators = [property({ attribute: false })];
            _std_decorators = [property({ attribute: false })];
            _state_decorators = [property({ attribute: false })];
            _width_decorators = [property({ attribute: false })];
            _extensions_decorators = [property({ attribute: false })];
            _affineFeatureFlagService_decorators = [property({ attribute: false })];
            _theme_decorators = [property({ attribute: false })];
            _independentMode_decorators = [property({ attribute: false })];
            _notificationService_decorators = [property({ attribute: false })];
            _docDisplayService_decorators = [property({ attribute: false })];
            _peekViewService_decorators = [property({ attribute: false })];
            _onOpenDoc_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _answer_decorators, { kind: "accessor", name: "answer", static: false, private: false, access: { has: obj => "answer" in obj, get: obj => obj.answer, set: (obj, value) => { obj.answer = value; } }, metadata: _metadata }, _answer_initializers, _answer_extraInitializers);
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _std_decorators, { kind: "accessor", name: "std", static: false, private: false, access: { has: obj => "std" in obj, get: obj => obj.std, set: (obj, value) => { obj.std = value; } }, metadata: _metadata }, _std_initializers, _std_extraInitializers);
            __esDecorate(this, null, _state_decorators, { kind: "accessor", name: "state", static: false, private: false, access: { has: obj => "state" in obj, get: obj => obj.state, set: (obj, value) => { obj.state = value; } }, metadata: _metadata }, _state_initializers, _state_extraInitializers);
            __esDecorate(this, null, _width_decorators, { kind: "accessor", name: "width", static: false, private: false, access: { has: obj => "width" in obj, get: obj => obj.width, set: (obj, value) => { obj.width = value; } }, metadata: _metadata }, _width_initializers, _width_extraInitializers);
            __esDecorate(this, null, _extensions_decorators, { kind: "accessor", name: "extensions", static: false, private: false, access: { has: obj => "extensions" in obj, get: obj => obj.extensions, set: (obj, value) => { obj.extensions = value; } }, metadata: _metadata }, _extensions_initializers, _extensions_extraInitializers);
            __esDecorate(this, null, _affineFeatureFlagService_decorators, { kind: "accessor", name: "affineFeatureFlagService", static: false, private: false, access: { has: obj => "affineFeatureFlagService" in obj, get: obj => obj.affineFeatureFlagService, set: (obj, value) => { obj.affineFeatureFlagService = value; } }, metadata: _metadata }, _affineFeatureFlagService_initializers, _affineFeatureFlagService_extraInitializers);
            __esDecorate(this, null, _theme_decorators, { kind: "accessor", name: "theme", static: false, private: false, access: { has: obj => "theme" in obj, get: obj => obj.theme, set: (obj, value) => { obj.theme = value; } }, metadata: _metadata }, _theme_initializers, _theme_extraInitializers);
            __esDecorate(this, null, _independentMode_decorators, { kind: "accessor", name: "independentMode", static: false, private: false, access: { has: obj => "independentMode" in obj, get: obj => obj.independentMode, set: (obj, value) => { obj.independentMode = value; } }, metadata: _metadata }, _independentMode_initializers, _independentMode_extraInitializers);
            __esDecorate(this, null, _notificationService_decorators, { kind: "accessor", name: "notificationService", static: false, private: false, access: { has: obj => "notificationService" in obj, get: obj => obj.notificationService, set: (obj, value) => { obj.notificationService = value; } }, metadata: _metadata }, _notificationService_initializers, _notificationService_extraInitializers);
            __esDecorate(this, null, _docDisplayService_decorators, { kind: "accessor", name: "docDisplayService", static: false, private: false, access: { has: obj => "docDisplayService" in obj, get: obj => obj.docDisplayService, set: (obj, value) => { obj.docDisplayService = value; } }, metadata: _metadata }, _docDisplayService_initializers, _docDisplayService_extraInitializers);
            __esDecorate(this, null, _peekViewService_decorators, { kind: "accessor", name: "peekViewService", static: false, private: false, access: { has: obj => "peekViewService" in obj, get: obj => obj.peekViewService, set: (obj, value) => { obj.peekViewService = value; } }, metadata: _metadata }, _peekViewService_initializers, _peekViewService_extraInitializers);
            __esDecorate(this, null, _onOpenDoc_decorators, { kind: "accessor", name: "onOpenDoc", static: false, private: false, access: { has: obj => "onOpenDoc" in obj, get: obj => obj.onOpenDoc, set: (obj, value) => { obj.onOpenDoc = value; } }, metadata: _metadata }, _onOpenDoc_initializers, _onOpenDoc_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .reasoning-wrapper {
      padding: 16px 20px;
      margin: 8px 0;
      border-radius: 8px;
      background-color: rgba(0, 0, 0, 0.05);
    }
  `; }
        #answer_accessor_storage = __runInitializers(this, _answer_initializers, void 0);
        get answer() { return this.#answer_accessor_storage; }
        set answer(value) { this.#answer_accessor_storage = value; }
        #host_accessor_storage = (__runInitializers(this, _answer_extraInitializers), __runInitializers(this, _host_initializers, void 0));
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #std_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _std_initializers, void 0));
        get std() { return this.#std_accessor_storage; }
        set std(value) { this.#std_accessor_storage = value; }
        #state_accessor_storage = (__runInitializers(this, _std_extraInitializers), __runInitializers(this, _state_initializers, 'finished'));
        get state() { return this.#state_accessor_storage; }
        set state(value) { this.#state_accessor_storage = value; }
        #width_accessor_storage = (__runInitializers(this, _state_extraInitializers), __runInitializers(this, _width_initializers, void 0));
        get width() { return this.#width_accessor_storage; }
        set width(value) { this.#width_accessor_storage = value; }
        #extensions_accessor_storage = (__runInitializers(this, _width_extraInitializers), __runInitializers(this, _extensions_initializers, void 0));
        get extensions() { return this.#extensions_accessor_storage; }
        set extensions(value) { this.#extensions_accessor_storage = value; }
        #affineFeatureFlagService_accessor_storage = (__runInitializers(this, _extensions_extraInitializers), __runInitializers(this, _affineFeatureFlagService_initializers, void 0));
        get affineFeatureFlagService() { return this.#affineFeatureFlagService_accessor_storage; }
        set affineFeatureFlagService(value) { this.#affineFeatureFlagService_accessor_storage = value; }
        #theme_accessor_storage = (__runInitializers(this, _affineFeatureFlagService_extraInitializers), __runInitializers(this, _theme_initializers, void 0));
        get theme() { return this.#theme_accessor_storage; }
        set theme(value) { this.#theme_accessor_storage = value; }
        #independentMode_accessor_storage = (__runInitializers(this, _theme_extraInitializers), __runInitializers(this, _independentMode_initializers, void 0));
        get independentMode() { return this.#independentMode_accessor_storage; }
        set independentMode(value) { this.#independentMode_accessor_storage = value; }
        #notificationService_accessor_storage = (__runInitializers(this, _independentMode_extraInitializers), __runInitializers(this, _notificationService_initializers, void 0));
        get notificationService() { return this.#notificationService_accessor_storage; }
        set notificationService(value) { this.#notificationService_accessor_storage = value; }
        #docDisplayService_accessor_storage = (__runInitializers(this, _notificationService_extraInitializers), __runInitializers(this, _docDisplayService_initializers, void 0));
        get docDisplayService() { return this.#docDisplayService_accessor_storage; }
        set docDisplayService(value) { this.#docDisplayService_accessor_storage = value; }
        #peekViewService_accessor_storage = (__runInitializers(this, _docDisplayService_extraInitializers), __runInitializers(this, _peekViewService_initializers, void 0));
        get peekViewService() { return this.#peekViewService_accessor_storage; }
        set peekViewService(value) { this.#peekViewService_accessor_storage = value; }
        #onOpenDoc_accessor_storage = (__runInitializers(this, _peekViewService_extraInitializers), __runInitializers(this, _onOpenDoc_initializers, void 0));
        get onOpenDoc() { return this.#onOpenDoc_accessor_storage; }
        set onOpenDoc(value) { this.#onOpenDoc_accessor_storage = value; }
        renderToolCall(streamObject) {
            if (streamObject.type !== 'tool-call') {
                return nothing;
            }
            switch (streamObject.toolName) {
                case 'web_crawl_exa':
                    return html `
          <web-crawl-tool
            .data=${streamObject}
            .width=${this.width}
          ></web-crawl-tool>
        `;
                case 'web_search_exa':
                    return html `
          <web-search-tool
            .data=${streamObject}
            .width=${this.width}
          ></web-search-tool>
        `;
                case 'doc_compose':
                    return html `
          <doc-compose-tool
            .std=${this.std || this.host?.std}
            .data=${streamObject}
            .width=${this.width}
            .theme=${this.theme}
            .notificationService=${this.notificationService}
          ></doc-compose-tool>
        `;
                case 'code_artifact':
                    return html `
          <code-artifact-tool
            .std=${this.std || this.host?.std}
            .data=${streamObject}
            .width=${this.width}
            .theme=${this.theme}
          ></code-artifact-tool>
        `;
                case 'doc_edit':
                    return html `
          <doc-edit-tool
            .data=${streamObject}
            .doc=${this.host?.store}
            .notificationService=${this.notificationService}
          ></doc-edit-tool>
        `;
                case 'doc_semantic_search':
                    return html `<doc-semantic-search-result
          .data=${streamObject}
          .width=${this.width}
          .peekViewService=${this.peekViewService}
        ></doc-semantic-search-result>`;
                case 'doc_keyword_search':
                    return html `<doc-keyword-search-result
          .data=${streamObject}
          .width=${this.width}
        ></doc-keyword-search-result>`;
                case 'doc_read':
                    return html `<doc-read-result
          .data=${streamObject}
          .width=${this.width}
        ></doc-read-result>`;
                case 'section_edit':
                    return html `
          <section-edit-tool
            .data=${streamObject}
            .extensions=${this.extensions}
            .affineFeatureFlagService=${this.affineFeatureFlagService}
            .notificationService=${this.notificationService}
            .theme=${this.theme}
            .host=${this.host}
            .independentMode=${this.independentMode}
          ></section-edit-tool>
        `;
                default: {
                    const name = streamObject.toolName + ' tool calling';
                    return html `
          <tool-call-card .name=${name} .width=${this.width}></tool-call-card>
        `;
                }
            }
        }
        renderToolResult(streamObject) {
            if (streamObject.type !== 'tool-result') {
                return nothing;
            }
            switch (streamObject.toolName) {
                case 'web_crawl_exa':
                    return html `
          <web-crawl-tool
            .data=${streamObject}
            .width=${this.width}
          ></web-crawl-tool>
        `;
                case 'web_search_exa':
                    return html `
          <web-search-tool
            .data=${streamObject}
            .width=${this.width}
          ></web-search-tool>
        `;
                case 'doc_compose':
                    return html `
          <doc-compose-tool
            .std=${this.std || this.host?.std}
            .data=${streamObject}
            .width=${this.width}
            .theme=${this.theme}
            .notificationService=${this.notificationService}
          ></doc-compose-tool>
        `;
                case 'code_artifact':
                    return html `
          <code-artifact-tool
            .std=${this.std || this.host?.std}
            .data=${streamObject}
            .width=${this.width}
            .theme=${this.theme}
            .notificationService=${this.notificationService}
          ></code-artifact-tool>
        `;
                case 'doc_edit':
                    return html `
          <doc-edit-tool
            .data=${streamObject}
            .host=${this.host}
            .renderRichText=${this.renderRichText.bind(this)}
            .notificationService=${this.notificationService}
          ></doc-edit-tool>
        `;
                case 'doc_semantic_search':
                    return html `<doc-semantic-search-result
          .data=${streamObject}
          .width=${this.width}
          .docDisplayService=${this.docDisplayService}
          .peekViewService=${this.peekViewService}
          .onOpenDoc=${this.onOpenDoc}
        ></doc-semantic-search-result>`;
                case 'doc_keyword_search':
                    return html `<doc-keyword-search-result
          .data=${streamObject}
          .width=${this.width}
          .peekViewService=${this.peekViewService}
          .onOpenDoc=${this.onOpenDoc}
        ></doc-keyword-search-result>`;
                case 'doc_read':
                    return html `<doc-read-result
          .data=${streamObject}
          .width=${this.width}
          .peekViewService=${this.peekViewService}
          .onOpenDoc=${this.onOpenDoc}
        ></doc-read-result>`;
                case 'section_edit':
                    return html `
          <section-edit-tool
            .data=${streamObject}
            .extensions=${this.extensions}
            .affineFeatureFlagService=${this.affineFeatureFlagService}
            .notificationService=${this.notificationService}
            .theme=${this.theme}
            .host=${this.host}
            .independentMode=${this.independentMode}
          ></section-edit-tool>
        `;
                default: {
                    const name = streamObject.toolName + ' tool result';
                    return html `
          <tool-result-card
            .name=${name}
            .width=${this.width}
          ></tool-result-card>
        `;
                }
            }
        }
        renderRichText(text) {
            return html `<chat-content-rich-text
      .text=${text}
      .state=${this.state}
      .extensions=${this.extensions}
      .affineFeatureFlagService=${this.affineFeatureFlagService}
      .theme=${this.theme}
    ></chat-content-rich-text>`;
        }
        render() {
            return html `<div>
      ${this.answer.map(data => {
                switch (data.type) {
                    case 'text-delta':
                        return this.renderRichText(data.textDelta);
                    case 'reasoning':
                        return html `
              <div class="reasoning-wrapper">
                ${this.renderRichText(data.textDelta)}
              </div>
            `;
                    case 'tool-call':
                        return this.renderToolCall(data);
                    case 'tool-result':
                        return this.renderToolResult(data);
                    default:
                        return nothing;
                }
            })}
    </div>`;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _onOpenDoc_extraInitializers);
        }
    };
})();
export { ChatContentStreamObjects };
//# sourceMappingURL=stream-objects.js.map