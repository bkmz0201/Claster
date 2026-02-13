import { LiveData, Store } from '@toeverything/infra';
import { cssVarV2 } from '@toeverything/theme/v2';
import { exhaustMap, map } from 'rxjs';
import { AuthService } from '../../cloud';
export class CalendarStore extends Store {
    constructor(globalState, cacheStorage, workspaceService, workspaceServerService) {
        super();
        this.globalState = globalState;
        this.cacheStorage = cacheStorage;
        this.workspaceService = workspaceService;
        this.workspaceServerService = workspaceServerService;
        this.colors = [
            cssVarV2.calendar.red,
            cssVarV2.calendar.orange,
            cssVarV2.calendar.yellow,
            cssVarV2.calendar.green,
            cssVarV2.calendar.teal,
            cssVarV2.calendar.blue,
            cssVarV2.calendar.purple,
            cssVarV2.calendar.magenta,
            cssVarV2.calendar.grey,
        ];
        this.authService = this.workspaceServerService.server?.scope.get(AuthService);
        this.userId$ = this.workspaceService.workspace.meta.flavour === 'local' ||
            !this.authService
            ? new LiveData('__local__')
            : this.authService.session.account$.map(account => account?.id ?? '__local__');
    }
    getRandomColor() {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }
    _getKey(userId, workspaceId) {
        return `calendar:${userId}:${workspaceId}:subscriptions`;
    }
    _createSubscription() {
        return {
            showEvents: true,
            showAllDayEvents: true,
            color: this.getRandomColor(),
        };
    }
    storageKey$() {
        const workspaceId = this.workspaceService.workspace.id;
        return this.userId$.map(userId => this._getKey(userId, workspaceId));
    }
    getUserId() {
        return this.workspaceService.workspace.meta.flavour === 'local' ||
            !this.authService
            ? '__local__'
            : (this.authService.session.account$.value?.id ?? '__local__');
    }
    getStorageKey() {
        const workspaceId = this.workspaceService.workspace.id;
        return this._getKey(this.getUserId(), workspaceId);
    }
    getCacheKey(url) {
        return `calendar-cache:${url}`;
    }
    watchSubscriptionMap() {
        return this.storageKey$().pipe(exhaustMap(storageKey => {
            return this.globalState.watch(storageKey);
        }));
    }
    watchSubscription(url) {
        return this.watchSubscriptionMap().pipe(map(subscriptionMap => {
            if (!subscriptionMap) {
                return null;
            }
            return subscriptionMap[url] ?? null;
        }));
    }
    getSubscription(url) {
        return this.getSubscriptionMap()[url];
    }
    watchSubscriptionCache(url) {
        return this.cacheStorage.watch(this.getCacheKey(url));
    }
    getSubscriptionMap() {
        return (this.globalState.get(this.getStorageKey()) ?? {});
    }
    addSubscription(url, config) {
        const subscriptionMap = this.getSubscriptionMap();
        this.globalState.set(this.getStorageKey(), {
            ...subscriptionMap,
            [url]: {
                // merge default config
                ...this._createSubscription(),
                // update if exists
                ...subscriptionMap[url],
                ...config,
            },
        });
    }
    removeSubscription(url) {
        this.globalState.set(this.getStorageKey(), Object.fromEntries(Object.entries(this.getSubscriptionMap()).filter(([key]) => key !== url)));
    }
    updateSubscription(url, updates) {
        const subscriptionMap = this.getSubscriptionMap();
        this.globalState.set(this.getStorageKey(), {
            ...subscriptionMap,
            [url]: { ...subscriptionMap[url], ...updates },
        });
    }
    setSubscriptionCache(url, cache) {
        return this.cacheStorage.set(this.getCacheKey(url), cache);
    }
}
//# sourceMappingURL=calendar.js.map