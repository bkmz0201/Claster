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
import { SignalWatcher, WithDisposable } from '@blocksuite/affine/global/lit';
import { unsafeCSSVarV2 } from '@blocksuite/affine/shared/theme';
import { ShadowlessElement } from '@blocksuite/affine/std';
import { DEFAULT_IMAGE_PROXY_ENDPOINT } from '@blocksuite/affine-shared/consts';
import { ToggleDownIcon, ToolIcon } from '@blocksuite/icons/lit';
import {} from '@preact/signals-core';
import { css, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
let ToolResultCard = (() => {
    let _classSuper = SignalWatcher(WithDisposable(ShadowlessElement));
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _icon_decorators;
    let _icon_initializers = [];
    let _icon_extraInitializers = [];
    let _footerIcons_decorators;
    let _footerIcons_initializers = [];
    let _footerIcons_extraInitializers = [];
    let _results_decorators;
    let _results_initializers = [];
    let _results_extraInitializers = [];
    let _width_decorators;
    let _width_initializers = [];
    let _width_extraInitializers = [];
    let _isCollapsed_decorators;
    let _isCollapsed_initializers = [];
    let _isCollapsed_extraInitializers = [];
    return class ToolResultCard extends _classSuper {
        constructor() {
            super(...arguments);
            this.#name_accessor_storage = __runInitializers(this, _name_initializers, 'Tool result');
            this.#icon_accessor_storage = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _icon_initializers, ToolIcon()));
            this.#footerIcons_accessor_storage = (__runInitializers(this, _icon_extraInitializers), __runInitializers(this, _footerIcons_initializers, []));
            this.#results_accessor_storage = (__runInitializers(this, _footerIcons_extraInitializers), __runInitializers(this, _results_initializers, []));
            this.#width_accessor_storage = (__runInitializers(this, _results_extraInitializers), __runInitializers(this, _width_initializers, void 0));
            this.#isCollapsed_accessor_storage = (__runInitializers(this, _width_extraInitializers), __runInitializers(this, _isCollapsed_initializers, true));
            this.imageProxyURL = (__runInitializers(this, _isCollapsed_extraInitializers), DEFAULT_IMAGE_PROXY_ENDPOINT);
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _name_decorators = [property({ attribute: false })];
            _icon_decorators = [property({ attribute: false })];
            _footerIcons_decorators = [property({ attribute: false })];
            _results_decorators = [property({ attribute: false })];
            _width_decorators = [property({ attribute: false })];
            _isCollapsed_decorators = [state()];
            __esDecorate(this, null, _name_decorators, { kind: "accessor", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(this, null, _icon_decorators, { kind: "accessor", name: "icon", static: false, private: false, access: { has: obj => "icon" in obj, get: obj => obj.icon, set: (obj, value) => { obj.icon = value; } }, metadata: _metadata }, _icon_initializers, _icon_extraInitializers);
            __esDecorate(this, null, _footerIcons_decorators, { kind: "accessor", name: "footerIcons", static: false, private: false, access: { has: obj => "footerIcons" in obj, get: obj => obj.footerIcons, set: (obj, value) => { obj.footerIcons = value; } }, metadata: _metadata }, _footerIcons_initializers, _footerIcons_extraInitializers);
            __esDecorate(this, null, _results_decorators, { kind: "accessor", name: "results", static: false, private: false, access: { has: obj => "results" in obj, get: obj => obj.results, set: (obj, value) => { obj.results = value; } }, metadata: _metadata }, _results_initializers, _results_extraInitializers);
            __esDecorate(this, null, _width_decorators, { kind: "accessor", name: "width", static: false, private: false, access: { has: obj => "width" in obj, get: obj => obj.width, set: (obj, value) => { obj.width = value; } }, metadata: _metadata }, _width_initializers, _width_extraInitializers);
            __esDecorate(this, null, _isCollapsed_decorators, { kind: "accessor", name: "isCollapsed", static: false, private: false, access: { has: obj => "isCollapsed" in obj, get: obj => obj.isCollapsed, set: (obj, value) => { obj.isCollapsed = value; } }, metadata: _metadata }, _isCollapsed_initializers, _isCollapsed_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .ai-tool-result-wrapper {
      display: block;
      padding: 12px;
      margin: 8px 0;
      border-radius: 8px;
      border: 0.5px solid ${unsafeCSSVarV2('layer/insideBorder/border')};
      color: ${unsafeCSSVarV2('icon/secondary')};
      transition: color 0.23s ease;

      .ai-tool-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        margin-right: 3px;
        cursor: pointer;
      }

      .ai-icon {
        width: 24px;
        height: 24px;

        svg {
          width: 24px;
          height: 24px;
        }
      }

      .ai-tool-name {
        font-size: 14px;
        font-weight: 500;
        line-height: 24px;
        margin-left: 0px;
        margin-right: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .ai-tool-results {
        display: grid;
        grid-template-rows: 1fr;
        transition:
          grid-template-rows 0.4s cubic-bezier(0.07, 0.83, 0.46, 1),
          opacity 0.4s ease,
          margin-top 0.23s ease,
          transform 0.43s ease;
        padding-left: 11px;
        margin-top: 4px;
        transform-origin: bottom;
      }

      .ai-tool-results[data-collapsed='true'] {
        grid-template-rows: 0fr;
        opacity: 0;
        transform: translateY(10px);
        margin-top: 0px;
      }

      .ai-tool-result-collapse-wrapper {
        overflow: hidden;
      }

      .ai-tool-results-content {
        display: flex;
        flex-direction: column;
        padding: 4px 2px 4px 20px;
        border-left: 1px solid ${unsafeCSSVarV2('layer/insideBorder/border')};
      }

      .result-item {
        margin-top: 16px;
        display: block;
        cursor: default;
      }

      .result-item[href],
      .result-item[data-clickable] {
        cursor: pointer;
      }

      .result-item:first-child {
        margin-top: 0;
      }

      .result-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 24px;
      }

      .result-title {
        font-size: 12px;
        font-weight: 400;
        color: ${unsafeCSSVarV2('icon/primary')};
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
      }

      .result-content {
        font-size: 12px;
        line-height: 20px;
        color: ${unsafeCSSVarV2('text/secondary')};
        margin-top: 4px;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .result-icon,
      .footer-icon {
        width: 18px;
        height: 18px;
        border-radius: 100%;
        background-color: ${unsafeCSSVarV2('layer/background/primary')};

        img {
          width: 18px;
          height: 18px;
          border-radius: 100%;
          border: 0.5px solid ${unsafeCSSVarV2('layer/insideBorder/border')};
        }

        svg {
          width: 18px;
          height: 18px;
          color: ${unsafeCSSVarV2('icon/primary')};
        }
      }

      .result-item[href]:hover .result-title,
      .result-item[href]:hover .result-content,
      .result-item[data-clickable]:hover .result-title,
      .result-item[data-clickable]:hover .result-content {
        color: ${unsafeCSSVarV2('text/primary')};
      }

      .result-icon,
      .footer-icon {
        width: 18px;
        height: 18px;
        border-radius: 100%;
        background-color: ${unsafeCSSVarV2('layer/background/primary')};

        img {
          width: 18px;
          height: 18px;
          border-radius: 100%;
          border: 0.5px solid ${unsafeCSSVarV2('layer/insideBorder/border')};
        }

        svg {
          width: 18px;
          height: 18px;
          color: ${unsafeCSSVarV2('icon/primary')};
        }
      }

      .result-item[href]:hover .result-title,
      .result-item[href]:hover .result-content {
        color: ${unsafeCSSVarV2('text/primary')};
      }

      .result-icon,
      .footer-icon {
        width: 18px;
        height: 18px;
        border-radius: 100%;
        background-color: ${unsafeCSSVarV2('layer/background/primary')};

        img {
          width: 18px;
          height: 18px;
          border-radius: 100%;
          border: 0.5px solid ${unsafeCSSVarV2('layer/insideBorder/border')};
        }

        svg {
          width: 18px;
          height: 18px;
          color: ${unsafeCSSVarV2('icon/primary')};
        }
      }

      .footer-icons {
        display: flex;
        position: relative;
        height: 24px;
        align-items: center;
        opacity: 0.5;
        transition: opacity 0.23s ease;
        user-select: none;
      }

      .footer-icon:not(:first-child) {
        margin-left: -8px;
      }
    }
    .ai-tool-result-wrapper:hover {
      color: ${unsafeCSSVarV2('icon/primary')};

      .footer-icons {
        opacity: 1;
      }
    }
  `; }
        #name_accessor_storage;
        get name() { return this.#name_accessor_storage; }
        set name(value) { this.#name_accessor_storage = value; }
        #icon_accessor_storage;
        get icon() { return this.#icon_accessor_storage; }
        set icon(value) { this.#icon_accessor_storage = value; }
        #footerIcons_accessor_storage;
        get footerIcons() { return this.#footerIcons_accessor_storage; }
        set footerIcons(value) { this.#footerIcons_accessor_storage = value; }
        #results_accessor_storage;
        get results() { return this.#results_accessor_storage; }
        set results(value) { this.#results_accessor_storage = value; }
        #width_accessor_storage;
        get width() { return this.#width_accessor_storage; }
        set width(value) { this.#width_accessor_storage = value; }
        #isCollapsed_accessor_storage;
        get isCollapsed() { return this.#isCollapsed_accessor_storage; }
        set isCollapsed(value) { this.#isCollapsed_accessor_storage = value; }
        render() {
            return html `
      <div class="ai-tool-result-wrapper">
        <div class="ai-tool-header" @click=${this.toggleCard}>
          <div class="ai-icon">${this.icon}</div>
          <div class="ai-tool-name">${this.name}</div>
          ${this.isCollapsed
                ? this.renderFooterIcons()
                : html ` <div class="ai-icon">${ToggleDownIcon()}</div> `}
        </div>
        <div class="ai-tool-results" data-collapsed=${this.isCollapsed}>
          <div class="ai-tool-result-collapse-wrapper">
            <div class="ai-tool-results-content">
              ${this.results.map(result => html `
                  <a
                    class="result-item"
                    data-clickable=${!!result.onClick}
                    href=${ifDefined(result.href)}
                    target=${ifDefined(result.href ? '_blank' : undefined)}
                    rel=${ifDefined(result.href ? 'noopener noreferrer' : undefined)}
                    @click=${result.onClick}
                  >
                    <div class="result-header">
                      <div class="result-title">${result.title}</div>
                      <div class="result-icon">
                        ${this.renderIcon(result.icon)}
                      </div>
                    </div>
                    ${result.content
                ? html `<div class="result-content">
                          ${result.content}
                        </div>`
                : nothing}
                  </a>
                `)}
            </div>
          </div>
        </div>
      </div>
    `;
        }
        renderFooterIcons() {
            if (!this.footerIcons || this.footerIcons.length === 0) {
                return nothing;
            }
            let maxIcons = 3;
            if (this.width && this.width.value !== undefined) {
                maxIcons = this.width.value <= 400 ? 1 : 3;
            }
            const visibleIcons = this.footerIcons.slice(0, maxIcons);
            return html `
      <div class="footer-icons">
        ${visibleIcons.map((icon, index) => html `
            <div class="footer-icon" style="z-index: ${index}">
              ${this.renderIcon(icon)}
            </div>
          `)}
      </div>
    `;
        }
        buildUrl(imageUrl) {
            if (imageUrl.startsWith(this.imageProxyURL)) {
                return imageUrl;
            }
            return `${this.imageProxyURL}?url=${encodeURIComponent(imageUrl)}`;
        }
        renderIcon(icon) {
            if (!icon) {
                return nothing;
            }
            if (typeof icon === 'string') {
                return html `<div class="image-icon">
        <img
          src=${this.buildUrl(icon)}
          @error=${(e) => {
                    const img = e.target;
                    img.style.display = 'none';
                    const iconElement = img.nextElementSibling;
                    iconElement.style.display = 'block';
                }}
        />
        <div style="display: none;">${this.icon}</div>
      </div>`;
            }
            return html `${icon}`;
        }
        toggleCard() {
            this.isCollapsed = !this.isCollapsed;
        }
    };
})();
export { ToolResultCard };
//# sourceMappingURL=tool-result-card.js.map