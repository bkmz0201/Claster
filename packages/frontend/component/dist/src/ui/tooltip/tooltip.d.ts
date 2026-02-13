import type { TooltipContentProps, TooltipPortalProps, TooltipProps as RootProps } from '@radix-ui/react-tooltip';
import { type ReactElement, type ReactNode } from 'react';
export interface TooltipProps {
    children: ReactElement;
    content?: ReactNode;
    /**
     * When shortcut is provided, will use a single line layout
     *
     * ```tsx
     * <Tooltip shortcut="T" />             // [T]
     * <Tooltip shortcut="⌘ + K" />         // [⌘ + K]
     * <Tooltip shortcut={['⌘', 'K']} />    // [⌘] [K]
     * <Tooltip shortcut={['$mod', 'K']} /> // [⌘] [K] or [Ctrl] [K]
     * ```
     *
     * Mapping:
     * | Shortcut | macOS | Windows |
     * |----------|-------|---------|
     * | `$mod`   | `⌘`   | `Ctrl`  |
     * | `$alt`   | `⌥`   | `Alt`   |
     * | `$shift` | `⇧`   | `Shift` |
     */
    shortcut?: string | string[];
    side?: TooltipContentProps['side'];
    align?: TooltipContentProps['align'];
    rootOptions?: Omit<RootProps, 'children'>;
    portalOptions?: TooltipPortalProps;
    options?: Omit<TooltipContentProps, 'side' | 'align'>;
    shortcutClassName?: string;
}
export declare const Tooltip: ({ children, content, side, align, shortcut, options, rootOptions, portalOptions, shortcutClassName, }: TooltipProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=tooltip.d.ts.map