import type { HTMLAttributes, PropsWithChildren } from 'react';
export interface ResizePanelProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
    horizontal?: boolean;
    vertical?: boolean;
    width?: number;
    height?: number;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    offsetModifier?: (offset: number[]) => number[];
}
/**
 * This component is used for debugging responsive layout in storybook
 * @internal
 */
export declare const ResizePanel: ({ width, height, children, minHeight, minWidth, maxHeight, maxWidth, className, horizontal, vertical, offsetModifier, ...attrs }: ResizePanelProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=resize-panel.d.ts.map