import type { PDF } from '../entities/pdf';
import type { PageSize } from '../renderer/types';
interface PDFPageProps {
    pdf: PDF;
    pageNum: number;
    actualSize: PageSize;
    maxSize: PageSize;
    viewportInfo: PageSize;
    resize: (viewportInfo: PageSize, actualSize: PageSize, maxSize: PageSize, isThumbnail?: boolean) => {
        aspectRatio: number;
    } & PageSize;
    scale?: number;
    className?: string;
    onSelect?: (pageNum: number) => void;
    isThumbnail?: boolean;
}
export declare const PDFPageRenderer: ({ pdf, pageNum, className, actualSize, maxSize, viewportInfo, onSelect, resize, isThumbnail, scale, }: PDFPageProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=page-renderer.d.ts.map