import type { DialogContentProps, DialogOverlayProps, DialogPortalProps, DialogProps } from '@radix-ui/react-dialog';
import type { CSSProperties } from 'react';
import type { IconButtonProps } from '../button';
export interface ModalProps extends DialogProps {
    width?: CSSProperties['width'];
    height?: CSSProperties['height'];
    minHeight?: CSSProperties['minHeight'];
    title?: React.ReactNode;
    headerClassName?: string;
    description?: React.ReactNode;
    descriptionClassName?: string;
    withoutCloseButton?: boolean;
    /**
     * __Click outside__ or __Press `Esc`__ won't close the modal
     * @default false
     */
    persistent?: boolean;
    portalOptions?: DialogPortalProps;
    contentOptions?: DialogContentProps;
    overlayOptions?: DialogOverlayProps;
    closeButtonOptions?: IconButtonProps;
    contentWrapperClassName?: string;
    contentWrapperStyle?: CSSProperties;
    /**
     * @default 'fadeScaleTop'
     */
    animation?: 'fadeScaleTop' | 'none' | 'slideBottom' | 'slideRight';
    /**
     * Whether to show the modal in full screen mode
     */
    fullScreen?: boolean;
    disableAutoFocus?: boolean;
}
export declare const ModalInner: import("react").ForwardRefExoticComponent<ModalProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const Modal: import("react").ForwardRefExoticComponent<ModalProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const useIsInsideModal: () => boolean;
//# sourceMappingURL=modal.d.ts.map