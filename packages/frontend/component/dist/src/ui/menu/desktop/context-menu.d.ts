import * as RadixContextMenu from '@radix-ui/react-context-menu';
import type { RefAttributes } from 'react';
export type ContextMenuProps = RadixContextMenu.ContextMenuProps & RadixContextMenu.ContextMenuTriggerProps & RefAttributes<HTMLSpanElement> & {
    items: React.ReactNode;
    contentProps?: RadixContextMenu.ContextMenuContentProps;
};
export declare const ContextMenu: ({ children, onOpenChange, dir, modal, items, contentProps, ...props }: ContextMenuProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=context-menu.d.ts.map