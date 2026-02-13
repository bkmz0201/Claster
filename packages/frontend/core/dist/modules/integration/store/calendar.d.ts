import { LiveData, Store } from '@toeverything/infra';
import { AuthService, type WorkspaceServerService } from '../../cloud';
import type { CacheStorage, GlobalState } from '../../storage';
import type { WorkspaceService } from '../../workspace';
export interface CalendarSubscriptionConfig {
    color: string;
    name?: string;
    showEvents?: boolean;
    showAllDayEvents?: boolean;
}
type CalendarSubscriptionStore = Record<string, CalendarSubscriptionConfig>;
export declare class CalendarStore extends Store {
    private readonly globalState;
    private readonly cacheStorage;
    private readonly workspaceService;
    private readonly workspaceServerService;
    constructor(globalState: GlobalState, cacheStorage: CacheStorage, workspaceService: WorkspaceService, workspaceServerService: WorkspaceServerService);
    colors: ("#b3b3b3" | "#929292" | "#f43f48" | "#ed3f3f" | "#ffae63" | "#ff8c38" | "#fde047" | "#facc15" | "#44b931" | "#3cbc36" | "#8be7dc" | "#5cc7ba" | "#4ab1fa" | "#29a3fa" | "#9681ef" | "#6e52df" | "#f37fba" | "#e660a4")[];
    getRandomColor(): "#b3b3b3" | "#929292" | "#f43f48" | "#ed3f3f" | "#ffae63" | "#ff8c38" | "#fde047" | "#facc15" | "#44b931" | "#3cbc36" | "#8be7dc" | "#5cc7ba" | "#4ab1fa" | "#29a3fa" | "#9681ef" | "#6e52df" | "#f37fba" | "#e660a4";
    private _getKey;
    private _createSubscription;
    authService: AuthService | undefined;
    userId$: LiveData<string>;
    storageKey$(): LiveData<string>;
    getUserId(): string;
    getStorageKey(): string;
    getCacheKey(url: string): string;
    watchSubscriptionMap(): import("rxjs").Observable<CalendarSubscriptionStore | undefined>;
    watchSubscription(url: string): import("rxjs").Observable<CalendarSubscriptionConfig | null>;
    getSubscription(url: string): CalendarSubscriptionConfig;
    watchSubscriptionCache(url: string): import("rxjs").Observable<string | undefined>;
    getSubscriptionMap(): CalendarSubscriptionStore;
    addSubscription(url: string, config?: Partial<CalendarSubscriptionConfig>): void;
    removeSubscription(url: string): void;
    updateSubscription(url: string, updates: Partial<Omit<CalendarSubscriptionConfig, 'url'>>): void;
    setSubscriptionCache(url: string, cache: string): Promise<void>;
}
export {};
//# sourceMappingURL=calendar.d.ts.map