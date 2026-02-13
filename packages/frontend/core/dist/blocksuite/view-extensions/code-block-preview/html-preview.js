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
import { css, html } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { styleMap } from 'lit/directives/style-map.js';
import { linkIframe } from './iframe-container';
export const CodeBlockHtmlPreview = CodeBlockPreviewExtension('html', model => html `<html-preview .model=${model}></html-preview>`);
let HTMLPreview = (() => {
    let _classSuper = SignalWatcher(WithDisposable(ShadowlessElement));
    let _model_decorators;
    let _model_initializers = [];
    let _model_extraInitializers = [];
    let _html_decorators;
    let _html_initializers = [];
    let _html_extraInitializers = [];
    let _state_decorators;
    let _state_initializers = [];
    let _state_extraInitializers = [];
    let _iframe_decorators;
    let _iframe_initializers = [];
    let _iframe_extraInitializers = [];
    return class HTMLPreview extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _model_decorators = [property({ attribute: false })];
            _html_decorators = [property({ attribute: false })];
            _state_decorators = [state()];
            _iframe_decorators = [query('iframe')];
            __esDecorate(this, null, _model_decorators, { kind: "accessor", name: "model", static: false, private: false, access: { has: obj => "model" in obj, get: obj => obj.model, set: (obj, value) => { obj.model = value; } }, metadata: _metadata }, _model_initializers, _model_extraInitializers);
            __esDecorate(this, null, _html_decorators, { kind: "accessor", name: "html", static: false, private: false, access: { has: obj => "html" in obj, get: obj => obj.html, set: (obj, value) => { obj.html = value; } }, metadata: _metadata }, _html_initializers, _html_extraInitializers);
            __esDecorate(this, null, _state_decorators, { kind: "accessor", name: "state", static: false, private: false, access: { has: obj => "state" in obj, get: obj => obj.state, set: (obj, value) => { obj.state = value; } }, metadata: _metadata }, _state_initializers, _state_extraInitializers);
            __esDecorate(this, null, _iframe_decorators, { kind: "accessor", name: "iframe", static: false, private: false, access: { has: obj => "iframe" in obj, get: obj => obj.iframe, set: (obj, value) => { obj.iframe = value; } }, metadata: _metadata }, _iframe_initializers, _iframe_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .html-preview-loading {
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

    .html-preview-error,
    .html-preview-fallback {
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

    .html-preview-iframe {
      width: 100%;
      height: 544px;
      border: none;
    }
  `; }
        #model_accessor_storage = __runInitializers(this, _model_initializers, null);
        get model() { return this.#model_accessor_storage; }
        set model(value) { this.#model_accessor_storage = value; }
        #html_accessor_storage = (__runInitializers(this, _model_extraInitializers), __runInitializers(this, _html_initializers, null));
        get html() { return this.#html_accessor_storage; }
        set html(value) { this.#html_accessor_storage = value; }
        #state_accessor_storage = (__runInitializers(this, _html_extraInitializers), __runInitializers(this, _state_initializers, 'loading'));
        get state() { return this.#state_accessor_storage; }
        set state(value) { this.#state_accessor_storage = value; }
        #iframe_accessor_storage = (__runInitializers(this, _state_extraInitializers), __runInitializers(this, _iframe_initializers, void 0));
        get iframe() { return this.#iframe_accessor_storage; }
        set iframe(value) { this.#iframe_accessor_storage = value; }
        firstUpdated(_changedProperties) {
            const result = super.firstUpdated(_changedProperties);
            this._link();
            if (this.model) {
                this.disposables.add(this.model.props.text$.subscribe(() => {
                    this._link();
                }));
            }
            return result;
        }
        updated(changedProperties) {
            const result = super.updated(changedProperties);
            if (changedProperties.has('html')) {
                this._link();
            }
            return result;
        }
        get normalizedHtml() {
            return this.model?.props.text.toString() ?? this.html;
        }
        _link() {
            this.state = 'loading';
            if (!this.normalizedHtml) {
                this.state = 'fallback';
                return;
            }
            try {
                linkIframe(this.iframe, this.normalizedHtml);
                this.state = 'finish';
            }
            catch (error) {
                console.error('HTML preview iframe failed:', error);
                this.state = 'error';
            }
        }
        render() {
            return html `
      <div class="html-preview-container">
        ${choose(this.state, [
                [
                    'loading',
                    () => html `<div class="html-preview-loading">
                Rendering the code...
              </div>`,
                ],
                [
                    'error',
                    () => html `<div class="html-preview-error">
                Failed to render the preview. Please check your HTML code for
                errors.
              </div>`,
                ],
                [
                    'fallback',
                    () => html `<div class="html-preview-fallback">
                This feature is not supported in your browser. Please download
                the AFFiNE Desktop App to use it.
              </div>`,
                ],
            ])}
        <iframe
          class="html-preview-iframe"
          title="HTML Preview"
          style=${styleMap({
                display: this.state === 'finish' ? undefined : 'none',
            })}
        ></iframe>
      </div>
    `;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _iframe_extraInitializers);
        }
    };
})();
export { HTMLPreview };
export function effects() {
    customElements.define('html-preview', HTMLPreview);
}
//# sourceMappingURL=html-preview.js.map