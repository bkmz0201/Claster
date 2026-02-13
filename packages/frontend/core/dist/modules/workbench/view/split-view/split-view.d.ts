import type { HTMLAttributes } from 'react';
import type { View } from '../../entities/view';
export interface SplitViewProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * ⚠️ `vertical` orientation is not supported yet
     * @default 'horizontal'
     */
    orientation?: 'horizontal' | 'vertical';
    views: View[];
    renderer: (item: View) => React.ReactNode;
    onMove?: (from: number, to: number) => void;
}
export declare const SplitView: ({ orientation, className, views, renderer, onMove, ...attrs }: SplitViewProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=split-view.d.ts.map