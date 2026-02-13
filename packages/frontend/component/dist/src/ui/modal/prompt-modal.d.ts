import type { PropsWithChildren } from 'react';
import type { ButtonProps } from '../button';
import { type InputProps } from '../input';
import type { ModalProps } from './modal';
export interface PromptModalProps extends ModalProps {
    confirmButtonOptions?: Omit<ButtonProps, 'children'>;
    onConfirm?: ((text: string) => void) | ((text: string) => Promise<void>);
    onCancel?: () => void;
    confirmText?: React.ReactNode;
    cancelText?: React.ReactNode;
    label?: React.ReactNode;
    defaultValue?: string;
    required?: boolean;
    cancelButtonOptions?: Omit<ButtonProps, 'children'>;
    inputOptions?: Omit<InputProps, 'value' | 'onChange'>;
    reverseFooter?: boolean;
    /**
     * Auto focus on confirm button when modal opened
     * @default true
     */
    autoFocusConfirm?: boolean;
}
export declare const PromptModal: ({ children, confirmButtonOptions, confirmText, cancelText, cancelButtonOptions, reverseFooter, onConfirm, onCancel, label, required, inputOptions, defaultValue, width, autoFocusConfirm, headerClassName, descriptionClassName, ...props }: PromptModalProps) => import("react/jsx-runtime").JSX.Element;
interface OpenPromptModalOptions {
    autoClose?: boolean;
    onSuccess?: () => void;
}
export declare const PromptModalProvider: ({ children }: PropsWithChildren) => import("react/jsx-runtime").JSX.Element;
export declare const usePromptModal: () => {
    openPromptModal: (props?: PromptModalProps, options?: OpenPromptModalOptions) => void;
    closePromptModal: () => void;
};
export {};
//# sourceMappingURL=prompt-modal.d.ts.map