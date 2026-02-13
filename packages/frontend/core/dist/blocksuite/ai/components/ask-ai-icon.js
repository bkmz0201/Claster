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
import { AIStarIcon } from '@blocksuite/affine/components/icons';
import { WithDisposable } from '@blocksuite/affine/global/lit';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
const buttonWidthMap = {
    small: '72px',
    middle: '76px',
    large: '82px',
};
const buttonHeightMap = {
    small: '24px',
    middle: '32px',
    large: '32px',
};
let AskAIIcon = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _size_decorators;
    let _size_initializers = [];
    let _size_extraInitializers = [];
    return class AskAIIcon extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _size_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _size_decorators, { kind: "accessor", name: "size", static: false, private: false, access: { has: obj => "size" in obj, get: obj => obj.size, set: (obj, value) => { obj.size = value; } }, metadata: _metadata }, _size_initializers, _size_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        #size_accessor_storage = __runInitializers(this, _size_initializers, void 0);
        get size() { return this.#size_accessor_storage; }
        set size(value) { this.#size_accessor_storage = value; }
        static { this.styles = css `
    .ask-ai-icon-button {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--affine-brand-color);
      font-size: var(--affine-font-sm);
      font-weight: 500;
    }

    .ask-ai-icon-button.small {
      font-size: var(--affine-font-xs);
      svg {
        scale: 0.8;
        margin-right: 2px;
      }
    }

    .ask-ai-icon-button.large {
      font-size: var(--affine-font-md);
      svg {
        scale: 1.2;
      }
    }

    .ask-ai-icon-button span {
      line-height: 22px;
    }

    .ask-ai-icon-button svg {
      margin-right: 4px;
      color: var(--affine-brand-color);
    }
  `; }
        render() {
            return html `
      <icon-button
        class="ask-ai-icon-button ${this.size}"
        width=${buttonWidthMap[this.size]}
        height=${buttonHeightMap[this.size]}
      >
        ${AIStarIcon}
        <span>Ask AI</span>
      </icon-button>
    `;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _size_extraInitializers);
        }
    };
})();
export { AskAIIcon };
//# sourceMappingURL=ask-ai-icon.js.map