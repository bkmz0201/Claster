import { type Locator, type Page } from '@playwright/test';
export declare function press(page: Page, content: string): Promise<void>;
export declare function initDatabaseColumn(page: Page, title?: string): Promise<void>;
export declare const renameColumn: (page: Page, name: string) => Promise<void>;
export declare function performColumnAction(page: Page, name: string, action: string): Promise<void>;
export declare function switchColumnType(page: Page, columnType: string, columnIndex?: number): Promise<void>;
export declare function clickColumnType(page: Page, columnType: string): Promise<void>;
export declare function getDatabaseBodyRows(page: Page): Locator;
export declare function getDatabaseBodyRow(page: Page, rowIndex?: number): Locator;
export declare function assertDatabaseTitleColumnText(page: Page, title: string, rowIndex?: number, columnIndex?: number): Promise<void>;
export declare function getDatabaseCell(page: Page, { rowIndex, columnType, columnIndex, }: {
    rowIndex?: number;
    columnType?: string;
    columnIndex?: number;
}): Locator;
export declare const getDatabaseColumnCells: (page: Page, columnIndex: number) => Locator;
export declare function clickSelectOption(page: Page, index?: number): Promise<void>;
export declare function performSelectColumnTagAction(page: Page, name: string, index?: number): Promise<void>;
export declare function assertSelectedStyle(page: Page, key: keyof CSSStyleDeclaration, value: string): Promise<void>;
export declare function clickDatabaseOutside(page: Page): Promise<void>;
export declare function assertColumnWidth(locator: Locator, width: number): Promise<{
    x: number;
    y: number;
    width: number;
    height: number;
}>;
export declare function assertDatabaseCellRichTexts(page: Page, { rowIndex, columnIndex, text, }: {
    rowIndex?: number;
    columnIndex?: number;
    text: string;
}): Promise<void>;
export declare function assertDatabaseCellNumber(page: Page, { rowIndex, columnIndex, text, }: {
    rowIndex?: number;
    columnIndex?: number;
    text: string;
}): Promise<void>;
export declare function assertDatabaseCellLink(page: Page, { rowIndex, columnIndex, text, }: {
    rowIndex?: number;
    columnIndex?: number;
    text: string;
}): Promise<void>;
export declare function assertDatabaseTitleText(page: Page, text: string): Promise<void>;
export declare function waitSearchTransitionEnd(page: Page): Promise<void>;
export declare function assertDatabaseSearching(page: Page, isSearching: boolean): Promise<void>;
export declare function focusDatabaseSearch(page: Page): Promise<void>;
export declare function blurDatabaseSearch(page: Page): Promise<void>;
export declare function focusDatabaseHeader(page: Page, columnIndex?: number): Promise<Locator>;
export declare function getDatabaseMouse(page: Page): Promise<{
    mouseOver: () => Promise<void>;
    mouseLeave: () => Promise<void>;
}>;
export declare function getDatabaseHeaderColumn(page: Page, index?: number): Promise<{
    column: Locator;
    box: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    text: string;
    textElement: Locator;
    typeIcon: Locator;
}>;
export declare function assertRowsSelection(page: Page, rowIndexes: [start: number, end: number]): Promise<void>;
export declare function assertCellsSelection(page: Page, cellIndexes: {
    start: [rowIndex: number, columnIndex: number];
    end?: [rowIndex: number, columnIndex: number];
}): Promise<void>;
export declare function getElementStyle(page: Page, selector: string, key: keyof CSSStyleDeclaration): Promise<any>;
export declare function focusKanbanCardHeader(page: Page, index?: number): Promise<void>;
export declare function clickKanbanCardHeader(page: Page, index?: number): Promise<void>;
export declare function assertKanbanCardHeaderText(page: Page, text: string, index?: number): Promise<void>;
export declare function assertKanbanCellSelected(page: Page, { groupIndex, cardIndex, cellIndex, }: {
    groupIndex: number;
    cardIndex: number;
    cellIndex: number;
}): Promise<void>;
export declare function assertKanbanCardSelected(page: Page, { groupIndex, cardIndex, }: {
    groupIndex: number;
    cardIndex: number;
}): Promise<void>;
export declare function getKanbanCard(page: Page, { groupIndex, cardIndex, }: {
    groupIndex: number;
    cardIndex: number;
}): Locator;
export declare const moveToCenterOf: (page: Page, locator: Locator) => Promise<void>;
export declare const changeColumnType: (page: Page, column: number, name: string) => Promise<void>;
export declare const pressKey: (page: Page, key: string, count?: number) => Promise<void>;
//# sourceMappingURL=actions.d.ts.map