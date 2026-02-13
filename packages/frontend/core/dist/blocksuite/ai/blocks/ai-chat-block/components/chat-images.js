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
import { LoadingIcon } from '@blocksuite/affine/components/icons';
import { css, html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { repeat } from 'lit/directives/repeat.js';
import { ImageLoadingFailedIcon } from './icon';
let ChatImage = (() => {
    let _classSuper = LitElement;
    let _imageUrl_decorators;
    let _imageUrl_initializers = [];
    let _imageUrl_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    return class ChatImage extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _imageUrl_decorators = [property({ attribute: false })];
            _status_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _imageUrl_decorators, { kind: "accessor", name: "imageUrl", static: false, private: false, access: { has: obj => "imageUrl" in obj, get: obj => obj.imageUrl, set: (obj, value) => { obj.imageUrl = value; } }, metadata: _metadata }, _imageUrl_initializers, _imageUrl_extraInitializers);
            __esDecorate(this, null, _status_decorators, { kind: "accessor", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .image-container {
      border-radius: 4px;
      overflow: hidden;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70%;
      max-width: 200px;
      max-height: 122px;

      img {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
      }
    }
  `; }
        render() {
            return choose(this.status, [
                [
                    'loading',
                    () => html `<image-placeholder
            .text=${'Loading image'}
            .icon=${LoadingIcon()}
          ></image-placeholder>`,
                ],
                [
                    'error',
                    () => html `<image-placeholder
            .text=${'Image Loading Failed'}
            .icon=${ImageLoadingFailedIcon}
          ></image-placeholder>`,
                ],
                [
                    'success',
                    () => html `<div class="image-container">
            <img src=${this.imageUrl} />
          </div>`,
                ],
            ]);
        }
        #imageUrl_accessor_storage = __runInitializers(this, _imageUrl_initializers, void 0);
        get imageUrl() { return this.#imageUrl_accessor_storage; }
        set imageUrl(value) { this.#imageUrl_accessor_storage = value; }
        #status_accessor_storage = (__runInitializers(this, _imageUrl_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        get status() { return this.#status_accessor_storage; }
        set status(value) { this.#status_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _status_extraInitializers);
        }
    };
})();
export { ChatImage };
let ChatImages = (() => {
    let _classSuper = LitElement;
    let _attachments_decorators;
    let _attachments_initializers = [];
    let _attachments_extraInitializers = [];
    return class ChatImages extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _attachments_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _attachments_decorators, { kind: "accessor", name: "attachments", static: false, private: false, access: { has: obj => "attachments" in obj, get: obj => obj.attachments, set: (obj, value) => { obj.attachments = value; } }, metadata: _metadata }, _attachments_initializers, _attachments_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .images-container {
      display: flex;
      width: 100%;
      gap: 8px;
      flex-wrap: wrap;
    }
  `; }
        render() {
            if (!this.attachments || this.attachments.length === 0) {
                return nothing;
            }
            return html `<div class="images-container">
      ${repeat(this.attachments, attachment => attachment, attachment => html `<chat-image
            .imageUrl=${attachment}
            .status=${'success'}
          ></chat-image>`)}
    </div>`;
        }
        #attachments_accessor_storage = __runInitializers(this, _attachments_initializers, void 0);
        get attachments() { return this.#attachments_accessor_storage; }
        set attachments(value) { this.#attachments_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _attachments_extraInitializers);
        }
    };
})();
export { ChatImages };
//# sourceMappingURL=chat-images.js.map