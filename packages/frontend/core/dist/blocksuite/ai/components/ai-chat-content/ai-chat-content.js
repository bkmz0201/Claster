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
import {} from '@preact/signals-core';
import { css, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { styleMap } from 'lit/directives/style-map.js';
import { pick } from 'lodash-es';
import { HISTORY_IMAGE_ACTIONS } from '../../chat-panel/const';
import { AIProvider } from '../../provider/ai-provider';
import { extractSelectedContent } from '../../utils/extract';
import { isChatMessage, } from '../ai-chat-messages';
const DEFAULT_CHAT_CONTEXT_VALUE = {
    quote: '',
    images: [],
    abortController: null,
    messages: [],
    status: 'idle',
    error: null,
    markdown: '',
    snapshot: null,
    attachments: [],
    combinedElementsMarkdown: null,
    docs: [],
    html: null,
};
let AIChatContent = (() => {
    let _classSuper = SignalWatcher(WithDisposable(ShadowlessElement));
    let _independentMode_decorators;
    let _independentMode_initializers = [];
    let _independentMode_extraInitializers = [];
    let _onboardingOffsetY_decorators;
    let _onboardingOffsetY_initializers = [];
    let _onboardingOffsetY_extraInitializers = [];
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _session_decorators;
    let _session_initializers = [];
    let _session_extraInitializers = [];
    let _createSession_decorators;
    let _createSession_initializers = [];
    let _createSession_extraInitializers = [];
    let _workspaceId_decorators;
    let _workspaceId_initializers = [];
    let _workspaceId_extraInitializers = [];
    let _docId_decorators;
    let _docId_initializers = [];
    let _docId_extraInitializers = [];
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
    let _aiDraftService_decorators;
    let _aiDraftService_initializers = [];
    let _aiDraftService_extraInitializers = [];
    let _aiToolsConfigService_decorators;
    let _aiToolsConfigService_initializers = [];
    let _aiToolsConfigService_extraInitializers = [];
    let _aiModelService_decorators;
    let _aiModelService_initializers = [];
    let _aiModelService_extraInitializers = [];
    let _onEmbeddingProgressChange_decorators;
    let _onEmbeddingProgressChange_initializers = [];
    let _onEmbeddingProgressChange_extraInitializers = [];
    let _onContextChange_decorators;
    let _onContextChange_initializers = [];
    let _onContextChange_extraInitializers = [];
    let _onOpenDoc_decorators;
    let _onOpenDoc_initializers = [];
    let _onOpenDoc_extraInitializers = [];
    let _width_decorators;
    let _width_initializers = [];
    let _width_extraInitializers = [];
    let _peekViewService_decorators;
    let _peekViewService_initializers = [];
    let _peekViewService_extraInitializers = [];
    let _subscriptionService_decorators;
    let _subscriptionService_initializers = [];
    let _subscriptionService_extraInitializers = [];
    let _onAISubscribe_decorators;
    let _onAISubscribe_initializers = [];
    let _onAISubscribe_extraInitializers = [];
    let _chatContextValue_decorators;
    let _chatContextValue_initializers = [];
    let _chatContextValue_extraInitializers = [];
    let _isHistoryLoading_decorators;
    let _isHistoryLoading_initializers = [];
    let _isHistoryLoading_extraInitializers = [];
    let _showPreviewPanel_decorators;
    let _showPreviewPanel_initializers = [];
    let _showPreviewPanel_extraInitializers = [];
    let _previewPanelContent_decorators;
    let _previewPanelContent_initializers = [];
    let _previewPanelContent_extraInitializers = [];
    return class AIChatContent extends _classSuper {
        constructor() {
            super(...arguments);
            this.#independentMode_accessor_storage = __runInitializers(this, _independentMode_initializers, void 0);
            this.#onboardingOffsetY_accessor_storage = (__runInitializers(this, _independentMode_extraInitializers), __runInitializers(this, _onboardingOffsetY_initializers, void 0));
            this.#host_accessor_storage = (__runInitializers(this, _onboardingOffsetY_extraInitializers), __runInitializers(this, _host_initializers, void 0));
            this.#session_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _session_initializers, void 0));
            this.#createSession_accessor_storage = (__runInitializers(this, _session_extraInitializers), __runInitializers(this, _createSession_initializers, void 0));
            this.#workspaceId_accessor_storage = (__runInitializers(this, _createSession_extraInitializers), __runInitializers(this, _workspaceId_initializers, void 0));
            this.#docId_accessor_storage = (__runInitializers(this, _workspaceId_extraInitializers), __runInitializers(this, _docId_initializers, void 0));
            this.#networkSearchConfig_accessor_storage = (__runInitializers(this, _docId_extraInitializers), __runInitializers(this, _networkSearchConfig_initializers, void 0));
            this.#reasoningConfig_accessor_storage = (__runInitializers(this, _networkSearchConfig_extraInitializers), __runInitializers(this, _reasoningConfig_initializers, void 0));
            this.#searchMenuConfig_accessor_storage = (__runInitializers(this, _reasoningConfig_extraInitializers), __runInitializers(this, _searchMenuConfig_initializers, void 0));
            this.#docDisplayConfig_accessor_storage = (__runInitializers(this, _searchMenuConfig_extraInitializers), __runInitializers(this, _docDisplayConfig_initializers, void 0));
            this.#extensions_accessor_storage = (__runInitializers(this, _docDisplayConfig_extraInitializers), __runInitializers(this, _extensions_initializers, void 0));
            this.#serverService_accessor_storage = (__runInitializers(this, _extensions_extraInitializers), __runInitializers(this, _serverService_initializers, void 0));
            this.#affineFeatureFlagService_accessor_storage = (__runInitializers(this, _serverService_extraInitializers), __runInitializers(this, _affineFeatureFlagService_initializers, void 0));
            this.#affineWorkspaceDialogService_accessor_storage = (__runInitializers(this, _affineFeatureFlagService_extraInitializers), __runInitializers(this, _affineWorkspaceDialogService_initializers, void 0));
            this.#affineThemeService_accessor_storage = (__runInitializers(this, _affineWorkspaceDialogService_extraInitializers), __runInitializers(this, _affineThemeService_initializers, void 0));
            this.#notificationService_accessor_storage = (__runInitializers(this, _affineThemeService_extraInitializers), __runInitializers(this, _notificationService_initializers, void 0));
            this.#aiDraftService_accessor_storage = (__runInitializers(this, _notificationService_extraInitializers), __runInitializers(this, _aiDraftService_initializers, void 0));
            this.#aiToolsConfigService_accessor_storage = (__runInitializers(this, _aiDraftService_extraInitializers), __runInitializers(this, _aiToolsConfigService_initializers, void 0));
            this.#aiModelService_accessor_storage = (__runInitializers(this, _aiToolsConfigService_extraInitializers), __runInitializers(this, _aiModelService_initializers, void 0));
            this.#onEmbeddingProgressChange_accessor_storage = (__runInitializers(this, _aiModelService_extraInitializers), __runInitializers(this, _onEmbeddingProgressChange_initializers, void 0));
            this.#onContextChange_accessor_storage = (__runInitializers(this, _onEmbeddingProgressChange_extraInitializers), __runInitializers(this, _onContextChange_initializers, void 0));
            this.#onOpenDoc_accessor_storage = (__runInitializers(this, _onContextChange_extraInitializers), __runInitializers(this, _onOpenDoc_initializers, void 0));
            this.#width_accessor_storage = (__runInitializers(this, _onOpenDoc_extraInitializers), __runInitializers(this, _width_initializers, void 0));
            this.#peekViewService_accessor_storage = (__runInitializers(this, _width_extraInitializers), __runInitializers(this, _peekViewService_initializers, void 0));
            this.#subscriptionService_accessor_storage = (__runInitializers(this, _peekViewService_extraInitializers), __runInitializers(this, _subscriptionService_initializers, void 0));
            this.#onAISubscribe_accessor_storage = (__runInitializers(this, _subscriptionService_extraInitializers), __runInitializers(this, _onAISubscribe_initializers, void 0));
            this.#chatContextValue_accessor_storage = (__runInitializers(this, _onAISubscribe_extraInitializers), __runInitializers(this, _chatContextValue_initializers, DEFAULT_CHAT_CONTEXT_VALUE));
            this.#isHistoryLoading_accessor_storage = (__runInitializers(this, _chatContextValue_extraInitializers), __runInitializers(this, _isHistoryLoading_initializers, false));
            this.#showPreviewPanel_accessor_storage = (__runInitializers(this, _isHistoryLoading_extraInitializers), __runInitializers(this, _showPreviewPanel_initializers, false));
            this.#previewPanelContent_accessor_storage = (__runInitializers(this, _showPreviewPanel_extraInitializers), __runInitializers(this, _previewPanelContent_initializers, null));
            this.chatMessagesRef = (__runInitializers(this, _previewPanelContent_extraInitializers), createRef());
            // request counter to track the latest request
            this.updateHistoryCounter = 0;
            this.updateHistory = async () => {
                const currentRequest = ++this.updateHistoryCounter;
                if (!AIProvider.histories) {
                    return;
                }
                const sessionId = this.session?.sessionId;
                const [histories, actions] = await Promise.all([
                    sessionId
                        ? AIProvider.histories.chats(this.workspaceId, sessionId)
                        : Promise.resolve([]),
                    this.docId && this.showActions
                        ? AIProvider.histories.actions(this.workspaceId, this.docId)
                        : Promise.resolve([]),
                ]);
                // Check if this is still the latest request
                if (currentRequest !== this.updateHistoryCounter) {
                    return;
                }
                const messages = this.chatContextValue.messages
                    .slice()
                    .filter(isChatMessage);
                const chatActions = (actions || []);
                messages.push(...chatActions);
                const chatMessages = (histories?.[0]?.messages || []);
                messages.push(...chatMessages);
                this.updateContext({
                    messages: messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
                });
            };
            this.updateActions = async () => {
                if (!this.docId || !AIProvider.histories || !this.showActions) {
                    return;
                }
                const actions = await AIProvider.histories.actions(this.workspaceId, this.docId);
                if (actions && actions.length) {
                    const chatMessages = this.chatContextValue.messages.filter(message => isChatMessage(message));
                    const chatActions = actions;
                    const messages = [...chatMessages, ...chatActions];
                    this.updateContext({
                        messages: messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
                    });
                }
            };
            this.updateContext = (context) => {
                this.chatContextValue = { ...this.chatContextValue, ...context };
                this.onContextChange?.(context);
                this.updateDraft(context).catch(console.error);
            };
            this.updateDraft = async (context) => {
                if (!this.aiDraftService) {
                    return;
                }
                const draft = pick(context, [
                    'quote',
                    'images',
                    'markdown',
                ]);
                if (!Object.keys(draft).length) {
                    return;
                }
                await this.aiDraftService.setDraft(draft);
            };
            this.initChatContent = async () => {
                this.isHistoryLoading = true;
                await this.updateHistory();
                this.isHistoryLoading = false;
            };
            this._scrollListenersInitialized = false;
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _independentMode_decorators = [property({ attribute: false })];
            _onboardingOffsetY_decorators = [property({ attribute: false })];
            _host_decorators = [property({ attribute: false })];
            _session_decorators = [property({ attribute: false })];
            _createSession_decorators = [property({ attribute: false })];
            _workspaceId_decorators = [property({ attribute: false })];
            _docId_decorators = [property({ attribute: false })];
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
            _aiDraftService_decorators = [property({ attribute: false })];
            _aiToolsConfigService_decorators = [property({ attribute: false })];
            _aiModelService_decorators = [property({ attribute: false })];
            _onEmbeddingProgressChange_decorators = [property({ attribute: false })];
            _onContextChange_decorators = [property({ attribute: false })];
            _onOpenDoc_decorators = [property({ attribute: false })];
            _width_decorators = [property({ attribute: false })];
            _peekViewService_decorators = [property({ attribute: false })];
            _subscriptionService_decorators = [property({ attribute: false })];
            _onAISubscribe_decorators = [property({ attribute: false })];
            _chatContextValue_decorators = [state()];
            _isHistoryLoading_decorators = [state()];
            _showPreviewPanel_decorators = [state()];
            _previewPanelContent_decorators = [state()];
            __esDecorate(this, null, _independentMode_decorators, { kind: "accessor", name: "independentMode", static: false, private: false, access: { has: obj => "independentMode" in obj, get: obj => obj.independentMode, set: (obj, value) => { obj.independentMode = value; } }, metadata: _metadata }, _independentMode_initializers, _independentMode_extraInitializers);
            __esDecorate(this, null, _onboardingOffsetY_decorators, { kind: "accessor", name: "onboardingOffsetY", static: false, private: false, access: { has: obj => "onboardingOffsetY" in obj, get: obj => obj.onboardingOffsetY, set: (obj, value) => { obj.onboardingOffsetY = value; } }, metadata: _metadata }, _onboardingOffsetY_initializers, _onboardingOffsetY_extraInitializers);
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _session_decorators, { kind: "accessor", name: "session", static: false, private: false, access: { has: obj => "session" in obj, get: obj => obj.session, set: (obj, value) => { obj.session = value; } }, metadata: _metadata }, _session_initializers, _session_extraInitializers);
            __esDecorate(this, null, _createSession_decorators, { kind: "accessor", name: "createSession", static: false, private: false, access: { has: obj => "createSession" in obj, get: obj => obj.createSession, set: (obj, value) => { obj.createSession = value; } }, metadata: _metadata }, _createSession_initializers, _createSession_extraInitializers);
            __esDecorate(this, null, _workspaceId_decorators, { kind: "accessor", name: "workspaceId", static: false, private: false, access: { has: obj => "workspaceId" in obj, get: obj => obj.workspaceId, set: (obj, value) => { obj.workspaceId = value; } }, metadata: _metadata }, _workspaceId_initializers, _workspaceId_extraInitializers);
            __esDecorate(this, null, _docId_decorators, { kind: "accessor", name: "docId", static: false, private: false, access: { has: obj => "docId" in obj, get: obj => obj.docId, set: (obj, value) => { obj.docId = value; } }, metadata: _metadata }, _docId_initializers, _docId_extraInitializers);
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
            __esDecorate(this, null, _aiDraftService_decorators, { kind: "accessor", name: "aiDraftService", static: false, private: false, access: { has: obj => "aiDraftService" in obj, get: obj => obj.aiDraftService, set: (obj, value) => { obj.aiDraftService = value; } }, metadata: _metadata }, _aiDraftService_initializers, _aiDraftService_extraInitializers);
            __esDecorate(this, null, _aiToolsConfigService_decorators, { kind: "accessor", name: "aiToolsConfigService", static: false, private: false, access: { has: obj => "aiToolsConfigService" in obj, get: obj => obj.aiToolsConfigService, set: (obj, value) => { obj.aiToolsConfigService = value; } }, metadata: _metadata }, _aiToolsConfigService_initializers, _aiToolsConfigService_extraInitializers);
            __esDecorate(this, null, _aiModelService_decorators, { kind: "accessor", name: "aiModelService", static: false, private: false, access: { has: obj => "aiModelService" in obj, get: obj => obj.aiModelService, set: (obj, value) => { obj.aiModelService = value; } }, metadata: _metadata }, _aiModelService_initializers, _aiModelService_extraInitializers);
            __esDecorate(this, null, _onEmbeddingProgressChange_decorators, { kind: "accessor", name: "onEmbeddingProgressChange", static: false, private: false, access: { has: obj => "onEmbeddingProgressChange" in obj, get: obj => obj.onEmbeddingProgressChange, set: (obj, value) => { obj.onEmbeddingProgressChange = value; } }, metadata: _metadata }, _onEmbeddingProgressChange_initializers, _onEmbeddingProgressChange_extraInitializers);
            __esDecorate(this, null, _onContextChange_decorators, { kind: "accessor", name: "onContextChange", static: false, private: false, access: { has: obj => "onContextChange" in obj, get: obj => obj.onContextChange, set: (obj, value) => { obj.onContextChange = value; } }, metadata: _metadata }, _onContextChange_initializers, _onContextChange_extraInitializers);
            __esDecorate(this, null, _onOpenDoc_decorators, { kind: "accessor", name: "onOpenDoc", static: false, private: false, access: { has: obj => "onOpenDoc" in obj, get: obj => obj.onOpenDoc, set: (obj, value) => { obj.onOpenDoc = value; } }, metadata: _metadata }, _onOpenDoc_initializers, _onOpenDoc_extraInitializers);
            __esDecorate(this, null, _width_decorators, { kind: "accessor", name: "width", static: false, private: false, access: { has: obj => "width" in obj, get: obj => obj.width, set: (obj, value) => { obj.width = value; } }, metadata: _metadata }, _width_initializers, _width_extraInitializers);
            __esDecorate(this, null, _peekViewService_decorators, { kind: "accessor", name: "peekViewService", static: false, private: false, access: { has: obj => "peekViewService" in obj, get: obj => obj.peekViewService, set: (obj, value) => { obj.peekViewService = value; } }, metadata: _metadata }, _peekViewService_initializers, _peekViewService_extraInitializers);
            __esDecorate(this, null, _subscriptionService_decorators, { kind: "accessor", name: "subscriptionService", static: false, private: false, access: { has: obj => "subscriptionService" in obj, get: obj => obj.subscriptionService, set: (obj, value) => { obj.subscriptionService = value; } }, metadata: _metadata }, _subscriptionService_initializers, _subscriptionService_extraInitializers);
            __esDecorate(this, null, _onAISubscribe_decorators, { kind: "accessor", name: "onAISubscribe", static: false, private: false, access: { has: obj => "onAISubscribe" in obj, get: obj => obj.onAISubscribe, set: (obj, value) => { obj.onAISubscribe = value; } }, metadata: _metadata }, _onAISubscribe_initializers, _onAISubscribe_extraInitializers);
            __esDecorate(this, null, _chatContextValue_decorators, { kind: "accessor", name: "chatContextValue", static: false, private: false, access: { has: obj => "chatContextValue" in obj, get: obj => obj.chatContextValue, set: (obj, value) => { obj.chatContextValue = value; } }, metadata: _metadata }, _chatContextValue_initializers, _chatContextValue_extraInitializers);
            __esDecorate(this, null, _isHistoryLoading_decorators, { kind: "accessor", name: "isHistoryLoading", static: false, private: false, access: { has: obj => "isHistoryLoading" in obj, get: obj => obj.isHistoryLoading, set: (obj, value) => { obj.isHistoryLoading = value; } }, metadata: _metadata }, _isHistoryLoading_initializers, _isHistoryLoading_extraInitializers);
            __esDecorate(this, null, _showPreviewPanel_decorators, { kind: "accessor", name: "showPreviewPanel", static: false, private: false, access: { has: obj => "showPreviewPanel" in obj, get: obj => obj.showPreviewPanel, set: (obj, value) => { obj.showPreviewPanel = value; } }, metadata: _metadata }, _showPreviewPanel_initializers, _showPreviewPanel_extraInitializers);
            __esDecorate(this, null, _previewPanelContent_decorators, { kind: "accessor", name: "previewPanelContent", static: false, private: false, access: { has: obj => "previewPanelContent" in obj, get: obj => obj.previewPanelContent, set: (obj, value) => { obj.previewPanelContent = value; } }, metadata: _metadata }, _previewPanelContent_initializers, _previewPanelContent_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    ai-chat-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;

      ai-chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 0 var(--h-padding);
        transition:
          flex-grow 0.32s cubic-bezier(0.07, 0.83, 0.46, 1),
          padding-top 0.32s ease,
          padding-bottom 0.32s ease;
      }
      ai-chat-messages.independent-mode.no-message {
        flex-grow: 0;
        flex-shrink: 0;
        overflow-y: visible;
      }
    }
    chat-panel-split-view {
      height: 100%;
      width: 100%;
      container-type: inline-size;
      container-name: chat-panel-split-view;
    }
    .chat-panel-main {
      --h-padding: 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      width: 100%;
      padding: 8px calc(24px - var(--h-padding)) 0 calc(24px - var(--h-padding));
      max-width: 800px;
      margin: 0 auto;
    }

    ai-chat-composer {
      padding: 0 var(--h-padding);
    }

    @container chat-panel-split-view (width < 540px) {
      .chat-panel-main {
        padding: 8px calc(12px - var(--h-padding)) 0
          calc(12px - var(--h-padding));
      }
    }
  `; }
        #independentMode_accessor_storage;
        get independentMode() { return this.#independentMode_accessor_storage; }
        set independentMode(value) { this.#independentMode_accessor_storage = value; }
        #onboardingOffsetY_accessor_storage;
        get onboardingOffsetY() { return this.#onboardingOffsetY_accessor_storage; }
        set onboardingOffsetY(value) { this.#onboardingOffsetY_accessor_storage = value; }
        #host_accessor_storage;
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #session_accessor_storage;
        get session() { return this.#session_accessor_storage; }
        set session(value) { this.#session_accessor_storage = value; }
        #createSession_accessor_storage;
        get createSession() { return this.#createSession_accessor_storage; }
        set createSession(value) { this.#createSession_accessor_storage = value; }
        #workspaceId_accessor_storage;
        get workspaceId() { return this.#workspaceId_accessor_storage; }
        set workspaceId(value) { this.#workspaceId_accessor_storage = value; }
        #docId_accessor_storage;
        get docId() { return this.#docId_accessor_storage; }
        set docId(value) { this.#docId_accessor_storage = value; }
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
        #aiDraftService_accessor_storage;
        get aiDraftService() { return this.#aiDraftService_accessor_storage; }
        set aiDraftService(value) { this.#aiDraftService_accessor_storage = value; }
        #aiToolsConfigService_accessor_storage;
        get aiToolsConfigService() { return this.#aiToolsConfigService_accessor_storage; }
        set aiToolsConfigService(value) { this.#aiToolsConfigService_accessor_storage = value; }
        #aiModelService_accessor_storage;
        get aiModelService() { return this.#aiModelService_accessor_storage; }
        set aiModelService(value) { this.#aiModelService_accessor_storage = value; }
        #onEmbeddingProgressChange_accessor_storage;
        get onEmbeddingProgressChange() { return this.#onEmbeddingProgressChange_accessor_storage; }
        set onEmbeddingProgressChange(value) { this.#onEmbeddingProgressChange_accessor_storage = value; }
        #onContextChange_accessor_storage;
        get onContextChange() { return this.#onContextChange_accessor_storage; }
        set onContextChange(value) { this.#onContextChange_accessor_storage = value; }
        #onOpenDoc_accessor_storage;
        get onOpenDoc() { return this.#onOpenDoc_accessor_storage; }
        set onOpenDoc(value) { this.#onOpenDoc_accessor_storage = value; }
        #width_accessor_storage;
        get width() { return this.#width_accessor_storage; }
        set width(value) { this.#width_accessor_storage = value; }
        #peekViewService_accessor_storage;
        get peekViewService() { return this.#peekViewService_accessor_storage; }
        set peekViewService(value) { this.#peekViewService_accessor_storage = value; }
        #subscriptionService_accessor_storage;
        get subscriptionService() { return this.#subscriptionService_accessor_storage; }
        set subscriptionService(value) { this.#subscriptionService_accessor_storage = value; }
        #onAISubscribe_accessor_storage;
        get onAISubscribe() { return this.#onAISubscribe_accessor_storage; }
        set onAISubscribe(value) { this.#onAISubscribe_accessor_storage = value; }
        #chatContextValue_accessor_storage;
        get chatContextValue() { return this.#chatContextValue_accessor_storage; }
        set chatContextValue(value) { this.#chatContextValue_accessor_storage = value; }
        #isHistoryLoading_accessor_storage;
        get isHistoryLoading() { return this.#isHistoryLoading_accessor_storage; }
        set isHistoryLoading(value) { this.#isHistoryLoading_accessor_storage = value; }
        #showPreviewPanel_accessor_storage;
        get showPreviewPanel() { return this.#showPreviewPanel_accessor_storage; }
        set showPreviewPanel(value) { this.#showPreviewPanel_accessor_storage = value; }
        #previewPanelContent_accessor_storage;
        get previewPanelContent() { return this.#previewPanelContent_accessor_storage; }
        set previewPanelContent(value) { this.#previewPanelContent_accessor_storage = value; }
        get messages() {
            return this.chatContextValue.messages.filter(item => {
                return (isChatMessage(item) ||
                    item.messages?.length === 3 ||
                    (HISTORY_IMAGE_ACTIONS.includes(item.action) &&
                        item.messages?.length === 2));
            });
        }
        get showActions() {
            return false;
        }
        firstUpdated() { }
        _initializeScrollListeners() {
            const chatMessages = this.chatMessagesRef.value;
            if (chatMessages) {
                chatMessages.updateComplete
                    .then(() => {
                    chatMessages.addEventListener('scrollend', () => {
                        this.lastScrollTop = chatMessages.scrollTop;
                    });
                    this._scrollListenersInitialized = true;
                })
                    .catch(console.error);
            }
        }
        updated(changedProperties) {
            // restore pinned chat scroll position
            if (changedProperties.has('host') &&
                this.session?.pinned &&
                this.lastScrollTop !== undefined) {
                this.chatMessagesRef.value?.scrollToPos(this.lastScrollTop);
            }
            if (!this._scrollListenersInitialized) {
                this._initializeScrollListeners();
            }
        }
        openPreviewPanel(content) {
            this.showPreviewPanel = true;
            if (content)
                this.previewPanelContent = content;
            AIProvider.slots.previewPanelOpenChange.next(true);
        }
        closePreviewPanel(destroyContent = false) {
            this.showPreviewPanel = false;
            if (destroyContent)
                this.previewPanelContent = null;
            AIProvider.slots.previewPanelOpenChange.next(false);
        }
        get isPreviewPanelOpen() {
            return this.showPreviewPanel;
        }
        connectedCallback() {
            super.connectedCallback();
            this.initChatContent().catch(console.error);
            if (this.aiDraftService) {
                this.aiDraftService
                    .getDraft()
                    .then(draft => {
                    this.chatContextValue = {
                        ...this.chatContextValue,
                        ...draft,
                    };
                })
                    .catch(console.error);
            }
            // revalidate subscription to get the latest status
            this.subscriptionService.subscription.revalidate();
            this._disposables.add(AIProvider.slots.actions.subscribe(({ event }) => {
                const { status } = this.chatContextValue;
                if (event === 'finished' &&
                    (status === 'idle' || status === 'success')) {
                    this.updateActions().catch(console.error);
                }
            }));
            this._disposables.add(AIProvider.slots.requestOpenWithChat.subscribe((params) => {
                if (!params) {
                    return;
                }
                if (this.host === params.host) {
                    if (params.fromAnswer && params.context) {
                        this.updateContext(params.context);
                    }
                    else {
                        extractSelectedContent(params.host)
                            .then(context => {
                            if (!context)
                                return;
                            this.updateContext(context);
                        })
                            .catch(console.error);
                    }
                }
                AIProvider.slots.requestOpenWithChat.next(null);
            }));
        }
        render() {
            const left = html ` <ai-chat-messages
        class=${classMap({
                'ai-chat-messages': true,
                'independent-mode': !!this.independentMode,
                'no-message': this.messages.length === 0,
            })}
        ${ref(this.chatMessagesRef)}
        .host=${this.host}
        .workspaceId=${this.workspaceId}
        .docId=${this.docId}
        .session=${this.session}
        .createSession=${this.createSession}
        .chatContextValue=${this.chatContextValue}
        .updateContext=${this.updateContext}
        .isHistoryLoading=${this.isHistoryLoading}
        .extensions=${this.extensions}
        .affineFeatureFlagService=${this.affineFeatureFlagService}
        .affineThemeService=${this.affineThemeService}
        .notificationService=${this.notificationService}
        .aiToolsConfigService=${this.aiToolsConfigService}
        .networkSearchConfig=${this.networkSearchConfig}
        .reasoningConfig=${this.reasoningConfig}
        .width=${this.width}
        .independentMode=${this.independentMode}
        .messages=${this.messages}
        .docDisplayService=${this.docDisplayConfig}
        .peekViewService=${this.peekViewService}
        .onOpenDoc=${this.onOpenDoc}
      ></ai-chat-messages>
      <ai-chat-composer
        style=${styleMap({
                [this.onboardingOffsetY > 0 ? 'paddingTop' : 'paddingBottom']: `${this.messages.length === 0 ? Math.abs(this.onboardingOffsetY) * 2 : 0}px`,
            })}
        .affineFeatureFlagService=${this.affineFeatureFlagService}
        .independentMode=${this.independentMode}
        .host=${this.host}
        .workspaceId=${this.workspaceId}
        .docId=${this.docId}
        .session=${this.session}
        .createSession=${this.createSession}
        .chatContextValue=${this.chatContextValue}
        .updateContext=${this.updateContext}
        .onEmbeddingProgressChange=${this.onEmbeddingProgressChange}
        .networkSearchConfig=${this.networkSearchConfig}
        .reasoningConfig=${this.reasoningConfig}
        .docDisplayConfig=${this.docDisplayConfig}
        .searchMenuConfig=${this.searchMenuConfig}
        .serverService=${this.serverService}
        .affineWorkspaceDialogService=${this.affineWorkspaceDialogService}
        .notificationService=${this.notificationService}
        .aiDraftService=${this.aiDraftService}
        .aiToolsConfigService=${this.aiToolsConfigService}
        .subscriptionService=${this.subscriptionService}
        .aiModelService=${this.aiModelService}
        .onAISubscribe=${this.onAISubscribe}
        .trackOptions=${{
                where: 'chat-panel',
                control: 'chat-send',
            }}
      ></ai-chat-composer>`;
            const right = this.previewPanelContent;
            return html `<chat-panel-split-view
      .left=${html `<div class="chat-panel-main">${left}</div>`}
      .right=${right}
      .open=${this.showPreviewPanel}
    >
    </chat-panel-split-view>`;
        }
    };
})();
export { AIChatContent };
//# sourceMappingURL=ai-chat-content.js.map