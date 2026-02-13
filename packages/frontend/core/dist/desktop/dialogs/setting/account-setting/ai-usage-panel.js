import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, ErrorMessage, Skeleton } from '@affine/component';
import { SettingRow } from '@affine/component/setting-components';
import { ServerService, SubscriptionService, UserCopilotQuotaService, } from '@affine/core/modules/cloud';
import { SubscriptionPlan } from '@affine/graphql';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { useLiveData, useService } from '@toeverything/infra';
import { cssVar } from '@toeverything/theme';
import { useCallback, useEffect } from 'react';
import { AIResume, AISubscribe } from '../general-setting/plans/ai/actions';
import * as styles from './storage-progress.css';
export const AIUsagePanel = ({ onChangeSettingState, }) => {
    const t = useI18n();
    const serverService = useService(ServerService);
    const hasPaymentFeature = useLiveData(serverService.server.features$.map(f => f?.payment));
    const subscriptionService = useService(SubscriptionService);
    const aiSubscription = useLiveData(subscriptionService.subscription.ai$);
    useEffect(() => {
        // revalidate latest subscription status
        subscriptionService.subscription.revalidate();
        subscriptionService.prices.revalidate();
    }, [subscriptionService]);
    const copilotQuotaService = useService(UserCopilotQuotaService);
    useEffect(() => {
        copilotQuotaService.copilotQuota.revalidate();
    }, [copilotQuotaService]);
    const copilotActionLimit = useLiveData(copilotQuotaService.copilotQuota.copilotActionLimit$);
    const copilotActionUsed = useLiveData(copilotQuotaService.copilotQuota.copilotActionUsed$);
    const loading = copilotActionLimit === null || copilotActionUsed === null;
    const loadError = useLiveData(copilotQuotaService.copilotQuota.error$);
    const openBilling = useCallback(() => {
        onChangeSettingState?.({
            activeTab: 'billing',
        });
        track.$.settingsPanel.accountUsage.viewPlans({ plan: SubscriptionPlan.AI });
    }, [onChangeSettingState]);
    if (loading) {
        if (loadError) {
            return (_jsx(SettingRow, { name: t['com.affine.payment.ai.usage-title'](), desc: '', spreadCol: false, children: _jsx(ErrorMessage, { children: "Load error" }) }));
        }
        return (_jsx(SettingRow, { name: t['com.affine.payment.ai.usage-title'](), desc: '', spreadCol: false, children: _jsx(Skeleton, { height: 42 }) }));
    }
    const percent = copilotActionLimit === 'unlimited'
        ? 0
        : Math.min(100, Math.max(0.5, Number(((copilotActionUsed / copilotActionLimit) * 100).toFixed(4))));
    const color = percent > 80 ? cssVar('errorColor') : cssVar('processingColor');
    return (_jsx(SettingRow, { spreadCol: aiSubscription ? true : false, desc: aiSubscription
            ? t['com.affine.payment.ai.usage-description-purchased']()
            : '', name: t['com.affine.payment.ai.usage-title'](), children: copilotActionLimit === 'unlimited' ? (hasPaymentFeature && aiSubscription?.canceledAt ? (_jsx(AIResume, {})) : (_jsx(Button, { onClick: openBilling, children: t['com.affine.payment.ai.usage.change-button-label']() }))) : (_jsxs("div", { className: styles.storageProgressContainer, children: [_jsxs("div", { className: styles.storageProgressWrapper, children: [_jsxs("div", { className: "storage-progress-desc", children: [_jsx("span", { children: t['com.affine.payment.ai.usage.used-caption']() }), _jsx("span", { children: t['com.affine.payment.ai.usage.used-detail']({
                                        used: copilotActionUsed.toString(),
                                        limit: copilotActionLimit.toString(),
                                    }) })] }), _jsx("div", { className: "storage-progress-bar-wrapper", children: _jsx("div", { className: styles.storageProgressBar, style: { width: `${percent}%`, backgroundColor: color } }) })] }), hasPaymentFeature && (_jsx(AISubscribe, { variant: "primary", children: t['com.affine.payment.ai.usage.purchase-button-label']() }))] })) }));
};
//# sourceMappingURL=ai-usage-panel.js.map