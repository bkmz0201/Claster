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
import { createLitPortal } from '@blocksuite/affine/components/portal';
import { SignalWatcher, WithDisposable } from '@blocksuite/affine/global/lit';
import { ShadowlessElement } from '@blocksuite/affine/std';
import { PlusIcon } from '@blocksuite/icons/lit';
import { flip, offset } from '@floating-ui/dom';
import { css, html } from 'lit';
import { property, query } from 'lit/decorators.js';
let AIChatAddContext = (() => {
    let _classSuper = SignalWatcher(WithDisposable(ShadowlessElement));
    let _docId_decorators;
    let _docId_initializers = [];
    let _docId_extraInitializers = [];
    let _independentMode_decorators;
    let _independentMode_initializers = [];
    let _independentMode_extraInitializers = [];
    let _addChip_decorators;
    let _addChip_initializers = [];
    let _addChip_extraInitializers = [];
    let _addImages_decorators;
    let _addImages_initializers = [];
    let _addImages_extraInitializers = [];
    let _docDisplayConfig_decorators;
    let _docDisplayConfig_initializers = [];
    let _docDisplayConfig_extraInitializers = [];
    let _searchMenuConfig_decorators;
    let _searchMenuConfig_initializers = [];
    let _searchMenuConfig_extraInitializers = [];
    let _portalContainer_decorators;
    let _portalContainer_initializers = [];
    let _portalContainer_extraInitializers = [];
    let _addButton_decorators;
    let _addButton_initializers = [];
    let _addButton_extraInitializers = [];
    return class AIChatAddContext extends _classSuper {
        constructor() {
            super(...arguments);
            this.#docId_accessor_storage = __runInitializers(this, _docId_initializers, void 0);
            this.#independentMode_accessor_storage = (__runInitializers(this, _docId_extraInitializers), __runInitializers(this, _independentMode_initializers, void 0));
            this.#addChip_accessor_storage = (__runInitializers(this, _independentMode_extraInitializers), __runInitializers(this, _addChip_initializers, void 0));
            this.#addImages_accessor_storage = (__runInitializers(this, _addChip_extraInitializers), __runInitializers(this, _addImages_initializers, void 0));
            this.#docDisplayConfig_accessor_storage = (__runInitializers(this, _addImages_extraInitializers), __runInitializers(this, _docDisplayConfig_initializers, void 0));
            this.#searchMenuConfig_accessor_storage = (__runInitializers(this, _docDisplayConfig_extraInitializers), __runInitializers(this, _searchMenuConfig_initializers, void 0));
            this.#portalContainer_accessor_storage = (__runInitializers(this, _searchMenuConfig_extraInitializers), __runInitializers(this, _portalContainer_initializers, null));
            this.#addButton_accessor_storage = (__runInitializers(this, _portalContainer_extraInitializers), __runInitializers(this, _addButton_initializers, void 0));
            this.abortController = (__runInitializers(this, _addButton_extraInitializers), null);
            this.toggleAddDocMenu = () => {
                if (this.abortController) {
                    this.abortController.abort();
                    return;
                }
                this.abortController = new AbortController();
                this.abortController.signal.addEventListener('abort', () => {
                    this.abortController = null;
                });
                createLitPortal({
                    template: html `
        <chat-panel-add-popover
          .docId=${this.docId}
          .independentMode=${this.independentMode}
          .addChip=${this.addChip}
          .addImages=${this.addImages}
          .searchMenuConfig=${this.searchMenuConfig}
          .docDisplayConfig=${this.docDisplayConfig}
          .abortController=${this.abortController}
        ></chat-panel-add-popover>
      `,
                    portalStyles: {
                        zIndex: 'var(--affine-z-index-popover)',
                    },
                    container: this.portalContainer ?? document.body,
                    computePosition: {
                        referenceElement: this.addButton,
                        placement: 'top-start',
                        middleware: [offset({ crossAxis: -30, mainAxis: 8 }), flip()],
                        autoUpdate: { animationFrame: true },
                    },
                    abortController: this.abortController,
                    closeOnClickAway: true,
                });
            };
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _docId_decorators = [property({ attribute: false })];
            _independentMode_decorators = [property({ attribute: false })];
            _addChip_decorators = [property({ attribute: false })];
            _addImages_decorators = [property({ attribute: false })];
            _docDisplayConfig_decorators = [property({ attribute: false })];
            _searchMenuConfig_decorators = [property({ attribute: false })];
            _portalContainer_decorators = [property({ attribute: false })];
            _addButton_decorators = [query('.ai-chat-add-context')];
            __esDecorate(this, null, _docId_decorators, { kind: "accessor", name: "docId", static: false, private: false, access: { has: obj => "docId" in obj, get: obj => obj.docId, set: (obj, value) => { obj.docId = value; } }, metadata: _metadata }, _docId_initializers, _docId_extraInitializers);
            __esDecorate(this, null, _independentMode_decorators, { kind: "accessor", name: "independentMode", static: false, private: false, access: { has: obj => "independentMode" in obj, get: obj => obj.independentMode, set: (obj, value) => { obj.independentMode = value; } }, metadata: _metadata }, _independentMode_initializers, _independentMode_extraInitializers);
            __esDecorate(this, null, _addChip_decorators, { kind: "accessor", name: "addChip", static: false, private: false, access: { has: obj => "addChip" in obj, get: obj => obj.addChip, set: (obj, value) => { obj.addChip = value; } }, metadata: _metadata }, _addChip_initializers, _addChip_extraInitializers);
            __esDecorate(this, null, _addImages_decorators, { kind: "accessor", name: "addImages", static: false, private: false, access: { has: obj => "addImages" in obj, get: obj => obj.addImages, set: (obj, value) => { obj.addImages = value; } }, metadata: _metadata }, _addImages_initializers, _addImages_extraInitializers);
            __esDecorate(this, null, _docDisplayConfig_decorators, { kind: "accessor", name: "docDisplayConfig", static: false, private: false, access: { has: obj => "docDisplayConfig" in obj, get: obj => obj.docDisplayConfig, set: (obj, value) => { obj.docDisplayConfig = value; } }, metadata: _metadata }, _docDisplayConfig_initializers, _docDisplayConfig_extraInitializers);
            __esDecorate(this, null, _searchMenuConfig_decorators, { kind: "accessor", name: "searchMenuConfig", static: false, private: false, access: { has: obj => "searchMenuConfig" in obj, get: obj => obj.searchMenuConfig, set: (obj, value) => { obj.searchMenuConfig = value; } }, metadata: _metadata }, _searchMenuConfig_initializers, _searchMenuConfig_extraInitializers);
            __esDecorate(this, null, _portalContainer_decorators, { kind: "accessor", name: "portalContainer", static: false, private: false, access: { has: obj => "portalContainer" in obj, get: obj => obj.portalContainer, set: (obj, value) => { obj.portalContainer = value; } }, metadata: _metadata }, _portalContainer_initializers, _portalContainer_extraInitializers);
            __esDecorate(this, null, _addButton_decorators, { kind: "accessor", name: "addButton", static: false, private: false, access: { has: obj => "addButton" in obj, get: obj => obj.addButton, set: (obj, value) => { obj.addButton = value; } }, metadata: _metadata }, _addButton_initializers, _addButton_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .ai-chat-add-context {
      display: flex;
      flex-shrink: 0;
      flex-grow: 0;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  `; }
        #docId_accessor_storage;
        get docId() { return this.#docId_accessor_storage; }
        set docId(value) { this.#docId_accessor_storage = value; }
        #independentMode_accessor_storage;
        get independentMode() { return this.#independentMode_accessor_storage; }
        set independentMode(value) { this.#independentMode_accessor_storage = value; }
        #addChip_accessor_storage;
        get addChip() { return this.#addChip_accessor_storage; }
        set addChip(value) { this.#addChip_accessor_storage = value; }
        #addImages_accessor_storage;
        get addImages() { return this.#addImages_accessor_storage; }
        set addImages(value) { this.#addImages_accessor_storage = value; }
        #docDisplayConfig_accessor_storage;
        get docDisplayConfig() { return this.#docDisplayConfig_accessor_storage; }
        set docDisplayConfig(value) { this.#docDisplayConfig_accessor_storage = value; }
        #searchMenuConfig_accessor_storage;
        get searchMenuConfig() { return this.#searchMenuConfig_accessor_storage; }
        set searchMenuConfig(value) { this.#searchMenuConfig_accessor_storage = value; }
        #portalContainer_accessor_storage;
        get portalContainer() { return this.#portalContainer_accessor_storage; }
        set portalContainer(value) { this.#portalContainer_accessor_storage = value; }
        #addButton_accessor_storage;
        get addButton() { return this.#addButton_accessor_storage; }
        set addButton(value) { this.#addButton_accessor_storage = value; }
        render() {
            return html `
      <div
        class="ai-chat-add-context"
        data-testid="chat-panel-with-button"
        @click=${this.toggleAddDocMenu}
      >
        ${PlusIcon()}
      </div>
    `;
        }
    };
})();
export { AIChatAddContext };
//# sourceMappingURL=ai-chat-add-context.js.map