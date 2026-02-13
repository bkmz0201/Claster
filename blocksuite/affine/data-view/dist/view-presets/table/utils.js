import { TableViewRowSelection } from './selection';
export function handleCharStartEdit(options) {
    const { event, selection, getCellContainer, updateSelection, getColumn } = options;
    const target = event.target;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return false;
    }
    if (selection &&
        !TableViewRowSelection.is(selection) &&
        !selection.isEditing &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        event.key.length === 1) {
        const cell = getCellContainer(selection.groupKey, selection.focus.rowIndex, selection.focus.columnIndex);
        if (cell) {
            const column = getColumn(cell);
            column?.valueSetFromString(cell.rowId, event.key);
            updateSelection({ ...selection, isEditing: true });
            event.preventDefault();
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=utils.js.map