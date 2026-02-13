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
import { createLitPortal } from '@blocksuite/affine/components/portal';
import { WithDisposable } from '@blocksuite/affine/global/lit';
import { BlockSelection, TextSelection, } from '@blocksuite/affine/std';
import { flip, offset } from '@floating-ui/dom';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { AIProvider } from '../provider';
import { getAIPanelWidget } from '../utils/ai-widgets';
import { extractSelectedContent } from '../utils/extract';
let AskAIToolbarButton = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _actionGroups_decorators;
    let _actionGroups_initializers = [];
    let _actionGroups_extraInitializers = [];
    return class AskAIToolbarButton extends _classSuper {
        constructor() {
            super(...arguments);
            this._abortController = null;
            this._panelRoot = null;
            this.#host_accessor_storage = __runInitializers(this, _host_initializers, void 0);
            this.#actionGroups_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _actionGroups_initializers, void 0));
            this._onItemClick = (__runInitializers(this, _actionGroups_extraInitializers), () => {
                const aiPanel = getAIPanelWidget(this.host);
                aiPanel.restoreSelection();
                this._clearAbortController();
            });
            this._clearAbortController = () => {
                this._abortController?.abort();
                this._abortController = null;
            };
            this._openAIPanel = () => {
                this._clearAbortController();
                const aiPanel = getAIPanelWidget(this.host);
                this._abortController = new AbortController();
                this._panelRoot = createLitPortal({
                    template: html `
        <ask-ai-panel
          .host=${this.host}
          .actionGroups=${this.actionGroups}
          .onItemClick=${this._onItemClick}
        ></ask-ai-panel>
      `,
                    computePosition: {
                        referenceElement: aiPanel,
                        placement: 'top-start',
                        middleware: [flip(), offset({ mainAxis: 3 })],
                        autoUpdate: true,
                    },
                    abortController: this._abortController,
                    closeOnClickAway: true,
                }).portal;
            };
            this._generateAnswer = ({ finish, input }) => {
                finish('success');
                const aiPanel = getAIPanelWidget(this.host);
                aiPanel.hide();
                extractSelectedContent(this.host)
                    .then(context => {
                    AIProvider.slots.requestSendWithChat.next({
                        input,
                        context,
                        host: this.host,
                    });
                })
                    .catch(console.error);
            };
            this._onClick = () => {
                const aiPanel = getAIPanelWidget(this.host);
                if (!aiPanel.config)
                    return;
                aiPanel.config.generateAnswer = this._generateAnswer;
                aiPanel.config.inputCallback = text => {
                    if (!this._panelRoot)
                        return;
                    this._panelRoot.style.visibility = text ? 'hidden' : 'visible';
                };
                const textSelection = this.host.selection.find(TextSelection);
                const blockSelections = this.host.selection.filter(BlockSelection);
                let lastBlockId;
                if (textSelection) {
                    lastBlockId = textSelection.to?.blockId ?? textSelection.blockId;
                }
                else if (blockSelections.length) {
                    lastBlockId = blockSelections[blockSelections.length - 1].blockId;
                }
                if (!lastBlockId)
                    return;
                const block = this.host.view.getBlock(lastBlockId);
                if (!block)
                    return;
                aiPanel.setState('input', block);
                setTimeout(() => this._openAIPanel(), 0);
            };
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _host_decorators = [property({ attribute: false })];
            _actionGroups_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _actionGroups_decorators, { kind: "accessor", name: "actionGroups", static: false, private: false, access: { has: obj => "actionGroups" in obj, get: obj => obj.actionGroups, set: (obj, value) => { obj.actionGroups = value; } }, metadata: _metadata }, _actionGroups_initializers, _actionGroups_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .ask-ai-button {
      border-radius: 4px;
      position: relative;
      user-select: none;
    }
  `; }
        #host_accessor_storage;
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #actionGroups_accessor_storage;
        get actionGroups() { return this.#actionGroups_accessor_storage; }
        set actionGroups(value) { this.#actionGroups_accessor_storage = value; }
        render() {
            return html `<div
      class="ask-ai-button"
      data-testid="ask-ai-button"
      @click=${this._onClick}
    >
      <ask-ai-icon .size=${'middle'}></ask-ai-icon>
    </div>`;
        }
    };
})();
export { AskAIToolbarButton };
//# sourceMappingURL=ask-ai-toolbar.js.map