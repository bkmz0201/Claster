import type { Locator, Page } from '@playwright/test';
export declare function getAllPage(page: Page): {
    clickNewPageButton: () => Promise<void>;
    clickNewEdgelessDropdown: () => Promise<void>;
};
export declare function waitForEditorLoad(page: Page): Promise<void>;
export declare function waitForAllPagesLoad(page: Page): Promise<void>;
export declare function clickNewPageButton(page: Page, title?: string): Promise<void>;
export declare function waitForEmptyEditor(page: Page): Promise<void>;
export declare function getBlockSuiteEditorTitle(page: Page): Locator;
export declare function type(page: Page, content: string, delay?: number): Promise<void>;
export declare const createLinkedPage: (page: Page, pageName?: string) => Promise<void>;
export declare const createSyncedPageInEdgeless: (page: Page, pageName?: string) => Promise<void>;
export declare const createTodayPage: (page: Page) => Promise<void>;
export declare function clickPageMoreActions(page: Page): Promise<void>;
export declare const getPageOperationButton: (page: Page, id: string) => Locator;
export declare const getPageItem: (page: Page, id: string) => Locator;
export declare const getPageByTitle: (page: Page, title: string) => Locator;
export type DragLocation = 'top-left' | 'top' | 'bottom' | 'center' | 'left' | 'right';
export declare const toPosition: (rect: {
    x: number;
    y: number;
    width: number;
    height: number;
}, location: DragLocation) => {
    x: number;
    y: number;
};
export declare const dragTo: (page: Page, locator: Locator, target: Locator, location?: DragLocation, willMoveOnDrag?: boolean) => Promise<void>;
export declare const focusInlineEditor: (page: Page) => Promise<void>;
export declare const addDatabase: (page: Page, title?: string) => Promise<void>;
export declare const addCodeBlock: (page: Page) => Promise<void>;
export declare const addDatabaseRow: (page: Page, nth?: number) => Promise<void>;
export declare const switchEdgelessTheme: (page: Page, type: "system" | "light" | "dark") => Promise<void>;
//# sourceMappingURL=page-logic.d.ts.map