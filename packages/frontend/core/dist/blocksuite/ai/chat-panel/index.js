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
import { ShadowlessElement } from '@blocksuite/affine/std';
import { signal } from '@preact/signals-core';
import { css, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { keyed } from 'lit/directives/keyed.js';
import { AffineIcon } from '../_common/icons';
import { AIProvider } from '../provider';
let ChatPanel = (() => {
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
    let _affineWorkbenchService_decorators;
    let _affineWorkbenchService_initializers = [];
    let _affineWorkbenchService_extraInitializers = [];
    let _affineThemeService_decorators;
    let _affineThemeService_initializers = [];
    let _affineThemeService_extraInitializers = [];
    let _notificationService_decorators;
    let _notificationService_initializers = [];
    let _notificationService_extraInitializers = [];
    let _aiDraftService_decorators;
    let _aiDraftService_initializers = [];
    let _aiDraftService_extraInitializers = [];
    let _aiToolsConfigService_decorators;
    let _aiToolsConfigService_initializers = [];
    let _aiToolsConfigService_extraInitializers = [];
    let _peekViewService_decorators;
    let _peekViewService_initializers = [];
    let _peekViewService_extraInitializers = [];
    let _subscriptionService_decorators;
    let _subscriptionService_initializers = [];
    let _subscriptionService_extraInitializers = [];
    let _aiModelService_decorators;
    let _aiModelService_initializers = [];
    let _aiModelService_extraInitializers = [];
    let _onAISubscribe_decorators;
    let _onAISubscribe_initializers = [];
    let _onAISubscribe_extraInitializers = [];
    let _session_decorators;
    let _session_initializers = [];
    let _session_extraInitializers = [];
    let _embeddingProgress_decorators;
    let _embeddingProgress_initializers = [];
    let _embeddingProgress_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    return class ChatPanel extends _classSuper {
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
            this.#affineWorkbenchService_accessor_storage = (__runInitializers(this, _affineWorkspaceDialogService_extraInitializers), __runInitializers(this, _affineWorkbenchService_initializers, void 0));
            this.#affineThemeService_accessor_storage = (__runInitializers(this, _affineWorkbenchService_extraInitializers), __runInitializers(this, _affineThemeService_initializers, void 0));
            this.#notificationService_accessor_storage = (__runInitializers(this, _affineThemeService_extraInitializers), __runInitializers(this, _notificationService_initializers, void 0));
            this.#aiDraftService_accessor_storage = (__runInitializers(this, _notificationService_extraInitializers), __runInitializers(this, _aiDraftService_initializers, void 0));
            this.#aiToolsConfigService_accessor_storage = (__runInitializers(this, _aiDraftService_extraInitializers), __runInitializers(this, _aiToolsConfigService_initializers, void 0));
            this.#peekViewService_accessor_storage = (__runInitializers(this, _aiToolsConfigService_extraInitializers), __runInitializers(this, _peekViewService_initializers, void 0));
            this.#subscriptionService_accessor_storage = (__runInitializers(this, _peekViewService_extraInitializers), __runInitializers(this, _subscriptionService_initializers, void 0));
            this.#aiModelService_accessor_storage = (__runInitializers(this, _subscriptionService_extraInitializers), __runInitializers(this, _aiModelService_initializers, void 0));
            this.#onAISubscribe_accessor_storage = (__runInitializers(this, _aiModelService_extraInitializers), __runInitializers(this, _onAISubscribe_initializers, void 0));
            this.#session_accessor_storage = (__runInitializers(this, _onAISubscribe_extraInitializers), __runInitializers(this, _session_initializers, void 0));
            this.#embeddingProgress_accessor_storage = (__runInitializers(this, _session_extraInitializers), __runInitializers(this, _embeddingProgress_initializers, [0, 0]));
            this.#status_accessor_storage = (__runInitializers(this, _embeddingProgress_extraInitializers), __runInitializers(this, _status_initializers, 'idle'));
            this.isSidebarOpen = (__runInitializers(this, _status_extraInitializers), signal(false));
            this.sidebarWidth = signal(undefined);
            this.hasPinned = false;
            this.getSessionIdFromUrl = () => {
                if (this.affineWorkbenchService) {
                    const { workbench } = this.affineWorkbenchService;
                    const location = workbench.location$.value;
                    const searchParams = new URLSearchParams(location.search);
                    const sessionId = searchParams.get('sessionId');
                    if (sessionId) {
                        workbench.activeView$.value.updateQueryString({ sessionId: undefined }, { replace: true });
                    }
                    return sessionId;
                }
                return undefined;
            };
            this.setSession = (session) => {
                this.session = session ?? null;
            };
            this.initSession = async () => {
                if (!AIProvider.session) {
                    return;
                }
                const sessionId = this.getSessionIdFromUrl();
                const pinSessions = await AIProvider.session.getSessions(this.doc.workspace.id, undefined, { pinned: true, limit: 1 });
                if (Array.isArray(pinSessions) && pinSessions[0]) {
                    // pinned session
                    this.session = pinSessions[0];
                }
                else if (sessionId) {
                    // sessionId from url
                    const session = await AIProvider.session.getSession(this.doc.workspace.id, sessionId);
                    this.setSession(session);
                }
                else {
                    // latest doc session
                    const docSessions = await AIProvider.session.getSessions(this.doc.workspace.id, this.doc.id, { action: false, fork: false, limit: 1 });
                    // sessions is descending ordered by updatedAt
                    // the first item is the latest session
                    const session = docSessions?.[0];
                    this.setSession(session);
                }
            };
            this.createSession = async (options = {}) => {
                if (this.session) {
                    return this.session;
                }
                const sessionId = await AIProvider.session?.createSession({
                    docId: this.doc.id,
                    workspaceId: this.doc.workspace.id,
                    promptName: 'Chat With AFFiNE AI',
                    reuseLatestChat: false,
                    ...options,
                });
                if (sessionId) {
                    const session = await AIProvider.session?.getSession(this.doc.workspace.id, sessionId);
                    this.setSession(session);
                }
                return this.session;
            };
            this.deleteSession = async (session) => {
                if (!AIProvider.histories) {
                    return;
                }
                const confirm = await this.notificationService.confirm({
                    title: 'Delete this history?',
                    message: 'Do you want to delete this AI conversation history? Once deleted, it cannot be recovered.',
                    confirmText: 'Delete',
                    cancelText: 'Cancel',
                });
                if (confirm) {
                    await AIProvider.histories.cleanup(session.workspaceId, session.docId || undefined, [session.sessionId]);
                    if (session.sessionId === this.session?.sessionId) {
                        this.newSession();
                    }
                }
            };
            this.updateSession = async (options) => {
                await AIProvider.session?.updateSession(options);
                const session = await AIProvider.session?.getSession(this.doc.workspace.id, options.sessionId);
                this.setSession(session);
            };
            this.newSession = () => {
                this.resetPanel();
                requestAnimationFrame(() => {
                    this.session = null;
                });
            };
            this.openSession = async (sessionId) => {
                if (this.session?.sessionId === sessionId) {
                    return;
                }
                this.resetPanel();
                const session = await AIProvider.session?.getSession(this.doc.workspace.id, sessionId);
                this.setSession(session);
            };
            this.openDoc = async (docId, sessionId) => {
                if (this.doc.id === docId) {
                    if (this.session?.sessionId === sessionId || this.session?.pinned) {
                        return;
                    }
                    await this.openSession(sessionId);
                }
                else if (this.affineWorkbenchService) {
                    const { workbench } = this.affineWorkbenchService;
                    if (this.session?.pinned) {
                        workbench.open(`/${docId}`, { at: 'active' });
                    }
                    else {
                        workbench.open(`/${docId}?sessionId=${sessionId}`, { at: 'active' });
                    }
                }
            };
            this.togglePin = async () => {
                const pinned = !this.session?.pinned;
                this.hasPinned = true;
                if (!this.session) {
                    await this.createSession({ pinned });
                }
                else {
                    await this.updateSession({
                        sessionId: this.session.sessionId,
                        pinned,
                    });
                }
            };
            this.rebindSession = async () => {
                if (!this.session) {
                    return;
                }
                if (this.session.docId !== this.doc.id) {
                    await this.updateSession({
                        sessionId: this.session.sessionId,
                        docId: this.doc.id,
                    });
                }
            };
            this.initPanel = async () => {
                try {
                    if (!this.isSidebarOpen.value) {
                        return;
                    }
                    await this.initSession();
                    this.hasPinned = !!this.session?.pinned;
                }
                catch (error) {
                    console.error(error);
                }
            };
            this.resetPanel = () => {
                this.session = undefined;
                this.embeddingProgress = [0, 0];
                this.hasPinned = false;
            };
            this.onEmbeddingProgressChange = (count) => {
                const total = count.finished + count.processing + count.failed;
                this.embeddingProgress = [count.finished, total];
            };
            this.onContextChange = async (context) => {
                this.status = context.status ?? 'idle';
                if (context.status === 'success') {
                    await this.rebindSession();
                }
            };
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
            _affineWorkbenchService_decorators = [property({ attribute: false })];
            _affineThemeService_decorators = [property({ attribute: false })];
            _notificationService_decorators = [property({ attribute: false })];
            _aiDraftService_decorators = [property({ attribute: false })];
            _aiToolsConfigService_decorators = [property({ attribute: false })];
            _peekViewService_decorators = [property({ attribute: false })];
            _subscriptionService_decorators = [property({ attribute: false })];
            _aiModelService_decorators = [property({ attribute: false })];
            _onAISubscribe_decorators = [property({ attribute: false })];
            _session_decorators = [state()];
            _embeddingProgress_decorators = [state()];
            _status_decorators = [state()];
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
            __esDecorate(this, null, _affineWorkbenchService_decorators, { kind: "accessor", name: "affineWorkbenchService", static: false, private: false, access: { has: obj => "affineWorkbenchService" in obj, get: obj => obj.affineWorkbenchService, set: (obj, value) => { obj.affineWorkbenchService = value; } }, metadata: _metadata }, _affineWorkbenchService_initializers, _affineWorkbenchService_extraInitializers);
            __esDecorate(this, null, _affineThemeService_decorators, { kind: "accessor", name: "affineThemeService", static: false, private: false, access: { has: obj => "affineThemeService" in obj, get: obj => obj.affineThemeService, set: (obj, value) => { obj.affineThemeService = value; } }, metadata: _metadata }, _affineThemeService_initializers, _affineThemeService_extraInitializers);
            __esDecorate(this, null, _notificationService_decorators, { kind: "accessor", name: "notificationService", static: false, private: false, access: { has: obj => "notificationService" in obj, get: obj => obj.notificationService, set: (obj, value) => { obj.notificationService = value; } }, metadata: _metadata }, _notificationService_initializers, _notificationService_extraInitializers);
            __esDecorate(this, null, _aiDraftService_decorators, { kind: "accessor", name: "aiDraftService", static: false, private: false, access: { has: obj => "aiDraftService" in obj, get: obj => obj.aiDraftService, set: (obj, value) => { obj.aiDraftService = value; } }, metadata: _metadata }, _aiDraftService_initializers, _aiDraftService_extraInitializers);
            __esDecorate(this, null, _aiToolsConfigService_decorators, { kind: "accessor", name: "aiToolsConfigService", static: false, private: false, access: { has: obj => "aiToolsConfigService" in obj, get: obj => obj.aiToolsConfigService, set: (obj, value) => { obj.aiToolsConfigService = value; } }, metadata: _metadata }, _aiToolsConfigService_initializers, _aiToolsConfigService_extraInitializers);
            __esDecorate(this, null, _peekViewService_decorators, { kind: "accessor", name: "peekViewService", static: false, private: false, access: { has: obj => "peekViewService" in obj, get: obj => obj.peekViewService, set: (obj, value) => { obj.peekViewService = value; } }, metadata: _metadata }, _peekViewService_initializers, _peekViewService_extraInitializers);
            __esDecorate(this, null, _subscriptionService_decorators, { kind: "accessor", name: "subscriptionService", static: false, private: false, access: { has: obj => "subscriptionService" in obj, get: obj => obj.subscriptionService, set: (obj, value) => { obj.subscriptionService = value; } }, metadata: _metadata }, _subscriptionService_initializers, _subscriptionService_extraInitializers);
            __esDecorate(this, null, _aiModelService_decorators, { kind: "accessor", name: "aiModelService", static: false, private: false, access: { has: obj => "aiModelService" in obj, get: obj => obj.aiModelService, set: (obj, value) => { obj.aiModelService = value; } }, metadata: _metadata }, _aiModelService_initializers, _aiModelService_extraInitializers);
            __esDecorate(this, null, _onAISubscribe_decorators, { kind: "accessor", name: "onAISubscribe", static: false, private: false, access: { has: obj => "onAISubscribe" in obj, get: obj => obj.onAISubscribe, set: (obj, value) => { obj.onAISubscribe = value; } }, metadata: _metadata }, _onAISubscribe_initializers, _onAISubscribe_extraInitializers);
            __esDecorate(this, null, _session_decorators, { kind: "accessor", name: "session", static: false, private: false, access: { has: obj => "session" in obj, get: obj => obj.session, set: (obj, value) => { obj.session = value; } }, metadata: _metadata }, _session_initializers, _session_extraInitializers);
            __esDecorate(this, null, _embeddingProgress_decorators, { kind: "accessor", name: "embeddingProgress", static: false, private: false, access: { has: obj => "embeddingProgress" in obj, get: obj => obj.embeddingProgress, set: (obj, value) => { obj.embeddingProgress = value; } }, metadata: _metadata }, _embeddingProgress_initializers, _embeddingProgress_extraInitializers);
            __esDecorate(this, null, _status_decorators, { kind: "accessor", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    chat-panel {
      width: 100%;
      user-select: text;

      .chat-panel-container {
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      ai-chat-content {
        height: 0;
        flex-grow: 1;
      }

      .chat-loading-container {
        position: relative;
        padding: 44px 0 166px 0;
        height: 100%;
        display: flex;
        align-items: center;
      }

      .chat-loading {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
      }

      .chat-loading-title {
        font-weight: 600;
        font-size: var(--affine-font-sm);
        color: var(--affine-text-secondary-color);
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
        #affineWorkbenchService_accessor_storage;
        get affineWorkbenchService() { return this.#affineWorkbenchService_accessor_storage; }
        set affineWorkbenchService(value) { this.#affineWorkbenchService_accessor_storage = value; }
        #affineThemeService_accessor_storage;
        get affineThemeService() { return this.#affineThemeService_accessor_storage; }
        set affineThemeService(value) { this.#affineThemeService_accessor_storage = value; }
        #notificationService_accessor_storage;
        get notificationService() { return this.#notificationService_accessor_storage; }
        set notificationService(value) { this.#notificationService_accessor_storage = value; }
        #aiDraftService_accessor_storage;
        get aiDraftService() { return this.#aiDraftService_accessor_storage; }
        set aiDraftService(value) { this.#aiDraftService_accessor_storage = value; }
        #aiToolsConfigService_accessor_storage;
        get aiToolsConfigService() { return this.#aiToolsConfigService_accessor_storage; }
        set aiToolsConfigService(value) { this.#aiToolsConfigService_accessor_storage = value; }
        #peekViewService_accessor_storage;
        get peekViewService() { return this.#peekViewService_accessor_storage; }
        set peekViewService(value) { this.#peekViewService_accessor_storage = value; }
        #subscriptionService_accessor_storage;
        get subscriptionService() { return this.#subscriptionService_accessor_storage; }
        set subscriptionService(value) { this.#subscriptionService_accessor_storage = value; }
        #aiModelService_accessor_storage;
        get aiModelService() { return this.#aiModelService_accessor_storage; }
        set aiModelService(value) { this.#aiModelService_accessor_storage = value; }
        #onAISubscribe_accessor_storage;
        get onAISubscribe() { return this.#onAISubscribe_accessor_storage; }
        set onAISubscribe(value) { this.#onAISubscribe_accessor_storage = value; }
        #session_accessor_storage;
        get session() { return this.#session_accessor_storage; }
        set session(value) { this.#session_accessor_storage = value; }
        #embeddingProgress_accessor_storage;
        get embeddingProgress() { return this.#embeddingProgress_accessor_storage; }
        set embeddingProgress(value) { this.#embeddingProgress_accessor_storage = value; }
        #status_accessor_storage;
        get status() { return this.#status_accessor_storage; }
        set status(value) { this.#status_accessor_storage = value; }
        get isInitialized() {
            return this.session !== undefined;
        }
        updated(changedProperties) {
            if (changedProperties.has('doc')) {
                if (this.session?.pinned) {
                    return;
                }
                this.resetPanel();
                this.initPanel().catch(console.error);
            }
        }
        connectedCallback() {
            super.connectedCallback();
            if (!this.doc)
                throw new Error('doc is required');
            this._disposables.add(AIProvider.slots.userInfo.subscribe(() => {
                this.resetPanel();
                this.initPanel().catch(console.error);
            }));
            const isOpen = this.appSidebarConfig.isOpen();
            this.isSidebarOpen = isOpen.signal;
            this._disposables.add(isOpen.cleanup);
            const width = this.appSidebarConfig.getWidth();
            this.sidebarWidth = width.signal;
            this._disposables.add(width.cleanup);
            this._disposables.add(this.isSidebarOpen.subscribe(isOpen => {
                if (isOpen && !this.isInitialized) {
                    this.initPanel().catch(console.error);
                }
            }));
        }
        render() {
            if (!this.isInitialized) {
                return html `<div class="chat-loading-container">
        <div class="chat-loading">
          ${AffineIcon('var(--affine-icon-secondary)')}
          <div class="chat-loading-title">
            <span> AFFiNE AI is loading history... </span>
          </div>
        </div>
      </div>`;
            }
            return html `<div class="chat-panel-container">
      <ai-chat-panel-title
        .host=${this.host}
        .doc=${this.doc}
        .playgroundConfig=${this.playgroundConfig}
        .appSidebarConfig=${this.appSidebarConfig}
        .networkSearchConfig=${this.networkSearchConfig}
        .reasoningConfig=${this.reasoningConfig}
        .searchMenuConfig=${this.searchMenuConfig}
        .docDisplayConfig=${this.docDisplayConfig}
        .extensions=${this.extensions}
        .serverService=${this.serverService}
        .affineFeatureFlagService=${this.affineFeatureFlagService}
        .affineWorkspaceDialogService=${this.affineWorkspaceDialogService}
        .affineThemeService=${this.affineThemeService}
        .notificationService=${this.notificationService}
        .aiToolsConfigService=${this.aiToolsConfigService}
        .session=${this.session}
        .status=${this.status}
        .embeddingProgress=${this.embeddingProgress}
        .newSession=${this.newSession}
        .togglePin=${this.togglePin}
        .openSession=${this.openSession}
        .openDoc=${this.openDoc}
        .deleteSession=${this.deleteSession}
      ></ai-chat-panel-title>
      ${keyed(this.hasPinned ? this.session?.sessionId : this.doc.id, html `<ai-chat-content
          .host=${this.host}
          .session=${this.session}
          .createSession=${this.createSession}
          .workspaceId=${this.doc.workspace.id}
          .docId=${this.doc.id}
          .networkSearchConfig=${this.networkSearchConfig}
          .reasoningConfig=${this.reasoningConfig}
          .searchMenuConfig=${this.searchMenuConfig}
          .docDisplayConfig=${this.docDisplayConfig}
          .extensions=${this.extensions}
          .serverService=${this.serverService}
          .affineFeatureFlagService=${this.affineFeatureFlagService}
          .affineWorkspaceDialogService=${this.affineWorkspaceDialogService}
          .affineThemeService=${this.affineThemeService}
          .notificationService=${this.notificationService}
          .aiDraftService=${this.aiDraftService}
          .aiToolsConfigService=${this.aiToolsConfigService}
          .peekViewService=${this.peekViewService}
          .subscriptionService=${this.subscriptionService}
          .aiModelService=${this.aiModelService}
          .onAISubscribe=${this.onAISubscribe}
          .onEmbeddingProgressChange=${this.onEmbeddingProgressChange}
          .onContextChange=${this.onContextChange}
          .width=${this.sidebarWidth}
          .onOpenDoc=${this.openDoc}
        ></ai-chat-content>`)}
    </div>`;
        }
    };
})();
export { ChatPanel };
//# sourceMappingURL=index.js.map