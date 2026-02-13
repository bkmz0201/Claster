import { type CreateCheckoutSessionInput } from '@affine/graphql';
import { Service } from '@toeverything/infra';
import { WorkspaceSubscription } from '../entities/workspace-subscription';
import { SubscriptionStore } from '../stores/subscription';
import type { WorkspaceServerService } from './workspace-server';
export declare class WorkspaceSubscriptionService extends Service {
    private readonly workspaceServerService;
    subscription: WorkspaceSubscription;
    constructor(workspaceServerService: WorkspaceServerService);
    store: SubscriptionStore | undefined;
    createCheckoutSession(input: CreateCheckoutSessionInput): Promise<string>;
}
//# sourceMappingURL=workspace-subscription.d.ts.map