import type { TableViewSelectionWithType } from './selection';
export interface TableCell {
    rowId: string;
}
export type ColumnAccessor<T extends TableCell> = (cell: T) => {
    valueSetFromString(rowId: string, value: string): void;
} | undefined;
export interface StartEditOptions<T extends TableCell> {
    event: KeyboardEvent;
    selection: TableViewSelectionWithType | undefined;
    getCellContainer: (groupKey: string | undefined, rowIndex: number, columnIndex: number) => T | undefined;
    updateSelection: (sel: TableViewSelectionWithType) => void;
    getColumn: ColumnAccessor<T>;
}
export declare function handleCharStartEdit<T extends TableCell>(options: StartEditOptions<T>): boolean;
//# sourceMappingURL=utils.d.ts.map