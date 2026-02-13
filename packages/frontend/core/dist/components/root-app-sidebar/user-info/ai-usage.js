import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SubscriptionService, UserCopilotQuotaService, } from '@affine/core/modules/cloud';
import { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { cssVar } from '@toeverything/theme';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import { useCallback, useEffect } from 'react';
import * as styles from './index.css';
export const AIUsage = () => {
    const t = useI18n();
    const copilotQuotaService = useService(UserCopilotQuotaService);
    const subscriptionService = useService(SubscriptionService);
    useEffect(() => {
        // revalidate latest subscription status
        subscriptionService.subscription.revalidate();
    }, [subscriptionService]);
    useEffect(() => {
        copilotQuotaService.copilotQuota.revalidate();
    }, [copilotQuotaService]);
    const copilotActionLimit = useLiveData(copilotQuotaService.copilotQuota.copilotActionLimit$);
    const copilotActionUsed = useLiveData(copilotQuotaService.copilotQuota.copilotActionUsed$);
    const loading = copilotActionLimit === null || copilotActionUsed === null;
    const loadError = useLiveData(copilotQuotaService.copilotQuota.error$);
    const workspaceDialogService = useService(WorkspaceDialogService);
    const goToAIPlanPage = useCallback(() => {
        workspaceDialogService.open('setting', {
            activeTab: 'plans',
            scrollAnchor: 'aiPricingPlan',
        });
    }, [workspaceDialogService]);
    const goToAccountSetting = useCallback(() => {
        workspaceDialogService.open('setting', {
            activeTab: 'account',
        });
    }, [workspaceDialogService]);
    if (loading) {
        if (loadError)
            console.error(loadError);
        return null;
    }
    // unlimited
    if (copilotActionLimit === 'unlimited') {
        return (_jsxs("div", { onClick: goToAccountSetting, "data-pro": true, className: clsx(styles.usageBlock, styles.aiUsageBlock), children: [_jsx("div", { className: styles.usageLabel, children: _jsx("div", { className: styles.usageLabelTitle, children: t['com.affine.user-info.usage.ai']() }) }), _jsx("div", { className: styles.usageLabel, children: t['com.affine.payment.ai.usage-description-purchased']() })] }));
    }
    const percent = Math.min(100, Math.max(0.5, Number(((copilotActionUsed / copilotActionLimit) * 100).toFixed(4))));
    const color = percent > 80 ? cssVar('errorColor') : cssVar('processingColor');
    return (_jsxs("div", { onClick: goToAIPlanPage, className: clsx(styles.usageBlock, styles.aiUsageBlock), style: assignInlineVars({
            [styles.progressColorVar]: color,
        }), children: [_jsxs("div", { className: styles.usageLabel, children: [_jsxs("div", { children: [_jsx("span", { className: styles.usageLabelTitle, children: t['com.affine.user-info.usage.ai']() }), _jsx("span", { children: copilotActionUsed }), _jsx("span", { children: "\u00A0/\u00A0" }), _jsx("span", { children: copilotActionLimit })] }), _jsx("div", { className: styles.freeTag, children: "Free" })] }), _jsx("div", { className: styles.cloudUsageBar, children: _jsx("div", { className: styles.cloudUsageBarInner, style: { width: `${percent}%` } }) })] }));
};
//# sourceMappingURL=ai-usage.js.map