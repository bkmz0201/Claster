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
import { isInsidePageEditor } from '@blocksuite/affine/shared/utils';
import { ShadowlessElement, } from '@blocksuite/affine/std';
import { css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { EdgelessEditorActions, PageEditorActions, } from '../../_common/chat-actions-handle';
import { isChatMessage, } from '../../components/ai-chat-messages';
import { AIChatErrorRenderer } from '../../messages/error';
import {} from '../../provider';
import { mergeStreamContent } from '../../utils/stream-objects';
let ChatMessageAssistant = (() => {
    let _classSuper = WithDisposable(ShadowlessElement);
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _std_decorators;
    let _std_initializers = [];
    let _std_extraInitializers = [];
    let _item_decorators;
    let _item_initializers = [];
    let _item_extraInitializers = [];
    let _isLast_decorators;
    let _isLast_initializers = [];
    let _isLast_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _error_decorators;
    let _error_initializers = [];
    let _error_extraInitializers = [];
    let _extensions_decorators;
    let _extensions_initializers = [];
    let _extensions_extraInitializers = [];
    let _affineFeatureFlagService_decorators;
    let _affineFeatureFlagService_initializers = [];
    let _affineFeatureFlagService_extraInitializers = [];
    let _affineThemeService_decorators;
    let _affineThemeService_initializers = [];
    let _affineThemeService_extraInitializers = [];
    let _session_decorators;
    let _session_initializers = [];
    let _session_extraInitializers = [];
    let _retry_decorators;
    let _retry_initializers = [];
    let _retry_extraInitializers = [];
    let _testId_decorators;
    let _testId_initializers = [];
    let _testId_extraInitializers = [];
    let _width_decorators;
    let _width_initializers = [];
    let _width_extraInitializers = [];
    let _notificationService_decorators;
    let _notificationService_initializers = [];
    let _notificationService_extraInitializers = [];
    let _independentMode_decorators;
    let _independentMode_initializers = [];
    let _independentMode_extraInitializers = [];
    let _docDisplayService_decorators;
    let _docDisplayService_initializers = [];
    let _docDisplayService_extraInitializers = [];
    let _peekViewService_decorators;
    let _peekViewService_initializers = [];
    let _peekViewService_extraInitializers = [];
    let _onOpenDoc_decorators;
    let _onOpenDoc_initializers = [];
    let _onOpenDoc_extraInitializers = [];
    return class ChatMessageAssistant extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _host_decorators = [property({ attribute: false })];
            _std_decorators = [property({ attribute: false })];
            _item_decorators = [property({ attribute: false })];
            _isLast_decorators = [property({ attribute: false })];
            _status_decorators = [property({ attribute: 'data-status', reflect: true })];
            _error_decorators = [property({ attribute: false })];
            _extensions_decorators = [property({ attribute: false })];
            _affineFeatureFlagService_decorators = [property({ attribute: false })];
            _affineThemeService_decorators = [property({ attribute: false })];
            _session_decorators = [property({ attribute: false })];
            _retry_decorators = [property({ attribute: false })];
            _testId_decorators = [property({ attribute: 'data-testid', reflect: true })];
            _width_decorators = [property({ attribute: false })];
            _notificationService_decorators = [property({ attribute: false })];
            _independentMode_decorators = [property({ attribute: false })];
            _docDisplayService_decorators = [property({ attribute: false })];
            _peekViewService_decorators = [property({ attribute: false })];
            _onOpenDoc_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _std_decorators, { kind: "accessor", name: "std", static: false, private: false, access: { has: obj => "std" in obj, get: obj => obj.std, set: (obj, value) => { obj.std = value; } }, metadata: _metadata }, _std_initializers, _std_extraInitializers);
            __esDecorate(this, null, _item_decorators, { kind: "accessor", name: "item", static: false, private: false, access: { has: obj => "item" in obj, get: obj => obj.item, set: (obj, value) => { obj.item = value; } }, metadata: _metadata }, _item_initializers, _item_extraInitializers);
            __esDecorate(this, null, _isLast_decorators, { kind: "accessor", name: "isLast", static: false, private: false, access: { has: obj => "isLast" in obj, get: obj => obj.isLast, set: (obj, value) => { obj.isLast = value; } }, metadata: _metadata }, _isLast_initializers, _isLast_extraInitializers);
            __esDecorate(this, null, _status_decorators, { kind: "accessor", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(this, null, _error_decorators, { kind: "accessor", name: "error", static: false, private: false, access: { has: obj => "error" in obj, get: obj => obj.error, set: (obj, value) => { obj.error = value; } }, metadata: _metadata }, _error_initializers, _error_extraInitializers);
            __esDecorate(this, null, _extensions_decorators, { kind: "accessor", name: "extensions", static: false, private: false, access: { has: obj => "extensions" in obj, get: obj => obj.extensions, set: (obj, value) => { obj.extensions = value; } }, metadata: _metadata }, _extensions_initializers, _extensions_extraInitializers);
            __esDecorate(this, null, _affineFeatureFlagService_decorators, { kind: "accessor", name: "affineFeatureFlagService", static: false, private: false, access: { has: obj => "affineFeatureFlagService" in obj, get: obj => obj.affineFeatureFlagService, set: (obj, value) => { obj.affineFeatureFlagService = value; } }, metadata: _metadata }, _affineFeatureFlagService_initializers, _affineFeatureFlagService_extraInitializers);
            __esDecorate(this, null, _affineThemeService_decorators, { kind: "accessor", name: "affineThemeService", static: false, private: false, access: { has: obj => "affineThemeService" in obj, get: obj => obj.affineThemeService, set: (obj, value) => { obj.affineThemeService = value; } }, metadata: _metadata }, _affineThemeService_initializers, _affineThemeService_extraInitializers);
            __esDecorate(this, null, _session_decorators, { kind: "accessor", name: "session", static: false, private: false, access: { has: obj => "session" in obj, get: obj => obj.session, set: (obj, value) => { obj.session = value; } }, metadata: _metadata }, _session_initializers, _session_extraInitializers);
            __esDecorate(this, null, _retry_decorators, { kind: "accessor", name: "retry", static: false, private: false, access: { has: obj => "retry" in obj, get: obj => obj.retry, set: (obj, value) => { obj.retry = value; } }, metadata: _metadata }, _retry_initializers, _retry_extraInitializers);
            __esDecorate(this, null, _testId_decorators, { kind: "accessor", name: "testId", static: false, private: false, access: { has: obj => "testId" in obj, get: obj => obj.testId, set: (obj, value) => { obj.testId = value; } }, metadata: _metadata }, _testId_initializers, _testId_extraInitializers);
            __esDecorate(this, null, _width_decorators, { kind: "accessor", name: "width", static: false, private: false, access: { has: obj => "width" in obj, get: obj => obj.width, set: (obj, value) => { obj.width = value; } }, metadata: _metadata }, _width_initializers, _width_extraInitializers);
            __esDecorate(this, null, _notificationService_decorators, { kind: "accessor", name: "notificationService", static: false, private: false, access: { has: obj => "notificationService" in obj, get: obj => obj.notificationService, set: (obj, value) => { obj.notificationService = value; } }, metadata: _metadata }, _notificationService_initializers, _notificationService_extraInitializers);
            __esDecorate(this, null, _independentMode_decorators, { kind: "accessor", name: "independentMode", static: false, private: false, access: { has: obj => "independentMode" in obj, get: obj => obj.independentMode, set: (obj, value) => { obj.independentMode = value; } }, metadata: _metadata }, _independentMode_initializers, _independentMode_extraInitializers);
            __esDecorate(this, null, _docDisplayService_decorators, { kind: "accessor", name: "docDisplayService", static: false, private: false, access: { has: obj => "docDisplayService" in obj, get: obj => obj.docDisplayService, set: (obj, value) => { obj.docDisplayService = value; } }, metadata: _metadata }, _docDisplayService_initializers, _docDisplayService_extraInitializers);
            __esDecorate(this, null, _peekViewService_decorators, { kind: "accessor", name: "peekViewService", static: false, private: false, access: { has: obj => "peekViewService" in obj, get: obj => obj.peekViewService, set: (obj, value) => { obj.peekViewService = value; } }, metadata: _metadata }, _peekViewService_initializers, _peekViewService_extraInitializers);
            __esDecorate(this, null, _onOpenDoc_decorators, { kind: "accessor", name: "onOpenDoc", static: false, private: false, access: { has: obj => "onOpenDoc" in obj, get: obj => obj.onOpenDoc, set: (obj, value) => { obj.onOpenDoc = value; } }, metadata: _metadata }, _onOpenDoc_initializers, _onOpenDoc_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .message-info {
      color: var(--affine-placeholder-color);
      font-size: var(--affine-font-xs);
      font-weight: 400;
    }
  `; }
        #host_accessor_storage = __runInitializers(this, _host_initializers, void 0);
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #std_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _std_initializers, void 0));
        get std() { return this.#std_accessor_storage; }
        set std(value) { this.#std_accessor_storage = value; }
        #item_accessor_storage = (__runInitializers(this, _std_extraInitializers), __runInitializers(this, _item_initializers, void 0));
        get item() { return this.#item_accessor_storage; }
        set item(value) { this.#item_accessor_storage = value; }
        #isLast_accessor_storage = (__runInitializers(this, _item_extraInitializers), __runInitializers(this, _isLast_initializers, false));
        get isLast() { return this.#isLast_accessor_storage; }
        set isLast(value) { this.#isLast_accessor_storage = value; }
        #status_accessor_storage = (__runInitializers(this, _isLast_extraInitializers), __runInitializers(this, _status_initializers, 'idle'));
        get status() { return this.#status_accessor_storage; }
        set status(value) { this.#status_accessor_storage = value; }
        #error_accessor_storage = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _error_initializers, null));
        get error() { return this.#error_accessor_storage; }
        set error(value) { this.#error_accessor_storage = value; }
        #extensions_accessor_storage = (__runInitializers(this, _error_extraInitializers), __runInitializers(this, _extensions_initializers, void 0));
        get extensions() { return this.#extensions_accessor_storage; }
        set extensions(value) { this.#extensions_accessor_storage = value; }
        #affineFeatureFlagService_accessor_storage = (__runInitializers(this, _extensions_extraInitializers), __runInitializers(this, _affineFeatureFlagService_initializers, void 0));
        get affineFeatureFlagService() { return this.#affineFeatureFlagService_accessor_storage; }
        set affineFeatureFlagService(value) { this.#affineFeatureFlagService_accessor_storage = value; }
        #affineThemeService_accessor_storage = (__runInitializers(this, _affineFeatureFlagService_extraInitializers), __runInitializers(this, _affineThemeService_initializers, void 0));
        get affineThemeService() { return this.#affineThemeService_accessor_storage; }
        set affineThemeService(value) { this.#affineThemeService_accessor_storage = value; }
        #session_accessor_storage = (__runInitializers(this, _affineThemeService_extraInitializers), __runInitializers(this, _session_initializers, void 0));
        get session() { return this.#session_accessor_storage; }
        set session(value) { this.#session_accessor_storage = value; }
        #retry_accessor_storage = (__runInitializers(this, _session_extraInitializers), __runInitializers(this, _retry_initializers, void 0));
        get retry() { return this.#retry_accessor_storage; }
        set retry(value) { this.#retry_accessor_storage = value; }
        #testId_accessor_storage = (__runInitializers(this, _retry_extraInitializers), __runInitializers(this, _testId_initializers, 'chat-message-assistant'));
        get testId() { return this.#testId_accessor_storage; }
        set testId(value) { this.#testId_accessor_storage = value; }
        #width_accessor_storage = (__runInitializers(this, _testId_extraInitializers), __runInitializers(this, _width_initializers, void 0));
        get width() { return this.#width_accessor_storage; }
        set width(value) { this.#width_accessor_storage = value; }
        #notificationService_accessor_storage = (__runInitializers(this, _width_extraInitializers), __runInitializers(this, _notificationService_initializers, void 0));
        get notificationService() { return this.#notificationService_accessor_storage; }
        set notificationService(value) { this.#notificationService_accessor_storage = value; }
        #independentMode_accessor_storage = (__runInitializers(this, _notificationService_extraInitializers), __runInitializers(this, _independentMode_initializers, void 0));
        get independentMode() { return this.#independentMode_accessor_storage; }
        set independentMode(value) { this.#independentMode_accessor_storage = value; }
        #docDisplayService_accessor_storage = (__runInitializers(this, _independentMode_extraInitializers), __runInitializers(this, _docDisplayService_initializers, void 0));
        get docDisplayService() { return this.#docDisplayService_accessor_storage; }
        set docDisplayService(value) { this.#docDisplayService_accessor_storage = value; }
        #peekViewService_accessor_storage = (__runInitializers(this, _docDisplayService_extraInitializers), __runInitializers(this, _peekViewService_initializers, void 0));
        get peekViewService() { return this.#peekViewService_accessor_storage; }
        set peekViewService(value) { this.#peekViewService_accessor_storage = value; }
        #onOpenDoc_accessor_storage = (__runInitializers(this, _peekViewService_extraInitializers), __runInitializers(this, _onOpenDoc_initializers, void 0));
        get onOpenDoc() { return this.#onOpenDoc_accessor_storage; }
        set onOpenDoc(value) { this.#onOpenDoc_accessor_storage = value; }
        get state() {
            const { isLast, status } = this;
            return isLast
                ? status !== 'loading' && status !== 'transmitting'
                    ? 'finished'
                    : 'generating'
                : 'finished';
        }
        renderHeader() {
            const isWithDocs = 'content' in this.item &&
                this.item.content &&
                this.item.content.includes('[^') &&
                /\[\^\d+\]:{"type":"doc","docId":"[^"]+"}/.test(this.item.content);
            return html `<div class="user-info">
      <chat-assistant-avatar .status=${this.status}></chat-assistant-avatar>
      ${isWithDocs
                ? html `<span class="message-info">with your docs</span>`
                : nothing}
    </div>`;
        }
        renderContent() {
            const { host, item, isLast, status, error } = this;
            const { streamObjects, content } = item;
            const shouldRenderError = isLast && status === 'error' && !!error;
            return html `
      ${this.renderImages()}
      ${streamObjects?.length
                ? this.renderStreamObjects(streamObjects)
                : this.renderRichText(content)}
      ${shouldRenderError ? AIChatErrorRenderer(error, host) : nothing}
      ${this.renderEditorActions()}
    `;
        }
        renderImages() {
            const { item } = this;
            if (!item.attachments)
                return nothing;
            return html `<chat-content-images
      .images=${item.attachments}
    ></chat-content-images>`;
        }
        renderStreamObjects(answer) {
            return html `<chat-content-stream-objects
      .host=${this.host}
      .std=${this.std}
      .answer=${answer}
      .state=${this.state}
      .width=${this.width}
      .extensions=${this.extensions}
      .affineFeatureFlagService=${this.affineFeatureFlagService}
      .notificationService=${this.notificationService}
      .theme=${this.affineThemeService.appTheme.themeSignal}
      .independentMode=${this.independentMode}
      .docDisplayService=${this.docDisplayService}
      .peekViewService=${this.peekViewService}
      .onOpenDoc=${this.onOpenDoc}
    ></chat-content-stream-objects>`;
        }
        renderRichText(text) {
            return html `<chat-content-rich-text
      .text=${text}
      .state=${this.state}
      .extensions=${this.extensions}
      .affineFeatureFlagService=${this.affineFeatureFlagService}
      .theme=${this.affineThemeService.appTheme.themeSignal}
    ></chat-content-rich-text>`;
        }
        renderEditorActions() {
            const { item, isLast, status, host, session } = this;
            if (!isChatMessage(item) || item.role !== 'assistant')
                return nothing;
            if (isLast &&
                status !== 'success' &&
                status !== 'idle' &&
                status !== 'error')
                return nothing;
            const { content, streamObjects, id: messageId } = item;
            const markdown = streamObjects?.length
                ? mergeStreamContent(streamObjects)
                : content;
            const actions = host
                ? isInsidePageEditor(host)
                    ? PageEditorActions
                    : EdgelessEditorActions
                : null;
            const showActions = host && !!markdown && !this.independentMode;
            return html `
      <chat-copy-more
        .host=${host}
        .session=${session}
        .actions=${showActions ? actions : []}
        .content=${markdown}
        .isLast=${isLast}
        .messageId=${messageId}
        .withMargin=${true}
        .retry=${() => this.retry()}
        .notificationService=${this.notificationService}
      ></chat-copy-more>
      ${isLast && showActions
                ? html `<chat-action-list
            .actions=${actions}
            .host=${host}
            .session=${session}
            .content=${markdown}
            .messageId=${messageId ?? undefined}
            .withMargin=${true}
            .notificationService=${this.notificationService}
          ></chat-action-list>`
                : nothing}
    `;
        }
        render() {
            const { isLast, status } = this;
            if (isLast && status === 'loading') {
                return html `<ai-loading></ai-loading>`;
            }
            return html `
      ${this.renderHeader()}
      <div class="item-wrapper">${this.renderContent()}</div>
    `;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _onOpenDoc_extraInitializers);
        }
    };
})();
export { ChatMessageAssistant };
//# sourceMappingURL=assistant.js.map