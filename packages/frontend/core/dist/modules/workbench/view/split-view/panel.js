import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { MenuItem, shallowUpdater, useDraggable, useDropTarget, } from '@affine/component';
import { useI18n } from '@affine/i18n';
import track from '@affine/track';
import { CloseIcon, ExpandFullIcon, InsertLeftIcon, InsertRightIcon, } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useAtom } from 'jotai';
import { memo, useCallback, useMemo } from 'react';
import { WorkbenchService } from '../../services/workbench';
import { SplitViewIndicator } from './indicator';
import { ResizeHandle } from './resize-handle';
import * as styles from './split-view.css';
import { draggingOverViewAtom, draggingViewAtom, resizingViewAtom, } from './state';
import { allowedSplitViewEntityTypes } from './types';
export const SplitViewPanelContainer = ({ children, ...props }) => {
    return (_jsx("div", { className: styles.splitViewPanel, ...props, children: children }));
};
/**
 * Calculate the order of the panel
 */
function calculateOrder(index, draggingIndex, droppingIndex) {
    // If not dragging or invalid indices, return original index
    if (draggingIndex === -1 || draggingIndex < 0 || droppingIndex < 0) {
        return index;
    }
    // If this is the dragging item, move it to the dropping position
    if (index === draggingIndex) {
        return droppingIndex;
    }
    // If dropping before the dragging item
    if (droppingIndex < draggingIndex) {
        // Items between drop and drag positions shift right
        if (index >= droppingIndex && index < draggingIndex) {
            return index + 1;
        }
    }
    // If dropping after the dragging item
    else if (droppingIndex > draggingIndex &&
        index > draggingIndex &&
        index <= droppingIndex) {
        // Items between drag and drop positions shift left
        return index - 1;
    }
    // For all other items, keep their original position
    return index;
}
export const SplitViewPanel = memo(function SplitViewPanel({ children, view, onMove, onResizing, draggingEntity, index, }) {
    const size = useLiveData(view.size$);
    const workbench = useService(WorkbenchService).workbench;
    const activeView = useLiveData(workbench.activeView$);
    const views = useLiveData(workbench.views$);
    const isActive = activeView === view;
    const [draggingView, setDraggingView] = useAtom(draggingViewAtom);
    const [draggingOverView, setDraggingOverView] = useAtom(draggingOverViewAtom);
    const [resizingView, setResizingView] = useAtom(resizingViewAtom);
    const order = useMemo(() => calculateOrder(index, draggingView?.index ?? -1, draggingOverView?.index ?? -1), [index, draggingView, draggingOverView]);
    const isFirst = order === 0;
    const isLast = views.length - 1 === order;
    const style = useMemo(() => {
        return {
            ...assignInlineVars({
                [styles.size]: size.toString(),
                [styles.panelOrder]: order.toString(),
            }),
        };
    }, [size, order]);
    const { dropTargetRef } = useDropTarget(() => {
        const handleDrag = (data) => {
            // only the first view has left edge
            const edge = data.closestEdge;
            const switchEdge = edge === 'left' && !isFirst;
            const newDraggingOver = {
                view: switchEdge ? views[index - 1] : view,
                index: order,
                edge: switchEdge ? 'right' : edge,
            };
            setDraggingOverView(shallowUpdater(newDraggingOver));
        };
        return {
            closestEdge: {
                allowedEdges: ['left', 'right'],
            },
            isSticky: true,
            canDrop(data) {
                const entityType = data.source.data.entity?.type;
                return ((BUILD_CONFIG.isElectron &&
                    data.source.data.from?.at === 'workbench:view') ||
                    data.source.data.from?.at === 'workbench:link' ||
                    (!!entityType && allowedSplitViewEntityTypes.has(entityType)));
            },
            onDragEnter: handleDrag,
            onDrag: handleDrag,
        };
    }, [index, isFirst, order, setDraggingOverView, view, views]);
    const { dragRef } = useDraggable(() => {
        return {
            data: () => {
                return {
                    from: {
                        at: 'workbench:view',
                        viewId: view.id,
                    },
                };
            },
            onDrop() {
                if (order !== index && draggingOverView) {
                    onMove?.(index, draggingOverView.index);
                }
                setDraggingView(null);
                setDraggingOverView(null);
                track.$.splitViewIndicator.$.splitViewAction({
                    control: 'indicator',
                    action: 'move',
                });
            },
            onDragStart() {
                setDraggingView({
                    view,
                    index: order,
                });
            },
            canDrag() {
                return BUILD_CONFIG.isElectron && views.length > 1;
            },
            disableDragPreview: true,
        };
    }, [
        draggingOverView,
        index,
        onMove,
        order,
        setDraggingOverView,
        setDraggingView,
        view,
        views.length,
    ]);
    const dragging = draggingView?.view.id === view.id;
    const onResizeStart = useCallback(() => {
        setResizingView({ view, index });
    }, [setResizingView, view, index]);
    const onResizeEnd = useCallback(() => {
        setResizingView(null);
    }, [setResizingView]);
    const indicatingEdge = draggingOverView?.view === view ? draggingOverView.edge : null;
    return (_jsxs(SplitViewPanelContainer, { style: style, "data-is-resizing": !!resizingView, "data-is-reordering": !!draggingView, "data-is-dragging": dragging, "data-is-active": isActive && views.length > 1, "data-is-first": isFirst, "data-is-last": isLast, "data-testid": "split-view-panel", children: [isFirst ? (_jsx(ResizeHandle, { edge: "left", view: view, state: draggingEntity && indicatingEdge === 'left'
                    ? 'drop-indicator'
                    : 'idle' })) : null, _jsxs("div", { ref: dropTargetRef, "data-is-active": isActive && views.length > 1 && !draggingEntity, className: styles.splitViewPanelDrag, children: [_jsx("div", { draggable: false, className: styles.splitViewPanelContent, children: children }), views.length > 1 && onMove ? (_jsx(SplitViewIndicator, { view: view, isActive: isActive, isDragging: dragging, dragHandleRef: dragRef, menuItems: _jsx(SplitViewMenu, { view: view, onMove: onMove }) })) : null] }), !draggingView ? (_jsx(ResizeHandle, { edge: "right", view: view, state: resizingView?.view.id === view.id
                    ? 'resizing'
                    : draggingEntity && indicatingEdge === 'right'
                        ? 'drop-indicator'
                        : 'idle', onResizeStart: onResizeStart, onResizeEnd: onResizeEnd, onResizing: onResizing })) : null] }));
});
const SplitViewMenu = ({ view, onMove, }) => {
    const t = useI18n();
    const workbench = useService(WorkbenchService).workbench;
    const views = useLiveData(workbench.views$);
    const viewIndex = views.findIndex(v => v === view);
    const handleClose = useCallback(() => {
        workbench.close(view);
        track.$.splitViewIndicator.$.splitViewAction({
            control: 'menu',
            action: 'close',
        });
    }, [view, workbench]);
    const handleMoveLeft = useCallback(() => {
        onMove(viewIndex, viewIndex - 1);
        track.$.splitViewIndicator.$.splitViewAction({
            control: 'menu',
            action: 'move',
        });
    }, [onMove, viewIndex]);
    const handleMoveRight = useCallback(() => {
        onMove(viewIndex, viewIndex + 1);
        track.$.splitViewIndicator.$.splitViewAction({
            control: 'menu',
            action: 'move',
        });
    }, [onMove, viewIndex]);
    const handleCloseOthers = useCallback(() => {
        workbench.closeOthers(view);
        track.$.splitViewIndicator.$.splitViewAction({
            control: 'menu',
            action: 'closeOthers',
        });
    }, [view, workbench]);
    const CloseItem = views.length > 1 ? (_jsx(MenuItem, { prefixIcon: _jsx(CloseIcon, {}), onClick: handleClose, children: t['com.affine.workbench.split-view-menu.close']() })) : null;
    const MoveLeftItem = viewIndex > 0 && views.length > 1 ? (_jsx(MenuItem, { onClick: handleMoveLeft, prefixIcon: _jsx(InsertRightIcon, {}), children: t['com.affine.workbench.split-view-menu.move-left']() })) : null;
    const FullScreenItem = views.length > 1 ? (_jsx(MenuItem, { onClick: handleCloseOthers, prefixIcon: _jsx(ExpandFullIcon, {}), children: t['com.affine.workbench.split-view-menu.keep-this-one']() })) : null;
    const MoveRightItem = viewIndex < views.length - 1 ? (_jsx(MenuItem, { onClick: handleMoveRight, prefixIcon: _jsx(InsertLeftIcon, {}), children: t['com.affine.workbench.split-view-menu.move-right']() })) : null;
    return (_jsxs(_Fragment, { children: [MoveRightItem, MoveLeftItem, FullScreenItem, CloseItem] }));
};
//# sourceMappingURL=panel.js.map