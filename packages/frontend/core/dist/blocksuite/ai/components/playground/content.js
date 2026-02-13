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
import { SignalWatcher, WithDisposable } from '@blocksuite/affine/global/lit';
import { ShadowlessElement } from '@blocksuite/affine/std';
import { css, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { AIProvider } from '../../provider';
let PlaygroundContent = (() => {
    let _classSuper = SignalWatcher(WithDisposable(ShadowlessElement));
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _doc_decorators;
    let _doc_initializers = [];
    let _doc_extraInitializers = [];
    let _networkSearchConfig_decorators;
    let _networkSearchConfig_initializers = [];
    let _networkSearchConfig_extraInitializers = [];
    let _reasoningConfig_decorators;
    let _reasoningConfig_initializers = [];
    let _reasoningConfig_extraInitializers = [];
    let _playgroundConfig_decorators;
    let _playgroundConfig_initializers = [];
    let _playgroundConfig_extraInitializers = [];
    let _appSidebarConfig_decorators;
    let _appSidebarConfig_initializers = [];
    let _appSidebarConfig_extraInitializers = [];
    let _searchMenuConfig_decorators;
    let _searchMenuConfig_initializers = [];
    let _searchMenuConfig_extraInitializers = [];
    let _docDisplayConfig_decorators;
    let _docDisplayConfig_initializers = [];
    let _docDisplayConfig_extraInitializers = [];
    let _extensions_decorators;
    let _extensions_initializers = [];
    let _extensions_extraInitializers = [];
    let _serverService_decorators;
    let _serverService_initializers = [];
    let _serverService_extraInitializers = [];
    let _affineFeatureFlagService_decorators;
    let _affineFeatureFlagService_initializers = [];
    let _affineFeatureFlagService_extraInitializers = [];
    let _affineThemeService_decorators;
    let _affineThemeService_initializers = [];
    let _affineThemeService_extraInitializers = [];
    let _notificationService_decorators;
    let _notificationService_initializers = [];
    let _notificationService_extraInitializers = [];
    let _aiToolsConfigService_decorators;
    let _aiToolsConfigService_initializers = [];
    let _aiToolsConfigService_extraInitializers = [];
    let _sessions_decorators;
    let _sessions_initializers = [];
    let _sessions_extraInitializers = [];
    let _sharedInputValue_decorators;
    let _sharedInputValue_initializers = [];
    let _sharedInputValue_extraInitializers = [];
    return class PlaygroundContent extends _classSuper {
        constructor() {
            super(...arguments);
            this.#host_accessor_storage = __runInitializers(this, _host_initializers, void 0);
            this.#doc_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _doc_initializers, void 0));
            this.#networkSearchConfig_accessor_storage = (__runInitializers(this, _doc_extraInitializers), __runInitializers(this, _networkSearchConfig_initializers, void 0));
            this.#reasoningConfig_accessor_storage = (__runInitializers(this, _networkSearchConfig_extraInitializers), __runInitializers(this, _reasoningConfig_initializers, void 0));
            this.#playgroundConfig_accessor_storage = (__runInitializers(this, _reasoningConfig_extraInitializers), __runInitializers(this, _playgroundConfig_initializers, void 0));
            this.#appSidebarConfig_accessor_storage = (__runInitializers(this, _playgroundConfig_extraInitializers), __runInitializers(this, _appSidebarConfig_initializers, void 0));
            this.#searchMenuConfig_accessor_storage = (__runInitializers(this, _appSidebarConfig_extraInitializers), __runInitializers(this, _searchMenuConfig_initializers, void 0));
            this.#docDisplayConfig_accessor_storage = (__runInitializers(this, _searchMenuConfig_extraInitializers), __runInitializers(this, _docDisplayConfig_initializers, void 0));
            this.#extensions_accessor_storage = (__runInitializers(this, _docDisplayConfig_extraInitializers), __runInitializers(this, _extensions_initializers, void 0));
            this.#serverService_accessor_storage = (__runInitializers(this, _extensions_extraInitializers), __runInitializers(this, _serverService_initializers, void 0));
            this.#affineFeatureFlagService_accessor_storage = (__runInitializers(this, _serverService_extraInitializers), __runInitializers(this, _affineFeatureFlagService_initializers, void 0));
            this.#affineThemeService_accessor_storage = (__runInitializers(this, _affineFeatureFlagService_extraInitializers), __runInitializers(this, _affineThemeService_initializers, void 0));
            this.#notificationService_accessor_storage = (__runInitializers(this, _affineThemeService_extraInitializers), __runInitializers(this, _notificationService_initializers, void 0));
            this.#aiToolsConfigService_accessor_storage = (__runInitializers(this, _notificationService_extraInitializers), __runInitializers(this, _aiToolsConfigService_initializers, void 0));
            this.#sessions_accessor_storage = (__runInitializers(this, _aiToolsConfigService_extraInitializers), __runInitializers(this, _sessions_initializers, []));
            this.#sharedInputValue_accessor_storage = (__runInitializers(this, _sessions_extraInitializers), __runInitializers(this, _sharedInputValue_initializers, ''));
            this.rootSessionId = (__runInitializers(this, _sharedInputValue_extraInitializers), undefined);
            this.isUpdatingTextareas = false;
            this.isSending = false;
            this.getSessions = async () => {
                const sessions = (await AIProvider.session?.getSessions(this.doc.workspace.id, this.doc.id, { action: false })) || [];
                const rootSession = sessions?.findLast(session => !session.parentSessionId);
                if (!rootSession) {
                    // Create a new session
                    const rootSessionId = await AIProvider.session?.createSession({
                        docId: this.doc.id,
                        workspaceId: this.doc.workspace.id,
                        promptName: 'Chat With AFFiNE AI',
                    });
                    if (rootSessionId) {
                        this.rootSessionId = rootSessionId;
                        const forkSession = await this.forkSession(rootSessionId);
                        if (forkSession) {
                            this.sessions = [forkSession];
                        }
                    }
                }
                else {
                    this.rootSessionId = rootSession.sessionId;
                    const childSessions = sessions.filter(session => session.parentSessionId === rootSession.sessionId);
                    if (childSessions.length > 0) {
                        this.sessions = childSessions;
                    }
                    else {
                        const forkSession = await this.forkSession(rootSession.sessionId);
                        if (forkSession) {
                            this.sessions = [forkSession];
                        }
                    }
                }
            };
            this.forkSession = async (parentSessionId) => {
                const forkSessionId = await AIProvider.forkChat?.({
                    workspaceId: this.doc.workspace.id,
                    docId: this.doc.id,
                    sessionId: parentSessionId,
                    latestMessageId: '',
                });
                if (!forkSessionId) {
                    return;
                }
                return await AIProvider.session?.getSession(this.doc.workspace.id, forkSessionId);
            };
            this.addChat = async () => {
                if (!this.rootSessionId) {
                    return;
                }
                const forkSession = await this.forkSession(this.rootSessionId);
                if (forkSession) {
                    this.sessions = [...this.sessions, forkSession];
                }
            };
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _host_decorators = [property({ attribute: false })];
            _doc_decorators = [property({ attribute: false })];
            _networkSearchConfig_decorators = [property({ attribute: false })];
            _reasoningConfig_decorators = [property({ attribute: false })];
            _playgroundConfig_decorators = [property({ attribute: false })];
            _appSidebarConfig_decorators = [property({ attribute: false })];
            _searchMenuConfig_decorators = [property({ attribute: false })];
            _docDisplayConfig_decorators = [property({ attribute: false })];
            _extensions_decorators = [property({ attribute: false })];
            _serverService_decorators = [property({ attribute: false })];
            _affineFeatureFlagService_decorators = [property({ attribute: false })];
            _affineThemeService_decorators = [property({ attribute: false })];
            _notificationService_decorators = [property({ attribute: false })];
            _aiToolsConfigService_decorators = [property({ attribute: false })];
            _sessions_decorators = [state()];
            _sharedInputValue_decorators = [state()];
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _doc_decorators, { kind: "accessor", name: "doc", static: false, private: false, access: { has: obj => "doc" in obj, get: obj => obj.doc, set: (obj, value) => { obj.doc = value; } }, metadata: _metadata }, _doc_initializers, _doc_extraInitializers);
            __esDecorate(this, null, _networkSearchConfig_decorators, { kind: "accessor", name: "networkSearchConfig", static: false, private: false, access: { has: obj => "networkSearchConfig" in obj, get: obj => obj.networkSearchConfig, set: (obj, value) => { obj.networkSearchConfig = value; } }, metadata: _metadata }, _networkSearchConfig_initializers, _networkSearchConfig_extraInitializers);
            __esDecorate(this, null, _reasoningConfig_decorators, { kind: "accessor", name: "reasoningConfig", static: false, private: false, access: { has: obj => "reasoningConfig" in obj, get: obj => obj.reasoningConfig, set: (obj, value) => { obj.reasoningConfig = value; } }, metadata: _metadata }, _reasoningConfig_initializers, _reasoningConfig_extraInitializers);
            __esDecorate(this, null, _playgroundConfig_decorators, { kind: "accessor", name: "playgroundConfig", static: false, private: false, access: { has: obj => "playgroundConfig" in obj, get: obj => obj.playgroundConfig, set: (obj, value) => { obj.playgroundConfig = value; } }, metadata: _metadata }, _playgroundConfig_initializers, _playgroundConfig_extraInitializers);
            __esDecorate(this, null, _appSidebarConfig_decorators, { kind: "accessor", name: "appSidebarConfig", static: false, private: false, access: { has: obj => "appSidebarConfig" in obj, get: obj => obj.appSidebarConfig, set: (obj, value) => { obj.appSidebarConfig = value; } }, metadata: _metadata }, _appSidebarConfig_initializers, _appSidebarConfig_extraInitializers);
            __esDecorate(this, null, _searchMenuConfig_decorators, { kind: "accessor", name: "searchMenuConfig", static: false, private: false, access: { has: obj => "searchMenuConfig" in obj, get: obj => obj.searchMenuConfig, set: (obj, value) => { obj.searchMenuConfig = value; } }, metadata: _metadata }, _searchMenuConfig_initializers, _searchMenuConfig_extraInitializers);
            __esDecorate(this, null, _docDisplayConfig_decorators, { kind: "accessor", name: "docDisplayConfig", static: false, private: false, access: { has: obj => "docDisplayConfig" in obj, get: obj => obj.docDisplayConfig, set: (obj, value) => { obj.docDisplayConfig = value; } }, metadata: _metadata }, _docDisplayConfig_initializers, _docDisplayConfig_extraInitializers);
            __esDecorate(this, null, _extensions_decorators, { kind: "accessor", name: "extensions", static: false, private: false, access: { has: obj => "extensions" in obj, get: obj => obj.extensions, set: (obj, value) => { obj.extensions = value; } }, metadata: _metadata }, _extensions_initializers, _extensions_extraInitializers);
            __esDecorate(this, null, _serverService_decorators, { kind: "accessor", name: "serverService", static: false, private: false, access: { has: obj => "serverService" in obj, get: obj => obj.serverService, set: (obj, value) => { obj.serverService = value; } }, metadata: _metadata }, _serverService_initializers, _serverService_extraInitializers);
            __esDecorate(this, null, _affineFeatureFlagService_decorators, { kind: "accessor", name: "affineFeatureFlagService", static: false, private: false, access: { has: obj => "affineFeatureFlagService" in obj, get: obj => obj.affineFeatureFlagService, set: (obj, value) => { obj.affineFeatureFlagService = value; } }, metadata: _metadata }, _affineFeatureFlagService_initializers, _affineFeatureFlagService_extraInitializers);
            __esDecorate(this, null, _affineThemeService_decorators, { kind: "accessor", name: "affineThemeService", static: false, private: false, access: { has: obj => "affineThemeService" in obj, get: obj => obj.affineThemeService, set: (obj, value) => { obj.affineThemeService = value; } }, metadata: _metadata }, _affineThemeService_initializers, _affineThemeService_extraInitializers);
            __esDecorate(this, null, _notificationService_decorators, { kind: "accessor", name: "notificationService", static: false, private: false, access: { has: obj => "notificationService" in obj, get: obj => obj.notificationService, set: (obj, value) => { obj.notificationService = value; } }, metadata: _metadata }, _notificationService_initializers, _notificationService_extraInitializers);
            __esDecorate(this, null, _aiToolsConfigService_decorators, { kind: "accessor", name: "aiToolsConfigService", static: false, private: false, access: { has: obj => "aiToolsConfigService" in obj, get: obj => obj.aiToolsConfigService, set: (obj, value) => { obj.aiToolsConfigService = value; } }, metadata: _metadata }, _aiToolsConfigService_initializers, _aiToolsConfigService_extraInitializers);
            __esDecorate(this, null, _sessions_decorators, { kind: "accessor", name: "sessions", static: false, private: false, access: { has: obj => "sessions" in obj, get: obj => obj.sessions, set: (obj, value) => { obj.sessions = value; } }, metadata: _metadata }, _sessions_initializers, _sessions_extraInitializers);
            __esDecorate(this, null, _sharedInputValue_decorators, { kind: "accessor", name: "sharedInputValue", static: false, private: false, access: { has: obj => "sharedInputValue" in obj, get: obj => obj.sharedInputValue, set: (obj, value) => { obj.sharedInputValue = value; } }, metadata: _metadata }, _sharedInputValue_initializers, _sharedInputValue_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    playground-content {
      .playground-content {
        display: flex;
        gap: 16px;
        width: 100%;
        height: 100%;
        padding: 16px;
        box-sizing: border-box;
      }

      .playground-chat-item {
        flex: 1;
        min-width: 0;
        border: 1px solid var(--affine-border-color);
        border-radius: 8px;
        background: var(--affine-background-primary-color);
        overflow: hidden;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.2s ease;
      }

      .playground-chat-item:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }

      .playground-chat-item:only-child {
        max-width: 800px;
        margin: 0 auto;
      }
    }
  `; }
        #host_accessor_storage;
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #doc_accessor_storage;
        get doc() { return this.#doc_accessor_storage; }
        set doc(value) { this.#doc_accessor_storage = value; }
        #networkSearchConfig_accessor_storage;
        get networkSearchConfig() { return this.#networkSearchConfig_accessor_storage; }
        set networkSearchConfig(value) { this.#networkSearchConfig_accessor_storage = value; }
        #reasoningConfig_accessor_storage;
        get reasoningConfig() { return this.#reasoningConfig_accessor_storage; }
        set reasoningConfig(value) { this.#reasoningConfig_accessor_storage = value; }
        #playgroundConfig_accessor_storage;
        get playgroundConfig() { return this.#playgroundConfig_accessor_storage; }
        set playgroundConfig(value) { this.#playgroundConfig_accessor_storage = value; }
        #appSidebarConfig_accessor_storage;
        get appSidebarConfig() { return this.#appSidebarConfig_accessor_storage; }
        set appSidebarConfig(value) { this.#appSidebarConfig_accessor_storage = value; }
        #searchMenuConfig_accessor_storage;
        get searchMenuConfig() { return this.#searchMenuConfig_accessor_storage; }
        set searchMenuConfig(value) { this.#searchMenuConfig_accessor_storage = value; }
        #docDisplayConfig_accessor_storage;
        get docDisplayConfig() { return this.#docDisplayConfig_accessor_storage; }
        set docDisplayConfig(value) { this.#docDisplayConfig_accessor_storage = value; }
        #extensions_accessor_storage;
        get extensions() { return this.#extensions_accessor_storage; }
        set extensions(value) { this.#extensions_accessor_storage = value; }
        #serverService_accessor_storage;
        get serverService() { return this.#serverService_accessor_storage; }
        set serverService(value) { this.#serverService_accessor_storage = value; }
        #affineFeatureFlagService_accessor_storage;
        get affineFeatureFlagService() { return this.#affineFeatureFlagService_accessor_storage; }
        set affineFeatureFlagService(value) { this.#affineFeatureFlagService_accessor_storage = value; }
        #affineThemeService_accessor_storage;
        get affineThemeService() { return this.#affineThemeService_accessor_storage; }
        set affineThemeService(value) { this.#affineThemeService_accessor_storage = value; }
        #notificationService_accessor_storage;
        get notificationService() { return this.#notificationService_accessor_storage; }
        set notificationService(value) { this.#notificationService_accessor_storage = value; }
        #aiToolsConfigService_accessor_storage;
        get aiToolsConfigService() { return this.#aiToolsConfigService_accessor_storage; }
        set aiToolsConfigService(value) { this.#aiToolsConfigService_accessor_storage = value; }
        #sessions_accessor_storage;
        get sessions() { return this.#sessions_accessor_storage; }
        set sessions(value) { this.#sessions_accessor_storage = value; }
        #sharedInputValue_accessor_storage;
        get sharedInputValue() { return this.#sharedInputValue_accessor_storage; }
        set sharedInputValue(value) { this.#sharedInputValue_accessor_storage = value; }
        setupTextareaSync() {
            const observer = new MutationObserver(() => {
                this.syncAllTextareas();
                this.syncAllSendButtons();
            });
            observer.observe(this, {
                childList: true,
                subtree: true,
            });
            this._disposables.add(() => observer.disconnect());
            this.syncAllTextareas();
            this.syncAllSendButtons();
        }
        syncAllTextareas() {
            const textareas = this.getAllTextareas();
            textareas.forEach(textarea => {
                this.setupTextareaListeners(textarea);
            });
        }
        getAllTextareas() {
            return Array.from(this.querySelectorAll('ai-chat-input textarea[data-testid="chat-panel-input"]'));
        }
        setupTextareaListeners(textarea) {
            if (textarea.dataset.synced)
                return;
            textarea.dataset.synced = 'true';
            const handleInput = (event) => {
                if (this.isUpdatingTextareas)
                    return;
                const target = event.target;
                const newValue = target.value;
                if (newValue !== this.sharedInputValue) {
                    this.sharedInputValue = newValue;
                    this.updateOtherTextareas(target, newValue);
                }
            };
            // paste need delay to ensure the content is fully processed
            const handlePaste = (event) => {
                if (this.isUpdatingTextareas)
                    return;
                const target = event.target;
                setTimeout(() => {
                    const newValue = target.value;
                    if (newValue !== this.sharedInputValue) {
                        this.sharedInputValue = newValue;
                        this.updateOtherTextareas(target, newValue);
                    }
                }, 0);
            };
            textarea.addEventListener('input', handleInput);
            textarea.addEventListener('paste', handlePaste);
            this._disposables.add(() => {
                textarea.removeEventListener('input', handleInput);
                textarea.removeEventListener('paste', handlePaste);
            });
        }
        updateOtherTextareas(sourceTextarea, newValue) {
            this.isUpdatingTextareas = true;
            const textareas = this.getAllTextareas();
            textareas.forEach(textarea => {
                if (textarea !== sourceTextarea && textarea.value !== newValue) {
                    textarea.value = newValue;
                    this.triggerInputEvent(textarea);
                }
            });
            this.isUpdatingTextareas = false;
        }
        triggerInputEvent(textarea) {
            const inputEvent = new Event('input', { bubbles: true });
            textarea.dispatchEvent(inputEvent);
        }
        syncAllSendButtons() {
            const sendButtons = this.getAllSendButtons();
            sendButtons.forEach(button => {
                this.setupSendButtonListener(button);
            });
        }
        getAllSendButtons() {
            return Array.from(this.querySelectorAll('[data-testid="chat-panel-send"]'));
        }
        setupSendButtonListener(button) {
            if (button.dataset.syncSetup)
                return;
            button.dataset.syncSetup = 'true';
            const handleSendClick = async (_event) => {
                if (this.isSending) {
                    return;
                }
                this.isSending = true;
                try {
                    await this.triggerOtherSendButtons(button);
                }
                finally {
                    this.isSending = false;
                }
            };
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            button.addEventListener('click', handleSendClick);
            this._disposables.add(() => {
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                button.removeEventListener('click', handleSendClick);
            });
        }
        async triggerOtherSendButtons(sourceButton) {
            const allSendButtons = this.getAllSendButtons();
            const otherButtons = allSendButtons.filter(button => button !== sourceButton);
            const clickPromises = otherButtons.map(async (button) => {
                try {
                    const clickEvent = new MouseEvent('click', {
                        bubbles: true,
                        cancelable: true,
                        view: window,
                    });
                    button.dispatchEvent(clickEvent);
                }
                catch (error) {
                    console.error(error);
                }
            });
            await Promise.allSettled(clickPromises);
        }
        connectedCallback() {
            super.connectedCallback();
            this.getSessions().catch(console.error);
            this.setupTextareaSync();
        }
        render() {
            return html `
      <div class="playground-content">
        ${repeat(this.sessions, session => session.sessionId, session => html `
            <div class="playground-chat-item">
              <playground-chat
                .host=${this.host}
                .doc=${this.doc}
                .session=${session}
                .networkSearchConfig=${this.networkSearchConfig}
                .reasoningConfig=${this.reasoningConfig}
                .playgroundConfig=${this.playgroundConfig}
                .appSidebarConfig=${this.appSidebarConfig}
                .searchMenuConfig=${this.searchMenuConfig}
                .docDisplayConfig=${this.docDisplayConfig}
                .extensions=${this.extensions}
                .serverService=${this.serverService}
                .affineFeatureFlagService=${this.affineFeatureFlagService}
                .affineThemeService=${this.affineThemeService}
                .notificationService=${this.notificationService}
                .aiToolsConfigService=${this.aiToolsConfigService}
                .addChat=${this.addChat}
              ></playground-chat>
            </div>
          `)}
      </div>
    `;
        }
    };
})();
export { PlaygroundContent };
//# sourceMappingURL=content.js.map