import { type Page } from '@playwright/test';
export declare const withCtrlOrMeta: (page: Page, fn: () => Promise<void>) => Promise<void>;
export declare function pressEnter(page: Page, count?: number): Promise<void>;
export declare function pressArrowUp(page: Page, count?: number): Promise<void>;
export declare function pressArrowDown(page: Page, count?: number): Promise<void>;
export declare function pressTab(page: Page): Promise<void>;
export declare function pressShiftTab(page: Page): Promise<void>;
export declare function pressShiftEnter(page: Page): Promise<void>;
export declare function pressBackspace(page: Page, count?: number): Promise<void>;
export declare function pressEscape(page: Page, count?: number): Promise<void>;
export declare function copyByKeyboard(page: Page): Promise<void>;
export declare function cutByKeyboard(page: Page): Promise<void>;
export declare function pasteByKeyboard(page: Page): Promise<void>;
export declare function selectAllByKeyboard(page: Page): Promise<void>;
export declare function undoByKeyboard(page: Page): Promise<void>;
export declare function writeTextToClipboard(page: Page, text: string, paste?: boolean): Promise<void>;
//# sourceMappingURL=keyboard.d.ts.map