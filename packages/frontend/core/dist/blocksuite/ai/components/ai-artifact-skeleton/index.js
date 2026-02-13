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
import { unsafeCSSVarV2 } from '@blocksuite/affine-shared/theme';
import { css, html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
/**
 * ArtifactSkeleton
 *
 * A lightweight loading skeleton used while an artifact preview is fetching / processing.
 * It mimics the layout of a document – an optional icon followed by several animated grey lines.
 *
 * Animation is implemented with pure CSS keyframes (no framer-motion dependency).
 * Only a single prop is supported for now:
 *   - `icon` – TemplateResult that will be rendered at the top-left position.
 */
let ArtifactSkeleton = (() => {
    let _classSuper = LitElement;
    let _icon_decorators;
    let _icon_initializers = [];
    let _icon_extraInitializers = [];
    return class ArtifactSkeleton extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _icon_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _icon_decorators, { kind: "accessor", name: "icon", static: false, private: false, access: { has: obj => "icon" in obj, get: obj => obj.icon, set: (obj, value) => { obj.icon = value; } }, metadata: _metadata }, _icon_initializers, _icon_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        /* ----- Styling --------------------------------------------------------------------------- */
        static { this.styles = css `
    :host {
      /* The host is an inline-block so it can size to its contents. */
      display: inline-block;
      position: relative;
      /* The size roughly follows the design used in the legacy React implementation. */
      width: 250px;
      height: 200px;
      box-sizing: border-box;
    }

    /* Optional icon wrapper */
    .icon {
      position: absolute;
      top: 10px;
      left: 11px;
      width: 32px;
      height: 32px;

      svg {
        color: ${unsafeCSSVarV2('icon/activated')};
        width: 100%;
        height: 100%;
      }
    }

    /* Base line style */
    .line {
      position: absolute;
      left: 11px;
      height: 10px;
      border-radius: 6px;
      background-color: ${unsafeCSSVarV2('layer/background/tertiary')};
    }

    /* Keyframes for each line – width cycles through a handful of values to create movement */
    @keyframes line1Anim {
      0%,
      100% {
        width: 98px;
      }
      25% {
        width: 120px;
      }
      50% {
        width: 85px;
      }
      75% {
        width: 110px;
      }
    }
    @keyframes line2Anim {
      0%,
      100% {
        width: 195px;
      }
      30% {
        width: 180px;
      }
      60% {
        width: 210px;
      }
      80% {
        width: 165px;
      }
    }
    @keyframes line3Anim {
      0%,
      100% {
        width: 163px;
      }
      40% {
        width: 140px;
      }
      70% {
        width: 180px;
      }
      90% {
        width: 155px;
      }
    }
    @keyframes line4Anim {
      0%,
      100% {
        width: 107px;
      }
      20% {
        width: 130px;
      }
      60% {
        width: 90px;
      }
      85% {
        width: 115px;
      }
    }
    @keyframes line5Anim {
      0%,
      100% {
        width: 134px;
      }
      35% {
        width: 160px;
      }
      65% {
        width: 120px;
      }
      80% {
        width: 145px;
      }
    }
    @keyframes line6Anim {
      0%,
      100% {
        width: 154px;
      }
      30% {
        width: 135px;
      }
      55% {
        width: 175px;
      }
      75% {
        width: 160px;
      }
    }

    .line1 {
      top: 48.5px;
      animation: line1Anim 3.2s ease-in-out infinite;
    }
    .line2 {
      top: 73.5px;
      animation: line2Anim 4.1s ease-in-out infinite;
    }
    .line3 {
      top: 98.5px;
      animation: line3Anim 2.8s ease-in-out infinite;
    }
    .line4 {
      top: 123.5px;
      animation: line4Anim 3.7s ease-in-out infinite;
    }
    .line5 {
      top: 148.5px;
      animation: line5Anim 3.5s ease-in-out infinite;
    }
    .line6 {
      top: 170.5px;
      animation: line6Anim 4.3s ease-in-out infinite;
    }
  `; }
        #icon_accessor_storage = __runInitializers(this, _icon_initializers, null);
        /* ----- Public API ------------------------------------------------------------------------ */
        /**
         * Optional icon rendered at the top-left corner.
         * It should be a lit `TemplateResult`, typically an inline SVG.
         */
        get icon() { return this.#icon_accessor_storage; }
        set icon(value) { this.#icon_accessor_storage = value; }
        /* ----- Render --------------------------------------------------------------------------- */
        render() {
            return html `
      ${this.icon ? html `<div class="icon">${this.icon}</div>` : nothing}
      <div class="line line1"></div>
      <div class="line line2"></div>
      <div class="line line3"></div>
      <div class="line line4"></div>
      <div class="line line5"></div>
      <div class="line line6"></div>
    `;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _icon_extraInitializers);
        }
    };
})();
export { ArtifactSkeleton };
//# sourceMappingURL=index.js.map