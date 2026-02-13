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
import { CloseIcon, PlusIcon } from '@blocksuite/icons/lit';
import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
let ChatPanelChip = (() => {
    let _classSuper = SignalWatcher(WithDisposable(ShadowlessElement));
    let _state_decorators;
    let _state_initializers = [];
    let _state_extraInitializers = [];
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _tooltip_decorators;
    let _tooltip_initializers = [];
    let _tooltip_extraInitializers = [];
    let _icon_decorators;
    let _icon_initializers = [];
    let _icon_extraInitializers = [];
    let _closeable_decorators;
    let _closeable_initializers = [];
    let _closeable_extraInitializers = [];
    let _onChipDelete_decorators;
    let _onChipDelete_initializers = [];
    let _onChipDelete_extraInitializers = [];
    let _onChipClick_decorators;
    let _onChipClick_initializers = [];
    let _onChipClick_extraInitializers = [];
    return class ChatPanelChip extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _state_decorators = [property({ attribute: false })];
            _name_decorators = [property({ attribute: false })];
            _tooltip_decorators = [property({ attribute: false })];
            _icon_decorators = [property({ attribute: false })];
            _closeable_decorators = [property({ attribute: false })];
            _onChipDelete_decorators = [property({ attribute: false })];
            _onChipClick_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _state_decorators, { kind: "accessor", name: "state", static: false, private: false, access: { has: obj => "state" in obj, get: obj => obj.state, set: (obj, value) => { obj.state = value; } }, metadata: _metadata }, _state_initializers, _state_extraInitializers);
            __esDecorate(this, null, _name_decorators, { kind: "accessor", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(this, null, _tooltip_decorators, { kind: "accessor", name: "tooltip", static: false, private: false, access: { has: obj => "tooltip" in obj, get: obj => obj.tooltip, set: (obj, value) => { obj.tooltip = value; } }, metadata: _metadata }, _tooltip_initializers, _tooltip_extraInitializers);
            __esDecorate(this, null, _icon_decorators, { kind: "accessor", name: "icon", static: false, private: false, access: { has: obj => "icon" in obj, get: obj => obj.icon, set: (obj, value) => { obj.icon = value; } }, metadata: _metadata }, _icon_initializers, _icon_extraInitializers);
            __esDecorate(this, null, _closeable_decorators, { kind: "accessor", name: "closeable", static: false, private: false, access: { has: obj => "closeable" in obj, get: obj => obj.closeable, set: (obj, value) => { obj.closeable = value; } }, metadata: _metadata }, _closeable_initializers, _closeable_extraInitializers);
            __esDecorate(this, null, _onChipDelete_decorators, { kind: "accessor", name: "onChipDelete", static: false, private: false, access: { has: obj => "onChipDelete" in obj, get: obj => obj.onChipDelete, set: (obj, value) => { obj.onChipDelete = value; } }, metadata: _metadata }, _onChipDelete_initializers, _onChipDelete_extraInitializers);
            __esDecorate(this, null, _onChipClick_decorators, { kind: "accessor", name: "onChipClick", static: false, private: false, access: { has: obj => "onChipClick" in obj, get: obj => obj.onChipClick, set: (obj, value) => { obj.onChipClick = value; } }, metadata: _metadata }, _onChipClick_initializers, _onChipClick_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .chip-card {
      display: flex;
      height: 24px;
      align-items: center;
      justify-content: center;
      padding: 0 4px;
      border-radius: 4px;
      border: 0.5px solid ${unsafeCSSVarV2('layer/insideBorder/border')};
      background: ${unsafeCSSVarV2('layer/background/primary')};
      box-sizing: border-box;
    }
    .chip-card[data-state='candidate'] {
      border-width: 1px;
      border-style: dashed;
      border-color: ${unsafeCSSVarV2('icon/tertiary')};
      background: ${unsafeCSSVarV2('layer/background/secondary')};
      color: ${unsafeCSSVarV2('icon/secondary')};
    }
    .chip-card[data-state='candidate']:hover {
      background: ${unsafeCSSVarV2('layer/background/hoverOverlay')};
    }
    .chip-card[data-state='candidate'] svg {
      color: ${unsafeCSSVarV2('icon/secondary')};
    }
    .chip-card[data-state='failed'] {
      color: ${unsafeCSSVarV2('status/error')};
      background: ${unsafeCSSVarV2('layer/background/error')};
    }
    .chip-card-content {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .chip-card[data-state='failed'] svg {
      color: ${unsafeCSSVarV2('status/error')};
    }
    .chip-card svg {
      width: 16px;
      height: 16px;
      color: ${unsafeCSSVarV2('icon/primary')};
    }
    .chip-card-title {
      display: inline-block;
      margin: 0 4px;
      font-size: 12px;
      min-width: 16px;
      max-width: 124px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .chip-card[data-state='candidate'] {
      cursor: pointer;
    }
    .chip-card-close {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 4px;
    }
    .chip-card-close:hover {
      background: ${unsafeCSSVarV2('layer/background/hoverOverlay')};
    }
  `; }
        #state_accessor_storage = __runInitializers(this, _state_initializers, void 0);
        get state() { return this.#state_accessor_storage; }
        set state(value) { this.#state_accessor_storage = value; }
        #name_accessor_storage = (__runInitializers(this, _state_extraInitializers), __runInitializers(this, _name_initializers, void 0));
        get name() { return this.#name_accessor_storage; }
        set name(value) { this.#name_accessor_storage = value; }
        #tooltip_accessor_storage = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _tooltip_initializers, void 0));
        get tooltip() { return this.#tooltip_accessor_storage; }
        set tooltip(value) { this.#tooltip_accessor_storage = value; }
        #icon_accessor_storage = (__runInitializers(this, _tooltip_extraInitializers), __runInitializers(this, _icon_initializers, void 0));
        get icon() { return this.#icon_accessor_storage; }
        set icon(value) { this.#icon_accessor_storage = value; }
        #closeable_accessor_storage = (__runInitializers(this, _icon_extraInitializers), __runInitializers(this, _closeable_initializers, false));
        get closeable() { return this.#closeable_accessor_storage; }
        set closeable(value) { this.#closeable_accessor_storage = value; }
        #onChipDelete_accessor_storage = (__runInitializers(this, _closeable_extraInitializers), __runInitializers(this, _onChipDelete_initializers, () => { }));
        get onChipDelete() { return this.#onChipDelete_accessor_storage; }
        set onChipDelete(value) { this.#onChipDelete_accessor_storage = value; }
        #onChipClick_accessor_storage = (__runInitializers(this, _onChipDelete_extraInitializers), __runInitializers(this, _onChipClick_initializers, () => { }));
        get onChipClick() { return this.#onChipClick_accessor_storage; }
        set onChipClick(value) { this.#onChipClick_accessor_storage = value; }
        render() {
            const isCandidate = this.state === 'candidate';
            return html `
      <div
        class="chip-card"
        data-testid="chat-panel-chip"
        data-state=${this.state}
        @click=${this.onChipClick}
      >
        <div class="chip-card-content">
          ${this.icon}
          <span class="chip-card-title">
            <span data-testid="chat-panel-chip-title">${this.name}</span>
          </span>
          <affine-tooltip>${this.tooltip}</affine-tooltip>
        </div>
        ${isCandidate
                ? html `${PlusIcon()}`
                : this.closeable
                    ? html `
                <div class="chip-card-close" @click=${this.onChipDelete}>
                  ${CloseIcon()}
                </div>
              `
                    : ''}
      </div>
    `;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _onChipClick_extraInitializers);
        }
    };
})();
export { ChatPanelChip };
//# sourceMappingURL=chip.js.map