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
import { WorkspaceImpl } from '@affine/core/modules/workspace/impls/workspace';
import { ViewExtensionManagerIdentifier } from '@blocksuite/affine/ext-loader';
import { WithDisposable } from '@blocksuite/affine/global/lit';
import { BlockStdScope } from '@blocksuite/affine/std';
import { css, html, LitElement, nothing } from 'lit';
import { property, query } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { Doc as YDoc } from 'yjs';
import { PPTBuilder } from '../slides/index';
import { getAIPanelWidget } from '../utils/ai-widgets';
export const createSlidesRenderer = (host, ctx) => {
    return (answer, state) => {
        if (state === 'generating') {
            const panel = getAIPanelWidget(host);
            panel.generatingElement?.updateLoadingProgress(2);
            return nothing;
        }
        if (state !== 'finished' && state !== 'error') {
            return nothing;
        }
        return html `<style>
        .slides-container {
          width: 100%;
          height: 300px;
        }
      </style>
      <div class="slides-container">
        <ai-slides-renderer
          .host=${host}
          .ctx=${ctx}
          .text=${answer}
        ></ai-slides-renderer>
      </div>`;
    };
};
let AISlidesRenderer = (() => {
    let _classSuper = WithDisposable(LitElement);
    let __editorHost_decorators;
    let __editorHost_initializers = [];
    let __editorHost_extraInitializers = [];
    let _text_decorators;
    let _text_initializers = [];
    let _text_extraInitializers = [];
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _ctx_decorators;
    let _ctx_initializers = [];
    let _ctx_extraInitializers = [];
    return class AISlidesRenderer extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __editorHost_decorators = [query('editor-host')];
            _text_decorators = [property({ attribute: false })];
            _host_decorators = [property({ attribute: false })];
            _ctx_decorators = [property({ attribute: false })];
            __esDecorate(this, null, __editorHost_decorators, { kind: "accessor", name: "_editorHost", static: false, private: false, access: { has: obj => "_editorHost" in obj, get: obj => obj._editorHost, set: (obj, value) => { obj._editorHost = value; } }, metadata: _metadata }, __editorHost_initializers, __editorHost_extraInitializers);
            __esDecorate(this, null, _text_decorators, { kind: "accessor", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _ctx_decorators, { kind: "accessor", name: "ctx", static: false, private: false, access: { has: obj => "ctx" in obj, get: obj => obj.ctx, set: (obj, value) => { obj.ctx = value; } }, metadata: _metadata }, _ctx_initializers, _ctx_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css ``; }
        #_editorHost_accessor_storage;
        get _editorHost() { return this.#_editorHost_accessor_storage; }
        set _editorHost(value) { this.#_editorHost_accessor_storage = value; }
        #text_accessor_storage;
        get text() { return this.#text_accessor_storage; }
        set text(value) { this.#text_accessor_storage = value; }
        #host_accessor_storage;
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #ctx_accessor_storage;
        get ctx() { return this.#ctx_accessor_storage; }
        set ctx(value) { this.#ctx_accessor_storage = value; }
        firstUpdated() {
            requestAnimationFrame(() => {
                if (!this._editorHost)
                    return;
                PPTBuilder(this._editorHost)
                    ?.process(this.text)
                    .then(res => {
                    if (res && this.ctx) {
                        this.ctx.set({
                            contents: res.contents,
                            images: res.images,
                        });
                        // refresh loading menu item
                        getAIPanelWidget(this.host)
                            .shadowRoot?.querySelector('ai-panel-answer')
                            ?.requestUpdate();
                    }
                })
                    .catch(console.error);
            });
        }
        _getExtensions() {
            return this.host.std
                .get(ViewExtensionManagerIdentifier)
                .get('preview-edgeless');
        }
        render() {
            return html `<style>
        .slides-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .edgeless-container {
          width: 100%;
          height: 100%;
          border-radius: 4px;
          border: 1px solid var(--affine-border-color);
        }

        .mask {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          background-color: transparent;
          width: 100%;
          height: 100%;
        }

        .edgeless-container affine-edgeless-zoom-toolbar-widget,
        edgeless-toolbar {
          display: none;
        }

        * {
          box-sizing: border-box;
        }

        .affine-edgeless-viewport {
          display: block;
          height: 100%;
          position: relative;
          overflow: hidden;
          container-name: viewport;
          container-type: inline-size;
        }

        .affine-edgeless-surface-block-container {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .affine-edgeless-surface-block-container canvas {
          width: 100%;
          height: 100%;
          position: relative;
          z-index: 1;
          pointer-events: none;
        }

        edgeless-block-portal-container {
          position: relative;
          box-sizing: border-box;
          overflow: hidden;
          display: block;
          height: 100%;
          font-family: var(--affine-font-family);
          font-size: var(--affine-font-base);
          line-height: var(--affine-line-height);
          color: var(--affine-text-primary-color);
          font-weight: 400;
        }

        .affine-block-children-container.edgeless {
          padding-left: 0;
          position: relative;
          overflow: hidden;
          height: 100%;
          touch-action: none;
          background-color: var(--affine-background-primary-color);
          background-image: radial-gradient(
            var(--affine-edgeless-grid-color) 1px,
            var(--affine-background-primary-color) 1px
          );
          z-index: 0;
        }

        .affine-edgeless-block-child {
          position: absolute;
          transform-origin: center;
          box-sizing: border-box;
          border: 2px solid var(--affine-white-10);
          border-radius: 8px;
          box-shadow: var(--affine-shadow-3);
          pointer-events: all;
        }

        affine-edgeless-image .resizable-img,
        affine-edgeless-image .resizable-img img {
          width: 100%;
          height: 100%;
        }

        .affine-edgeless-layer {
          position: absolute;
          top: 0;
          left: 0;
          contain: size layout style;
        }
      </style>
      <div class="slides-container">
        <div
          class="edgeless-container affine-edgeless-viewport"
          ${ref(this._editorContainer)}
        >
          ${new BlockStdScope({
                store: this._doc,
                extensions: this._getExtensions(),
            }).render()}
        </div>
        <div class="mask"></div>
      </div>`;
        }
        connectedCallback() {
            super.connectedCallback();
            const collection = new WorkspaceImpl({
                id: 'SLIDES_PREVIEW',
                rootDoc: new YDoc({ guid: 'SLIDES_PREVIEW' }),
            });
            collection.meta.initialize();
            const doc = collection.createDoc().getStore();
            doc.load(() => {
                const pageBlockId = doc.addBlock('affine:page', {});
                doc.addBlock('affine:surface', {}, pageBlockId);
            });
            doc.resetHistory();
            this._doc = doc;
            this._docCollection = collection;
        }
        disconnectedCallback() {
            this._docCollection?.dispose();
            super.disconnectedCallback();
        }
        constructor() {
            super(...arguments);
            this._editorContainer = createRef();
            this._docCollection = null;
            this.#_editorHost_accessor_storage = __runInitializers(this, __editorHost_initializers, void 0);
            this.#text_accessor_storage = (__runInitializers(this, __editorHost_extraInitializers), __runInitializers(this, _text_initializers, void 0));
            this.#host_accessor_storage = (__runInitializers(this, _text_extraInitializers), __runInitializers(this, _host_initializers, void 0));
            this.#ctx_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _ctx_initializers, undefined));
            __runInitializers(this, _ctx_extraInitializers);
        }
    };
})();
export { AISlidesRenderer };
//# sourceMappingURL=slides-renderer.js.map