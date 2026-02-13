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
import './ask-ai-panel';
import { HoverController } from '@blocksuite/affine/components/hover';
import { createLitPortal } from '@blocksuite/affine/components/portal';
import { WithDisposable } from '@blocksuite/affine/global/lit';
import {} from '@blocksuite/affine/std';
import { flip, offset } from '@floating-ui/dom';
import { css, html, LitElement, nothing } from 'lit';
import { property, query } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { styleMap } from 'lit/directives/style-map.js';
let AskAIButton = (() => {
    let _classSuper = WithDisposable(LitElement);
    let __askAIButton_decorators;
    let __askAIButton_initializers = [];
    let __askAIButton_extraInitializers = [];
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _actionGroups_decorators;
    let _actionGroups_initializers = [];
    let _actionGroups_extraInitializers = [];
    let _toggleType_decorators;
    let _toggleType_initializers = [];
    let _toggleType_extraInitializers = [];
    let _options_decorators;
    let _options_initializers = [];
    let _options_extraInitializers = [];
    return class AskAIButton extends _classSuper {
        constructor() {
            super(...arguments);
            this.#_askAIButton_accessor_storage = __runInitializers(this, __askAIButton_initializers, void 0);
            this._abortController = (__runInitializers(this, __askAIButton_extraInitializers), null);
            this._whenHover = new HoverController(this, ({ abortController }) => {
                return {
                    template: html `<ask-ai-panel
          .host=${this.host}
          .actionGroups=${this.actionGroups}
          .abortController=${abortController}
        ></ask-ai-panel>`,
                    computePosition: {
                        referenceElement: this,
                        placement: 'bottom-start',
                        middleware: [flip(), offset({ mainAxis: 8, crossAxis: -6 })],
                        autoUpdate: true,
                    },
                };
            }, {
                allowMultiple: true,
                enterDelay: 100,
            });
            this.#host_accessor_storage = __runInitializers(this, _host_initializers, void 0);
            this.#actionGroups_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _actionGroups_initializers, void 0));
            this.#toggleType_accessor_storage = (__runInitializers(this, _actionGroups_extraInitializers), __runInitializers(this, _toggleType_initializers, 'hover'));
            this.#options_accessor_storage = (__runInitializers(this, _toggleType_extraInitializers), __runInitializers(this, _options_initializers, {
                size: 'small',
                backgroundColor: undefined,
                boxShadow: undefined,
                panelWidth: 330,
            }));
            this._clearAbortController = (__runInitializers(this, _options_extraInitializers), () => {
                if (this._abortController) {
                    this._abortController.abort();
                    this._abortController = null;
                }
            });
            this._toggleAIPanel = () => {
                if (this.toggleType !== 'click') {
                    return;
                }
                if (!this._askAIButton) {
                    return;
                }
                if (this._abortController && !this._abortController.signal.aborted) {
                    this._clearAbortController();
                    return;
                }
                this._abortController = new AbortController();
                const panelMinWidth = this.options.panelWidth || 330;
                createLitPortal({
                    template: html `<ask-ai-panel
        .host=${this.host}
        .actionGroups=${this.actionGroups}
        .minWidth=${panelMinWidth}
      ></ask-ai-panel>`,
                    container: this._askAIButton,
                    computePosition: {
                        referenceElement: this._askAIButton,
                        placement: 'bottom-start',
                        middleware: [flip(), offset({ mainAxis: 8, crossAxis: -6 })],
                        autoUpdate: true,
                    },
                    abortController: this._abortController,
                    closeOnClickAway: true,
                });
            };
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __askAIButton_decorators = [query('.ask-ai-button')];
            _host_decorators = [property({ attribute: false })];
            _actionGroups_decorators = [property({ attribute: false })];
            _toggleType_decorators = [property({ attribute: false })];
            _options_decorators = [property({ attribute: false })];
            __esDecorate(this, null, __askAIButton_decorators, { kind: "accessor", name: "_askAIButton", static: false, private: false, access: { has: obj => "_askAIButton" in obj, get: obj => obj._askAIButton, set: (obj, value) => { obj._askAIButton = value; } }, metadata: _metadata }, __askAIButton_initializers, __askAIButton_extraInitializers);
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _actionGroups_decorators, { kind: "accessor", name: "actionGroups", static: false, private: false, access: { has: obj => "actionGroups" in obj, get: obj => obj.actionGroups, set: (obj, value) => { obj.actionGroups = value; } }, metadata: _metadata }, _actionGroups_initializers, _actionGroups_extraInitializers);
            __esDecorate(this, null, _toggleType_decorators, { kind: "accessor", name: "toggleType", static: false, private: false, access: { has: obj => "toggleType" in obj, get: obj => obj.toggleType, set: (obj, value) => { obj.toggleType = value; } }, metadata: _metadata }, _toggleType_initializers, _toggleType_extraInitializers);
            __esDecorate(this, null, _options_decorators, { kind: "accessor", name: "options", static: false, private: false, access: { has: obj => "options" in obj, get: obj => obj.options, set: (obj, value) => { obj.options = value; } }, metadata: _metadata }, _options_initializers, _options_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .ask-ai-button {
      border-radius: 4px;
      position: relative;
      user-select: none;
    }
  `; }
        #_askAIButton_accessor_storage;
        get _askAIButton() { return this.#_askAIButton_accessor_storage; }
        set _askAIButton(value) { this.#_askAIButton_accessor_storage = value; }
        #host_accessor_storage;
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #actionGroups_accessor_storage;
        get actionGroups() { return this.#actionGroups_accessor_storage; }
        set actionGroups(value) { this.#actionGroups_accessor_storage = value; }
        #toggleType_accessor_storage;
        get toggleType() { return this.#toggleType_accessor_storage; }
        set toggleType(value) { this.#toggleType_accessor_storage = value; }
        #options_accessor_storage;
        get options() { return this.#options_accessor_storage; }
        set options(value) { this.#options_accessor_storage = value; }
        disconnectedCallback() {
            super.disconnectedCallback();
            this._clearAbortController();
        }
        render() {
            const { size, backgroundColor, boxShadow } = this.options;
            const { toggleType } = this;
            const buttonStyles = styleMap({
                backgroundColor: backgroundColor || 'transparent',
                boxShadow: boxShadow || 'none',
            });
            return html `<div
      class="ask-ai-button"
      data-testid="ask-ai-button"
      style=${buttonStyles}
      ${toggleType === 'hover' ? ref(this._whenHover.setReference) : nothing}
      @click=${this._toggleAIPanel}
    >
      <ask-ai-icon .size=${size}></ask-ai-icon>
    </div>`;
        }
    };
})();
export { AskAIButton };
//# sourceMappingURL=ask-ai-button.js.map