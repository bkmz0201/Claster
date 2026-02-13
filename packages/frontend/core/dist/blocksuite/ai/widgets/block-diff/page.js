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
import { track } from '@affine/track';
import { WidgetComponent, WidgetViewExtension } from '@blocksuite/affine/std';
import { unsafeCSSVar, unsafeCSSVarV2 } from '@blocksuite/affine-shared/theme';
import { ArrowDownSmallIcon, ArrowUpSmallIcon, CloseIcon, DoneIcon, } from '@blocksuite/icons/lit';
import { css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { literal, unsafeStatic } from 'lit/static-html.js';
import { BlockDiffProvider } from '../../services/block-diff';
export const AFFINE_BLOCK_DIFF_WIDGET_FOR_PAGE = 'affine-block-diff-widget-for-page';
let AffineBlockDiffWidgetForPage = (() => {
    let _classSuper = WidgetComponent;
    let _currentIndex_decorators;
    let _currentIndex_initializers = [];
    let _currentIndex_extraInitializers = [];
    return class AffineBlockDiffWidgetForPage extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _currentIndex_decorators = [property({ type: Number })];
            __esDecorate(this, null, _currentIndex_decorators, { kind: "accessor", name: "currentIndex", static: false, private: false, access: { has: obj => "currentIndex" in obj, get: obj => obj.currentIndex, set: (obj, value) => { obj.currentIndex = value; } }, metadata: _metadata }, _currentIndex_initializers, _currentIndex_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .ai-block-diff-scroller-container {
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      bottom: 180px;
      margin: 0;
      display: flex;
      gap: 4px;
      justify-content: center;
      align-items: center;
      background-color: ${unsafeCSSVarV2('layer/background/overlayPanel')};
      box-shadow: ${unsafeCSSVar('shadow1')};
      border-radius: 8px;
      width: 350px;
      padding: 8px 4px;
      cursor: pointer;
    }

    .ai-block-diff-scroller {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .ai-block-diff-scroller span {
      display: inline-flex;
    }

    .ai-block-diff-scroller svg {
      color: ${unsafeCSSVarV2('icon/primary')};
    }

    .ai-block-diff-all-option {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 4px 8px;
    }
  `; }
        #currentIndex_accessor_storage = __runInitializers(this, _currentIndex_initializers, 0);
        get currentIndex() { return this.#currentIndex_accessor_storage; }
        set currentIndex(value) { this.#currentIndex_accessor_storage = value; }
        _handleScroll(dir) {
            const total = this.diffService.getTotalDiffs();
            const diffWidgets = Array.from(this.std.host.querySelectorAll('affine-block-diff-widget-for-block'));
            const diffs = diffWidgets.reduce((acc, widget) => {
                const aiDiffs = widget.shadowRoot?.querySelectorAll('.ai-block-diff');
                if (aiDiffs && aiDiffs.length > 0) {
                    acc.push(...aiDiffs);
                }
                return acc;
            }, []);
            if (dir === 'prev') {
                this.currentIndex = Math.max(0, this.currentIndex - 1);
            }
            else {
                this.currentIndex = Math.min(total - 1, this.currentIndex + 1);
            }
            diffs[this.currentIndex].scrollIntoView({ behavior: 'smooth' });
        }
        async _handleAcceptAll() {
            track.applyModel.widget.page.acceptAll();
            await this.diffService.acceptAll(this.std.store);
        }
        _handleRejectAll() {
            track.applyModel.widget.page.rejectAll();
            this.diffService.rejectAll();
        }
        get diffService() {
            return this.std.get(BlockDiffProvider);
        }
        render() {
            if (!this.diffService.hasDiff()) {
                return nothing;
            }
            const total = this.diffService.getTotalDiffs();
            return total === 0
                ? null
                : html `
          <div class="ai-block-diff-scroller-container">
            <div class="ai-block-diff-scroller">
              <span @click=${() => this._handleScroll('next')}
                >${ArrowDownSmallIcon()}</span
              >
              <span class="ai-block-diff-scroller-current"
                >${Math.min(this.currentIndex + 1, total)}</span
              >
              <span>/</span>
              <span class="ai-block-diff-scroller-total">${total}</span>
              <span @click=${() => this._handleScroll('prev')}
                >${ArrowUpSmallIcon()}</span
              >
            </div>
            <div
              class="ai-block-diff-all-option"
              @click=${() => this._handleRejectAll()}
            >
              ${CloseIcon({
                    style: `color: ${unsafeCSSVarV2('icon/secondary')}`,
                })}
              Reject all
            </div>
            <div
              class="ai-block-diff-all-option"
              @click=${() => this._handleAcceptAll()}
            >
              ${DoneIcon({
                    style: `color: ${unsafeCSSVarV2('icon/activated')}`,
                })}
              Accept all
            </div>
          </div>
        `;
        }
        connectedCallback() {
            super.connectedCallback();
            this.disposables.add(this.diffService.diffMap$.subscribe(() => {
                this.requestUpdate();
            }));
            this.disposables.add(this.diffService.rejects$.subscribe(() => {
                this.requestUpdate();
            }));
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _currentIndex_extraInitializers);
        }
    };
})();
export { AffineBlockDiffWidgetForPage };
export const blockDiffWidgetForPage = WidgetViewExtension('affine:page', AFFINE_BLOCK_DIFF_WIDGET_FOR_PAGE, literal `${unsafeStatic(AFFINE_BLOCK_DIFF_WIDGET_FOR_PAGE)}`);
//# sourceMappingURL=page.js.map