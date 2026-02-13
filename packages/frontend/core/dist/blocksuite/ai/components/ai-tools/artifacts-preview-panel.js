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
import { unsafeCSSVar, unsafeCSSVarV2 } from '@blocksuite/affine/shared/theme';
import { ShadowlessElement } from '@blocksuite/affine/std';
import { EmptyIcon } from '@blocksuite/icons/lit';
import { css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
function getChatPanel(target) {
    return target.closest('ai-chat-content');
}
export const isPreviewPanelOpen = (target) => {
    const chatPanel = getChatPanel(target);
    return chatPanel?.isPreviewPanelOpen ?? false;
};
export const renderPreviewPanel = (target, content, controls) => {
    const chatPanel = getChatPanel(target);
    if (!chatPanel) {
        console.error('chat-panel not found');
        return;
    }
    const preview = html `<artifact-preview-panel
    .content=${content}
    .controls=${controls ?? nothing}
  ></artifact-preview-panel>`;
    chatPanel.openPreviewPanel(preview);
};
export const closePreviewPanel = (target) => {
    const chatPanel = getChatPanel(target);
    if (!chatPanel) {
        console.error('chat-panel not found');
        return;
    }
    chatPanel.closePreviewPanel();
};
let ArtifactPreviewPanel = (() => {
    let _classSuper = WithDisposable(ShadowlessElement);
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    let _controls_decorators;
    let _controls_initializers = [];
    let _controls_extraInitializers = [];
    return class ArtifactPreviewPanel extends _classSuper {
        constructor() {
            super(...arguments);
            this.#content_accessor_storage = __runInitializers(this, _content_initializers, null);
            this.#controls_accessor_storage = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _controls_initializers, null));
            this._handleClose = (__runInitializers(this, _controls_extraInitializers), () => {
                closePreviewPanel(this);
            });
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _content_decorators = [property({ attribute: false })];
            _controls_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _content_decorators, { kind: "accessor", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(this, null, _controls_decorators, { kind: "accessor", name: "controls", static: false, private: false, access: { has: obj => "controls" in obj, get: obj => obj.controls, set: (obj, value) => { obj.controls = value; } }, metadata: _metadata }, _controls_initializers, _controls_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .artifact-panel-preview-root {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 16px;
    }

    .artifact-preview-panel {
      border-radius: 16px;
      background-color: ${unsafeCSSVarV2('layer/background/overlayPanel')};
      box-shadow: ${unsafeCSSVar('overlayPanelShadow')};
      height: 100%;
      overflow: hidden;
    }

    .artifact-panel-header {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 12px;
      height: 52px;
      background: ${unsafeCSSVarV2('layer/background/overlayPanel')};
    }

    .artifact-panel-title {
      font-size: 16px;
      font-weight: 600;
      color: ${unsafeCSSVarV2('text/primary')};
    }

    .artifact-panel-actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 4px;
      flex: 1;
    }

    .artifact-panel-close {
      margin-left: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
      color: ${unsafeCSSVarV2('icon/secondary')};
    }

    .artifact-panel-content {
      overflow-y: auto;
      height: calc(100% - 52px);
      position: relative;
    }

    .artifact-panel-close:hover {
      background-color: ${unsafeCSSVarV2('layer/background/tertiary')};
    }
  `; }
        #content_accessor_storage;
        get content() { return this.#content_accessor_storage; }
        set content(value) { this.#content_accessor_storage = value; }
        #controls_accessor_storage;
        get controls() { return this.#controls_accessor_storage; }
        set controls(value) { this.#controls_accessor_storage = value; }
        render() {
            return html `<div class="artifact-panel-preview-root">
      <div class="artifact-preview-panel">
        <div class="artifact-panel-header">
          <div class="artifact-panel-actions">
            ${this.controls ?? nothing}
            <icon-button
              class="artifact-panel-close"
              @click=${this._handleClose}
            >
              ${EmptyIcon({ width: '24', height: '24' })}
            </icon-button>
          </div>
        </div>
        <div class="artifact-panel-content">${this.content}</div>
      </div>
    </div>`;
        }
    };
})();
export { ArtifactPreviewPanel };
//# sourceMappingURL=artifacts-preview-panel.js.map