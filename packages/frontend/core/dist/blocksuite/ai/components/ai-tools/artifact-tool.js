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
import { SignalWatcher, WithDisposable } from '@blocksuite/affine/global/lit';
import { ShadowlessElement } from '@blocksuite/affine/std';
import { unsafeCSSVar, unsafeCSSVarV2 } from '@blocksuite/affine-shared/theme';
import { css, html, nothing, } from 'lit';
import { property } from 'lit/decorators.js';
import { isPreviewPanelOpen, renderPreviewPanel, } from './artifacts-preview-panel';
/**
 * Base web-component for AI artifact tools.
 * It encapsulates common reactive properties (data/std/width/…)
 * and automatically calls `updatePreviewPanel()` when the `data`
 * property changes while the preview panel is open.
 */
let ArtifactTool = (() => {
    let _classSuper = SignalWatcher(WithDisposable(ShadowlessElement));
    let _data_decorators;
    let _data_initializers = [];
    let _data_extraInitializers = [];
    let _theme_decorators;
    let _theme_initializers = [];
    let _theme_extraInitializers = [];
    return class ArtifactTool extends _classSuper {
        constructor() {
            super(...arguments);
            this.#data_accessor_storage = __runInitializers(this, _data_initializers, void 0);
            this.#theme_accessor_storage = (__runInitializers(this, _data_extraInitializers), __runInitializers(this, _theme_initializers, void 0));
            this.onCardClick = (__runInitializers(this, _theme_extraInitializers), (_e) => {
                this.openOrUpdatePreviewPanel();
            });
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _data_decorators = [property({ attribute: false })];
            _theme_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _data_decorators, { kind: "accessor", name: "data", static: false, private: false, access: { has: obj => "data" in obj, get: obj => obj.data, set: (obj, value) => { obj.data = value; } }, metadata: _metadata }, _data_initializers, _data_extraInitializers);
            __esDecorate(this, null, _theme_decorators, { kind: "accessor", name: "theme", static: false, private: false, access: { has: obj => "theme" in obj, get: obj => obj.theme, set: (obj, value) => { obj.theme = value; } }, metadata: _metadata }, _theme_initializers, _theme_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .artifact-tool-card {
      margin: 8px 0;
      padding: 10px 0;

      .affine-embed-linked-doc-block {
        box-shadow: ${unsafeCSSVar('buttonShadow')};
        cursor: pointer;
      }

      .affine-embed-linked-doc-block:hover {
        background-color: ${unsafeCSSVarV2('layer/background/hoverOverlay')};
      }
    }

    .artifact-skeleton-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;

      artifact-skeleton {
        margin-top: -24px;
      }
    }
  `; }
        #data_accessor_storage;
        /** Tool data coming from ChatGPT (tool-call / tool-result). */
        get data() { return this.#data_accessor_storage; }
        set data(value) { this.#data_accessor_storage = value; }
        #theme_accessor_storage;
        get theme() { return this.#theme_accessor_storage; }
        set theme(value) { this.#theme_accessor_storage = value; }
        /** Provide the action controls (right-side buttons) for the panel. */
        getPreviewControls() {
            return undefined;
        }
        /** Open or refresh the preview panel. */
        openOrUpdatePreviewPanel() {
            const content = this.isLoading()
                ? this.renderLoadingSkeleton()
                : this.getPreviewContent();
            renderPreviewPanel(this, content, this.getPreviewControls());
        }
        isLoading() {
            return this.data.type !== 'tool-result';
        }
        refreshPreviewPanel() {
            if (isPreviewPanelOpen(this)) {
                this.openOrUpdatePreviewPanel();
            }
        }
        /** Optionally override to show an error card. Return null if no error. */
        getErrorTemplate() {
            return null;
        }
        renderLoadingSkeleton() {
            const icon = this.getIcon();
            return html `<div class="artifact-skeleton-container">
      <artifact-skeleton .icon=${icon}></artifact-skeleton>
    </div>`;
        }
        renderCard() {
            const { title, className } = this.getCardMeta();
            const resolvedIcon = this.isLoading()
                ? LoadingIcon({ size: '20px' })
                : this.getIcon();
            const banner = this.getBanner(this.theme.value);
            return html `
      <div
        class="artifact-tool-card ${className ?? ''}"
        @click=${this.onCardClick}
      >
        <div class="affine-embed-linked-doc-block horizontal">
          <div class="affine-embed-linked-doc-content">
            <div class="affine-embed-linked-doc-content-title">
              <div class="affine-embed-linked-doc-content-title-icon">
                ${resolvedIcon}
              </div>
              <div class="affine-embed-linked-doc-content-title-text">
                ${title}
              </div>
            </div>
          </div>
          ${banner
                ? html `<div class="affine-embed-linked-doc-banner">${banner}</div>`
                : nothing}
        </div>
      </div>
    `;
        }
        connectedCallback() {
            super.connectedCallback();
            // open the preview panel immediately
            this.openOrUpdatePreviewPanel();
        }
        render() {
            const err = this.getErrorTemplate();
            if (err) {
                return err;
            }
            return this.renderCard();
        }
        updated(changed) {
            super.updated(changed);
            if (changed.has('data') && isPreviewPanelOpen(this)) {
                this.openOrUpdatePreviewPanel();
            }
        }
    };
})();
export { ArtifactTool };
//# sourceMappingURL=artifact-tool.js.map