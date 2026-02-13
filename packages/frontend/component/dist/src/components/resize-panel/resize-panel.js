import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import { forwardRef, useCallback, useLayoutEffect, useRef } from 'react';
import { useTransitionState } from 'react-transition-state';
import { useDropTarget } from '../../ui/dnd';
import { Tooltip } from '../../ui/tooltip';
import * as styles from './resize-panel.css';
const ResizeHandle = ({ className, resizing, minWidth, maxWidth, resizeHandlePos, resizeHandleOffset, resizeHandleVerticalPadding, dropTargetOptions, open, onOpen, onResizing, onWidthChange, onWidthChanged, tooltip, tooltipShortcut, tooltipOptions, tooltipShortcutClassName, ...rest }) => {
    const ref = useRef(null);
    const onResizeStart = useCallback((event) => {
        event.preventDefault();
        let resized = false;
        const panelContainer = ref.current?.parentElement;
        if (!panelContainer)
            return;
        // add cursor style to body
        document.body.style.cursor = 'col-resize';
        const { left: anchorLeft, right: anchorRight } = panelContainer.getBoundingClientRect();
        let lastWidth;
        function onMouseMove(e) {
            e.preventDefault();
            if (!panelContainer)
                return;
            const newWidth = Math.min(maxWidth, Math.max(resizeHandlePos === 'right'
                ? e.clientX - anchorLeft
                : anchorRight - e.clientX, minWidth));
            lastWidth = newWidth;
            onWidthChange(newWidth);
            onResizing(true);
            resized = true;
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', () => {
            // if not resized, toggle sidebar
            if (!resized) {
                onOpen(false);
            }
            onResizing(false);
            lastWidth && onWidthChanged?.(lastWidth);
            document.removeEventListener('mousemove', onMouseMove);
            document.body.style.cursor = '';
        }, { once: true });
    }, [
        maxWidth,
        resizeHandlePos,
        minWidth,
        onWidthChange,
        onResizing,
        onWidthChanged,
        onOpen,
    ]);
    const { dropTargetRef } = useDropTarget(dropTargetOptions, [
        dropTargetOptions,
    ]);
    return (_jsx(Tooltip, { content: tooltip, shortcut: tooltipShortcut, shortcutClassName: tooltipShortcutClassName, ...tooltipOptions, children: _jsx("div", { ...rest, "data-testid": "resize-handle", ref: node => {
                ref.current = node;
                dropTargetRef.current = node;
            }, style: assignInlineVars({
                [styles.resizeHandleOffsetVar]: `${resizeHandleOffset ?? 0}px`,
                [styles.resizeHandleVerticalPadding]: `${resizeHandleVerticalPadding ?? 0}px`,
            }), className: clsx(styles.resizeHandleContainer, className), "data-handle-position": resizeHandlePos, "data-resizing": resizing, "data-open": open, onMouseDown: onResizeStart, children: _jsx("div", { className: styles.resizerInner }) }) }));
};
const animationTimeout = 300;
export const ResizePanel = forwardRef(function ResizePanel({ children, className, resizing, minWidth, maxWidth, width, floating, enableAnimation = true, open, unmountOnExit, onOpen, onResizing, onWidthChange, onWidthChanged, resizeHandlePos, resizeHandleOffset, resizeHandleVerticalPadding, resizeHandleTooltip, resizeHandleTooltipShortcut, resizeHandleTooltipShortcutClassName, resizeHandleTooltipOptions, resizeHandleDropTargetOptions, ...rest }, ref) {
    const safeWidth = Math.min(maxWidth, Math.max(minWidth, width));
    const [{ status }, toggle] = useTransitionState({
        timeout: animationTimeout,
    });
    useLayoutEffect(() => {
        toggle(open);
    }, [open, toggle]);
    return (_jsxs("div", { ...rest, ref: ref, style: assignInlineVars({
            [styles.panelWidthVar]: `${safeWidth}px`,
            [styles.animationTimeout]: `${animationTimeout}ms`,
        }), className: clsx(className, styles.root), "data-open": open, "data-transition-state": status, "data-is-floating": floating, "data-handle-position": resizeHandlePos, "data-enable-animation": enableAnimation && !resizing, children: [_jsx("div", { className: styles.content, children: !(status === 'exited' && unmountOnExit !== false) && children }), _jsx(ResizeHandle, { resizeHandlePos: resizeHandlePos, resizeHandleOffset: resizeHandleOffset, resizeHandleVerticalPadding: resizeHandleVerticalPadding, tooltip: resizeHandleTooltip, tooltipOptions: resizeHandleTooltipOptions, tooltipShortcut: resizeHandleTooltipShortcut, tooltipShortcutClassName: resizeHandleTooltipShortcutClassName, maxWidth: maxWidth, minWidth: minWidth, onOpen: onOpen, onResizing: onResizing, onWidthChange: onWidthChange, onWidthChanged: onWidthChanged, open: open, resizing: resizing, dropTargetOptions: resizeHandleDropTargetOptions })] }));
});
//# sourceMappingURL=resize-panel.js.map