import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { AfFiNeIcon, DoneIcon } from '@blocksuite/icons/rc';
import clsx from 'clsx';
import { benefits, li } from './benefits.css';
export const BelieverBenefits = ({ className, ...attrs }) => {
    const t = useI18n();
    return (_jsxs("ul", { className: clsx(benefits, className), ...attrs, children: [_jsxs("li", { className: li, children: [_jsx(AfFiNeIcon, {}), _jsx("span", { children: t['com.affine.payment.lifetime.benefit-1']() })] }), _jsxs("li", { className: li, children: [_jsx(DoneIcon, {}), _jsx("span", { children: t['com.affine.payment.lifetime.benefit-2']() })] }), _jsxs("li", { className: li, children: [_jsx(DoneIcon, {}), _jsx("span", { children: t['com.affine.payment.lifetime.benefit-3']({
                            capacity: '1T',
                        }) })] })] }));
};
//# sourceMappingURL=benefits.js.map