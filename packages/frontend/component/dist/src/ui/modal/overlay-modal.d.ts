import type { ButtonProps } from '../button';
import type { ModalProps } from './modal';
export interface OverlayModalProps extends ModalProps {
    to?: string;
    external?: boolean;
    topImage?: React.ReactNode;
    confirmText?: string;
    confirmButtonOptions?: ButtonProps;
    onConfirm?: () => void;
    cancelText?: string;
    cancelButtonOptions?: ButtonProps;
    withoutCancelButton?: boolean;
}
export declare const OverlayModal: import("react").NamedExoticComponent<OverlayModalProps>;
//# sourceMappingURL=overlay-modal.d.ts.map