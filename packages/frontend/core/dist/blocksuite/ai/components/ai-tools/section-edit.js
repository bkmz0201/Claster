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
import { ShadowlessElement, } from '@blocksuite/affine/std';
import { isInsidePageEditor } from '@blocksuite/affine-shared/utils';
import { CopyIcon, InsertBleowIcon, LinkedPageIcon, PageIcon, } from '@blocksuite/icons/lit';
import { css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { EDGELESS_INSERT, PAGE_INSERT, SAVE_AS_DOC, } from '../../_common/chat-actions-handle';
import { copyText } from '../../utils/editor-actions';
let SectionEditTool = (() => {
    let _classSuper = WithDisposable(ShadowlessElement);
    let _data_decorators;
    let _data_initializers = [];
    let _data_extraInitializers = [];
    let _extensions_decorators;
    let _extensions_initializers = [];
    let _extensions_extraInitializers = [];
    let _affineFeatureFlagService_decorators;
    let _affineFeatureFlagService_initializers = [];
    let _affineFeatureFlagService_extraInitializers = [];
    let _notificationService_decorators;
    let _notificationService_initializers = [];
    let _notificationService_extraInitializers = [];
    let _theme_decorators;
    let _theme_initializers = [];
    let _theme_extraInitializers = [];
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _independentMode_decorators;
    let _independentMode_initializers = [];
    let _independentMode_extraInitializers = [];
    return class SectionEditTool extends _classSuper {
        constructor() {
            super(...arguments);
            this.#data_accessor_storage = __runInitializers(this, _data_initializers, void 0);
            this.#extensions_accessor_storage = (__runInitializers(this, _data_extraInitializers), __runInitializers(this, _extensions_initializers, void 0));
            this.#affineFeatureFlagService_accessor_storage = (__runInitializers(this, _extensions_extraInitializers), __runInitializers(this, _affineFeatureFlagService_initializers, void 0));
            this.#notificationService_accessor_storage = (__runInitializers(this, _affineFeatureFlagService_extraInitializers), __runInitializers(this, _notificationService_initializers, void 0));
            this.#theme_accessor_storage = (__runInitializers(this, _notificationService_extraInitializers), __runInitializers(this, _theme_initializers, void 0));
            this.#host_accessor_storage = (__runInitializers(this, _theme_extraInitializers), __runInitializers(this, _host_initializers, void 0));
            this.#independentMode_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _independentMode_initializers, void 0));
            this.notifySuccess = (__runInitializers(this, _independentMode_extraInitializers), (title) => {
                this.notificationService.notify({
                    title: title,
                    accent: 'success',
                    onClose: function () { },
                });
            });
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _data_decorators = [property({ attribute: false })];
            _extensions_decorators = [property({ attribute: false })];
            _affineFeatureFlagService_decorators = [property({ attribute: false })];
            _notificationService_decorators = [property({ attribute: false })];
            _theme_decorators = [property({ attribute: false })];
            _host_decorators = [property({ attribute: false })];
            _independentMode_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _data_decorators, { kind: "accessor", name: "data", static: false, private: false, access: { has: obj => "data" in obj, get: obj => obj.data, set: (obj, value) => { obj.data = value; } }, metadata: _metadata }, _data_initializers, _data_extraInitializers);
            __esDecorate(this, null, _extensions_decorators, { kind: "accessor", name: "extensions", static: false, private: false, access: { has: obj => "extensions" in obj, get: obj => obj.extensions, set: (obj, value) => { obj.extensions = value; } }, metadata: _metadata }, _extensions_initializers, _extensions_extraInitializers);
            __esDecorate(this, null, _affineFeatureFlagService_decorators, { kind: "accessor", name: "affineFeatureFlagService", static: false, private: false, access: { has: obj => "affineFeatureFlagService" in obj, get: obj => obj.affineFeatureFlagService, set: (obj, value) => { obj.affineFeatureFlagService = value; } }, metadata: _metadata }, _affineFeatureFlagService_initializers, _affineFeatureFlagService_extraInitializers);
            __esDecorate(this, null, _notificationService_decorators, { kind: "accessor", name: "notificationService", static: false, private: false, access: { has: obj => "notificationService" in obj, get: obj => obj.notificationService, set: (obj, value) => { obj.notificationService = value; } }, metadata: _metadata }, _notificationService_initializers, _notificationService_extraInitializers);
            __esDecorate(this, null, _theme_decorators, { kind: "accessor", name: "theme", static: false, private: false, access: { has: obj => "theme" in obj, get: obj => obj.theme, set: (obj, value) => { obj.theme = value; } }, metadata: _metadata }, _theme_initializers, _theme_extraInitializers);
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _independentMode_decorators, { kind: "accessor", name: "independentMode", static: false, private: false, access: { has: obj => "independentMode" in obj, get: obj => obj.independentMode, set: (obj, value) => { obj.independentMode = value; } }, metadata: _metadata }, _independentMode_initializers, _independentMode_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .section-edit-result {
      padding: 12px;
      margin: 8px 0;
      border-radius: 8px;
      border: 0.5px solid ${unsafeCSSVarV2('layer/insideBorder/border')};

      .section-edit-header {
        height: 24px;
        margin-bottom: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .section-edit-title {
          display: flex;
          align-items: center;
          gap: 8px;

          svg {
            width: 24px;
            height: 24px;
            color: ${unsafeCSSVarV2('icon/primary')};
          }

          span {
            font-size: 14px;
            font-weight: 500;
            color: ${unsafeCSSVarV2('icon/primary')};
            line-height: 24px;
          }
        }

        .section-edit-actions {
          display: flex;
          align-items: center;
          gap: 8px;

          .edit-button {
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            cursor: pointer;
            &:hover {
              background-color: ${unsafeCSSVarV2('layer/background/hoverOverlay')};
            }

            svg {
              width: 20px;
              height: 20px;
              color: ${unsafeCSSVarV2('icon/primary')};
            }
          }
        }
      }
    }
  `; }
        #data_accessor_storage;
        get data() { return this.#data_accessor_storage; }
        set data(value) { this.#data_accessor_storage = value; }
        #extensions_accessor_storage;
        get extensions() { return this.#extensions_accessor_storage; }
        set extensions(value) { this.#extensions_accessor_storage = value; }
        #affineFeatureFlagService_accessor_storage;
        get affineFeatureFlagService() { return this.#affineFeatureFlagService_accessor_storage; }
        set affineFeatureFlagService(value) { this.#affineFeatureFlagService_accessor_storage = value; }
        #notificationService_accessor_storage;
        get notificationService() { return this.#notificationService_accessor_storage; }
        set notificationService(value) { this.#notificationService_accessor_storage = value; }
        #theme_accessor_storage;
        get theme() { return this.#theme_accessor_storage; }
        set theme(value) { this.#theme_accessor_storage = value; }
        #host_accessor_storage;
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #independentMode_accessor_storage;
        get independentMode() { return this.#independentMode_accessor_storage; }
        set independentMode(value) { this.#independentMode_accessor_storage = value; }
        get selection() {
            const value = this.host?.selection.value ?? [];
            return {
                text: value.find(v => v.type === 'text'),
                blocks: value.filter(v => v.type === 'block'),
            };
        }
        renderToolCall() {
            return html `
      <tool-call-card
        .name=${`Editing: ${this.data.args.instructions}`}
        .icon=${PageIcon()}
      ></tool-call-card>
    `;
        }
        renderToolResult() {
            if (this.data.type !== 'tool-result') {
                return nothing;
            }
            const result = this.data.result;
            if (result && 'content' in result) {
                return html `
        <div class="section-edit-result">
          <div class="section-edit-header">
            <div class="section-edit-title">
              ${PageIcon()}
              <span>Edited Content</span>
            </div>
            <div class="section-edit-actions">
              <div
                class="edit-button"
                @click=${async () => {
                    const success = await copyText(result.content);
                    if (success) {
                        this.notifySuccess('Copied to clipboard');
                    }
                }}
              >
                ${CopyIcon()}
                <affine-tooltip>Copy</affine-tooltip>
              </div>
              ${this.independentMode
                    ? nothing
                    : html `<div
                    class="edit-button"
                    @click=${async () => {
                        if (!this.host)
                            return;
                        if (this.host.std.store.readonly$.value) {
                            this.notificationService.notify({
                                title: 'Cannot insert in read-only mode',
                                accent: 'error',
                                onClose: () => { },
                            });
                            return;
                        }
                        if (isInsidePageEditor(this.host)) {
                            await PAGE_INSERT.handler(this.host, result.content, this.selection);
                        }
                        else {
                            await EDGELESS_INSERT.handler(this.host, result.content, this.selection);
                        }
                    }}
                  >
                    ${InsertBleowIcon()}
                    <affine-tooltip>Insert below</affine-tooltip>
                  </div>`}
              ${this.independentMode
                    ? nothing
                    : html `<div
                    class="edit-button"
                    @click=${async () => {
                        if (!this.host)
                            return;
                        SAVE_AS_DOC.handler(this.host, result.content);
                    }}
                  >
                    ${LinkedPageIcon()}
                    <affine-tooltip>Create new doc</affine-tooltip>
                  </div>`}
            </div>
          </div>
          <chat-content-rich-text
            .text=${result.content}
            .state=${'finished'}
            .extensions=${this.extensions}
            .affineFeatureFlagService=${this.affineFeatureFlagService}
            .theme=${this.theme}
          ></chat-content-rich-text>
        </div>
      `;
            }
            return html `
      <tool-call-failed
        .name=${'Section edit failed'}
        .icon=${PageIcon()}
      ></tool-call-failed>
    `;
        }
        render() {
            const { data } = this;
            if (data.type === 'tool-call') {
                return this.renderToolCall();
            }
            if (data.type === 'tool-result') {
                return this.renderToolResult();
            }
            return nothing;
        }
    };
})();
export { SectionEditTool };
//# sourceMappingURL=section-edit.js.map