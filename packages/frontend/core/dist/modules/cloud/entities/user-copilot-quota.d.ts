import { Entity, LiveData } from '@toeverything/infra';
import type { AuthService } from '../services/auth';
import type { ServerService } from '../services/server';
import type { UserCopilotQuotaStore } from '../stores/user-copilot-quota';
export declare class UserCopilotQuota extends Entity {
    private readonly authService;
    private readonly store;
    private readonly serverService;
    copilotActionLimit$: LiveData<number | "unlimited" | null>;
    copilotActionUsed$: LiveData<number | null>;
    isRevalidating$: LiveData<boolean>;
    error$: LiveData<any>;
    constructor(authService: AuthService, store: UserCopilotQuotaStore, serverService: ServerService);
    revalidate: import("@toeverything/infra").Effect<unknown>;
    reset(): void;
    dispose(): void;
}
//# sourceMappingURL=user-copilot-quota.d.ts.map