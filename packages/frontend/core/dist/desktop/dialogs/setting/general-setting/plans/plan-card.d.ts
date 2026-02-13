import { type ButtonProps } from '@affine/component/ui/button';
import { type CreateCheckoutSessionInput, SubscriptionPlan, SubscriptionRecurring } from '@affine/graphql';
import type { PropsWithChildren } from 'react';
import type { DynamicPrice, FixedPrice } from './cloud-plans';
interface PlanCardProps {
    detail: FixedPrice | DynamicPrice;
    recurring: SubscriptionRecurring;
}
export declare const PlanCard: (props: PlanCardProps) => import("react/jsx-runtime").JSX.Element;
export declare const Upgrade: ({ className, recurring, plan, workspaceId, children, checkoutInput, onCheckoutSuccess, onBeforeCheckout, ...btnProps }: ButtonProps & {
    recurring: SubscriptionRecurring;
    plan: SubscriptionPlan;
    workspaceId?: string;
    checkoutInput?: Partial<CreateCheckoutSessionInput>;
    onBeforeCheckout?: () => void;
    onCheckoutSuccess?: () => void;
}) => import("react/jsx-runtime").JSX.Element;
export declare const SignUpAction: ({ children, className, }: PropsWithChildren<{
    className?: string;
}>) => import("react/jsx-runtime").JSX.Element;
export declare const RedeemCode: ({ className, recurring, plan, children, ...btnProps }: ButtonProps & {
    recurring?: SubscriptionRecurring;
    plan?: SubscriptionPlan;
}) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=plan-card.d.ts.map