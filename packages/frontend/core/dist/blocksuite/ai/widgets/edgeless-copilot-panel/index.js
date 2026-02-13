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
import { ThemeProvider } from '@blocksuite/affine/shared/services';
import { scrollbarStyle } from '@blocksuite/affine/shared/styles';
import { unsafeCSSVar } from '@blocksuite/affine/shared/theme';
import { on, stopPropagation } from '@blocksuite/affine/shared/utils';
import { darkCssVariables, lightCssVariables } from '@toeverything/theme';
import { css, html, LitElement, nothing, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
let EdgelessCopilotPanel = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _entry_decorators;
    let _entry_initializers = [];
    let _entry_extraInitializers = [];
    let _groups_decorators;
    let _groups_initializers = [];
    let _groups_extraInitializers = [];
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _onClick_decorators;
    let _onClick_initializers = [];
    let _onClick_extraInitializers = [];
    return class EdgelessCopilotPanel extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _entry_decorators = [property({ attribute: false })];
            _groups_decorators = [property({ attribute: false })];
            _host_decorators = [property({ attribute: false })];
            _onClick_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _entry_decorators, { kind: "accessor", name: "entry", static: false, private: false, access: { has: obj => "entry" in obj, get: obj => obj.entry, set: (obj, value) => { obj.entry = value; } }, metadata: _metadata }, _entry_initializers, _entry_extraInitializers);
            __esDecorate(this, null, _groups_decorators, { kind: "accessor", name: "groups", static: false, private: false, access: { has: obj => "groups" in obj, get: obj => obj.groups, set: (obj, value) => { obj.groups = value; } }, metadata: _metadata }, _groups_initializers, _groups_extraInitializers);
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _onClick_decorators, { kind: "accessor", name: "onClick", static: false, private: false, access: { has: obj => "onClick" in obj, get: obj => obj.onClick, set: (obj, value) => { obj.onClick = value; } }, metadata: _metadata }, _onClick_initializers, _onClick_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      display: flex;
      position: absolute;
      max-height: 374px;
    }

    .edgeless-copilot-panel {
      box-sizing: border-box;
      padding: 8px 4px 8px 8px;
      min-width: 330px;
      overflow-y: auto;
      overscroll-behavior: contain;
      background: ${unsafeCSSVar('--affine-background-overlay-panel-color')};
      box-shadow: ${unsafeCSSVar('--affine-overlay-shadow')};
      border-radius: 8px;
      z-index: var(--affine-z-index-popover);
    }

    .edgeless-copilot-panel[data-app-theme='light'] {
      background: ${unsafeCSS(lightCssVariables['--affine-background-overlay-panel-color'])};

      box-shadow: ${unsafeCSS(lightCssVariables['--affine-overlay-shadow'])};
    }

    .edgeless-copilot-panel[data-app-theme='dark'] {
      background: ${unsafeCSS(darkCssVariables['--affine-background-overlay-panel-color'])};

      box-shadow: ${unsafeCSS(darkCssVariables['--affine-overlay-shadow'])};
    }

    .edgeless-copilot-panel[data-app-theme='dark'] ai-item {
      background: blue;
    }

    ${scrollbarStyle('.edgeless-copilot-panel')}
    .edgeless-copilot-panel:hover::-webkit-scrollbar-thumb {
      background-color: var(--affine-black-30);
    }

    .edgeless-copilot-panel[data-app-theme='light']:hover::-webkit-scrollbar-thumb {
      background-color: ${unsafeCSS(lightCssVariables['--affine-black30'])};
    }

    .edgeless-copilot-panel[data-app-theme='dark']:hover::-webkit-scrollbar-thumb {
      background-color: ${unsafeCSS(darkCssVariables['--affine-black30'])};
    }
  `; }
        _getChain() {
            return this.host.std.command.chain();
        }
        connectedCallback() {
            super.connectedCallback();
            this._disposables.add(on(this, 'wheel', stopPropagation));
            this._disposables.add(on(this, 'pointerdown', stopPropagation));
            this.disposables.add(this.host.std.get(ThemeProvider).app$.subscribe(() => {
                this.requestUpdate();
            }));
        }
        hide() {
            this.remove();
        }
        render() {
            const appTheme = this.host.std.get(ThemeProvider).app$.value;
            const chain = this._getChain();
            const groups = this.groups.reduce((pre, group) => {
                const filtered = group.items.filter(item => item.showWhen?.(chain, 'edgeless', this.host));
                if (filtered.length > 0)
                    pre.push({ ...group, items: filtered });
                return pre;
            }, []);
            if (groups.every(group => group.items.length === 0))
                return nothing;
            return html `
      <div class="edgeless-copilot-panel" data-app-theme=${appTheme}>
        <ai-item-list
          .theme=${appTheme}
          .onClick=${() => {
                this.onClick?.();
            }}
          .host=${this.host}
          .groups=${groups}
        ></ai-item-list>
      </div>
    `;
        }
        #entry_accessor_storage = __runInitializers(this, _entry_initializers, undefined);
        get entry() { return this.#entry_accessor_storage; }
        set entry(value) { this.#entry_accessor_storage = value; }
        #groups_accessor_storage = (__runInitializers(this, _entry_extraInitializers), __runInitializers(this, _groups_initializers, void 0));
        get groups() { return this.#groups_accessor_storage; }
        set groups(value) { this.#groups_accessor_storage = value; }
        #host_accessor_storage = (__runInitializers(this, _groups_extraInitializers), __runInitializers(this, _host_initializers, void 0));
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #onClick_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _onClick_initializers, undefined));
        get onClick() { return this.#onClick_accessor_storage; }
        set onClick(value) { this.#onClick_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _onClick_extraInitializers);
        }
    };
})();
export { EdgelessCopilotPanel };
//# sourceMappingURL=index.js.map