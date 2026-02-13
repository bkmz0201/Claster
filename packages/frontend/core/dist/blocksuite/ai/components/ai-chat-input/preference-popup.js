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
import { ServerDeploymentType, SubscriptionStatus, } from '@affine/graphql';
import { menu, popMenu, popupTargetFromElement, } from '@blocksuite/affine/components/context-menu';
import { SignalWatcher, WithDisposable } from '@blocksuite/affine/global/lit';
import { unsafeCSSVarV2 } from '@blocksuite/affine/shared/theme';
import { AiOutlineIcon, ArrowDownSmallIcon, CloudWorkspaceIcon, DoneIcon, LockIcon, ThinkingIcon, WebIcon, } from '@blocksuite/icons/lit';
import { ShadowlessElement } from '@blocksuite/std';
import { computed } from '@preact/signals-core';
import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
let ChatInputPreference = (() => {
    let _classSuper = SignalWatcher(WithDisposable(ShadowlessElement));
    let _session_decorators;
    let _session_initializers = [];
    let _session_extraInitializers = [];
    let _extendedThinking_decorators;
    let _extendedThinking_initializers = [];
    let _extendedThinking_extraInitializers = [];
    let _onExtendedThinkingChange_decorators;
    let _onExtendedThinkingChange_initializers = [];
    let _onExtendedThinkingChange_extraInitializers = [];
    let _networkSearchVisible_decorators;
    let _networkSearchVisible_initializers = [];
    let _networkSearchVisible_extraInitializers = [];
    let _isNetworkActive_decorators;
    let _isNetworkActive_initializers = [];
    let _isNetworkActive_extraInitializers = [];
    let _onNetworkActiveChange_decorators;
    let _onNetworkActiveChange_initializers = [];
    let _onNetworkActiveChange_extraInitializers = [];
    let _serverService_decorators;
    let _serverService_initializers = [];
    let _serverService_extraInitializers = [];
    let _toolsConfigService_decorators;
    let _toolsConfigService_initializers = [];
    let _toolsConfigService_extraInitializers = [];
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
    return class ChatInputPreference extends _classSuper {
        constructor() {
            super(...arguments);
            this.#session_accessor_storage = __runInitializers(this, _session_initializers, void 0);
            this.#extendedThinking_accessor_storage = (__runInitializers(this, _session_extraInitializers), __runInitializers(this, _extendedThinking_initializers, false));
            this.#onExtendedThinkingChange_accessor_storage = (__runInitializers(this, _extendedThinking_extraInitializers), __runInitializers(this, _onExtendedThinkingChange_initializers, void 0));
            this.#networkSearchVisible_accessor_storage = (__runInitializers(this, _onExtendedThinkingChange_extraInitializers), __runInitializers(this, _networkSearchVisible_initializers, false));
            this.#isNetworkActive_accessor_storage = (__runInitializers(this, _networkSearchVisible_extraInitializers), __runInitializers(this, _isNetworkActive_initializers, false));
            this.#onNetworkActiveChange_accessor_storage = (__runInitializers(this, _isNetworkActive_extraInitializers), __runInitializers(this, _onNetworkActiveChange_initializers, void 0));
            this.#serverService_accessor_storage = (__runInitializers(this, _onNetworkActiveChange_extraInitializers), __runInitializers(this, _serverService_initializers, void 0));
            this.#toolsConfigService_accessor_storage = (__runInitializers(this, _serverService_extraInitializers), __runInitializers(this, _toolsConfigService_initializers, void 0));
            this.#notificationService_accessor_storage = (__runInitializers(this, _toolsConfigService_extraInitializers), __runInitializers(this, _notificationService_initializers, void 0));
            this.#subscriptionService_accessor_storage = (__runInitializers(this, _notificationService_extraInitializers), __runInitializers(this, _subscriptionService_initializers, void 0));
            this.#aiModelService_accessor_storage = (__runInitializers(this, _subscriptionService_extraInitializers), __runInitializers(this, _aiModelService_initializers, void 0));
            this.#onAISubscribe_accessor_storage = (__runInitializers(this, _aiModelService_extraInitializers), __runInitializers(this, _onAISubscribe_initializers, void 0));
            this.model = (__runInitializers(this, _onAISubscribe_extraInitializers), computed(() => {
                const modelId = this.aiModelService.modelId.value;
                const activeModel = this.aiModelService.models.value.find(model => model.id === modelId);
                const defaultModel = this.aiModelService.models.value.find(model => model.isDefault);
                return activeModel || defaultModel;
            }));
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _session_decorators = [property({ attribute: false })];
            _extendedThinking_decorators = [property({ attribute: false })];
            _onExtendedThinkingChange_decorators = [property({ attribute: false })];
            _networkSearchVisible_decorators = [property({ attribute: false })];
            _isNetworkActive_decorators = [property({ attribute: false })];
            _onNetworkActiveChange_decorators = [property({ attribute: false })];
            _serverService_decorators = [property({ attribute: false })];
            _toolsConfigService_decorators = [property({ attribute: false })];
            _notificationService_decorators = [property({ attribute: false })];
            _subscriptionService_decorators = [property({ attribute: false })];
            _aiModelService_decorators = [property({ attribute: false })];
            _onAISubscribe_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _session_decorators, { kind: "accessor", name: "session", static: false, private: false, access: { has: obj => "session" in obj, get: obj => obj.session, set: (obj, value) => { obj.session = value; } }, metadata: _metadata }, _session_initializers, _session_extraInitializers);
            __esDecorate(this, null, _extendedThinking_decorators, { kind: "accessor", name: "extendedThinking", static: false, private: false, access: { has: obj => "extendedThinking" in obj, get: obj => obj.extendedThinking, set: (obj, value) => { obj.extendedThinking = value; } }, metadata: _metadata }, _extendedThinking_initializers, _extendedThinking_extraInitializers);
            __esDecorate(this, null, _onExtendedThinkingChange_decorators, { kind: "accessor", name: "onExtendedThinkingChange", static: false, private: false, access: { has: obj => "onExtendedThinkingChange" in obj, get: obj => obj.onExtendedThinkingChange, set: (obj, value) => { obj.onExtendedThinkingChange = value; } }, metadata: _metadata }, _onExtendedThinkingChange_initializers, _onExtendedThinkingChange_extraInitializers);
            __esDecorate(this, null, _networkSearchVisible_decorators, { kind: "accessor", name: "networkSearchVisible", static: false, private: false, access: { has: obj => "networkSearchVisible" in obj, get: obj => obj.networkSearchVisible, set: (obj, value) => { obj.networkSearchVisible = value; } }, metadata: _metadata }, _networkSearchVisible_initializers, _networkSearchVisible_extraInitializers);
            __esDecorate(this, null, _isNetworkActive_decorators, { kind: "accessor", name: "isNetworkActive", static: false, private: false, access: { has: obj => "isNetworkActive" in obj, get: obj => obj.isNetworkActive, set: (obj, value) => { obj.isNetworkActive = value; } }, metadata: _metadata }, _isNetworkActive_initializers, _isNetworkActive_extraInitializers);
            __esDecorate(this, null, _onNetworkActiveChange_decorators, { kind: "accessor", name: "onNetworkActiveChange", static: false, private: false, access: { has: obj => "onNetworkActiveChange" in obj, get: obj => obj.onNetworkActiveChange, set: (obj, value) => { obj.onNetworkActiveChange = value; } }, metadata: _metadata }, _onNetworkActiveChange_initializers, _onNetworkActiveChange_extraInitializers);
            __esDecorate(this, null, _serverService_decorators, { kind: "accessor", name: "serverService", static: false, private: false, access: { has: obj => "serverService" in obj, get: obj => obj.serverService, set: (obj, value) => { obj.serverService = value; } }, metadata: _metadata }, _serverService_initializers, _serverService_extraInitializers);
            __esDecorate(this, null, _toolsConfigService_decorators, { kind: "accessor", name: "toolsConfigService", static: false, private: false, access: { has: obj => "toolsConfigService" in obj, get: obj => obj.toolsConfigService, set: (obj, value) => { obj.toolsConfigService = value; } }, metadata: _metadata }, _toolsConfigService_initializers, _toolsConfigService_extraInitializers);
            __esDecorate(this, null, _notificationService_decorators, { kind: "accessor", name: "notificationService", static: false, private: false, access: { has: obj => "notificationService" in obj, get: obj => obj.notificationService, set: (obj, value) => { obj.notificationService = value; } }, metadata: _metadata }, _notificationService_initializers, _notificationService_extraInitializers);
            __esDecorate(this, null, _subscriptionService_decorators, { kind: "accessor", name: "subscriptionService", static: false, private: false, access: { has: obj => "subscriptionService" in obj, get: obj => obj.subscriptionService, set: (obj, value) => { obj.subscriptionService = value; } }, metadata: _metadata }, _subscriptionService_initializers, _subscriptionService_extraInitializers);
            __esDecorate(this, null, _aiModelService_decorators, { kind: "accessor", name: "aiModelService", static: false, private: false, access: { has: obj => "aiModelService" in obj, get: obj => obj.aiModelService, set: (obj, value) => { obj.aiModelService = value; } }, metadata: _metadata }, _aiModelService_initializers, _aiModelService_extraInitializers);
            __esDecorate(this, null, _onAISubscribe_decorators, { kind: "accessor", name: "onAISubscribe", static: false, private: false, access: { has: obj => "onAISubscribe" in obj, get: obj => obj.onAISubscribe, set: (obj, value) => { obj.onAISubscribe = value; } }, metadata: _metadata }, _onAISubscribe_initializers, _onAISubscribe_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .chat-input-preference-trigger {
      display: flex;
      align-items: center;
      padding: 0px 4px;
      color: var(--affine-v2-icon-primary);
      transition: all 0.23s ease;
      border-radius: 4px;
      background: transparent;
      border: none;
      cursor: pointer;
    }
    .chat-input-preference-trigger:hover {
      background-color: var(--affine-v2-layer-background-hoverOverlay);
    }
    .chat-input-preference-trigger-label {
      font-size: 14px;
      line-height: 22px;
      font-weight: 500;
      padding: 0px 4px;
    }
    .chat-input-preference-trigger-icon {
      font-size: 20px;
      line-height: 0;
    }
    .preference-action {
      white-space: nowrap;
      min-width: 220px;
    }
    .ai-active-model-name {
      font-size: 14px;
      color: ${unsafeCSSVarV2('text/secondary')};
      line-height: 22px;
      margin-left: 40px;
    }
    .ai-model-prefix {
      width: 20px;
      height: 20px;
    }
    .ai-model-prefix svg {
      color: ${unsafeCSSVarV2('icon/activated')};
    }
    .ai-model-postfix svg:hover {
      color: ${unsafeCSSVarV2('icon/activated')};
    }
    .ai-model-version {
      font-size: 12px;
      color: ${unsafeCSSVarV2('text/tertiary')};
      line-height: 20px;
      margin-right: 40px;
    }
  `; }
        #session_accessor_storage;
        get session() { return this.#session_accessor_storage; }
        set session(value) { this.#session_accessor_storage = value; }
        #extendedThinking_accessor_storage;
        // --------- model props end ---------
        // --------- extended thinking props start ---------
        get extendedThinking() { return this.#extendedThinking_accessor_storage; }
        set extendedThinking(value) { this.#extendedThinking_accessor_storage = value; }
        #onExtendedThinkingChange_accessor_storage;
        get onExtendedThinkingChange() { return this.#onExtendedThinkingChange_accessor_storage; }
        set onExtendedThinkingChange(value) { this.#onExtendedThinkingChange_accessor_storage = value; }
        #networkSearchVisible_accessor_storage;
        // --------- extended thinking props end ---------
        // --------- search props start ---------
        get networkSearchVisible() { return this.#networkSearchVisible_accessor_storage; }
        set networkSearchVisible(value) { this.#networkSearchVisible_accessor_storage = value; }
        #isNetworkActive_accessor_storage;
        get isNetworkActive() { return this.#isNetworkActive_accessor_storage; }
        set isNetworkActive(value) { this.#isNetworkActive_accessor_storage = value; }
        #onNetworkActiveChange_accessor_storage;
        get onNetworkActiveChange() { return this.#onNetworkActiveChange_accessor_storage; }
        set onNetworkActiveChange(value) { this.#onNetworkActiveChange_accessor_storage = value; }
        #serverService_accessor_storage;
        // --------- search props end ---------
        get serverService() { return this.#serverService_accessor_storage; }
        set serverService(value) { this.#serverService_accessor_storage = value; }
        #toolsConfigService_accessor_storage;
        get toolsConfigService() { return this.#toolsConfigService_accessor_storage; }
        set toolsConfigService(value) { this.#toolsConfigService_accessor_storage = value; }
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
        openPreference(e) {
            const element = e.currentTarget;
            if (!(element instanceof HTMLElement))
                return;
            const modelItems = [];
            const searchItems = [];
            // model switch
            modelItems.push(menu.subMenu({
                name: 'Model',
                prefix: AiOutlineIcon(),
                postfix: html `
          <span class="ai-active-model-name"> ${this.model.value?.name} </span>
        `,
                options: {
                    items: this.aiModelService.models.value.map(model => {
                        const isSelected = model.id === this.model.value?.id;
                        const isSelfHosted = this.serverService.server.config$.value?.type ===
                            ServerDeploymentType.Selfhosted;
                        const status = this.subscriptionService.subscription.ai$.value?.status;
                        const isSubscribed = status === SubscriptionStatus.Active;
                        return menu.action({
                            name: model.category,
                            info: html `
                <span class="ai-model-version">${model.version}</span>
              `,
                            prefix: html `
                <div class="ai-model-prefix">
                  ${isSelected ? DoneIcon() : undefined}
                </div>
              `,
                            postfix: html `
                <div class="ai-model-postfix" @click=${this.onAISubscribe}>
                  ${model.isPro && !isSubscribed ? LockIcon() : undefined}
                </div>
              `,
                            select: () => {
                                if (model.isPro && !isSelfHosted && !isSubscribed) {
                                    this.notificationService.toast(`Pro models require an AFFiNE AI subscription.`);
                                    return;
                                }
                                this.aiModelService.setModel(model.id);
                            },
                        });
                    }),
                },
            }));
            modelItems.push(menu.toggleSwitch({
                name: 'Extended Thinking',
                prefix: ThinkingIcon(),
                on: this.extendedThinking,
                onChange: (value) => this.onExtendedThinkingChange?.(value),
                class: { 'preference-action': true },
            }));
            if (this.networkSearchVisible) {
                searchItems.push(menu.toggleSwitch({
                    name: 'Web Search',
                    prefix: WebIcon(),
                    on: this.isNetworkActive,
                    onChange: (value) => this.onNetworkActiveChange?.(value),
                    class: { 'preference-action': true },
                    testId: 'chat-network-search',
                }), menu.toggleSwitch({
                    name: 'Workspace All Docs',
                    prefix: CloudWorkspaceIcon(),
                    on: !!this.toolsConfigService.config.value.searchWorkspace &&
                        !!this.toolsConfigService.config.value.readingDocs,
                    onChange: (value) => this.toolsConfigService.setConfig({
                        searchWorkspace: value,
                        readingDocs: value,
                    }),
                    class: { 'preference-action': true },
                }));
            }
            popMenu(popupTargetFromElement(element), {
                options: {
                    items: [
                        menu.group({
                            items: [...modelItems],
                        }),
                        menu.group({
                            items: [...searchItems],
                        }),
                    ],
                    testId: 'chat-input-preference',
                },
            });
        }
        render() {
            return html `<button
      @click=${this.openPreference}
      data-testid="chat-input-preference-trigger"
      class="chat-input-preference-trigger"
    >
      <span class="chat-input-preference-trigger-label">
        ${this.model.value?.category}
      </span>
      <span class="chat-input-preference-trigger-icon">
        ${ArrowDownSmallIcon()}
      </span>
    </button>`;
        }
    };
})();
export { ChatInputPreference };
//# sourceMappingURL=preference-popup.js.map