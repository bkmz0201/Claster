import type { PropsWithChildren } from 'react';
import type { ButtonProps } from '../button';
import type { ModalProps } from './modal';
export interface ConfirmModalProps extends ModalProps {
    customConfirmButton?: () => React.ReactNode;
    confirmButtonOptions?: Omit<ButtonProps, 'children'>;
    childrenContentClassName?: string;
    onConfirm?: (() => void) | (() => Promise<void>);
    onCancel?: (() => void) | false;
    confirmText?: React.ReactNode;
    cancelText?: React.ReactNode;
    cancelButtonOptions?: Omit<ButtonProps, 'children'>;
    reverseFooter?: boolean;
    /**
     * Whether to use row layout for mobile footer
     * @default false
     */
    rowFooter?: boolean;
    /**
     * Auto focus on confirm button when modal opened
     * @default true
     */
    autoFocusConfirm?: boolean;
}
export declare const ConfirmModal: ({ children, confirmButtonOptions, customConfirmButton: CustomConfirmButton, confirmText, cancelText, cancelButtonOptions, reverseFooter, onConfirm, onCancel, width, autoFocusConfirm, headerClassName, descriptionClassName, childrenContentClassName, contentOptions, rowFooter, ...props }: ConfirmModalProps) => import("react/jsx-runtime").JSX.Element;
interface OpenConfirmModalOptions {
    autoClose?: boolean;
    onSuccess?: () => void;
}
export declare const ConfirmModalProvider: ({ children }: PropsWithChildren) => import("react/jsx-runtime").JSX.Element;
export declare const useConfirmModal: () => {
    openConfirmModal: (props?: ConfirmModalProps, options?: OpenConfirmModalOptions) => void;
    closeConfirmModal: () => void;
};
export {};
//# sourceMappingURL=confirm-modal.d.ts.map