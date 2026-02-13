import { SubscriptionPlan, SubscriptionRecurring } from '@affine/graphql';
import { type AuthAccountInfo } from '../../../modules/cloud';
type TypeFormInfo = {
    id: string;
    name?: string;
    email?: string;
    plan: string | string[];
    recurring: string;
};
export declare const getUpgradeQuestionnaireLink: (info: TypeFormInfo) => string;
export declare const getDowngradeQuestionnaireLink: (info: TypeFormInfo) => string;
/**
 * Generate subscription callback link with account info
 */
export declare const generateSubscriptionCallbackLink: (account: AuthAccountInfo | null, plan: SubscriptionPlan, recurring: SubscriptionRecurring, workspaceId?: string, clientScheme?: string) => string;
export declare const getSubscriptionInfo: (searchParams: URLSearchParams) => {
    plan: SubscriptionPlan;
    recurring: SubscriptionRecurring;
    accountId: string;
    email: string;
    name: string;
    workspaceId: string;
};
export {};
//# sourceMappingURL=use-subscription-notify.d.ts.map