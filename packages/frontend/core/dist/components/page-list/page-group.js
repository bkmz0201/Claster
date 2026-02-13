import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { shallowEqual } from '@affine/component';
import { useI18n } from '@affine/i18n';
import { ToggleRightIcon, ViewLayersIcon } from '@blocksuite/icons/rc';
import { selectAtom } from 'jotai/utils';
import { memo, useCallback, useMemo } from 'react';
import { CollectionListItem } from './collections/collection-list-item';
import * as styles from './page-group.css';
import { groupCollapseStateAtom, listPropsAtom, selectionStateAtom, useAtom, useAtomValue, } from './scoped-atoms';
import { TagListItem } from './tags/tag-list-item';
export const ItemGroupHeader = memo(function ItemGroupHeader({ id, items, label }) {
    const [collapseState, setCollapseState] = useAtom(groupCollapseStateAtom);
    const collapsed = collapseState[id];
    const onExpandedClicked = useCallback(e => {
        e.stopPropagation();
        e.preventDefault();
        setCollapseState(v => ({ ...v, [id]: !v[id] }));
    }, [id, setCollapseState]);
    const [selectionState, setSelectionActive] = useAtom(selectionStateAtom);
    const selectedItems = useMemo(() => {
        const selectedIds = selectionState.selectedIds ?? [];
        return items.filter(item => selectedIds.includes(item.id));
    }, [items, selectionState.selectedIds]);
    const allSelected = selectedItems.length === items.length;
    const onSelectAll = useCallback(() => {
        // also enable selection active
        setSelectionActive(true);
        const nonCurrentGroupIds = selectionState.selectedIds?.filter(id => !items.map(item => item.id).includes(id)) ?? [];
        const newSelectedPageIds = allSelected
            ? nonCurrentGroupIds
            : [...nonCurrentGroupIds, ...items.map(item => item.id)];
        selectionState.onSelectedIdsChange?.(newSelectedPageIds);
    }, [setSelectionActive, selectionState, allSelected, items]);
    const t = useI18n();
    return label ? (_jsxs("div", { "data-testid": "page-list-group-header", className: styles.header, "data-group-id": id, "data-group-items-count": items.length, "data-group-selected-items-count": selectedItems.length, children: [_jsx("div", { role: "button", onClick: onExpandedClicked, "data-testid": "page-list-group-header-collapsed-button", className: styles.collapsedIconContainer, children: _jsx(ToggleRightIcon, { className: styles.collapsedIcon, "data-collapsed": !!collapsed }) }), _jsx("div", { className: styles.headerLabel, children: label }), selectionState.selectionActive ? (_jsxs("div", { className: styles.headerCount, children: [selectedItems.length, "/", items.length] })) : null, _jsx("div", { className: styles.spacer }), _jsx("button", { className: styles.selectAllButton, onClick: onSelectAll, children: t[allSelected
                    ? 'com.affine.page.group-header.clear'
                    : 'com.affine.page.group-header.select-all']() })] })) : null;
});
// TODO(@Peng): optimize how to render page meta list item
const requiredPropNames = [
    'docCollection',
    'rowAsLink',
    'operationsRenderer',
    'selectedIds',
    'onSelectedIdsChange',
    'draggable',
];
const listsPropsAtom = selectAtom(listPropsAtom, props => {
    return Object.fromEntries(requiredPropNames.map(name => [name, props?.[name]]));
}, shallowEqual);
export const CollectionListItemRenderer = memo((item) => {
    const props = useAtomValue(listsPropsAtom);
    const { selectionActive } = useAtomValue(selectionStateAtom);
    const collection = item;
    return (_jsx(CollectionListItem, { ...collectionMetaToListItemProp(collection, {
            ...props,
            selectable: !!selectionActive,
        }) }));
});
CollectionListItemRenderer.displayName = 'CollectionListItemRenderer';
export const TagListItemRenderer = memo(function TagListItemRenderer(item) {
    const props = useAtomValue(listsPropsAtom);
    const { selectionActive } = useAtomValue(selectionStateAtom);
    const tag = item;
    return (_jsx(TagListItem, { ...tagMetaToListItemProp(tag, {
            ...props,
            selectable: !!selectionActive,
        }) }));
});
function collectionMetaToListItemProp(item, props) {
    const toggleSelection = props.onSelectedIdsChange
        ? () => {
            if (!props.selectedIds) {
                throw new Error('selectedIds is not found');
            }
            const prevSelected = props.selectedIds.includes(item.id);
            const shouldAdd = !prevSelected;
            const shouldRemove = prevSelected;
            if (shouldAdd) {
                props.onSelectedIdsChange?.([...props.selectedIds, item.id]);
            }
            else if (shouldRemove) {
                props.onSelectedIdsChange?.(props.selectedIds.filter(id => id !== item.id));
            }
        }
        : undefined;
    const itemProps = {
        collectionId: item.id,
        title: item.title,
        to: props.rowAsLink && !props.selectable
            ? `/collection/${item.id}`
            : undefined,
        onClick: toggleSelection,
        icon: _jsx(ViewLayersIcon, {}),
        operations: props.operationsRenderer?.(item),
        selectable: props.selectable,
        selected: props.selectedIds?.includes(item.id),
        onSelectedChange: toggleSelection,
        draggable: props.draggable,
    };
    return itemProps;
}
function tagMetaToListItemProp(item, props) {
    const toggleSelection = props.onSelectedIdsChange
        ? () => {
            if (!props.selectedIds) {
                throw new Error('selectedIds is not found');
            }
            const prevSelected = props.selectedIds.includes(item.id);
            const shouldAdd = !prevSelected;
            const shouldRemove = prevSelected;
            if (shouldAdd) {
                props.onSelectedIdsChange?.([...props.selectedIds, item.id]);
            }
            else if (shouldRemove) {
                props.onSelectedIdsChange?.(props.selectedIds.filter(id => id !== item.id));
            }
        }
        : undefined;
    const itemProps = {
        tagId: item.id,
        title: item.name,
        to: props.rowAsLink && !props.selectable ? `/tag/${item.id}` : undefined,
        onClick: toggleSelection,
        color: item.color,
        operations: props.operationsRenderer?.(item),
        selectable: props.selectable,
        selected: props.selectedIds?.includes(item.id),
        onSelectedChange: toggleSelection,
        draggable: props.draggable,
    };
    return itemProps;
}
//# sourceMappingURL=page-group.js.map