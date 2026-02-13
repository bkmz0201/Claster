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
import { toast } from '@affine/component';
import track, {} from '@affine/track';
import { SignalWatcher, WithDisposable } from '@blocksuite/affine/global/lit';
import { scrollbarStyle } from '@blocksuite/affine/shared/styles';
import { unsafeCSSVar, unsafeCSSVarV2 } from '@blocksuite/affine/shared/theme';
import { openFilesWith } from '@blocksuite/affine/shared/utils';
import { ShadowlessElement } from '@blocksuite/affine/std';
import { CollectionsIcon, ImageIcon, MoreHorizontalIcon, SearchIcon, TagsIcon, UploadIcon, } from '@blocksuite/icons/lit';
import { Signal } from '@preact/signals-core';
import { css, html } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
var AddPopoverMode;
(function (AddPopoverMode) {
    AddPopoverMode["Default"] = "default";
    AddPopoverMode["Tags"] = "tags";
    AddPopoverMode["Collections"] = "collections";
})(AddPopoverMode || (AddPopoverMode = {}));
export function resolveSignal(data) {
    return data instanceof Signal ? data.value : data;
}
let ChatPanelAddPopover = (() => {
    let _classSuper = SignalWatcher(WithDisposable(ShadowlessElement));
    let _independentMode_decorators;
    let _independentMode_initializers = [];
    let _independentMode_extraInitializers = [];
    let _docId_decorators;
    let _docId_initializers = [];
    let _docId_extraInitializers = [];
    let __searchGroups_decorators;
    let __searchGroups_initializers = [];
    let __searchGroups_extraInitializers = [];
    let __activatedIndex_decorators;
    let __activatedIndex_initializers = [];
    let __activatedIndex_extraInitializers = [];
    let __mode_decorators;
    let __mode_initializers = [];
    let __mode_extraInitializers = [];
    let _searchMenuConfig_decorators;
    let _searchMenuConfig_initializers = [];
    let _searchMenuConfig_extraInitializers = [];
    let _docDisplayConfig_decorators;
    let _docDisplayConfig_initializers = [];
    let _docDisplayConfig_extraInitializers = [];
    let _addChip_decorators;
    let _addChip_initializers = [];
    let _addChip_extraInitializers = [];
    let _addImages_decorators;
    let _addImages_initializers = [];
    let _addImages_extraInitializers = [];
    let _abortController_decorators;
    let _abortController_initializers = [];
    let _abortController_extraInitializers = [];
    let _testId_decorators;
    let _testId_initializers = [];
    let _testId_extraInitializers = [];
    let _uploadImageCount_decorators;
    let _uploadImageCount_initializers = [];
    let _uploadImageCount_extraInitializers = [];
    let _searchInput_decorators;
    let _searchInput_initializers = [];
    let _searchInput_extraInitializers = [];
    return class ChatPanelAddPopover extends _classSuper {
        constructor() {
            super(...arguments);
            this.#_query_accessor_storage = '';
            this.#independentMode_accessor_storage = __runInitializers(this, _independentMode_initializers, void 0);
            this.#docId_accessor_storage = (__runInitializers(this, _independentMode_extraInitializers), __runInitializers(this, _docId_initializers, void 0));
            this.#_searchGroups_accessor_storage = (__runInitializers(this, _docId_extraInitializers), __runInitializers(this, __searchGroups_initializers, []));
            this._toggleMode = (__runInitializers(this, __searchGroups_extraInitializers), (mode) => {
                this._mode = mode;
                this._activatedIndex = 0;
                this._query = '';
                this._updateSearchGroup();
                this._focusSearchInput();
            });
            this.tcGroup = {
                name: 'Tag & Collection',
                items: [
                    {
                        key: 'tags',
                        name: 'Tags',
                        testId: 'ai-chat-with-tags',
                        icon: TagsIcon(),
                        action: () => {
                            this._toggleMode(AddPopoverMode.Tags);
                        },
                    },
                    {
                        key: 'collections',
                        name: 'Collections',
                        testId: 'ai-chat-with-collections',
                        icon: CollectionsIcon(),
                        action: () => {
                            this._toggleMode(AddPopoverMode.Collections);
                        },
                    },
                ],
            };
            this._addFileChip = async () => {
                const files = await openFilesWith();
                if (!files || files.length === 0)
                    return;
                this.abortController.abort();
                const images = files.filter(file => file.type.startsWith('image/'));
                if (images.length > 0) {
                    this.addImages(images);
                }
                const others = files.filter(file => !file.type.startsWith('image/'));
                const addChipPromises = others.map(async (file) => {
                    if (file.size > 50 * 1024 * 1024) {
                        toast(`${file.name} is too large, please upload a file less than 50MB`);
                        return;
                    }
                    await this.addChip({
                        file,
                        state: 'processing',
                    });
                });
                await Promise.all(addChipPromises);
                this._track('file');
            };
            this._addImageChip = async () => {
                const images = await openFilesWith('Images');
                if (!images)
                    return;
                this.abortController.abort();
                this.addImages(images);
            };
            this.uploadGroup = {
                name: 'Upload',
                items: [
                    {
                        key: 'images',
                        name: 'Upload images',
                        testId: 'ai-chat-with-images',
                        icon: ImageIcon(),
                        action: this._addImageChip,
                    },
                    {
                        key: 'files',
                        name: 'Upload files (pdf, txt, csv)',
                        testId: 'ai-chat-with-files',
                        icon: UploadIcon(),
                        action: this._addFileChip,
                    },
                ],
            };
            this.#_activatedIndex_accessor_storage = __runInitializers(this, __activatedIndex_initializers, 0);
            this.#_mode_accessor_storage = (__runInitializers(this, __activatedIndex_extraInitializers), __runInitializers(this, __mode_initializers, AddPopoverMode.Default));
            this.#searchMenuConfig_accessor_storage = (__runInitializers(this, __mode_extraInitializers), __runInitializers(this, _searchMenuConfig_initializers, void 0));
            this.#docDisplayConfig_accessor_storage = (__runInitializers(this, _searchMenuConfig_extraInitializers), __runInitializers(this, _docDisplayConfig_initializers, void 0));
            this.#addChip_accessor_storage = (__runInitializers(this, _docDisplayConfig_extraInitializers), __runInitializers(this, _addChip_initializers, void 0));
            this.#addImages_accessor_storage = (__runInitializers(this, _addChip_extraInitializers), __runInitializers(this, _addImages_initializers, void 0));
            this.#abortController_accessor_storage = (__runInitializers(this, _addImages_extraInitializers), __runInitializers(this, _abortController_initializers, void 0));
            this.#testId_accessor_storage = (__runInitializers(this, _abortController_extraInitializers), __runInitializers(this, _testId_initializers, 'ai-search-input'));
            this.#uploadImageCount_accessor_storage = (__runInitializers(this, _testId_extraInitializers), __runInitializers(this, _uploadImageCount_initializers, void 0));
            this.#searchInput_accessor_storage = (__runInitializers(this, _uploadImageCount_extraInitializers), __runInitializers(this, _searchInput_initializers, void 0));
            this._menuGroupAbortController = (__runInitializers(this, _searchInput_extraInitializers), new AbortController());
            this._addDocChip = async (meta) => {
                this.abortController.abort();
                await this.addChip({
                    docId: meta.id,
                    state: 'processing',
                });
                const mode = this.docDisplayConfig.getDocPrimaryMode(meta.id);
                const method = meta.id === this.docId ? 'cur-doc' : 'doc';
                this._track(method, mode);
            };
            this._addTagChip = async (tag) => {
                this.abortController.abort();
                await this.addChip({
                    tagId: tag.id,
                    state: 'processing',
                });
                this._track('tags');
            };
            this._addCollectionChip = async (collection) => {
                this.abortController.abort();
                await this.addChip({
                    collectionId: collection.id,
                    state: 'processing',
                });
                this._track('collections');
            };
            this._handleKeyDown = (event) => {
                if (event.isComposing)
                    return;
                const { key } = event;
                if (key === 'ArrowDown' || key === 'ArrowUp') {
                    event.preventDefault();
                    const totalItems = this._flattenMenuGroup.length;
                    if (totalItems === 0)
                        return;
                    if (key === 'ArrowDown') {
                        this._activatedIndex = (this._activatedIndex + 1) % totalItems;
                    }
                    else if (key === 'ArrowUp') {
                        this._activatedIndex =
                            (this._activatedIndex - 1 + totalItems) % totalItems;
                    }
                    this._scrollItemIntoView();
                }
                else if (key === 'Enter') {
                    event.preventDefault();
                    this._flattenMenuGroup[this._activatedIndex]
                        .action()
                        ?.catch(console.error);
                }
                else if (key === 'Escape') {
                    event.preventDefault();
                    this.abortController.abort();
                }
            };
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _independentMode_decorators = [property({ attribute: false })];
            _docId_decorators = [property({ attribute: false })];
            __searchGroups_decorators = [state()];
            __activatedIndex_decorators = [state()];
            __mode_decorators = [state()];
            _searchMenuConfig_decorators = [property({ attribute: false })];
            _docDisplayConfig_decorators = [property({ attribute: false })];
            _addChip_decorators = [property({ attribute: false })];
            _addImages_decorators = [property({ attribute: false })];
            _abortController_decorators = [property({ attribute: false })];
            _testId_decorators = [property({ attribute: 'data-testid', reflect: true })];
            _uploadImageCount_decorators = [property({ attribute: false })];
            _searchInput_decorators = [query('.search-input')];
            __esDecorate(this, null, _independentMode_decorators, { kind: "accessor", name: "independentMode", static: false, private: false, access: { has: obj => "independentMode" in obj, get: obj => obj.independentMode, set: (obj, value) => { obj.independentMode = value; } }, metadata: _metadata }, _independentMode_initializers, _independentMode_extraInitializers);
            __esDecorate(this, null, _docId_decorators, { kind: "accessor", name: "docId", static: false, private: false, access: { has: obj => "docId" in obj, get: obj => obj.docId, set: (obj, value) => { obj.docId = value; } }, metadata: _metadata }, _docId_initializers, _docId_extraInitializers);
            __esDecorate(this, null, __searchGroups_decorators, { kind: "accessor", name: "_searchGroups", static: false, private: false, access: { has: obj => "_searchGroups" in obj, get: obj => obj._searchGroups, set: (obj, value) => { obj._searchGroups = value; } }, metadata: _metadata }, __searchGroups_initializers, __searchGroups_extraInitializers);
            __esDecorate(this, null, __activatedIndex_decorators, { kind: "accessor", name: "_activatedIndex", static: false, private: false, access: { has: obj => "_activatedIndex" in obj, get: obj => obj._activatedIndex, set: (obj, value) => { obj._activatedIndex = value; } }, metadata: _metadata }, __activatedIndex_initializers, __activatedIndex_extraInitializers);
            __esDecorate(this, null, __mode_decorators, { kind: "accessor", name: "_mode", static: false, private: false, access: { has: obj => "_mode" in obj, get: obj => obj._mode, set: (obj, value) => { obj._mode = value; } }, metadata: _metadata }, __mode_initializers, __mode_extraInitializers);
            __esDecorate(this, null, _searchMenuConfig_decorators, { kind: "accessor", name: "searchMenuConfig", static: false, private: false, access: { has: obj => "searchMenuConfig" in obj, get: obj => obj.searchMenuConfig, set: (obj, value) => { obj.searchMenuConfig = value; } }, metadata: _metadata }, _searchMenuConfig_initializers, _searchMenuConfig_extraInitializers);
            __esDecorate(this, null, _docDisplayConfig_decorators, { kind: "accessor", name: "docDisplayConfig", static: false, private: false, access: { has: obj => "docDisplayConfig" in obj, get: obj => obj.docDisplayConfig, set: (obj, value) => { obj.docDisplayConfig = value; } }, metadata: _metadata }, _docDisplayConfig_initializers, _docDisplayConfig_extraInitializers);
            __esDecorate(this, null, _addChip_decorators, { kind: "accessor", name: "addChip", static: false, private: false, access: { has: obj => "addChip" in obj, get: obj => obj.addChip, set: (obj, value) => { obj.addChip = value; } }, metadata: _metadata }, _addChip_initializers, _addChip_extraInitializers);
            __esDecorate(this, null, _addImages_decorators, { kind: "accessor", name: "addImages", static: false, private: false, access: { has: obj => "addImages" in obj, get: obj => obj.addImages, set: (obj, value) => { obj.addImages = value; } }, metadata: _metadata }, _addImages_initializers, _addImages_extraInitializers);
            __esDecorate(this, null, _abortController_decorators, { kind: "accessor", name: "abortController", static: false, private: false, access: { has: obj => "abortController" in obj, get: obj => obj.abortController, set: (obj, value) => { obj.abortController = value; } }, metadata: _metadata }, _abortController_initializers, _abortController_extraInitializers);
            __esDecorate(this, null, _testId_decorators, { kind: "accessor", name: "testId", static: false, private: false, access: { has: obj => "testId" in obj, get: obj => obj.testId, set: (obj, value) => { obj.testId = value; } }, metadata: _metadata }, _testId_initializers, _testId_extraInitializers);
            __esDecorate(this, null, _uploadImageCount_decorators, { kind: "accessor", name: "uploadImageCount", static: false, private: false, access: { has: obj => "uploadImageCount" in obj, get: obj => obj.uploadImageCount, set: (obj, value) => { obj.uploadImageCount = value; } }, metadata: _metadata }, _uploadImageCount_initializers, _uploadImageCount_extraInitializers);
            __esDecorate(this, null, _searchInput_decorators, { kind: "accessor", name: "searchInput", static: false, private: false, access: { has: obj => "searchInput" in obj, get: obj => obj.searchInput, set: (obj, value) => { obj.searchInput = value; } }, metadata: _metadata }, _searchInput_initializers, _searchInput_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .ai-add-popover {
      width: 280px;
      max-height: 450px;
      overflow-y: auto;
      border: 0.5px solid ${unsafeCSSVarV2('layer/insideBorder/border')};
      border-radius: 4px;
      background: ${unsafeCSSVarV2('layer/background/overlayPanel')};
      box-shadow: ${unsafeCSSVar('overlayPanelShadow')};
      padding: 8px;
    }
    .ai-add-popover icon-button {
      justify-content: flex-start;
      gap: 8px;
    }
    .ai-add-popover icon-button svg {
      width: 20px;
      height: 20px;
    }
    .ai-add-popover .divider {
      border-top: 0.5px solid ${unsafeCSSVarV2('layer/insideBorder/border')};
      margin: 8px 0;
    }
    .search-input-wrapper {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px;
    }
    .search-input-wrapper input {
      border: none;
      line-height: 20px;
      height: 20px;
      font-size: var(--affine-font-sm);
      color: ${unsafeCSSVarV2('text/primary')};
      flex-grow: 1;
      background-color: transparent;
    }
    .search-input-wrapper input::placeholder {
      color: ${unsafeCSSVarV2('text/placeholder')};
    }
    .search-input-wrapper input:focus {
      outline: none;
    }
    .search-input-wrapper svg {
      width: 20px;
      height: 20px;
      color: ${unsafeCSSVarV2('icon/primary')};
    }
    .no-result {
      padding: 4px;
      font-size: var(--affine-font-sm);
      color: ${unsafeCSSVarV2('text/secondary')};
    }
    .menu-items icon-button {
      outline: none;
    }

    ${scrollbarStyle('.ai-add-popover')}
  `; }
        #_query_accessor_storage;
        get _query() { return this.#_query_accessor_storage; }
        set _query(value) { this.#_query_accessor_storage = value; }
        #independentMode_accessor_storage;
        get independentMode() { return this.#independentMode_accessor_storage; }
        set independentMode(value) { this.#independentMode_accessor_storage = value; }
        #docId_accessor_storage;
        get docId() { return this.#docId_accessor_storage; }
        set docId(value) { this.#docId_accessor_storage = value; }
        #_searchGroups_accessor_storage;
        get _searchGroups() { return this.#_searchGroups_accessor_storage; }
        set _searchGroups(value) { this.#_searchGroups_accessor_storage = value; }
        _focusSearchInput() {
            requestAnimationFrame(() => {
                this.searchInput.focus();
            });
        }
        get _menuGroup() {
            let groups = [];
            switch (this._mode) {
                case AddPopoverMode.Tags:
                    groups = this._searchGroups;
                    break;
                case AddPopoverMode.Collections:
                    groups = this._searchGroups;
                    break;
                default:
                    if (this._query) {
                        groups = [...this._searchGroups, this.uploadGroup];
                    }
                    else {
                        groups = [...this._searchGroups, this.tcGroup, this.uploadGroup];
                    }
            }
            // Process maxDisplay for each group
            return groups.map(group => {
                const items = resolveSignal(group.items);
                const maxDisplay = group.maxDisplay ?? items.length;
                const hasMore = items.length > maxDisplay;
                if (!hasMore) {
                    return group;
                }
                const more = {
                    key: `${group.name} More`,
                    name: resolveSignal(group.overflowText) ?? 'more',
                    icon: MoreHorizontalIcon(),
                    action: () => {
                        this._resetMaxDisplay(group);
                        this._focusSearchInput();
                    },
                };
                return {
                    ...group,
                    items: [...items.slice(0, maxDisplay), more],
                };
            });
        }
        get _flattenMenuGroup() {
            return this._menuGroup.flatMap(group => {
                return resolveSignal(group.items);
            });
        }
        #_activatedIndex_accessor_storage;
        get _activatedIndex() { return this.#_activatedIndex_accessor_storage; }
        set _activatedIndex(value) { this.#_activatedIndex_accessor_storage = value; }
        #_mode_accessor_storage;
        get _mode() { return this.#_mode_accessor_storage; }
        set _mode(value) { this.#_mode_accessor_storage = value; }
        #searchMenuConfig_accessor_storage;
        get searchMenuConfig() { return this.#searchMenuConfig_accessor_storage; }
        set searchMenuConfig(value) { this.#searchMenuConfig_accessor_storage = value; }
        #docDisplayConfig_accessor_storage;
        get docDisplayConfig() { return this.#docDisplayConfig_accessor_storage; }
        set docDisplayConfig(value) { this.#docDisplayConfig_accessor_storage = value; }
        #addChip_accessor_storage;
        get addChip() { return this.#addChip_accessor_storage; }
        set addChip(value) { this.#addChip_accessor_storage = value; }
        #addImages_accessor_storage;
        get addImages() { return this.#addImages_accessor_storage; }
        set addImages(value) { this.#addImages_accessor_storage = value; }
        #abortController_accessor_storage;
        get abortController() { return this.#abortController_accessor_storage; }
        set abortController(value) { this.#abortController_accessor_storage = value; }
        #testId_accessor_storage;
        get testId() { return this.#testId_accessor_storage; }
        set testId(value) { this.#testId_accessor_storage = value; }
        #uploadImageCount_accessor_storage;
        get uploadImageCount() { return this.#uploadImageCount_accessor_storage; }
        set uploadImageCount(value) { this.#uploadImageCount_accessor_storage = value; }
        #searchInput_accessor_storage;
        get searchInput() { return this.#searchInput_accessor_storage; }
        set searchInput(value) { this.#searchInput_accessor_storage = value; }
        connectedCallback() {
            super.connectedCallback();
            this._updateSearchGroup();
            document.addEventListener('keydown', this._handleKeyDown);
        }
        firstUpdated() {
            this._focusSearchInput();
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            document.removeEventListener('keydown', this._handleKeyDown);
            this._menuGroupAbortController.abort();
        }
        render() {
            return html `<div class="ai-add-popover" data-testid="ai-add-popover">
      ${this._renderSearchInput()} ${this._renderDivider()}
      ${this._renderMenuGroup(this._menuGroup)}
    </div>`;
        }
        _renderSearchInput() {
            return html `<div class="search-input-wrapper">
      ${SearchIcon()}
      <input
        class="search-input"
        type="text"
        placeholder=${this._getPlaceholder()}
        .value=${this._query}
        @input=${this._onInput}
        @compositionend=${this._onCompositionEnd}
      />
    </div>`;
        }
        _getPlaceholder() {
            switch (this._mode) {
                case AddPopoverMode.Tags:
                    return 'Search tags';
                case AddPopoverMode.Collections:
                    return 'Search collections';
                default:
                    return 'Search docs, tags, collections';
            }
        }
        _renderDivider() {
            return html `<div class="divider"></div>`;
        }
        _renderNoResult() {
            return html `<div class="no-result">No Result</div>`;
        }
        _renderMenuGroup(groups) {
            let startIndex = 0;
            return repeat(groups, group => group.name, (group, idx) => {
                const items = resolveSignal(group.items);
                const menuGroup = html `<div class="menu-group">
          ${items.length > 0
                    ? this._renderMenuItems(items, startIndex)
                    : (group.noResult?.() ?? this._renderNoResult())}
          ${idx < groups.length - 1
                    ? (group.divider?.() ?? this._renderDivider())
                    : ''}
        </div>`;
                startIndex += items.length;
                return menuGroup;
            });
        }
        _renderMenuItems(items, startIndex) {
            return html `<div class="menu-items">
      ${repeat(items, item => item.key, ({ key, name, icon, action, testId }, idx) => {
                const curIdx = startIndex + idx;
                return html `<icon-button
            width="280px"
            height="30px"
            data-id=${key}
            data-index=${curIdx}
            data-testid=${testId}
            .text=${name}
            hover=${this._activatedIndex === curIdx}
            @click=${() => action()?.catch(console.error)}
            @mousemove=${() => (this._activatedIndex = curIdx)}
          >
            ${icon}
          </icon-button>`;
            })}
    </div>`;
        }
        _onCompositionEnd(event) {
            event.stopPropagation();
            this._updateQuery(event.target.value.trim());
        }
        _onInput(event) {
            if (event.isComposing)
                return;
            event.stopPropagation();
            this._updateQuery(event.target.value.trim());
        }
        _updateQuery(query) {
            this._query = query;
            this._activatedIndex = 0;
            this._updateSearchGroup();
        }
        _resetMaxDisplay(group) {
            group.maxDisplay = undefined;
            this.requestUpdate();
        }
        _updateSearchGroup() {
            this._menuGroupAbortController.abort();
            this._menuGroupAbortController = new AbortController();
            switch (this._mode) {
                case AddPopoverMode.Tags: {
                    this._searchGroups = [
                        this.searchMenuConfig.getTagMenuGroup(this._query, this._addTagChip, this._menuGroupAbortController.signal),
                    ];
                    break;
                }
                case AddPopoverMode.Collections: {
                    this._searchGroups = [
                        this.searchMenuConfig.getCollectionMenuGroup(this._query, this._addCollectionChip, this._menuGroupAbortController.signal),
                    ];
                    break;
                }
                default: {
                    const docGroup = this.searchMenuConfig.getDocMenuGroup(this._query, this._addDocChip, this._menuGroupAbortController.signal);
                    if (!this._query) {
                        this._searchGroups = [docGroup];
                    }
                    else {
                        const tagGroup = this.searchMenuConfig.getTagMenuGroup(this._query, this._addTagChip, this._menuGroupAbortController.signal);
                        const collectionGroup = this.searchMenuConfig.getCollectionMenuGroup(this._query, this._addCollectionChip, this._menuGroupAbortController.signal);
                        const nothing = html ``;
                        this._searchGroups = [
                            {
                                ...docGroup,
                                divider: () => nothing,
                                noResult: () => nothing,
                            },
                            {
                                ...tagGroup,
                                divider: () => nothing,
                                noResult: () => nothing,
                            },
                            {
                                ...collectionGroup,
                                divider: () => this._renderDivider(),
                                noResult: () => {
                                    const hasNoResult = this._searchGroups.every(group => {
                                        return resolveSignal(group.items).length === 0;
                                    });
                                    return hasNoResult ? this._renderNoResult() : nothing;
                                },
                            },
                        ];
                    }
                    break;
                }
            }
        }
        _scrollItemIntoView() {
            requestAnimationFrame(() => {
                const element = this.renderRoot.querySelector(`[data-index="${this._activatedIndex}"]`);
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                    });
                }
            });
        }
        _track(method, type) {
            const page = this.independentMode
                ? track.$.intelligence
                : track.$.chatPanel;
            page.chatPanelInput.addEmbeddingDoc({
                control: 'addButton',
                method,
                type,
            });
        }
    };
})();
export { ChatPanelAddPopover };
//# sourceMappingURL=add-popover.js.map