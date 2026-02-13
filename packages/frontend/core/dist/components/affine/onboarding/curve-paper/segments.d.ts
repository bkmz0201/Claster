import type { ReactNode } from 'react';
export interface SegmentsProps {
    level?: number;
    direction?: 'up' | 'down';
    index: number;
    root?: boolean;
    centerIndex: number;
    segments: number;
    content: ReactNode;
}
export declare function Segments({ level, direction, root, index, centerIndex, segments, content, }: SegmentsProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=segments.d.ts.map