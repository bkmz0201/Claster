import type { IPoint } from '@blocksuite/global/gfx';
import type { Page } from '@playwright/test';
export declare function getDebugMenu(page: Page): {
    debugMenu: import("playwright-core").Locator;
    undoBtn: import("playwright-core").Locator;
    redoBtn: import("playwright-core").Locator;
    blockTypeButton: import("playwright-core").Locator;
    testOperationsButton: import("playwright-core").Locator;
    pagesBtn: import("playwright-core").Locator;
};
export declare function moveView(page: Page, point: [number, number]): Promise<void>;
export declare function click(page: Page, point: IPoint): Promise<void>;
export declare function clickView(page: Page, point: [number, number]): Promise<void>;
export declare function dblclickView(page: Page, point: [number, number]): Promise<void>;
export declare function undoByClick(page: Page): Promise<void>;
export declare function redoByClick(page: Page): Promise<void>;
export declare function clickBlockById(page: Page, id: string): Promise<void>;
export declare function doubleClickBlockById(page: Page, id: string): Promise<void>;
export declare function disconnectByClick(page: Page): Promise<void>;
export declare function connectByClick(page: Page): Promise<void>;
export declare function addNoteByClick(page: Page): Promise<void>;
export declare function addNewPage(page: Page): Promise<import("@blocksuite/store").DocMeta>;
export declare function switchToPage(page: Page, docId?: string): Promise<void>;
export declare function clickTestOperationsMenuItem(page: Page, name: string): Promise<void>;
export declare function switchReadonly(page: Page, value?: boolean): Promise<void>;
export declare function activeEmbed(page: Page): Promise<void>;
export declare function toggleDarkMode(page: Page): Promise<void>;
//# sourceMappingURL=click.d.ts.map