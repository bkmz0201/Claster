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
import { getStoreManager } from '@affine/core/blocksuite/manager/store';
import { getAFFiNEWorkspaceSchema } from '@affine/core/modules/workspace';
import { getEmbedLinkedDocIcons } from '@blocksuite/affine/blocks/embed-doc';
import { RefNodeSlotsProvider } from '@blocksuite/affine/inlines/reference';
import { unsafeCSSVarV2 } from '@blocksuite/affine/shared/theme';
import { MarkdownTransformer } from '@blocksuite/affine/widgets/linked-doc';
import { CopyIcon, PageIcon, ToolIcon } from '@blocksuite/icons/lit';
import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { getCustomPageEditorBlockSpecs } from '../text-renderer';
import { ArtifactTool } from './artifact-tool';
/**
 * Component to render doc compose tool call/result inside chat.
 */
let DocComposeTool = (() => {
    let _classSuper = ArtifactTool;
    let _std_decorators;
    let _std_initializers = [];
    let _std_extraInitializers = [];
    let _notificationService_decorators;
    let _notificationService_initializers = [];
    let _notificationService_extraInitializers = [];
    return class DocComposeTool extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _std_decorators = [property({ attribute: false })];
            _notificationService_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _std_decorators, { kind: "accessor", name: "std", static: false, private: false, access: { has: obj => "std" in obj, get: obj => obj.std, set: (obj, value) => { obj.std = value; } }, metadata: _metadata }, _std_initializers, _std_extraInitializers);
            __esDecorate(this, null, _notificationService_decorators, { kind: "accessor", name: "notificationService", static: false, private: false, access: { has: obj => "notificationService" in obj, get: obj => obj.notificationService, set: (obj, value) => { obj.notificationService = value; } }, metadata: _metadata }, _notificationService_initializers, _notificationService_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .doc-compose-result-preview {
      padding: 24px;
    }

    .doc-compose-result-preview-title {
      font-size: 36px;
      font-weight: 600;
      padding: 14px 0px 38px 0px;
    }

    .doc-compose-result-save-as-doc {
      background: transparent;
      border-radius: 8px;
      border: 1px solid ${unsafeCSSVarV2('button/innerBlackBorder')};
      cursor: pointer;
      font-size: 15px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 0 8px;
      height: 32px;
      font-weight: 500;
    }

    .doc-compose-result-preview-loading {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .doc-compose-result-save-as-doc:hover {
      background: ${unsafeCSSVarV2('switch/buttonBackground/hover')};
    }
  `; }
        #std_accessor_storage = __runInitializers(this, _std_initializers, void 0);
        get std() { return this.#std_accessor_storage; }
        set std(value) { this.#std_accessor_storage = value; }
        #notificationService_accessor_storage = (__runInitializers(this, _std_extraInitializers), __runInitializers(this, _notificationService_initializers, void 0));
        get notificationService() { return this.#notificationService_accessor_storage; }
        set notificationService(value) { this.#notificationService_accessor_storage = value; }
        getBanner(theme) {
            const { LinkedDocEmptyBanner } = getEmbedLinkedDocIcons(theme, 'page', 'horizontal');
            return LinkedDocEmptyBanner;
        }
        getCardMeta() {
            return {
                title: this.data.args.title,
                className: 'doc-compose-result',
            };
        }
        getIcon() {
            return PageIcon();
        }
        getPreviewContent() {
            if (!this.std)
                return html ``;
            const resultData = this.data;
            const title = this.data.args.title;
            const result = resultData.type === 'tool-result' ? resultData.result : null;
            const successResult = result && 'markdown' in result ? result : null;
            return html `<div class="doc-compose-result-preview">
      <div class="doc-compose-result-preview-title">${title}</div>
      ${successResult
                ? html `<text-renderer
            .answer=${successResult.markdown}
            .schema=${this.std?.store.schema}
            .options=${{
                    customHeading: true,
                    extensions: getCustomPageEditorBlockSpecs(),
                    theme: this.theme,
                }}
          ></text-renderer>`
                : html ``}
    </div>`;
        }
        getPreviewControls() {
            if (!this.std)
                return;
            const std = this.std;
            const resultData = this.data;
            const title = this.data.args.title;
            const result = resultData.type === 'tool-result' ? resultData.result : null;
            const successResult = result && 'markdown' in result ? result : null;
            const copyMarkdown = async () => {
                if (!successResult) {
                    return;
                }
                await navigator.clipboard
                    .writeText(successResult.markdown)
                    .catch(console.error);
                this.notificationService.toast('Copied markdown to clipboard');
            };
            const saveAsDoc = async () => {
                try {
                    if (!successResult) {
                        return;
                    }
                    const workspace = std.store.workspace;
                    const refNodeSlots = std.getOptional(RefNodeSlotsProvider);
                    const docId = await MarkdownTransformer.importMarkdownToDoc({
                        collection: workspace,
                        schema: getAFFiNEWorkspaceSchema(),
                        markdown: successResult.markdown,
                        fileName: title,
                        extensions: getStoreManager().config.init().value.get('store'),
                    });
                    if (docId) {
                        const open = await this.notificationService.confirm({
                            title: 'Open the doc you just created',
                            message: 'Doc saved successfully! Would you like to open it now?',
                            cancelText: 'Cancel',
                            confirmText: 'Open',
                        });
                        if (open) {
                            refNodeSlots?.docLinkClicked.next({
                                pageId: docId,
                                openMode: 'open-in-active-view',
                                host: std.host,
                            });
                        }
                    }
                    else {
                        this.notificationService.toast('Failed to create document');
                    }
                }
                catch (e) {
                    console.error(e);
                    this.notificationService.toast('Failed to create document');
                }
            };
            return this.data.type === 'tool-call'
                ? undefined
                : html `
          <button class="doc-compose-result-save-as-doc" @click=${saveAsDoc}>
            ${PageIcon({
                    width: '20',
                    height: '20',
                    style: `color: ${unsafeCSSVarV2('icon/primary')}`,
                })}
            Save as doc
          </button>
          <icon-button @click=${copyMarkdown} title="Copy markdown">
            ${CopyIcon({ width: '20', height: '20' })}
          </icon-button>
        `;
        }
        getErrorTemplate() {
            if (this.data.type === 'tool-result' &&
                this.data.result &&
                'type' in this.data.result &&
                this.data.result.type === 'error') {
                return html `<tool-call-failed
        .name=${'Doc compose failed'}
        .icon=${ToolIcon()}
      ></tool-call-failed>`;
            }
            return null;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _notificationService_extraInitializers);
        }
    };
})();
export { DocComposeTool };
//# sourceMappingURL=doc-compose.js.map