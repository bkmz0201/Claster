import { cancelSubscriptionMutation, createCheckoutSessionMutation, getWorkspaceSubscriptionQuery, pricesQuery, resumeSubscriptionMutation, SubscriptionPlan, subscriptionQuery, updateSubscriptionMutation, } from '@affine/graphql';
import { Store } from '@toeverything/infra';
const SUBSCRIPTION_CACHE_KEY = 'subscription:';
const getDefaultSubscriptionSuccessCallbackLink = (baseUrl, plan, scheme) => {
    const path = plan === SubscriptionPlan.Team
        ? '/upgrade-success/team'
        : plan === SubscriptionPlan.AI
            ? '/ai-upgrade-success'
            : '/upgrade-success';
    const urlString = baseUrl + path;
    const url = new URL(urlString);
    if (scheme) {
        url.searchParams.set('scheme', scheme);
    }
    return url.toString();
};
export class SubscriptionStore extends Store {
    constructor(gqlService, globalCache, urlService, serverService) {
        super();
        this.gqlService = gqlService;
        this.globalCache = globalCache;
        this.urlService = urlService;
        this.serverService = serverService;
    }
    async fetchSubscriptions(abortSignal) {
        const data = await this.gqlService.gql({
            query: subscriptionQuery,
            context: {
                signal: abortSignal,
            },
        });
        if (!data.currentUser) {
            throw new Error('No logged in');
        }
        return {
            userId: data.currentUser?.id,
            subscriptions: data.currentUser?.subscriptions,
        };
    }
    async fetchWorkspaceSubscriptions(workspaceId, abortSignal) {
        const data = await this.gqlService.gql({
            query: getWorkspaceSubscriptionQuery,
            variables: {
                workspaceId,
            },
            context: {
                signal: abortSignal,
            },
        });
        if (!data.workspace) {
            throw new Error('No workspace');
        }
        return {
            workspaceId: data.workspace.subscription?.id,
            subscription: data.workspace.subscription,
        };
    }
    async mutateResumeSubscription(idempotencyKey, plan, abortSignal, workspaceId) {
        const data = await this.gqlService.gql({
            query: resumeSubscriptionMutation,
            variables: {
                plan,
                workspaceId,
            },
            context: {
                signal: abortSignal,
                headers: {
                    'Idempotency-Key': idempotencyKey,
                },
            },
        });
        return data.resumeSubscription;
    }
    async mutateCancelSubscription(idempotencyKey, plan, abortSignal, workspaceId) {
        const data = await this.gqlService.gql({
            query: cancelSubscriptionMutation,
            variables: {
                plan,
                workspaceId,
            },
            context: {
                signal: abortSignal,
                headers: {
                    'Idempotency-Key': idempotencyKey,
                },
            },
        });
        return data.cancelSubscription;
    }
    getCachedSubscriptions(userId) {
        return this.globalCache.get(SUBSCRIPTION_CACHE_KEY + userId);
    }
    setCachedSubscriptions(userId, subscriptions) {
        return this.globalCache.set(SUBSCRIPTION_CACHE_KEY + userId, subscriptions);
    }
    getCachedWorkspaceSubscription(workspaceId) {
        return this.globalCache.get(SUBSCRIPTION_CACHE_KEY + workspaceId);
    }
    setCachedWorkspaceSubscription(workspaceId, subscription) {
        return this.globalCache.set(SUBSCRIPTION_CACHE_KEY + workspaceId, subscription);
    }
    setSubscriptionRecurring(idempotencyKey, recurring, plan, workspaceId) {
        return this.gqlService.gql({
            query: updateSubscriptionMutation,
            variables: {
                plan,
                recurring,
                workspaceId,
            },
            context: {
                headers: {
                    'Idempotency-Key': idempotencyKey,
                },
            },
        });
    }
    async createCheckoutSession(input) {
        const data = await this.gqlService.gql({
            query: createCheckoutSessionMutation,
            variables: {
                input: {
                    ...input,
                    successCallbackLink: input.successCallbackLink ||
                        getDefaultSubscriptionSuccessCallbackLink(this.serverService.server.baseUrl, input.plan, this.urlService.getClientScheme()),
                },
            },
        });
        return data.createCheckoutSession;
    }
    async fetchSubscriptionPrices(abortSignal) {
        const data = await this.gqlService.gql({
            query: pricesQuery,
            context: {
                signal: abortSignal,
            },
        });
        return data.prices;
    }
}
//# sourceMappingURL=subscription.js.map