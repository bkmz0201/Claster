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
import { UserFriendlyError } from '@affine/error';
import { track } from '@affine/track';
import { OnEvent, Service } from '@toeverything/infra';
import { nanoid } from 'nanoid';
import { distinctUntilChanged, map, skip } from 'rxjs';
import { ApplicationFocused } from '../../lifecycle';
import { AuthSession } from '../entities/session';
import { AccountChanged } from '../events/account-changed';
import { AccountLoggedIn } from '../events/account-logged-in';
import { AccountLoggedOut } from '../events/account-logged-out';
import { ServerStarted } from '../events/server-started';
let AuthService = (() => {
    let _classDecorators = [OnEvent(ApplicationFocused, e => e.onApplicationFocused), OnEvent(ServerStarted, e => e.onServerStarted)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Service;
    var AuthService = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AuthService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        constructor(fetchService, store, urlService, dialogService) {
            super();
            this.fetchService = fetchService;
            this.store = store;
            this.urlService = urlService;
            this.dialogService = dialogService;
            this.session = this.framework.createEntity(AuthSession);
            this.session.account$
                .pipe(map(a => ({
                id: a?.id,
                account: a,
            })), distinctUntilChanged((a, b) => a.id === b.id), // only emit when the value changes
            skip(1) // skip the initial value
            )
                .subscribe(({ account }) => {
                if (account === null) {
                    this.eventBus.emit(AccountLoggedOut, account);
                }
                else {
                    this.eventBus.emit(AccountLoggedIn, account);
                }
                this.eventBus.emit(AccountChanged, account);
            });
        }
        onServerStarted() {
            this.session.revalidate();
        }
        onApplicationFocused() {
            this.session.revalidate();
        }
        async sendEmailMagicLink(email, verifyToken, challenge, redirectUrl // url to redirect to after signed-in
        ) {
            track.$.$.auth.signIn({ method: 'magic-link' });
            this.setClientNonce();
            try {
                const scheme = this.urlService.getClientScheme();
                const magicLinkUrlParams = new URLSearchParams();
                if (redirectUrl) {
                    magicLinkUrlParams.set('redirect_uri', redirectUrl);
                }
                if (scheme) {
                    magicLinkUrlParams.set('client', scheme);
                }
                await this.fetchService.fetch('/api/auth/sign-in', {
                    method: 'POST',
                    body: JSON.stringify({
                        email,
                        // we call it [callbackUrl] instead of [redirect_uri]
                        // to make it clear the url is used to finish the sign-in process instead of redirect after signed-in
                        callbackUrl: `/magic-link?${magicLinkUrlParams.toString()}`,
                        client_nonce: this.store.getClientNonce(),
                    }),
                    headers: {
                        'content-type': 'application/json',
                        ...(verifyToken ? this.captchaHeaders(verifyToken, challenge) : {}),
                    },
                });
            }
            catch (e) {
                track.$.$.auth.signInFail({
                    method: 'magic-link',
                    reason: UserFriendlyError.fromAny(e).name,
                });
                throw e;
            }
        }
        async signInMagicLink(email, token, byLink = true) {
            const method = byLink ? 'magic-link' : 'otp';
            try {
                await this.store.signInMagicLink(email, token);
                this.session.revalidate();
                track.$.$.auth.signedIn({ method });
            }
            catch (e) {
                track.$.$.auth.signInFail({
                    method,
                    reason: UserFriendlyError.fromAny(e).name,
                });
                throw e;
            }
        }
        async oauthPreflight(provider, client, 
        /** @deprecated*/ redirectUrl) {
            this.setClientNonce();
            try {
                const res = await this.fetchService.fetch('/api/oauth/preflight', {
                    method: 'POST',
                    body: JSON.stringify({
                        provider,
                        client,
                        redirect_uri: redirectUrl,
                        client_nonce: this.store.getClientNonce(),
                    }),
                    headers: {
                        'content-type': 'application/json',
                    },
                });
                return await res.json();
            }
            catch (e) {
                track.$.$.auth.signInFail({
                    method: 'oauth',
                    provider,
                    reason: UserFriendlyError.fromAny(e).name,
                });
                throw e;
            }
        }
        async signInOauth(code, state, provider) {
            try {
                const { redirectUri } = await this.store.signInOauth(code, state, provider);
                this.session.revalidate();
                track.$.$.auth.signedIn({ method: 'oauth', provider });
                return { redirectUri };
            }
            catch (e) {
                track.$.$.auth.signInFail({
                    method: 'oauth',
                    provider,
                    reason: UserFriendlyError.fromAny(e).name,
                });
                throw e;
            }
        }
        async signInPassword(credential) {
            track.$.$.auth.signIn({ method: 'password' });
            try {
                await this.store.signInPassword(credential);
                this.session.revalidate();
                track.$.$.auth.signedIn({ method: 'password' });
            }
            catch (e) {
                track.$.$.auth.signInFail({
                    method: 'password',
                    reason: UserFriendlyError.fromAny(e).name,
                });
                throw e;
            }
        }
        async signOut() {
            await this.store.signOut();
            this.store.setCachedAuthSession(null);
            this.session.revalidate();
        }
        async deleteAccount() {
            const res = await this.store.deleteAccount();
            this.store.setCachedAuthSession(null);
            this.session.revalidate();
            this.dialogService.open('deleted-account', {});
            return res;
        }
        checkUserByEmail(email) {
            return this.store.checkUserByEmail(email);
        }
        captchaHeaders(token, challenge) {
            const headers = {
                'x-captcha-token': token,
            };
            if (challenge) {
                headers['x-captcha-challenge'] = challenge;
            }
            return headers;
        }
        setClientNonce() {
            if (BUILD_CONFIG.isNative) {
                // send random client nonce on native app
                this.store.setClientNonce(nanoid());
            }
        }
    };
    return AuthService = _classThis;
})();
export { AuthService };
//# sourceMappingURL=auth.js.map