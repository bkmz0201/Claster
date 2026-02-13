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
import { WidgetComponent, WidgetViewExtension } from '@blocksuite/affine/std';
import { createLitPortal } from '@blocksuite/affine-components/portal';
import { css, html, LitElement } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { literal, unsafeStatic } from 'lit/static-html.js';
import { BlockDiffProvider } from '../../services/block-diff';
export const AFFINE_BLOCK_DIFF_PLAYGROUND = 'affine-block-diff-playground';
export const AFFINE_BLOCK_DIFF_PLAYGROUND_MODAL = 'affine-block-diff-playground-modal';
let BlockDiffPlaygroundModal = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _markdown_decorators;
    let _markdown_initializers = [];
    let _markdown_extraInitializers = [];
    let _diffService_decorators;
    let _diffService_initializers = [];
    let _diffService_extraInitializers = [];
    let _store_decorators;
    let _store_initializers = [];
    let _store_extraInitializers = [];
    let _onClose_decorators;
    let _onClose_initializers = [];
    let _onClose_extraInitializers = [];
    return class BlockDiffPlaygroundModal extends _classSuper {
        constructor() {
            super(...arguments);
            this.#markdown_accessor_storage = __runInitializers(this, _markdown_initializers, '');
            this.#diffService_accessor_storage = (__runInitializers(this, _markdown_extraInitializers), __runInitializers(this, _diffService_initializers, void 0));
            this.#store_accessor_storage = (__runInitializers(this, _diffService_extraInitializers), __runInitializers(this, _store_initializers, void 0));
            this.#onClose_accessor_storage = (__runInitializers(this, _store_extraInitializers), __runInitializers(this, _onClose_initializers, void 0));
            this.handleInput = (__runInitializers(this, _onClose_extraInitializers), (e) => {
                this.markdown = e.target.value;
            });
            this.handleClear = () => {
                this.markdown = '';
                this.diffService.setChangedMarkdown('');
            };
            this.handleConfirm = async () => {
                const originalMarkdown = await this.getOriginalMarkdown();
                this.diffService.setOriginalMarkdown(originalMarkdown);
                this.diffService.setChangedMarkdown(this.markdown);
                this.onClose();
            };
            this.handleInsertCurrentMarkdown = async () => {
                this.markdown = await this.getOriginalMarkdown();
            };
            this.stopPropagation = (e) => {
                e.stopPropagation();
            };
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _markdown_decorators = [state()];
            _diffService_decorators = [property({ attribute: false })];
            _store_decorators = [property({ attribute: false })];
            _onClose_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _markdown_decorators, { kind: "accessor", name: "markdown", static: false, private: false, access: { has: obj => "markdown" in obj, get: obj => obj.markdown, set: (obj, value) => { obj.markdown = value; } }, metadata: _metadata }, _markdown_initializers, _markdown_extraInitializers);
            __esDecorate(this, null, _diffService_decorators, { kind: "accessor", name: "diffService", static: false, private: false, access: { has: obj => "diffService" in obj, get: obj => obj.diffService, set: (obj, value) => { obj.diffService = value; } }, metadata: _metadata }, _diffService_initializers, _diffService_extraInitializers);
            __esDecorate(this, null, _store_decorators, { kind: "accessor", name: "store", static: false, private: false, access: { has: obj => "store" in obj, get: obj => obj.store, set: (obj, value) => { obj.store = value; } }, metadata: _metadata }, _store_initializers, _store_extraInitializers);
            __esDecorate(this, null, _onClose_decorators, { kind: "accessor", name: "onClose", static: false, private: false, access: { has: obj => "onClose" in obj, get: obj => obj.onClose, set: (obj, value) => { obj.onClose = value; } }, metadata: _metadata }, _onClose_initializers, _onClose_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .playground-modal {
      z-index: 10000;
      width: 600px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.18);
      padding: 24px 20px 16px 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .playground-textarea {
      width: 100%;
      min-height: 300px;
      resize: vertical;
      font-size: 15px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      padding: 8px;
      outline: none;
      font-family: inherit;
      box-sizing: border-box;
    }
    .playground-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 8px;
    }
    .playground-btn {
      padding: 6px 18px;
      border: none;
      border-radius: 4px;
      font-size: 15px;
      cursor: pointer;
      background: #f5f5f5;
      color: #333;
      transition: background 0.2s;
    }
    .playground-btn.primary {
      background: #1976d2;
      color: #fff;
    }
    .playground-btn.primary:hover {
      background: #1565c0;
    }
    .playground-btn:hover {
      background: #e0e0e0;
    }
  `; }
        #markdown_accessor_storage;
        get markdown() { return this.#markdown_accessor_storage; }
        set markdown(value) { this.#markdown_accessor_storage = value; }
        #diffService_accessor_storage;
        get diffService() { return this.#diffService_accessor_storage; }
        set diffService(value) { this.#diffService_accessor_storage = value; }
        #store_accessor_storage;
        get store() { return this.#store_accessor_storage; }
        set store(value) { this.#store_accessor_storage = value; }
        #onClose_accessor_storage;
        get onClose() { return this.#onClose_accessor_storage; }
        set onClose(value) { this.#onClose_accessor_storage = value; }
        async getOriginalMarkdown() {
            const markdown = await this.diffService.getMarkdownFromDoc(this.store);
            return markdown;
        }
        render() {
            return html `
      <div class="playground-modal">
        <div class="playground-modal-title">Block Diff Playground</div>
        <div class="playground-modal-content">
          <textarea
            class="playground-textarea"
            placeholder="Please input the markdown you want to apply."
            .value=${this.markdown}
            @input=${this.handleInput}
            @focus=${(e) => e.stopPropagation()}
            @pointerdown=${this.stopPropagation}
            @mousedown=${this.stopPropagation}
            @mouseup=${this.stopPropagation}
            @click=${this.stopPropagation}
            @keydown=${this.stopPropagation}
            @keyup=${this.stopPropagation}
            @copy=${this.stopPropagation}
            @cut=${this.stopPropagation}
            @paste=${this.stopPropagation}
            @blur=${(e) => e.stopPropagation()}
          ></textarea>
          <div class="playground-actions">
            <button
              class="playground-btn"
              @click=${this.handleInsertCurrentMarkdown}
            >
              Insert Current Doc MD
            </button>
            <button class="playground-btn" @click=${this.handleClear}>
              Clear
            </button>
            <button class="playground-btn primary" @click=${this.handleConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    `;
        }
    };
})();
export { BlockDiffPlaygroundModal };
let BlockDiffPlayground = (() => {
    let _classSuper = WidgetComponent;
    let _fab_decorators;
    let _fab_initializers = [];
    let _fab_extraInitializers = [];
    return class BlockDiffPlayground extends _classSuper {
        constructor() {
            super(...arguments);
            this.#fab_accessor_storage = __runInitializers(this, _fab_initializers, void 0);
            this._abortController = (__runInitializers(this, _fab_extraInitializers), null);
            this.handleOpen = () => {
                this._abortController?.abort();
                this._abortController = new AbortController();
                createLitPortal({
                    template: html `
        <affine-block-diff-playground-modal
          .diffService=${this.diffService}
          .store=${this.std.store}
          .onClose=${this.handleClose}
        ></affine-block-diff-playground-modal>
      `,
                    container: this.host,
                    computePosition: {
                        referenceElement: this.fab,
                        placement: 'top-end',
                    },
                    closeOnClickAway: true,
                    abortController: this._abortController,
                });
            };
            this.handleClose = () => {
                this._abortController?.abort();
            };
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _fab_decorators = [query('.playground-fab')];
            __esDecorate(this, null, _fab_decorators, { kind: "accessor", name: "fab", static: false, private: false, access: { has: obj => "fab" in obj, get: obj => obj.fab, set: (obj, value) => { obj.fab = value; } }, metadata: _metadata }, _fab_initializers, _fab_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .playground-fab {
      position: fixed;
      right: 32px;
      bottom: 32px;
      z-index: 9999;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: #1976d2;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      cursor: pointer;
      transition: background 0.2s;
    }
    .playground-fab:hover {
      background: #1565c0;
    }
  `; }
        #fab_accessor_storage;
        get fab() { return this.#fab_accessor_storage; }
        set fab(value) { this.#fab_accessor_storage = value; }
        get diffService() {
            return this.std.get(BlockDiffProvider);
        }
        render() {
            return html `
      <div>
        <div
          class="playground-fab"
          @click=${this.handleOpen}
          title="Block Diff Playground"
        >
          🧪
        </div>
      </div>
    `;
        }
    };
})();
export { BlockDiffPlayground };
export const blockDiffPlayground = WidgetViewExtension('affine:page', AFFINE_BLOCK_DIFF_PLAYGROUND, literal `${unsafeStatic(AFFINE_BLOCK_DIFF_PLAYGROUND)}`);
//# sourceMappingURL=playground.js.map