import type { ReactElement } from 'react';
export interface ImageData {
    index?: number;
    url: string;
    caption?: string;
    onDelete?: () => void;
    previous?: () => ImageData | undefined;
    next?: () => ImageData | undefined;
}
export interface ImagePreviewData {
    image: ImageData;
    total?: number;
}
export interface ImagePreviewProps extends ImagePreviewData {
    onClose: () => void;
    blobId?: string;
}
export declare const GenericImagePreviewModal: ({ image, total, onClose, blobId, }: ImagePreviewProps) => ReactElement;
export type ImagePreviewModalProps = {
    docId: string;
    blockId: string;
};
export declare const ImagePreviewPeekView: (props: ImagePreviewModalProps) => ReactElement | null;
export declare const GenericImagePreviewModalWithClose: (props: Omit<ImagePreviewProps, "onClose">) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map