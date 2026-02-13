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
import { createLitPortal } from '@blocksuite/affine/components/portal';
import { WithDisposable } from '@blocksuite/affine/global/lit';
import { unsafeCSSVarV2 } from '@blocksuite/affine/shared/theme';
import { ShadowlessElement } from '@blocksuite/affine/std';
import { ArrowDownSmallIcon, PinedIcon, PinIcon, PlusIcon, } from '@blocksuite/icons/lit';
import { flip, offset } from '@floating-ui/dom';
import { css, html } from 'lit';
import { property, query } from 'lit/decorators.js';
let AIChatToolbar = (() => {
    let _classSuper = WithDisposable(ShadowlessElement);
    let _session_decorators;
    let _session_initializers = [];
    let _session_extraInitializers = [];
    let _workspaceId_decorators;
    let _workspaceId_initializers = [];
    let _workspaceId_extraInitializers = [];
    let _docId_decorators;
    let _docId_initializers = [];
    let _docId_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _onNewSession_decorators;
    let _onNewSession_initializers = [];
    let _onNewSession_extraInitializers = [];
    let _onTogglePin_decorators;
    let _onTogglePin_initializers = [];
    let _onTogglePin_extraInitializers = [];
    let _onOpenSession_decorators;
    let _onOpenSession_initializers = [];
    let _onOpenSession_extraInitializers = [];
    let _onOpenDoc_decorators;
    let _onOpenDoc_initializers = [];
    let _onOpenDoc_extraInitializers = [];
    let _onSessionDelete_decorators;
    let _onSessionDelete_initializers = [];
    let _onSessionDelete_extraInitializers = [];
    let _docDisplayConfig_decorators;
    let _docDisplayConfig_initializers = [];
    let _docDisplayConfig_extraInitializers = [];
    let _notificationService_decorators;
    let _notificationService_initializers = [];
    let _notificationService_extraInitializers = [];
    let _historyButton_decorators;
    let _historyButton_initializers = [];
    let _historyButton_extraInitializers = [];
    return class AIChatToolbar extends _classSuper {
        constructor() {
            super(...arguments);
            this.#session_accessor_storage = __runInitializers(this, _session_initializers, void 0);
            this.#workspaceId_accessor_storage = (__runInitializers(this, _session_extraInitializers), __runInitializers(this, _workspaceId_initializers, void 0));
            this.#docId_accessor_storage = (__runInitializers(this, _workspaceId_extraInitializers), __runInitializers(this, _docId_initializers, void 0));
            this.#status_accessor_storage = (__runInitializers(this, _docId_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.#onNewSession_accessor_storage = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _onNewSession_initializers, void 0));
            this.#onTogglePin_accessor_storage = (__runInitializers(this, _onNewSession_extraInitializers), __runInitializers(this, _onTogglePin_initializers, void 0));
            this.#onOpenSession_accessor_storage = (__runInitializers(this, _onTogglePin_extraInitializers), __runInitializers(this, _onOpenSession_initializers, void 0));
            this.#onOpenDoc_accessor_storage = (__runInitializers(this, _onOpenSession_extraInitializers), __runInitializers(this, _onOpenDoc_initializers, void 0));
            this.#onSessionDelete_accessor_storage = (__runInitializers(this, _onOpenDoc_extraInitializers), __runInitializers(this, _onSessionDelete_initializers, void 0));
            this.#docDisplayConfig_accessor_storage = (__runInitializers(this, _onSessionDelete_extraInitializers), __runInitializers(this, _docDisplayConfig_initializers, void 0));
            this.#notificationService_accessor_storage = (__runInitializers(this, _docDisplayConfig_extraInitializers), __runInitializers(this, _notificationService_initializers, void 0));
            this.#historyButton_accessor_storage = (__runInitializers(this, _notificationService_extraInitializers), __runInitializers(this, _historyButton_initializers, void 0));
            this.abortController = (__runInitializers(this, _historyButton_extraInitializers), null);
            this.onPinClick = async () => {
                if (this.isGenerating) {
                    this.notificationService.toast('Cannot pin a chat while generating an answer');
                    return;
                }
                await this.onTogglePin();
            };
            this.unpinConfirm = async () => {
                if (this.session && this.session.pinned) {
                    try {
                        const confirm = await this.notificationService.confirm({
                            title: 'Switch Chat? Current chat is pinned',
                            message: 'Switching will unpinned the current chat. This will change the active chat panel, allowing you to navigate between different conversation histories.',
                            confirmText: 'Switch Chat',
                            cancelText: 'Cancel',
                        });
                        if (!confirm) {
                            return false;
                        }
                        await this.onTogglePin();
                    }
                    catch {
                        this.notificationService.toast('Failed to unpin the chat');
                    }
                }
                return true;
            };
            this.onPlusClick = async () => {
                const confirm = await this.unpinConfirm();
                if (confirm) {
                    this.onNewSession();
                }
            };
            this.onSessionClick = async (sessionId) => {
                if (this.session?.sessionId === sessionId) {
                    this.notificationService.toast('You are already in this chat');
                    return;
                }
                const confirm = await this.unpinConfirm();
                if (confirm) {
                    this.onOpenSession(sessionId);
                }
            };
            this.onDocClick = async (docId, sessionId) => {
                if (this.docId === docId && this.session?.sessionId === sessionId) {
                    this.notificationService.toast('You are already in this chat');
                    return;
                }
                this.onOpenDoc(docId, sessionId);
            };
            this.toggleHistoryMenu = () => {
                if (this.abortController) {
                    this.abortController.abort();
                    return;
                }
                this.abortController = new AbortController();
                this.abortController.signal.addEventListener('abort', () => {
                    this.abortController = null;
                });
                createLitPortal({
                    template: html `
        <ai-session-history
          .session=${this.session}
          .workspaceId=${this.workspaceId}
          .docDisplayConfig=${this.docDisplayConfig}
          .onSessionClick=${this.onSessionClick}
          .onSessionDelete=${this.onSessionDelete}
          .onDocClick=${this.onDocClick}
          .notificationService=${this.notificationService}
        ></ai-session-history>
      `,
                    portalStyles: {
                        zIndex: 'var(--affine-z-index-popover)',
                    },
                    container: document.body,
                    computePosition: {
                        referenceElement: this.historyButton,
                        placement: 'bottom-end',
                        middleware: [offset({ crossAxis: 0, mainAxis: 5 }), flip()],
                        autoUpdate: { animationFrame: true },
                    },
                    abortController: this.abortController,
                    closeOnClickAway: true,
                });
            };
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _session_decorators = [property({ attribute: false })];
            _workspaceId_decorators = [property({ attribute: false })];
            _docId_decorators = [property({ attribute: false })];
            _status_decorators = [property({ attribute: false })];
            _onNewSession_decorators = [property({ attribute: false })];
            _onTogglePin_decorators = [property({ attribute: false })];
            _onOpenSession_decorators = [property({ attribute: false })];
            _onOpenDoc_decorators = [property({ attribute: false })];
            _onSessionDelete_decorators = [property({ attribute: false })];
            _docDisplayConfig_decorators = [property({ attribute: false })];
            _notificationService_decorators = [property({ attribute: false })];
            _historyButton_decorators = [query('.history-button')];
            __esDecorate(this, null, _session_decorators, { kind: "accessor", name: "session", static: false, private: false, access: { has: obj => "session" in obj, get: obj => obj.session, set: (obj, value) => { obj.session = value; } }, metadata: _metadata }, _session_initializers, _session_extraInitializers);
            __esDecorate(this, null, _workspaceId_decorators, { kind: "accessor", name: "workspaceId", static: false, private: false, access: { has: obj => "workspaceId" in obj, get: obj => obj.workspaceId, set: (obj, value) => { obj.workspaceId = value; } }, metadata: _metadata }, _workspaceId_initializers, _workspaceId_extraInitializers);
            __esDecorate(this, null, _docId_decorators, { kind: "accessor", name: "docId", static: false, private: false, access: { has: obj => "docId" in obj, get: obj => obj.docId, set: (obj, value) => { obj.docId = value; } }, metadata: _metadata }, _docId_initializers, _docId_extraInitializers);
            __esDecorate(this, null, _status_decorators, { kind: "accessor", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(this, null, _onNewSession_decorators, { kind: "accessor", name: "onNewSession", static: false, private: false, access: { has: obj => "onNewSession" in obj, get: obj => obj.onNewSession, set: (obj, value) => { obj.onNewSession = value; } }, metadata: _metadata }, _onNewSession_initializers, _onNewSession_extraInitializers);
            __esDecorate(this, null, _onTogglePin_decorators, { kind: "accessor", name: "onTogglePin", static: false, private: false, access: { has: obj => "onTogglePin" in obj, get: obj => obj.onTogglePin, set: (obj, value) => { obj.onTogglePin = value; } }, metadata: _metadata }, _onTogglePin_initializers, _onTogglePin_extraInitializers);
            __esDecorate(this, null, _onOpenSession_decorators, { kind: "accessor", name: "onOpenSession", static: false, private: false, access: { has: obj => "onOpenSession" in obj, get: obj => obj.onOpenSession, set: (obj, value) => { obj.onOpenSession = value; } }, metadata: _metadata }, _onOpenSession_initializers, _onOpenSession_extraInitializers);
            __esDecorate(this, null, _onOpenDoc_decorators, { kind: "accessor", name: "onOpenDoc", static: false, private: false, access: { has: obj => "onOpenDoc" in obj, get: obj => obj.onOpenDoc, set: (obj, value) => { obj.onOpenDoc = value; } }, metadata: _metadata }, _onOpenDoc_initializers, _onOpenDoc_extraInitializers);
            __esDecorate(this, null, _onSessionDelete_decorators, { kind: "accessor", name: "onSessionDelete", static: false, private: false, access: { has: obj => "onSessionDelete" in obj, get: obj => obj.onSessionDelete, set: (obj, value) => { obj.onSessionDelete = value; } }, metadata: _metadata }, _onSessionDelete_initializers, _onSessionDelete_extraInitializers);
            __esDecorate(this, null, _docDisplayConfig_decorators, { kind: "accessor", name: "docDisplayConfig", static: false, private: false, access: { has: obj => "docDisplayConfig" in obj, get: obj => obj.docDisplayConfig, set: (obj, value) => { obj.docDisplayConfig = value; } }, metadata: _metadata }, _docDisplayConfig_initializers, _docDisplayConfig_extraInitializers);
            __esDecorate(this, null, _notificationService_decorators, { kind: "accessor", name: "notificationService", static: false, private: false, access: { has: obj => "notificationService" in obj, get: obj => obj.notificationService, set: (obj, value) => { obj.notificationService = value; } }, metadata: _metadata }, _notificationService_initializers, _notificationService_extraInitializers);
            __esDecorate(this, null, _historyButton_decorators, { kind: "accessor", name: "historyButton", static: false, private: false, access: { has: obj => "historyButton" in obj, get: obj => obj.historyButton, set: (obj, value) => { obj.historyButton = value; } }, metadata: _metadata }, _historyButton_initializers, _historyButton_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        #session_accessor_storage;
        get session() { return this.#session_accessor_storage; }
        set session(value) { this.#session_accessor_storage = value; }
        #workspaceId_accessor_storage;
        get workspaceId() { return this.#workspaceId_accessor_storage; }
        set workspaceId(value) { this.#workspaceId_accessor_storage = value; }
        #docId_accessor_storage;
        get docId() { return this.#docId_accessor_storage; }
        set docId(value) { this.#docId_accessor_storage = value; }
        #status_accessor_storage;
        get status() { return this.#status_accessor_storage; }
        set status(value) { this.#status_accessor_storage = value; }
        #onNewSession_accessor_storage;
        get onNewSession() { return this.#onNewSession_accessor_storage; }
        set onNewSession(value) { this.#onNewSession_accessor_storage = value; }
        #onTogglePin_accessor_storage;
        get onTogglePin() { return this.#onTogglePin_accessor_storage; }
        set onTogglePin(value) { this.#onTogglePin_accessor_storage = value; }
        #onOpenSession_accessor_storage;
        get onOpenSession() { return this.#onOpenSession_accessor_storage; }
        set onOpenSession(value) { this.#onOpenSession_accessor_storage = value; }
        #onOpenDoc_accessor_storage;
        get onOpenDoc() { return this.#onOpenDoc_accessor_storage; }
        set onOpenDoc(value) { this.#onOpenDoc_accessor_storage = value; }
        #onSessionDelete_accessor_storage;
        get onSessionDelete() { return this.#onSessionDelete_accessor_storage; }
        set onSessionDelete(value) { this.#onSessionDelete_accessor_storage = value; }
        #docDisplayConfig_accessor_storage;
        get docDisplayConfig() { return this.#docDisplayConfig_accessor_storage; }
        set docDisplayConfig(value) { this.#docDisplayConfig_accessor_storage = value; }
        #notificationService_accessor_storage;
        get notificationService() { return this.#notificationService_accessor_storage; }
        set notificationService(value) { this.#notificationService_accessor_storage = value; }
        #historyButton_accessor_storage;
        get historyButton() { return this.#historyButton_accessor_storage; }
        set historyButton(value) { this.#historyButton_accessor_storage = value; }
        get isGenerating() {
            return this.status === 'transmitting' || this.status === 'loading';
        }
        static { this.styles = css `
    .ai-chat-toolbar {
      display: flex;
      gap: 8px;
      align-items: center;

      .chat-toolbar-icon {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 24px;
        height: 24px;
        border-radius: 4px;
        &:hover {
          background-color: ${unsafeCSSVarV2('layer/background/hoverOverlay')};
        }

        svg {
          width: 16px;
          height: 16px;
          color: ${unsafeCSSVarV2('icon/primary')};
        }

        &[data-disabled='true'] {
          cursor: not-allowed;
        }
      }
    }
  `; }
        render() {
            const pinned = this.session?.pinned;
            return html `
      <div class="ai-chat-toolbar">
        <div
          class="chat-toolbar-icon"
          @click=${this.onPlusClick}
          data-testid="ai-panel-new-chat"
        >
          ${PlusIcon()}
          <affine-tooltip>New Chat</affine-tooltip>
        </div>
        <div
          class="chat-toolbar-icon"
          @click=${this.onPinClick}
          data-pinned=${!!pinned}
          data-disabled=${this.isGenerating}
          data-testid="ai-panel-pin-chat"
        >
          ${pinned ? PinedIcon() : PinIcon()}
          <affine-tooltip>
            ${pinned ? 'Unpin this Chat' : 'Pin this Chat'}
          </affine-tooltip>
        </div>
        <div
          class="chat-toolbar-icon history-button"
          @click=${this.toggleHistoryMenu}
        >
          ${ArrowDownSmallIcon()}
          <affine-tooltip>Chat History</affine-tooltip>
        </div>
      </div>
    `;
        }
        closeHistoryMenu() {
            this.abortController?.abort();
        }
    };
})();
export { AIChatToolbar };
//# sourceMappingURL=ai-chat-toolbar.js.map