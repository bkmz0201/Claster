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
import {} from '@blocksuite/affine/shared/services';
import { unsafeCSSVarV2 } from '@blocksuite/affine/shared/theme';
import { ShadowlessElement } from '@blocksuite/affine/std';
import { CenterPeekIcon } from '@blocksuite/icons/lit';
import { css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { createPlaygroundModal } from '../components/playground/modal';
let AIChatPanelTitle = (() => {
    let _classSuper = SignalWatcher(WithDisposable(ShadowlessElement));
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _doc_decorators;
    let _doc_initializers = [];
    let _doc_extraInitializers = [];
    let _playgroundConfig_decorators;
    let _playgroundConfig_initializers = [];
    let _playgroundConfig_extraInitializers = [];
    let _appSidebarConfig_decorators;
    let _appSidebarConfig_initializers = [];
    let _appSidebarConfig_extraInitializers = [];
    let _networkSearchConfig_decorators;
    let _networkSearchConfig_initializers = [];
    let _networkSearchConfig_extraInitializers = [];
    let _reasoningConfig_decorators;
    let _reasoningConfig_initializers = [];
    let _reasoningConfig_extraInitializers = [];
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
    let _affineWorkspaceDialogService_decorators;
    let _affineWorkspaceDialogService_initializers = [];
    let _affineWorkspaceDialogService_extraInitializers = [];
    let _affineThemeService_decorators;
    let _affineThemeService_initializers = [];
    let _affineThemeService_extraInitializers = [];
    let _notificationService_decorators;
    let _notificationService_initializers = [];
    let _notificationService_extraInitializers = [];
    let _aiToolsConfigService_decorators;
    let _aiToolsConfigService_initializers = [];
    let _aiToolsConfigService_extraInitializers = [];
    let _session_decorators;
    let _session_initializers = [];
    let _session_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _embeddingProgress_decorators;
    let _embeddingProgress_initializers = [];
    let _embeddingProgress_extraInitializers = [];
    let _newSession_decorators;
    let _newSession_initializers = [];
    let _newSession_extraInitializers = [];
    let _togglePin_decorators;
    let _togglePin_initializers = [];
    let _togglePin_extraInitializers = [];
    let _openSession_decorators;
    let _openSession_initializers = [];
    let _openSession_extraInitializers = [];
    let _openDoc_decorators;
    let _openDoc_initializers = [];
    let _openDoc_extraInitializers = [];
    let _deleteSession_decorators;
    let _deleteSession_initializers = [];
    let _deleteSession_extraInitializers = [];
    return class AIChatPanelTitle extends _classSuper {
        constructor() {
            super(...arguments);
            this.#host_accessor_storage = __runInitializers(this, _host_initializers, void 0);
            this.#doc_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _doc_initializers, void 0));
            this.#playgroundConfig_accessor_storage = (__runInitializers(this, _doc_extraInitializers), __runInitializers(this, _playgroundConfig_initializers, void 0));
            this.#appSidebarConfig_accessor_storage = (__runInitializers(this, _playgroundConfig_extraInitializers), __runInitializers(this, _appSidebarConfig_initializers, void 0));
            this.#networkSearchConfig_accessor_storage = (__runInitializers(this, _appSidebarConfig_extraInitializers), __runInitializers(this, _networkSearchConfig_initializers, void 0));
            this.#reasoningConfig_accessor_storage = (__runInitializers(this, _networkSearchConfig_extraInitializers), __runInitializers(this, _reasoningConfig_initializers, void 0));
            this.#searchMenuConfig_accessor_storage = (__runInitializers(this, _reasoningConfig_extraInitializers), __runInitializers(this, _searchMenuConfig_initializers, void 0));
            this.#docDisplayConfig_accessor_storage = (__runInitializers(this, _searchMenuConfig_extraInitializers), __runInitializers(this, _docDisplayConfig_initializers, void 0));
            this.#extensions_accessor_storage = (__runInitializers(this, _docDisplayConfig_extraInitializers), __runInitializers(this, _extensions_initializers, void 0));
            this.#serverService_accessor_storage = (__runInitializers(this, _extensions_extraInitializers), __runInitializers(this, _serverService_initializers, void 0));
            this.#affineFeatureFlagService_accessor_storage = (__runInitializers(this, _serverService_extraInitializers), __runInitializers(this, _affineFeatureFlagService_initializers, void 0));
            this.#affineWorkspaceDialogService_accessor_storage = (__runInitializers(this, _affineFeatureFlagService_extraInitializers), __runInitializers(this, _affineWorkspaceDialogService_initializers, void 0));
            this.#affineThemeService_accessor_storage = (__runInitializers(this, _affineWorkspaceDialogService_extraInitializers), __runInitializers(this, _affineThemeService_initializers, void 0));
            this.#notificationService_accessor_storage = (__runInitializers(this, _affineThemeService_extraInitializers), __runInitializers(this, _notificationService_initializers, void 0));
            this.#aiToolsConfigService_accessor_storage = (__runInitializers(this, _notificationService_extraInitializers), __runInitializers(this, _aiToolsConfigService_initializers, void 0));
            this.#session_accessor_storage = (__runInitializers(this, _aiToolsConfigService_extraInitializers), __runInitializers(this, _session_initializers, void 0));
            this.#status_accessor_storage = (__runInitializers(this, _session_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.#embeddingProgress_accessor_storage = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _embeddingProgress_initializers, [0, 0]));
            this.#newSession_accessor_storage = (__runInitializers(this, _embeddingProgress_extraInitializers), __runInitializers(this, _newSession_initializers, void 0));
            this.#togglePin_accessor_storage = (__runInitializers(this, _newSession_extraInitializers), __runInitializers(this, _togglePin_initializers, void 0));
            this.#openSession_accessor_storage = (__runInitializers(this, _togglePin_extraInitializers), __runInitializers(this, _openSession_initializers, void 0));
            this.#openDoc_accessor_storage = (__runInitializers(this, _openSession_extraInitializers), __runInitializers(this, _openDoc_initializers, void 0));
            this.#deleteSession_accessor_storage = (__runInitializers(this, _openDoc_extraInitializers), __runInitializers(this, _deleteSession_initializers, void 0));
            this.openPlayground = (__runInitializers(this, _deleteSession_extraInitializers), () => {
                const playgroundContent = html `
      <playground-content
        .host=${this.host}
        .doc=${this.doc}
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
        .affineWorkspaceDialogService=${this.affineWorkspaceDialogService}
        .aiToolsConfigService=${this.aiToolsConfigService}
      ></playground-content>
    `;
                createPlaygroundModal(playgroundContent, 'AI Playground');
            });
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _host_decorators = [property({ attribute: false })];
            _doc_decorators = [property({ attribute: false })];
            _playgroundConfig_decorators = [property({ attribute: false })];
            _appSidebarConfig_decorators = [property({ attribute: false })];
            _networkSearchConfig_decorators = [property({ attribute: false })];
            _reasoningConfig_decorators = [property({ attribute: false })];
            _searchMenuConfig_decorators = [property({ attribute: false })];
            _docDisplayConfig_decorators = [property({ attribute: false })];
            _extensions_decorators = [property({ attribute: false })];
            _serverService_decorators = [property({ attribute: false })];
            _affineFeatureFlagService_decorators = [property({ attribute: false })];
            _affineWorkspaceDialogService_decorators = [property({ attribute: false })];
            _affineThemeService_decorators = [property({ attribute: false })];
            _notificationService_decorators = [property({ attribute: false })];
            _aiToolsConfigService_decorators = [property({ attribute: false })];
            _session_decorators = [property({ attribute: false })];
            _status_decorators = [property({ attribute: false })];
            _embeddingProgress_decorators = [property({ attribute: false })];
            _newSession_decorators = [property({ attribute: false })];
            _togglePin_decorators = [property({ attribute: false })];
            _openSession_decorators = [property({ attribute: false })];
            _openDoc_decorators = [property({ attribute: false })];
            _deleteSession_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _doc_decorators, { kind: "accessor", name: "doc", static: false, private: false, access: { has: obj => "doc" in obj, get: obj => obj.doc, set: (obj, value) => { obj.doc = value; } }, metadata: _metadata }, _doc_initializers, _doc_extraInitializers);
            __esDecorate(this, null, _playgroundConfig_decorators, { kind: "accessor", name: "playgroundConfig", static: false, private: false, access: { has: obj => "playgroundConfig" in obj, get: obj => obj.playgroundConfig, set: (obj, value) => { obj.playgroundConfig = value; } }, metadata: _metadata }, _playgroundConfig_initializers, _playgroundConfig_extraInitializers);
            __esDecorate(this, null, _appSidebarConfig_decorators, { kind: "accessor", name: "appSidebarConfig", static: false, private: false, access: { has: obj => "appSidebarConfig" in obj, get: obj => obj.appSidebarConfig, set: (obj, value) => { obj.appSidebarConfig = value; } }, metadata: _metadata }, _appSidebarConfig_initializers, _appSidebarConfig_extraInitializers);
            __esDecorate(this, null, _networkSearchConfig_decorators, { kind: "accessor", name: "networkSearchConfig", static: false, private: false, access: { has: obj => "networkSearchConfig" in obj, get: obj => obj.networkSearchConfig, set: (obj, value) => { obj.networkSearchConfig = value; } }, metadata: _metadata }, _networkSearchConfig_initializers, _networkSearchConfig_extraInitializers);
            __esDecorate(this, null, _reasoningConfig_decorators, { kind: "accessor", name: "reasoningConfig", static: false, private: false, access: { has: obj => "reasoningConfig" in obj, get: obj => obj.reasoningConfig, set: (obj, value) => { obj.reasoningConfig = value; } }, metadata: _metadata }, _reasoningConfig_initializers, _reasoningConfig_extraInitializers);
            __esDecorate(this, null, _searchMenuConfig_decorators, { kind: "accessor", name: "searchMenuConfig", static: false, private: false, access: { has: obj => "searchMenuConfig" in obj, get: obj => obj.searchMenuConfig, set: (obj, value) => { obj.searchMenuConfig = value; } }, metadata: _metadata }, _searchMenuConfig_initializers, _searchMenuConfig_extraInitializers);
            __esDecorate(this, null, _docDisplayConfig_decorators, { kind: "accessor", name: "docDisplayConfig", static: false, private: false, access: { has: obj => "docDisplayConfig" in obj, get: obj => obj.docDisplayConfig, set: (obj, value) => { obj.docDisplayConfig = value; } }, metadata: _metadata }, _docDisplayConfig_initializers, _docDisplayConfig_extraInitializers);
            __esDecorate(this, null, _extensions_decorators, { kind: "accessor", name: "extensions", static: false, private: false, access: { has: obj => "extensions" in obj, get: obj => obj.extensions, set: (obj, value) => { obj.extensions = value; } }, metadata: _metadata }, _extensions_initializers, _extensions_extraInitializers);
            __esDecorate(this, null, _serverService_decorators, { kind: "accessor", name: "serverService", static: false, private: false, access: { has: obj => "serverService" in obj, get: obj => obj.serverService, set: (obj, value) => { obj.serverService = value; } }, metadata: _metadata }, _serverService_initializers, _serverService_extraInitializers);
            __esDecorate(this, null, _affineFeatureFlagService_decorators, { kind: "accessor", name: "affineFeatureFlagService", static: false, private: false, access: { has: obj => "affineFeatureFlagService" in obj, get: obj => obj.affineFeatureFlagService, set: (obj, value) => { obj.affineFeatureFlagService = value; } }, metadata: _metadata }, _affineFeatureFlagService_initializers, _affineFeatureFlagService_extraInitializers);
            __esDecorate(this, null, _affineWorkspaceDialogService_decorators, { kind: "accessor", name: "affineWorkspaceDialogService", static: false, private: false, access: { has: obj => "affineWorkspaceDialogService" in obj, get: obj => obj.affineWorkspaceDialogService, set: (obj, value) => { obj.affineWorkspaceDialogService = value; } }, metadata: _metadata }, _affineWorkspaceDialogService_initializers, _affineWorkspaceDialogService_extraInitializers);
            __esDecorate(this, null, _affineThemeService_decorators, { kind: "accessor", name: "affineThemeService", static: false, private: false, access: { has: obj => "affineThemeService" in obj, get: obj => obj.affineThemeService, set: (obj, value) => { obj.affineThemeService = value; } }, metadata: _metadata }, _affineThemeService_initializers, _affineThemeService_extraInitializers);
            __esDecorate(this, null, _notificationService_decorators, { kind: "accessor", name: "notificationService", static: false, private: false, access: { has: obj => "notificationService" in obj, get: obj => obj.notificationService, set: (obj, value) => { obj.notificationService = value; } }, metadata: _metadata }, _notificationService_initializers, _notificationService_extraInitializers);
            __esDecorate(this, null, _aiToolsConfigService_decorators, { kind: "accessor", name: "aiToolsConfigService", static: false, private: false, access: { has: obj => "aiToolsConfigService" in obj, get: obj => obj.aiToolsConfigService, set: (obj, value) => { obj.aiToolsConfigService = value; } }, metadata: _metadata }, _aiToolsConfigService_initializers, _aiToolsConfigService_extraInitializers);
            __esDecorate(this, null, _session_decorators, { kind: "accessor", name: "session", static: false, private: false, access: { has: obj => "session" in obj, get: obj => obj.session, set: (obj, value) => { obj.session = value; } }, metadata: _metadata }, _session_initializers, _session_extraInitializers);
            __esDecorate(this, null, _status_decorators, { kind: "accessor", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(this, null, _embeddingProgress_decorators, { kind: "accessor", name: "embeddingProgress", static: false, private: false, access: { has: obj => "embeddingProgress" in obj, get: obj => obj.embeddingProgress, set: (obj, value) => { obj.embeddingProgress = value; } }, metadata: _metadata }, _embeddingProgress_initializers, _embeddingProgress_extraInitializers);
            __esDecorate(this, null, _newSession_decorators, { kind: "accessor", name: "newSession", static: false, private: false, access: { has: obj => "newSession" in obj, get: obj => obj.newSession, set: (obj, value) => { obj.newSession = value; } }, metadata: _metadata }, _newSession_initializers, _newSession_extraInitializers);
            __esDecorate(this, null, _togglePin_decorators, { kind: "accessor", name: "togglePin", static: false, private: false, access: { has: obj => "togglePin" in obj, get: obj => obj.togglePin, set: (obj, value) => { obj.togglePin = value; } }, metadata: _metadata }, _togglePin_initializers, _togglePin_extraInitializers);
            __esDecorate(this, null, _openSession_decorators, { kind: "accessor", name: "openSession", static: false, private: false, access: { has: obj => "openSession" in obj, get: obj => obj.openSession, set: (obj, value) => { obj.openSession = value; } }, metadata: _metadata }, _openSession_initializers, _openSession_extraInitializers);
            __esDecorate(this, null, _openDoc_decorators, { kind: "accessor", name: "openDoc", static: false, private: false, access: { has: obj => "openDoc" in obj, get: obj => obj.openDoc, set: (obj, value) => { obj.openDoc = value; } }, metadata: _metadata }, _openDoc_initializers, _openDoc_extraInitializers);
            __esDecorate(this, null, _deleteSession_decorators, { kind: "accessor", name: "deleteSession", static: false, private: false, access: { has: obj => "deleteSession" in obj, get: obj => obj.deleteSession, set: (obj, value) => { obj.deleteSession = value; } }, metadata: _metadata }, _deleteSession_initializers, _deleteSession_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .ai-chat-panel-title {
      background: var(--affine-background-primary-color);
      position: relative;
      padding: 8px var(--h-padding, 16px);
      width: 100%;
      height: 36px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 1;

      svg {
        width: 18px;
        height: 18px;
        color: var(--affine-text-secondary-color);
      }

      .chat-panel-title-text {
        font-size: 14px;
        font-weight: 500;
        color: var(--affine-text-secondary-color);
      }

      .chat-panel-playground {
        cursor: pointer;
        padding: 2px;
        margin-left: 8px;
        margin-right: auto;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .chat-panel-playground:hover svg {
        color: ${unsafeCSSVarV2('icon/activated')};
      }
    }
  `; }
        #host_accessor_storage;
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #doc_accessor_storage;
        get doc() { return this.#doc_accessor_storage; }
        set doc(value) { this.#doc_accessor_storage = value; }
        #playgroundConfig_accessor_storage;
        get playgroundConfig() { return this.#playgroundConfig_accessor_storage; }
        set playgroundConfig(value) { this.#playgroundConfig_accessor_storage = value; }
        #appSidebarConfig_accessor_storage;
        get appSidebarConfig() { return this.#appSidebarConfig_accessor_storage; }
        set appSidebarConfig(value) { this.#appSidebarConfig_accessor_storage = value; }
        #networkSearchConfig_accessor_storage;
        get networkSearchConfig() { return this.#networkSearchConfig_accessor_storage; }
        set networkSearchConfig(value) { this.#networkSearchConfig_accessor_storage = value; }
        #reasoningConfig_accessor_storage;
        get reasoningConfig() { return this.#reasoningConfig_accessor_storage; }
        set reasoningConfig(value) { this.#reasoningConfig_accessor_storage = value; }
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
        #affineWorkspaceDialogService_accessor_storage;
        get affineWorkspaceDialogService() { return this.#affineWorkspaceDialogService_accessor_storage; }
        set affineWorkspaceDialogService(value) { this.#affineWorkspaceDialogService_accessor_storage = value; }
        #affineThemeService_accessor_storage;
        get affineThemeService() { return this.#affineThemeService_accessor_storage; }
        set affineThemeService(value) { this.#affineThemeService_accessor_storage = value; }
        #notificationService_accessor_storage;
        get notificationService() { return this.#notificationService_accessor_storage; }
        set notificationService(value) { this.#notificationService_accessor_storage = value; }
        #aiToolsConfigService_accessor_storage;
        get aiToolsConfigService() { return this.#aiToolsConfigService_accessor_storage; }
        set aiToolsConfigService(value) { this.#aiToolsConfigService_accessor_storage = value; }
        #session_accessor_storage;
        get session() { return this.#session_accessor_storage; }
        set session(value) { this.#session_accessor_storage = value; }
        #status_accessor_storage;
        get status() { return this.#status_accessor_storage; }
        set status(value) { this.#status_accessor_storage = value; }
        #embeddingProgress_accessor_storage;
        get embeddingProgress() { return this.#embeddingProgress_accessor_storage; }
        set embeddingProgress(value) { this.#embeddingProgress_accessor_storage = value; }
        #newSession_accessor_storage;
        get newSession() { return this.#newSession_accessor_storage; }
        set newSession(value) { this.#newSession_accessor_storage = value; }
        #togglePin_accessor_storage;
        get togglePin() { return this.#togglePin_accessor_storage; }
        set togglePin(value) { this.#togglePin_accessor_storage = value; }
        #openSession_accessor_storage;
        get openSession() { return this.#openSession_accessor_storage; }
        set openSession(value) { this.#openSession_accessor_storage = value; }
        #openDoc_accessor_storage;
        get openDoc() { return this.#openDoc_accessor_storage; }
        set openDoc(value) { this.#openDoc_accessor_storage = value; }
        #deleteSession_accessor_storage;
        get deleteSession() { return this.#deleteSession_accessor_storage; }
        set deleteSession(value) { this.#deleteSession_accessor_storage = value; }
        render() {
            const [done, total] = this.embeddingProgress;
            const isEmbedding = total > 0 && done < total;
            return html `
      <div class="ai-chat-panel-title">
        <div class="chat-panel-title-text">
          ${isEmbedding
                ? html `<span data-testid="chat-panel-embedding-progress"
                >Embedding ${done}/${total}</span
              >`
                : 'AFFiNE AI'}
        </div>
        ${this.playgroundConfig.visible.value
                ? html `
              <div class="chat-panel-playground" @click=${this.openPlayground}>
                ${CenterPeekIcon()}
              </div>
            `
                : nothing}
        <ai-chat-toolbar
          .session=${this.session}
          .workspaceId=${this.doc.workspace.id}
          .docId=${this.doc.id}
          .status=${this.status}
          .onNewSession=${this.newSession}
          .onTogglePin=${this.togglePin}
          .onOpenSession=${this.openSession}
          .onOpenDoc=${this.openDoc}
          .onSessionDelete=${this.deleteSession}
          .docDisplayConfig=${this.docDisplayConfig}
          .notificationService=${this.notificationService}
        ></ai-chat-toolbar>
      </div>
    `;
        }
    };
})();
export { AIChatPanelTitle };
//# sourceMappingURL=ai-title.js.map