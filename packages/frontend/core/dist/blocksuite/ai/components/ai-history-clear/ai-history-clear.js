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
import {} from '@blocksuite/affine/shared/services';
import { unsafeCSSVarV2 } from '@blocksuite/affine/shared/theme';
import { ShadowlessElement } from '@blocksuite/affine/std';
import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { AIProvider } from '../../provider';
let AIHistoryClear = (() => {
    let _classSuper = WithDisposable(ShadowlessElement);
    let _chatContextValue_decorators;
    let _chatContextValue_initializers = [];
    let _chatContextValue_extraInitializers = [];
    let _session_decorators;
    let _session_initializers = [];
    let _session_extraInitializers = [];
    let _notificationService_decorators;
    let _notificationService_initializers = [];
    let _notificationService_extraInitializers = [];
    let _doc_decorators;
    let _doc_initializers = [];
    let _doc_extraInitializers = [];
    let _onHistoryCleared_decorators;
    let _onHistoryCleared_initializers = [];
    let _onHistoryCleared_extraInitializers = [];
    return class AIHistoryClear extends _classSuper {
        constructor() {
            super(...arguments);
            this.#chatContextValue_accessor_storage = __runInitializers(this, _chatContextValue_initializers, void 0);
            this.#session_accessor_storage = (__runInitializers(this, _chatContextValue_extraInitializers), __runInitializers(this, _session_initializers, void 0));
            this.#notificationService_accessor_storage = (__runInitializers(this, _session_extraInitializers), __runInitializers(this, _notificationService_initializers, void 0));
            this.#doc_accessor_storage = (__runInitializers(this, _notificationService_extraInitializers), __runInitializers(this, _doc_initializers, void 0));
            this.#onHistoryCleared_accessor_storage = (__runInitializers(this, _doc_extraInitializers), __runInitializers(this, _onHistoryCleared_initializers, void 0));
            this._cleanupHistories = (__runInitializers(this, _onHistoryCleared_extraInitializers), async () => {
                if (this._isHistoryClearDisabled || !this.session) {
                    return;
                }
                const sessionId = this.session.sessionId;
                try {
                    const confirm = await this.notificationService.confirm({
                        title: 'Clear History',
                        message: 'Are you sure you want to clear all history? This action will permanently delete all content, including all chat logs and data, and cannot be undone.',
                        confirmText: 'Confirm',
                        cancelText: 'Cancel',
                    });
                    if (confirm) {
                        const actionIds = this.chatContextValue.messages
                            .filter(item => 'sessionId' in item)
                            .map(item => item.sessionId);
                        await AIProvider.histories?.cleanup(this.doc.workspace.id, this.doc.id, [...(sessionId ? [sessionId] : []), ...(actionIds || [])]);
                        this.notificationService.toast('History cleared');
                        this.onHistoryCleared?.();
                    }
                }
                catch {
                    this.notificationService.toast('Failed to clear history');
                }
            });
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _chatContextValue_decorators = [property({ attribute: false })];
            _session_decorators = [property({ attribute: false })];
            _notificationService_decorators = [property({ attribute: false })];
            _doc_decorators = [property({ attribute: false })];
            _onHistoryCleared_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _chatContextValue_decorators, { kind: "accessor", name: "chatContextValue", static: false, private: false, access: { has: obj => "chatContextValue" in obj, get: obj => obj.chatContextValue, set: (obj, value) => { obj.chatContextValue = value; } }, metadata: _metadata }, _chatContextValue_initializers, _chatContextValue_extraInitializers);
            __esDecorate(this, null, _session_decorators, { kind: "accessor", name: "session", static: false, private: false, access: { has: obj => "session" in obj, get: obj => obj.session, set: (obj, value) => { obj.session = value; } }, metadata: _metadata }, _session_initializers, _session_extraInitializers);
            __esDecorate(this, null, _notificationService_decorators, { kind: "accessor", name: "notificationService", static: false, private: false, access: { has: obj => "notificationService" in obj, get: obj => obj.notificationService, set: (obj, value) => { obj.notificationService = value; } }, metadata: _metadata }, _notificationService_initializers, _notificationService_extraInitializers);
            __esDecorate(this, null, _doc_decorators, { kind: "accessor", name: "doc", static: false, private: false, access: { has: obj => "doc" in obj, get: obj => obj.doc, set: (obj, value) => { obj.doc = value; } }, metadata: _metadata }, _doc_initializers, _doc_extraInitializers);
            __esDecorate(this, null, _onHistoryCleared_decorators, { kind: "accessor", name: "onHistoryCleared", static: false, private: false, access: { has: obj => "onHistoryCleared" in obj, get: obj => obj.onHistoryCleared, set: (obj, value) => { obj.onHistoryCleared = value; } }, metadata: _metadata }, _onHistoryCleared_initializers, _onHistoryCleared_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        #chatContextValue_accessor_storage;
        get chatContextValue() { return this.#chatContextValue_accessor_storage; }
        set chatContextValue(value) { this.#chatContextValue_accessor_storage = value; }
        #session_accessor_storage;
        get session() { return this.#session_accessor_storage; }
        set session(value) { this.#session_accessor_storage = value; }
        #notificationService_accessor_storage;
        get notificationService() { return this.#notificationService_accessor_storage; }
        set notificationService(value) { this.#notificationService_accessor_storage = value; }
        #doc_accessor_storage;
        get doc() { return this.#doc_accessor_storage; }
        set doc(value) { this.#doc_accessor_storage = value; }
        #onHistoryCleared_accessor_storage;
        get onHistoryCleared() { return this.#onHistoryCleared_accessor_storage; }
        set onHistoryCleared(value) { this.#onHistoryCleared_accessor_storage = value; }
        static { this.styles = css `
    .chat-history-clear {
      cursor: pointer;
      color: ${unsafeCSSVarV2('icon/primary')};
    }
    .chat-history-clear[aria-disabled='true'] {
      cursor: not-allowed;
      color: ${unsafeCSSVarV2('icon/secondary')};
    }
  `; }
        get _isHistoryClearDisabled() {
            return (this.chatContextValue.status === 'loading' ||
                this.chatContextValue.status === 'transmitting' ||
                !this.chatContextValue.messages.length ||
                !this.session);
        }
        render() {
            return html `
      <div
        class="chat-history-clear"
        aria-disabled=${this._isHistoryClearDisabled}
        @click=${this._cleanupHistories}
        data-testid="chat-panel-clear"
      >
        Clear
      </div>
    `;
        }
    };
})();
export { AIHistoryClear };
//# sourceMappingURL=ai-history-clear.js.map