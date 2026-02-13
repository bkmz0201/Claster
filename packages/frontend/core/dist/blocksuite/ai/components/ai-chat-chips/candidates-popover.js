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
import { scrollbarStyle } from '@blocksuite/affine/shared/styles';
import { unsafeCSSVar, unsafeCSSVarV2 } from '@blocksuite/affine/shared/theme';
import { ShadowlessElement } from '@blocksuite/affine/std';
import { PlusIcon } from '@blocksuite/icons/lit';
import { signal } from '@preact/signals-core';
import { css, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
let ChatPanelCandidatesPopover = (() => {
    let _classSuper = SignalWatcher(WithDisposable(ShadowlessElement));
    let _referenceDocs_decorators;
    let _referenceDocs_initializers = [];
    let _referenceDocs_extraInitializers = [];
    let _abortController_decorators;
    let _abortController_initializers = [];
    let _abortController_extraInitializers = [];
    let _addChip_decorators;
    let _addChip_initializers = [];
    let _addChip_extraInitializers = [];
    let _docDisplayConfig_decorators;
    let _docDisplayConfig_initializers = [];
    let _docDisplayConfig_extraInitializers = [];
    let __activatedIndex_decorators;
    let __activatedIndex_initializers = [];
    let __activatedIndex_extraInitializers = [];
    return class ChatPanelCandidatesPopover extends _classSuper {
        constructor() {
            super(...arguments);
            this.#referenceDocs_accessor_storage = __runInitializers(this, _referenceDocs_initializers, signal([]));
            this.#abortController_accessor_storage = (__runInitializers(this, _referenceDocs_extraInitializers), __runInitializers(this, _abortController_initializers, void 0));
            this.#addChip_accessor_storage = (__runInitializers(this, _abortController_extraInitializers), __runInitializers(this, _addChip_initializers, void 0));
            this.#docDisplayConfig_accessor_storage = (__runInitializers(this, _addChip_extraInitializers), __runInitializers(this, _docDisplayConfig_initializers, void 0));
            this.#_activatedIndex_accessor_storage = (__runInitializers(this, _docDisplayConfig_extraInitializers), __runInitializers(this, __activatedIndex_initializers, 0));
            this._addDocChip = (__runInitializers(this, __activatedIndex_extraInitializers), (docId) => {
                this.addChip({
                    docId,
                    state: 'processing',
                });
            });
            this._handleKeyDown = (event) => {
                if (event.isComposing)
                    return;
                const { key } = event;
                if (key === 'ArrowDown' || key === 'ArrowUp') {
                    event.preventDefault();
                    const totalItems = this.referenceDocs.value.length;
                    if (totalItems === 0)
                        return;
                    if (key === 'ArrowDown') {
                        this._activatedIndex = (this._activatedIndex + 1) % totalItems;
                    }
                    else if (key === 'ArrowUp') {
                        this._activatedIndex =
                            (this._activatedIndex - 1 + totalItems) % totalItems;
                    }
                    this._scrollItemIntoView();
                }
                else if (key === 'Enter') {
                    event.preventDefault();
                    if (this.referenceDocs.value.length > 0) {
                        const docId = this.referenceDocs.value[this._activatedIndex].docId;
                        this._addDocChip(docId);
                    }
                }
                else if (key === 'Escape') {
                    event.preventDefault();
                    this.abortController.abort();
                }
            };
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _referenceDocs_decorators = [property({ attribute: false })];
            _abortController_decorators = [property({ attribute: false })];
            _addChip_decorators = [property({ attribute: false })];
            _docDisplayConfig_decorators = [property({ attribute: false })];
            __activatedIndex_decorators = [state()];
            __esDecorate(this, null, _referenceDocs_decorators, { kind: "accessor", name: "referenceDocs", static: false, private: false, access: { has: obj => "referenceDocs" in obj, get: obj => obj.referenceDocs, set: (obj, value) => { obj.referenceDocs = value; } }, metadata: _metadata }, _referenceDocs_initializers, _referenceDocs_extraInitializers);
            __esDecorate(this, null, _abortController_decorators, { kind: "accessor", name: "abortController", static: false, private: false, access: { has: obj => "abortController" in obj, get: obj => obj.abortController, set: (obj, value) => { obj.abortController = value; } }, metadata: _metadata }, _abortController_initializers, _abortController_extraInitializers);
            __esDecorate(this, null, _addChip_decorators, { kind: "accessor", name: "addChip", static: false, private: false, access: { has: obj => "addChip" in obj, get: obj => obj.addChip, set: (obj, value) => { obj.addChip = value; } }, metadata: _metadata }, _addChip_initializers, _addChip_extraInitializers);
            __esDecorate(this, null, _docDisplayConfig_decorators, { kind: "accessor", name: "docDisplayConfig", static: false, private: false, access: { has: obj => "docDisplayConfig" in obj, get: obj => obj.docDisplayConfig, set: (obj, value) => { obj.docDisplayConfig = value; } }, metadata: _metadata }, _docDisplayConfig_initializers, _docDisplayConfig_extraInitializers);
            __esDecorate(this, null, __activatedIndex_decorators, { kind: "accessor", name: "_activatedIndex", static: false, private: false, access: { has: obj => "_activatedIndex" in obj, get: obj => obj._activatedIndex, set: (obj, value) => { obj._activatedIndex = value; } }, metadata: _metadata }, __activatedIndex_initializers, __activatedIndex_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .ai-candidates-popover {
      width: 280px;
      max-height: 450px;
      overflow-y: auto;
      border: 0.5px solid ${unsafeCSSVarV2('layer/insideBorder/border')};
      border-radius: 4px;
      background: ${unsafeCSSVarV2('layer/background/overlayPanel')};
      box-shadow: ${unsafeCSSVar('overlayPanelShadow')};
      padding: 8px;
    }

    .ai-candidates-popover icon-button {
      justify-content: flex-start;
      gap: 8px;
    }
    .ai-candidates-popover icon-button svg {
      width: 20px;
      height: 20px;
      color: var(--svg-icon-color);
    }

    ${scrollbarStyle('.ai-candidates-popover')}
  `; }
        #referenceDocs_accessor_storage;
        get referenceDocs() { return this.#referenceDocs_accessor_storage; }
        set referenceDocs(value) { this.#referenceDocs_accessor_storage = value; }
        #abortController_accessor_storage;
        get abortController() { return this.#abortController_accessor_storage; }
        set abortController(value) { this.#abortController_accessor_storage = value; }
        #addChip_accessor_storage;
        get addChip() { return this.#addChip_accessor_storage; }
        set addChip(value) { this.#addChip_accessor_storage = value; }
        #docDisplayConfig_accessor_storage;
        get docDisplayConfig() { return this.#docDisplayConfig_accessor_storage; }
        set docDisplayConfig(value) { this.#docDisplayConfig_accessor_storage = value; }
        #_activatedIndex_accessor_storage;
        get _activatedIndex() { return this.#_activatedIndex_accessor_storage; }
        set _activatedIndex(value) { this.#_activatedIndex_accessor_storage = value; }
        connectedCallback() {
            super.connectedCallback();
            document.addEventListener('keydown', this._handleKeyDown);
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            document.removeEventListener('keydown', this._handleKeyDown);
        }
        render() {
            return html `<div
      class="ai-candidates-popover"
      data-testid="ai-candidates-popover"
    >
      ${repeat(this.referenceDocs.value, doc => doc.docId, (doc, curIdx) => {
                const { docId } = doc;
                const title = this.docDisplayConfig.getTitle(docId);
                const getIcon = this.docDisplayConfig.getIcon(docId);
                const docIcon = typeof getIcon === 'function' ? getIcon() : getIcon;
                return html `<div class="candidate-item">
            <icon-button
              width="280px"
              height="30px"
              data-id=${docId}
              data-index=${curIdx}
              .text=${title}
              hover=${this._activatedIndex === curIdx}
              @click=${() => this._addDocChip(docId)}
              @mousemove=${() => (this._activatedIndex = curIdx)}
            >
              ${docIcon}
              <span slot="suffix">${PlusIcon()}</span>
            </icon-button>
          </div>`;
            })}
    </div>`;
        }
        _scrollItemIntoView() {
            requestAnimationFrame(() => {
                const element = this.renderRoot.querySelector(`[data-index="${this._activatedIndex}"]`);
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                    });
                }
            });
        }
    };
})();
export { ChatPanelCandidatesPopover };
//# sourceMappingURL=candidates-popover.js.map