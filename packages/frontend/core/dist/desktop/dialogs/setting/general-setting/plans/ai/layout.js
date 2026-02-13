import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { PricingCollapsible } from '../layout';
import * as styles from './ai-plan.css';
import { AIBenefits } from './benefits';
export const AIPlanLayout = ({ caption, actionButtons, billingTip, }) => {
    const t = useI18n();
    const title = t['com.affine.payment.ai.pricing-plan.title']();
    return (_jsx(PricingCollapsible, { title: title, caption: caption, children: _jsxs("div", { className: styles.card, children: [_jsxs("div", { className: styles.titleBlock, children: [_jsx("section", { className: styles.titleCaption1, children: t['com.affine.payment.ai.pricing-plan.title-caption-1']() }), _jsx("section", { className: styles.title, children: t['com.affine.payment.ai.pricing-plan.title']() }), _jsx("section", { className: styles.titleCaption2, children: t['com.affine.payment.ai.pricing-plan.title-caption-2']() })] }), _jsxs("div", { className: styles.actionBlock, children: [_jsx("div", { className: styles.actionButtons, children: actionButtons }), billingTip ? (_jsx("div", { className: styles.agreement, children: billingTip })) : null] }), _jsx(AIBenefits, {})] }) }));
};
//# sourceMappingURL=layout.js.map