import { SubscriptionPlan, SubscriptionRecurring } from '@affine/graphql';
import { nanoid } from 'nanoid';
import {} from '../../../modules/cloud';
const separator = '::';
const recoverSeparator = nanoid();
const typeFormUrl = 'https://6dxre9ihosp.typeform.com/to';
const typeFormUpgradeId = 'mUMGGQS8';
const typeFormDowngradeId = 'RvD9AoRg';
const getTypeFormLink = (id, info) => {
    const plans = Array.isArray(info.plan) ? info.plan : [info.plan];
    const product_id = plans
        .map(plan => plan === SubscriptionPlan.AI
        ? 'ai'
        : plan === SubscriptionPlan.Team
            ? 'team'
            : 'cloud')
        .join('-');
    const product_price = info.recurring === SubscriptionRecurring.Monthly
        ? 'monthly'
        : info.recurring === SubscriptionRecurring.Lifetime
            ? 'lifeTime'
            : 'annually';
    return `${typeFormUrl}/${id}#email=${info.email ?? ''}&name=${info.name ?? 'Unknown'}&user_id=${info.id}&product_id=${product_id}&product_price=${product_price}`;
};
export const getUpgradeQuestionnaireLink = (info) => getTypeFormLink(typeFormUpgradeId, info);
export const getDowngradeQuestionnaireLink = (info) => getTypeFormLink(typeFormDowngradeId, info);
/**
 * Generate subscription callback link with account info
 */
export const generateSubscriptionCallbackLink = (account, plan, recurring, workspaceId, clientScheme) => {
    const baseUrl = plan === SubscriptionPlan.AI
        ? '/ai-upgrade-success'
        : plan === SubscriptionPlan.Team
            ? '/upgrade-success/team'
            : plan === SubscriptionPlan.SelfHostedTeam
                ? '/upgrade-success/self-hosted-team'
                : '/upgrade-success';
    if (plan === SubscriptionPlan.SelfHostedTeam) {
        return baseUrl;
    }
    if (account === null) {
        throw new Error('Account is required');
    }
    let name = account?.info?.name ?? '';
    if (name.includes(separator)) {
        name = name.replaceAll(separator, recoverSeparator);
    }
    const query = [
        plan,
        recurring,
        account.id,
        account.email,
        account.info?.name ?? '',
        workspaceId ?? '',
    ].join(separator);
    return `${baseUrl}?info=${encodeURIComponent(query)}${clientScheme ? `&client=${clientScheme}` : ''}`;
};
export const getSubscriptionInfo = (searchParams) => {
    const decodedInfo = decodeURIComponent(searchParams.get('info') || '');
    const [plan, recurring, accountId, email, name, workspaceId] = decodedInfo.split(separator);
    return {
        plan: plan,
        recurring: recurring,
        accountId,
        email,
        name: name.replaceAll(recoverSeparator, separator),
        workspaceId,
    };
};
//# sourceMappingURL=use-subscription-notify.js.map