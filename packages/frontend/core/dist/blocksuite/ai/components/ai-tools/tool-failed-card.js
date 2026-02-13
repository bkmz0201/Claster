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
import { unsafeCSSVarV2 } from '@blocksuite/affine/shared/theme';
import { ShadowlessElement } from '@blocksuite/affine/std';
import { ToolIcon } from '@blocksuite/icons/lit';
import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
let ToolFailedCard = (() => {
    let _classSuper = WithDisposable(ShadowlessElement);
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _icon_decorators;
    let _icon_initializers = [];
    let _icon_extraInitializers = [];
    return class ToolFailedCard extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _name_decorators = [property({ attribute: false })];
            _icon_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _name_decorators, { kind: "accessor", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(this, null, _icon_decorators, { kind: "accessor", name: "icon", static: false, private: false, access: { has: obj => "icon" in obj, get: obj => obj.icon, set: (obj, value) => { obj.icon = value; } }, metadata: _metadata }, _icon_initializers, _icon_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .ai-tool-failed-wrapper {
      padding: 12px;
      margin: 8px 0;
      border-radius: 8px;
      border: 0.5px solid ${unsafeCSSVarV2('layer/insideBorder/border')};

      .ai-tool-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
      }

      .ai-icon {
        width: 24px;
        height: 24px;

        svg {
          width: 24px;
          height: 24px;
          color: ${unsafeCSSVarV2('button/error')};
        }
      }

      .ai-error-name {
        font-size: 14px;
        font-weight: 500;
        line-height: 24px;
        margin-left: 0px;
        margin-right: auto;
        color: ${unsafeCSSVarV2('button/error')};
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  `; }
        #name_accessor_storage = __runInitializers(this, _name_initializers, 'Tool calling failed');
        get name() { return this.#name_accessor_storage; }
        set name(value) { this.#name_accessor_storage = value; }
        #icon_accessor_storage = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _icon_initializers, ToolIcon()));
        get icon() { return this.#icon_accessor_storage; }
        set icon(value) { this.#icon_accessor_storage = value; }
        render() {
            return html `
      <div class="ai-tool-failed-wrapper">
        <div class="ai-tool-header">
          <div class="ai-icon">${this.icon}</div>
          <div class="ai-error-name">${this.name}</div>
        </div>
      </div>
    `;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _icon_extraInitializers);
        }
    };
})();
export { ToolFailedCard };
//# sourceMappingURL=tool-failed-card.js.map