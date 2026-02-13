import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import { debounce } from 'lodash-es';
import throttle from 'lodash-es/throttle';
import { forwardRef, Fragment, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState, } from 'react';
import { observeResize } from '../../utils';
import { Scrollable } from '../scrollbar';
import * as styles from './styles.css';
import { calcActive, calcColumns, calcLayout, calcPX, calcSticky, } from './utils';
export const Masonry = forwardRef(function Masonry({ items, gapX = 12, gapY = 12, itemWidth = 'stretch', itemWidthMin = 100, paddingX = 0, paddingY = 0, className, virtualScroll = false, locateMode = 'leftTop', groupsGap = 0, groupHeaderGapWithItems = 0, stickyGroupHeader = true, collapsedGroups, columns, preloadHeight = 50, resizeDebounce = 20, onGroupCollapse, onStickyGroupChange, ...props }, ref) {
    const rootRef = useRef(null);
    const [height, setHeight] = useState(0);
    const [layoutMap, setLayoutMap] = useState(new Map());
    /**
     * Record active items, to ensure all items won't be rendered when initialized.
     */
    const [activeMap, setActiveMap] = useState(new Map());
    const [stickyGroupId, setStickyGroupId] = useState(undefined);
    const [totalWidth, setTotalWidth] = useState(0);
    const stickyGroupCollapsed = !!(collapsedGroups &&
        stickyGroupId &&
        collapsedGroups.includes(stickyGroupId));
    const groups = useMemo(() => {
        if (items.length === 0) {
            return [];
        }
        if (items[0] && 'items' in items[0])
            return items;
        return [{ id: '', height: 0, items: items }];
    }, [items]);
    const stickyGroup = useMemo(() => {
        if (!stickyGroupId)
            return undefined;
        return groups.find(group => group.id === stickyGroupId);
    }, [groups, stickyGroupId]);
    const updateActiveMap = useCallback((layoutMap, _scrollY) => {
        if (!virtualScroll)
            return;
        const rootEl = rootRef.current;
        if (!rootEl)
            return;
        requestAnimationFrame(() => {
            const scrollY = _scrollY ?? rootEl.scrollTop;
            const activeMap = calcActive({
                viewportHeight: rootEl.clientHeight,
                scrollY,
                layoutMap,
                preloadHeight,
            });
            setActiveMap(activeMap);
        });
    }, [preloadHeight, virtualScroll]);
    const calculateLayout = useCallback(() => {
        const rootEl = rootRef.current;
        if (!rootEl)
            return;
        const totalWidth = rootEl.clientWidth;
        const { columns: calculatedColumns, width } = calcColumns(totalWidth, itemWidth, itemWidthMin, gapX, paddingX, columns);
        const { layout, height } = calcLayout(groups, {
            totalWidth,
            columns: calculatedColumns,
            width,
            gapX,
            gapY,
            paddingX,
            paddingY,
            groupsGap,
            groupHeaderGapWithItems,
            collapsedGroups: collapsedGroups ?? [],
        });
        setLayoutMap(layout);
        setHeight(height);
        setTotalWidth(totalWidth);
        updateActiveMap(layout);
        if (stickyGroupHeader && rootRef.current) {
            setStickyGroupId(calcSticky({ scrollY: rootRef.current.scrollTop, layoutMap: layout }));
        }
    }, [
        collapsedGroups,
        columns,
        gapX,
        gapY,
        groupHeaderGapWithItems,
        groups,
        groupsGap,
        itemWidth,
        itemWidthMin,
        paddingX,
        paddingY,
        stickyGroupHeader,
        updateActiveMap,
    ]);
    // handle resize
    useEffect(() => {
        calculateLayout();
        if (rootRef.current) {
            return observeResize(rootRef.current, debounce(calculateLayout, resizeDebounce));
        }
        return;
    }, [calculateLayout, resizeDebounce]);
    // handle scroll
    useEffect(() => {
        const rootEl = rootRef.current;
        if (!rootEl)
            return;
        if (virtualScroll) {
            const handler = throttle((e) => {
                const scrollY = e.target.scrollTop;
                updateActiveMap(layoutMap, scrollY);
                if (stickyGroupHeader) {
                    const stickyGroupId = calcSticky({ scrollY, layoutMap });
                    setStickyGroupId(stickyGroupId);
                    onStickyGroupChange?.(stickyGroupId);
                }
            }, 50);
            rootEl.addEventListener('scroll', handler);
            return () => {
                rootEl.removeEventListener('scroll', handler);
            };
        }
        return;
    }, [
        layoutMap,
        onStickyGroupChange,
        stickyGroupHeader,
        updateActiveMap,
        virtualScroll,
    ]);
    const scrollToGroup = useCallback((groupId) => {
        const group = layoutMap.get(groupId);
        if (!group)
            return;
        rootRef.current?.scrollTo({
            top: group.y,
            behavior: 'instant',
        });
    }, [layoutMap]);
    useImperativeHandle(ref, () => {
        return { scrollToGroup };
    });
    return (_jsxs(Scrollable.Root, { children: [_jsxs(Scrollable.Viewport, { ref: rootRef, "data-masonry-root": true, className: clsx('scrollable', styles.root, className), ...props, children: [groups.map(group => {
                        // sleep is not calculated, do not render
                        const { id: groupId, items, className, Component, ...groupProps } = group;
                        const collapsed = collapsedGroups && collapsedGroups.includes(groupId);
                        return (_jsxs(Fragment, { children: [virtualScroll && !activeMap.get(group.id) ? null : (_jsx(MasonryGroupHeader, { className: clsx(styles.groupHeader, className), id: groupId, locateMode: locateMode, xywh: layoutMap.get(groupId), ...groupProps, onClick: () => onGroupCollapse?.(groupId, !collapsed), Component: Component, itemCount: items.length, collapsed: !!collapsed, groupId: groupId, paddingX: calcPX(paddingX, totalWidth) }, `header-${groupId}`)), collapsed
                                    ? null
                                    : items.map(({ id: itemId, Component, ...item }) => {
                                        const mixId = groupId ? `${groupId}:${itemId}` : itemId;
                                        if (virtualScroll && !activeMap.get(mixId))
                                            return null;
                                        return (_jsx(MasonryGroupItem, { id: mixId, ...item, locateMode: locateMode, xywh: layoutMap.get(mixId), groupId: groupId, itemId: itemId, Component: Component }, mixId));
                                    })] }, groupId));
                    }), _jsx("div", { "data-masonry-placeholder": true, style: { height } })] }), stickyGroup ? (_jsx("div", { className: clsx(styles.stickyGroupHeader, stickyGroup.className), style: {
                    padding: `0 ${calcPX(paddingX, totalWidth)}px`,
                    height: stickyGroup.height,
                    ...stickyGroup.style,
                }, onClick: () => onGroupCollapse?.(stickyGroup.id, !stickyGroupCollapsed), children: stickyGroup.Component ? (_jsx(stickyGroup.Component, { groupId: stickyGroup.id, itemCount: stickyGroup.items.length, collapsed: stickyGroupCollapsed })) : (stickyGroup.children) })) : null, _jsx(Scrollable.Scrollbar, { className: styles.scrollbar })] }));
});
const MasonryGroupHeader = memo(function MasonryGroupHeader({ id, children, style, className, Component, groupId, itemCount, collapsed, paddingX, ...props }) {
    const content = useMemo(() => {
        if (Component) {
            return (_jsx(Component, { groupId: groupId, itemCount: itemCount, collapsed: collapsed }));
        }
        return children;
    }, [Component, children, collapsed, groupId, itemCount]);
    return (_jsx(MasonryItem, { id: id, style: {
            padding: `0 ${paddingX}px`,
            height: '100%',
            ...style,
        }, className: className, ...props, children: content }));
});
const MasonryGroupItem = memo(function MasonryGroupItem({ id, children, className, Component, groupId, itemId, ...props }) {
    const content = useMemo(() => {
        if (Component) {
            return _jsx(Component, { groupId: groupId, itemId: itemId });
        }
        return children;
    }, [Component, children, groupId, itemId]);
    return (_jsx(MasonryItem, { id: id, className: className, ...props, children: content }));
});
const MasonryItem = memo(function MasonryItem({ id, xywh, locateMode = 'leftTop', children, className, style: styleProp, ...props }) {
    const style = useMemo(() => {
        if (!xywh)
            return { display: 'none' };
        const { x, y, w, h } = xywh;
        const posStyle = locateMode === 'transform'
            ? { transform: `translate(${x}px, ${y}px)` }
            : locateMode === 'leftTop'
                ? { left: `${x}px`, top: `${y}px` }
                : { transform: `translate3d(${x}px, ${y}px, 0)` };
        return {
            left: 0,
            top: 0,
            ...styleProp,
            ...posStyle,
            width: `${w}px`,
            height: `${h}px`,
        };
    }, [locateMode, styleProp, xywh]);
    if (!xywh)
        return null;
    return (_jsx("div", { "data-masonry-item": true, "data-masonry-item-id": id, style: style, className: clsx(styles.item, className), ...props, children: children }));
});
//# sourceMappingURL=masonry.js.map