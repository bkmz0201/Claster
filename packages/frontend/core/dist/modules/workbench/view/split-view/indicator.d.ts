import type { HTMLAttributes } from 'react';
import type { View } from '../../entities/view';
export interface SplitViewDragHandleProps extends HTMLAttributes<HTMLDivElement> {
    active?: boolean;
    dragging?: boolean;
    open?: boolean;
    onOpenMenu?: () => void;
}
export declare const SplitViewDragHandle: import("react").NamedExoticComponent<SplitViewDragHandleProps & import("react").RefAttributes<HTMLDivElement>>;
interface SplitViewIndicatorProps extends HTMLAttributes<HTMLDivElement> {
    view: View;
    isActive?: boolean;
    isDragging?: boolean;
    menuItems?: React.ReactNode;
    setPressed?: (pressed: boolean) => void;
    dragHandleRef?: React.RefObject<HTMLDivElement>;
}
export declare const SplitViewIndicator: import("react").NamedExoticComponent<SplitViewIndicatorProps & import("react").RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=indicator.d.ts.map