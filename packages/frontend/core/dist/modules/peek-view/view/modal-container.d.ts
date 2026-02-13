import { type PropsWithChildren } from 'react';
import type { PeekViewAnimation, PeekViewMode } from '../entities/peek-view';
export declare const PeekViewContext: import("react").Context<Record<string, never> | null>;
export declare const useInsidePeekView: () => boolean;
export type PeekViewModalContainerProps = PropsWithChildren<{
    onOpenChange: (open: boolean) => void;
    open: boolean;
    target?: HTMLElement;
    controls?: React.ReactNode;
    onAnimationStart?: () => void;
    onAnimationEnd?: () => void;
    mode?: PeekViewMode;
    animation?: PeekViewAnimation;
    testId?: string;
    /** Whether to apply shadow & bg */
    dialogFrame?: boolean;
}>;
export declare const PeekViewModalContainer: import("react").ForwardRefExoticComponent<{
    onOpenChange: (open: boolean) => void;
    open: boolean;
    target?: HTMLElement;
    controls?: React.ReactNode;
    onAnimationStart?: () => void;
    onAnimationEnd?: () => void;
    mode?: PeekViewMode;
    animation?: PeekViewAnimation;
    testId?: string;
    /** Whether to apply shadow & bg */
    dialogFrame?: boolean;
} & {
    children?: import("react").ReactNode | undefined;
} & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=modal-container.d.ts.map