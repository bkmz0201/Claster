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
import './ai-chat-composer-tip';
import { SignalWatcher, WithDisposable } from '@blocksuite/affine/global/lit';
import { ShadowlessElement } from '@blocksuite/affine/std';
import { uuidv4 } from '@blocksuite/affine/store';
import { css, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { AIProvider, } from '../../provider';
import { findChipIndex, isAttachmentChip, isCollectionChip, isDocChip, isFileChip, isSelectedContextChip, isTagChip, omitChip, } from '../ai-chat-chips';
import { MAX_IMAGE_COUNT } from '../ai-chat-input/const';
export const EMBEDDING_STATUS_CHECK_INTERVAL = 10000;
let AIChatComposer = (() => {
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
    let _createSession_decorators;
    let _createSession_initializers = [];
    let _createSession_extraInitializers = [];
    let _chatContextValue_decorators;
    let _chatContextValue_initializers = [];
    let _chatContextValue_extraInitializers = [];
    let _updateContext_decorators;
    let _updateContext_initializers = [];
    let _updateContext_extraInitializers = [];
    let _onEmbeddingProgressChange_decorators;
    let _onEmbeddingProgressChange_initializers = [];
    let _onEmbeddingProgressChange_extraInitializers = [];
    let _docDisplayConfig_decorators;
    let _docDisplayConfig_initializers = [];
    let _docDisplayConfig_extraInitializers = [];
    let _networkSearchConfig_decorators;
    let _networkSearchConfig_initializers = [];
    let _networkSearchConfig_extraInitializers = [];
    let _reasoningConfig_decorators;
    let _reasoningConfig_initializers = [];
    let _reasoningConfig_extraInitializers = [];
    let _searchMenuConfig_decorators;
    let _searchMenuConfig_initializers = [];
    let _searchMenuConfig_extraInitializers = [];
    let _onChatSuccess_decorators;
    let _onChatSuccess_initializers = [];
    let _onChatSuccess_extraInitializers = [];
    let _trackOptions_decorators;
    let _trackOptions_initializers = [];
    let _trackOptions_extraInitializers = [];
    let _portalContainer_decorators;
    let _portalContainer_initializers = [];
    let _portalContainer_extraInitializers = [];
    let _serverService_decorators;
    let _serverService_initializers = [];
    let _serverService_extraInitializers = [];
    let _affineWorkspaceDialogService_decorators;
    let _affineWorkspaceDialogService_initializers = [];
    let _affineWorkspaceDialogService_extraInitializers = [];
    let _notificationService_decorators;
    let _notificationService_initializers = [];
    let _notificationService_extraInitializers = [];
    let _aiDraftService_decorators;
    let _aiDraftService_initializers = [];
    let _aiDraftService_extraInitializers = [];
    let _aiToolsConfigService_decorators;
    let _aiToolsConfigService_initializers = [];
    let _aiToolsConfigService_extraInitializers = [];
    let _affineFeatureFlagService_decorators;
    let _affineFeatureFlagService_initializers = [];
    let _affineFeatureFlagService_extraInitializers = [];
    let _subscriptionService_decorators;
    let _subscriptionService_initializers = [];
    let _subscriptionService_extraInitializers = [];
    let _aiModelService_decorators;
    let _aiModelService_initializers = [];
    let _aiModelService_extraInitializers = [];
    let _onAISubscribe_decorators;
    let _onAISubscribe_initializers = [];
    let _onAISubscribe_extraInitializers = [];
    let _chips_decorators;
    let _chips_initializers = [];
    let _chips_extraInitializers = [];
    let _isChipsCollapsed_decorators;
    let _isChipsCollapsed_initializers = [];
    let _isChipsCollapsed_extraInitializers = [];
    let _embeddingCompleted_decorators;
    let _embeddingCompleted_initializers = [];
    let _embeddingCompleted_extraInitializers = [];
    return class AIChatComposer extends _classSuper {
        constructor() {
            super(...arguments);
            this.#independentMode_accessor_storage = __runInitializers(this, _independentMode_initializers, void 0);
            this.#host_accessor_storage = (__runInitializers(this, _independentMode_extraInitializers), __runInitializers(this, _host_initializers, void 0));
            this.#workspaceId_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _workspaceId_initializers, void 0));
            this.#docId_accessor_storage = (__runInitializers(this, _workspaceId_extraInitializers), __runInitializers(this, _docId_initializers, void 0));
            this.#session_accessor_storage = (__runInitializers(this, _docId_extraInitializers), __runInitializers(this, _session_initializers, void 0));
            this.#createSession_accessor_storage = (__runInitializers(this, _session_extraInitializers), __runInitializers(this, _createSession_initializers, void 0));
            this.#chatContextValue_accessor_storage = (__runInitializers(this, _createSession_extraInitializers), __runInitializers(this, _chatContextValue_initializers, void 0));
            this.#updateContext_accessor_storage = (__runInitializers(this, _chatContextValue_extraInitializers), __runInitializers(this, _updateContext_initializers, void 0));
            this.#onEmbeddingProgressChange_accessor_storage = (__runInitializers(this, _updateContext_extraInitializers), __runInitializers(this, _onEmbeddingProgressChange_initializers, void 0));
            this.#docDisplayConfig_accessor_storage = (__runInitializers(this, _onEmbeddingProgressChange_extraInitializers), __runInitializers(this, _docDisplayConfig_initializers, void 0));
            this.#networkSearchConfig_accessor_storage = (__runInitializers(this, _docDisplayConfig_extraInitializers), __runInitializers(this, _networkSearchConfig_initializers, void 0));
            this.#reasoningConfig_accessor_storage = (__runInitializers(this, _networkSearchConfig_extraInitializers), __runInitializers(this, _reasoningConfig_initializers, void 0));
            this.#searchMenuConfig_accessor_storage = (__runInitializers(this, _reasoningConfig_extraInitializers), __runInitializers(this, _searchMenuConfig_initializers, void 0));
            this.#onChatSuccess_accessor_storage = (__runInitializers(this, _searchMenuConfig_extraInitializers), __runInitializers(this, _onChatSuccess_initializers, void 0));
            this.#trackOptions_accessor_storage = (__runInitializers(this, _onChatSuccess_extraInitializers), __runInitializers(this, _trackOptions_initializers, void 0));
            this.#portalContainer_accessor_storage = (__runInitializers(this, _trackOptions_extraInitializers), __runInitializers(this, _portalContainer_initializers, null));
            this.#serverService_accessor_storage = (__runInitializers(this, _portalContainer_extraInitializers), __runInitializers(this, _serverService_initializers, void 0));
            this.#affineWorkspaceDialogService_accessor_storage = (__runInitializers(this, _serverService_extraInitializers), __runInitializers(this, _affineWorkspaceDialogService_initializers, void 0));
            this.#notificationService_accessor_storage = (__runInitializers(this, _affineWorkspaceDialogService_extraInitializers), __runInitializers(this, _notificationService_initializers, void 0));
            this.#aiDraftService_accessor_storage = (__runInitializers(this, _notificationService_extraInitializers), __runInitializers(this, _aiDraftService_initializers, void 0));
            this.#aiToolsConfigService_accessor_storage = (__runInitializers(this, _aiDraftService_extraInitializers), __runInitializers(this, _aiToolsConfigService_initializers, void 0));
            this.#affineFeatureFlagService_accessor_storage = (__runInitializers(this, _aiToolsConfigService_extraInitializers), __runInitializers(this, _affineFeatureFlagService_initializers, void 0));
            this.#subscriptionService_accessor_storage = (__runInitializers(this, _affineFeatureFlagService_extraInitializers), __runInitializers(this, _subscriptionService_initializers, void 0));
            this.#aiModelService_accessor_storage = (__runInitializers(this, _subscriptionService_extraInitializers), __runInitializers(this, _aiModelService_initializers, void 0));
            this.#onAISubscribe_accessor_storage = (__runInitializers(this, _aiModelService_extraInitializers), __runInitializers(this, _onAISubscribe_initializers, void 0));
            this.#chips_accessor_storage = (__runInitializers(this, _onAISubscribe_extraInitializers), __runInitializers(this, _chips_initializers, []));
            this.#isChipsCollapsed_accessor_storage = (__runInitializers(this, _chips_extraInitializers), __runInitializers(this, _isChipsCollapsed_initializers, false));
            this.#embeddingCompleted_accessor_storage = (__runInitializers(this, _isChipsCollapsed_extraInitializers), __runInitializers(this, _embeddingCompleted_initializers, false));
            this._contextId = (__runInitializers(this, _embeddingCompleted_extraInitializers), undefined);
            this._pollAbortController = null;
            this._pollEmbeddingStatusAbortController = null;
            this.beforeChatContextSend = (params) => {
                if (!params)
                    return;
                const { context, host } = params;
                if (this.host !== host || !context)
                    return;
                if (context) {
                    this.updateContext(context);
                }
                if (context.docs ||
                    context.attachments ||
                    context.snapshot ||
                    context.combinedElementsMarkdown ||
                    context.html) {
                    // Wait for context value updated next frame
                    setTimeout(() => {
                        this.addSelectedContextChip().catch(console.error);
                    }, 0);
                }
            };
            this._getContextId = async () => {
                if (this._contextId) {
                    return this._contextId;
                }
                const sessionId = this.session?.sessionId;
                if (!sessionId)
                    return;
                const contextId = await AIProvider.context?.getContextId(this.workspaceId, sessionId);
                this._contextId = contextId;
                return this._contextId;
            };
            this.createContextId = async () => {
                if (this._contextId) {
                    return this._contextId;
                }
                const sessionId = (await this.createSession())?.sessionId;
                if (!sessionId)
                    return;
                this._contextId = await AIProvider.context?.createContext(this.workspaceId, sessionId);
                return this._contextId;
            };
            this.initChips = async () => {
                // context not initialized
                const sessionId = this.session?.sessionId;
                const contextId = await this._getContextId();
                if (!sessionId || !contextId) {
                    return;
                }
                // context initialized, show the chips
                const { docs = [], files = [], tags = [], collections = [], } = (await AIProvider.context?.getContextDocsAndFiles(this.workspaceId, sessionId, contextId)) || {};
                const docChips = docs.map(doc => ({
                    docId: doc.id,
                    state: doc.status || 'processing',
                    createdAt: doc.createdAt,
                }));
                const fileChips = await Promise.all(files.map(async (file) => {
                    return {
                        file: new File([], file.name),
                        blobId: file.blobId,
                        fileId: file.id,
                        state: file.status,
                        tooltip: file.error,
                        createdAt: file.createdAt,
                    };
                }));
                const tagChips = tags.map(tag => ({
                    tagId: tag.id,
                    state: 'finished',
                    createdAt: tag.createdAt,
                }));
                const collectionChips = collections.map(collection => ({
                    collectionId: collection.id,
                    state: 'finished',
                    createdAt: collection.createdAt,
                }));
                const chips = [
                    ...docChips,
                    ...fileChips,
                    ...tagChips,
                    ...collectionChips,
                ].sort((a, b) => {
                    const aTime = a.createdAt ?? Date.now();
                    const bTime = b.createdAt ?? Date.now();
                    return aTime - bTime;
                });
                this.updateChips(chips);
            };
            this.updateChips = (chips) => {
                this.chips = chips;
            };
            this.updateChip = (chip, options) => {
                const index = findChipIndex(this.chips, chip);
                if (index === -1) {
                    return;
                }
                const nextChip = {
                    ...chip,
                    ...options,
                };
                this.updateChips([
                    ...this.chips.slice(0, index),
                    nextChip,
                    ...this.chips.slice(index + 1),
                ]);
            };
            this.addChip = async (chip, silent = false) => {
                this.isChipsCollapsed = false;
                // if already exists
                const index = findChipIndex(this.chips, chip);
                if (index !== -1) {
                    if (!silent) {
                        this.notificationService.toast('chip already exists');
                    }
                    return;
                }
                this.updateChips([...this.chips, chip]);
                await this.addToContext(chip);
                await this.pollContextDocsAndFiles();
            };
            this.removeChip = async (chip) => {
                const chips = omitChip(this.chips, chip);
                this.updateChips(chips);
                await this.removeFromContext(chip);
            };
            this.addSelectedContextChip = async () => {
                const { attachments = [], snapshot, combinedElementsMarkdown, docs = [], html, } = this.chatContextValue;
                await this.removeSelectedContextChip();
                const chip = {
                    uuid: uuidv4(),
                    snapshot,
                    combinedElementsMarkdown,
                    html,
                    state: 'finished',
                };
                await Promise.all([
                    this.addChip(chip, true),
                    ...docs.map(docId => this.addChip({
                        docId,
                        state: 'processing',
                    }, true)),
                    ...attachments.map(attachment => this.addChip({
                        sourceId: attachment.sourceId,
                        name: attachment.name,
                        state: 'processing',
                    }, true)),
                ]);
            };
            this.removeSelectedContextChip = async () => {
                const selectedContextChip = this.chips.find(c => isSelectedContextChip(c));
                if (selectedContextChip) {
                    await this.removeChip(selectedContextChip);
                }
            };
            this.addToContext = async (chip) => {
                if (isDocChip(chip)) {
                    return await this.addDocToContext(chip);
                }
                if (isFileChip(chip)) {
                    return await this.addFileToContext(chip);
                }
                if (isTagChip(chip)) {
                    return await this.addTagToContext(chip);
                }
                if (isCollectionChip(chip)) {
                    return await this.addCollectionToContext(chip);
                }
                if (isAttachmentChip(chip)) {
                    return await this.addAttachmentChipToContext(chip);
                }
                return null;
            };
            this.addDocToContext = async (chip) => {
                try {
                    const contextId = await this.createContextId();
                    if (!contextId || !AIProvider.context) {
                        throw new Error('Context not found');
                    }
                    await AIProvider.context.addContextDoc({
                        contextId,
                        docId: chip.docId,
                    });
                }
                catch (e) {
                    this.updateChip(chip, {
                        state: 'failed',
                        tooltip: e instanceof Error ? e.message : 'Add context doc error',
                    });
                }
            };
            this.addFileToContext = async (chip) => {
                try {
                    const contextId = await this.createContextId();
                    if (!contextId || !AIProvider.context) {
                        throw new Error('Context not found');
                    }
                    const contextFile = await AIProvider.context.addContextFile(chip.file, {
                        contextId,
                    });
                    this.updateChip(chip, {
                        state: contextFile.status,
                        blobId: contextFile.blobId,
                        fileId: contextFile.id,
                    });
                }
                catch (e) {
                    this.updateChip(chip, {
                        state: 'failed',
                        tooltip: e instanceof Error ? e.message : 'Add context file error',
                    });
                }
            };
            this.addTagToContext = async (chip) => {
                try {
                    const contextId = await this.createContextId();
                    if (!contextId || !AIProvider.context) {
                        throw new Error('Context not found');
                    }
                    // TODO: server side docIds calculation
                    const docIds = this.docDisplayConfig.getTagPageIds(chip.tagId);
                    await AIProvider.context.addContextTag({
                        contextId,
                        tagId: chip.tagId,
                        docIds,
                    });
                    this.updateChip(chip, {
                        state: 'finished',
                    });
                }
                catch (e) {
                    this.updateChip(chip, {
                        state: 'failed',
                        tooltip: e instanceof Error ? e.message : 'Add context tag error',
                    });
                }
            };
            this.addCollectionToContext = async (chip) => {
                try {
                    const contextId = await this.createContextId();
                    if (!contextId || !AIProvider.context) {
                        throw new Error('Context not found');
                    }
                    // TODO: server side docIds calculation
                    const docIds = this.docDisplayConfig.getCollectionPageIds(chip.collectionId);
                    await AIProvider.context.addContextCollection({
                        contextId,
                        collectionId: chip.collectionId,
                        docIds,
                    });
                    this.updateChip(chip, {
                        state: 'finished',
                    });
                }
                catch (e) {
                    this.updateChip(chip, {
                        state: 'failed',
                        tooltip: e instanceof Error ? e.message : 'Add context collection error',
                    });
                }
            };
            this.addAttachmentChipToContext = async (chip) => {
                const contextId = await this.createContextId();
                if (!contextId || !AIProvider.context) {
                    throw new Error('Context not found');
                }
                try {
                    const contextBlob = await AIProvider.context.addContextBlob({
                        blobId: chip.sourceId,
                        contextId,
                    });
                    this.updateChip(chip, {
                        state: contextBlob.status || 'processing',
                        blobId: chip.sourceId,
                    });
                }
                catch (e) {
                    this.updateChip(chip, {
                        state: 'failed',
                        tooltip: e instanceof Error ? e.message : 'Add context attachment error',
                    });
                }
            };
            this.removeFromContext = async (chip) => {
                try {
                    const contextId = await this.createContextId();
                    if (!contextId || !AIProvider.context) {
                        return true;
                    }
                    if (isDocChip(chip)) {
                        return await AIProvider.context.removeContextDoc({
                            contextId,
                            docId: chip.docId,
                        });
                    }
                    if (isFileChip(chip) && chip.fileId) {
                        return await AIProvider.context.removeContextFile({
                            contextId,
                            fileId: chip.fileId,
                        });
                    }
                    if (isTagChip(chip)) {
                        return await AIProvider.context.removeContextTag({
                            contextId,
                            tagId: chip.tagId,
                        });
                    }
                    if (isCollectionChip(chip)) {
                        return await AIProvider.context.removeContextCollection({
                            contextId,
                            collectionId: chip.collectionId,
                        });
                    }
                    if (isAttachmentChip(chip)) {
                        return await AIProvider.context.removeContextBlob({
                            contextId,
                            blobId: chip.sourceId,
                        });
                    }
                    if (isSelectedContextChip(chip)) {
                        this.updateContext({
                            ...this.chatContextValue,
                            snapshot: null,
                            combinedElementsMarkdown: null,
                        });
                    }
                    return true;
                }
                catch {
                    return true;
                }
            };
            this.toggleChipsCollapse = () => {
                this.isChipsCollapsed = !this.isChipsCollapsed;
            };
            this.addImages = (images) => {
                const oldImages = this.chatContextValue.images;
                if (oldImages.length + images.length > MAX_IMAGE_COUNT) {
                    this.notificationService.toast(`You can only upload up to ${MAX_IMAGE_COUNT} images`);
                }
                this.updateContext({
                    images: [...oldImages, ...images].slice(0, MAX_IMAGE_COUNT),
                });
            };
            this.pollContextDocsAndFiles = async () => {
                const sessionId = this.session?.sessionId;
                const contextId = await this._getContextId();
                if (!sessionId || !contextId || !AIProvider.context) {
                    return;
                }
                if (this._pollAbortController) {
                    // already polling, reset timer
                    this._abortPoll();
                }
                this._pollAbortController = new AbortController();
                await AIProvider.context.pollContextDocsAndFiles(this.workspaceId, sessionId, contextId, this._onPoll, this._pollAbortController.signal);
            };
            this.pollEmbeddingStatus = async () => {
                if (this._pollEmbeddingStatusAbortController) {
                    this._pollEmbeddingStatusAbortController.abort();
                }
                this._pollEmbeddingStatusAbortController = new AbortController();
                const signal = this._pollEmbeddingStatusAbortController.signal;
                try {
                    await AIProvider.context?.pollEmbeddingStatus(this.workspaceId, (status) => {
                        if (!status) {
                            this.embeddingCompleted = false;
                            return;
                        }
                        const prevCompleted = this.embeddingCompleted;
                        const completed = status.embedded === status.total;
                        this.embeddingCompleted = completed;
                        if (prevCompleted !== completed) {
                            this.requestUpdate();
                        }
                    }, signal);
                }
                catch {
                    this.embeddingCompleted = false;
                }
            };
            this._onPoll = (result) => {
                if (!result) {
                    this._abortPoll();
                    return;
                }
                const { docs: sDocs = [], files = [], tags = [], collections = [], blobs = [], } = result;
                const docs = [
                    ...sDocs,
                    ...tags.flatMap(tag => tag.docs),
                    ...collections.flatMap(collection => collection.docs),
                ];
                const hashMap = new Map();
                const count = {
                    finished: 0,
                    processing: 0,
                    failed: 0,
                };
                docs.forEach(doc => {
                    hashMap.set(doc.id, doc);
                    doc.status && count[doc.status]++;
                });
                files.forEach(file => {
                    hashMap.set(file.id, file);
                    file.status && count[file.status]++;
                });
                blobs.forEach(blob => {
                    hashMap.set(blob.id, blob);
                    blob.status && count[blob.status]++;
                });
                const nextChips = this.chips.map(chip => {
                    if (isTagChip(chip) || isCollectionChip(chip)) {
                        return chip;
                    }
                    const id = isDocChip(chip)
                        ? chip.docId
                        : isFileChip(chip)
                            ? chip.fileId
                            : isAttachmentChip(chip)
                                ? chip.sourceId
                                : isSelectedContextChip(chip)
                                    ? chip.uuid
                                    : undefined;
                    const item = id && hashMap.get(id);
                    if (item && item.status) {
                        return {
                            ...chip,
                            state: item.status,
                            tooltip: 'error' in item ? item.error : undefined,
                        };
                    }
                    return chip;
                });
                this.updateChips(nextChips);
                this.onEmbeddingProgressChange?.(count);
                if (count.processing === 0) {
                    this._abortPoll();
                }
            };
            this._abortPoll = () => {
                this._pollAbortController?.abort();
                this._pollAbortController = null;
            };
            this._abortPollEmbeddingStatus = () => {
                this._pollEmbeddingStatusAbortController?.abort();
                this._pollEmbeddingStatusAbortController = null;
            };
            this.initComposer = async () => {
                const userId = (await AIProvider.userInfo)?.id;
                if (!userId || !this.session)
                    return;
                await this.initChips();
                const needPoll = this.chips.some(chip => chip.state === 'processing' || isTagChip(chip) || isCollectionChip(chip));
                if (needPoll) {
                    await this.pollContextDocsAndFiles();
                }
                await this.pollEmbeddingStatus();
            };
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _independentMode_decorators = [property({ attribute: false })];
            _host_decorators = [property({ attribute: false })];
            _workspaceId_decorators = [property({ attribute: false })];
            _docId_decorators = [property({ attribute: false })];
            _session_decorators = [property({ attribute: false })];
            _createSession_decorators = [property({ attribute: false })];
            _chatContextValue_decorators = [property({ attribute: false })];
            _updateContext_decorators = [property({ attribute: false })];
            _onEmbeddingProgressChange_decorators = [property({ attribute: false })];
            _docDisplayConfig_decorators = [property({ attribute: false })];
            _networkSearchConfig_decorators = [property({ attribute: false })];
            _reasoningConfig_decorators = [property({ attribute: false })];
            _searchMenuConfig_decorators = [property({ attribute: false })];
            _onChatSuccess_decorators = [property({ attribute: false })];
            _trackOptions_decorators = [property({ attribute: false })];
            _portalContainer_decorators = [property({ attribute: false })];
            _serverService_decorators = [property({ attribute: false })];
            _affineWorkspaceDialogService_decorators = [property({ attribute: false })];
            _notificationService_decorators = [property({ attribute: false })];
            _aiDraftService_decorators = [property({ attribute: false })];
            _aiToolsConfigService_decorators = [property({ attribute: false })];
            _affineFeatureFlagService_decorators = [property({ attribute: false })];
            _subscriptionService_decorators = [property({ attribute: false })];
            _aiModelService_decorators = [property({ attribute: false })];
            _onAISubscribe_decorators = [property({ attribute: false })];
            _chips_decorators = [state()];
            _isChipsCollapsed_decorators = [state()];
            _embeddingCompleted_decorators = [state()];
            __esDecorate(this, null, _independentMode_decorators, { kind: "accessor", name: "independentMode", static: false, private: false, access: { has: obj => "independentMode" in obj, get: obj => obj.independentMode, set: (obj, value) => { obj.independentMode = value; } }, metadata: _metadata }, _independentMode_initializers, _independentMode_extraInitializers);
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _workspaceId_decorators, { kind: "accessor", name: "workspaceId", static: false, private: false, access: { has: obj => "workspaceId" in obj, get: obj => obj.workspaceId, set: (obj, value) => { obj.workspaceId = value; } }, metadata: _metadata }, _workspaceId_initializers, _workspaceId_extraInitializers);
            __esDecorate(this, null, _docId_decorators, { kind: "accessor", name: "docId", static: false, private: false, access: { has: obj => "docId" in obj, get: obj => obj.docId, set: (obj, value) => { obj.docId = value; } }, metadata: _metadata }, _docId_initializers, _docId_extraInitializers);
            __esDecorate(this, null, _session_decorators, { kind: "accessor", name: "session", static: false, private: false, access: { has: obj => "session" in obj, get: obj => obj.session, set: (obj, value) => { obj.session = value; } }, metadata: _metadata }, _session_initializers, _session_extraInitializers);
            __esDecorate(this, null, _createSession_decorators, { kind: "accessor", name: "createSession", static: false, private: false, access: { has: obj => "createSession" in obj, get: obj => obj.createSession, set: (obj, value) => { obj.createSession = value; } }, metadata: _metadata }, _createSession_initializers, _createSession_extraInitializers);
            __esDecorate(this, null, _chatContextValue_decorators, { kind: "accessor", name: "chatContextValue", static: false, private: false, access: { has: obj => "chatContextValue" in obj, get: obj => obj.chatContextValue, set: (obj, value) => { obj.chatContextValue = value; } }, metadata: _metadata }, _chatContextValue_initializers, _chatContextValue_extraInitializers);
            __esDecorate(this, null, _updateContext_decorators, { kind: "accessor", name: "updateContext", static: false, private: false, access: { has: obj => "updateContext" in obj, get: obj => obj.updateContext, set: (obj, value) => { obj.updateContext = value; } }, metadata: _metadata }, _updateContext_initializers, _updateContext_extraInitializers);
            __esDecorate(this, null, _onEmbeddingProgressChange_decorators, { kind: "accessor", name: "onEmbeddingProgressChange", static: false, private: false, access: { has: obj => "onEmbeddingProgressChange" in obj, get: obj => obj.onEmbeddingProgressChange, set: (obj, value) => { obj.onEmbeddingProgressChange = value; } }, metadata: _metadata }, _onEmbeddingProgressChange_initializers, _onEmbeddingProgressChange_extraInitializers);
            __esDecorate(this, null, _docDisplayConfig_decorators, { kind: "accessor", name: "docDisplayConfig", static: false, private: false, access: { has: obj => "docDisplayConfig" in obj, get: obj => obj.docDisplayConfig, set: (obj, value) => { obj.docDisplayConfig = value; } }, metadata: _metadata }, _docDisplayConfig_initializers, _docDisplayConfig_extraInitializers);
            __esDecorate(this, null, _networkSearchConfig_decorators, { kind: "accessor", name: "networkSearchConfig", static: false, private: false, access: { has: obj => "networkSearchConfig" in obj, get: obj => obj.networkSearchConfig, set: (obj, value) => { obj.networkSearchConfig = value; } }, metadata: _metadata }, _networkSearchConfig_initializers, _networkSearchConfig_extraInitializers);
            __esDecorate(this, null, _reasoningConfig_decorators, { kind: "accessor", name: "reasoningConfig", static: false, private: false, access: { has: obj => "reasoningConfig" in obj, get: obj => obj.reasoningConfig, set: (obj, value) => { obj.reasoningConfig = value; } }, metadata: _metadata }, _reasoningConfig_initializers, _reasoningConfig_extraInitializers);
            __esDecorate(this, null, _searchMenuConfig_decorators, { kind: "accessor", name: "searchMenuConfig", static: false, private: false, access: { has: obj => "searchMenuConfig" in obj, get: obj => obj.searchMenuConfig, set: (obj, value) => { obj.searchMenuConfig = value; } }, metadata: _metadata }, _searchMenuConfig_initializers, _searchMenuConfig_extraInitializers);
            __esDecorate(this, null, _onChatSuccess_decorators, { kind: "accessor", name: "onChatSuccess", static: false, private: false, access: { has: obj => "onChatSuccess" in obj, get: obj => obj.onChatSuccess, set: (obj, value) => { obj.onChatSuccess = value; } }, metadata: _metadata }, _onChatSuccess_initializers, _onChatSuccess_extraInitializers);
            __esDecorate(this, null, _trackOptions_decorators, { kind: "accessor", name: "trackOptions", static: false, private: false, access: { has: obj => "trackOptions" in obj, get: obj => obj.trackOptions, set: (obj, value) => { obj.trackOptions = value; } }, metadata: _metadata }, _trackOptions_initializers, _trackOptions_extraInitializers);
            __esDecorate(this, null, _portalContainer_decorators, { kind: "accessor", name: "portalContainer", static: false, private: false, access: { has: obj => "portalContainer" in obj, get: obj => obj.portalContainer, set: (obj, value) => { obj.portalContainer = value; } }, metadata: _metadata }, _portalContainer_initializers, _portalContainer_extraInitializers);
            __esDecorate(this, null, _serverService_decorators, { kind: "accessor", name: "serverService", static: false, private: false, access: { has: obj => "serverService" in obj, get: obj => obj.serverService, set: (obj, value) => { obj.serverService = value; } }, metadata: _metadata }, _serverService_initializers, _serverService_extraInitializers);
            __esDecorate(this, null, _affineWorkspaceDialogService_decorators, { kind: "accessor", name: "affineWorkspaceDialogService", static: false, private: false, access: { has: obj => "affineWorkspaceDialogService" in obj, get: obj => obj.affineWorkspaceDialogService, set: (obj, value) => { obj.affineWorkspaceDialogService = value; } }, metadata: _metadata }, _affineWorkspaceDialogService_initializers, _affineWorkspaceDialogService_extraInitializers);
            __esDecorate(this, null, _notificationService_decorators, { kind: "accessor", name: "notificationService", static: false, private: false, access: { has: obj => "notificationService" in obj, get: obj => obj.notificationService, set: (obj, value) => { obj.notificationService = value; } }, metadata: _metadata }, _notificationService_initializers, _notificationService_extraInitializers);
            __esDecorate(this, null, _aiDraftService_decorators, { kind: "accessor", name: "aiDraftService", static: false, private: false, access: { has: obj => "aiDraftService" in obj, get: obj => obj.aiDraftService, set: (obj, value) => { obj.aiDraftService = value; } }, metadata: _metadata }, _aiDraftService_initializers, _aiDraftService_extraInitializers);
            __esDecorate(this, null, _aiToolsConfigService_decorators, { kind: "accessor", name: "aiToolsConfigService", static: false, private: false, access: { has: obj => "aiToolsConfigService" in obj, get: obj => obj.aiToolsConfigService, set: (obj, value) => { obj.aiToolsConfigService = value; } }, metadata: _metadata }, _aiToolsConfigService_initializers, _aiToolsConfigService_extraInitializers);
            __esDecorate(this, null, _affineFeatureFlagService_decorators, { kind: "accessor", name: "affineFeatureFlagService", static: false, private: false, access: { has: obj => "affineFeatureFlagService" in obj, get: obj => obj.affineFeatureFlagService, set: (obj, value) => { obj.affineFeatureFlagService = value; } }, metadata: _metadata }, _affineFeatureFlagService_initializers, _affineFeatureFlagService_extraInitializers);
            __esDecorate(this, null, _subscriptionService_decorators, { kind: "accessor", name: "subscriptionService", static: false, private: false, access: { has: obj => "subscriptionService" in obj, get: obj => obj.subscriptionService, set: (obj, value) => { obj.subscriptionService = value; } }, metadata: _metadata }, _subscriptionService_initializers, _subscriptionService_extraInitializers);
            __esDecorate(this, null, _aiModelService_decorators, { kind: "accessor", name: "aiModelService", static: false, private: false, access: { has: obj => "aiModelService" in obj, get: obj => obj.aiModelService, set: (obj, value) => { obj.aiModelService = value; } }, metadata: _metadata }, _aiModelService_initializers, _aiModelService_extraInitializers);
            __esDecorate(this, null, _onAISubscribe_decorators, { kind: "accessor", name: "onAISubscribe", static: false, private: false, access: { has: obj => "onAISubscribe" in obj, get: obj => obj.onAISubscribe, set: (obj, value) => { obj.onAISubscribe = value; } }, metadata: _metadata }, _onAISubscribe_initializers, _onAISubscribe_extraInitializers);
            __esDecorate(this, null, _chips_decorators, { kind: "accessor", name: "chips", static: false, private: false, access: { has: obj => "chips" in obj, get: obj => obj.chips, set: (obj, value) => { obj.chips = value; } }, metadata: _metadata }, _chips_initializers, _chips_extraInitializers);
            __esDecorate(this, null, _isChipsCollapsed_decorators, { kind: "accessor", name: "isChipsCollapsed", static: false, private: false, access: { has: obj => "isChipsCollapsed" in obj, get: obj => obj.isChipsCollapsed, set: (obj, value) => { obj.isChipsCollapsed = value; } }, metadata: _metadata }, _isChipsCollapsed_initializers, _isChipsCollapsed_extraInitializers);
            __esDecorate(this, null, _embeddingCompleted_decorators, { kind: "accessor", name: "embeddingCompleted", static: false, private: false, access: { has: obj => "embeddingCompleted" in obj, get: obj => obj.embeddingCompleted, set: (obj, value) => { obj.embeddingCompleted = value; } }, metadata: _metadata }, _embeddingCompleted_initializers, _embeddingCompleted_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .chat-panel-footer {
      margin: 8px 0px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      color: var(--affine-text-secondary-color);
      font-size: 12px;
      user-select: none;
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
        #createSession_accessor_storage;
        get createSession() { return this.#createSession_accessor_storage; }
        set createSession(value) { this.#createSession_accessor_storage = value; }
        #chatContextValue_accessor_storage;
        get chatContextValue() { return this.#chatContextValue_accessor_storage; }
        set chatContextValue(value) { this.#chatContextValue_accessor_storage = value; }
        #updateContext_accessor_storage;
        get updateContext() { return this.#updateContext_accessor_storage; }
        set updateContext(value) { this.#updateContext_accessor_storage = value; }
        #onEmbeddingProgressChange_accessor_storage;
        get onEmbeddingProgressChange() { return this.#onEmbeddingProgressChange_accessor_storage; }
        set onEmbeddingProgressChange(value) { this.#onEmbeddingProgressChange_accessor_storage = value; }
        #docDisplayConfig_accessor_storage;
        get docDisplayConfig() { return this.#docDisplayConfig_accessor_storage; }
        set docDisplayConfig(value) { this.#docDisplayConfig_accessor_storage = value; }
        #networkSearchConfig_accessor_storage;
        get networkSearchConfig() { return this.#networkSearchConfig_accessor_storage; }
        set networkSearchConfig(value) { this.#networkSearchConfig_accessor_storage = value; }
        #reasoningConfig_accessor_storage;
        get reasoningConfig() { return this.#reasoningConfig_accessor_storage; }
        set reasoningConfig(value) { this.#reasoningConfig_accessor_storage = value; }
        #searchMenuConfig_accessor_storage;
        get searchMenuConfig() { return this.#searchMenuConfig_accessor_storage; }
        set searchMenuConfig(value) { this.#searchMenuConfig_accessor_storage = value; }
        #onChatSuccess_accessor_storage;
        get onChatSuccess() { return this.#onChatSuccess_accessor_storage; }
        set onChatSuccess(value) { this.#onChatSuccess_accessor_storage = value; }
        #trackOptions_accessor_storage;
        get trackOptions() { return this.#trackOptions_accessor_storage; }
        set trackOptions(value) { this.#trackOptions_accessor_storage = value; }
        #portalContainer_accessor_storage;
        get portalContainer() { return this.#portalContainer_accessor_storage; }
        set portalContainer(value) { this.#portalContainer_accessor_storage = value; }
        #serverService_accessor_storage;
        get serverService() { return this.#serverService_accessor_storage; }
        set serverService(value) { this.#serverService_accessor_storage = value; }
        #affineWorkspaceDialogService_accessor_storage;
        get affineWorkspaceDialogService() { return this.#affineWorkspaceDialogService_accessor_storage; }
        set affineWorkspaceDialogService(value) { this.#affineWorkspaceDialogService_accessor_storage = value; }
        #notificationService_accessor_storage;
        get notificationService() { return this.#notificationService_accessor_storage; }
        set notificationService(value) { this.#notificationService_accessor_storage = value; }
        #aiDraftService_accessor_storage;
        get aiDraftService() { return this.#aiDraftService_accessor_storage; }
        set aiDraftService(value) { this.#aiDraftService_accessor_storage = value; }
        #aiToolsConfigService_accessor_storage;
        get aiToolsConfigService() { return this.#aiToolsConfigService_accessor_storage; }
        set aiToolsConfigService(value) { this.#aiToolsConfigService_accessor_storage = value; }
        #affineFeatureFlagService_accessor_storage;
        get affineFeatureFlagService() { return this.#affineFeatureFlagService_accessor_storage; }
        set affineFeatureFlagService(value) { this.#affineFeatureFlagService_accessor_storage = value; }
        #subscriptionService_accessor_storage;
        get subscriptionService() { return this.#subscriptionService_accessor_storage; }
        set subscriptionService(value) { this.#subscriptionService_accessor_storage = value; }
        #aiModelService_accessor_storage;
        get aiModelService() { return this.#aiModelService_accessor_storage; }
        set aiModelService(value) { this.#aiModelService_accessor_storage = value; }
        #onAISubscribe_accessor_storage;
        get onAISubscribe() { return this.#onAISubscribe_accessor_storage; }
        set onAISubscribe(value) { this.#onAISubscribe_accessor_storage = value; }
        #chips_accessor_storage;
        get chips() { return this.#chips_accessor_storage; }
        set chips(value) { this.#chips_accessor_storage = value; }
        #isChipsCollapsed_accessor_storage;
        get isChipsCollapsed() { return this.#isChipsCollapsed_accessor_storage; }
        set isChipsCollapsed(value) { this.#isChipsCollapsed_accessor_storage = value; }
        #embeddingCompleted_accessor_storage;
        get embeddingCompleted() { return this.#embeddingCompleted_accessor_storage; }
        set embeddingCompleted(value) { this.#embeddingCompleted_accessor_storage = value; }
        render() {
            return html `
      <chat-panel-chips
        .chips=${this.chips}
        .isCollapsed=${this.isChipsCollapsed}
        .independentMode=${this.independentMode}
        .addChip=${this.addChip}
        .updateChip=${this.updateChip}
        .removeChip=${this.removeChip}
        .toggleCollapse=${this.toggleChipsCollapse}
        .docDisplayConfig=${this.docDisplayConfig}
        .portalContainer=${this.portalContainer}
        .addImages=${this.addImages}
      ></chat-panel-chips>
      <ai-chat-input
        .independentMode=${this.independentMode}
        .host=${this.host}
        .workspaceId=${this.workspaceId}
        .docId=${this.docId}
        .session=${this.session}
        .chips=${this.chips}
        .addChip=${this.addChip}
        .addImages=${this.addImages}
        .createSession=${this.createSession}
        .chatContextValue=${this.chatContextValue}
        .updateContext=${this.updateContext}
        .networkSearchConfig=${this.networkSearchConfig}
        .reasoningConfig=${this.reasoningConfig}
        .docDisplayConfig=${this.docDisplayConfig}
        .searchMenuConfig=${this.searchMenuConfig}
        .serverService=${this.serverService}
        .affineFeatureFlagService=${this.affineFeatureFlagService}
        .aiDraftService=${this.aiDraftService}
        .aiToolsConfigService=${this.aiToolsConfigService}
        .notificationService=${this.notificationService}
        .subscriptionService=${this.subscriptionService}
        .aiModelService=${this.aiModelService}
        .onAISubscribe=${this.onAISubscribe}
        .portalContainer=${this.portalContainer}
        .onChatSuccess=${this.onChatSuccess}
        .trackOptions=${this.trackOptions}
        .isContextProcessing=${this.isContextProcessing}
      ></ai-chat-input>
      <div class="chat-panel-footer">
        <ai-chat-composer-tip
          .tips=${[
                html `<span>AI outputs can be misleading or wrong</span>`,
            ].filter(Boolean)}
          .loop=${false}
        ></ai-chat-composer-tip>
      </div>
    </div>`;
        }
        connectedCallback() {
            super.connectedCallback();
            this._disposables.add(AIProvider.slots.requestOpenWithChat.subscribe(this.beforeChatContextSend));
            this._disposables.add(AIProvider.slots.requestSendWithChat.subscribe(this.beforeChatContextSend));
            this.initComposer().catch(console.error);
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this._abortPoll();
            this._abortPollEmbeddingStatus();
        }
        willUpdate(changedProperties) {
            if (changedProperties.has('chatContextValue') &&
                changedProperties.get('chatContextValue')?.status !== 'loading' &&
                this.chatContextValue.status === 'loading' &&
                this.isChipsCollapsed === false) {
                this.isChipsCollapsed = true;
            }
        }
        get isContextProcessing() {
            return this.chips.some(chip => chip.state === 'processing');
        }
    };
})();
export { AIChatComposer };
//# sourceMappingURL=ai-chat-composer.js.map