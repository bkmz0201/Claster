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
import { scrollbarStyle } from '@blocksuite/affine/shared/styles';
import { unsafeCSSVar, unsafeCSSVarV2 } from '@blocksuite/affine/shared/theme';
import { ShadowlessElement } from '@blocksuite/affine/std';
import { DeleteIcon } from '@blocksuite/icons/lit';
import { css, html, nothing } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { AIProvider } from '../../provider';
let AISessionHistory = (() => {
    let _classSuper = WithDisposable(ShadowlessElement);
    let _session_decorators;
    let _session_initializers = [];
    let _session_extraInitializers = [];
    let _workspaceId_decorators;
    let _workspaceId_initializers = [];
    let _workspaceId_extraInitializers = [];
    let _docDisplayConfig_decorators;
    let _docDisplayConfig_initializers = [];
    let _docDisplayConfig_extraInitializers = [];
    let _onSessionClick_decorators;
    let _onSessionClick_initializers = [];
    let _onSessionClick_extraInitializers = [];
    let _onSessionDelete_decorators;
    let _onSessionDelete_initializers = [];
    let _onSessionDelete_extraInitializers = [];
    let _onDocClick_decorators;
    let _onDocClick_initializers = [];
    let _onDocClick_extraInitializers = [];
    let _scrollContainer_decorators;
    let _scrollContainer_initializers = [];
    let _scrollContainer_extraInitializers = [];
    let _sessions_decorators;
    let _sessions_initializers = [];
    let _sessions_extraInitializers = [];
    let _loadingMore_decorators;
    let _loadingMore_initializers = [];
    let _loadingMore_extraInitializers = [];
    let _hasMore_decorators;
    let _hasMore_initializers = [];
    let _hasMore_extraInitializers = [];
    return class AISessionHistory extends _classSuper {
        constructor() {
            super(...arguments);
            this.#session_accessor_storage = __runInitializers(this, _session_initializers, void 0);
            this.#workspaceId_accessor_storage = (__runInitializers(this, _session_extraInitializers), __runInitializers(this, _workspaceId_initializers, void 0));
            this.#docDisplayConfig_accessor_storage = (__runInitializers(this, _workspaceId_extraInitializers), __runInitializers(this, _docDisplayConfig_initializers, void 0));
            this.#onSessionClick_accessor_storage = (__runInitializers(this, _docDisplayConfig_extraInitializers), __runInitializers(this, _onSessionClick_initializers, void 0));
            this.#onSessionDelete_accessor_storage = (__runInitializers(this, _onSessionClick_extraInitializers), __runInitializers(this, _onSessionDelete_initializers, void 0));
            this.#onDocClick_accessor_storage = (__runInitializers(this, _onSessionDelete_extraInitializers), __runInitializers(this, _onDocClick_initializers, void 0));
            this.#scrollContainer_accessor_storage = (__runInitializers(this, _onDocClick_extraInitializers), __runInitializers(this, _scrollContainer_initializers, void 0));
            this.#sessions_accessor_storage = (__runInitializers(this, _scrollContainer_extraInitializers), __runInitializers(this, _sessions_initializers, void 0));
            this.#loadingMore_accessor_storage = (__runInitializers(this, _sessions_extraInitializers), __runInitializers(this, _loadingMore_initializers, false));
            this.#hasMore_accessor_storage = (__runInitializers(this, _loadingMore_extraInitializers), __runInitializers(this, _hasMore_initializers, true));
            this.#currentOffset_accessor_storage = (__runInitializers(this, _hasMore_extraInitializers), 0);
            this.pageSize = 10;
            this.onScroll = () => {
                if (!this.hasMore || this.loadingMore) {
                    return;
                }
                // load more when within 50px of bottom
                const { scrollTop, scrollHeight, clientHeight } = this.scrollContainer;
                const threshold = 50;
                if (scrollTop + clientHeight >= scrollHeight - threshold) {
                    this.getRecentSessions().catch(console.error);
                }
            };
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _session_decorators = [property({ attribute: false })];
            _workspaceId_decorators = [property({ attribute: false })];
            _docDisplayConfig_decorators = [property({ attribute: false })];
            _onSessionClick_decorators = [property({ attribute: false })];
            _onSessionDelete_decorators = [property({ attribute: false })];
            _onDocClick_decorators = [property({ attribute: false })];
            _scrollContainer_decorators = [query('.ai-session-history')];
            _sessions_decorators = [state()];
            _loadingMore_decorators = [state()];
            _hasMore_decorators = [state()];
            __esDecorate(this, null, _session_decorators, { kind: "accessor", name: "session", static: false, private: false, access: { has: obj => "session" in obj, get: obj => obj.session, set: (obj, value) => { obj.session = value; } }, metadata: _metadata }, _session_initializers, _session_extraInitializers);
            __esDecorate(this, null, _workspaceId_decorators, { kind: "accessor", name: "workspaceId", static: false, private: false, access: { has: obj => "workspaceId" in obj, get: obj => obj.workspaceId, set: (obj, value) => { obj.workspaceId = value; } }, metadata: _metadata }, _workspaceId_initializers, _workspaceId_extraInitializers);
            __esDecorate(this, null, _docDisplayConfig_decorators, { kind: "accessor", name: "docDisplayConfig", static: false, private: false, access: { has: obj => "docDisplayConfig" in obj, get: obj => obj.docDisplayConfig, set: (obj, value) => { obj.docDisplayConfig = value; } }, metadata: _metadata }, _docDisplayConfig_initializers, _docDisplayConfig_extraInitializers);
            __esDecorate(this, null, _onSessionClick_decorators, { kind: "accessor", name: "onSessionClick", static: false, private: false, access: { has: obj => "onSessionClick" in obj, get: obj => obj.onSessionClick, set: (obj, value) => { obj.onSessionClick = value; } }, metadata: _metadata }, _onSessionClick_initializers, _onSessionClick_extraInitializers);
            __esDecorate(this, null, _onSessionDelete_decorators, { kind: "accessor", name: "onSessionDelete", static: false, private: false, access: { has: obj => "onSessionDelete" in obj, get: obj => obj.onSessionDelete, set: (obj, value) => { obj.onSessionDelete = value; } }, metadata: _metadata }, _onSessionDelete_initializers, _onSessionDelete_extraInitializers);
            __esDecorate(this, null, _onDocClick_decorators, { kind: "accessor", name: "onDocClick", static: false, private: false, access: { has: obj => "onDocClick" in obj, get: obj => obj.onDocClick, set: (obj, value) => { obj.onDocClick = value; } }, metadata: _metadata }, _onDocClick_initializers, _onDocClick_extraInitializers);
            __esDecorate(this, null, _scrollContainer_decorators, { kind: "accessor", name: "scrollContainer", static: false, private: false, access: { has: obj => "scrollContainer" in obj, get: obj => obj.scrollContainer, set: (obj, value) => { obj.scrollContainer = value; } }, metadata: _metadata }, _scrollContainer_initializers, _scrollContainer_extraInitializers);
            __esDecorate(this, null, _sessions_decorators, { kind: "accessor", name: "sessions", static: false, private: false, access: { has: obj => "sessions" in obj, get: obj => obj.sessions, set: (obj, value) => { obj.sessions = value; } }, metadata: _metadata }, _sessions_initializers, _sessions_extraInitializers);
            __esDecorate(this, null, _loadingMore_decorators, { kind: "accessor", name: "loadingMore", static: false, private: false, access: { has: obj => "loadingMore" in obj, get: obj => obj.loadingMore, set: (obj, value) => { obj.loadingMore = value; } }, metadata: _metadata }, _loadingMore_initializers, _loadingMore_extraInitializers);
            __esDecorate(this, null, _hasMore_decorators, { kind: "accessor", name: "hasMore", static: false, private: false, access: { has: obj => "hasMore" in obj, get: obj => obj.hasMore, set: (obj, value) => { obj.hasMore = value; } }, metadata: _metadata }, _hasMore_initializers, _hasMore_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .ai-session-history {
      width: 316px;
      max-height: 344px;
      padding: 12px 8px;
      overflow-y: auto;
      border: 0.5px solid ${unsafeCSSVarV2('layer/insideBorder/border')};
      background: ${unsafeCSSVarV2('layer/background/primary')};
      border-radius: 4px;
      background: ${unsafeCSSVarV2('layer/background/overlayPanel')};
      box-shadow: ${unsafeCSSVar('overlayPanelShadow')};

      .loading-container,
      .empty-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 344px;
      }

      .loading-title,
      .empty-title {
        font-weight: 600;
        font-size: var(--affine-font-sm);
        color: var(--affine-text-secondary-color);
      }

      .ai-session-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .ai-session-group-title {
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;
        height: 20px;
        color: ${unsafeCSSVarV2('text/secondary')};
      }

      .ai-session-item {
        position: relative;
        display: flex;
        height: 24px;
        justify-content: space-between;
        align-items: center;
        border-radius: 4px;
        cursor: pointer;
      }

      .ai-session-item:hover:not(:has(.ai-session-doc:hover)) {
        background: ${unsafeCSSVarV2('layer/background/hoverOverlay')};
      }

      .ai-session-item[aria-selected='true'] .ai-session-title {
        color: ${unsafeCSSVarV2('text/emphasis')};
      }

      .ai-session-doc:hover {
        background: ${unsafeCSSVarV2('layer/background/hoverOverlay')};
      }

      .ai-session-title {
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;
        padding: 2px 4px;
        color: ${unsafeCSSVarV2('text/primary')};
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .ai-session-doc {
        display: flex;
        width: 120px;
        padding: 2px;
        align-items: center;
        gap: 4px;
        flex-shrink: 0;
        border-radius: 2px;
        cursor: pointer;

        svg {
          width: 16px;
          height: 16px;
          color: ${unsafeCSSVarV2('icon/primary')};
        }

        .doc-title {
          font-size: 12px;
          font-weight: 400;
          line-height: 20px;
          color: ${unsafeCSSVarV2('text/secondary')};
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .ai-session-item-delete {
        position: absolute;
        right: 2px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${unsafeCSSVarV2('layer/background/primary')};
        border-radius: 2px;
        padding: 2px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition:
          opacity 0.2s ease,
          visibility 0.2s ease;

        svg {
          width: 16px;
          height: 16px;
          color: ${unsafeCSSVarV2('icon/primary')};
        }
      }

      .ai-session-item:hover .ai-session-item-delete {
        opacity: 1;
        visibility: visible;
      }
    }

    ${scrollbarStyle('.ai-session-history')}
  `; }
        #session_accessor_storage;
        get session() { return this.#session_accessor_storage; }
        set session(value) { this.#session_accessor_storage = value; }
        #workspaceId_accessor_storage;
        get workspaceId() { return this.#workspaceId_accessor_storage; }
        set workspaceId(value) { this.#workspaceId_accessor_storage = value; }
        #docDisplayConfig_accessor_storage;
        get docDisplayConfig() { return this.#docDisplayConfig_accessor_storage; }
        set docDisplayConfig(value) { this.#docDisplayConfig_accessor_storage = value; }
        #onSessionClick_accessor_storage;
        get onSessionClick() { return this.#onSessionClick_accessor_storage; }
        set onSessionClick(value) { this.#onSessionClick_accessor_storage = value; }
        #onSessionDelete_accessor_storage;
        get onSessionDelete() { return this.#onSessionDelete_accessor_storage; }
        set onSessionDelete(value) { this.#onSessionDelete_accessor_storage = value; }
        #onDocClick_accessor_storage;
        get onDocClick() { return this.#onDocClick_accessor_storage; }
        set onDocClick(value) { this.#onDocClick_accessor_storage = value; }
        #scrollContainer_accessor_storage;
        get scrollContainer() { return this.#scrollContainer_accessor_storage; }
        set scrollContainer(value) { this.#scrollContainer_accessor_storage = value; }
        #sessions_accessor_storage;
        get sessions() { return this.#sessions_accessor_storage; }
        set sessions(value) { this.#sessions_accessor_storage = value; }
        #loadingMore_accessor_storage;
        get loadingMore() { return this.#loadingMore_accessor_storage; }
        set loadingMore(value) { this.#loadingMore_accessor_storage = value; }
        #hasMore_accessor_storage;
        get hasMore() { return this.#hasMore_accessor_storage; }
        set hasMore(value) { this.#hasMore_accessor_storage = value; }
        #currentOffset_accessor_storage;
        get currentOffset() { return this.#currentOffset_accessor_storage; }
        set currentOffset(value) { this.#currentOffset_accessor_storage = value; }
        groupSessionsByTime(sessions) {
            const now = new Date();
            const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const last7DaysStart = new Date(todayStart.getTime() - 6 * 24 * 60 * 60 * 1000);
            const last30DaysStart = new Date(todayStart.getTime() - 29 * 24 * 60 * 60 * 1000);
            const grouped = {
                today: [],
                last7Days: [],
                last30Days: [],
                older: [],
            };
            sessions.forEach(session => {
                const updatedAt = new Date(session.updatedAt);
                if (updatedAt >= todayStart) {
                    grouped.today.push(session);
                }
                else if (updatedAt >= last7DaysStart) {
                    grouped.last7Days.push(session);
                }
                else if (updatedAt >= last30DaysStart) {
                    grouped.last30Days.push(session);
                }
                else {
                    grouped.older.push(session);
                }
            });
            // Sort each group by updatedAt in descending order (newest first)
            Object.keys(grouped).forEach(key => {
                grouped[key].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
            });
            return grouped;
        }
        async getRecentSessions() {
            this.loadingMore = true;
            const moreSessions = (await AIProvider.session?.getRecentSessions(this.workspaceId, this.pageSize, this.currentOffset)) || [];
            this.sessions = [...(this.sessions || []), ...moreSessions];
            this.currentOffset += moreSessions.length;
            this.hasMore = moreSessions.length === this.pageSize;
            this.loadingMore = false;
        }
        connectedCallback() {
            super.connectedCallback();
            this.getRecentSessions().catch(console.error);
        }
        firstUpdated(changedProperties) {
            super.firstUpdated(changedProperties);
            this.disposables.add(() => {
                this.scrollContainer.removeEventListener('scroll', this.onScroll);
            });
            this.scrollContainer.addEventListener('scroll', this.onScroll);
        }
        renderSessionGroup(title, sessions) {
            if (sessions.length === 0) {
                return nothing;
            }
            return html `
      <div class="ai-session-group">
        <div class="ai-session-group-title">${title}</div>
        ${sessions.map(session => {
                return html `
            <div
              class="ai-session-item"
              @click=${(e) => {
                    e.stopPropagation();
                    this.onSessionClick(session.sessionId);
                }}
              aria-selected=${this.session?.sessionId === session.sessionId}
              data-session-id=${session.sessionId}
            >
              <div class="ai-session-title">
                ${session.title || 'New chat'}
                <affine-tooltip .offsetX=${60}>
                  Click to open this chat
                </affine-tooltip>
              </div>
              ${session.docId
                    ? this.renderSessionDoc(session.docId, session.sessionId)
                    : nothing}
              <div
                class="ai-session-item-delete"
                @click=${(e) => {
                    e.stopPropagation();
                    this.onSessionDelete(session);
                }}
              >
                ${DeleteIcon()}
                <affine-tooltip>Delete</affine-tooltip>
              </div>
            </div>
          `;
            })}
      </div>
    `;
        }
        renderSessionDoc(docId, sessionId) {
            const getIcon = this.docDisplayConfig.getIcon(docId);
            const docIcon = typeof getIcon === 'function' ? getIcon() : getIcon;
            return html `<div
      class="ai-session-doc"
      @click=${(e) => {
                e.stopPropagation();
                this.onDocClick(docId, sessionId);
            }}
    >
      ${docIcon}
      <span class="doc-title"> ${this.docDisplayConfig.getTitle(docId)} </span>
      <affine-tooltip>Open this doc</affine-tooltip>
    </div>`;
        }
        renderLoading() {
            return html `
      <div class="loading-container">
        <div class="loading-title">Loading history...</div>
      </div>
    `;
        }
        renderEmpty() {
            return html `
      <div class="empty-container">
        <div class="empty-title">Empty history</div>
      </div>
    `;
        }
        renderHistory() {
            if (!this.sessions) {
                return this.renderLoading();
            }
            if (this.sessions.length === 0) {
                return this.renderEmpty();
            }
            const groupedSessions = this.groupSessionsByTime(this.sessions);
            return html `
      ${this.renderSessionGroup('Today', groupedSessions.today)}
      ${this.renderSessionGroup('Last 7 days', groupedSessions.last7Days)}
      ${this.renderSessionGroup('Last 30 days', groupedSessions.last30Days)}
      ${this.renderSessionGroup('Older', groupedSessions.older)}
    `;
        }
        render() {
            return html `
      <div class="ai-session-history">${this.renderHistory()}</div>
    `;
        }
    };
})();
export { AISessionHistory };
//# sourceMappingURL=ai-session-history.js.map