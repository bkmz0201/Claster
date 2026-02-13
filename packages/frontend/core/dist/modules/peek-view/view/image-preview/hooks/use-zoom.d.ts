import type { MouseEvent as ReactMouseEvent, RefObject } from 'react';
interface UseZoomControlsProps {
    zoomRef: RefObject<HTMLDivElement | null>;
    imageRef: RefObject<HTMLImageElement | null>;
}
export declare const useZoomControls: ({ zoomRef, imageRef, }: UseZoomControlsProps) => {
    zoomIn: () => void;
    zoomOut: () => void;
    resetZoom: () => void;
    resetScale: () => void;
    isZoomedBigger: boolean;
    currentScale: number;
    handleDragStart: (event: ReactMouseEvent) => void;
    handleDrag: (event: ReactMouseEvent) => void;
    handleDragEnd: (event: ReactMouseEvent) => void;
};
export {};
//# sourceMappingURL=use-zoom.d.ts.map