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
import { notify } from '@affine/component';
import { I18n } from '@affine/i18n';
import { OnEvent, Service } from '@toeverything/infra';
import { debounce } from 'lodash-es';
import { AuthService, DefaultServerService, ServersService } from '../../cloud';
import { ApplicationStarted } from '../../lifecycle';
let DesktopApiService = (() => {
    let _classDecorators = [OnEvent(ApplicationStarted, e => e.setupStartListener)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Service;
    var DesktopApiService = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            DesktopApiService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        constructor(api) {
            super();
            this.api = api;
            if (!api.handler || !api.events) {
                throw new Error('DesktopApi is not initialized');
            }
        }
        get appInfo() {
            return this.api.appInfo;
        }
        get handler() {
            return this.api.handler;
        }
        get events() {
            return this.api.events;
        }
        get sharedStorage() {
            return this.api.sharedStorage;
        }
        async showTab(tabId, to) {
            if (to) {
                const url = new URL(to.toString());
                const tabs = await this.api.handler.ui.getTabViewsMeta();
                const tab = tabs.workbenches.find(t => t.id === tabId);
                if (tab) {
                    const basename = tab.basename;
                    if (url.pathname.startsWith(basename)) {
                        const pathname = url.pathname.slice(basename.length);
                        await this.api.handler.ui.tabGoTo(tabId, pathname + url.search + url.hash);
                    }
                }
            }
            await this.api.handler.ui.showTab(tabId);
        }
        setupStartListener() {
            this.setupCommonUIEvents();
            this.setupAuthRequestEvent();
        }
        setupCommonUIEvents() {
            if (this.api.appInfo.windowName !== 'main') {
                return;
            }
            const handleMaximized = (maximized) => {
                document.documentElement.dataset.maximized = String(maximized);
            };
            const handleFullscreen = (fullscreen) => {
                document.documentElement.dataset.fullscreen = String(fullscreen);
            };
            this.api.handler.ui
                .isMaximized()
                .then(handleMaximized)
                .catch(console.error);
            this.api.handler.ui
                .isFullScreen()
                .then(handleFullscreen)
                .catch(console.error);
            this.api.events.ui.onMaximized(handleMaximized);
            this.api.events.ui.onFullScreen(handleFullscreen);
            const tabId = this.api.appInfo.viewId;
            if (tabId) {
                let isActive = false;
                const handleActiveTabChange = (active) => {
                    isActive = active;
                    document.documentElement.dataset.active = String(active);
                };
                this.api.handler.ui
                    .isActiveTab()
                    .then(active => {
                    handleActiveTabChange(active);
                    this.api.events.ui.onActiveTabChanged(id => {
                        handleActiveTabChange(id === tabId);
                    });
                })
                    .catch(console.error);
                const handleResize = debounce(() => {
                    if (isActive) {
                        this.api.handler.ui.handleWindowResize().catch(console.error);
                    }
                }, 50);
                window.addEventListener('resize', handleResize);
                window.addEventListener('dragstart', () => {
                    document.documentElement.dataset.dragging = 'true';
                });
                window.addEventListener('dragend', () => {
                    document.documentElement.dataset.dragging = 'false';
                });
            }
        }
        setupAuthRequestEvent() {
            this.events.ui.onAuthenticationRequest(({ method, payload, server }) => {
                (async () => {
                    if (!(await this.api.handler.ui.isActiveTab())) {
                        return;
                    }
                    // Dynamically get these services to avoid circular dependencies
                    const serversService = this.framework.get(ServersService);
                    const defaultServerService = this.framework.get(DefaultServerService);
                    let targetServer;
                    if (server) {
                        targetServer = await serversService.addOrGetServerByBaseUrl(server);
                    }
                    else {
                        targetServer = defaultServerService.server;
                    }
                    if (!targetServer) {
                        throw new Error('Affine Cloud server not found');
                    }
                    const authService = targetServer.scope.get(AuthService);
                    switch (method) {
                        case 'magic-link': {
                            const { email, token } = payload;
                            await authService.signInMagicLink(email, token);
                            break;
                        }
                        case 'oauth': {
                            const { code, state, provider } = payload;
                            await authService.signInOauth(code, state, provider);
                            break;
                        }
                    }
                })().catch(e => {
                    notify.error({
                        title: I18n['com.affine.auth.toast.title.failed'](),
                        message: e.message,
                    });
                });
            });
        }
    };
    return DesktopApiService = _classThis;
})();
export { DesktopApiService };
//# sourceMappingURL=desktop-api.js.map