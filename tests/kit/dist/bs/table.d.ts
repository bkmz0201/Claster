import { type Locator, type Page } from '@playwright/test';
export declare function createTable(page: Page): Promise<void>;
export declare function getCellText(page: Page, nth: number, table?: Locator): Promise<string>;
export declare function inputToCell(page: Page, nth: number, text: string, table?: Locator): Promise<void>;
export declare function clickDeleteButtonInTableMenu(page: Page): Promise<void>;
//# sourceMappingURL=table.d.ts.map