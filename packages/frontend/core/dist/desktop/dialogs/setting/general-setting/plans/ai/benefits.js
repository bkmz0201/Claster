import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { CheckBoxCheckLinearIcon, PenIcon, TextIcon, } from '@blocksuite/icons/rc';
import { useMemo } from 'react';
import * as styles from './ai-plan.css';
const benefitsGetter = (t) => [
    {
        name: t['com.affine.payment.ai.benefit.g1'](),
        icon: _jsx(TextIcon, {}),
        items: [
            t['com.affine.payment.ai.benefit.g1-1'](),
            t['com.affine.payment.ai.benefit.g1-2'](),
            t['com.affine.payment.ai.benefit.g1-3'](),
        ],
    },
    {
        name: t['com.affine.payment.ai.benefit.g2'](),
        icon: _jsx(PenIcon, {}),
        items: [
            t['com.affine.payment.ai.benefit.g2-1'](),
            t['com.affine.payment.ai.benefit.g2-2'](),
            t['com.affine.payment.ai.benefit.g2-3'](),
        ],
    },
    {
        name: t['com.affine.payment.ai.benefit.g3'](),
        icon: _jsx(CheckBoxCheckLinearIcon, {}),
        items: [
            t['com.affine.payment.ai.benefit.g3-1'](),
            t['com.affine.payment.ai.benefit.g3-2'](),
            t['com.affine.payment.ai.benefit.g3-3'](),
        ],
    },
];
export const AIBenefits = () => {
    const t = useI18n();
    const benefits = useMemo(() => benefitsGetter(t), [t]);
    return (_jsx("div", { className: styles.benefits, children: benefits.map(({ name, icon, items }) => {
            return (_jsxs("div", { className: styles.benefitGroup, children: [_jsxs("div", { className: styles.benefitTitle, children: [icon, name] }), _jsx("ul", { className: styles.benefitList, children: items.map(item => (_jsx("li", { className: styles.benefitItem, children: item }, item))) })] }, name));
        }) }));
};
//# sourceMappingURL=benefits.js.map