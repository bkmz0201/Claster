import { SubscriptionPlan, SubscriptionRecurring } from '@affine/graphql';
import { useI18n } from '@affine/i18n';
import { type ReactNode } from 'react';
type T = ReturnType<typeof useI18n>;
export type Benefits = Record<string, Array<{
    icon?: ReactNode;
    title: ReactNode;
}>>;
interface BasePrice {
    plan: SubscriptionPlan;
    name: string;
    description: string;
    benefits: Benefits;
}
export interface FixedPrice extends BasePrice {
    type: 'fixed';
    price: string;
    yearlyPrice: string;
    discount?: string;
    titleRenderer: (recurring: SubscriptionRecurring, detail: FixedPrice) => ReactNode;
}
export interface DynamicPrice extends BasePrice {
    type: 'dynamic';
    contact: boolean;
    titleRenderer: (recurring: SubscriptionRecurring, detail: DynamicPrice) => ReactNode;
}
export declare function getPlanDetail(t: T): Map<SubscriptionPlan, FixedPrice | DynamicPrice>;
export declare const CloudPlans: () => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=cloud-plans.d.ts.map