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
import { SignalWatcher, WithDisposable } from '@blocksuite/affine/global/lit';
import { unsafeCSSVarV2 } from '@blocksuite/affine/shared/theme';
import { ShadowlessElement } from '@blocksuite/affine/std';
import { MoreVerticalIcon } from '@blocksuite/icons/lit';
import { flip, offset } from '@floating-ui/dom';
import { computed, signal } from '@preact/signals-core';
import { css, html, nothing } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { isEqual } from 'lodash-es';
import { estimateTokenCount, getChipKey, isAttachmentChip, isCollectionChip, isDocChip, isFileChip, isSelectedContextChip, isTagChip, } from './utils';
// 100k tokens limit for the docs context
const MAX_TOKEN_COUNT = 100000;
const MAX_CANDIDATES = 3;
let ChatPanelChips = (() => {
    let _classSuper = SignalWatcher(WithDisposable(ShadowlessElement));
    let _chips_decorators;
    let _chips_initializers = [];
    let _chips_extraInitializers = [];
    let _isCollapsed_decorators;
    let _isCollapsed_initializers = [];
    let _isCollapsed_extraInitializers = [];
    let _independentMode_decorators;
    let _independentMode_initializers = [];
    let _independentMode_extraInitializers = [];
    let _addChip_decorators;
    let _addChip_initializers = [];
    let _addChip_extraInitializers = [];
    let _updateChip_decorators;
    let _updateChip_initializers = [];
    let _updateChip_extraInitializers = [];
    let _removeChip_decorators;
    let _removeChip_initializers = [];
    let _removeChip_extraInitializers = [];
    let _toggleCollapse_decorators;
    let _toggleCollapse_initializers = [];
    let _toggleCollapse_extraInitializers = [];
    let _docDisplayConfig_decorators;
    let _docDisplayConfig_initializers = [];
    let _docDisplayConfig_extraInitializers = [];
    let _portalContainer_decorators;
    let _portalContainer_initializers = [];
    let _portalContainer_extraInitializers = [];
    let _testId_decorators;
    let _testId_initializers = [];
    let _testId_extraInitializers = [];
    let _moreCandidateButton_decorators;
    let _moreCandidateButton_initializers = [];
    let _moreCandidateButton_extraInitializers = [];
    let _referenceDocs_decorators;
    let _referenceDocs_initializers = [];
    let _referenceDocs_extraInitializers = [];
    return class ChatPanelChips extends _classSuper {
        constructor() {
            super(...arguments);
            this._abortController = null;
            this.#chips_accessor_storage = __runInitializers(this, _chips_initializers, void 0);
            this.#isCollapsed_accessor_storage = (__runInitializers(this, _chips_extraInitializers), __runInitializers(this, _isCollapsed_initializers, void 0));
            this.#independentMode_accessor_storage = (__runInitializers(this, _isCollapsed_extraInitializers), __runInitializers(this, _independentMode_initializers, void 0));
            this.#addChip_accessor_storage = (__runInitializers(this, _independentMode_extraInitializers), __runInitializers(this, _addChip_initializers, void 0));
            this.#updateChip_accessor_storage = (__runInitializers(this, _addChip_extraInitializers), __runInitializers(this, _updateChip_initializers, void 0));
            this.#removeChip_accessor_storage = (__runInitializers(this, _updateChip_extraInitializers), __runInitializers(this, _removeChip_initializers, void 0));
            this.#toggleCollapse_accessor_storage = (__runInitializers(this, _removeChip_extraInitializers), __runInitializers(this, _toggleCollapse_initializers, void 0));
            this.#docDisplayConfig_accessor_storage = (__runInitializers(this, _toggleCollapse_extraInitializers), __runInitializers(this, _docDisplayConfig_initializers, void 0));
            this.#portalContainer_accessor_storage = (__runInitializers(this, _docDisplayConfig_extraInitializers), __runInitializers(this, _portalContainer_initializers, null));
            this.#testId_accessor_storage = (__runInitializers(this, _portalContainer_extraInitializers), __runInitializers(this, _testId_initializers, 'chat-panel-chips'));
            this.#moreCandidateButton_accessor_storage = (__runInitializers(this, _testId_extraInitializers), __runInitializers(this, _moreCandidateButton_initializers, void 0));
            this.#referenceDocs_accessor_storage = (__runInitializers(this, _moreCandidateButton_extraInitializers), __runInitializers(this, _referenceDocs_initializers, signal([])));
            this._tags = (__runInitializers(this, _referenceDocs_extraInitializers), signal([]));
            this._collections = signal([]);
            this._cleanup = null;
            this._docIds = [];
            this._toggleMoreCandidatesMenu = () => {
                if (this._abortController) {
                    this._abortController.abort();
                    return;
                }
                this._abortController = new AbortController();
                this._abortController.signal.addEventListener('abort', () => {
                    this._abortController = null;
                });
                const referenceDocs = computed(() => this.referenceDocs.value.slice(MAX_CANDIDATES));
                createLitPortal({
                    template: html `
        <chat-panel-candidates-popover
          .addChip=${this.addChip}
          .referenceDocs=${referenceDocs}
          .docDisplayConfig=${this.docDisplayConfig}
          .abortController=${this._abortController}
        ></chat-panel-candidates-popover>
      `,
                    portalStyles: {
                        zIndex: 'var(--affine-z-index-popover)',
                    },
                    container: this.portalContainer ?? document.body,
                    computePosition: {
                        referenceElement: this.moreCandidateButton,
                        placement: 'top-start',
                        middleware: [offset({ crossAxis: 0, mainAxis: 8 }), flip()],
                        autoUpdate: { animationFrame: true },
                    },
                    abortController: this._abortController,
                    closeOnClickAway: true,
                });
            };
            this._checkTokenLimit = (newChip, newTokenCount) => {
                const estimatedTokens = this.chips.reduce((acc, chip) => {
                    if (isFileChip(chip) || isTagChip(chip) || isCollectionChip(chip)) {
                        return acc;
                    }
                    if (isDocChip(chip) && chip.docId === newChip.docId) {
                        return acc + newTokenCount;
                    }
                    if (isDocChip(chip) &&
                        chip.markdown?.value &&
                        chip.state === 'finished') {
                        const tokenCount = chip.tokenCount ?? estimateTokenCount(chip.markdown.value);
                        return acc + tokenCount;
                    }
                    if (isSelectedContextChip(chip)) {
                        const tokenCount = estimateTokenCount(chip.combinedElementsMarkdown ?? '') +
                            estimateTokenCount(chip.snapshot ?? '') +
                            estimateTokenCount(chip.html ?? '');
                        return acc + tokenCount;
                    }
                    return acc;
                }, 0);
                return estimatedTokens <= MAX_TOKEN_COUNT;
            };
            this._updateReferenceDocs = () => {
                const docIds = this.chips
                    .filter(isDocChip)
                    .filter(chip => chip.state !== 'candidate')
                    .map(chip => chip.docId);
                if (isEqual(this._docIds, docIds)) {
                    return;
                }
                this._cleanup?.();
                this._docIds = docIds;
                const { signal, cleanup } = this.docDisplayConfig.getReferenceDocs(docIds);
                this.referenceDocs = signal;
                this._cleanup = cleanup;
            };
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _chips_decorators = [property({ attribute: false })];
            _isCollapsed_decorators = [property({ attribute: false })];
            _independentMode_decorators = [property({ attribute: false })];
            _addChip_decorators = [property({ attribute: false })];
            _updateChip_decorators = [property({ attribute: false })];
            _removeChip_decorators = [property({ attribute: false })];
            _toggleCollapse_decorators = [property({ attribute: false })];
            _docDisplayConfig_decorators = [property({ attribute: false })];
            _portalContainer_decorators = [property({ attribute: false })];
            _testId_decorators = [property({ attribute: 'data-testid', reflect: true })];
            _moreCandidateButton_decorators = [query('.more-candidate-button')];
            _referenceDocs_decorators = [state()];
            __esDecorate(this, null, _chips_decorators, { kind: "accessor", name: "chips", static: false, private: false, access: { has: obj => "chips" in obj, get: obj => obj.chips, set: (obj, value) => { obj.chips = value; } }, metadata: _metadata }, _chips_initializers, _chips_extraInitializers);
            __esDecorate(this, null, _isCollapsed_decorators, { kind: "accessor", name: "isCollapsed", static: false, private: false, access: { has: obj => "isCollapsed" in obj, get: obj => obj.isCollapsed, set: (obj, value) => { obj.isCollapsed = value; } }, metadata: _metadata }, _isCollapsed_initializers, _isCollapsed_extraInitializers);
            __esDecorate(this, null, _independentMode_decorators, { kind: "accessor", name: "independentMode", static: false, private: false, access: { has: obj => "independentMode" in obj, get: obj => obj.independentMode, set: (obj, value) => { obj.independentMode = value; } }, metadata: _metadata }, _independentMode_initializers, _independentMode_extraInitializers);
            __esDecorate(this, null, _addChip_decorators, { kind: "accessor", name: "addChip", static: false, private: false, access: { has: obj => "addChip" in obj, get: obj => obj.addChip, set: (obj, value) => { obj.addChip = value; } }, metadata: _metadata }, _addChip_initializers, _addChip_extraInitializers);
            __esDecorate(this, null, _updateChip_decorators, { kind: "accessor", name: "updateChip", static: false, private: false, access: { has: obj => "updateChip" in obj, get: obj => obj.updateChip, set: (obj, value) => { obj.updateChip = value; } }, metadata: _metadata }, _updateChip_initializers, _updateChip_extraInitializers);
            __esDecorate(this, null, _removeChip_decorators, { kind: "accessor", name: "removeChip", static: false, private: false, access: { has: obj => "removeChip" in obj, get: obj => obj.removeChip, set: (obj, value) => { obj.removeChip = value; } }, metadata: _metadata }, _removeChip_initializers, _removeChip_extraInitializers);
            __esDecorate(this, null, _toggleCollapse_decorators, { kind: "accessor", name: "toggleCollapse", static: false, private: false, access: { has: obj => "toggleCollapse" in obj, get: obj => obj.toggleCollapse, set: (obj, value) => { obj.toggleCollapse = value; } }, metadata: _metadata }, _toggleCollapse_initializers, _toggleCollapse_extraInitializers);
            __esDecorate(this, null, _docDisplayConfig_decorators, { kind: "accessor", name: "docDisplayConfig", static: false, private: false, access: { has: obj => "docDisplayConfig" in obj, get: obj => obj.docDisplayConfig, set: (obj, value) => { obj.docDisplayConfig = value; } }, metadata: _metadata }, _docDisplayConfig_initializers, _docDisplayConfig_extraInitializers);
            __esDecorate(this, null, _portalContainer_decorators, { kind: "accessor", name: "portalContainer", static: false, private: false, access: { has: obj => "portalContainer" in obj, get: obj => obj.portalContainer, set: (obj, value) => { obj.portalContainer = value; } }, metadata: _metadata }, _portalContainer_initializers, _portalContainer_extraInitializers);
            __esDecorate(this, null, _testId_decorators, { kind: "accessor", name: "testId", static: false, private: false, access: { has: obj => "testId" in obj, get: obj => obj.testId, set: (obj, value) => { obj.testId = value; } }, metadata: _metadata }, _testId_initializers, _testId_extraInitializers);
            __esDecorate(this, null, _moreCandidateButton_decorators, { kind: "accessor", name: "moreCandidateButton", static: false, private: false, access: { has: obj => "moreCandidateButton" in obj, get: obj => obj.moreCandidateButton, set: (obj, value) => { obj.moreCandidateButton = value; } }, metadata: _metadata }, _moreCandidateButton_initializers, _moreCandidateButton_extraInitializers);
            __esDecorate(this, null, _referenceDocs_decorators, { kind: "accessor", name: "referenceDocs", static: false, private: false, access: { has: obj => "referenceDocs" in obj, get: obj => obj.referenceDocs, set: (obj, value) => { obj.referenceDocs = value; } }, metadata: _metadata }, _referenceDocs_initializers, _referenceDocs_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .ai-chat-panel-chips {
      display: flex;
      gap: 8px;
      align-items: center;
      flex-wrap: wrap;
      padding: 4px 12px;

      .collapse-button,
      .more-candidate-button {
        display: flex;
        flex-shrink: 0;
        flex-grow: 0;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: 0.5px solid ${unsafeCSSVarV2('layer/insideBorder/border')};
        border-radius: 4px;
        box-sizing: border-box;
        cursor: pointer;
        font-size: 12px;
        color: ${unsafeCSSVarV2('icon/primary')};
      }

      .collapse-button:hover,
      .more-candidate-button:hover {
        background-color: ${unsafeCSSVarV2('layer/background/hoverOverlay')};
      }

      .more-candidate-button {
        border-width: 1px;
        border-style: dashed;
        border-color: ${unsafeCSSVarV2('icon/tertiary')};
        background: ${unsafeCSSVarV2('layer/background/secondary')};
        color: ${unsafeCSSVarV2('icon/secondary')};
      }

      .more-candidate-button svg {
        color: ${unsafeCSSVarV2('icon/secondary')};
      }
    }
  `; }
        #chips_accessor_storage;
        get chips() { return this.#chips_accessor_storage; }
        set chips(value) { this.#chips_accessor_storage = value; }
        #isCollapsed_accessor_storage;
        get isCollapsed() { return this.#isCollapsed_accessor_storage; }
        set isCollapsed(value) { this.#isCollapsed_accessor_storage = value; }
        #independentMode_accessor_storage;
        get independentMode() { return this.#independentMode_accessor_storage; }
        set independentMode(value) { this.#independentMode_accessor_storage = value; }
        #addChip_accessor_storage;
        get addChip() { return this.#addChip_accessor_storage; }
        set addChip(value) { this.#addChip_accessor_storage = value; }
        #updateChip_accessor_storage;
        get updateChip() { return this.#updateChip_accessor_storage; }
        set updateChip(value) { this.#updateChip_accessor_storage = value; }
        #removeChip_accessor_storage;
        get removeChip() { return this.#removeChip_accessor_storage; }
        set removeChip(value) { this.#removeChip_accessor_storage = value; }
        #toggleCollapse_accessor_storage;
        get toggleCollapse() { return this.#toggleCollapse_accessor_storage; }
        set toggleCollapse(value) { this.#toggleCollapse_accessor_storage = value; }
        #docDisplayConfig_accessor_storage;
        get docDisplayConfig() { return this.#docDisplayConfig_accessor_storage; }
        set docDisplayConfig(value) { this.#docDisplayConfig_accessor_storage = value; }
        #portalContainer_accessor_storage;
        get portalContainer() { return this.#portalContainer_accessor_storage; }
        set portalContainer(value) { this.#portalContainer_accessor_storage = value; }
        #testId_accessor_storage;
        get testId() { return this.#testId_accessor_storage; }
        set testId(value) { this.#testId_accessor_storage = value; }
        #moreCandidateButton_accessor_storage;
        get moreCandidateButton() { return this.#moreCandidateButton_accessor_storage; }
        set moreCandidateButton(value) { this.#moreCandidateButton_accessor_storage = value; }
        #referenceDocs_accessor_storage;
        get referenceDocs() { return this.#referenceDocs_accessor_storage; }
        set referenceDocs(value) { this.#referenceDocs_accessor_storage = value; }
        render() {
            const candidates = this.referenceDocs.value.map(doc => ({
                docId: doc.docId,
                state: 'candidate',
            }));
            const moreCandidates = candidates.length > MAX_CANDIDATES;
            const allChips = this.chips.concat(candidates.slice(0, MAX_CANDIDATES));
            const isCollapsed = this.isCollapsed && allChips.length > 1;
            const chips = isCollapsed ? allChips.slice(0, 1) : allChips;
            return html `<div class="ai-chat-panel-chips">
      ${repeat(chips, chip => getChipKey(chip), chip => {
                if (isDocChip(chip)) {
                    return html `<chat-panel-doc-chip
              .chip=${chip}
              .independentMode=${this.independentMode}
              .addChip=${this.addChip}
              .updateChip=${this.updateChip}
              .removeChip=${this.removeChip}
              .checkTokenLimit=${this._checkTokenLimit}
              .docDisplayConfig=${this.docDisplayConfig}
            ></chat-panel-doc-chip>`;
                }
                if (isFileChip(chip)) {
                    return html `<chat-panel-file-chip
              .chip=${chip}
              .removeChip=${this.removeChip}
            ></chat-panel-file-chip>`;
                }
                if (isAttachmentChip(chip)) {
                    return html `<chat-panel-attachment-chip
              .chip=${chip}
              .removeChip=${this.removeChip}
            ></chat-panel-attachment-chip>`;
                }
                if (isTagChip(chip)) {
                    const tag = this._tags.value.find(tag => tag.id === chip.tagId);
                    if (!tag) {
                        return null;
                    }
                    return html `<chat-panel-tag-chip
              .chip=${chip}
              .tag=${tag}
              .removeChip=${this.removeChip}
            ></chat-panel-tag-chip>`;
                }
                if (isCollectionChip(chip)) {
                    const collection = this._collections.value.find(collection => collection.id === chip.collectionId);
                    if (!collection) {
                        return null;
                    }
                    return html `<chat-panel-collection-chip
              .chip=${chip}
              .collection=${collection}
              .removeChip=${this.removeChip}
            ></chat-panel-collection-chip>`;
                }
                if (isSelectedContextChip(chip)) {
                    return html `<chat-panel-selected-chip
              .chip=${chip}
              .removeChip=${this.removeChip}
            ></chat-panel-selected-chip>`;
                }
                return null;
            })}
      ${moreCandidates && !isCollapsed
                ? html `<div
            class="more-candidate-button"
            @click=${this._toggleMoreCandidatesMenu}
          >
            ${MoreVerticalIcon()}
          </div>`
                : nothing}
      ${isCollapsed
                ? html `<div class="collapse-button" @click=${this.toggleCollapse}>
            +${allChips.length - 1}
          </div>`
                : nothing}
    </div>`;
        }
        connectedCallback() {
            super.connectedCallback();
            const tags = this.docDisplayConfig.getTags();
            this._tags = tags.signal;
            this._disposables.add(tags.cleanup);
            const collections = this.docDisplayConfig.getCollections();
            this._collections = collections.signal;
            this._disposables.add(collections.cleanup);
        }
        updated(_changedProperties) {
            if (_changedProperties.has('chips')) {
                this._updateReferenceDocs();
            }
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this._cleanup?.();
        }
    };
})();
export { ChatPanelChips };
//# sourceMappingURL=chat-panel-chips.js.map