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
import { baseTheme } from '@toeverything/theme';
import { css, html, LitElement, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { AffineAIIcon } from './icon';
let UserInfo = (() => {
    let _classSuper = LitElement;
    let _avatarIcon_decorators;
    let _avatarIcon_initializers = [];
    let _avatarIcon_extraInitializers = [];
    let _avatarLoadedFailed_decorators;
    let _avatarLoadedFailed_initializers = [];
    let _avatarLoadedFailed_extraInitializers = [];
    let _avatarUrl_decorators;
    let _avatarUrl_initializers = [];
    let _avatarUrl_extraInitializers = [];
    let _userName_decorators;
    let _userName_initializers = [];
    let _userName_extraInitializers = [];
    return class UserInfo extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _avatarIcon_decorators = [property({ attribute: false })];
            _avatarLoadedFailed_decorators = [property({ attribute: false })];
            _avatarUrl_decorators = [property({ attribute: false })];
            _userName_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _avatarIcon_decorators, { kind: "accessor", name: "avatarIcon", static: false, private: false, access: { has: obj => "avatarIcon" in obj, get: obj => obj.avatarIcon, set: (obj, value) => { obj.avatarIcon = value; } }, metadata: _metadata }, _avatarIcon_initializers, _avatarIcon_extraInitializers);
            __esDecorate(this, null, _avatarLoadedFailed_decorators, { kind: "accessor", name: "avatarLoadedFailed", static: false, private: false, access: { has: obj => "avatarLoadedFailed" in obj, get: obj => obj.avatarLoadedFailed, set: (obj, value) => { obj.avatarLoadedFailed = value; } }, metadata: _metadata }, _avatarLoadedFailed_initializers, _avatarLoadedFailed_extraInitializers);
            __esDecorate(this, null, _avatarUrl_decorators, { kind: "accessor", name: "avatarUrl", static: false, private: false, access: { has: obj => "avatarUrl" in obj, get: obj => obj.avatarUrl, set: (obj, value) => { obj.avatarUrl = value; } }, metadata: _metadata }, _avatarUrl_initializers, _avatarUrl_extraInitializers);
            __esDecorate(this, null, _userName_decorators, { kind: "accessor", name: "userName", static: false, private: false, access: { has: obj => "userName" in obj, get: obj => obj.userName, set: (obj, value) => { obj.userName = value; } }, metadata: _metadata }, _userName_initializers, _userName_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .user-info-container {
      display: flex;
      width: 100%;
      height: 24px;
      flex-direction: row;
      gap: 10px;
      font-weight: 500;

      .user-avatar-container {
        width: 24px;
        height: 24px;
        color: var(--affine-brand-color);
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .default-avatar,
      .user-avatar-container img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }

      .user-avatar-container img {
        object-fit: cover;
      }

      .default-avatar,
      .avatar-image {
        background-color: var(--affine-primary-color);
      }

      .user-name {
        color: var(--affine-text-primary-color);
        text-align: justify;
        font-family: ${unsafeCSS(baseTheme.fontSansFamily)};
        font-size: var(--affine-font-sm);
        font-style: normal;
        font-weight: 500;
        line-height: 22px;
        text-overflow: ellipsis;
      }
    }
  `; }
        _handleAvatarLoadError(e) {
            const target = e.target;
            target.onerror = null;
            this.avatarLoadedFailed = true;
        }
        render() {
            return html `<div class="user-info-container">
      <div class="user-avatar-container">
        ${this.avatarIcon
                ? this.avatarIcon
                : this.avatarUrl && !this.avatarLoadedFailed
                    ? html `<img
                .src=${this.avatarUrl}
                @error=${this._handleAvatarLoadError}
              />`
                    : html `<span class="default-avatar"></span>`}
      </div>
      <span class="user-name">${this.userName}</span>
    </div>`;
        }
        #avatarIcon_accessor_storage = __runInitializers(this, _avatarIcon_initializers, undefined);
        get avatarIcon() { return this.#avatarIcon_accessor_storage; }
        set avatarIcon(value) { this.#avatarIcon_accessor_storage = value; }
        #avatarLoadedFailed_accessor_storage = (__runInitializers(this, _avatarIcon_extraInitializers), __runInitializers(this, _avatarLoadedFailed_initializers, false));
        get avatarLoadedFailed() { return this.#avatarLoadedFailed_accessor_storage; }
        set avatarLoadedFailed(value) { this.#avatarLoadedFailed_accessor_storage = value; }
        #avatarUrl_accessor_storage = (__runInitializers(this, _avatarLoadedFailed_extraInitializers), __runInitializers(this, _avatarUrl_initializers, undefined));
        get avatarUrl() { return this.#avatarUrl_accessor_storage; }
        set avatarUrl(value) { this.#avatarUrl_accessor_storage = value; }
        #userName_accessor_storage = (__runInitializers(this, _avatarUrl_extraInitializers), __runInitializers(this, _userName_initializers, void 0));
        get userName() { return this.#userName_accessor_storage; }
        set userName(value) { this.#userName_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _userName_extraInitializers);
        }
    };
})();
export { UserInfo };
export function UserInfoTemplate(userInfo, messageRole) {
    const isUser = !!messageRole && messageRole === 'user';
    const userInfoTemplate = isUser
        ? html `<user-info
        .userName=${userInfo.userName ?? 'You'}
        .avatarUrl=${userInfo.avatarUrl}
      ></user-info>`
        : html `<user-info
        .userName=${'AFFiNE AI'}
        .avatarIcon=${AffineAIIcon}
      ></user-info>`;
    return userInfoTemplate;
}
//# sourceMappingURL=user-info.js.map