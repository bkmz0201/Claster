import type { Page } from '@playwright/test';
/**
 * The key will be 'Meta' on Macs and 'Control' on other platforms
 * @example
 * ```ts
 * await page.keyboard.press(`${SHORT_KEY}+a`);
 * ```
 */
export declare const SHORT_KEY: string;
/**
 * The key will be 'Alt' on Macs and 'Shift' on other platforms
 * @example
 * ```ts
 * await page.keyboard.press(`${SHORT_KEY}+${MODIFIER_KEY}+1`);
 * ```
 */
export declare const MODIFIER_KEY: string;
export declare const SHIFT_KEY = "Shift";
export declare function type(page: Page, content: string, delay?: number): Promise<void>;
export declare function withPressKey(page: Page, key: string, fn: () => Promise<void>): Promise<void>;
export declare function defaultTool(page: Page): Promise<void>;
export declare function pressBackspace(page: Page, count?: number): Promise<void>;
export declare function pressSpace(page: Page): Promise<void>;
export declare function pressArrowLeft(page: Page, count?: number): Promise<void>;
export declare function pressArrowRight(page: Page, count?: number): Promise<void>;
export declare function pressArrowDown(page: Page, count?: number): Promise<void>;
export declare function pressArrowUp(page: Page, count?: number): Promise<void>;
export declare function pressArrowDownWithShiftKey(page: Page, count?: number): Promise<void>;
export declare function pressArrowUpWithShiftKey(page: Page, count?: number): Promise<void>;
export declare function pressEnter(page: Page, count?: number): Promise<void>;
export declare function pressEnterWithShortkey(page: Page): Promise<void>;
export declare function pressEscape(page: Page, count?: number): Promise<void>;
export declare function undoByKeyboard(page: Page): Promise<void>;
export declare function formatType(page: Page): Promise<void>;
export declare function redoByKeyboard(page: Page): Promise<void>;
export declare function selectAllByKeyboard(page: Page): Promise<void>;
export declare function selectAllBlocksByKeyboard(page: Page): Promise<void>;
export declare function pressTab(page: Page, count?: number): Promise<void>;
export declare function pressShiftTab(page: Page): Promise<void>;
export declare function pressBackspaceWithShortKey(page: Page, count?: number): Promise<void>;
export declare function pressShiftEnter(page: Page): Promise<void>;
export declare function inlineCode(page: Page): Promise<void>;
export declare function strikethrough(page: Page): Promise<void>;
export declare function copyByKeyboard(page: Page): Promise<void>;
export declare function cutByKeyboard(page: Page): Promise<void>;
/**
 * Notice: this method will try to click closest editor by default
 */
export declare function pasteByKeyboard(page: Page, forceFocus?: boolean): Promise<void>;
export declare function createCodeBlock(page: Page): Promise<void>;
export declare function getCursorBlockIdAndHeight(page: Page): Promise<[string | null, number | null]>;
/**
 * fill a line by keep triggering key input
 * @param page
 * @param toNext if true, fill until soft wrap
 */
export declare function fillLine(page: Page, toNext?: boolean): Promise<void>;
export declare function pressForwardDelete(page: Page): Promise<void>;
export declare function pressForwardDeleteWord(page: Page): Promise<void>;
//# sourceMappingURL=keyboard.d.ts.map