import type { Page } from '@playwright/test';
/**
 * @example
 * ```ts
 * const codeBlockController = getCodeBlock(page);
 * const codeBlock = codeBlockController.codeBlock;
 * ```
 */
export declare function getCodeBlock(page: Page): {
    codeBlock: import("playwright-core").Locator;
    codeToolbar: import("playwright-core").Locator;
    captionButton: import("playwright-core").Locator;
    languageButton: import("playwright-core").Locator;
    langList: import("playwright-core").Locator;
    copyButton: import("playwright-core").Locator;
    moreButton: import("playwright-core").Locator;
    langFilterInput: import("playwright-core").Locator;
    moreMenu: import("playwright-core").Locator;
    openMore: () => Promise<{
        menu: import("playwright-core").Locator;
        wrapButton: import("playwright-core").Locator;
        cancelWrapButton: import("playwright-core").Locator;
        duplicateButton: import("playwright-core").Locator;
        deleteButton: import("playwright-core").Locator;
        lineNumberButton: import("playwright-core").Locator;
        cancelLineNumberButton: import("playwright-core").Locator;
    }>;
    clickLanguageButton: () => Promise<void>;
};
//# sourceMappingURL=utils.d.ts.map