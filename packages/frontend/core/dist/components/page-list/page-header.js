import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox } from '@affine/component';
import { useCatchEventCallback } from '@affine/core/components/hooks/use-catch-event-hook';
import { useI18n } from '@affine/i18n';
import { MultiSelectIcon } from '@blocksuite/icons/rc';
import clsx from 'clsx';
import { selectAtom } from 'jotai/utils';
import { memo, useCallback } from 'react';
import { ListHeaderCell } from './components/list-header-cell';
import * as styles from './page-header.css';
import { itemsAtom, listHandlersAtom, listPropsAtom, selectionStateAtom, sorterAtom, useAtom, useAtomValue, } from './scoped-atoms';
// the checkbox on the header has three states:
// when list selectable = true, the checkbox will be presented
// when internal selection state is not enabled, it is a clickable <ListIcon /> that enables the selection state
// when internal selection state is enabled, it is a checkbox that reflects the selection state
const ListHeaderCheckbox = () => {
    const [selectionState, setSelectionState] = useAtom(selectionStateAtom);
    const items = useAtomValue(itemsAtom);
    const onActivateSelection = useCatchEventCallback(() => {
        setSelectionState(true);
    }, [setSelectionState]);
    const handlers = useAtomValue(listHandlersAtom);
    const onChange = useCatchEventCallback((_e, checked) => {
        handlers.onSelectedIdsChange?.(checked ? (items ?? []).map(i => i.id) : []);
    }, [handlers, items]);
    if (!selectionState.selectable) {
        return null;
    }
    return (_jsx("div", { "data-testid": "page-list-header-selection-checkbox", className: styles.headerTitleSelectionIconWrapper, onClick: onActivateSelection, children: !selectionState.selectionActive ? (_jsx(MultiSelectIcon, {})) : (_jsx(Checkbox, { checked: selectionState.selectedIds?.length === items?.length, indeterminate: selectionState.selectedIds &&
                selectionState.selectedIds.length > 0 &&
                selectionState.selectedIds.length < (items?.length ?? 0), onChange: onChange })) }));
};
export const ListHeaderTitleCell = () => {
    const t = useI18n();
    return (_jsxs("div", { className: styles.headerTitleCell, children: [_jsx(ListHeaderCheckbox, {}), t['Title']()] }));
};
const hideHeaderAtom = selectAtom(listPropsAtom, props => props?.hideHeader);
// the table header for page list
export const ListTableHeader = memo(function ListTableHeader({ headerCols, }) {
    const [sorter, setSorter] = useAtom(sorterAtom);
    const hideHeader = useAtomValue(hideHeaderAtom);
    const selectionState = useAtomValue(selectionStateAtom);
    const onSort = useCallback((sortable, sortKey) => {
        if (sortable && sortKey) {
            setSorter({
                newSortKey: sortKey,
            });
        }
    }, [setSorter]);
    if (hideHeader) {
        return false;
    }
    return (_jsx("div", { className: clsx(styles.tableHeader), "data-selectable": selectionState.selectable, "data-selection-active": selectionState.selectionActive, children: headerCols.map(col => {
            const isTagHidden = col.key === 'tags' && col.hidden;
            return (_jsx(ListHeaderCell, { flex: col.flex, alignment: col.alignment, sortKey: col.key, sortable: col.sortable, sorting: sorter.key === col.key, order: sorter.order, hidden: isTagHidden ? false : col.hidden, onSort: onSort, style: {
                    overflow: 'visible',
                    visibility: isTagHidden ? 'hidden' : 'visible',
                }, hideInSmallContainer: col.hideInSmallContainer, children: col.content }, col.key));
        }) }));
});
//# sourceMappingURL=page-header.js.map