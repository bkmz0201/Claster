import { type HtmlHTMLAttributes, type ReactNode } from 'react';
export declare const SeeAllLink: () => import("react/jsx-runtime").JSX.Element;
interface PricingCollapsibleProps extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'title'> {
    title?: ReactNode;
    caption?: ReactNode;
}
export declare const PricingCollapsible: ({ title, caption, children, }: PricingCollapsibleProps) => import("react/jsx-runtime").JSX.Element;
export interface PlanLayoutProps {
    cloud?: ReactNode;
    ai?: ReactNode;
}
export declare const PlanLayout: ({ cloud, ai }: PlanLayoutProps) => import("react/jsx-runtime").JSX.Element;
export interface PlanCardProps {
    title?: ReactNode;
    caption?: ReactNode;
    select?: ReactNode;
    toggle?: ReactNode;
    scroll?: ReactNode;
    lifetime?: ReactNode;
    scrollRef?: React.RefObject<HTMLDivElement>;
}
export declare const CloudPlanLayout: ({ title, caption, select, toggle, scroll, lifetime, scrollRef, }: PlanCardProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=layout.d.ts.map