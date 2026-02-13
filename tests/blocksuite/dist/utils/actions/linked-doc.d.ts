import { type Page } from '@playwright/test';
export declare function getLinkedDocPopover(page: Page): {
    REFERENCE_NODE: " ";
    linkedDocPopover: import("playwright-core").Locator;
    refNode: import("playwright-core").Locator;
    pageBtn: import("playwright-core").Locator;
    findRefNode: (title: string) => Promise<import("playwright-core").Locator>;
    assertExistRefText: (text: string) => Promise<void>;
    createLinkedDoc: (pageName?: string) => Promise<import("playwright-core").Locator>;
    /**
     * @deprecated
     */
    createSubpage: (pageName?: string) => Promise<import("playwright-core").Locator>;
    assertActivePageIdx: (idx: number) => Promise<void>;
};
//# sourceMappingURL=linked-doc.d.ts.map