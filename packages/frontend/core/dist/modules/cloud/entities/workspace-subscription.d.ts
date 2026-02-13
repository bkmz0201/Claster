import type { SubscriptionQuery, SubscriptionRecurring } from '@affine/graphql';
import { SubscriptionPlan } from '@affine/graphql';
import { Entity, LiveData } from '@toeverything/infra';
import type { WorkspaceService } from '../../workspace';
import type { WorkspaceServerService } from '../services/workspace-server';
import { SubscriptionStore } from '../stores/subscription';
export type SubscriptionType = NonNullable<SubscriptionQuery['currentUser']>['subscriptions'][number];
export declare class WorkspaceSubscription extends Entity {
    private readonly workspaceService;
    private readonly workspaceServerService;
    subscription$: LiveData<{
        __typename?: "SubscriptionType";
        id: string | null;
        status: import("@affine/graphql").SubscriptionStatus;
        plan: SubscriptionPlan;
        recurring: SubscriptionRecurring;
        start: string;
        end: string | null;
        nextBillAt: string | null;
        canceledAt: string | null;
        variant: import("@affine/graphql").SubscriptionVariant | null;
    } | null | undefined>;
    isRevalidating$: LiveData<boolean>;
    error$: LiveData<any>;
    team$: LiveData<boolean>;
    constructor(workspaceService: WorkspaceService, workspaceServerService: WorkspaceServerService);
    server: import("./server").Server | null;
    store: SubscriptionStore | undefined;
    resumeSubscription(idempotencyKey: string, plan?: SubscriptionPlan): Promise<void>;
    cancelSubscription(idempotencyKey: string, plan?: SubscriptionPlan): Promise<void>;
    setSubscriptionRecurring(idempotencyKey: string, recurring: SubscriptionRecurring, plan?: SubscriptionPlan): Promise<void>;
    waitForRevalidation(signal?: AbortSignal): Promise<void>;
    revalidate: import("@toeverything/infra").Effect<unknown>;
    reset(): void;
    dispose(): void;
}
//# sourceMappingURL=workspace-subscription.d.ts.map