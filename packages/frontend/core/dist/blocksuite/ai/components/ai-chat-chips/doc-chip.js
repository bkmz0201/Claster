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
import track from '@affine/track';
import { SignalWatcher, WithDisposable } from '@blocksuite/affine/global/lit';
import { ShadowlessElement } from '@blocksuite/affine/std';
import { Signal } from '@preact/signals-core';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import throttle from 'lodash-es/throttle';
import { extractMarkdownFromDoc } from '../../utils/extract';
import { estimateTokenCount, getChipIcon, getChipTooltip } from './utils';
const EXTRACT_DOC_THROTTLE = 1000;
let ChatPanelDocChip = (() => {
    let _classSuper = SignalWatcher(WithDisposable(ShadowlessElement));
    let _chip_decorators;
    let _chip_initializers = [];
    let _chip_extraInitializers = [];
    let _independentMode_decorators;
    let _independentMode_initializers = [];
    let _independentMode_extraInitializers = [];
    let _addChip_decorators;
    let _addChip_initializers = [];
    let _addChip_extraInitializers = [];
    let _updateChip_decorators;
    let _updateChip_initializers = [];
    let _updateChip_extraInitializers = [];
    let _removeChip_decorators;
    let _removeChip_initializers = [];
    let _removeChip_extraInitializers = [];
    let _checkTokenLimit_decorators;
    let _checkTokenLimit_initializers = [];
    let _checkTokenLimit_extraInitializers = [];
    let _docDisplayConfig_decorators;
    let _docDisplayConfig_initializers = [];
    let _docDisplayConfig_extraInitializers = [];
    return class ChatPanelDocChip extends _classSuper {
        constructor() {
            super(...arguments);
            this.#chip_accessor_storage = __runInitializers(this, _chip_initializers, void 0);
            this.#independentMode_accessor_storage = (__runInitializers(this, _chip_extraInitializers), __runInitializers(this, _independentMode_initializers, void 0));
            this.#addChip_accessor_storage = (__runInitializers(this, _independentMode_extraInitializers), __runInitializers(this, _addChip_initializers, void 0));
            this.#updateChip_accessor_storage = (__runInitializers(this, _addChip_extraInitializers), __runInitializers(this, _updateChip_initializers, void 0));
            this.#removeChip_accessor_storage = (__runInitializers(this, _updateChip_extraInitializers), __runInitializers(this, _removeChip_initializers, void 0));
            this.#checkTokenLimit_accessor_storage = (__runInitializers(this, _removeChip_extraInitializers), __runInitializers(this, _checkTokenLimit_initializers, void 0));
            this.#docDisplayConfig_accessor_storage = (__runInitializers(this, _checkTokenLimit_extraInitializers), __runInitializers(this, _docDisplayConfig_initializers, void 0));
            this.chipName = (__runInitializers(this, _docDisplayConfig_extraInitializers), new Signal(''));
            this.onChipClick = async () => {
                if (this.chip.state === 'candidate') {
                    this.addChip({
                        ...this.chip,
                        state: 'processing',
                    });
                    const mode = this.docDisplayConfig.getDocPrimaryMode(this.chip.docId);
                    const page = this.independentMode
                        ? track.$.intelligence
                        : track.$.chatPanel;
                    page.chatPanelInput.addEmbeddingDoc({
                        control: 'addButton',
                        method: 'suggestion',
                        type: mode,
                    });
                }
            };
            this.onChipDelete = () => {
                this.removeChip(this.chip);
            };
            this.autoUpdateChip = () => {
                if (this.chip.state !== 'candidate') {
                    this.processDocChip().catch(console.error);
                }
            };
            this.processDocChip = async () => {
                try {
                    const doc = this.docDisplayConfig.getDoc(this.chip.docId);
                    if (!doc) {
                        throw new Error('Document not found');
                    }
                    if (!doc.ready) {
                        doc.load();
                    }
                    const value = await extractMarkdownFromDoc(doc);
                    const tokenCount = estimateTokenCount(value);
                    if (this.checkTokenLimit(this.chip, tokenCount)) {
                        const markdown = this.chip.markdown ?? new Signal('');
                        markdown.value = value;
                        this.updateChip(this.chip, {
                            markdown,
                            tokenCount,
                        });
                    }
                    else {
                        this.updateChip(this.chip, {
                            state: 'failed',
                            tooltip: 'Content exceeds token limit',
                        });
                    }
                }
                catch (e) {
                    this.updateChip(this.chip, {
                        state: 'failed',
                        tooltip: e instanceof Error ? e.message : 'Failed to extract markdown',
                    });
                }
            };
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _chip_decorators = [property({ attribute: false })];
            _independentMode_decorators = [property({ attribute: false })];
            _addChip_decorators = [property({ attribute: false })];
            _updateChip_decorators = [property({ attribute: false })];
            _removeChip_decorators = [property({ attribute: false })];
            _checkTokenLimit_decorators = [property({ attribute: false })];
            _docDisplayConfig_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _chip_decorators, { kind: "accessor", name: "chip", static: false, private: false, access: { has: obj => "chip" in obj, get: obj => obj.chip, set: (obj, value) => { obj.chip = value; } }, metadata: _metadata }, _chip_initializers, _chip_extraInitializers);
            __esDecorate(this, null, _independentMode_decorators, { kind: "accessor", name: "independentMode", static: false, private: false, access: { has: obj => "independentMode" in obj, get: obj => obj.independentMode, set: (obj, value) => { obj.independentMode = value; } }, metadata: _metadata }, _independentMode_initializers, _independentMode_extraInitializers);
            __esDecorate(this, null, _addChip_decorators, { kind: "accessor", name: "addChip", static: false, private: false, access: { has: obj => "addChip" in obj, get: obj => obj.addChip, set: (obj, value) => { obj.addChip = value; } }, metadata: _metadata }, _addChip_initializers, _addChip_extraInitializers);
            __esDecorate(this, null, _updateChip_decorators, { kind: "accessor", name: "updateChip", static: false, private: false, access: { has: obj => "updateChip" in obj, get: obj => obj.updateChip, set: (obj, value) => { obj.updateChip = value; } }, metadata: _metadata }, _updateChip_initializers, _updateChip_extraInitializers);
            __esDecorate(this, null, _removeChip_decorators, { kind: "accessor", name: "removeChip", static: false, private: false, access: { has: obj => "removeChip" in obj, get: obj => obj.removeChip, set: (obj, value) => { obj.removeChip = value; } }, metadata: _metadata }, _removeChip_initializers, _removeChip_extraInitializers);
            __esDecorate(this, null, _checkTokenLimit_decorators, { kind: "accessor", name: "checkTokenLimit", static: false, private: false, access: { has: obj => "checkTokenLimit" in obj, get: obj => obj.checkTokenLimit, set: (obj, value) => { obj.checkTokenLimit = value; } }, metadata: _metadata }, _checkTokenLimit_initializers, _checkTokenLimit_extraInitializers);
            __esDecorate(this, null, _docDisplayConfig_decorators, { kind: "accessor", name: "docDisplayConfig", static: false, private: false, access: { has: obj => "docDisplayConfig" in obj, get: obj => obj.docDisplayConfig, set: (obj, value) => { obj.docDisplayConfig = value; } }, metadata: _metadata }, _docDisplayConfig_initializers, _docDisplayConfig_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        #chip_accessor_storage;
        get chip() { return this.#chip_accessor_storage; }
        set chip(value) { this.#chip_accessor_storage = value; }
        #independentMode_accessor_storage;
        get independentMode() { return this.#independentMode_accessor_storage; }
        set independentMode(value) { this.#independentMode_accessor_storage = value; }
        #addChip_accessor_storage;
        get addChip() { return this.#addChip_accessor_storage; }
        set addChip(value) { this.#addChip_accessor_storage = value; }
        #updateChip_accessor_storage;
        get updateChip() { return this.#updateChip_accessor_storage; }
        set updateChip(value) { this.#updateChip_accessor_storage = value; }
        #removeChip_accessor_storage;
        get removeChip() { return this.#removeChip_accessor_storage; }
        set removeChip(value) { this.#removeChip_accessor_storage = value; }
        #checkTokenLimit_accessor_storage;
        get checkTokenLimit() { return this.#checkTokenLimit_accessor_storage; }
        set checkTokenLimit(value) { this.#checkTokenLimit_accessor_storage = value; }
        #docDisplayConfig_accessor_storage;
        get docDisplayConfig() { return this.#docDisplayConfig_accessor_storage; }
        set docDisplayConfig(value) { this.#docDisplayConfig_accessor_storage = value; }
        connectedCallback() {
            super.connectedCallback();
            const { signal, cleanup } = this.docDisplayConfig.getTitleSignal(this.chip.docId);
            this.chipName = signal;
            this.disposables.add(cleanup);
            const doc = this.docDisplayConfig.getDoc(this.chip.docId);
            if (doc) {
                this.disposables.add(doc.slots.blockUpdated.subscribe(throttle(this.autoUpdateChip, EXTRACT_DOC_THROTTLE)));
                this.autoUpdateChip();
            }
        }
        updated(changedProperties) {
            super.updated(changedProperties);
            if (changedProperties.has('chip') &&
                this.chip.state === 'processing' &&
                !this.chip.markdown) {
                this.processDocChip().catch(console.error);
            }
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this.disposables.dispose();
        }
        render() {
            const { state, docId } = this.chip;
            const isLoading = state === 'processing';
            const getIcon = this.docDisplayConfig.getIcon(docId);
            const docIcon = typeof getIcon === 'function' ? getIcon() : getIcon;
            const icon = getChipIcon(state, docIcon);
            const tooltip = getChipTooltip(state, this.chipName.value, this.chip.tooltip);
            return html `<chat-panel-chip
      .state=${state}
      .name=${this.chipName.value}
      .tooltip=${tooltip}
      .icon=${icon}
      .closeable=${!isLoading}
      .onChipClick=${this.onChipClick}
      .onChipDelete=${this.onChipDelete}
    ></chat-panel-chip>`;
        }
    };
})();
export { ChatPanelDocChip };
//# sourceMappingURL=doc-chip.js.map