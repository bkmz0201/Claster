import { Store } from '@toeverything/infra';
import type { WorkspaceServerService } from '../services/workspace-server';
export declare class SelfhostLicenseStore extends Store {
    private readonly workspaceServerService;
    constructor(workspaceServerService: WorkspaceServerService);
    getLicense(workspaceId: string, signal?: AbortSignal): Promise<{
        __typename?: "License";
        expiredAt: string | null;
        installedAt: string;
        quantity: number;
        recurring: import("@affine/graphql").SubscriptionRecurring;
        validatedAt: string;
        variant: import("@affine/graphql").SubscriptionVariant | null;
    } | null>;
    activate(workspaceId: string, license: string, signal?: AbortSignal): Promise<{
        __typename?: "License";
        expiredAt: string | null;
        installedAt: string;
        quantity: number;
        recurring: import("@affine/graphql").SubscriptionRecurring;
        validatedAt: string;
        variant: import("@affine/graphql").SubscriptionVariant | null;
    }>;
    deactivate(workspaceId: string, signal?: AbortSignal): Promise<boolean>;
    installLicense(workspaceId: string, license: File, signal?: AbortSignal): Promise<{
        __typename?: "License";
        expiredAt: string | null;
        installedAt: string;
        quantity: number;
        recurring: import("@affine/graphql").SubscriptionRecurring;
        validatedAt: string;
        variant: import("@affine/graphql").SubscriptionVariant | null;
    }>;
}
//# sourceMappingURL=selfhost-license.d.ts.map