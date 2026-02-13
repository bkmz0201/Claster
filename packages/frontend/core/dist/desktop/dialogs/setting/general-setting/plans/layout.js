import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Divider, IconButton } from '@affine/component';
import { SettingHeader } from '@affine/component/setting-components';
import { useI18n } from '@affine/i18n';
import { ArrowRightBigIcon, ArrowUpSmallIcon } from '@blocksuite/icons/rc';
import * as Collapsible from '@radix-ui/react-collapsible';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { useCallback, useRef, useState, } from 'react';
import * as styles from './layout.css';
export const SeeAllLink = () => {
    const t = useI18n();
    return (_jsxs("a", { className: styles.allPlansLink, href: "https://affine.pro/pricing", target: "_blank", rel: "noopener noreferrer", children: [t['com.affine.payment.see-all-plans'](), _jsx(ArrowRightBigIcon, { width: "16", height: "16" })] }));
};
export const PricingCollapsible = ({ title, caption, children, }) => {
    const [open, setOpen] = useState(true);
    const toggle = useCallback(() => setOpen(prev => !prev), []);
    return (_jsxs(Collapsible.Root, { open: open, onOpenChange: setOpen, children: [_jsxs("section", { className: styles.collapsibleHeader, children: [_jsxs("div", { className: styles.collapsibleHeaderContent, children: [_jsx("div", { className: styles.collapsibleHeaderTitle, children: title }), _jsx("div", { className: styles.collapsibleHeaderCaption, children: caption })] }), _jsx(IconButton, { onClick: toggle, size: "20", children: _jsx(ArrowUpSmallIcon, { style: {
                                transform: open ? 'rotate(0deg)' : 'rotate(180deg)',
                                transition: 'transform 0.23s ease',
                            } }) })] }), _jsx(Collapsible.Content, { children: children })] }));
};
export const PlanLayout = ({ cloud, ai }) => {
    const t = useI18n();
    const plansRootRef = useRef(null);
    return (_jsxs("div", { className: styles.plansLayoutRoot, ref: plansRootRef, children: [_jsx(SettingHeader, { style: { marginBottom: '0px' }, title: t['com.affine.payment.title']() }), ai ? (_jsxs(_Fragment, { children: [_jsx("div", { id: "aiPricingPlan", children: ai }), _jsx(Divider, { className: styles.aiDivider })] })) : null, _jsx("div", { id: "cloudPricingPlan", children: cloud })] }));
};
export const CloudPlanLayout = ({ title = 'AFFiNE Cloud', caption, select, toggle, scroll, lifetime, scrollRef, }) => {
    return (_jsxs(PricingCollapsible, { title: title, caption: caption, children: [_jsxs("div", { className: styles.affineCloudHeader, children: [_jsx("div", { children: select }), _jsx("div", { children: toggle })] }), _jsxs(ScrollArea.Root, { children: [_jsx(ScrollArea.Viewport, { ref: scrollRef, className: styles.scrollArea, children: scroll }), _jsx(ScrollArea.Scrollbar, { forceMount: true, orientation: "horizontal", className: styles.scrollBar, children: _jsx(ScrollArea.Thumb, { className: styles.scrollThumb }) })] }), lifetime ? (_jsx("div", { style: { paddingTop: 12 }, id: "lifetimePricingPlan", children: lifetime })) : null] }));
};
//# sourceMappingURL=layout.js.map