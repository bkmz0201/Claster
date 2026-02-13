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
import { ShadowlessElement } from '@blocksuite/affine/std';
import { LoadingIcon } from '@blocksuite/affine-components/icons';
import { CloseIcon, CopyIcon, DoneIcon, ExpandCloseIcon, ExpandFullIcon, PenIcon as EditIcon, PenIcon, } from '@blocksuite/icons/lit';
import { css, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { AIProvider } from '../../provider';
import { BlockDiffProvider } from '../../services/block-diff';
import { diffMarkdown } from '../../utils/apply-model/markdown-diff';
import { copyText } from '../../utils/editor-actions';
function removeMarkdownComments(markdown) {
    return markdown.replace(/<!--[\s\S]*?-->/g, '');
}
let DocEditTool = (() => {
    let _classSuper = WithDisposable(ShadowlessElement);
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _data_decorators;
    let _data_initializers = [];
    let _data_extraInitializers = [];
    let _renderRichText_decorators;
    let _renderRichText_initializers = [];
    let _renderRichText_extraInitializers = [];
    let _notificationService_decorators;
    let _notificationService_initializers = [];
    let _notificationService_extraInitializers = [];
    let _isCollapsed_decorators;
    let _isCollapsed_initializers = [];
    let _isCollapsed_extraInitializers = [];
    let _applyingMap_decorators;
    let _applyingMap_initializers = [];
    let _applyingMap_extraInitializers = [];
    let _acceptingMap_decorators;
    let _acceptingMap_initializers = [];
    let _acceptingMap_extraInitializers = [];
    return class DocEditTool extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _host_decorators = [property({ attribute: false })];
            _data_decorators = [property({ attribute: false })];
            _renderRichText_decorators = [property({ attribute: false })];
            _notificationService_decorators = [property({ attribute: false })];
            _isCollapsed_decorators = [state()];
            _applyingMap_decorators = [state()];
            _acceptingMap_decorators = [state()];
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _data_decorators, { kind: "accessor", name: "data", static: false, private: false, access: { has: obj => "data" in obj, get: obj => obj.data, set: (obj, value) => { obj.data = value; } }, metadata: _metadata }, _data_initializers, _data_extraInitializers);
            __esDecorate(this, null, _renderRichText_decorators, { kind: "accessor", name: "renderRichText", static: false, private: false, access: { has: obj => "renderRichText" in obj, get: obj => obj.renderRichText, set: (obj, value) => { obj.renderRichText = value; } }, metadata: _metadata }, _renderRichText_initializers, _renderRichText_extraInitializers);
            __esDecorate(this, null, _notificationService_decorators, { kind: "accessor", name: "notificationService", static: false, private: false, access: { has: obj => "notificationService" in obj, get: obj => obj.notificationService, set: (obj, value) => { obj.notificationService = value; } }, metadata: _metadata }, _notificationService_initializers, _notificationService_extraInitializers);
            __esDecorate(this, null, _isCollapsed_decorators, { kind: "accessor", name: "isCollapsed", static: false, private: false, access: { has: obj => "isCollapsed" in obj, get: obj => obj.isCollapsed, set: (obj, value) => { obj.isCollapsed = value; } }, metadata: _metadata }, _isCollapsed_initializers, _isCollapsed_extraInitializers);
            __esDecorate(this, null, _applyingMap_decorators, { kind: "accessor", name: "applyingMap", static: false, private: false, access: { has: obj => "applyingMap" in obj, get: obj => obj.applyingMap, set: (obj, value) => { obj.applyingMap = value; } }, metadata: _metadata }, _applyingMap_initializers, _applyingMap_extraInitializers);
            __esDecorate(this, null, _acceptingMap_decorators, { kind: "accessor", name: "acceptingMap", static: false, private: false, access: { has: obj => "acceptingMap" in obj, get: obj => obj.acceptingMap, set: (obj, value) => { obj.acceptingMap = value; } }, metadata: _metadata }, _acceptingMap_initializers, _acceptingMap_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      display: block;
    }

    .doc-edit-tool-result-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 8px;

      svg {
        width: 20px;
        height: 20px;
      }
    }

    .doc-edit-tool-result-title {
      color: ${unsafeCSSVarV2('text/primary')};
      padding: 8px;
      margin-bottom: 8px;
    }

    .doc-edit-tool-result-card {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      background: ${unsafeCSSVar('--affine-overlay-panel-shadow')};
      box-shadow: ${unsafeCSSVar('shadow1')};
      border-radius: 8px;
      width: 100%;

      .doc-edit-tool-result-card-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 8px;

        width: 100%;
        justify-content: space-between;

        .doc-edit-tool-result-card-header-title {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 8px;
          color: ${unsafeCSSVarV2('text/primary')};
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        .doc-edit-tool-result-card-header-operations {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          padding-right: 8px;
          color: ${unsafeCSSVarV2('text/secondary')};

          button {
            cursor: pointer;
            padding: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
          }

          button:hover {
            background: ${unsafeCSSVar('hoverColor')};
          }
        }
      }

      .doc-edit-tool-result-card-content {
        padding: 8px;
        width: 100%;
        border-top: 1px solid ${unsafeCSSVarV2('layer/insideBorder/border')};
      }

      .doc-edit-tool-result-card-footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 4px;
        width: 100%;
        cursor: pointer;

        button {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px;
          border-radius: 4px;
        }

        button:hover {
          background: ${unsafeCSSVar('hoverColor')};
        }
      }

      &.collapsed .doc-edit-tool-result-card-content,
      &.collapsed .doc-edit-tool-result-card-footer {
        display: none;
      }

      .doc-edit-tool-result-card-diff {
        border-radius: 4px;
        padding: 8px;
        width: 100%;
      }

      .doc-edit-tool-result-card-diff-replace {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 8px;
        gap: 8px;

        .doc-edit-tool-result-card-diff.original {
          background: ${unsafeCSSVarV2('aI/applyDeleteHighlight')};
        }

        .doc-edit-tool-result-card-diff.modified {
          background: ${unsafeCSSVarV2('aI/applyTextHighlightBackground')};
        }
      }

      .doc-edit-tool-result-card-diff.deleted {
        background: ${unsafeCSSVarV2('aI/applyDeleteHighlight')};
        margin-bottom: 8px;
      }

      .doc-edit-tool-result-card-diff.insert {
        background: ${unsafeCSSVarV2('aI/applyTextHighlightBackground')};
        margin-bottom: 8px;
      }

      .doc-edit-tool-result-card-diff-title {
        font-size: 12px;
      }
    }
  `; }
        #host_accessor_storage = __runInitializers(this, _host_initializers, void 0);
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #data_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _data_initializers, void 0));
        get data() { return this.#data_accessor_storage; }
        set data(value) { this.#data_accessor_storage = value; }
        #renderRichText_accessor_storage = (__runInitializers(this, _data_extraInitializers), __runInitializers(this, _renderRichText_initializers, void 0));
        get renderRichText() { return this.#renderRichText_accessor_storage; }
        set renderRichText(value) { this.#renderRichText_accessor_storage = value; }
        #notificationService_accessor_storage = (__runInitializers(this, _renderRichText_extraInitializers), __runInitializers(this, _notificationService_initializers, void 0));
        get notificationService() { return this.#notificationService_accessor_storage; }
        set notificationService(value) { this.#notificationService_accessor_storage = value; }
        #isCollapsed_accessor_storage = (__runInitializers(this, _notificationService_extraInitializers), __runInitializers(this, _isCollapsed_initializers, false));
        get isCollapsed() { return this.#isCollapsed_accessor_storage; }
        set isCollapsed(value) { this.#isCollapsed_accessor_storage = value; }
        #applyingMap_accessor_storage = (__runInitializers(this, _isCollapsed_extraInitializers), __runInitializers(this, _applyingMap_initializers, {}));
        get applyingMap() { return this.#applyingMap_accessor_storage; }
        set applyingMap(value) { this.#applyingMap_accessor_storage = value; }
        #acceptingMap_accessor_storage = (__runInitializers(this, _applyingMap_extraInitializers), __runInitializers(this, _acceptingMap_initializers, {}));
        get acceptingMap() { return this.#acceptingMap_accessor_storage; }
        set acceptingMap(value) { this.#acceptingMap_accessor_storage = value; }
        get blockDiffService() {
            return this.host?.std.getOptional(BlockDiffProvider);
        }
        get isBusy() {
            return undefined;
        }
        isBusyForOp(op) {
            return this.applyingMap[op] || this.acceptingMap[op];
        }
        async _handleApply(op, updates) {
            if (!this.host ||
                this.data.type !== 'tool-result' ||
                this.isBusyForOp(op)) {
                return;
            }
            this.applyingMap = { ...this.applyingMap, [op]: true };
            try {
                const markdown = await AIProvider.context?.applyDocUpdates(this.host.std.workspace.id, this.data.args.doc_id, op, updates);
                if (!markdown) {
                    return;
                }
                track.applyModel.chat.$.apply({
                    instruction: this.data.args.instructions,
                    operation: op,
                });
                await this.blockDiffService?.apply(this.host.store, markdown);
            }
            catch (error) {
                this.notificationService.notify({
                    title: 'Failed to apply updates',
                    message: error instanceof Error ? error.message : 'Unknown error',
                    accent: 'error',
                    onClose: function () { },
                });
            }
            finally {
                this.applyingMap = { ...this.applyingMap, [op]: false };
            }
        }
        async _handleReject(op) {
            if (!this.host || this.data.type !== 'tool-result') {
                return;
            }
            // TODO: set the rejected status
            track.applyModel.chat.$.reject({
                instruction: this.data.args.instructions,
                operation: op,
            });
            this.blockDiffService?.setChangedMarkdown(null);
            this.blockDiffService?.rejectAll();
        }
        async _handleAccept(op, updates) {
            if (!this.host ||
                this.data.type !== 'tool-result' ||
                this.isBusyForOp(op)) {
                return;
            }
            this.acceptingMap = { ...this.acceptingMap, [op]: true };
            try {
                const changedMarkdown = await AIProvider.context?.applyDocUpdates(this.host.std.workspace.id, this.data.args.doc_id, op, updates);
                if (!changedMarkdown) {
                    return;
                }
                track.applyModel.chat.$.accept({
                    instruction: this.data.args.instructions,
                    operation: op,
                });
                await this.blockDiffService?.apply(this.host.store, changedMarkdown);
                await this.blockDiffService?.acceptAll(this.host.store);
            }
            catch (error) {
                this.notificationService.notify({
                    title: 'Failed to apply updates',
                    message: error instanceof Error ? error.message : 'Unknown error',
                    accent: 'error',
                    onClose: function () { },
                });
            }
            finally {
                this.acceptingMap = { ...this.acceptingMap, [op]: false };
            }
        }
        async _toggleCollapse() {
            this.isCollapsed = !this.isCollapsed;
        }
        async _handleCopy(changedMarkdown) {
            if (!this.host) {
                return;
            }
            track.applyModel.chat.$.copy();
            const success = await copyText(removeMarkdownComments(changedMarkdown));
            if (success) {
                this.notificationService.notify({
                    title: 'Copied to clipboard',
                    accent: 'success',
                    onClose: function () { },
                });
            }
        }
        renderToolCall() {
            return html `
      <tool-call-card
        .name=${'Editing the document'}
        .icon=${EditIcon()}
      ></tool-call-card>
    `;
        }
        renderSantizedText(text) {
            return this.renderRichText(removeMarkdownComments(text));
        }
        renderBlockDiffs(diffs) {
            const { patches, oldBlocks } = diffs;
            const oldBlockMap = new Map(oldBlocks.map(b => [b.id, b]));
            return html `
      <div>
        ${patches.map(patch => {
                if (patch.op === 'replace') {
                    const oldBlock = oldBlockMap.get(patch.id);
                    return html `
              <div class="doc-edit-tool-result-card-diff-replace">
                <div class="doc-edit-tool-result-card-diff original">
                  <div class="doc-edit-tool-result-card-diff-title">
                    Original
                  </div>
                  <div>${this.renderSantizedText(oldBlock?.content ?? '')}</div>
                </div>
                <div class="doc-edit-tool-result-card-diff modified">
                  <div class="doc-edit-tool-result-card-diff-title">
                    Modified
                  </div>
                  <div>${this.renderSantizedText(patch.content)}</div>
                </div>
              </div>
            `;
                }
                else if (patch.op === 'delete') {
                    const oldBlock = oldBlockMap.get(patch.id);
                    return html `
              <div class="doc-edit-tool-result-card-diff deleted">
                <div class="doc-edit-tool-result-card-diff-title">Deleted</div>
                <div>${this.renderSantizedText(oldBlock?.content ?? '')}</div>
              </div>
            `;
                }
                else if (patch.op === 'insert') {
                    return html `
              <div class="doc-edit-tool-result-card-diff insert">
                <div class="doc-edit-tool-result-card-diff-title">Inserted</div>
                <div>${this.renderSantizedText(patch.block.content)}</div>
              </div>
            `;
                }
                return nothing;
            })}
      </div>
    `;
        }
        renderToolResult() {
            if (this.data.type !== 'tool-result') {
                return nothing;
            }
            const result = this.data.result;
            if (result && 'result' in result && Array.isArray(result.result)) {
                const { doc_id: docId } = this.data.args;
                return repeat(result.result, change => change.op, ({ op, updates, originalContent, changedContent }) => {
                    const diffs = diffMarkdown(originalContent, changedContent);
                    return html `
            <div class="doc-edit-tool-result-wrapper">
              <div class="doc-edit-tool-result-title">${op}</div>
              <div
                class="doc-edit-tool-result-card ${this.isCollapsed
                        ? 'collapsed'
                        : ''}"
              >
                <div class="doc-edit-tool-result-card-header">
                  <div class="doc-edit-tool-result-card-header-title">
                    ${PenIcon({
                        style: `color: ${unsafeCSSVarV2('icon/activated')}`,
                    })}
                    ${docId}
                  </div>
                  <div class="doc-edit-tool-result-card-header-operations">
                    <button @click=${() => this._toggleCollapse()}>
                      ${this.isCollapsed ? ExpandFullIcon() : ExpandCloseIcon()}
                      <affine-tooltip>
                        ${this.isCollapsed ? 'Expand' : 'Collapse'}
                      </affine-tooltip>
                    </button>
                    <button @click=${() => this._handleCopy(changedContent)}>
                      ${CopyIcon()}
                      <affine-tooltip>Copy</affine-tooltip>
                    </button>
                    <button
                      @click=${() => this._handleApply(op, updates)}
                      ?disabled=${this.isBusyForOp(op)}
                    >
                      ${this.applyingMap[op]
                        ? html `${LoadingIcon()} Applying`
                        : 'Apply'}
                    </button>
                  </div>
                </div>
                <div class="doc-edit-tool-result-card-content">
                  ${this.renderBlockDiffs(diffs)}
                  <div class="doc-edit-tool-result-card-footer">
                    <button
                      class="doc-edit-tool-result-reject"
                      @click=${() => this._handleReject(op)}
                    >
                      ${CloseIcon({
                        style: `color: ${unsafeCSSVarV2('icon/secondary')}`,
                    })}
                      Reject
                    </button>
                    <button
                      class="doc-edit-tool-result-accept"
                      @click=${() => this._handleAccept(op, updates)}
                      ?disabled=${this.isBusyForOp(op)}
                      style="${this.isBusyForOp(op)
                        ? 'pointer-events: none; opacity: 0.6;'
                        : ''}"
                    >
                      ${this.acceptingMap[op]
                        ? html `${LoadingIcon()}`
                        : DoneIcon({
                            style: `color: ${unsafeCSSVarV2('icon/activated')}`,
                        })}
                      ${this.acceptingMap[op] ? 'Accepting...' : 'Accept'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;
                });
            }
            return html `
      <tool-call-failed
        .name=${'Document editing failed'}
        .icon=${EditIcon()}
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
        constructor() {
            super(...arguments);
            __runInitializers(this, _acceptingMap_extraInitializers);
        }
    };
})();
export { DocEditTool };
//# sourceMappingURL=doc-edit.js.map