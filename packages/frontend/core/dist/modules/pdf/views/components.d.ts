import { type CSSProperties } from 'react';
import type { ScrollSeekPlaceholderProps, VirtuosoProps } from 'react-virtuoso';
import type { PDFMeta } from '../renderer';
import type { PageSize } from '../renderer/types';
export type PDFVirtuosoContext = {
    viewportInfo: PageSize;
    meta: PDFMeta;
    resize: (viewportInfo: PageSize, actualSize: PageSize, maxSize: PageSize, isThumbnail?: boolean) => {
        aspectRatio: number;
    } & PageSize;
    isThumbnail?: boolean;
    pageClassName?: string;
    onPageSelect?: (index: number) => void;
};
export type PDFVirtuosoProps = VirtuosoProps<unknown, PDFVirtuosoContext>;
export declare const Scroller: import("react").ForwardRefExoticComponent<PDFVirtuosoProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const ScrollSeekPlaceholder: import("react").ForwardRefExoticComponent<ScrollSeekPlaceholderProps & {
    context?: PDFVirtuosoContext;
} & import("react").RefAttributes<HTMLDivElement>>;
export declare const List: import("react").ForwardRefExoticComponent<PDFVirtuosoProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const ListWithSmallGap: import("react").ForwardRefExoticComponent<PDFVirtuosoProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const Item: import("react").ForwardRefExoticComponent<PDFVirtuosoProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const ListPadding: () => import("react/jsx-runtime").JSX.Element;
export declare const LoadingSvg: import("react").MemoExoticComponent<({ className, style }: {
    className?: string;
    style?: CSSProperties;
}) => import("react/jsx-runtime").JSX.Element>;
export declare const PDFPageCanvas: import("react").ForwardRefExoticComponent<{
    style?: CSSProperties;
} & import("react").RefAttributes<HTMLCanvasElement>>;
//# sourceMappingURL=components.d.ts.map