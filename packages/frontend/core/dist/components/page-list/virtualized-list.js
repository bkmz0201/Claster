import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Scrollable } from '@affine/component';
import clsx from 'clsx';
import { selectAtom } from 'jotai/utils';
import { forwardRef, useCallback, useMemo, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { ListInnerWrapper } from './list';
import * as styles from './list.css';
import { ItemGroupHeader } from './page-group';
import { groupCollapseStateAtom, groupsAtom, listPropsAtom, ListProvider, useAtomValue, } from './scoped-atoms';
/**
 * Given a list of pages, render a list of pages
 * Similar to normal PageList, but uses react-virtuoso to render the list (virtual rendering)
 */
export const VirtualizedList = forwardRef(function VirtualizedList(props, ref) {
    return (
    // push pageListProps to the atom so that downstream components can consume it
    // this makes sure pageListPropsAtom is always populated
    // @ts-expect-error jotai-scope is not well typed, AnyWritableAtom is should be any rather than unknown
    _jsx(ListProvider, { initialValues: [[listPropsAtom, props]], children: _jsx(ListInnerWrapper, { ...props, handleRef: ref, children: _jsx(ListInner, { ...props }) }) }));
});
const headingAtom = selectAtom(listPropsAtom, props => props?.heading);
const PageListHeading = () => {
    const heading = useAtomValue(headingAtom);
    return _jsx("div", { className: styles.heading, children: heading });
};
const useVirtuosoItems = () => {
    const groups = useAtomValue(groupsAtom);
    const groupCollapsedState = useAtomValue(groupCollapseStateAtom);
    return useMemo(() => {
        const items = [];
        // 1.
        // always put sticky header at the top
        // the visibility of sticky header is inside of PageListTableHeader
        items.push({
            type: 'sticky-header',
        });
        // 2.
        // iterate groups and add page items
        for (const group of groups) {
            // skip empty group header since it will cause issue in virtuoso ("Zero-sized element")
            if (group.label) {
                items.push({
                    type: 'group-header',
                    data: group,
                });
            }
            // do not render items if the group is collapsed
            if (!groupCollapsedState[group.id]) {
                for (const item of group.items) {
                    items.push({
                        type: 'item',
                        data: item,
                    });
                    // add a spacer between items (4px), unless it's the last item
                    if (item !== group.items[group.items.length - 1]) {
                        items.push({
                            type: 'item-spacer',
                            data: {
                                height: 4,
                            },
                        });
                    }
                }
            }
            // add a spacer between groups (16px)
            items.push({
                type: 'item-spacer',
                data: {
                    height: 16,
                },
            });
        }
        return items;
    }, [groupCollapsedState, groups]);
};
const Scroller = forwardRef(({ children, ...props }, ref) => {
    return (_jsxs(Scrollable.Root, { children: [_jsx(Scrollable.Viewport, { ...props, ref: ref, children: children }), _jsx(Scrollable.Scrollbar, { style: { zIndex: 1 } })] }));
});
Scroller.displayName = 'Scroller';
const ListInner = ({ atTopStateChange, atTopThreshold, ...props }) => {
    const virtuosoItems = useVirtuosoItems();
    const [atTop, setAtTop] = useState(false);
    const handleAtTopStateChange = useCallback((atTop) => {
        setAtTop(atTop);
        atTopStateChange?.(atTop);
    }, [atTopStateChange]);
    const components = useMemo(() => {
        return {
            Header: props.heading ? PageListHeading : undefined,
            Scroller: Scroller,
        };
    }, [props.heading]);
    const itemContentRenderer = useCallback((_index, data) => {
        switch (data.type) {
            case 'sticky-header':
                return props.headerRenderer?.(data.data);
            case 'group-header':
                return _jsx(ItemGroupHeader, { ...data.data });
            case 'item':
                return props.itemRenderer?.(data.data);
            case 'item-spacer':
                return _jsx("div", { style: { height: data.data.height } });
        }
    }, [props]);
    return (_jsx(Virtuoso, { "data-has-scroll-top": !atTop, atTopThreshold: atTopThreshold ?? 0, atTopStateChange: handleAtTopStateChange, components: components, data: virtuosoItems, "data-testid": "virtualized-page-list", "data-total-count": props.items.length, topItemCount: 1, totalCount: virtuosoItems.length, itemContent: itemContentRenderer, className: clsx(props.className, styles.root) }));
};
//# sourceMappingURL=virtualized-list.js.map