import { SubscriptionPlan } from '@affine/graphql';
import { catchErrorInto, effect, Entity, exhaustMapWithTrailing, fromPromise, LiveData, onComplete, onStart, smartRetry, } from '@toeverything/infra';
import { tap } from 'rxjs';
import { SubscriptionStore } from '../stores/subscription';
export class WorkspaceSubscription extends Entity {
    constructor(workspaceService, workspaceServerService) {
        super();
        this.workspaceService = workspaceService;
        this.workspaceServerService = workspaceServerService;
        this.subscription$ = new LiveData(null);
        this.isRevalidating$ = new LiveData(false);
        this.error$ = new LiveData(null);
        this.team$ = this.subscription$.map(subscription => subscription?.plan === SubscriptionPlan.Team);
        this.server = this.workspaceServerService.server;
        this.store = this.workspaceServerService.server?.scope.get(SubscriptionStore);
        this.revalidate = effect(exhaustMapWithTrailing(() => {
            return fromPromise(async (signal) => {
                const currentWorkspaceId = this.workspaceService.workspace.id;
                if (!currentWorkspaceId || !this.server) {
                    return undefined; // no subscription if no user
                }
                const serverConfig = await this.server.features$.waitForNonNull(signal);
                if (!serverConfig.payment) {
                    // No payment feature, no subscription
                    return {
                        workspaceId: currentWorkspaceId,
                        subscription: null,
                    };
                }
                if (!this.store) {
                    return {
                        workspaceId: currentWorkspaceId,
                        subscription: null,
                    };
                }
                const { workspaceId, subscription } = await this.store.fetchWorkspaceSubscriptions(currentWorkspaceId, signal);
                return {
                    workspaceId: workspaceId,
                    subscription: subscription,
                };
            }).pipe(smartRetry(), tap(data => {
                if (data && data.subscription && data.workspaceId && this.store) {
                    this.store.setCachedWorkspaceSubscription(data.workspaceId, data.subscription);
                    this.subscription$.next(data.subscription);
                }
                else {
                    this.subscription$.next(undefined);
                }
            }), catchErrorInto(this.error$), onStart(() => this.isRevalidating$.next(true)), onComplete(() => this.isRevalidating$.next(false)));
        }));
    }
    async resumeSubscription(idempotencyKey, plan) {
        if (!this.store) {
            throw new Error('Subscription store not available');
        }
        await this.store.mutateResumeSubscription(idempotencyKey, plan, undefined, this.workspaceService.workspace.id);
        await this.waitForRevalidation();
    }
    async cancelSubscription(idempotencyKey, plan) {
        if (!this.store) {
            throw new Error('Subscription store not available');
        }
        await this.store.mutateCancelSubscription(idempotencyKey, plan, undefined, this.workspaceService.workspace.id);
        await this.waitForRevalidation();
    }
    async setSubscriptionRecurring(idempotencyKey, recurring, plan) {
        if (!this.store) {
            throw new Error('Subscription store not available');
        }
        await this.store.setSubscriptionRecurring(idempotencyKey, recurring, plan, this.workspaceService.workspace.id);
        await this.waitForRevalidation();
    }
    async waitForRevalidation(signal) {
        this.revalidate();
        await this.isRevalidating$.waitFor(isRevalidating => !isRevalidating, signal);
    }
    reset() {
        this.subscription$.next(null);
        this.team$.next(false);
        this.isRevalidating$.next(false);
        this.error$.next(null);
    }
    dispose() {
        this.revalidate.unsubscribe();
    }
}
//# sourceMappingURL=workspace-subscription.js.map