import { LiveData, Service } from '@toeverything/infra';
import { type AuthService } from '../../cloud';
import type { NotificationStore } from '../stores/notification';
export declare class NotificationCountService extends Service {
    private readonly store;
    private readonly authService;
    constructor(store: NotificationStore, authService: AuthService);
    loggedIn$: LiveData<boolean>;
    readonly count$: LiveData<number>;
    readonly isLoading$: LiveData<boolean>;
    readonly error$: LiveData<any>;
    revalidate: import("@toeverything/infra").Effect<unknown>;
    handleApplicationFocused(): void;
    handleServerStarted(): void;
    handleAccountChanged(): void;
    setCount(count: number): void;
    dispose(): void;
}
//# sourceMappingURL=count.d.ts.map