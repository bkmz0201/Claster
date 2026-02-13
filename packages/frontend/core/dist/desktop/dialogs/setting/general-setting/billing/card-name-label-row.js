import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SubscriptionStatus } from '@affine/graphql';
import { useI18n } from '@affine/i18n';
import { InformationFillDuotoneIcon, SingleSelectCheckSolidIcon, } from '@blocksuite/icons/rc';
import clsx from 'clsx';
import { useMemo } from 'react';
import * as styles from './style.css';
const getStatusLabel = (status) => {
    switch (status) {
        case SubscriptionStatus.Active:
            return _jsx(StatusLabel, { status: status });
        case SubscriptionStatus.PastDue:
            return _jsx(StatusLabel, { status: status });
        case SubscriptionStatus.Trialing:
            return _jsx(StatusLabel, { status: status });
        default:
            return null;
    }
};
export const CardNameLabelRow = ({ cardName, status, }) => {
    const statusLabel = useMemo(() => getStatusLabel(status), [status]);
    return (_jsxs("div", { className: styles.cardNameLabelRow, children: [_jsx("div", { className: styles.cardName, children: cardName }), statusLabel] }));
};
const StatusLabel = ({ status }) => {
    const t = useI18n();
    const label = useMemo(() => {
        switch (status) {
            case SubscriptionStatus.Active:
                return t['com.affine.payment.subscription-status.active']();
            case SubscriptionStatus.PastDue:
                return t['com.affine.payment.subscription-status.past-due']();
            case SubscriptionStatus.Trialing:
                return t['com.affine.payment.subscription-status.trialing']();
            default:
                return '';
        }
    }, [status, t]);
    const icon = useMemo(() => {
        switch (status) {
            case SubscriptionStatus.Active:
            case SubscriptionStatus.Trialing:
                return _jsx(SingleSelectCheckSolidIcon, {});
            case SubscriptionStatus.PastDue:
                return _jsx(InformationFillDuotoneIcon, {});
            default:
                return null;
        }
    }, [status]);
    return (_jsxs("div", { className: clsx(styles.cardLabelContainer, {
            'past-due': status === SubscriptionStatus.PastDue,
        }), children: [_jsx("div", { className: styles.cardLabelIcon, children: icon }), _jsx("div", { className: styles.cardLabel, children: label })] }));
};
//# sourceMappingURL=card-name-label-row.js.map