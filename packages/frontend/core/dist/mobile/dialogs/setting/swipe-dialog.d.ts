import { type PropsWithChildren } from 'react';
export interface SwipeDialogProps extends PropsWithChildren {
    triggerSize?: number;
    title?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}
export declare const SwipeDialog: ({ title, children, open, triggerSize, onOpenChange, }: SwipeDialogProps) => import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=swipe-dialog.d.ts.map