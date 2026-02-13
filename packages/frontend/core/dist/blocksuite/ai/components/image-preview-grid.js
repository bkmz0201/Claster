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
import { scrollbarStyle } from '@blocksuite/affine/shared/styles';
import { CloseIcon } from '@blocksuite/icons/lit';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
let ImagePreviewGrid = (() => {
    let _classSuper = LitElement;
    let _images_decorators;
    let _images_initializers = [];
    let _images_extraInitializers = [];
    let _onImageRemove_decorators;
    let _onImageRemove_initializers = [];
    let _onImageRemove_extraInitializers = [];
    return class ImagePreviewGrid extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _images_decorators = [property({ type: Array })];
            _onImageRemove_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _images_decorators, { kind: "accessor", name: "images", static: false, private: false, access: { has: obj => "images" in obj, get: obj => obj.images, set: (obj, value) => { obj.images = value; } }, metadata: _metadata }, _images_initializers, _images_extraInitializers);
            __esDecorate(this, null, _onImageRemove_decorators, { kind: "accessor", name: "onImageRemove", static: false, private: false, access: { has: obj => "onImageRemove" in obj, get: obj => obj.onImageRemove, set: (obj, value) => { obj.onImageRemove = value; } }, metadata: _metadata }, _onImageRemove_initializers, _onImageRemove_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .image-preview-wrapper {
      overflow-x: auto;
      overflow-y: hidden;
      max-height: 80px;
      white-space: nowrap;

      /* to prevent the close button from being clipped */
      padding-top: 8px;
      margin-top: -8px;
    }

    ${scrollbarStyle('.image-preview-wrapper')}

    .images-container {
      display: flex;
      flex-direction: row;
      gap: 8px;
      flex-wrap: nowrap;
      position: relative;
    }

    .image-container {
      width: 68px;
      height: 68px;
      border-radius: 4px;
      cursor: pointer;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 0 0 auto;
      border: 1px solid var(--affine-v2-layer-insideBorder-border);
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    .close-wrapper {
      width: 16px;
      height: 16px;
      border-radius: 4px;
      border: 0.5px solid var(--affine-v2-layer-insideBorder-border);
      justify-content: center;
      align-items: center;
      display: none;
      position: absolute;
      background-color: var(--affine-v2-layer-background-primary);
      color: var(--affine-v2-icon-primary);
      z-index: 1;
      cursor: pointer;
      top: -6px;
      right: -6px;
    }

    .image-container:hover .close-wrapper {
      display: flex;
    }

    .close-wrapper:hover {
      background-color: var(--affine-v2-layer-background-error);
      border: 0.5px solid var(--affine-v2-button-error);
      color: var(--affine-v2-button-error);
    }
  `; }
        _getFileKey(file) {
            return `${file.name}-${file.size}-${file.lastModified}`;
        }
        _disposeUrls() {
            for (const [_, url] of this._urlMap.entries()) {
                URL.revokeObjectURL(url);
            }
            this._urlRefCount.clear();
            this._urlMap.clear();
        }
        /**
         * get the object url of the file
         * @param file - the file to get the url
         * @returns the object url
         */
        _getObjectUrl(file) {
            const key = this._getFileKey(file);
            let url = this._urlMap.get(key);
            if (!url) {
                // if the url is not in the map, create a new one
                // and set the ref count to 0
                url = URL.createObjectURL(file);
                this._urlMap.set(key, url);
                this._urlRefCount.set(url, 0);
            }
            // if the url is in the map, increment the ref count
            const refCount = this._urlRefCount.get(url) || 0;
            this._urlRefCount.set(url, refCount + 1);
            return url;
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this._disposeUrls();
        }
        render() {
            return html `
      <div class="image-preview-wrapper">
        <div class="images-container">
          ${repeat(this.images, image => this._getFileKey(image), (image, index) => {
                const url = this._getObjectUrl(image);
                return html `
                <div
                  class="image-container"
                  @error=${() => this._releaseObjectUrl(url)}
                  style=${styleMap({
                    backgroundImage: `url(${url})`,
                })}
                >
                  <div
                    class="close-wrapper"
                    @click=${() => this._handleDelete(index)}
                  >
                    ${CloseIcon()}
                  </div>
                </div>
              `;
            })}
        </div>
      </div>
    `;
        }
        #images_accessor_storage;
        get images() { return this.#images_accessor_storage; }
        set images(value) { this.#images_accessor_storage = value; }
        #onImageRemove_accessor_storage;
        get onImageRemove() { return this.#onImageRemove_accessor_storage; }
        set onImageRemove(value) { this.#onImageRemove_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._urlMap = new Map();
            this._urlRefCount = new Map();
            /**
             * decrement the reference count of the url
             * when the reference count is 0, revoke the url
             * @param url - the url to release
             */
            this._releaseObjectUrl = (url) => {
                const count = this._urlRefCount.get(url) || 0;
                if (count <= 1) {
                    // when the last reference is released, revoke the url
                    URL.revokeObjectURL(url);
                    this._urlRefCount.delete(url);
                    // also delete the url from the map
                    for (const [key, value] of this._urlMap.entries()) {
                        if (value === url) {
                            this._urlMap.delete(key);
                            break;
                        }
                    }
                }
                else {
                    // when the reference count is greater than 1, decrement the count
                    this._urlRefCount.set(url, count - 1);
                }
            };
            this._handleDelete = (index) => {
                const file = this.images[index];
                const url = this._getObjectUrl(file);
                this._releaseObjectUrl(url);
                this.onImageRemove?.(index);
            };
            this.#images_accessor_storage = __runInitializers(this, _images_initializers, []);
            this.#onImageRemove_accessor_storage = (__runInitializers(this, _images_extraInitializers), __runInitializers(this, _onImageRemove_initializers, null));
            __runInitializers(this, _onImageRemove_extraInitializers);
        }
    };
})();
export { ImagePreviewGrid };
//# sourceMappingURL=image-preview-grid.js.map