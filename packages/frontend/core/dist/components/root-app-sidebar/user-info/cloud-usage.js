import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ErrorMessage, Skeleton } from '@affine/component';
import { UserQuotaService } from '@affine/core/modules/cloud';
import { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import { useEffect } from 'react';
import { UserPlanButton } from '../../affine/auth/user-plan-button';
import { useCatchEventCallback } from '../../hooks/use-catch-event-hook';
import * as styles from './index.css';
export const CloudUsage = () => {
    const t = useI18n();
    const quota = useService(UserQuotaService).quota;
    const quotaError = useLiveData(quota.error$);
    const workspaceDialogService = useService(WorkspaceDialogService);
    const handleClick = useCatchEventCallback(() => {
        workspaceDialogService.open('setting', {
            activeTab: 'plans',
            scrollAnchor: 'cloudPricingPlan',
        });
    }, [workspaceDialogService]);
    useEffect(() => {
        // revalidate quota to get the latest status
        quota.revalidate();
    }, [quota]);
    const color = useLiveData(quota.color$);
    const usedFormatted = useLiveData(quota.usedFormatted$);
    const maxFormatted = useLiveData(quota.maxFormatted$);
    const percent = useLiveData(quota.percent$);
    if (percent === null) {
        if (quotaError) {
            return _jsx(ErrorMessage, { children: "Failed to load quota" });
        }
        return (_jsxs("div", { children: [_jsx(Skeleton, { height: 15, width: 50 }), _jsx(Skeleton, { height: 10, style: { marginTop: 4 } })] }));
    }
    return (_jsxs("div", { className: clsx(styles.usageBlock, styles.cloudUsageBlock), style: assignInlineVars({
            [styles.progressColorVar]: color,
        }), children: [_jsxs("div", { className: styles.usageLabel, children: [_jsxs("div", { children: [_jsx("span", { className: styles.usageLabelTitle, children: t['com.affine.user-info.usage.cloud']() }), _jsx("span", { children: usedFormatted }), _jsx("span", { children: "\u00A0/\u00A0" }), _jsx("span", { children: maxFormatted })] }), _jsx(UserPlanButton, { onClick: handleClick })] }), _jsx("div", { className: styles.cloudUsageBar, children: _jsx("div", { className: styles.cloudUsageBarInner, style: { width: `${percent}%` } }) })] }));
};
//# sourceMappingURL=cloud-usage.js.map