import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, ErrorMessage, Skeleton, Tooltip } from '@affine/component';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { cssVar } from '@toeverything/theme';
import { useEffect, useMemo } from 'react';
import { ServerService, SubscriptionService, UserQuotaService, } from '../../../../modules/cloud';
import * as styles from './storage-progress.css';
var ButtonType;
(function (ButtonType) {
    ButtonType["Primary"] = "primary";
    ButtonType["Default"] = "secondary";
})(ButtonType || (ButtonType = {}));
export const StorageProgress = ({ onUpgrade }) => {
    const t = useI18n();
    const quota = useService(UserQuotaService).quota;
    useEffect(() => {
        // revalidate quota to get the latest status
        quota.revalidate();
    }, [quota]);
    const color = useLiveData(quota.color$);
    const usedFormatted = useLiveData(quota.usedFormatted$);
    const maxFormatted = useLiveData(quota.maxFormatted$);
    const percent = useLiveData(quota.percent$);
    const serverService = useService(ServerService);
    const hasPaymentFeature = useLiveData(serverService.server.features$.map(f => f?.payment));
    const subscription = useService(SubscriptionService).subscription;
    useEffect(() => {
        // revalidate subscription to get the latest status
        subscription.revalidate();
    }, [subscription]);
    const proSubscription = useLiveData(subscription.pro$);
    const isFreeUser = !proSubscription;
    const quotaName = useLiveData(quota.quota$.map(q => (q !== null ? q?.humanReadable.name : null)));
    const loading = proSubscription === null || percent === null || quotaName === null;
    const loadError = useLiveData(quota.error$);
    const buttonType = useMemo(() => {
        if (isFreeUser) {
            return ButtonType.Primary;
        }
        return ButtonType.Default;
    }, [isFreeUser]);
    if (loading) {
        if (loadError) {
            // TODO(@catsjuice): i18n
            return _jsx(ErrorMessage, { children: "Load error" });
        }
        return _jsx(Skeleton, { height: 42 });
    }
    return (_jsxs("div", { className: styles.storageProgressContainer, children: [_jsxs("div", { className: styles.storageProgressWrapper, children: [_jsxs("div", { className: "storage-progress-desc", children: [_jsx("span", { children: t['com.affine.storage.used.hint']() }), _jsxs("span", { children: [usedFormatted, "/", maxFormatted, ` (${quotaName} ${t['com.affine.storage.plan']()})`] })] }), _jsx("div", { className: "storage-progress-bar-wrapper", children: _jsx("div", { className: styles.storageProgressBar, style: {
                                width: `${percent}%`,
                                backgroundColor: color ?? cssVar('processingColor'),
                            } }) })] }), hasPaymentFeature ? (_jsx(Tooltip, { options: { hidden: percent < 100 }, content: isFreeUser
                    ? t['com.affine.storage.maximum-tips']()
                    : t['com.affine.storage.maximum-tips.pro'](), children: _jsx("span", { tabIndex: 0, children: _jsx(Button, { variant: buttonType, onClick: onUpgrade, children: isFreeUser
                            ? t['com.affine.storage.upgrade']()
                            : t['com.affine.storage.change-plan']() }) }) })) : null] }));
};
//# sourceMappingURL=storage-progress.js.map