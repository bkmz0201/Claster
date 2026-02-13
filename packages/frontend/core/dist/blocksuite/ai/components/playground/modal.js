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
import { ShadowlessElement } from '@blocksuite/affine/std';
import { CloseIcon } from '@blocksuite/icons/lit';
import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
/**
 * A modal component for AI Playground
 */
let PlaygroundModal = (() => {
    let _classSuper = ShadowlessElement;
    let _modalTitle_decorators;
    let _modalTitle_initializers = [];
    let _modalTitle_extraInitializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    let _onClose_decorators;
    let _onClose_initializers = [];
    let _onClose_extraInitializers = [];
    return class PlaygroundModal extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _modalTitle_decorators = [property({ attribute: false })];
            _content_decorators = [property({ attribute: false })];
            _onClose_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _modalTitle_decorators, { kind: "accessor", name: "modalTitle", static: false, private: false, access: { has: obj => "modalTitle" in obj, get: obj => obj.modalTitle, set: (obj, value) => { obj.modalTitle = value; } }, metadata: _metadata }, _modalTitle_initializers, _modalTitle_extraInitializers);
            __esDecorate(this, null, _content_decorators, { kind: "accessor", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(this, null, _onClose_decorators, { kind: "accessor", name: "onClose", static: false, private: false, access: { has: obj => "onClose" in obj, get: obj => obj.onClose, set: (obj, value) => { obj.onClose = value; } }, metadata: _metadata }, _onClose_initializers, _onClose_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    playground-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100;
      background-color: rgba(0, 0, 0, 0.4);
    }

    .playground-modal-container {
      position: relative;
      width: 90%;
      height: 90%;
      background-color: var(--affine-background-primary-color);
      border-radius: 12px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .playground-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid var(--affine-border-color);
    }

    .playground-modal-title {
      font-size: 18px;
      font-weight: 600;
      color: var(--affine-text-primary-color);
    }

    .playground-modal-close {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 4px;
    }

    .playground-modal-close:hover {
      background-color: var(--affine-hover-color);
    }

    .playground-modal-content {
      flex: 1;
      overflow-y: auto;
    }
  `; }
        _close() {
            this.remove();
            this.onClose?.();
        }
        connectedCallback() {
            super.connectedCallback();
            document.addEventListener('keydown', this._handleKeyDown);
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            document.removeEventListener('keydown', this._handleKeyDown);
        }
        render() {
            return html `
      <div class="playground-modal-container">
        <div class="playground-modal-header">
          <div class="playground-modal-title">${this.modalTitle}</div>
          <div @click="${this._close}" class="playground-modal-close">
            ${CloseIcon()}
          </div>
        </div>
        <div class="playground-modal-content">${this.content}</div>
      </div>
    `;
        }
        #modalTitle_accessor_storage;
        get modalTitle() { return this.#modalTitle_accessor_storage; }
        set modalTitle(value) { this.#modalTitle_accessor_storage = value; }
        #content_accessor_storage;
        get content() { return this.#content_accessor_storage; }
        set content(value) { this.#content_accessor_storage = value; }
        #onClose_accessor_storage;
        get onClose() { return this.#onClose_accessor_storage; }
        set onClose(value) { this.#onClose_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._handleKeyDown = (e) => {
                if (e.key === 'Escape') {
                    this._close();
                }
            };
            this.#modalTitle_accessor_storage = __runInitializers(this, _modalTitle_initializers, '');
            this.#content_accessor_storage = (__runInitializers(this, _modalTitle_extraInitializers), __runInitializers(this, _content_initializers, html `
    <div>Welcome to the AI Playground!</div>
  `));
            this.#onClose_accessor_storage = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _onClose_initializers, undefined));
            __runInitializers(this, _onClose_extraInitializers);
        }
    };
})();
export { PlaygroundModal };
/**
 * Creates and displays a modal with the provided content
 */
export const createPlaygroundModal = (content, title) => {
    // Create the modal element
    const modal = document.createElement('playground-modal');
    modal.modalTitle = title;
    modal.content = content;
    // Add the modal to the document body
    document.body.append(modal);
    return modal;
};
//# sourceMappingURL=modal.js.map