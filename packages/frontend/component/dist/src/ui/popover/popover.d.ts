import type { PopoverContentProps, PopoverPortalProps, PopoverProps as PopoverPrimitiveProps } from '@radix-ui/react-popover';
import type { ReactNode } from 'react';
export interface PopoverProps extends PopoverPrimitiveProps {
    content?: ReactNode;
    portalOptions?: PopoverPortalProps;
    contentOptions?: PopoverContentProps;
}
export declare const Popover: {
    ({ content, children, portalOptions, contentOptions: { className: contentClassName, style: contentStyle, ...otherContentOptions }, ...props }: PopoverProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
//# sourceMappingURL=popover.d.ts.map