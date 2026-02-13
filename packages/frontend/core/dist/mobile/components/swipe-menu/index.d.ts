import { type HTMLAttributes, type ReactNode } from 'react';
export interface SwipeMenuProps extends HTMLAttributes<HTMLDivElement> {
    menu: ReactNode;
    /**
     * if the swipe distance is greater than the threshold, will execute the callback
     * @default 200
     */
    executeThreshold?: number;
    onExecute?: () => void;
    normalWidth?: number;
}
/**
 * Only support swipe left yet
 * Only support single menu item yet
 */
export declare const SwipeMenu: ({ children, className, menu, normalWidth, executeThreshold, onExecute, ...props }: SwipeMenuProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map