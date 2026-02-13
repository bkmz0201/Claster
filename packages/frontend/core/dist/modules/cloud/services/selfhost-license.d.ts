import type { License } from '@affine/graphql';
import { LiveData, Service } from '@toeverything/infra';
import type { WorkspaceService } from '../../workspace';
import type { SelfhostLicenseStore } from '../stores/selfhost-license';
export declare class SelfhostLicenseService extends Service {
    private readonly store;
    private readonly workspaceService;
    constructor(store: SelfhostLicenseStore, workspaceService: WorkspaceService);
    license$: LiveData<License | null>;
    isRevalidating$: LiveData<boolean>;
    error$: LiveData<any>;
    revalidate: import("@toeverything/infra").Effect<unknown>;
    activateLicense(workspaceId: string, licenseKey: string): Promise<{
        __typename?: "License";
        expiredAt: string | null;
        installedAt: string;
        quantity: number;
        recurring: import("@affine/graphql").SubscriptionRecurring;
        validatedAt: string;
        variant: import("@affine/graphql").SubscriptionVariant | null;
    }>;
    deactivateLicense(workspaceId: string): Promise<boolean>;
    installLicense(workspaceId: string, licenseFile: File): Promise<{
        __typename?: "License";
        expiredAt: string | null;
        installedAt: string;
        quantity: number;
        recurring: import("@affine/graphql").SubscriptionRecurring;
        validatedAt: string;
        variant: import("@affine/graphql").SubscriptionVariant | null;
    }>;
    clear(): void;
}
//# sourceMappingURL=selfhost-license.d.ts.map