import { Entity, LiveData } from '@toeverything/infra';
import type { AuthService } from '../services/auth';
import type { UserQuotaStore } from '../stores/user-quota';
export declare class UserQuota extends Entity {
    private readonly authService;
    private readonly store;
    quota$: LiveData<{
        __typename?: "UserQuotaType";
        name: string;
        blobLimit: number;
        storageQuota: number;
        historyPeriod: number;
        memberLimit: number;
        humanReadable: {
            __typename?: "UserQuotaHumanReadableType";
            name: string;
            blobLimit: string;
            storageQuota: string;
            historyPeriod: string;
            memberLimit: string;
        };
    } | null>;
    /** Used storage in bytes */
    used$: LiveData<number | null>;
    /** Formatted used storage */
    usedFormatted$: LiveData<string | null>;
    /** Maximum storage limit in bytes */
    max$: LiveData<number | null>;
    /** Maximum storage limit formatted */
    maxFormatted$: LiveData<string | null>;
    /** Percentage of storage used */
    percent$: LiveData<number | null>;
    color$: LiveData<string | null>;
    isRevalidating$: LiveData<boolean>;
    error$: LiveData<any>;
    constructor(authService: AuthService, store: UserQuotaStore);
    revalidate: import("@toeverything/infra").Effect<unknown>;
    reset(): void;
    dispose(): void;
}
//# sourceMappingURL=user-quota.d.ts.map