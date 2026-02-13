import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Skeleton } from '@affine/component';
import { AIPlanLayout } from './ai/layout';
import { CloudPlanLayout, PlanLayout } from './layout';
import * as styles from './skeleton.css';
/**
 * Customize Skeleton component with rounded border radius
 * @param param0
 * @returns
 */
const RoundedSkeleton = ({ radius = 8, ...props }) => (_jsx(Skeleton, { ...props, style: { borderRadius: `${radius}px` } }));
const TabsSkeleton = () => (
// TODO(@catsjuice): height should be `32px` by design
// but the RadioGroup component is not matching with the design currently
// set to `24px` for now to avoid blinking
_jsx(Skeleton, { variant: "rounded", width: "256px", height: "24px" }));
const PlanItemSkeleton = () => (_jsxs("div", { className: styles.planItemCard, children: [_jsxs("header", { className: styles.planItemHeader, children: [_jsx(RoundedSkeleton, { variant: "rounded", width: "100%", height: "60px" }), _jsx(RoundedSkeleton, { variant: "rounded", width: "100%", height: "28px" })] }), _jsx("main", { className: styles.planItemContent, children: _jsx(RoundedSkeleton, { variant: "rounded", width: "100%", height: "100%" }) })] }));
const ScrollSkeleton = () => (_jsxs("div", { className: styles.plansWrapper, children: [_jsx(PlanItemSkeleton, {}), _jsx(PlanItemSkeleton, {}), _jsx(PlanItemSkeleton, {})] }));
export const PlansSkeleton = () => {
    return (_jsx(PlanLayout, { ai: _jsx(AIPlanLayout, { caption: _jsx(RoundedSkeleton, { variant: "rectangular", radius: 2, width: "200px", height: "20px" }), actionButtons: _jsxs(_Fragment, { children: [_jsx(RoundedSkeleton, { variant: "rectangular", radius: 20, width: "206px", height: "37px" }), _jsx(RoundedSkeleton, { variant: "rectangular", radius: 20, width: "193px", height: "37px" })] }) }), cloud: _jsx(CloudPlanLayout, { toggle: _jsx(RoundedSkeleton, { variant: "rounded", width: "100%", height: "32px" }), select: _jsx(TabsSkeleton, {}), scroll: _jsx(ScrollSkeleton, {}) }) }));
};
//# sourceMappingURL=skeleton.js.map