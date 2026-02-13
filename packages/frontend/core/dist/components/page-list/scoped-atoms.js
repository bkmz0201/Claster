import { shallowEqual } from '@affine/component';
import { DEFAULT_SORT_KEY } from '@affine/env/constant';
import { atom } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { createIsolation } from 'jotai-scope';
import { itemsToItemGroups } from './items-to-item-group';
// for ease of use in the component tree
// note: must use selectAtom to access this atom for efficiency
export const listPropsAtom = atom();
// whether or not the table is in selection mode (showing selection checkbox & selection floating bar)
const selectionActiveAtom = atom(false);
export const anchorIndexAtom = atom(undefined);
export const rangeIdsAtom = atom([]);
export const selectionStateAtom = atom(get => {
    const baseAtom = selectAtom(listPropsAtom, props => {
        const { selectable, selectedIds, onSelectedIdsChange } = props ?? {};
        return {
            selectable,
            selectedIds,
            onSelectedIdsChange,
        };
    }, shallowEqual);
    const baseState = get(baseAtom);
    const selectionActive = baseState.selectable === 'toggle'
        ? get(selectionActiveAtom)
        : baseState.selectable;
    return {
        ...baseState,
        selectionActive,
    };
}, (_get, set, active) => {
    set(selectionActiveAtom, active);
});
// id -> isCollapsed
// maybe reset on page on unmount?
export const groupCollapseStateAtom = atom({});
// get handlers from pageListPropsAtom
export const listHandlersAtom = selectAtom(listPropsAtom, props => {
    const { onSelectedIdsChange } = props ?? {};
    return {
        onSelectedIdsChange,
    };
}, shallowEqual);
export const itemsAtom = selectAtom(listPropsAtom, props => props?.items, shallowEqual);
export const showOperationsAtom = selectAtom(listPropsAtom, props => !!props?.operationsRenderer);
const defaultSortingFn = (ctx, a, b) => {
    const val = (obj) => {
        let v = obj[ctx.key];
        if (v === undefined && ctx.fallbackKey) {
            v = obj[ctx.fallbackKey];
        }
        return v;
    };
    const valA = val(a);
    const valB = val(b);
    const revert = ctx.order === 'desc';
    const revertSymbol = revert ? -1 : 1;
    if (typeof valA === 'string' && typeof valB === 'string') {
        return valA.localeCompare(valB) * revertSymbol;
    }
    if (typeof valA === 'number' && typeof valB === 'number') {
        return (valA - valB) * revertSymbol;
    }
    if (valA instanceof Date && valB instanceof Date) {
        return (valA.getTime() - valB.getTime()) * revertSymbol;
    }
    if (!valA) {
        return -1 * revertSymbol;
    }
    if (!valB) {
        return 1 * revertSymbol;
    }
    if (Array.isArray(valA) && Array.isArray(valB)) {
        return (valA.length - valB.length) * revertSymbol;
    }
    console.warn('Unsupported sorting type! Please use custom sorting function.', valA, valB);
    return 0;
};
const validKeys = new Set(['id', 'title', 'name', 'createDate', 'updatedDate']);
const sorterStateAtom = atom({
    key: DEFAULT_SORT_KEY,
    order: 'desc',
    sortingFn: defaultSortingFn,
});
export const sorterAtom = atom(get => {
    let items = get(itemsAtom);
    const sorterState = get(sorterStateAtom);
    const sortCtx = sorterState.key
        ? {
            key: sorterState.key,
            order: sorterState.order,
        }
        : null;
    if (sortCtx) {
        if (sorterState.key === 'updatedDate') {
            sortCtx.fallbackKey = 'createDate';
        }
        const compareFn = (a, b) => sorterState.sortingFn(sortCtx, a, b);
        items = items ? [...items].sort(compareFn) : [];
    }
    return {
        items,
        ...sortCtx,
    };
}, (_get, set, { newSortKey }) => {
    set(sorterStateAtom, sorterState => {
        if (validKeys.has(newSortKey)) {
            return {
                ...sorterState,
                key: newSortKey,
                order: sorterState.order === 'asc' ? 'desc' : 'asc',
                sortingFn: sorterState.sortingFn,
            };
        }
        return sorterState;
    });
});
export const groupsAtom = atom(get => {
    const groupBy = get(selectAtom(listPropsAtom, props => props?.groupBy));
    const sorter = get(sorterAtom);
    return itemsToItemGroups(sorter.items ?? [], groupBy);
});
const { Provider, useAtom, useAtomValue, useSetAtom } = createIsolation();
export const ListProvider = Provider;
export { useAtom, useAtomValue, useSetAtom };
//# sourceMappingURL=scoped-atoms.js.map