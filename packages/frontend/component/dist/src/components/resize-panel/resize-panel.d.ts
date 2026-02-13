import { useDropTarget } from '../../ui/dnd';
import { type TooltipProps } from '../../ui/tooltip';
export interface ResizeHandleProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    resizing: boolean;
    open: boolean;
    minWidth: number;
    maxWidth: number;
    resizeHandlePos: 'left' | 'right';
    resizeHandleOffset?: number;
    resizeHandleVerticalPadding?: number;
    onOpen: (open: boolean) => void;
    onResizing: (resizing: boolean) => void;
    onWidthChange: (width: number) => void;
    onWidthChanged?: (width: number) => void;
    tooltip?: TooltipProps['content'];
    tooltipShortcut?: TooltipProps['shortcut'];
    tooltipOptions?: Partial<Omit<TooltipProps, 'content' | 'shortcut'>>;
    tooltipShortcutClassName?: string;
    dropTargetOptions?: Parameters<typeof useDropTarget>[0];
}
export interface ResizePanelProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    resizing: boolean;
    open: boolean;
    floating?: boolean;
    minWidth: number;
    maxWidth: number;
    resizeHandlePos: 'left' | 'right';
    resizeHandleOffset?: number;
    resizeHandleVerticalPadding?: number;
    resizeHandleTooltip?: TooltipProps['content'];
    resizeHandleTooltipShortcut?: TooltipProps['shortcut'];
    resizeHandleTooltipShortcutClassName?: string;
    resizeHandleTooltipOptions?: Partial<Omit<TooltipProps, 'content' | 'shortcut'>>;
    resizeHandleDropTargetOptions?: Parameters<typeof useDropTarget>[0];
    enableAnimation?: boolean;
    width: number;
    unmountOnExit?: boolean;
    onOpen: (open: boolean) => void;
    onResizing: (resizing: boolean) => void;
    onWidthChange: (width: number) => void;
    onWidthChanged?: (width: number) => void;
}
export declare const ResizePanel: import("react").ForwardRefExoticComponent<ResizePanelProps & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=resize-panel.d.ts.map