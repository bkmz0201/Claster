import type { HTMLAttributes } from 'react';
import type { View } from '../../entities/view';
interface ResizeHandleProps extends HTMLAttributes<HTMLDivElement> {
    state: 'resizing' | 'drop-indicator' | 'idle';
    edge: 'left' | 'right';
    view: View;
    onResizeStart?: () => void;
    onResizeEnd?: () => void;
    onResizing?: (offset: {
        x: number;
        y: number;
    }) => void;
}
export declare const ResizeHandle: ({ state, view, edge, onResizing, onResizeStart, onResizeEnd, }: ResizeHandleProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=resize-handle.d.ts.map