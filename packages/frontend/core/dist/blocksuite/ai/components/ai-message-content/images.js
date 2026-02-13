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
import { unsafeCSSVar } from '@blocksuite/affine/shared/theme';
import { ShadowlessElement } from '@blocksuite/affine/std';
import { css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
let ChatContentImages = (() => {
    let _classSuper = WithDisposable(ShadowlessElement);
    let _images_decorators;
    let _images_initializers = [];
    let _images_extraInitializers = [];
    let _layout_decorators;
    let _layout_initializers = [];
    let _layout_extraInitializers = [];
    return class ChatContentImages extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _images_decorators = [property({ attribute: false })];
            _layout_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _images_decorators, { kind: "accessor", name: "images", static: false, private: false, access: { has: obj => "images" in obj, get: obj => obj.images, set: (obj, value) => { obj.images = value; } }, metadata: _metadata }, _images_initializers, _images_extraInitializers);
            __esDecorate(this, null, _layout_decorators, { kind: "accessor", name: "layout", static: false, private: false, access: { has: obj => "layout" in obj, get: obj => obj.layout, set: (obj, value) => { obj.layout = value; } }, metadata: _metadata }, _layout_initializers, _layout_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .chat-content-images-row {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      gap: 8px;
      margin-bottom: 8px;
      max-width: 100%;
      overflow-x: auto;
      padding: 4px;
      scrollbar-width: auto;
    }

    .chat-content-images-row::-webkit-scrollbar {
      height: 4px;
    }

    .chat-content-images-row::-webkit-scrollbar-thumb {
      background-color: ${unsafeCSSVar('borderColor')};
      border-radius: 4px;
    }

    .chat-content-images-row::-webkit-scrollbar-track {
      background: transparent;
    }

    .chat-content-images-row img {
      max-width: 180px;
      max-height: 264px;
      object-fit: cover;
      border-radius: 8px;
      flex-shrink: 0;
      image-rendering: pixelated;
    }

    .chat-content-images-column {
      display: flex;
      gap: 12px;
      flex-direction: column;
      margin-bottom: 8px;
    }

    .chat-content-images-column .image-container {
      border-radius: 4px;
      overflow: hidden;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70%;
      max-width: 320px;
    }

    .chat-content-images-column .image-container img {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      image-rendering: pixelated;
    }
  `; }
        #images_accessor_storage = __runInitializers(this, _images_initializers, []);
        get images() { return this.#images_accessor_storage; }
        set images(value) { this.#images_accessor_storage = value; }
        #layout_accessor_storage = (__runInitializers(this, _images_extraInitializers), __runInitializers(this, _layout_initializers, 'row'));
        get layout() { return this.#layout_accessor_storage; }
        set layout(value) { this.#layout_accessor_storage = value; }
        render() {
            if (this.images.length === 0) {
                return nothing;
            }
            if (this.layout === 'row') {
                return html `<div class="chat-content-images-row">
        ${repeat(this.images, image => image, image => html `<img src="${image}" />`)}
      </div>`;
            }
            else {
                return html `<div class="chat-content-images-column">
        ${repeat(this.images, image => image, image => html `<div class="image-container">
              <img src="${image}" />
            </div>`)}
      </div>`;
            }
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _layout_extraInitializers);
        }
    };
})();
export { ChatContentImages };
//# sourceMappingURL=images.js.map