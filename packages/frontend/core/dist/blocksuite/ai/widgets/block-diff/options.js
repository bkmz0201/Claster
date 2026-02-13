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
import track from '@affine/track';
import { WithDisposable } from '@blocksuite/affine/global/lit';
import { unsafeCSSVar, unsafeCSSVarV2 } from '@blocksuite/affine/shared/theme';
import { CloseIcon, DoneIcon } from '@blocksuite/icons/lit';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
let BlockDiffOptions = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _onAccept_decorators;
    let _onAccept_initializers = [];
    let _onAccept_extraInitializers = [];
    let _op_decorators;
    let _op_initializers = [];
    let _op_extraInitializers = [];
    let _onReject_decorators;
    let _onReject_initializers = [];
    let _onReject_extraInitializers = [];
    return class BlockDiffOptions extends _classSuper {
        constructor() {
            super(...arguments);
            this.#onAccept_accessor_storage = __runInitializers(this, _onAccept_initializers, void 0);
            this.#op_accessor_storage = (__runInitializers(this, _onAccept_extraInitializers), __runInitializers(this, _op_initializers, void 0));
            this.#onReject_accessor_storage = (__runInitializers(this, _op_extraInitializers), __runInitializers(this, _onReject_initializers, void 0));
            this._handleAcceptClick = (__runInitializers(this, _onReject_extraInitializers), () => {
                track.applyModel.widget.block.accept();
                this.onAccept(this.op);
            });
            this._handleRejectClick = () => {
                track.applyModel.widget.block.reject();
                this.onReject(this.op);
            };
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _onAccept_decorators = [property({ attribute: false })];
            _op_decorators = [property({ attribute: false })];
            _onReject_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _onAccept_decorators, { kind: "accessor", name: "onAccept", static: false, private: false, access: { has: obj => "onAccept" in obj, get: obj => obj.onAccept, set: (obj, value) => { obj.onAccept = value; } }, metadata: _metadata }, _onAccept_initializers, _onAccept_extraInitializers);
            __esDecorate(this, null, _op_decorators, { kind: "accessor", name: "op", static: false, private: false, access: { has: obj => "op" in obj, get: obj => obj.op, set: (obj, value) => { obj.op = value; } }, metadata: _metadata }, _op_initializers, _op_extraInitializers);
            __esDecorate(this, null, _onReject_decorators, { kind: "accessor", name: "onReject", static: false, private: false, access: { has: obj => "onReject" in obj, get: obj => obj.onReject, set: (obj, value) => { obj.onReject = value; } }, metadata: _metadata }, _onReject_initializers, _onReject_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      position: absolute;
      right: -20px;
      top: 0;

      display: flex;
      flex-direction: column;
      gap: 4px;
      cursor: pointer;
      pointer-events: auto;
    }

    .ai-block-diff-option {
      padding: 2px;
      border-radius: 4px;
      box-shadow: ${unsafeCSSVar('shadow1')};
      display: flex;
      background-color: ${unsafeCSSVarV2('layer/background/overlayPanel')};
      align-items: center;
      justify-content: center;
      border-radius: 4px;
    }

    .ai-block-diff-option.accept {
      color: ${unsafeCSSVarV2('icon/activated')};
    }

    .ai-block-diff-option.reject {
      color: ${unsafeCSSVarV2('icon/secondary')};
    }
  `; }
        #onAccept_accessor_storage;
        get onAccept() { return this.#onAccept_accessor_storage; }
        set onAccept(value) { this.#onAccept_accessor_storage = value; }
        #op_accessor_storage;
        get op() { return this.#op_accessor_storage; }
        set op(value) { this.#op_accessor_storage = value; }
        #onReject_accessor_storage;
        get onReject() { return this.#onReject_accessor_storage; }
        set onReject(value) { this.#onReject_accessor_storage = value; }
        render() {
            return html `
      <div
        class="ai-block-diff-option accept"
        @click=${this._handleAcceptClick}
      >
        ${DoneIcon()}
      </div>
      <div
        class="ai-block-diff-option reject"
        @click=${this._handleRejectClick}
      >
        ${CloseIcon()}
      </div>
    `;
        }
    };
})();
export { BlockDiffOptions };
//# sourceMappingURL=options.js.map