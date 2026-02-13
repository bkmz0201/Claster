import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from '@affine/component';
import { SettingRow } from '@affine/component/setting-components';
import { getUpgradeQuestionnaireLink } from '@affine/core/components/hooks/affine/use-subscription-notify';
import { AuthService, WorkspaceSubscriptionService, } from '@affine/core/modules/cloud';
import { SubscriptionPlan, SubscriptionRecurring } from '@affine/graphql';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import * as styles from './styles.css';
export const TypeformLink = () => {
    const t = useI18n();
    const workspaceSubscriptionService = useService(WorkspaceSubscriptionService);
    const authService = useService(AuthService);
    const workspaceSubscription = useLiveData(workspaceSubscriptionService.subscription.subscription$);
    const account = useLiveData(authService.session.account$);
    if (!account)
        return null;
    const link = getUpgradeQuestionnaireLink({
        name: account.info?.name,
        id: account.id,
        email: account.email,
        recurring: workspaceSubscription?.recurring ?? SubscriptionRecurring.Yearly,
        plan: SubscriptionPlan.Team,
    });
    return (_jsx(SettingRow, { className: styles.paymentMethod, name: t['com.affine.payment.billing-type-form.title'](), desc: t['com.affine.payment.billing-type-form.description'](), children: _jsx("a", { target: "_blank", href: link, rel: "noreferrer", children: _jsx(Button, { children: t['com.affine.payment.billing-type-form.go']() }) }) }));
};
//# sourceMappingURL=typeform-link.js.map