import type { HTMLAttributes, PropsWithChildren } from 'react';
import type { View } from '../../entities/view';
export interface SplitViewPanelProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
    view: View;
    index: number;
    resizeHandle?: React.ReactNode;
    onMove: (from: number, to: number) => void;
    onResizing: (dxy: {
        x: number;
        y: number;
    }) => void;
    draggingEntity: boolean;
}
export declare const SplitViewPanelContainer: ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => import("react/jsx-runtime").JSX.Element;
export declare const SplitViewPanel: import("react").NamedExoticComponent<SplitViewPanelProps>;
//# sourceMappingURL=panel.d.ts.map