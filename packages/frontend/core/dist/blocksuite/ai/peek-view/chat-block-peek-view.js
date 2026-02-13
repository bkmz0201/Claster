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
import { CanvasElementType, EdgelessCRUDIdentifier, getSurfaceBlock, } from '@blocksuite/affine/blocks/surface';
import { ViewExtensionManagerIdentifier } from '@blocksuite/affine/ext-loader';
import { ConnectorMode } from '@blocksuite/affine/model';
import { DocModeProvider, NotificationProvider, TelemetryProvider, } from '@blocksuite/affine/shared/services';
import { html, LitElement, nothing } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { throttle } from 'lodash-es';
import { ChatBlockPeekViewActions, constructUserInfoWithMessages, queryHistoryMessages, } from '../_common/chat-actions-handle';
import {} from '../blocks';
import { ChatMessagesSchema, isChatMessage, StreamObjectSchema, } from '../components/ai-chat-messages';
import { AIChatErrorRenderer } from '../messages/error';
import { AIProvider } from '../provider';
import { mergeStreamContent, mergeStreamObjects, } from '../utils/stream-objects';
import { PeekViewStyles } from './styles';
import { calcChildBound } from './utils';
let AIChatBlockPeekView = (() => {
    let _classSuper = LitElement;
    let __chatMessagesContainer_decorators;
    let __chatMessagesContainer_initializers = [];
    let __chatMessagesContainer_extraInitializers = [];
    let _blockModel_decorators;
    let _blockModel_initializers = [];
    let _blockModel_extraInitializers = [];
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _networkSearchConfig_decorators;
    let _networkSearchConfig_initializers = [];
    let _networkSearchConfig_extraInitializers = [];
    let _reasoningConfig_decorators;
    let _reasoningConfig_initializers = [];
    let _reasoningConfig_extraInitializers = [];
    let _serverService_decorators;
    let _serverService_initializers = [];
    let _serverService_extraInitializers = [];
    let _docDisplayConfig_decorators;
    let _docDisplayConfig_initializers = [];
    let _docDisplayConfig_extraInitializers = [];
    let _searchMenuConfig_decorators;
    let _searchMenuConfig_initializers = [];
    let _searchMenuConfig_extraInitializers = [];
    let _affineFeatureFlagService_decorators;
    let _affineFeatureFlagService_initializers = [];
    let _affineFeatureFlagService_extraInitializers = [];
    let _affineWorkspaceDialogService_decorators;
    let _affineWorkspaceDialogService_initializers = [];
    let _affineWorkspaceDialogService_extraInitializers = [];
    let _aiDraftService_decorators;
    let _aiDraftService_initializers = [];
    let _aiDraftService_extraInitializers = [];
    let _aiToolsConfigService_decorators;
    let _aiToolsConfigService_initializers = [];
    let _aiToolsConfigService_extraInitializers = [];
    let _aiModelService_decorators;
    let _aiModelService_initializers = [];
    let _aiModelService_extraInitializers = [];
    let _subscriptionService_decorators;
    let _subscriptionService_initializers = [];
    let _subscriptionService_extraInitializers = [];
    let _onAISubscribe_decorators;
    let _onAISubscribe_initializers = [];
    let _onAISubscribe_extraInitializers = [];
    let __historyMessages_decorators;
    let __historyMessages_initializers = [];
    let __historyMessages_extraInitializers = [];
    let _chatContext_decorators;
    let _chatContext_initializers = [];
    let _chatContext_extraInitializers = [];
    let _embeddingProgress_decorators;
    let _embeddingProgress_initializers = [];
    let _embeddingProgress_extraInitializers = [];
    let _session_decorators;
    let _session_initializers = [];
    let _session_extraInitializers = [];
    let _forkSession_decorators;
    let _forkSession_initializers = [];
    let _forkSession_extraInitializers = [];
    return class AIChatBlockPeekView extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __chatMessagesContainer_decorators = [query('.ai-chat-messages-container')];
            _blockModel_decorators = [property({ attribute: false })];
            _host_decorators = [property({ attribute: false })];
            _networkSearchConfig_decorators = [property({ attribute: false })];
            _reasoningConfig_decorators = [property({ attribute: false })];
            _serverService_decorators = [property({ attribute: false })];
            _docDisplayConfig_decorators = [property({ attribute: false })];
            _searchMenuConfig_decorators = [property({ attribute: false })];
            _affineFeatureFlagService_decorators = [property({ attribute: false })];
            _affineWorkspaceDialogService_decorators = [property({ attribute: false })];
            _aiDraftService_decorators = [property({ attribute: false })];
            _aiToolsConfigService_decorators = [property({ attribute: false })];
            _aiModelService_decorators = [property({ attribute: false })];
            _subscriptionService_decorators = [property({ attribute: false })];
            _onAISubscribe_decorators = [property({ attribute: false })];
            __historyMessages_decorators = [state()];
            _chatContext_decorators = [state()];
            _embeddingProgress_decorators = [state()];
            _session_decorators = [state()];
            _forkSession_decorators = [state()];
            __esDecorate(this, null, __chatMessagesContainer_decorators, { kind: "accessor", name: "_chatMessagesContainer", static: false, private: false, access: { has: obj => "_chatMessagesContainer" in obj, get: obj => obj._chatMessagesContainer, set: (obj, value) => { obj._chatMessagesContainer = value; } }, metadata: _metadata }, __chatMessagesContainer_initializers, __chatMessagesContainer_extraInitializers);
            __esDecorate(this, null, _blockModel_decorators, { kind: "accessor", name: "blockModel", static: false, private: false, access: { has: obj => "blockModel" in obj, get: obj => obj.blockModel, set: (obj, value) => { obj.blockModel = value; } }, metadata: _metadata }, _blockModel_initializers, _blockModel_extraInitializers);
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _networkSearchConfig_decorators, { kind: "accessor", name: "networkSearchConfig", static: false, private: false, access: { has: obj => "networkSearchConfig" in obj, get: obj => obj.networkSearchConfig, set: (obj, value) => { obj.networkSearchConfig = value; } }, metadata: _metadata }, _networkSearchConfig_initializers, _networkSearchConfig_extraInitializers);
            __esDecorate(this, null, _reasoningConfig_decorators, { kind: "accessor", name: "reasoningConfig", static: false, private: false, access: { has: obj => "reasoningConfig" in obj, get: obj => obj.reasoningConfig, set: (obj, value) => { obj.reasoningConfig = value; } }, metadata: _metadata }, _reasoningConfig_initializers, _reasoningConfig_extraInitializers);
            __esDecorate(this, null, _serverService_decorators, { kind: "accessor", name: "serverService", static: false, private: false, access: { has: obj => "serverService" in obj, get: obj => obj.serverService, set: (obj, value) => { obj.serverService = value; } }, metadata: _metadata }, _serverService_initializers, _serverService_extraInitializers);
            __esDecorate(this, null, _docDisplayConfig_decorators, { kind: "accessor", name: "docDisplayConfig", static: false, private: false, access: { has: obj => "docDisplayConfig" in obj, get: obj => obj.docDisplayConfig, set: (obj, value) => { obj.docDisplayConfig = value; } }, metadata: _metadata }, _docDisplayConfig_initializers, _docDisplayConfig_extraInitializers);
            __esDecorate(this, null, _searchMenuConfig_decorators, { kind: "accessor", name: "searchMenuConfig", static: false, private: false, access: { has: obj => "searchMenuConfig" in obj, get: obj => obj.searchMenuConfig, set: (obj, value) => { obj.searchMenuConfig = value; } }, metadata: _metadata }, _searchMenuConfig_initializers, _searchMenuConfig_extraInitializers);
            __esDecorate(this, null, _affineFeatureFlagService_decorators, { kind: "accessor", name: "affineFeatureFlagService", static: false, private: false, access: { has: obj => "affineFeatureFlagService" in obj, get: obj => obj.affineFeatureFlagService, set: (obj, value) => { obj.affineFeatureFlagService = value; } }, metadata: _metadata }, _affineFeatureFlagService_initializers, _affineFeatureFlagService_extraInitializers);
            __esDecorate(this, null, _affineWorkspaceDialogService_decorators, { kind: "accessor", name: "affineWorkspaceDialogService", static: false, private: false, access: { has: obj => "affineWorkspaceDialogService" in obj, get: obj => obj.affineWorkspaceDialogService, set: (obj, value) => { obj.affineWorkspaceDialogService = value; } }, metadata: _metadata }, _affineWorkspaceDialogService_initializers, _affineWorkspaceDialogService_extraInitializers);
            __esDecorate(this, null, _aiDraftService_decorators, { kind: "accessor", name: "aiDraftService", static: false, private: false, access: { has: obj => "aiDraftService" in obj, get: obj => obj.aiDraftService, set: (obj, value) => { obj.aiDraftService = value; } }, metadata: _metadata }, _aiDraftService_initializers, _aiDraftService_extraInitializers);
            __esDecorate(this, null, _aiToolsConfigService_decorators, { kind: "accessor", name: "aiToolsConfigService", static: false, private: false, access: { has: obj => "aiToolsConfigService" in obj, get: obj => obj.aiToolsConfigService, set: (obj, value) => { obj.aiToolsConfigService = value; } }, metadata: _metadata }, _aiToolsConfigService_initializers, _aiToolsConfigService_extraInitializers);
            __esDecorate(this, null, _aiModelService_decorators, { kind: "accessor", name: "aiModelService", static: false, private: false, access: { has: obj => "aiModelService" in obj, get: obj => obj.aiModelService, set: (obj, value) => { obj.aiModelService = value; } }, metadata: _metadata }, _aiModelService_initializers, _aiModelService_extraInitializers);
            __esDecorate(this, null, _subscriptionService_decorators, { kind: "accessor", name: "subscriptionService", static: false, private: false, access: { has: obj => "subscriptionService" in obj, get: obj => obj.subscriptionService, set: (obj, value) => { obj.subscriptionService = value; } }, metadata: _metadata }, _subscriptionService_initializers, _subscriptionService_extraInitializers);
            __esDecorate(this, null, _onAISubscribe_decorators, { kind: "accessor", name: "onAISubscribe", static: false, private: false, access: { has: obj => "onAISubscribe" in obj, get: obj => obj.onAISubscribe, set: (obj, value) => { obj.onAISubscribe = value; } }, metadata: _metadata }, _onAISubscribe_initializers, _onAISubscribe_extraInitializers);
            __esDecorate(this, null, __historyMessages_decorators, { kind: "accessor", name: "_historyMessages", static: false, private: false, access: { has: obj => "_historyMessages" in obj, get: obj => obj._historyMessages, set: (obj, value) => { obj._historyMessages = value; } }, metadata: _metadata }, __historyMessages_initializers, __historyMessages_extraInitializers);
            __esDecorate(this, null, _chatContext_decorators, { kind: "accessor", name: "chatContext", static: false, private: false, access: { has: obj => "chatContext" in obj, get: obj => obj.chatContext, set: (obj, value) => { obj.chatContext = value; } }, metadata: _metadata }, _chatContext_initializers, _chatContext_extraInitializers);
            __esDecorate(this, null, _embeddingProgress_decorators, { kind: "accessor", name: "embeddingProgress", static: false, private: false, access: { has: obj => "embeddingProgress" in obj, get: obj => obj.embeddingProgress, set: (obj, value) => { obj.embeddingProgress = value; } }, metadata: _metadata }, _embeddingProgress_initializers, _embeddingProgress_extraInitializers);
            __esDecorate(this, null, _session_decorators, { kind: "accessor", name: "session", static: false, private: false, access: { has: obj => "session" in obj, get: obj => obj.session, set: (obj, value) => { obj.session = value; } }, metadata: _metadata }, _session_initializers, _session_extraInitializers);
            __esDecorate(this, null, _forkSession_decorators, { kind: "accessor", name: "forkSession", static: false, private: false, access: { has: obj => "forkSession" in obj, get: obj => obj.forkSession, set: (obj, value) => { obj.forkSession = value; } }, metadata: _metadata }, _forkSession_initializers, _forkSession_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = PeekViewStyles; }
        get _modeService() {
            return this.host.std.get(DocModeProvider);
        }
        get _sessionId() {
            return this.blockModel.props.sessionId;
        }
        get historyMessagesString() {
            return this.blockModel.props.messages;
        }
        get blockId() {
            return this.blockModel.id;
        }
        get rootDocId() {
            return this.blockModel.props.rootDocId;
        }
        get rootWorkspaceId() {
            return this.blockModel.props.rootWorkspaceId;
        }
        get _isNetworkActive() {
            return (!!this.networkSearchConfig.visible.value &&
                !!this.networkSearchConfig.enabled.value);
        }
        get _isReasoningActive() {
            return !!this.reasoningConfig.enabled.value;
        }
        connectedCallback() {
            super.connectedCallback();
            this.initSession().catch(console.error);
            const extensions = this.host.std
                .get(ViewExtensionManagerIdentifier)
                .get('preview-page');
            this._textRendererOptions = {
                extensions,
                affineFeatureFlagService: this.affineFeatureFlagService,
            };
            this._historyMessages = this._deserializeHistoryChatMessages(this.historyMessagesString);
            const { rootWorkspaceId, _sessionId } = this;
            queryHistoryMessages(rootWorkspaceId, _sessionId)
                .then(messages => {
                this._historyMessages = this._historyMessages.map((message, idx) => {
                    return {
                        ...message,
                        attachments: messages[idx]?.attachments ?? [],
                    };
                });
            })
                .catch((err) => {
                console.error('Query history messages failed', err);
            });
        }
        firstUpdated() {
            this._scrollToEnd();
        }
        updated(changedProperties) {
            if (changedProperties.has('chatContext') &&
                (this.chatContext.status === 'loading' ||
                    this.chatContext.status === 'error' ||
                    this.chatContext.status === 'success')) {
                setTimeout(this._scrollToEnd, 500);
            }
            if (changedProperties.has('chatContext') &&
                this.chatContext.status === 'transmitting') {
                this._throttledScrollToEnd();
            }
        }
        render() {
            const { host, _historyMessages } = this;
            if (!_historyMessages.length) {
                return nothing;
            }
            const latestHistoryMessage = _historyMessages[_historyMessages.length - 1];
            const latestMessageCreatedAt = latestHistoryMessage.createdAt;
            const { chatContext, updateContext, networkSearchConfig, _textRendererOptions, } = this;
            const { messages: currentChatMessages } = chatContext;
            const notificationService = this.host.std.get(NotificationProvider);
            return html `<div class="ai-chat-block-peek-view-container">
      <div class="history-clear-container">
        <ai-history-clear
          .doc=${this.host.store}
          .session=${this.forkSession}
          .onHistoryCleared=${this._onHistoryCleared}
          .chatContextValue=${chatContext}
          .notificationService=${notificationService}
        ></ai-history-clear>
      </div>
      <div class="ai-chat-messages-container">
        <ai-chat-block-messages
          .host=${host}
          .messages=${_historyMessages}
          .textRendererOptions=${_textRendererOptions}
        ></ai-chat-block-messages>
        <date-time .date=${latestMessageCreatedAt}></date-time>
        <div class="new-chat-messages-container">
          ${this.CurrentMessages(currentChatMessages)}
        </div>
      </div>
      <ai-chat-composer
        .host=${host}
        .workspaceId=${this.rootWorkspaceId}
        .docId=${this.rootDocId}
        .session=${this.forkSession ?? this.session}
        .createSession=${this.createForkSession}
        .chatContextValue=${chatContext}
        .updateContext=${updateContext}
        .onEmbeddingProgressChange=${this.onEmbeddingProgressChange}
        .networkSearchConfig=${networkSearchConfig}
        .docDisplayConfig=${this.docDisplayConfig}
        .searchMenuConfig=${this.searchMenuConfig}
        .affineWorkspaceDialogService=${this.affineWorkspaceDialogService}
        .notificationService=${notificationService}
        .aiToolsConfigService=${this.aiToolsConfigService}
        .affineFeatureFlagService=${this.affineFeatureFlagService}
        .onChatSuccess=${this._onChatSuccess}
        .trackOptions=${{
                where: 'ai-chat-block',
                control: 'chat-send',
            }}
        .portalContainer=${this.parentElement}
        .reasoningConfig=${this.reasoningConfig}
        .serverService=${this.serverService}
        .subscriptionService=${this.subscriptionService}
        .aiModelService=${this.aiModelService}
        .onAISubscribe=${this.onAISubscribe}
      ></ai-chat-composer>
    </div> `;
        }
        #_chatMessagesContainer_accessor_storage;
        get _chatMessagesContainer() { return this.#_chatMessagesContainer_accessor_storage; }
        set _chatMessagesContainer(value) { this.#_chatMessagesContainer_accessor_storage = value; }
        #blockModel_accessor_storage;
        get blockModel() { return this.#blockModel_accessor_storage; }
        set blockModel(value) { this.#blockModel_accessor_storage = value; }
        #host_accessor_storage;
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #networkSearchConfig_accessor_storage;
        get networkSearchConfig() { return this.#networkSearchConfig_accessor_storage; }
        set networkSearchConfig(value) { this.#networkSearchConfig_accessor_storage = value; }
        #reasoningConfig_accessor_storage;
        get reasoningConfig() { return this.#reasoningConfig_accessor_storage; }
        set reasoningConfig(value) { this.#reasoningConfig_accessor_storage = value; }
        #serverService_accessor_storage;
        get serverService() { return this.#serverService_accessor_storage; }
        set serverService(value) { this.#serverService_accessor_storage = value; }
        #docDisplayConfig_accessor_storage;
        get docDisplayConfig() { return this.#docDisplayConfig_accessor_storage; }
        set docDisplayConfig(value) { this.#docDisplayConfig_accessor_storage = value; }
        #searchMenuConfig_accessor_storage;
        get searchMenuConfig() { return this.#searchMenuConfig_accessor_storage; }
        set searchMenuConfig(value) { this.#searchMenuConfig_accessor_storage = value; }
        #affineFeatureFlagService_accessor_storage;
        get affineFeatureFlagService() { return this.#affineFeatureFlagService_accessor_storage; }
        set affineFeatureFlagService(value) { this.#affineFeatureFlagService_accessor_storage = value; }
        #affineWorkspaceDialogService_accessor_storage;
        get affineWorkspaceDialogService() { return this.#affineWorkspaceDialogService_accessor_storage; }
        set affineWorkspaceDialogService(value) { this.#affineWorkspaceDialogService_accessor_storage = value; }
        #aiDraftService_accessor_storage;
        get aiDraftService() { return this.#aiDraftService_accessor_storage; }
        set aiDraftService(value) { this.#aiDraftService_accessor_storage = value; }
        #aiToolsConfigService_accessor_storage;
        get aiToolsConfigService() { return this.#aiToolsConfigService_accessor_storage; }
        set aiToolsConfigService(value) { this.#aiToolsConfigService_accessor_storage = value; }
        #aiModelService_accessor_storage;
        get aiModelService() { return this.#aiModelService_accessor_storage; }
        set aiModelService(value) { this.#aiModelService_accessor_storage = value; }
        #subscriptionService_accessor_storage;
        get subscriptionService() { return this.#subscriptionService_accessor_storage; }
        set subscriptionService(value) { this.#subscriptionService_accessor_storage = value; }
        #onAISubscribe_accessor_storage;
        get onAISubscribe() { return this.#onAISubscribe_accessor_storage; }
        set onAISubscribe(value) { this.#onAISubscribe_accessor_storage = value; }
        #_historyMessages_accessor_storage;
        get _historyMessages() { return this.#_historyMessages_accessor_storage; }
        set _historyMessages(value) { this.#_historyMessages_accessor_storage = value; }
        #chatContext_accessor_storage;
        get chatContext() { return this.#chatContext_accessor_storage; }
        set chatContext(value) { this.#chatContext_accessor_storage = value; }
        #embeddingProgress_accessor_storage;
        get embeddingProgress() { return this.#embeddingProgress_accessor_storage; }
        set embeddingProgress(value) { this.#embeddingProgress_accessor_storage = value; }
        #session_accessor_storage;
        get session() { return this.#session_accessor_storage; }
        set session(value) { this.#session_accessor_storage = value; }
        #forkSession_accessor_storage;
        get forkSession() { return this.#forkSession_accessor_storage; }
        set forkSession(value) { this.#forkSession_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._textRendererOptions = {};
            this._forkBlockId = undefined;
            this._deserializeHistoryChatMessages = (historyMessagesString) => {
                try {
                    const result = ChatMessagesSchema.safeParse(JSON.parse(historyMessagesString));
                    if (result.success) {
                        return result.data;
                    }
                    else {
                        return [];
                    }
                }
                catch {
                    return [];
                }
            };
            this._constructBranchChatBlockMessages = async (rootWorkspaceId, forkSessionId, docId) => {
                const currentUserInfo = await AIProvider.userInfo;
                const forkMessages = (await queryHistoryMessages(rootWorkspaceId, forkSessionId, docId));
                const forkLength = forkMessages.length;
                const historyLength = this._historyMessages.length;
                if (!forkLength || forkLength <= historyLength) {
                    return constructUserInfoWithMessages(forkMessages, currentUserInfo);
                }
                // Update history messages with the fork messages, keep user info
                const historyMessages = this._historyMessages.map((message, idx) => {
                    return {
                        ...message,
                        id: forkMessages[idx]?.id ?? message.id,
                        attachments: [],
                    };
                });
                const currentChatMessages = constructUserInfoWithMessages(forkMessages.slice(historyLength), currentUserInfo);
                return [...historyMessages, ...currentChatMessages];
            };
            this._resetContext = () => {
                const { abortController } = this.chatContext;
                if (abortController) {
                    abortController.abort();
                }
                this.updateContext({
                    status: 'idle',
                    error: null,
                    images: [],
                    abortController: null,
                    messages: [],
                });
                this._forkBlockId = undefined;
            };
            this.initSession = async () => {
                const session = await AIProvider.session?.getSession(this.rootWorkspaceId, this._sessionId);
                this.session = session ?? null;
            };
            this.createForkSession = async () => {
                if (this.forkSession) {
                    return this.forkSession;
                }
                const lastMessage = this._historyMessages.at(-1);
                if (!lastMessage)
                    return;
                const { store } = this.host;
                const forkSessionId = await AIProvider.forkChat?.({
                    workspaceId: store.workspace.id,
                    docId: store.id,
                    sessionId: this._sessionId,
                    latestMessageId: lastMessage.id,
                });
                if (forkSessionId) {
                    const session = await AIProvider.session?.getSession(this.rootWorkspaceId, forkSessionId);
                    this.forkSession = session ?? null;
                }
                return this.forkSession;
            };
            this._onChatSuccess = async () => {
                if (!this._forkBlockId) {
                    await this._createForkChatBlock();
                }
                // Update new chat block messages if there are contents returned from AI
                await this.updateChatBlockMessages();
            };
            /**
             * Create a new AI chat block based on the current session and history messages
             */
            this._createForkChatBlock = async () => {
                // Only create AI chat block in edgeless mode
                const mode = this._modeService.getEditorMode();
                if (mode !== 'edgeless') {
                    return;
                }
                // If there is already a chat block, do not create a new one
                if (this._forkBlockId) {
                    return;
                }
                // If there is no session id or chat messages, do not create a new chat block
                const forkSessionId = this.forkSession?.sessionId;
                if (!forkSessionId || !this.chatContext.messages.length) {
                    return;
                }
                const { store } = this.host;
                // create a new AI chat block
                const surfaceBlock = store
                    .getAllModels()
                    .find(block => block.flavour === 'affine:surface');
                if (!surfaceBlock) {
                    return;
                }
                // Get fork session messages
                const { rootWorkspaceId, rootDocId } = this;
                const messages = await this._constructBranchChatBlockMessages(rootWorkspaceId, forkSessionId, rootDocId);
                if (!messages.length) {
                    return;
                }
                const bound = calcChildBound(this.blockModel, this.host.std);
                const crud = this.host.std.get(EdgelessCRUDIdentifier);
                const forkBlockId = crud.addBlock('affine:embed-ai-chat', {
                    xywh: bound.serialize(),
                    messages: JSON.stringify(messages),
                    sessionId: forkSessionId,
                    rootWorkspaceId: rootWorkspaceId,
                    rootDocId: rootDocId,
                }, surfaceBlock.id);
                if (!forkBlockId) {
                    return;
                }
                this._forkBlockId = forkBlockId;
                // Connect the parent chat block to the AI chat block
                crud.addElement(CanvasElementType.CONNECTOR, {
                    mode: ConnectorMode.Curve,
                    controllers: [],
                    source: { id: this.blockId },
                    target: { id: forkBlockId },
                });
                const telemetryService = this.host.std.getOptional(TelemetryProvider);
                telemetryService?.track('CanvasElementAdded', {
                    control: 'conversation',
                    page: 'whiteboard editor',
                    module: 'canvas',
                    segment: 'whiteboard',
                    type: 'chat block',
                    category: 'branch',
                });
            };
            /**
             * Update the current chat messages with the new message
             */
            this.updateChatBlockMessages = async () => {
                const forkSessionId = this.forkSession?.sessionId;
                if (!this._forkBlockId || !forkSessionId) {
                    return;
                }
                const { store } = this.host;
                const chatBlock = store.getBlock(this._forkBlockId);
                if (!chatBlock)
                    return;
                // Get fork session messages
                const { rootWorkspaceId, rootDocId } = this;
                const messages = await this._constructBranchChatBlockMessages(rootWorkspaceId, forkSessionId, rootDocId);
                if (!messages.length) {
                    return;
                }
                store.updateBlock(chatBlock.model, {
                    messages: JSON.stringify(messages),
                });
            };
            this.updateContext = (context) => {
                this.chatContext = { ...this.chatContext, ...context };
            };
            this.onEmbeddingProgressChange = (count) => {
                const total = count.finished + count.processing + count.failed;
                this.embeddingProgress = [count.finished, total];
            };
            /**
             * Clean current chat messages and delete the newly created AI chat block
             */
            this._onHistoryCleared = async () => {
                const { _forkBlockId, host } = this;
                if (_forkBlockId) {
                    const surface = getSurfaceBlock(host.store);
                    const crud = host.std.get(EdgelessCRUDIdentifier);
                    const chatBlock = host.store.getBlock(_forkBlockId)?.model;
                    if (chatBlock) {
                        const connectors = surface?.getConnectors(chatBlock.id);
                        host.store.transact(() => {
                            // Delete the AI chat block
                            crud.removeElement(_forkBlockId);
                            // Delete the connectors
                            connectors?.forEach(connector => {
                                crud.removeElement(connector.id);
                            });
                        });
                    }
                }
                this._resetContext();
            };
            this._scrollToEnd = () => {
                requestAnimationFrame(() => {
                    if (!this._chatMessagesContainer)
                        return;
                    this._chatMessagesContainer.scrollTo({
                        top: this._chatMessagesContainer.scrollHeight,
                        behavior: 'smooth',
                    });
                });
            };
            this._throttledScrollToEnd = throttle(this._scrollToEnd, 600);
            /**
             * Retry the last chat message
             */
            this.retry = async () => {
                try {
                    const forkSessionId = this.forkSession?.sessionId;
                    if (!this._forkBlockId || !forkSessionId)
                        return;
                    if (!AIProvider.actions.chat)
                        return;
                    const abortController = new AbortController();
                    const messages = [...this.chatContext.messages];
                    const last = messages[messages.length - 1];
                    if ('content' in last) {
                        last.content = '';
                        last.streamObjects = [];
                        last.createdAt = new Date().toISOString();
                    }
                    this.updateContext({
                        messages,
                        status: 'loading',
                        error: null,
                        abortController,
                    });
                    const { store } = this.host;
                    const stream = await AIProvider.actions.chat({
                        sessionId: forkSessionId,
                        retry: true,
                        docId: store.id,
                        workspaceId: store.workspace.id,
                        host: this.host,
                        stream: true,
                        signal: abortController.signal,
                        where: 'ai-chat-block',
                        control: 'chat-send',
                        reasoning: this._isReasoningActive,
                        webSearch: this._isNetworkActive,
                        toolsConfig: this.aiToolsConfigService.config.value,
                    });
                    for await (const text of stream) {
                        const messages = this.chatContext.messages.slice(0);
                        const last = messages.at(-1);
                        if (last && isChatMessage(last)) {
                            try {
                                const parsed = StreamObjectSchema.parse(JSON.parse(text));
                                const streamObjects = mergeStreamObjects([
                                    ...(last.streamObjects ?? []),
                                    parsed,
                                ]);
                                messages[messages.length - 1] = {
                                    ...last,
                                    streamObjects,
                                };
                            }
                            catch {
                                messages[messages.length - 1] = {
                                    ...last,
                                    content: last.content + text,
                                };
                            }
                            this.updateContext({ messages, status: 'transmitting' });
                        }
                    }
                    this.updateContext({ status: 'success' });
                    // Update new chat block messages if there are contents returned from AI
                    await this.updateChatBlockMessages();
                }
                catch (error) {
                    this.updateContext({ status: 'error', error: error });
                }
                finally {
                    this.updateContext({ abortController: null });
                }
            };
            this.CurrentMessages = (currentMessages) => {
                if (!currentMessages.length) {
                    return nothing;
                }
                const { host } = this;
                const actions = ChatBlockPeekViewActions;
                return html `${repeat(currentMessages, (_, index) => index, (message, idx) => {
                    const { status, error } = this.chatContext;
                    const isAssistantMessage = message.role === 'assistant';
                    const isLastReply = idx === currentMessages.length - 1 && isAssistantMessage;
                    const messageState = isLastReply && (status === 'transmitting' || status === 'loading')
                        ? 'generating'
                        : 'finished';
                    const shouldRenderError = isLastReply && status === 'error' && !!error;
                    const isNotReady = status === 'transmitting' || status === 'loading';
                    const shouldRenderCopyMore = isAssistantMessage && !(isLastReply && isNotReady);
                    const markdown = message.streamObjects?.length
                        ? mergeStreamContent(message.streamObjects)
                        : message.content;
                    const shouldRenderActions = isLastReply && !!markdown && !isNotReady;
                    const messageClasses = classMap({
                        'assistant-message-container': isAssistantMessage,
                    });
                    if (status === 'loading' && isLastReply) {
                        return html `<ai-loading></ai-loading>`;
                    }
                    const notificationService = this.host.std.get(NotificationProvider);
                    return html `<div class=${messageClasses}>
          <ai-chat-block-message
            .host=${host}
            .state=${messageState}
            .message=${message}
            .textRendererOptions=${this._textRendererOptions}
          ></ai-chat-block-message>
          ${shouldRenderError ? AIChatErrorRenderer(error, host) : nothing}
          ${shouldRenderCopyMore
                        ? html ` <chat-copy-more
                .host=${host}
                .session=${this.forkSession}
                .actions=${actions}
                .content=${markdown}
                .isLast=${isLastReply}
                .messageId=${message.id ?? undefined}
                .retry=${() => this.retry()}
                .notificationService=${notificationService}
              ></chat-copy-more>`
                        : nothing}
          ${shouldRenderActions
                        ? html `<chat-action-list
                .host=${host}
                .session=${this.forkSession}
                .actions=${actions}
                .content=${markdown}
                .messageId=${message.id ?? undefined}
                .layoutDirection=${'horizontal'}
                .notificationService=${notificationService}
              ></chat-action-list>`
                        : nothing}
        </div>`;
                })}`;
            };
            this.#_chatMessagesContainer_accessor_storage = __runInitializers(this, __chatMessagesContainer_initializers, void 0);
            this.#blockModel_accessor_storage = (__runInitializers(this, __chatMessagesContainer_extraInitializers), __runInitializers(this, _blockModel_initializers, void 0));
            this.#host_accessor_storage = (__runInitializers(this, _blockModel_extraInitializers), __runInitializers(this, _host_initializers, void 0));
            this.#networkSearchConfig_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _networkSearchConfig_initializers, void 0));
            this.#reasoningConfig_accessor_storage = (__runInitializers(this, _networkSearchConfig_extraInitializers), __runInitializers(this, _reasoningConfig_initializers, void 0));
            this.#serverService_accessor_storage = (__runInitializers(this, _reasoningConfig_extraInitializers), __runInitializers(this, _serverService_initializers, void 0));
            this.#docDisplayConfig_accessor_storage = (__runInitializers(this, _serverService_extraInitializers), __runInitializers(this, _docDisplayConfig_initializers, void 0));
            this.#searchMenuConfig_accessor_storage = (__runInitializers(this, _docDisplayConfig_extraInitializers), __runInitializers(this, _searchMenuConfig_initializers, void 0));
            this.#affineFeatureFlagService_accessor_storage = (__runInitializers(this, _searchMenuConfig_extraInitializers), __runInitializers(this, _affineFeatureFlagService_initializers, void 0));
            this.#affineWorkspaceDialogService_accessor_storage = (__runInitializers(this, _affineFeatureFlagService_extraInitializers), __runInitializers(this, _affineWorkspaceDialogService_initializers, void 0));
            this.#aiDraftService_accessor_storage = (__runInitializers(this, _affineWorkspaceDialogService_extraInitializers), __runInitializers(this, _aiDraftService_initializers, void 0));
            this.#aiToolsConfigService_accessor_storage = (__runInitializers(this, _aiDraftService_extraInitializers), __runInitializers(this, _aiToolsConfigService_initializers, void 0));
            this.#aiModelService_accessor_storage = (__runInitializers(this, _aiToolsConfigService_extraInitializers), __runInitializers(this, _aiModelService_initializers, void 0));
            this.#subscriptionService_accessor_storage = (__runInitializers(this, _aiModelService_extraInitializers), __runInitializers(this, _subscriptionService_initializers, void 0));
            this.#onAISubscribe_accessor_storage = (__runInitializers(this, _subscriptionService_extraInitializers), __runInitializers(this, _onAISubscribe_initializers, void 0));
            this.#_historyMessages_accessor_storage = (__runInitializers(this, _onAISubscribe_extraInitializers), __runInitializers(this, __historyMessages_initializers, []));
            this.#chatContext_accessor_storage = (__runInitializers(this, __historyMessages_extraInitializers), __runInitializers(this, _chatContext_initializers, {
                status: 'idle',
                error: null,
                images: [],
                abortController: null,
                messages: [],
            }));
            this.#embeddingProgress_accessor_storage = (__runInitializers(this, _chatContext_extraInitializers), __runInitializers(this, _embeddingProgress_initializers, [0, 0]));
            this.#session_accessor_storage = (__runInitializers(this, _embeddingProgress_extraInitializers), __runInitializers(this, _session_initializers, void 0));
            this.#forkSession_accessor_storage = (__runInitializers(this, _session_extraInitializers), __runInitializers(this, _forkSession_initializers, void 0));
            __runInitializers(this, _forkSession_extraInitializers);
        }
    };
})();
export { AIChatBlockPeekView };
export const AIChatBlockPeekViewTemplate = (blockModel, host, docDisplayConfig, searchMenuConfig, networkSearchConfig, reasoningConfig, serverService, affineFeatureFlagService, affineWorkspaceDialogService, aiDraftService, aiToolsConfigService, subscriptionService, aiModelService, onAISubscribe) => {
    return html `<ai-chat-block-peek-view
    .blockModel=${blockModel}
    .host=${host}
    .networkSearchConfig=${networkSearchConfig}
    .docDisplayConfig=${docDisplayConfig}
    .searchMenuConfig=${searchMenuConfig}
    .reasoningConfig=${reasoningConfig}
    .serverService=${serverService}
    .affineFeatureFlagService=${affineFeatureFlagService}
    .affineWorkspaceDialogService=${affineWorkspaceDialogService}
    .aiDraftService=${aiDraftService}
    .aiToolsConfigService=${aiToolsConfigService}
    .subscriptionService=${subscriptionService}
    .aiModelService=${aiModelService}
    .onAISubscribe=${onAISubscribe}
  ></ai-chat-block-peek-view>`;
};
//# sourceMappingURL=chat-block-peek-view.js.map