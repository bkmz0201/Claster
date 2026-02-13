import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Checkbox, useDraggable } from '@affine/component';
import { WorkbenchLink } from '@affine/core/modules/workbench';
import { stopPropagation } from '@affine/core/utils';
import { useI18n } from '@affine/i18n';
import { forwardRef, useCallback, useMemo } from 'react';
import { selectionStateAtom, useAtom } from '../scoped-atoms';
import { ColWrapper } from '../utils';
import * as styles from './collection-list-item.css';
const ListTitleCell = ({ title, preview, }) => {
    const t = useI18n();
    return (_jsxs("div", { "data-testid": "page-list-item-title", className: styles.titleCell, children: [_jsx("div", { "data-testid": "page-list-item-title-text", className: styles.titleCellMain, children: title || t['Untitled']() }), preview ? (_jsx("div", { "data-testid": "page-list-item-preview-text", className: styles.titleCellPreview, children: preview })) : null] }));
};
const ListIconCell = ({ icon }) => {
    return (_jsx("div", { "data-testid": "page-list-item-icon", className: styles.iconCell, children: icon }));
};
const CollectionSelectionCell = ({ selectable, onSelectedChange, selected, }) => {
    const onSelectionChange = useCallback((_event) => {
        return onSelectedChange?.();
    }, [onSelectedChange]);
    if (!selectable) {
        return null;
    }
    return (_jsx("div", { className: styles.selectionCell, children: _jsx(Checkbox, { onClick: stopPropagation, checked: !!selected, onChange: onSelectionChange }) }));
};
const CollectionListOperationsCell = ({ operations, }) => {
    return operations ? (_jsx("div", { onClick: stopPropagation, className: styles.operationsCell, children: operations })) : null;
};
export const CollectionListItem = (props) => {
    const collectionTitleElement = useMemo(() => {
        return (_jsxs("div", { className: styles.dragPageItemOverlay, children: [_jsxs("div", { className: styles.titleIconsWrapper, children: [_jsx(CollectionSelectionCell, { onSelectedChange: props.onSelectedChange, selectable: props.selectable, selected: props.selected }), _jsx(ListIconCell, { icon: props.icon })] }), _jsx(ListTitleCell, { title: props.title })] }));
    }, [
        props.icon,
        props.onSelectedChange,
        props.selectable,
        props.selected,
        props.title,
    ]);
    const { dragRef, dragging, CustomDragPreview } = useDraggable(() => ({
        data: {
            entity: {
                type: 'collection',
                id: props.collectionId,
            },
            from: {
                at: 'all-collections:list',
            },
        },
        canDrag: props.draggable,
    }), [props.collectionId, props.draggable]);
    return (_jsxs(_Fragment, { children: [_jsxs(CollectionListItemWrapper, { onClick: props.onClick, to: props.to, collectionId: props.collectionId, draggable: props.draggable, isDragging: dragging, ref: dragRef, children: [_jsxs(ColWrapper, { flex: 9, children: [_jsxs(ColWrapper, { className: styles.dndCell, flex: 8, children: [_jsxs("div", { className: styles.titleIconsWrapper, children: [_jsx(CollectionSelectionCell, { onSelectedChange: props.onSelectedChange, selectable: props.selectable, selected: props.selected }), _jsx(ListIconCell, { icon: props.icon })] }), _jsx(ListTitleCell, { title: props.title })] }), _jsx(ColWrapper, { flex: 4, alignment: "end", style: { overflow: 'visible' } })] }), props.operations ? (_jsx(ColWrapper, { className: styles.actionsCellWrapper, flex: 3, alignment: "end", children: _jsx(CollectionListOperationsCell, { operations: props.operations }) })) : null] }), _jsx(CustomDragPreview, { position: "pointer-outside", children: collectionTitleElement })] }));
};
const CollectionListItemWrapper = forwardRef(({ to, isDragging, collectionId, onClick, children, draggable, }, ref) => {
    const [selectionState, setSelectionActive] = useAtom(selectionStateAtom);
    const handleClick = useCallback((e) => {
        if (!selectionState.selectable) {
            return;
        }
        if (e.shiftKey) {
            stopPropagation(e);
            setSelectionActive(true);
            onClick?.();
            return;
        }
        if (selectionState.selectionActive) {
            return onClick?.();
        }
    }, [
        onClick,
        selectionState.selectable,
        selectionState.selectionActive,
        setSelectionActive,
    ]);
    const commonProps = useMemo(() => ({
        role: 'list-item',
        'data-testid': 'collection-list-item',
        'data-collection-id': collectionId,
        'data-draggable': draggable,
        className: styles.root,
        'data-clickable': !!onClick || !!to,
        'data-dragging': isDragging,
        onClick: handleClick,
    }), [collectionId, draggable, isDragging, onClick, to, handleClick]);
    if (to) {
        return (_jsx(WorkbenchLink, { ...commonProps, to: to, ref: ref, children: children }));
    }
    else {
        return (_jsx("div", { ...commonProps, ref: ref, children: children }));
    }
});
CollectionListItemWrapper.displayName = 'CollectionListItemWrapper';
//# sourceMappingURL=collection-list-item.js.map