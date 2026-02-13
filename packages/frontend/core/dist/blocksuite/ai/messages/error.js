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
import { scrollbarStyle } from '@blocksuite/affine/shared/styles';
import { unsafeCSSVarV2 } from '@blocksuite/affine/shared/theme';
import {} from '@blocksuite/affine/std';
import { InformationIcon, ToggleDownIcon } from '@blocksuite/icons/lit';
import { signal } from '@preact/signals-core';
import { baseTheme } from '@toeverything/theme';
import { css, html, LitElement, nothing, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { AIProvider, PaymentRequiredError, UnauthorizedError, } from '../provider';
let AIErrorWrapper = (() => {
    let _classSuper = SignalWatcher(WithDisposable(LitElement));
    let _text_decorators;
    let _text_initializers = [];
    let _text_extraInitializers = [];
    let _onClick_decorators;
    let _onClick_initializers = [];
    let _onClick_extraInitializers = [];
    let _errorMessage_decorators;
    let _errorMessage_initializers = [];
    let _errorMessage_extraInitializers = [];
    let _actionText_decorators;
    let _actionText_initializers = [];
    let _actionText_extraInitializers = [];
    let _actionTooltip_decorators;
    let _actionTooltip_initializers = [];
    let _actionTooltip_extraInitializers = [];
    let _showDetailPanel_decorators;
    let _showDetailPanel_initializers = [];
    let _showDetailPanel_extraInitializers = [];
    let _testId_decorators;
    let _testId_initializers = [];
    let _testId_extraInitializers = [];
    return class AIErrorWrapper extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _text_decorators = [property({ attribute: false })];
            _onClick_decorators = [property({ attribute: false })];
            _errorMessage_decorators = [property({ attribute: false })];
            _actionText_decorators = [property({ attribute: false })];
            _actionTooltip_decorators = [property({ attribute: false })];
            _showDetailPanel_decorators = [property({ attribute: false })];
            _testId_decorators = [property({ attribute: 'data-testid', reflect: true })];
            __esDecorate(this, null, _text_decorators, { kind: "accessor", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
            __esDecorate(this, null, _onClick_decorators, { kind: "accessor", name: "onClick", static: false, private: false, access: { has: obj => "onClick" in obj, get: obj => obj.onClick, set: (obj, value) => { obj.onClick = value; } }, metadata: _metadata }, _onClick_initializers, _onClick_extraInitializers);
            __esDecorate(this, null, _errorMessage_decorators, { kind: "accessor", name: "errorMessage", static: false, private: false, access: { has: obj => "errorMessage" in obj, get: obj => obj.errorMessage, set: (obj, value) => { obj.errorMessage = value; } }, metadata: _metadata }, _errorMessage_initializers, _errorMessage_extraInitializers);
            __esDecorate(this, null, _actionText_decorators, { kind: "accessor", name: "actionText", static: false, private: false, access: { has: obj => "actionText" in obj, get: obj => obj.actionText, set: (obj, value) => { obj.actionText = value; } }, metadata: _metadata }, _actionText_initializers, _actionText_extraInitializers);
            __esDecorate(this, null, _actionTooltip_decorators, { kind: "accessor", name: "actionTooltip", static: false, private: false, access: { has: obj => "actionTooltip" in obj, get: obj => obj.actionTooltip, set: (obj, value) => { obj.actionTooltip = value; } }, metadata: _metadata }, _actionTooltip_initializers, _actionTooltip_extraInitializers);
            __esDecorate(this, null, _showDetailPanel_decorators, { kind: "accessor", name: "showDetailPanel", static: false, private: false, access: { has: obj => "showDetailPanel" in obj, get: obj => obj.showDetailPanel, set: (obj, value) => { obj.showDetailPanel = value; } }, metadata: _metadata }, _showDetailPanel_initializers, _showDetailPanel_extraInitializers);
            __esDecorate(this, null, _testId_decorators, { kind: "accessor", name: "testId", static: false, private: false, access: { has: obj => "testId" in obj, get: obj => obj.testId, set: (obj, value) => { obj.testId = value; } }, metadata: _metadata }, _testId_initializers, _testId_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .error-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 8px;
      align-self: stretch;
      border-radius: 4px;
      padding: 8px 8px 12px 8px;
      background-color: ${unsafeCSSVarV2('aI/errorBackground')};
      font-family: ${unsafeCSS(baseTheme.fontSansFamily)};

      .content {
        align-items: flex-start;
        display: flex;
        gap: 8px;
        align-self: stretch;
        color: ${unsafeCSSVarV2('aI/errorText')};
        font-feature-settings:
          'clig' off,
          'liga' off;
        /* light/sm */
        font-size: var(--affine-font-sm);
        font-style: normal;
        font-weight: 400;
        line-height: 22px; /* 157.143% */

        .icon svg {
          position: relative;
          top: 3px;
        }
      }

      .text-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .detail-container {
        display: flex;
        flex-direction: column;
        gap: 4px;
        width: 100%;
      }
      .detail-title {
        display: flex;
        align-items: center;
      }
      .detail-title:hover {
        cursor: pointer;
      }
      .detail-content {
        padding: 8px;
        border-radius: 4px;
        background-color: ${unsafeCSSVarV2('aI/errorDetailBackground')};
        overflow: auto;
      }
      ${scrollbarStyle('.detail-content')}

      .toggle {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .toggle.up svg {
        transform: rotate(180deg);
        transition: all 0.2s ease-in-out;
      }

      .action {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
      }
      .action-button {
        cursor: pointer;
        color: ${unsafeCSSVarV2('text/primary')};
        background: ${unsafeCSSVarV2('button/secondary')};
        border-radius: 8px;
        border: 1px solid ${unsafeCSSVarV2('button/innerBlackBorder')};
        padding: 4px 12px;
        font-size: var(--affine-font-xs);
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
      }
      .action-button:hover {
        transition: all 0.2s ease-in-out;
        background-image: linear-gradient(
          rgba(0, 0, 0, 0.04),
          rgba(0, 0, 0, 0.04)
        );
      }
    }
  `; }
        render() {
            return html ` <div class="error-wrapper">
      <div class="content">
        <div class="icon">${InformationIcon()}</div>
        <div class="text-container">
          <div>${this.text}</div>
          ${this.showDetailPanel
                ? html `<div class="detail-container">
                <div
                  class="detail-title"
                  @click=${() => (this._showDetailContent.value =
                    !this._showDetailContent.value)}
                >
                  <span>Show detail</span>
                  <span
                    class="toggle ${this._showDetailContent.value
                    ? 'down'
                    : 'up'}"
                  >
                    ${ToggleDownIcon({ width: '16px', height: '16px' })}
                  </span>
                </div>
                ${this._showDetailContent.value
                    ? html `<div class="detail-content">${this.errorMessage}</div>`
                    : nothing}
              </div>`
                : nothing}
        </div>
      </div>
      <div class="action">
        <span
          class="action-button"
          @click=${this.onClick}
          data-testid="ai-error-action-button"
        >
          ${this.actionText}
          ${this.actionTooltip
                ? html `<affine-tooltip tip-position="top">
                ${this.actionTooltip}
              </affine-tooltip>`
                : nothing}
        </span>
      </div>
    </div>`;
        }
        #text_accessor_storage;
        get text() { return this.#text_accessor_storage; }
        set text(value) { this.#text_accessor_storage = value; }
        #onClick_accessor_storage;
        get onClick() { return this.#onClick_accessor_storage; }
        set onClick(value) { this.#onClick_accessor_storage = value; }
        #errorMessage_accessor_storage;
        get errorMessage() { return this.#errorMessage_accessor_storage; }
        set errorMessage(value) { this.#errorMessage_accessor_storage = value; }
        #actionText_accessor_storage;
        get actionText() { return this.#actionText_accessor_storage; }
        set actionText(value) { this.#actionText_accessor_storage = value; }
        #actionTooltip_accessor_storage;
        get actionTooltip() { return this.#actionTooltip_accessor_storage; }
        set actionTooltip(value) { this.#actionTooltip_accessor_storage = value; }
        #showDetailPanel_accessor_storage;
        get showDetailPanel() { return this.#showDetailPanel_accessor_storage; }
        set showDetailPanel(value) { this.#showDetailPanel_accessor_storage = value; }
        #testId_accessor_storage;
        get testId() { return this.#testId_accessor_storage; }
        set testId(value) { this.#testId_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._showDetailContent = signal(false);
            this.#text_accessor_storage = __runInitializers(this, _text_initializers, '');
            this.#onClick_accessor_storage = (__runInitializers(this, _text_extraInitializers), __runInitializers(this, _onClick_initializers, () => { }));
            this.#errorMessage_accessor_storage = (__runInitializers(this, _onClick_extraInitializers), __runInitializers(this, _errorMessage_initializers, ''));
            this.#actionText_accessor_storage = (__runInitializers(this, _errorMessage_extraInitializers), __runInitializers(this, _actionText_initializers, 'Contact us'));
            this.#actionTooltip_accessor_storage = (__runInitializers(this, _actionText_extraInitializers), __runInitializers(this, _actionTooltip_initializers, ''));
            this.#showDetailPanel_accessor_storage = (__runInitializers(this, _actionTooltip_extraInitializers), __runInitializers(this, _showDetailPanel_initializers, false));
            this.#testId_accessor_storage = (__runInitializers(this, _showDetailPanel_extraInitializers), __runInitializers(this, _testId_initializers, 'ai-error'));
            __runInitializers(this, _testId_extraInitializers);
        }
    };
})();
export { AIErrorWrapper };
const PaymentRequiredErrorRenderer = (host) => html `
  <ai-error-wrapper
    .text=${"You've reached the current usage cap for AFFiNE AI. You can subscribe to AFFiNE AI(with free 7-day-trial) to continue the AI experience!"}
    .actionText=${'Upgrade'}
    .onClick=${() => AIProvider.slots.requestUpgradePlan.next({ host })}
  ></ai-error-wrapper>
`;
const LoginRequiredErrorRenderer = (host) => html `
  <ai-error-wrapper
    .text=${'You need to login to AFFiNE Cloud to continue using AFFiNE AI.'}
    .actionText=${'Login'}
    .onClick=${() => AIProvider.slots.requestLogin.next({ host })}
  ></ai-error-wrapper>
`;
const generalErrorText = 'An error occurred, If this issue persists please let us know.';
const GeneralErrorRenderer = (props = {}) => {
    const onClick = () => {
        window.open('mailto:support@toeverything.info', '_blank');
    };
    return html `<ai-error-wrapper
    .text=${props.text ?? generalErrorText}
    .errorMessage=${props.errorMessage ?? ''}
    .showDetailPanel=${!!props.errorMessage}
    .actionText=${props.actionText ?? 'Contact us'}
    .actionTooltip=${props.actionTooltip ?? 'support@toeverything.info'}
    .onClick=${onClick}
  ></ai-error-wrapper>`;
};
export function AIChatErrorRenderer(error, host) {
    if (error instanceof PaymentRequiredError) {
        return PaymentRequiredErrorRenderer(host);
    }
    else if (error instanceof UnauthorizedError) {
        return LoginRequiredErrorRenderer(host);
    }
    else {
        return GeneralErrorRenderer({
            errorMessage: error.message,
        });
    }
}
//# sourceMappingURL=error.js.map