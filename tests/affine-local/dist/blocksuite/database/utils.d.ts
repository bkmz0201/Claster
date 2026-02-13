import type { Page } from '@playwright/test';
export declare function createNewPage(page: Page): Promise<void>;
export declare const gotoContentFromTitle: (page: Page) => Promise<void>;
export declare function createDatabaseBlock(page: Page): Promise<void>;
export declare function addRows(page: Page, rowCount: number): Promise<void>;
export declare function addDatabaseRow(page: Page): Promise<void>;
export declare function pasteString(page: Page, data: string): Promise<void>;
export declare function selectCell(page: Page, nth: number, editing?: boolean): Promise<import("playwright-core").Locator>;
export declare function verifyCellContents(page: Page, expectedContents: string[]): Promise<void>;
export declare function selectColumnType(page: Page, columnType: string, nth?: number): Promise<void>;
export declare function addColumn(page: Page, type: string, nth?: number): Promise<void>;
export declare function clickAddColumnButton(page: Page): Promise<void>;
export declare function changeColumnType(page: Page, columnIndex: number, columnType: string): Promise<void>;
export declare const initDatabaseByOneStep: (page: Page) => Promise<void>;
//# sourceMappingURL=utils.d.ts.map