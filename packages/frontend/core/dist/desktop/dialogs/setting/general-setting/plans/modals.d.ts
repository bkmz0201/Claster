import type { ConfirmModalProps } from '@affine/component/ui/modal';
import type { ReactNode } from 'react';
/**
 *
 * @param param0
 * @returns
 */
export declare const ConfirmLoadingModal: ({ type, loading, open, content, onOpenChange, onConfirm, ...props }: {
    type: "resume" | "change";
    loading?: boolean;
    content?: ReactNode;
} & ConfirmModalProps) => import("react/jsx-runtime").JSX.Element;
/**
 * Downgrade modal, confirm & cancel button are reversed
 * @param param0
 */
export declare const DowngradeModal: ({ open, loading, onOpenChange, onCancel, }: {
    loading?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onCancel?: () => void;
}) => import("react/jsx-runtime").JSX.Element;
export declare const DowngradeTeamModal: ({ open, loading, onOpenChange, onCancel, }: {
    loading?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onCancel?: () => void;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=modals.d.ts.map