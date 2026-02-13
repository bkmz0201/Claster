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
import { unsafeCSSVar, unsafeCSSVarV2 } from '@blocksuite/affine/shared/theme';
import { ShadowlessElement } from '@blocksuite/affine/std';
import { ArrowUpBigIcon, CloseIcon } from '@blocksuite/icons/lit';
import { css, html, nothing } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { ChatAbortIcon } from '../../_common/icons';
import { AIProvider } from '../../provider';
import { reportResponse } from '../../utils/action-reporter';
import { readBlobAsURL } from '../../utils/image';
import { mergeStreamObjects } from '../../utils/stream-objects';
import { isDocChip } from '../ai-chat-chips/utils';
import { isChatMessage, StreamObjectSchema, } from '../ai-chat-messages';
function getFirstTwoLines(text) {
    const lines = text.split('\n');
    return lines.slice(0, 2);
}
let AIChatInput = (() => {
    let _classSuper = SignalWatcher(WithDisposable(ShadowlessElement));
    let _independentMode_decorators;
    let _independentMode_initializers = [];
    let _independentMode_extraInitializers = [];
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _workspaceId_decorators;
    let _workspaceId_initializers = [];
    let _workspaceId_extraInitializers = [];
    let _docId_decorators;
    let _docId_initializers = [];
    let _docId_extraInitializers = [];
    let _session_decorators;
    let _session_initializers = [];
    let _session_extraInitializers = [];
    let _isContextProcessing_decorators;
    let _isContextProcessing_initializers = [];
    let _isContextProcessing_extraInitializers = [];
    let _imagePreviewGrid_decorators;
    let _imagePreviewGrid_initializers = [];
    let _imagePreviewGrid_extraInitializers = [];
    let _textarea_decorators;
    let _textarea_initializers = [];
    let _textarea_extraInitializers = [];
    let _isInputEmpty_decorators;
    let _isInputEmpty_initializers = [];
    let _isInputEmpty_extraInitializers = [];
    let _focused_decorators;
    let _focused_initializers = [];
    let _focused_extraInitializers = [];
    let _chatContextValue_decorators;
    let _chatContextValue_initializers = [];
    let _chatContextValue_extraInitializers = [];
    let _chips_decorators;
    let _chips_initializers = [];
    let _chips_extraInitializers = [];
    let _createSession_decorators;
    let _createSession_initializers = [];
    let _createSession_extraInitializers = [];
    let _updateContext_decorators;
    let _updateContext_initializers = [];
    let _updateContext_extraInitializers = [];
    let _addImages_decorators;
    let _addImages_initializers = [];
    let _addImages_extraInitializers = [];
    let _addChip_decorators;
    let _addChip_initializers = [];
    let _addChip_extraInitializers = [];
    let _networkSearchConfig_decorators;
    let _networkSearchConfig_initializers = [];
    let _networkSearchConfig_extraInitializers = [];
    let _reasoningConfig_decorators;
    let _reasoningConfig_initializers = [];
    let _reasoningConfig_extraInitializers = [];
    let _docDisplayConfig_decorators;
    let _docDisplayConfig_initializers = [];
    let _docDisplayConfig_extraInitializers = [];
    let _searchMenuConfig_decorators;
    let _searchMenuConfig_initializers = [];
    let _searchMenuConfig_extraInitializers = [];
    let _serverService_decorators;
    let _serverService_initializers = [];
    let _serverService_extraInitializers = [];
    let _aiDraftService_decorators;
    let _aiDraftService_initializers = [];
    let _aiDraftService_extraInitializers = [];
    let _aiToolsConfigService_decorators;
    let _aiToolsConfigService_initializers = [];
    let _aiToolsConfigService_extraInitializers = [];
    let _affineFeatureFlagService_decorators;
    let _affineFeatureFlagService_initializers = [];
    let _affineFeatureFlagService_extraInitializers = [];
    let _notificationService_decorators;
    let _notificationService_initializers = [];
    let _notificationService_extraInitializers = [];
    let _subscriptionService_decorators;
    let _subscriptionService_initializers = [];
    let _subscriptionService_extraInitializers = [];
    let _aiModelService_decorators;
    let _aiModelService_initializers = [];
    let _aiModelService_extraInitializers = [];
    let _onAISubscribe_decorators;
    let _onAISubscribe_initializers = [];
    let _onAISubscribe_extraInitializers = [];
    let _isRootSession_decorators;
    let _isRootSession_initializers = [];
    let _isRootSession_extraInitializers = [];
    let _onChatSuccess_decorators;
    let _onChatSuccess_initializers = [];
    let _onChatSuccess_extraInitializers = [];
    let _trackOptions_decorators;
    let _trackOptions_initializers = [];
    let _trackOptions_extraInitializers = [];
    let _testId_decorators;
    let _testId_initializers = [];
    let _testId_extraInitializers = [];
    let _portalContainer_decorators;
    let _portalContainer_initializers = [];
    let _portalContainer_extraInitializers = [];
    return class AIChatInput extends _classSuper {
        constructor() {
            super(...arguments);
            this.#independentMode_accessor_storage = __runInitializers(this, _independentMode_initializers, void 0);
            this.#host_accessor_storage = (__runInitializers(this, _independentMode_extraInitializers), __runInitializers(this, _host_initializers, void 0));
            this.#workspaceId_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _workspaceId_initializers, void 0));
            this.#docId_accessor_storage = (__runInitializers(this, _workspaceId_extraInitializers), __runInitializers(this, _docId_initializers, void 0));
            this.#session_accessor_storage = (__runInitializers(this, _docId_extraInitializers), __runInitializers(this, _session_initializers, void 0));
            this.#isContextProcessing_accessor_storage = (__runInitializers(this, _session_extraInitializers), __runInitializers(this, _isContextProcessing_initializers, void 0));
            this.#imagePreviewGrid_accessor_storage = (__runInitializers(this, _isContextProcessing_extraInitializers), __runInitializers(this, _imagePreviewGrid_initializers, null));
            this.#textarea_accessor_storage = (__runInitializers(this, _imagePreviewGrid_extraInitializers), __runInitializers(this, _textarea_initializers, void 0));
            this.#isInputEmpty_accessor_storage = (__runInitializers(this, _textarea_extraInitializers), __runInitializers(this, _isInputEmpty_initializers, true));
            this.#focused_accessor_storage = (__runInitializers(this, _isInputEmpty_extraInitializers), __runInitializers(this, _focused_initializers, false));
            this.#chatContextValue_accessor_storage = (__runInitializers(this, _focused_extraInitializers), __runInitializers(this, _chatContextValue_initializers, void 0));
            this.#chips_accessor_storage = (__runInitializers(this, _chatContextValue_extraInitializers), __runInitializers(this, _chips_initializers, []));
            this.#createSession_accessor_storage = (__runInitializers(this, _chips_extraInitializers), __runInitializers(this, _createSession_initializers, void 0));
            this.#updateContext_accessor_storage = (__runInitializers(this, _createSession_extraInitializers), __runInitializers(this, _updateContext_initializers, void 0));
            this.#addImages_accessor_storage = (__runInitializers(this, _updateContext_extraInitializers), __runInitializers(this, _addImages_initializers, void 0));
            this.#addChip_accessor_storage = (__runInitializers(this, _addImages_extraInitializers), __runInitializers(this, _addChip_initializers, void 0));
            this.#networkSearchConfig_accessor_storage = (__runInitializers(this, _addChip_extraInitializers), __runInitializers(this, _networkSearchConfig_initializers, void 0));
            this.#reasoningConfig_accessor_storage = (__runInitializers(this, _networkSearchConfig_extraInitializers), __runInitializers(this, _reasoningConfig_initializers, void 0));
            this.#docDisplayConfig_accessor_storage = (__runInitializers(this, _reasoningConfig_extraInitializers), __runInitializers(this, _docDisplayConfig_initializers, void 0));
            this.#searchMenuConfig_accessor_storage = (__runInitializers(this, _docDisplayConfig_extraInitializers), __runInitializers(this, _searchMenuConfig_initializers, void 0));
            this.#serverService_accessor_storage = (__runInitializers(this, _searchMenuConfig_extraInitializers), __runInitializers(this, _serverService_initializers, void 0));
            this.#aiDraftService_accessor_storage = (__runInitializers(this, _serverService_extraInitializers), __runInitializers(this, _aiDraftService_initializers, void 0));
            this.#aiToolsConfigService_accessor_storage = (__runInitializers(this, _aiDraftService_extraInitializers), __runInitializers(this, _aiToolsConfigService_initializers, void 0));
            this.#affineFeatureFlagService_accessor_storage = (__runInitializers(this, _aiToolsConfigService_extraInitializers), __runInitializers(this, _affineFeatureFlagService_initializers, void 0));
            this.#notificationService_accessor_storage = (__runInitializers(this, _affineFeatureFlagService_extraInitializers), __runInitializers(this, _notificationService_initializers, void 0));
            this.#subscriptionService_accessor_storage = (__runInitializers(this, _notificationService_extraInitializers), __runInitializers(this, _subscriptionService_initializers, void 0));
            this.#aiModelService_accessor_storage = (__runInitializers(this, _subscriptionService_extraInitializers), __runInitializers(this, _aiModelService_initializers, void 0));
            this.#onAISubscribe_accessor_storage = (__runInitializers(this, _aiModelService_extraInitializers), __runInitializers(this, _onAISubscribe_initializers, void 0));
            this.#isRootSession_accessor_storage = (__runInitializers(this, _onAISubscribe_extraInitializers), __runInitializers(this, _isRootSession_initializers, true));
            this.#onChatSuccess_accessor_storage = (__runInitializers(this, _isRootSession_extraInitializers), __runInitializers(this, _onChatSuccess_initializers, void 0));
            this.#trackOptions_accessor_storage = (__runInitializers(this, _onChatSuccess_extraInitializers), __runInitializers(this, _trackOptions_initializers, void 0));
            this.#testId_accessor_storage = (__runInitializers(this, _trackOptions_extraInitializers), __runInitializers(this, _testId_initializers, 'chat-panel-input-container'));
            this.#portalContainer_accessor_storage = (__runInitializers(this, _testId_extraInitializers), __runInitializers(this, _portalContainer_initializers, null));
            this._handlePointerDown = (__runInitializers(this, _portalContainer_extraInitializers), (e) => {
                if (e.target !== this.textarea) {
                    // by default the div will be focused and will blur the textarea
                    e.preventDefault();
                    this.textarea.focus();
                }
            });
            this._handleInput = async () => {
                const { textarea } = this;
                const value = textarea.value.trim();
                this.isInputEmpty = !value;
                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + 'px';
                let imagesHeight = this.imagePreviewGrid?.scrollHeight ?? 0;
                if (imagesHeight)
                    imagesHeight += 12;
                if (this.scrollHeight >= 200 + imagesHeight) {
                    textarea.style.height = '148px';
                    textarea.style.overflowY = 'scroll';
                }
                if (this.aiDraftService) {
                    await this.aiDraftService.setDraft({
                        input: value,
                    });
                }
            };
            this._handleKeyDown = async (evt) => {
                if (evt.key === 'Enter' && !evt.shiftKey && !evt.isComposing) {
                    await this._onTextareaSend(evt);
                }
            };
            this._handlePaste = (event) => {
                event.stopPropagation();
                const items = event.clipboardData?.items;
                if (!items)
                    return;
                for (const index in items) {
                    const item = items[index];
                    if (item.kind === 'file' && item.type.indexOf('image') >= 0) {
                        const blob = item.getAsFile();
                        if (!blob)
                            continue;
                        this.addImages([blob]);
                    }
                }
            };
            this._handleAbort = () => {
                this.chatContextValue.abortController?.abort();
                this.updateContext({ status: 'success' });
                reportResponse('aborted:stop');
            };
            this._toggleNetworkSearch = (isNetworkActive) => {
                this.networkSearchConfig.setEnabled(isNetworkActive);
            };
            this._toggleReasoning = (extendedThinking) => {
                this.reasoningConfig.setEnabled(extendedThinking);
            };
            this._handleImageRemove = (index) => {
                const oldImages = this.chatContextValue.images;
                const newImages = oldImages.filter((_, i) => i !== index);
                this.updateContext({ images: newImages });
            };
            this._onTextareaSend = async (e) => {
                e.preventDefault();
                e.stopPropagation();
                const value = this.textarea.value.trim();
                if (value.length === 0)
                    return;
                this.textarea.value = '';
                this.isInputEmpty = true;
                this.textarea.style.height = 'unset';
                if (this.aiDraftService) {
                    await this.aiDraftService.setDraft({
                        input: '',
                    });
                }
                await this.send(value);
            };
            this.send = async (text) => {
                try {
                    const { status, markdown, images, snapshot, combinedElementsMarkdown, html, } = this.chatContextValue;
                    if (status === 'loading' || status === 'transmitting')
                        return;
                    if (!text)
                        return;
                    if (!AIProvider.actions.chat)
                        return;
                    const abortController = new AbortController();
                    this.updateContext({
                        images: [],
                        status: 'loading',
                        error: null,
                        quote: '',
                        markdown: '',
                        abortController,
                    });
                    const imageAttachments = await Promise.all(images?.map(image => readBlobAsURL(image)));
                    const userInput = (markdown ? `${markdown}\n` : '') + text;
                    // optimistic update messages
                    await this._preUpdateMessages(userInput, imageAttachments);
                    const sessionId = (await this.createSession())?.sessionId;
                    let contexts = await this._getMatchedContexts();
                    if (abortController.signal.aborted) {
                        return;
                    }
                    const enableSendDetailedObject = this.affineFeatureFlagService.flags.enable_send_detailed_object_to_ai
                        .value;
                    const modelId = this.aiModelService.modelId.value;
                    const stream = await AIProvider.actions.chat({
                        sessionId,
                        input: userInput,
                        contexts: {
                            ...contexts,
                            selectedSnapshot: snapshot && enableSendDetailedObject ? snapshot : undefined,
                            selectedMarkdown: combinedElementsMarkdown && enableSendDetailedObject
                                ? combinedElementsMarkdown
                                : undefined,
                            html: html || undefined,
                        },
                        docId: this.docId,
                        attachments: images,
                        workspaceId: this.workspaceId,
                        stream: true,
                        signal: abortController.signal,
                        isRootSession: this.isRootSession,
                        where: this.trackOptions?.where,
                        control: this.trackOptions?.control,
                        webSearch: this._isNetworkActive,
                        reasoning: this._isReasoningActive,
                        toolsConfig: this.aiToolsConfigService.config.value,
                        modelId,
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
                    this.onChatSuccess?.();
                    // update message id from server
                    await this._postUpdateMessages();
                }
                catch (error) {
                    this.updateContext({ status: 'error', error: error });
                }
                finally {
                    this.updateContext({ abortController: null });
                }
            };
            this._preUpdateMessages = async (userInput, attachments) => {
                const userInfo = await AIProvider.userInfo;
                this.updateContext({
                    messages: [
                        ...this.chatContextValue.messages,
                        {
                            id: '',
                            role: 'user',
                            content: userInput,
                            createdAt: new Date().toISOString(),
                            attachments,
                            userId: userInfo?.id,
                            userName: userInfo?.name,
                            avatarUrl: userInfo?.avatarUrl ?? undefined,
                        },
                        {
                            id: '',
                            role: 'assistant',
                            content: '',
                            createdAt: new Date().toISOString(),
                        },
                    ],
                });
            };
            this._postUpdateMessages = async () => {
                const sessionId = this.session?.sessionId;
                if (!sessionId || !AIProvider.histories)
                    return;
                const { messages } = this.chatContextValue;
                const last = messages[messages.length - 1];
                if (!last.id) {
                    const historyIds = await AIProvider.histories.ids(this.workspaceId, this.docId, { sessionId, withMessages: true });
                    if (!historyIds || !historyIds[0])
                        return;
                    last.id = historyIds[0].messages.at(-1)?.id ?? '';
                }
            };
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _independentMode_decorators = [property({ attribute: false })];
            _host_decorators = [property({ attribute: false })];
            _workspaceId_decorators = [property({ attribute: false })];
            _docId_decorators = [property({ attribute: false })];
            _session_decorators = [property({ attribute: false })];
            _isContextProcessing_decorators = [property({ attribute: false })];
            _imagePreviewGrid_decorators = [query('image-preview-grid')];
            _textarea_decorators = [query('textarea')];
            _isInputEmpty_decorators = [state()];
            _focused_decorators = [state()];
            _chatContextValue_decorators = [property({ attribute: false })];
            _chips_decorators = [property({ attribute: false })];
            _createSession_decorators = [property({ attribute: false })];
            _updateContext_decorators = [property({ attribute: false })];
            _addImages_decorators = [property({ attribute: false })];
            _addChip_decorators = [property({ attribute: false })];
            _networkSearchConfig_decorators = [property({ attribute: false })];
            _reasoningConfig_decorators = [property({ attribute: false })];
            _docDisplayConfig_decorators = [property({ attribute: false })];
            _searchMenuConfig_decorators = [property({ attribute: false })];
            _serverService_decorators = [property({ attribute: false })];
            _aiDraftService_decorators = [property({ attribute: false })];
            _aiToolsConfigService_decorators = [property({ attribute: false })];
            _affineFeatureFlagService_decorators = [property({ attribute: false })];
            _notificationService_decorators = [property({ attribute: false })];
            _subscriptionService_decorators = [property({ attribute: false })];
            _aiModelService_decorators = [property({ attribute: false })];
            _onAISubscribe_decorators = [property({ attribute: false })];
            _isRootSession_decorators = [property({ attribute: false })];
            _onChatSuccess_decorators = [property({ attribute: false })];
            _trackOptions_decorators = [property({ attribute: false })];
            _testId_decorators = [property({ attribute: 'data-testid', reflect: true })];
            _portalContainer_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _independentMode_decorators, { kind: "accessor", name: "independentMode", static: false, private: false, access: { has: obj => "independentMode" in obj, get: obj => obj.independentMode, set: (obj, value) => { obj.independentMode = value; } }, metadata: _metadata }, _independentMode_initializers, _independentMode_extraInitializers);
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _workspaceId_decorators, { kind: "accessor", name: "workspaceId", static: false, private: false, access: { has: obj => "workspaceId" in obj, get: obj => obj.workspaceId, set: (obj, value) => { obj.workspaceId = value; } }, metadata: _metadata }, _workspaceId_initializers, _workspaceId_extraInitializers);
            __esDecorate(this, null, _docId_decorators, { kind: "accessor", name: "docId", static: false, private: false, access: { has: obj => "docId" in obj, get: obj => obj.docId, set: (obj, value) => { obj.docId = value; } }, metadata: _metadata }, _docId_initializers, _docId_extraInitializers);
            __esDecorate(this, null, _session_decorators, { kind: "accessor", name: "session", static: false, private: false, access: { has: obj => "session" in obj, get: obj => obj.session, set: (obj, value) => { obj.session = value; } }, metadata: _metadata }, _session_initializers, _session_extraInitializers);
            __esDecorate(this, null, _isContextProcessing_decorators, { kind: "accessor", name: "isContextProcessing", static: false, private: false, access: { has: obj => "isContextProcessing" in obj, get: obj => obj.isContextProcessing, set: (obj, value) => { obj.isContextProcessing = value; } }, metadata: _metadata }, _isContextProcessing_initializers, _isContextProcessing_extraInitializers);
            __esDecorate(this, null, _imagePreviewGrid_decorators, { kind: "accessor", name: "imagePreviewGrid", static: false, private: false, access: { has: obj => "imagePreviewGrid" in obj, get: obj => obj.imagePreviewGrid, set: (obj, value) => { obj.imagePreviewGrid = value; } }, metadata: _metadata }, _imagePreviewGrid_initializers, _imagePreviewGrid_extraInitializers);
            __esDecorate(this, null, _textarea_decorators, { kind: "accessor", name: "textarea", static: false, private: false, access: { has: obj => "textarea" in obj, get: obj => obj.textarea, set: (obj, value) => { obj.textarea = value; } }, metadata: _metadata }, _textarea_initializers, _textarea_extraInitializers);
            __esDecorate(this, null, _isInputEmpty_decorators, { kind: "accessor", name: "isInputEmpty", static: false, private: false, access: { has: obj => "isInputEmpty" in obj, get: obj => obj.isInputEmpty, set: (obj, value) => { obj.isInputEmpty = value; } }, metadata: _metadata }, _isInputEmpty_initializers, _isInputEmpty_extraInitializers);
            __esDecorate(this, null, _focused_decorators, { kind: "accessor", name: "focused", static: false, private: false, access: { has: obj => "focused" in obj, get: obj => obj.focused, set: (obj, value) => { obj.focused = value; } }, metadata: _metadata }, _focused_initializers, _focused_extraInitializers);
            __esDecorate(this, null, _chatContextValue_decorators, { kind: "accessor", name: "chatContextValue", static: false, private: false, access: { has: obj => "chatContextValue" in obj, get: obj => obj.chatContextValue, set: (obj, value) => { obj.chatContextValue = value; } }, metadata: _metadata }, _chatContextValue_initializers, _chatContextValue_extraInitializers);
            __esDecorate(this, null, _chips_decorators, { kind: "accessor", name: "chips", static: false, private: false, access: { has: obj => "chips" in obj, get: obj => obj.chips, set: (obj, value) => { obj.chips = value; } }, metadata: _metadata }, _chips_initializers, _chips_extraInitializers);
            __esDecorate(this, null, _createSession_decorators, { kind: "accessor", name: "createSession", static: false, private: false, access: { has: obj => "createSession" in obj, get: obj => obj.createSession, set: (obj, value) => { obj.createSession = value; } }, metadata: _metadata }, _createSession_initializers, _createSession_extraInitializers);
            __esDecorate(this, null, _updateContext_decorators, { kind: "accessor", name: "updateContext", static: false, private: false, access: { has: obj => "updateContext" in obj, get: obj => obj.updateContext, set: (obj, value) => { obj.updateContext = value; } }, metadata: _metadata }, _updateContext_initializers, _updateContext_extraInitializers);
            __esDecorate(this, null, _addImages_decorators, { kind: "accessor", name: "addImages", static: false, private: false, access: { has: obj => "addImages" in obj, get: obj => obj.addImages, set: (obj, value) => { obj.addImages = value; } }, metadata: _metadata }, _addImages_initializers, _addImages_extraInitializers);
            __esDecorate(this, null, _addChip_decorators, { kind: "accessor", name: "addChip", static: false, private: false, access: { has: obj => "addChip" in obj, get: obj => obj.addChip, set: (obj, value) => { obj.addChip = value; } }, metadata: _metadata }, _addChip_initializers, _addChip_extraInitializers);
            __esDecorate(this, null, _networkSearchConfig_decorators, { kind: "accessor", name: "networkSearchConfig", static: false, private: false, access: { has: obj => "networkSearchConfig" in obj, get: obj => obj.networkSearchConfig, set: (obj, value) => { obj.networkSearchConfig = value; } }, metadata: _metadata }, _networkSearchConfig_initializers, _networkSearchConfig_extraInitializers);
            __esDecorate(this, null, _reasoningConfig_decorators, { kind: "accessor", name: "reasoningConfig", static: false, private: false, access: { has: obj => "reasoningConfig" in obj, get: obj => obj.reasoningConfig, set: (obj, value) => { obj.reasoningConfig = value; } }, metadata: _metadata }, _reasoningConfig_initializers, _reasoningConfig_extraInitializers);
            __esDecorate(this, null, _docDisplayConfig_decorators, { kind: "accessor", name: "docDisplayConfig", static: false, private: false, access: { has: obj => "docDisplayConfig" in obj, get: obj => obj.docDisplayConfig, set: (obj, value) => { obj.docDisplayConfig = value; } }, metadata: _metadata }, _docDisplayConfig_initializers, _docDisplayConfig_extraInitializers);
            __esDecorate(this, null, _searchMenuConfig_decorators, { kind: "accessor", name: "searchMenuConfig", static: false, private: false, access: { has: obj => "searchMenuConfig" in obj, get: obj => obj.searchMenuConfig, set: (obj, value) => { obj.searchMenuConfig = value; } }, metadata: _metadata }, _searchMenuConfig_initializers, _searchMenuConfig_extraInitializers);
            __esDecorate(this, null, _serverService_decorators, { kind: "accessor", name: "serverService", static: false, private: false, access: { has: obj => "serverService" in obj, get: obj => obj.serverService, set: (obj, value) => { obj.serverService = value; } }, metadata: _metadata }, _serverService_initializers, _serverService_extraInitializers);
            __esDecorate(this, null, _aiDraftService_decorators, { kind: "accessor", name: "aiDraftService", static: false, private: false, access: { has: obj => "aiDraftService" in obj, get: obj => obj.aiDraftService, set: (obj, value) => { obj.aiDraftService = value; } }, metadata: _metadata }, _aiDraftService_initializers, _aiDraftService_extraInitializers);
            __esDecorate(this, null, _aiToolsConfigService_decorators, { kind: "accessor", name: "aiToolsConfigService", static: false, private: false, access: { has: obj => "aiToolsConfigService" in obj, get: obj => obj.aiToolsConfigService, set: (obj, value) => { obj.aiToolsConfigService = value; } }, metadata: _metadata }, _aiToolsConfigService_initializers, _aiToolsConfigService_extraInitializers);
            __esDecorate(this, null, _affineFeatureFlagService_decorators, { kind: "accessor", name: "affineFeatureFlagService", static: false, private: false, access: { has: obj => "affineFeatureFlagService" in obj, get: obj => obj.affineFeatureFlagService, set: (obj, value) => { obj.affineFeatureFlagService = value; } }, metadata: _metadata }, _affineFeatureFlagService_initializers, _affineFeatureFlagService_extraInitializers);
            __esDecorate(this, null, _notificationService_decorators, { kind: "accessor", name: "notificationService", static: false, private: false, access: { has: obj => "notificationService" in obj, get: obj => obj.notificationService, set: (obj, value) => { obj.notificationService = value; } }, metadata: _metadata }, _notificationService_initializers, _notificationService_extraInitializers);
            __esDecorate(this, null, _subscriptionService_decorators, { kind: "accessor", name: "subscriptionService", static: false, private: false, access: { has: obj => "subscriptionService" in obj, get: obj => obj.subscriptionService, set: (obj, value) => { obj.subscriptionService = value; } }, metadata: _metadata }, _subscriptionService_initializers, _subscriptionService_extraInitializers);
            __esDecorate(this, null, _aiModelService_decorators, { kind: "accessor", name: "aiModelService", static: false, private: false, access: { has: obj => "aiModelService" in obj, get: obj => obj.aiModelService, set: (obj, value) => { obj.aiModelService = value; } }, metadata: _metadata }, _aiModelService_initializers, _aiModelService_extraInitializers);
            __esDecorate(this, null, _onAISubscribe_decorators, { kind: "accessor", name: "onAISubscribe", static: false, private: false, access: { has: obj => "onAISubscribe" in obj, get: obj => obj.onAISubscribe, set: (obj, value) => { obj.onAISubscribe = value; } }, metadata: _metadata }, _onAISubscribe_initializers, _onAISubscribe_extraInitializers);
            __esDecorate(this, null, _isRootSession_decorators, { kind: "accessor", name: "isRootSession", static: false, private: false, access: { has: obj => "isRootSession" in obj, get: obj => obj.isRootSession, set: (obj, value) => { obj.isRootSession = value; } }, metadata: _metadata }, _isRootSession_initializers, _isRootSession_extraInitializers);
            __esDecorate(this, null, _onChatSuccess_decorators, { kind: "accessor", name: "onChatSuccess", static: false, private: false, access: { has: obj => "onChatSuccess" in obj, get: obj => obj.onChatSuccess, set: (obj, value) => { obj.onChatSuccess = value; } }, metadata: _metadata }, _onChatSuccess_initializers, _onChatSuccess_extraInitializers);
            __esDecorate(this, null, _trackOptions_decorators, { kind: "accessor", name: "trackOptions", static: false, private: false, access: { has: obj => "trackOptions" in obj, get: obj => obj.trackOptions, set: (obj, value) => { obj.trackOptions = value; } }, metadata: _metadata }, _trackOptions_initializers, _trackOptions_extraInitializers);
            __esDecorate(this, null, _testId_decorators, { kind: "accessor", name: "testId", static: false, private: false, access: { has: obj => "testId" in obj, get: obj => obj.testId, set: (obj, value) => { obj.testId = value; } }, metadata: _metadata }, _testId_initializers, _testId_extraInitializers);
            __esDecorate(this, null, _portalContainer_decorators, { kind: "accessor", name: "portalContainer", static: false, private: false, access: { has: obj => "portalContainer" in obj, get: obj => obj.portalContainer, set: (obj, value) => { obj.portalContainer = value; } }, metadata: _metadata }, _portalContainer_initializers, _portalContainer_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      width: 100%;
    }

    [data-theme='dark'] .chat-panel-input {
      box-shadow:
        var(--border-shadow),
        0px 0px 0px 0px rgba(28, 158, 228, 0),
        0px 0px 0px 2px transparent;
    }
    [data-theme='light'] .chat-panel-input,
    .chat-panel-input {
      box-shadow:
        var(--border-shadow),
        0px 0px 0px 3px transparent,
        0px 2px 3px rgba(0, 0, 0, 0.05);
    }
    .chat-panel-input[data-if-focused='true'] {
      box-shadow:
        var(--border-shadow),
        0px 0px 0px 3px transparent,
        0px 4px 6px rgba(0, 0, 0, 0.05);
    }
    [data-theme='dark'] .chat-panel-input[data-if-focused='true'] {
      box-shadow:
        var(--border-shadow),
        0px 0px 0px 3px rgba(28, 158, 228, 0.3),
        0px 2px 3px rgba(0, 0, 0, 0.05);
    }

    .chat-panel-input {
      --input-border-width: 0.5px;
      --input-border-color: var(--affine-v2-layer-insideBorder-border);
      --border-shadow: 0px 0px 0px var(--input-border-width)
        var(--input-border-color);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 4px;
      position: relative;
      border-radius: 12px;
      padding: 8px 6px 6px 8px;
      min-height: 94px;
      box-sizing: border-box;
      transition: box-shadow 0.23s ease;
      background-color: var(--affine-v2-input-background);

      &[data-independent-mode='true'] {
        padding: 12px;
        border-radius: 16px;
      }

      .chat-selection-quote {
        padding: 4px 0px 8px 0px;
        padding-left: 15px;
        max-height: 56px;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        color: var(--affine-text-secondary-color);
        position: relative;

        div {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .chat-quote-close {
          position: absolute;
          right: 0;
          top: 0;
          cursor: pointer;
          display: none;
          width: 16px;
          height: 16px;
          border-radius: 4px;
          border: 1px solid var(--affine-border-color);
          background-color: var(--affine-white);
        }
      }

      .chat-selection-quote:hover .chat-quote-close {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .chat-selection-quote::after {
        content: '';
        width: 2px;
        height: calc(100% - 10px);
        margin-top: 5px;
        position: absolute;
        left: 0;
        top: 0;
        background: var(--affine-quote-color);
        border-radius: 18px;
      }
    }

    .chat-panel-input-actions {
      display: flex;
      gap: 8px;
      align-items: center;

      .chat-input-icon {
        cursor: pointer;
        padding: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;

        svg {
          width: 20px;
          height: 20px;
          color: ${unsafeCSSVarV2('icon/primary')};
        }

        .chat-input-icon-label {
          font-size: 14px;
          line-height: 22px;
          font-weight: 500;
          color: ${unsafeCSSVarV2('icon/primary')};
          margin: 0 4px 0 4px;
        }
      }

      .chat-input-icon:nth-child(2) {
        margin-left: auto;
      }

      .chat-input-icon:hover {
        background-color: ${unsafeCSSVarV2('layer/background/hoverOverlay')};
      }

      .chat-input-icon[data-active='true'] {
        background-color: #1e96eb14;

        svg {
          color: ${unsafeCSSVarV2('icon/activated')};
        }

        .chat-input-icon-label {
          color: ${unsafeCSSVarV2('icon/activated')};
        }
      }

      .chat-input-icon[aria-disabled='true'] {
        cursor: not-allowed;

        svg {
          color: ${unsafeCSSVarV2('icon/secondary')} !important;
        }
      }
    }

    .chat-panel-input {
      textarea {
        width: 100%;
        padding: 0;
        margin: 0;
        border: none;
        line-height: 22px;
        font-size: var(--affine-font-sm);
        font-weight: 400;
        font-family: var(--affine-font-family);
        color: var(--affine-text-primary-color);
        box-sizing: border-box;
        resize: none;
        overflow-y: scroll;
        background-color: transparent;
      }

      textarea::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 4px;
        display: block;
      }

      textarea::-webkit-scrollbar:horizontal {
        height: 8px;
      }

      textarea::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background-color: transparent;
      }

      textarea:hover::-webkit-scrollbar-thumb {
        border-radius: 16px;
        background-color: ${unsafeCSSVar('black30')};
      }

      textarea::placeholder {
        font-size: 14px;
        font-weight: 400;
        font-family: var(--affine-font-family);
        color: var(--affine-v2-text-placeholder);
      }

      textarea:focus {
        outline: none;
      }
    }

    .chat-panel-input[data-if-focused='true'] {
      --input-border-width: 1px;
      --input-border-color: var(--affine-v2-layer-insideBorder-primaryBorder);
      user-select: none;
    }

    .chat-panel-send {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 28px;
      height: 28px;
      flex-shrink: 0;
      border-radius: 50%;
      font-size: 20px;
      background: var(--affine-v2-icon-activated);
      color: var(--affine-v2-layer-pureWhite);
      border: none;
      padding: 0;
      cursor: pointer;
    }
    .chat-panel-send[aria-disabled='true'] {
      cursor: not-allowed;
      background: var(--affine-v2-button-disable);
    }
    .chat-panel-stop {
      cursor: pointer;
      width: 28px;
      height: 28px;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      font-size: 24px;
      color: var(--affine-v2-icon-activated);
      border: none;
      padding: 0;
      background: transparent;
    }
    .chat-input-footer-spacer {
      flex: 1;
    }
  `; }
        #independentMode_accessor_storage;
        get independentMode() { return this.#independentMode_accessor_storage; }
        set independentMode(value) { this.#independentMode_accessor_storage = value; }
        #host_accessor_storage;
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #workspaceId_accessor_storage;
        get workspaceId() { return this.#workspaceId_accessor_storage; }
        set workspaceId(value) { this.#workspaceId_accessor_storage = value; }
        #docId_accessor_storage;
        get docId() { return this.#docId_accessor_storage; }
        set docId(value) { this.#docId_accessor_storage = value; }
        #session_accessor_storage;
        get session() { return this.#session_accessor_storage; }
        set session(value) { this.#session_accessor_storage = value; }
        #isContextProcessing_accessor_storage;
        get isContextProcessing() { return this.#isContextProcessing_accessor_storage; }
        set isContextProcessing(value) { this.#isContextProcessing_accessor_storage = value; }
        #imagePreviewGrid_accessor_storage;
        get imagePreviewGrid() { return this.#imagePreviewGrid_accessor_storage; }
        set imagePreviewGrid(value) { this.#imagePreviewGrid_accessor_storage = value; }
        #textarea_accessor_storage;
        get textarea() { return this.#textarea_accessor_storage; }
        set textarea(value) { this.#textarea_accessor_storage = value; }
        #isInputEmpty_accessor_storage;
        get isInputEmpty() { return this.#isInputEmpty_accessor_storage; }
        set isInputEmpty(value) { this.#isInputEmpty_accessor_storage = value; }
        #focused_accessor_storage;
        get focused() { return this.#focused_accessor_storage; }
        set focused(value) { this.#focused_accessor_storage = value; }
        #chatContextValue_accessor_storage;
        get chatContextValue() { return this.#chatContextValue_accessor_storage; }
        set chatContextValue(value) { this.#chatContextValue_accessor_storage = value; }
        #chips_accessor_storage;
        get chips() { return this.#chips_accessor_storage; }
        set chips(value) { this.#chips_accessor_storage = value; }
        #createSession_accessor_storage;
        get createSession() { return this.#createSession_accessor_storage; }
        set createSession(value) { this.#createSession_accessor_storage = value; }
        #updateContext_accessor_storage;
        get updateContext() { return this.#updateContext_accessor_storage; }
        set updateContext(value) { this.#updateContext_accessor_storage = value; }
        #addImages_accessor_storage;
        get addImages() { return this.#addImages_accessor_storage; }
        set addImages(value) { this.#addImages_accessor_storage = value; }
        #addChip_accessor_storage;
        get addChip() { return this.#addChip_accessor_storage; }
        set addChip(value) { this.#addChip_accessor_storage = value; }
        #networkSearchConfig_accessor_storage;
        get networkSearchConfig() { return this.#networkSearchConfig_accessor_storage; }
        set networkSearchConfig(value) { this.#networkSearchConfig_accessor_storage = value; }
        #reasoningConfig_accessor_storage;
        get reasoningConfig() { return this.#reasoningConfig_accessor_storage; }
        set reasoningConfig(value) { this.#reasoningConfig_accessor_storage = value; }
        #docDisplayConfig_accessor_storage;
        get docDisplayConfig() { return this.#docDisplayConfig_accessor_storage; }
        set docDisplayConfig(value) { this.#docDisplayConfig_accessor_storage = value; }
        #searchMenuConfig_accessor_storage;
        get searchMenuConfig() { return this.#searchMenuConfig_accessor_storage; }
        set searchMenuConfig(value) { this.#searchMenuConfig_accessor_storage = value; }
        #serverService_accessor_storage;
        get serverService() { return this.#serverService_accessor_storage; }
        set serverService(value) { this.#serverService_accessor_storage = value; }
        #aiDraftService_accessor_storage;
        get aiDraftService() { return this.#aiDraftService_accessor_storage; }
        set aiDraftService(value) { this.#aiDraftService_accessor_storage = value; }
        #aiToolsConfigService_accessor_storage;
        get aiToolsConfigService() { return this.#aiToolsConfigService_accessor_storage; }
        set aiToolsConfigService(value) { this.#aiToolsConfigService_accessor_storage = value; }
        #affineFeatureFlagService_accessor_storage;
        get affineFeatureFlagService() { return this.#affineFeatureFlagService_accessor_storage; }
        set affineFeatureFlagService(value) { this.#affineFeatureFlagService_accessor_storage = value; }
        #notificationService_accessor_storage;
        get notificationService() { return this.#notificationService_accessor_storage; }
        set notificationService(value) { this.#notificationService_accessor_storage = value; }
        #subscriptionService_accessor_storage;
        get subscriptionService() { return this.#subscriptionService_accessor_storage; }
        set subscriptionService(value) { this.#subscriptionService_accessor_storage = value; }
        #aiModelService_accessor_storage;
        get aiModelService() { return this.#aiModelService_accessor_storage; }
        set aiModelService(value) { this.#aiModelService_accessor_storage = value; }
        #onAISubscribe_accessor_storage;
        get onAISubscribe() { return this.#onAISubscribe_accessor_storage; }
        set onAISubscribe(value) { this.#onAISubscribe_accessor_storage = value; }
        #isRootSession_accessor_storage;
        get isRootSession() { return this.#isRootSession_accessor_storage; }
        set isRootSession(value) { this.#isRootSession_accessor_storage = value; }
        #onChatSuccess_accessor_storage;
        get onChatSuccess() { return this.#onChatSuccess_accessor_storage; }
        set onChatSuccess(value) { this.#onChatSuccess_accessor_storage = value; }
        #trackOptions_accessor_storage;
        get trackOptions() { return this.#trackOptions_accessor_storage; }
        set trackOptions(value) { this.#trackOptions_accessor_storage = value; }
        #testId_accessor_storage;
        get testId() { return this.#testId_accessor_storage; }
        set testId(value) { this.#testId_accessor_storage = value; }
        #portalContainer_accessor_storage;
        get portalContainer() { return this.#portalContainer_accessor_storage; }
        set portalContainer(value) { this.#portalContainer_accessor_storage = value; }
        get _isNetworkActive() {
            return (!!this.networkSearchConfig.visible.value &&
                !!this.networkSearchConfig.enabled.value);
        }
        get _isReasoningActive() {
            return !!this.reasoningConfig.enabled.value;
        }
        connectedCallback() {
            super.connectedCallback();
            this._disposables.add(AIProvider.slots.requestSendWithChat.subscribe((params) => {
                if (!params) {
                    return;
                }
                const { input, context, host } = params;
                if (this.host === host) {
                    if (context) {
                        this.updateContext(context);
                    }
                    setTimeout(() => {
                        this.send(input).catch(console.error);
                    }, 0);
                }
                AIProvider.slots.requestSendWithChat.next(null);
            }));
            this._disposables.add(AIProvider.slots.requestOpenWithChat.subscribe(params => {
                if (!params)
                    return;
                const { input, host } = params;
                if (this.host !== host)
                    return;
                if (input) {
                    this.textarea.value = input;
                    this.isInputEmpty = !this.textarea.value.trim();
                }
            }));
        }
        firstUpdated(changedProperties) {
            super.firstUpdated(changedProperties);
            if (this.aiDraftService) {
                this.aiDraftService
                    .getDraft()
                    .then(draft => {
                    this.textarea.value = draft.input;
                    this.isInputEmpty = !this.textarea.value.trim();
                })
                    .catch(console.error);
            }
        }
        render() {
            const { images, status } = this.chatContextValue;
            const hasImages = images.length > 0;
            const maxHeight = hasImages ? 272 + 2 : 200 + 2;
            return html `<div
      class="chat-panel-input"
      data-independent-mode=${this.independentMode}
      data-if-focused=${this.focused}
      style=${styleMap({
                maxHeight: `${maxHeight}px !important`,
            })}
      @pointerdown=${this._handlePointerDown}
    >
      ${hasImages
                ? html `
            <image-preview-grid
              .images=${images}
              .onImageRemove=${this._handleImageRemove}
            ></image-preview-grid>
          `
                : nothing}
      ${this.chatContextValue.quote
                ? html `<div
            class="chat-selection-quote"
            data-testid="chat-selection-quote"
          >
            ${repeat(getFirstTwoLines(this.chatContextValue.quote), line => line, line => html `<div>${line}</div>`)}
            <div
              class="chat-quote-close"
              @click=${() => {
                    this.updateContext({ quote: '', markdown: '' });
                }}
            >
              ${CloseIcon()}
            </div>
          </div>`
                : nothing}
      <textarea
        rows="1"
        placeholder="What are your thoughts?"
        @input=${this._handleInput}
        @keydown=${this._handleKeyDown}
        @focus=${() => {
                this.focused = true;
            }}
        @blur=${() => {
                this.focused = false;
            }}
        @paste=${this._handlePaste}
        data-testid="chat-panel-input"
      ></textarea>
      <div class="chat-panel-input-actions">
        <div class="chat-input-icon">
          <ai-chat-add-context
            .docId=${this.docId}
            .independentMode=${this.independentMode}
            .addChip=${this.addChip}
            .addImages=${this.addImages}
            .docDisplayConfig=${this.docDisplayConfig}
            .searchMenuConfig=${this.searchMenuConfig}
            .portalContainer=${this.portalContainer}
          ></ai-chat-add-context>
        </div>
        <div class="chat-input-footer-spacer"></div>
        <chat-input-preference
          .session=${this.session}
          .extendedThinking=${this._isReasoningActive}
          .onExtendedThinkingChange=${this._toggleReasoning}
          .networkSearchVisible=${!!this.networkSearchConfig.visible.value}
          .isNetworkActive=${this._isNetworkActive}
          .onNetworkActiveChange=${this._toggleNetworkSearch}
          .serverService=${this.serverService}
          .toolsConfigService=${this.aiToolsConfigService}
          .notificationService=${this.notificationService}
          .subscriptionService=${this.subscriptionService}
          .aiModelService=${this.aiModelService}
          .onAISubscribe=${this.onAISubscribe}
        ></chat-input-preference>
        ${status === 'transmitting' || status === 'loading'
                ? html `<button
              class="chat-panel-stop"
              @click=${this._handleAbort}
              data-testid="chat-panel-stop"
            >
              ${ChatAbortIcon}
            </button>`
                : html `<button
              @click="${this._onTextareaSend}"
              class="chat-panel-send"
              aria-disabled=${this.isSendDisabled}
              data-testid="chat-panel-send"
            >
              ${ArrowUpBigIcon()}
            </button>`}
      </div>
    </div>`;
        }
        get isSendDisabled() {
            if (this.isInputEmpty) {
                return true;
            }
            if (this.isContextProcessing) {
                return true;
            }
            return false;
        }
        async _getMatchedContexts() {
            const docContexts = new Map();
            this.chips.forEach(chip => {
                if (isDocChip(chip) && !!chip.markdown?.value) {
                    docContexts.set(chip.docId, {
                        docId: chip.docId,
                        docContent: chip.markdown.value,
                    });
                }
            });
            const docs = Array.from(docContexts.values()).map(doc => {
                const docMeta = this.docDisplayConfig.getDocMeta(doc.docId);
                const docTitle = this.docDisplayConfig.getTitle(doc.docId);
                const tags = docMeta?.tags
                    ? docMeta.tags
                        .map(tagId => this.docDisplayConfig.getTagTitle(tagId))
                        .join(',')
                    : '';
                return {
                    docId: doc.docId,
                    docContent: doc.docContent,
                    docTitle,
                    tags,
                    createDate: docMeta?.createDate
                        ? new Date(docMeta.createDate).toISOString()
                        : '',
                    updatedDate: docMeta?.updatedDate
                        ? new Date(docMeta.updatedDate).toISOString()
                        : '',
                };
            });
            return { docs, files: [] };
        }
    };
})();
export { AIChatInput };
//# sourceMappingURL=ai-chat-input.js.map