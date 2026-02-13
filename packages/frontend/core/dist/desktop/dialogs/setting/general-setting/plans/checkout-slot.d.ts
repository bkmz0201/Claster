import type { CreateCheckoutSessionInput } from '@affine/graphql';
import { type PropsWithChildren, type ReactNode } from 'react';
export interface CheckoutSlotProps extends PropsWithChildren {
    checkoutOptions: Omit<CreateCheckoutSessionInput, 'idempotencyKey'>;
    onBeforeCheckout?: () => void;
    onCheckoutError?: (error: any) => void;
    onCheckoutSuccess?: () => void;
    renderer: (props: {
        onClick: () => void;
        loading: boolean;
    }) => ReactNode;
}
/**
 * A wrapper component for checkout action
 */
export declare const CheckoutSlot: ({ checkoutOptions, onBeforeCheckout, onCheckoutError, onCheckoutSuccess, renderer: Renderer, }: CheckoutSlotProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=checkout-slot.d.ts.map