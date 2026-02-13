import {} from '@affine/graphql';
import { Service } from '@toeverything/infra';
import { WorkspaceSubscription } from '../entities/workspace-subscription';
import { SubscriptionStore } from '../stores/subscription';
export class WorkspaceSubscriptionService extends Service {
    constructor(workspaceServerService) {
        super();
        this.workspaceServerService = workspaceServerService;
        this.subscription = this.framework.createEntity(WorkspaceSubscription);
        this.store = this.workspaceServerService.server?.scope.get(SubscriptionStore);
    }
    async createCheckoutSession(input) {
        if (!this.store) {
            throw new Error('No subscription store');
        }
        return await this.store.createCheckoutSession(input);
    }
}
//# sourceMappingURL=workspace-subscription.js.map