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
import { CodeBlockPreviewExtension } from '@blocksuite/affine/blocks/code';
import { SignalWatcher, WithDisposable } from '@blocksuite/affine/global/lit';
import { unsafeCSSVarV2 } from '@blocksuite/affine/shared/theme';
import { ShadowlessElement } from '@blocksuite/std';
import { css, html, nothing } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { styleMap } from 'lit/directives/style-map.js';
export const CodeBlockMermaidPreview = CodeBlockPreviewExtension('mermaid', model => html `<mermaid-preview .model=${model}></mermaid-preview>`);
let MermaidPreview = (() => {
    let _classSuper = SignalWatcher(WithDisposable(ShadowlessElement));
    let _model_decorators;
    let _model_initializers = [];
    let _model_extraInitializers = [];
    let _mermaidCode_decorators;
    let _mermaidCode_initializers = [];
    let _mermaidCode_extraInitializers = [];
    let _state_decorators;
    let _state_initializers = [];
    let _state_extraInitializers = [];
    let _svgContent_decorators;
    let _svgContent_initializers = [];
    let _svgContent_extraInitializers = [];
    let _container_decorators;
    let _container_initializers = [];
    let _container_extraInitializers = [];
    return class MermaidPreview extends _classSuper {
        constructor() {
            super(...arguments);
            this.#model_accessor_storage = __runInitializers(this, _model_initializers, null);
            this.#mermaidCode_accessor_storage = (__runInitializers(this, _model_extraInitializers), __runInitializers(this, _mermaidCode_initializers, null));
            this.#state_accessor_storage = (__runInitializers(this, _mermaidCode_extraInitializers), __runInitializers(this, _state_initializers, 'loading'));
            this.#svgContent_accessor_storage = (__runInitializers(this, _state_extraInitializers), __runInitializers(this, _svgContent_initializers, ''));
            this.#container_accessor_storage = (__runInitializers(this, _svgContent_extraInitializers), __runInitializers(this, _container_initializers, void 0));
            this.mermaid = (__runInitializers(this, _container_extraInitializers), null);
            this.retryCount = 0;
            this.maxRetries = 3;
            this.renderTimeout = null;
            this.isRendering = false;
            // zoom and pan
            this.scale = 1;
            this.translateX = 0;
            this.translateY = 0;
            this.isDragging = false;
            this.lastMouseX = 0;
            this.lastMouseY = 0;
            this._handleMouseDown = (event) => {
                if (event.button !== 0)
                    return; // only handle left click
                this.isDragging = true;
                this.lastMouseX = event.clientX;
                this.lastMouseY = event.clientY;
                this.container.style.cursor = 'grabbing';
            };
            this._handleMouseMove = (event) => {
                if (!this.isDragging)
                    return;
                const deltaX = event.clientX - this.lastMouseX;
                const deltaY = event.clientY - this.lastMouseY;
                this.translateX += deltaX;
                this.translateY += deltaY;
                this.lastMouseX = event.clientX;
                this.lastMouseY = event.clientY;
                this._updateTransform();
            };
            this._handleMouseUp = () => {
                this.isDragging = false;
                this.container.style.cursor = 'grab';
            };
            this._handleWheel = (event) => {
                event.preventDefault();
                const delta = event.deltaY > 0 ? 0.9 : 1.1;
                const newScale = Math.max(0.1, Math.min(5, this.scale * delta));
                // calculate mouse position relative to container
                const rect = this.container.getBoundingClientRect();
                const mouseX = event.clientX - rect.left;
                const mouseY = event.clientY - rect.top;
                // calculate scale center point
                const scaleCenterX = mouseX - this.translateX;
                const scaleCenterY = mouseY - this.translateY;
                // update transform
                this.scale = newScale;
                this.translateX = mouseX - scaleCenterX * (newScale / this.scale);
                this.translateY = mouseY - scaleCenterY * (newScale / this.scale);
                this._updateTransform();
            };
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _model_decorators = [property({ attribute: false })];
            _mermaidCode_decorators = [property({ attribute: false })];
            _state_decorators = [state()];
            _svgContent_decorators = [state()];
            _container_decorators = [query('.mermaid-preview-container')];
            __esDecorate(this, null, _model_decorators, { kind: "accessor", name: "model", static: false, private: false, access: { has: obj => "model" in obj, get: obj => obj.model, set: (obj, value) => { obj.model = value; } }, metadata: _metadata }, _model_initializers, _model_extraInitializers);
            __esDecorate(this, null, _mermaidCode_decorators, { kind: "accessor", name: "mermaidCode", static: false, private: false, access: { has: obj => "mermaidCode" in obj, get: obj => obj.mermaidCode, set: (obj, value) => { obj.mermaidCode = value; } }, metadata: _metadata }, _mermaidCode_initializers, _mermaidCode_extraInitializers);
            __esDecorate(this, null, _state_decorators, { kind: "accessor", name: "state", static: false, private: false, access: { has: obj => "state" in obj, get: obj => obj.state, set: (obj, value) => { obj.state = value; } }, metadata: _metadata }, _state_initializers, _state_extraInitializers);
            __esDecorate(this, null, _svgContent_decorators, { kind: "accessor", name: "svgContent", static: false, private: false, access: { has: obj => "svgContent" in obj, get: obj => obj.svgContent, set: (obj, value) => { obj.svgContent = value; } }, metadata: _metadata }, _svgContent_initializers, _svgContent_extraInitializers);
            __esDecorate(this, null, _container_decorators, { kind: "accessor", name: "container", static: false, private: false, access: { has: obj => "container" in obj, get: obj => obj.container, set: (obj, value) => { obj.container = value; } }, metadata: _metadata }, _container_initializers, _container_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .mermaid-preview-loading {
      color: ${unsafeCSSVarV2('text/placeholder')};
      font-feature-settings:
        'liga' off,
        'clig' off;

      /* light/code/base */
      font-family: 'IBM Plex Mono';
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .mermaid-preview-error,
    .mermaid-preview-fallback {
      color: ${unsafeCSSVarV2('button/error')};
      font-feature-settings:
        'liga' off,
        'clig' off;

      /* light/code/base */
      font-family: 'IBM Plex Mono';
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .mermaid-preview-container {
      width: 100%;
      min-height: 300px;
      max-height: 600px;
      border: 1px solid ${unsafeCSSVarV2('layer/insideBorder/border')};
      border-radius: 8px;
      background: ${unsafeCSSVarV2('layer/background/primary')};
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      overflow: hidden;
      position: relative;
      cursor: grab;
    }

    .mermaid-preview-container:active {
      cursor: grabbing;
    }

    .mermaid-preview-svg {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.1s ease-out;
    }

    .mermaid-preview-svg > div {
      transform-origin: center;
    }

    .mermaid-preview-svg svg {
      transform-origin: center;
    }

    .mermaid-controls {
      position: absolute;
      top: 8px;
      right: 8px;
      display: flex;
      gap: 4px;
      z-index: 10;
    }

    .mermaid-control-button {
      width: 32px;
      height: 32px;
      border: 1px solid ${unsafeCSSVarV2('layer/insideBorder/border')};
      border-radius: 4px;
      background: ${unsafeCSSVarV2('layer/background/primary')};
      color: ${unsafeCSSVarV2('text/primary')};
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      transition: all 0.2s ease;
    }

    .mermaid-control-button:hover {
      background: ${unsafeCSSVarV2('layer/background/hoverOverlay')};
      border-color: ${unsafeCSSVarV2('layer/insideBorder/primaryBorder')};
    }

    .mermaid-control-button:active {
      transform: scale(0.95);
    }

    .mermaid-control-button.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .mermaid-scale-info {
      position: absolute;
      bottom: 8px;
      left: 8px;
      background: ${unsafeCSSVarV2('layer/background/overlayPanel')};
      border: 1px solid ${unsafeCSSVarV2('layer/insideBorder/border')};
      border-radius: 4px;
      padding: 4px 8px;
      font-size: 12px;
      color: ${unsafeCSSVarV2('text/secondary')};
      z-index: 10;
    }
  `; }
        #model_accessor_storage;
        get model() { return this.#model_accessor_storage; }
        set model(value) { this.#model_accessor_storage = value; }
        #mermaidCode_accessor_storage;
        get mermaidCode() { return this.#mermaidCode_accessor_storage; }
        set mermaidCode(value) { this.#mermaidCode_accessor_storage = value; }
        #state_accessor_storage;
        get state() { return this.#state_accessor_storage; }
        set state(value) { this.#state_accessor_storage = value; }
        #svgContent_accessor_storage;
        get svgContent() { return this.#svgContent_accessor_storage; }
        set svgContent(value) { this.#svgContent_accessor_storage = value; }
        #container_accessor_storage;
        get container() { return this.#container_accessor_storage; }
        set container(value) { this.#container_accessor_storage = value; }
        firstUpdated(_changedProperties) {
            this._loadMermaid().catch(error => {
                console.error('Failed to load mermaid in firstUpdated:', error);
            });
            this._scheduleRender();
            this._setupEventListeners();
            if (this.model) {
                this.disposables.add(this.model.props.text$.subscribe(() => {
                    this._scheduleRender();
                }));
            }
        }
        willUpdate(changedProperties) {
            if (changedProperties.has('mermaidCode')) {
                this._scheduleRender();
            }
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            // clear timeout
            if (this.renderTimeout) {
                clearTimeout(this.renderTimeout);
                this.renderTimeout = null;
            }
        }
        get normalizedMermaidCode() {
            return this.model?.props.text.toString() ?? this.mermaidCode;
        }
        _scheduleRender() {
            // clear previous timeout
            if (this.renderTimeout) {
                clearTimeout(this.renderTimeout);
            }
            // set debounce timeout
            this.renderTimeout = setTimeout(() => {
                this._render().catch(error => {
                    console.error('Failed to render in timeout:', error);
                });
            }, 100);
        }
        _resetTransform() {
            this.scale = 1;
            this.translateX = 0;
            this.translateY = 0;
            this._updateTransform();
        }
        _zoomIn() {
            this.scale = Math.min(this.scale * 1.2, 5);
            this._updateTransform();
        }
        _zoomOut() {
            this.scale = Math.max(this.scale / 1.2, 0.1);
            this._updateTransform();
        }
        _updateTransform() {
            // trigger re-render to update transform
            this.requestUpdate();
        }
        _setupEventListeners() {
            // mouse events
            this.disposables.addFromEvent(this.container, 'mousedown', this._handleMouseDown);
            this.disposables.addFromEvent(document, 'mousemove', this._handleMouseMove);
            this.disposables.addFromEvent(document, 'mouseup', this._handleMouseUp);
            // wheel events
            this.disposables.addFromEvent(this.container, 'wheel', this._handleWheel);
            // prevent text selection when dragging
            this.disposables.addFromEvent(this.container, 'selectstart', e => e.preventDefault());
        }
        async _loadMermaid() {
            try {
                // dynamic load mermaid
                const mermaidModule = await import('mermaid');
                this.mermaid = mermaidModule.default;
                // initialize mermaid
                this.mermaid.initialize({
                    startOnLoad: false,
                    theme: 'default',
                    securityLevel: 'strict',
                    fontFamily: 'IBM Plex Mono',
                    flowchart: {
                        useMaxWidth: true,
                        htmlLabels: true,
                    },
                    sequence: {
                        useMaxWidth: true,
                    },
                    gantt: {
                        useMaxWidth: true,
                    },
                    pie: {
                        useMaxWidth: true,
                    },
                    journey: {
                        useMaxWidth: true,
                    },
                    gitGraph: {
                        useMaxWidth: true,
                    },
                });
            }
            catch (error) {
                console.error('Failed to load mermaid:', error);
                this.state = 'error';
            }
        }
        async _render() {
            // prevent duplicate rendering
            if (this.isRendering) {
                return;
            }
            this.isRendering = true;
            this.state = 'loading';
            if (!this.normalizedMermaidCode) {
                this.state = 'fallback';
                this.isRendering = false;
                return;
            }
            if (!this.mermaid) {
                await this._loadMermaid();
            }
            if (!this.mermaid) {
                return;
            }
            try {
                // generate unique ID
                const diagramId = `mermaid-diagram-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                // generate SVG
                const { svg } = await this.mermaid.render(diagramId, this.normalizedMermaidCode);
                // update SVG content
                this.svgContent = svg;
                this.state = 'finish';
                this.retryCount = 0; // reset retry count
                // reset transform
                this._resetTransform();
            }
            catch (error) {
                console.error('Mermaid preview failed:', error);
                // retry mechanism
                if (this.retryCount < this.maxRetries) {
                    this.retryCount++;
                    console.log(`Retrying mermaid render (${this.retryCount}/${this.maxRetries})`);
                    setTimeout(() => {
                        this._render().catch(error => {
                            console.error('Failed to render in retry:', error);
                        });
                    }, 1000); // retry after 1 second
                    return;
                }
                this.state = 'error';
                this.retryCount = 0; // reset retry count
            }
            finally {
                this.isRendering = false;
            }
        }
        render() {
            return html `
      <div class="mermaid-preview-wrapper">
        ${choose(this.state, [
                [
                    'loading',
                    () => html `<div class="mermaid-preview-loading">
                <div style="text-align: center; padding: 20px;">
                  <div style="margin-bottom: 8px;">
                    Rendering Mermaid diagram...
                  </div>
                  <div style="font-size: 10px; opacity: 0.6;">Please wait</div>
                </div>
              </div>`,
                ],
                [
                    'error',
                    () => html `<div class="mermaid-preview-error">
                <div style="text-align: center; padding: 20px;">
                  <div style="margin-bottom: 8px;">
                    Failed to render diagram
                  </div>
                  <div style="font-size: 10px; opacity: 0.6;">
                    Please check if your Mermaid code has syntax errors
                  </div>
                </div>
              </div>`,
                ],
                [
                    'fallback',
                    () => html `<div class="mermaid-preview-fallback">
                <div style="text-align: center; padding: 20px;">
                  <div style="margin-bottom: 8px;">Mermaid preview feature</div>
                  <div style="font-size: 10px; opacity: 0.6;">
                    This feature is not supported in your browser
                  </div>
                </div>
              </div>`,
                ],
            ])}
        <div
          class="mermaid-preview-container"
          style=${styleMap({
                display: this.state === 'finish' ? undefined : 'none',
            })}
        >
          ${this.state === 'finish'
                ? html `
                <div
                  class="mermaid-preview-svg"
                  style=${styleMap({
                    transform: `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`,
                })}
                >
                  ${this.svgContent
                    ? html `<div .innerHTML=${this.svgContent}></div>`
                    : nothing}
                </div>
                <div class="mermaid-controls">
                  <button
                    class="mermaid-control-button"
                    @click=${this._zoomIn}
                    title="Zoom in"
                  >
                    +
                  </button>
                  <button
                    class="mermaid-control-button"
                    @click=${this._zoomOut}
                    title="Zoom out"
                  >
                    −
                  </button>
                  <button
                    class="mermaid-control-button"
                    @click=${this._resetTransform}
                    title="Reset view"
                  >
                    ⟳
                  </button>
                </div>
                <div class="mermaid-scale-info">
                  ${Math.round(this.scale * 100)}%
                </div>
              `
                : nothing}
        </div>
      </div>
    `;
        }
    };
})();
export { MermaidPreview };
export function effects() {
    customElements.define('mermaid-preview', MermaidPreview);
}
//# sourceMappingURL=mermaid-preview.js.map