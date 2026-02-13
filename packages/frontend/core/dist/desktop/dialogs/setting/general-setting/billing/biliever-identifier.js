import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SubscriptionService } from '@affine/core/modules/cloud';
import { Trans, useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { BelieverCard } from '../plans/lifetime/believer-card';
import { BelieverBenefits } from '../plans/lifetime/benefits';
import * as styles from './style.css';
export const BelieverIdentifier = ({ onOpenPlans, }) => {
    const t = useI18n();
    const subscriptionService = useService(SubscriptionService);
    const readableLifetimePrice = useLiveData(subscriptionService.prices.readableLifetimePrice$);
    if (!readableLifetimePrice)
        return null;
    return (_jsxs(BelieverCard, { type: 2, style: { borderRadius: 8, padding: 12 }, children: [_jsxs("header", { className: styles.believerHeader, children: [_jsxs("div", { children: [_jsx("div", { className: styles.believerTitle, children: t['com.affine.payment.billing-setting.believer.title']() }), _jsx("div", { className: styles.believerSubtitle, children: _jsx(Trans, { i18nKey: 'com.affine.payment.billing-setting.believer.description', components: {
                                        a: _jsx("a", { href: "#", onClick: onOpenPlans }),
                                    } }) })] }), _jsxs("div", { className: styles.believerPriceWrapper, children: [_jsx("div", { className: styles.believerPrice, children: readableLifetimePrice }), _jsx("div", { className: styles.believerPriceCaption, children: t['com.affine.payment.billing-setting.believer.price-caption']() })] })] }), _jsx(BelieverBenefits, {})] }));
};
//# sourceMappingURL=biliever-identifier.js.map