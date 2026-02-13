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
import { DocModeProvider, ThemeProvider, } from '@blocksuite/affine/shared/services';
import { scrollbarStyle } from '@blocksuite/affine/shared/styles';
import {} from '@blocksuite/affine/std';
import { cssVar } from '@toeverything/theme';
import { css, html, LitElement, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
let AskAIPanel = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _actionGroups_decorators;
    let _actionGroups_initializers = [];
    let _actionGroups_extraInitializers = [];
    let _abortController_decorators;
    let _abortController_initializers = [];
    let _abortController_extraInitializers = [];
    let _onItemClick_decorators;
    let _onItemClick_initializers = [];
    let _onItemClick_extraInitializers = [];
    let _minWidth_decorators;
    let _minWidth_initializers = [];
    let _minWidth_extraInitializers = [];
    return class AskAIPanel extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _host_decorators = [property({ attribute: false })];
            _actionGroups_decorators = [property({ attribute: false })];
            _abortController_decorators = [property({ attribute: false })];
            _onItemClick_decorators = [property({ attribute: false })];
            _minWidth_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _actionGroups_decorators, { kind: "accessor", name: "actionGroups", static: false, private: false, access: { has: obj => "actionGroups" in obj, get: obj => obj.actionGroups, set: (obj, value) => { obj.actionGroups = value; } }, metadata: _metadata }, _actionGroups_initializers, _actionGroups_extraInitializers);
            __esDecorate(this, null, _abortController_decorators, { kind: "accessor", name: "abortController", static: false, private: false, access: { has: obj => "abortController" in obj, get: obj => obj.abortController, set: (obj, value) => { obj.abortController = value; } }, metadata: _metadata }, _abortController_initializers, _abortController_extraInitializers);
            __esDecorate(this, null, _onItemClick_decorators, { kind: "accessor", name: "onItemClick", static: false, private: false, access: { has: obj => "onItemClick" in obj, get: obj => obj.onItemClick, set: (obj, value) => { obj.onItemClick = value; } }, metadata: _metadata }, _onItemClick_initializers, _onItemClick_extraInitializers);
            __esDecorate(this, null, _minWidth_decorators, { kind: "accessor", name: "minWidth", static: false, private: false, access: { has: obj => "minWidth" in obj, get: obj => obj.minWidth, set: (obj, value) => { obj.minWidth = value; } }, metadata: _metadata }, _minWidth_initializers, _minWidth_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      position: relative;
    }

    .ask-ai-panel {
      box-sizing: border-box;
      padding: 8px 4px 8px 8px;
      max-height: 374px;
      overflow-y: auto;
      background: var(--affine-background-overlay-panel-color);
      box-shadow: ${unsafeCSS(cssVar('overlayPanelShadow'))};
      border-radius: 8px;
      z-index: var(--affine-z-index-popover);
      scrollbar-gutter: stable;
    }

    ${scrollbarStyle('.ask-ai-panel')}
    .ask-ai-panel:hover::-webkit-scrollbar-thumb {
      background-color: var(--affine-black-30);
    }
  `; }
        #host_accessor_storage = __runInitializers(this, _host_initializers, void 0);
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #actionGroups_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _actionGroups_initializers, void 0));
        get actionGroups() { return this.#actionGroups_accessor_storage; }
        set actionGroups(value) { this.#actionGroups_accessor_storage = value; }
        #abortController_accessor_storage = (__runInitializers(this, _actionGroups_extraInitializers), __runInitializers(this, _abortController_initializers, null));
        get abortController() { return this.#abortController_accessor_storage; }
        set abortController(value) { this.#abortController_accessor_storage = value; }
        #onItemClick_accessor_storage = (__runInitializers(this, _abortController_extraInitializers), __runInitializers(this, _onItemClick_initializers, undefined));
        get onItemClick() { return this.#onItemClick_accessor_storage; }
        set onItemClick(value) { this.#onItemClick_accessor_storage = value; }
        #minWidth_accessor_storage = (__runInitializers(this, _onItemClick_extraInitializers), __runInitializers(this, _minWidth_initializers, 330));
        get minWidth() { return this.#minWidth_accessor_storage; }
        set minWidth(value) { this.#minWidth_accessor_storage = value; }
        get _isEdgelessMode() {
            return this.host.std.get(DocModeProvider).getEditorMode() === 'edgeless';
        }
        get _actionGroups() {
            const filteredConfig = this.actionGroups
                .map(group => ({
                ...group,
                items: group.items.filter(item => item.showWhen
                    ? item.showWhen(this.host.command.chain(), this._isEdgelessMode ? 'edgeless' : 'page', this.host)
                    : true),
            }))
                .filter(group => group.items.length > 0);
            return filteredConfig;
        }
        connectedCallback() {
            super.connectedCallback();
            this.disposables.add(this.host.std.get(ThemeProvider).app$.subscribe(() => {
                this.requestUpdate();
            }));
        }
        render() {
            const style = styleMap({
                minWidth: `${this.minWidth}px`,
            });
            return html `<div class="ask-ai-panel" style=${style}>
      <ai-item-list
        .host=${this.host}
        .groups=${this._actionGroups}
        .onClick=${this.onItemClick}
      ></ai-item-list>
    </div>`;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _minWidth_extraInitializers);
        }
    };
})();
export { AskAIPanel };
//# sourceMappingURL=ask-ai-panel.js.map