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
import { DocModeProvider, } from '@blocksuite/affine/shared/services';
import { ShadowlessElement } from '@blocksuite/affine/std';
import { ArrowDownBigIcon as ArrowDownIcon } from '@blocksuite/icons/lit';
import { css, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { debounce } from 'lodash-es';
import { AffineIcon } from '../../_common/icons';
import { AIPreloadConfig } from '../../chat-panel/preload-config';
import { AIProvider, UnauthorizedError } from '../../provider';
import { mergeStreamObjects } from '../../utils/stream-objects';
import {} from '../ai-chat-content/type';
import { isChatAction, isChatMessage, StreamObjectSchema, } from './type';
let AIChatMessages = (() => {
    let _classSuper = WithDisposable(ShadowlessElement);
    let __selectionValue_decorators;
    let __selectionValue_initializers = [];
    let __selectionValue_extraInitializers = [];
    let _canScrollDown_decorators;
    let _canScrollDown_initializers = [];
    let _canScrollDown_extraInitializers = [];
    let _avatarUrl_decorators;
    let _avatarUrl_initializers = [];
    let _avatarUrl_extraInitializers = [];
    let _independentMode_decorators;
    let _independentMode_initializers = [];
    let _independentMode_extraInitializers = [];
    let _messages_decorators;
    let _messages_initializers = [];
    let _messages_extraInitializers = [];
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _workspaceId_decorators;
    let _workspaceId_initializers = [];
    let _workspaceId_extraInitializers = [];
    let _docId_decorators;
    let _docId_initializers = [];
    let _docId_extraInitializers = [];
    let _isHistoryLoading_decorators;
    let _isHistoryLoading_initializers = [];
    let _isHistoryLoading_extraInitializers = [];
    let _chatContextValue_decorators;
    let _chatContextValue_initializers = [];
    let _chatContextValue_extraInitializers = [];
    let _session_decorators;
    let _session_initializers = [];
    let _session_extraInitializers = [];
    let _createSession_decorators;
    let _createSession_initializers = [];
    let _createSession_extraInitializers = [];
    let _updateContext_decorators;
    let _updateContext_initializers = [];
    let _updateContext_extraInitializers = [];
    let _extensions_decorators;
    let _extensions_initializers = [];
    let _extensions_extraInitializers = [];
    let _affineFeatureFlagService_decorators;
    let _affineFeatureFlagService_initializers = [];
    let _affineFeatureFlagService_extraInitializers = [];
    let _affineThemeService_decorators;
    let _affineThemeService_initializers = [];
    let _affineThemeService_extraInitializers = [];
    let _notificationService_decorators;
    let _notificationService_initializers = [];
    let _notificationService_extraInitializers = [];
    let _networkSearchConfig_decorators;
    let _networkSearchConfig_initializers = [];
    let _networkSearchConfig_extraInitializers = [];
    let _reasoningConfig_decorators;
    let _reasoningConfig_initializers = [];
    let _reasoningConfig_extraInitializers = [];
    let _width_decorators;
    let _width_initializers = [];
    let _width_extraInitializers = [];
    let _docDisplayService_decorators;
    let _docDisplayService_initializers = [];
    let _docDisplayService_extraInitializers = [];
    let _aiToolsConfigService_decorators;
    let _aiToolsConfigService_initializers = [];
    let _aiToolsConfigService_extraInitializers = [];
    let _peekViewService_decorators;
    let _peekViewService_initializers = [];
    let _peekViewService_extraInitializers = [];
    let _onOpenDoc_decorators;
    let _onOpenDoc_initializers = [];
    let _onOpenDoc_extraInitializers = [];
    let _testId_decorators;
    let _testId_initializers = [];
    let _testId_extraInitializers = [];
    return class AIChatMessages extends _classSuper {
        constructor() {
            super(...arguments);
            this.#_selectionValue_accessor_storage = __runInitializers(this, __selectionValue_initializers, []);
            this.#canScrollDown_accessor_storage = (__runInitializers(this, __selectionValue_extraInitializers), __runInitializers(this, _canScrollDown_initializers, false));
            this.#avatarUrl_accessor_storage = (__runInitializers(this, _canScrollDown_extraInitializers), __runInitializers(this, _avatarUrl_initializers, ''));
            this.#independentMode_accessor_storage = (__runInitializers(this, _avatarUrl_extraInitializers), __runInitializers(this, _independentMode_initializers, void 0));
            this.#messages_accessor_storage = (__runInitializers(this, _independentMode_extraInitializers), __runInitializers(this, _messages_initializers, void 0));
            this.#host_accessor_storage = (__runInitializers(this, _messages_extraInitializers), __runInitializers(this, _host_initializers, void 0));
            this.#workspaceId_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _workspaceId_initializers, void 0));
            this.#docId_accessor_storage = (__runInitializers(this, _workspaceId_extraInitializers), __runInitializers(this, _docId_initializers, void 0));
            this.#isHistoryLoading_accessor_storage = (__runInitializers(this, _docId_extraInitializers), __runInitializers(this, _isHistoryLoading_initializers, void 0));
            this.#chatContextValue_accessor_storage = (__runInitializers(this, _isHistoryLoading_extraInitializers), __runInitializers(this, _chatContextValue_initializers, void 0));
            this.#session_accessor_storage = (__runInitializers(this, _chatContextValue_extraInitializers), __runInitializers(this, _session_initializers, void 0));
            this.#createSession_accessor_storage = (__runInitializers(this, _session_extraInitializers), __runInitializers(this, _createSession_initializers, void 0));
            this.#updateContext_accessor_storage = (__runInitializers(this, _createSession_extraInitializers), __runInitializers(this, _updateContext_initializers, void 0));
            this.#extensions_accessor_storage = (__runInitializers(this, _updateContext_extraInitializers), __runInitializers(this, _extensions_initializers, void 0));
            this.#affineFeatureFlagService_accessor_storage = (__runInitializers(this, _extensions_extraInitializers), __runInitializers(this, _affineFeatureFlagService_initializers, void 0));
            this.#affineThemeService_accessor_storage = (__runInitializers(this, _affineFeatureFlagService_extraInitializers), __runInitializers(this, _affineThemeService_initializers, void 0));
            this.#notificationService_accessor_storage = (__runInitializers(this, _affineThemeService_extraInitializers), __runInitializers(this, _notificationService_initializers, void 0));
            this.#networkSearchConfig_accessor_storage = (__runInitializers(this, _notificationService_extraInitializers), __runInitializers(this, _networkSearchConfig_initializers, void 0));
            this.#reasoningConfig_accessor_storage = (__runInitializers(this, _networkSearchConfig_extraInitializers), __runInitializers(this, _reasoningConfig_initializers, void 0));
            this.#width_accessor_storage = (__runInitializers(this, _reasoningConfig_extraInitializers), __runInitializers(this, _width_initializers, void 0));
            this.#docDisplayService_accessor_storage = (__runInitializers(this, _width_extraInitializers), __runInitializers(this, _docDisplayService_initializers, void 0));
            this.#aiToolsConfigService_accessor_storage = (__runInitializers(this, _docDisplayService_extraInitializers), __runInitializers(this, _aiToolsConfigService_initializers, void 0));
            this.#peekViewService_accessor_storage = (__runInitializers(this, _aiToolsConfigService_extraInitializers), __runInitializers(this, _peekViewService_initializers, void 0));
            this.#onOpenDoc_accessor_storage = (__runInitializers(this, _peekViewService_extraInitializers), __runInitializers(this, _onOpenDoc_initializers, void 0));
            this.#testId_accessor_storage = (__runInitializers(this, _onOpenDoc_extraInitializers), __runInitializers(this, _testId_initializers, 'chat-panel-messages'));
            this._onScroll = (__runInitializers(this, _testId_extraInitializers), () => {
                const { clientHeight, scrollTop, scrollHeight } = this;
                this.canScrollDown = scrollHeight - scrollTop - clientHeight > 200;
            });
            this._debouncedOnScroll = debounce(this._onScroll.bind(this), 100);
            this._onDownIndicatorClick = () => {
                this.canScrollDown = false;
                this.scrollToEnd();
            };
            this.retry = async () => {
                try {
                    const sessionId = (await this.createSession())?.sessionId;
                    if (!sessionId)
                        return;
                    if (!AIProvider.actions.chat)
                        return;
                    const abortController = new AbortController();
                    const messages = [...this.chatContextValue.messages];
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
                    const stream = await AIProvider.actions.chat({
                        sessionId,
                        retry: true,
                        docId: this.docId,
                        workspaceId: this.workspaceId,
                        stream: true,
                        signal: abortController.signal,
                        where: 'chat-panel',
                        control: 'chat-send',
                        isRootSession: true,
                        reasoning: this._isReasoningActive,
                        webSearch: this._isNetworkActive,
                        toolsConfig: this.aiToolsConfigService.config.value,
                    });
                    for await (const text of stream) {
                        const messages = this.chatContextValue.messages.slice(0);
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
                }
                catch (error) {
                    this.updateContext({ status: 'error', error: error });
                }
                finally {
                    this.updateContext({ abortController: null });
                }
            };
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __selectionValue_decorators = [state()];
            _canScrollDown_decorators = [state()];
            _avatarUrl_decorators = [state()];
            _independentMode_decorators = [property({ attribute: false })];
            _messages_decorators = [property({ attribute: false })];
            _host_decorators = [property({ attribute: false })];
            _workspaceId_decorators = [property({ attribute: false })];
            _docId_decorators = [property({ attribute: false })];
            _isHistoryLoading_decorators = [property({ attribute: false })];
            _chatContextValue_decorators = [property({ attribute: false })];
            _session_decorators = [property({ attribute: false })];
            _createSession_decorators = [property({ attribute: false })];
            _updateContext_decorators = [property({ attribute: false })];
            _extensions_decorators = [property({ attribute: false })];
            _affineFeatureFlagService_decorators = [property({ attribute: false })];
            _affineThemeService_decorators = [property({ attribute: false })];
            _notificationService_decorators = [property({ attribute: false })];
            _networkSearchConfig_decorators = [property({ attribute: false })];
            _reasoningConfig_decorators = [property({ attribute: false })];
            _width_decorators = [property({ attribute: false })];
            _docDisplayService_decorators = [property({ attribute: false })];
            _aiToolsConfigService_decorators = [property({ attribute: false })];
            _peekViewService_decorators = [property({ attribute: false })];
            _onOpenDoc_decorators = [property({ attribute: false })];
            _testId_decorators = [property({
                    type: String,
                    attribute: 'data-testid',
                    reflect: true,
                })];
            __esDecorate(this, null, __selectionValue_decorators, { kind: "accessor", name: "_selectionValue", static: false, private: false, access: { has: obj => "_selectionValue" in obj, get: obj => obj._selectionValue, set: (obj, value) => { obj._selectionValue = value; } }, metadata: _metadata }, __selectionValue_initializers, __selectionValue_extraInitializers);
            __esDecorate(this, null, _canScrollDown_decorators, { kind: "accessor", name: "canScrollDown", static: false, private: false, access: { has: obj => "canScrollDown" in obj, get: obj => obj.canScrollDown, set: (obj, value) => { obj.canScrollDown = value; } }, metadata: _metadata }, _canScrollDown_initializers, _canScrollDown_extraInitializers);
            __esDecorate(this, null, _avatarUrl_decorators, { kind: "accessor", name: "avatarUrl", static: false, private: false, access: { has: obj => "avatarUrl" in obj, get: obj => obj.avatarUrl, set: (obj, value) => { obj.avatarUrl = value; } }, metadata: _metadata }, _avatarUrl_initializers, _avatarUrl_extraInitializers);
            __esDecorate(this, null, _independentMode_decorators, { kind: "accessor", name: "independentMode", static: false, private: false, access: { has: obj => "independentMode" in obj, get: obj => obj.independentMode, set: (obj, value) => { obj.independentMode = value; } }, metadata: _metadata }, _independentMode_initializers, _independentMode_extraInitializers);
            __esDecorate(this, null, _messages_decorators, { kind: "accessor", name: "messages", static: false, private: false, access: { has: obj => "messages" in obj, get: obj => obj.messages, set: (obj, value) => { obj.messages = value; } }, metadata: _metadata }, _messages_initializers, _messages_extraInitializers);
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _workspaceId_decorators, { kind: "accessor", name: "workspaceId", static: false, private: false, access: { has: obj => "workspaceId" in obj, get: obj => obj.workspaceId, set: (obj, value) => { obj.workspaceId = value; } }, metadata: _metadata }, _workspaceId_initializers, _workspaceId_extraInitializers);
            __esDecorate(this, null, _docId_decorators, { kind: "accessor", name: "docId", static: false, private: false, access: { has: obj => "docId" in obj, get: obj => obj.docId, set: (obj, value) => { obj.docId = value; } }, metadata: _metadata }, _docId_initializers, _docId_extraInitializers);
            __esDecorate(this, null, _isHistoryLoading_decorators, { kind: "accessor", name: "isHistoryLoading", static: false, private: false, access: { has: obj => "isHistoryLoading" in obj, get: obj => obj.isHistoryLoading, set: (obj, value) => { obj.isHistoryLoading = value; } }, metadata: _metadata }, _isHistoryLoading_initializers, _isHistoryLoading_extraInitializers);
            __esDecorate(this, null, _chatContextValue_decorators, { kind: "accessor", name: "chatContextValue", static: false, private: false, access: { has: obj => "chatContextValue" in obj, get: obj => obj.chatContextValue, set: (obj, value) => { obj.chatContextValue = value; } }, metadata: _metadata }, _chatContextValue_initializers, _chatContextValue_extraInitializers);
            __esDecorate(this, null, _session_decorators, { kind: "accessor", name: "session", static: false, private: false, access: { has: obj => "session" in obj, get: obj => obj.session, set: (obj, value) => { obj.session = value; } }, metadata: _metadata }, _session_initializers, _session_extraInitializers);
            __esDecorate(this, null, _createSession_decorators, { kind: "accessor", name: "createSession", static: false, private: false, access: { has: obj => "createSession" in obj, get: obj => obj.createSession, set: (obj, value) => { obj.createSession = value; } }, metadata: _metadata }, _createSession_initializers, _createSession_extraInitializers);
            __esDecorate(this, null, _updateContext_decorators, { kind: "accessor", name: "updateContext", static: false, private: false, access: { has: obj => "updateContext" in obj, get: obj => obj.updateContext, set: (obj, value) => { obj.updateContext = value; } }, metadata: _metadata }, _updateContext_initializers, _updateContext_extraInitializers);
            __esDecorate(this, null, _extensions_decorators, { kind: "accessor", name: "extensions", static: false, private: false, access: { has: obj => "extensions" in obj, get: obj => obj.extensions, set: (obj, value) => { obj.extensions = value; } }, metadata: _metadata }, _extensions_initializers, _extensions_extraInitializers);
            __esDecorate(this, null, _affineFeatureFlagService_decorators, { kind: "accessor", name: "affineFeatureFlagService", static: false, private: false, access: { has: obj => "affineFeatureFlagService" in obj, get: obj => obj.affineFeatureFlagService, set: (obj, value) => { obj.affineFeatureFlagService = value; } }, metadata: _metadata }, _affineFeatureFlagService_initializers, _affineFeatureFlagService_extraInitializers);
            __esDecorate(this, null, _affineThemeService_decorators, { kind: "accessor", name: "affineThemeService", static: false, private: false, access: { has: obj => "affineThemeService" in obj, get: obj => obj.affineThemeService, set: (obj, value) => { obj.affineThemeService = value; } }, metadata: _metadata }, _affineThemeService_initializers, _affineThemeService_extraInitializers);
            __esDecorate(this, null, _notificationService_decorators, { kind: "accessor", name: "notificationService", static: false, private: false, access: { has: obj => "notificationService" in obj, get: obj => obj.notificationService, set: (obj, value) => { obj.notificationService = value; } }, metadata: _metadata }, _notificationService_initializers, _notificationService_extraInitializers);
            __esDecorate(this, null, _networkSearchConfig_decorators, { kind: "accessor", name: "networkSearchConfig", static: false, private: false, access: { has: obj => "networkSearchConfig" in obj, get: obj => obj.networkSearchConfig, set: (obj, value) => { obj.networkSearchConfig = value; } }, metadata: _metadata }, _networkSearchConfig_initializers, _networkSearchConfig_extraInitializers);
            __esDecorate(this, null, _reasoningConfig_decorators, { kind: "accessor", name: "reasoningConfig", static: false, private: false, access: { has: obj => "reasoningConfig" in obj, get: obj => obj.reasoningConfig, set: (obj, value) => { obj.reasoningConfig = value; } }, metadata: _metadata }, _reasoningConfig_initializers, _reasoningConfig_extraInitializers);
            __esDecorate(this, null, _width_decorators, { kind: "accessor", name: "width", static: false, private: false, access: { has: obj => "width" in obj, get: obj => obj.width, set: (obj, value) => { obj.width = value; } }, metadata: _metadata }, _width_initializers, _width_extraInitializers);
            __esDecorate(this, null, _docDisplayService_decorators, { kind: "accessor", name: "docDisplayService", static: false, private: false, access: { has: obj => "docDisplayService" in obj, get: obj => obj.docDisplayService, set: (obj, value) => { obj.docDisplayService = value; } }, metadata: _metadata }, _docDisplayService_initializers, _docDisplayService_extraInitializers);
            __esDecorate(this, null, _aiToolsConfigService_decorators, { kind: "accessor", name: "aiToolsConfigService", static: false, private: false, access: { has: obj => "aiToolsConfigService" in obj, get: obj => obj.aiToolsConfigService, set: (obj, value) => { obj.aiToolsConfigService = value; } }, metadata: _metadata }, _aiToolsConfigService_initializers, _aiToolsConfigService_extraInitializers);
            __esDecorate(this, null, _peekViewService_decorators, { kind: "accessor", name: "peekViewService", static: false, private: false, access: { has: obj => "peekViewService" in obj, get: obj => obj.peekViewService, set: (obj, value) => { obj.peekViewService = value; } }, metadata: _metadata }, _peekViewService_initializers, _peekViewService_extraInitializers);
            __esDecorate(this, null, _onOpenDoc_decorators, { kind: "accessor", name: "onOpenDoc", static: false, private: false, access: { has: obj => "onOpenDoc" in obj, get: obj => obj.onOpenDoc, set: (obj, value) => { obj.onOpenDoc = value; } }, metadata: _metadata }, _onOpenDoc_initializers, _onOpenDoc_extraInitializers);
            __esDecorate(this, null, _testId_decorators, { kind: "accessor", name: "testId", static: false, private: false, access: { has: obj => "testId" in obj, get: obj => obj.testId, set: (obj, value) => { obj.testId = value; } }, metadata: _metadata }, _testId_initializers, _testId_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    ai-chat-messages {
      position: relative;
    }

    .chat-panel-messages-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
      min-height: 100%;
      position: relative;
    }

    chat-panel-assistant-message,
    chat-panel-user-message {
      display: contents;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 4px;
      color: var(--affine-text-primary-color);
      font-size: var(--affine-font-sm);
      font-weight: 500;
      user-select: none;
    }

    .messages-placeholder {
      width: 100%;
      position: absolute;
      z-index: 1;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
    .independent-mode .messages-placeholder {
      position: static;
      transform: none;
    }

    .messages-placeholder-title {
      font-size: 18px;
      font-weight: 600;
      color: var(--affine-text-primary-color);
    }

    .messages-placeholder-title[data-loading='true'] {
      font-size: var(--affine-font-sm);
      color: var(--affine-text-secondary-color);
    }

    .onboarding-wrapper {
      display: flex;
      gap: 8px;
      flex-direction: column;
      margin-top: 16px;
    }

    .onboarding-item {
      display: flex;
      height: 28px;
      gap: 8px;
      align-items: center;
      justify-content: start;
      cursor: pointer;
    }

    .onboarding-item-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: var(--affine-text-secondary-color);
    }

    .onboarding-item-text {
      font-size: var(--affine-font-xs);
      font-weight: 400;
      color: var(--affine-text-primary-color);
      white-space: nowrap;
    }

    .down-indicator {
      position: fixed;
      left: 50%;
      transform: translate(-50%, 0);
      bottom: 166px;
      z-index: 1;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      border: 0.5px solid var(--affine-border-color);
      background-color: var(--affine-background-primary-color);
      box-shadow: var(--affine-shadow-2);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  `; }
        #_selectionValue_accessor_storage;
        get _selectionValue() { return this.#_selectionValue_accessor_storage; }
        set _selectionValue(value) { this.#_selectionValue_accessor_storage = value; }
        #canScrollDown_accessor_storage;
        get canScrollDown() { return this.#canScrollDown_accessor_storage; }
        set canScrollDown(value) { this.#canScrollDown_accessor_storage = value; }
        #avatarUrl_accessor_storage;
        get avatarUrl() { return this.#avatarUrl_accessor_storage; }
        set avatarUrl(value) { this.#avatarUrl_accessor_storage = value; }
        #independentMode_accessor_storage;
        get independentMode() { return this.#independentMode_accessor_storage; }
        set independentMode(value) { this.#independentMode_accessor_storage = value; }
        #messages_accessor_storage;
        get messages() { return this.#messages_accessor_storage; }
        set messages(value) { this.#messages_accessor_storage = value; }
        #host_accessor_storage;
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #workspaceId_accessor_storage;
        get workspaceId() { return this.#workspaceId_accessor_storage; }
        set workspaceId(value) { this.#workspaceId_accessor_storage = value; }
        #docId_accessor_storage;
        get docId() { return this.#docId_accessor_storage; }
        set docId(value) { this.#docId_accessor_storage = value; }
        #isHistoryLoading_accessor_storage;
        get isHistoryLoading() { return this.#isHistoryLoading_accessor_storage; }
        set isHistoryLoading(value) { this.#isHistoryLoading_accessor_storage = value; }
        #chatContextValue_accessor_storage;
        get chatContextValue() { return this.#chatContextValue_accessor_storage; }
        set chatContextValue(value) { this.#chatContextValue_accessor_storage = value; }
        #session_accessor_storage;
        get session() { return this.#session_accessor_storage; }
        set session(value) { this.#session_accessor_storage = value; }
        #createSession_accessor_storage;
        get createSession() { return this.#createSession_accessor_storage; }
        set createSession(value) { this.#createSession_accessor_storage = value; }
        #updateContext_accessor_storage;
        get updateContext() { return this.#updateContext_accessor_storage; }
        set updateContext(value) { this.#updateContext_accessor_storage = value; }
        #extensions_accessor_storage;
        get extensions() { return this.#extensions_accessor_storage; }
        set extensions(value) { this.#extensions_accessor_storage = value; }
        #affineFeatureFlagService_accessor_storage;
        get affineFeatureFlagService() { return this.#affineFeatureFlagService_accessor_storage; }
        set affineFeatureFlagService(value) { this.#affineFeatureFlagService_accessor_storage = value; }
        #affineThemeService_accessor_storage;
        get affineThemeService() { return this.#affineThemeService_accessor_storage; }
        set affineThemeService(value) { this.#affineThemeService_accessor_storage = value; }
        #notificationService_accessor_storage;
        get notificationService() { return this.#notificationService_accessor_storage; }
        set notificationService(value) { this.#notificationService_accessor_storage = value; }
        #networkSearchConfig_accessor_storage;
        get networkSearchConfig() { return this.#networkSearchConfig_accessor_storage; }
        set networkSearchConfig(value) { this.#networkSearchConfig_accessor_storage = value; }
        #reasoningConfig_accessor_storage;
        get reasoningConfig() { return this.#reasoningConfig_accessor_storage; }
        set reasoningConfig(value) { this.#reasoningConfig_accessor_storage = value; }
        #width_accessor_storage;
        get width() { return this.#width_accessor_storage; }
        set width(value) { this.#width_accessor_storage = value; }
        #docDisplayService_accessor_storage;
        get docDisplayService() { return this.#docDisplayService_accessor_storage; }
        set docDisplayService(value) { this.#docDisplayService_accessor_storage = value; }
        #aiToolsConfigService_accessor_storage;
        get aiToolsConfigService() { return this.#aiToolsConfigService_accessor_storage; }
        set aiToolsConfigService(value) { this.#aiToolsConfigService_accessor_storage = value; }
        #peekViewService_accessor_storage;
        get peekViewService() { return this.#peekViewService_accessor_storage; }
        set peekViewService(value) { this.#peekViewService_accessor_storage = value; }
        #onOpenDoc_accessor_storage;
        get onOpenDoc() { return this.#onOpenDoc_accessor_storage; }
        set onOpenDoc(value) { this.#onOpenDoc_accessor_storage = value; }
        #testId_accessor_storage;
        get testId() { return this.#testId_accessor_storage; }
        set testId(value) { this.#testId_accessor_storage = value; }
        get _isNetworkActive() {
            return (!!this.networkSearchConfig.visible.value &&
                !!this.networkSearchConfig.enabled.value);
        }
        get _isReasoningActive() {
            return !!this.reasoningConfig.enabled.value;
        }
        _renderAIOnboarding() {
            return this.isHistoryLoading
                ? nothing
                : html `<div class="onboarding-wrapper" data-testid="ai-onboarding">
          ${repeat(AIPreloadConfig, config => config.text, config => {
                    return html `<div
                data-testid=${config.testId}
                @click=${() => config.handler()}
                class="onboarding-item"
              >
                <div class="onboarding-item-icon">${config.icon}</div>
                <div class="onboarding-item-text">${config.text}</div>
              </div>`;
                })}
        </div>`;
        }
        render() {
            const { status, error } = this.chatContextValue;
            const { isHistoryLoading } = this;
            const filteredItems = this.messages;
            const showDownIndicator = this.canScrollDown && filteredItems.length > 0;
            return html `
      <div
        class=${classMap({
                'chat-panel-messages-container': true,
                'independent-mode': !!this.independentMode,
            })}
        data-testid="chat-panel-messages-container"
      >
        ${filteredItems.length === 0
                ? html `<div
              class="messages-placeholder"
              data-testid="chat-panel-messages-placeholder"
            >
              ${AffineIcon(isHistoryLoading
                    ? 'var(--affine-icon-secondary)'
                    : 'var(--affine-primary-color)')}
              <div
                class="messages-placeholder-title"
                data-loading=${isHistoryLoading}
              >
                ${this.isHistoryLoading
                    ? html `<span data-testid="chat-panel-loading-state"
                      >AFFiNE AI is loading history...</span
                    >`
                    : html `<span data-testid="chat-panel-empty-state"
                      >What can I help you with?</span
                    >`}
              </div>
              ${this.independentMode ? nothing : this._renderAIOnboarding()}
            </div> `
                : repeat(filteredItems, (_, index) => index, (item, index) => {
                    const isLast = index === filteredItems.length - 1;
                    if (isChatMessage(item) && item.role === 'user') {
                        return html `<chat-message-user
                    .item=${item}
                  ></chat-message-user>`;
                    }
                    else if (isChatMessage(item) && item.role === 'assistant') {
                        return html `<chat-message-assistant
                    .host=${this.host}
                    .session=${this.session}
                    .item=${item}
                    .isLast=${isLast}
                    .status=${isLast ? status : 'idle'}
                    .error=${isLast ? error : null}
                    .extensions=${this.extensions}
                    .affineFeatureFlagService=${this.affineFeatureFlagService}
                    .affineThemeService=${this.affineThemeService}
                    .notificationService=${this.notificationService}
                    .retry=${() => this.retry()}
                    .width=${this.width}
                    .independentMode=${this.independentMode}
                    .docDisplayService=${this.docDisplayService}
                    .peekViewService=${this.peekViewService}
                    .onOpenDoc=${this.onOpenDoc}
                  ></chat-message-assistant>`;
                    }
                    else if (isChatAction(item) && this.host) {
                        return html `<chat-message-action
                    .host=${this.host}
                    .item=${item}
                  ></chat-message-action>`;
                    }
                    return nothing;
                })}
      </div>
      ${showDownIndicator && filteredItems.length > 0
                ? html `<div
            data-testid="chat-panel-scroll-down-indicator"
            class="down-indicator"
            @click=${this._onDownIndicatorClick}
          >
            ${ArrowDownIcon()}
          </div>`
                : nothing}
    `;
        }
        connectedCallback() {
            super.connectedCallback();
            const { disposables } = this;
            Promise.resolve(AIProvider.userInfo)
                .then(res => {
                this.avatarUrl = res?.avatarUrl ?? '';
            })
                .catch(console.error);
            disposables.add(AIProvider.slots.userInfo.subscribe(userInfo => {
                const { status, error } = this.chatContextValue;
                this.avatarUrl = userInfo?.avatarUrl ?? '';
                if (status === 'error' &&
                    error instanceof UnauthorizedError &&
                    userInfo) {
                    this.updateContext({ status: 'idle', error: null });
                }
            }));
            const selection$ = this.host?.selection.slots.changed;
            if (selection$) {
                disposables.add(selection$.subscribe(() => {
                    this._selectionValue = this.host?.selection.value ?? [];
                }));
            }
            const docModeService = this.host?.std.get(DocModeProvider);
            if (docModeService && this.docId) {
                disposables.add(docModeService.onPrimaryModeChange(() => this.requestUpdate(), this.docId));
            }
            // Add scroll event listener to the host element
            this.addEventListener('scroll', this._debouncedOnScroll);
            disposables.add(() => {
                this.removeEventListener('scroll', this._debouncedOnScroll);
            });
        }
        updated(_changedProperties) {
            if (_changedProperties.has('isHistoryLoading')) {
                this.canScrollDown = false;
            }
            if (_changedProperties.has('chatContextValue') &&
                this.chatContextValue.status === 'transmitting') {
                this._onScroll();
            }
        }
        scrollToEnd() {
            requestAnimationFrame(() => {
                this.scrollTo({
                    top: this.scrollHeight,
                    behavior: 'smooth',
                });
            });
        }
        scrollToPos(top) {
            requestAnimationFrame(() => {
                this.scrollTo({ top });
            });
        }
    };
})();
export { AIChatMessages };
//# sourceMappingURL=ai-chat-messages.js.map