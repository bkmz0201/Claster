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
import { SignalWatcher } from '@blocksuite/affine/global/lit';
import { unsafeCSSVar } from '@blocksuite/affine/shared/theme';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { debounce } from 'lodash-es';
let AIChatEmbeddingStatusTooltip = (() => {
    let _classSuper = SignalWatcher(LitElement);
    let _affineWorkspaceDialogService_decorators;
    let _affineWorkspaceDialogService_initializers = [];
    let _affineWorkspaceDialogService_extraInitializers = [];
    return class AIChatEmbeddingStatusTooltip extends _classSuper {
        constructor() {
            super(...arguments);
            this.#affineWorkspaceDialogService_accessor_storage = __runInitializers(this, _affineWorkspaceDialogService_initializers, void 0);
            this._handleCheckStatusClick = (__runInitializers(this, _affineWorkspaceDialogService_extraInitializers), debounce(() => {
                this.affineWorkspaceDialogService.open('setting', {
                    activeTab: 'workspace:embedding',
                });
            }, 1000, { leading: true }));
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _affineWorkspaceDialogService_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _affineWorkspaceDialogService_decorators, { kind: "accessor", name: "affineWorkspaceDialogService", static: false, private: false, access: { has: obj => "affineWorkspaceDialogService" in obj, get: obj => obj.affineWorkspaceDialogService, set: (obj, value) => { obj.affineWorkspaceDialogService = value; } }, metadata: _metadata }, _affineWorkspaceDialogService_initializers, _affineWorkspaceDialogService_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      width: 100%;
    }
    .embedding-status {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      gap: 4px;
      user-select: none;
    }
    .embedding-status-text {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 500px;
    }
    .check-status {
      padding: 4px;
      cursor: pointer;
      border-radius: 4px;
    }
    .check-status:hover {
      background-color: ${unsafeCSSVar('--affine-hover-color')};
    }
  `; }
        #affineWorkspaceDialogService_accessor_storage;
        get affineWorkspaceDialogService() { return this.#affineWorkspaceDialogService_accessor_storage; }
        set affineWorkspaceDialogService(value) { this.#affineWorkspaceDialogService_accessor_storage = value; }
        connectedCallback() {
            super.connectedCallback();
        }
        render() {
            return html `
      <div
        class="embedding-status"
        data-testid="ai-chat-embedding-status-tooltip"
      >
        <div class="embedding-status-text">
          Better results after embedding finished.
        </div>
        <div
          class="check-status"
          data-testid="ai-chat-embedding-status-tooltip-check"
          @click=${this._handleCheckStatusClick}
        >
          Check status
        </div>
      </div>
    `;
        }
    };
})();
export { AIChatEmbeddingStatusTooltip };
//# sourceMappingURL=embedding-status-tooltip.js.map