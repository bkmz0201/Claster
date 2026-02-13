import type { PropsWithChildren, ReactNode } from 'react';
export interface SegmentProps extends PropsWithChildren {
    index: number;
    level?: number;
    direction?: 'up' | 'down';
    content: ReactNode;
    isTop?: boolean;
    isBottom?: boolean;
    [key: string]: any;
}
export declare function Segment({ children, index, direction, content, level, isTop, isBottom, ...attrs }: SegmentProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=segment.d.ts.map