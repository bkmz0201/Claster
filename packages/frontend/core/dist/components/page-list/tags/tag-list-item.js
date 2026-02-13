import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Checkbox, useDraggable } from '@affine/component';
import { WorkbenchLink } from '@affine/core/modules/workbench';
import { stopPropagation } from '@affine/core/utils';
import { useI18n } from '@affine/i18n';
import { forwardRef, useCallback, useMemo } from 'react';
import { selectionStateAtom, useAtom } from '../scoped-atoms';
import { ColWrapper } from '../utils';
import * as styles from './tag-list-item.css';
const TagListTitleCell = ({ title }) => {
    const t = useI18n();
    return (_jsx("div", { "data-testid": "tag-list-item-title", className: styles.titleCell, children: _jsx("div", { "data-testid": "tag-list-item-title-text", className: styles.titleCellMain, children: title || t['Untitled']() }) }));
};
const ListIconCell = ({ color }) => {
    return (_jsx("div", { className: styles.tagIndicatorWrapper, children: _jsx("div", { className: styles.tagIndicator, style: {
                backgroundColor: color,
            } }) }));
};
const TagSelectionCell = ({ selectable, onSelectedChange, selected, }) => {
    const onSelectionChange = useCallback((_event) => {
        return onSelectedChange?.();
    }, [onSelectedChange]);
    if (!selectable) {
        return null;
    }
    return (_jsx("div", { className: styles.selectionCell, children: _jsx(Checkbox, { onClick: stopPropagation, checked: !!selected, onChange: onSelectionChange }) }));
};
const TagListOperationsCell = ({ operations, }) => {
    return operations ? (_jsx("div", { onClick: stopPropagation, className: styles.operationsCell, children: operations })) : null;
};
export const TagListItem = (props) => {
    const { dragRef, CustomDragPreview, dragging } = useDraggable(() => ({
        canDrag: props.draggable,
        data: {
            entity: {
                type: 'tag',
                id: props.tagId,
            },
            from: {
                at: 'all-tags:list',
            },
        },
    }), [props.draggable, props.tagId]);
    return (_jsxs(_Fragment, { children: [_jsxs(TagListItemWrapper, { onClick: props.onClick, to: props.to, tagId: props.tagId, draggable: props.draggable, isDragging: dragging, ref: dragRef, children: [_jsxs(ColWrapper, { flex: 9, children: [_jsxs(ColWrapper, { className: styles.dndCell, flex: 8, children: [_jsxs("div", { className: styles.titleIconsWrapper, children: [_jsx(TagSelectionCell, { onSelectedChange: props.onSelectedChange, selectable: props.selectable, selected: props.selected }), _jsx(ListIconCell, { color: props.color })] }), _jsx(TagListTitleCell, { title: props.title })] }), _jsx(ColWrapper, { flex: 4, alignment: "end", style: { overflow: 'visible' } })] }), props.operations ? (_jsx(ColWrapper, { className: styles.actionsCellWrapper, flex: 2, alignment: "end", children: _jsx(TagListOperationsCell, { operations: props.operations }) })) : null] }), _jsx(CustomDragPreview, { position: "pointer-outside", children: _jsxs("div", { className: styles.dragPageItemOverlay, children: [_jsxs("div", { className: styles.titleIconsWrapper, children: [_jsx(TagSelectionCell, { onSelectedChange: props.onSelectedChange, selectable: props.selectable, selected: props.selected }), _jsx(ListIconCell, { color: props.color })] }), _jsx(TagListTitleCell, { title: props.title })] }) })] }));
};
const TagListItemWrapper = forwardRef(({ to, isDragging, tagId, onClick, children, draggable, }, ref) => {
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
        'data-testid': 'tag-list-item',
        'data-tag-id': tagId,
        'data-draggable': draggable,
        className: styles.root,
        'data-clickable': !!onClick || !!to,
        'data-dragging': isDragging,
        onClick: handleClick,
    }), [tagId, draggable, isDragging, onClick, to, handleClick]);
    if (to) {
        return (_jsx(WorkbenchLink, { ...commonProps, to: to, ref: ref, children: children }));
    }
    else {
        return (_jsx("div", { ...commonProps, ref: ref, children: children }));
    }
});
TagListItemWrapper.displayName = 'TagListItemWrapper';
//# sourceMappingURL=tag-list-item.js.map