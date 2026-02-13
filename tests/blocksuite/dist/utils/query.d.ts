import { type Page } from '@playwright/test';
export declare function getFormatBar(page: Page): {
    formatBar: import("playwright-core").Locator;
    boldBtn: import("playwright-core").Locator;
    italicBtn: import("playwright-core").Locator;
    underlineBtn: import("playwright-core").Locator;
    strikeBtn: import("playwright-core").Locator;
    codeBtn: import("playwright-core").Locator;
    linkBtn: import("playwright-core").Locator;
    highlight: {
        highlightBtn: import("playwright-core").Locator;
        redForegroundBtn: import("playwright-core").Locator;
        defaultColorBtn: import("playwright-core").Locator;
    };
    createLinkedDocBtn: import("playwright-core").Locator;
    openParagraphMenu: () => Promise<void>;
    textBtn: import("playwright-core").Locator;
    h1Btn: import("playwright-core").Locator;
    bulletedBtn: import("playwright-core").Locator;
    codeBlockBtn: import("playwright-core").Locator;
    moreBtn: import("playwright-core").Locator;
    openMoreMenu: () => Promise<void>;
    copyBtn: import("playwright-core").Locator;
    duplicateBtn: import("playwright-core").Locator;
    deleteBtn: import("playwright-core").Locator;
    assertBoundingBox: (x: number, y: number) => Promise<void>;
};
export declare function getEmbedCardToolbar(page: Page): {
    embedCardToolbar: import("playwright-core").Locator;
    copyButton: import("playwright-core").Locator;
    editButton: import("playwright-core").Locator;
    cardStyleButton: import("playwright-core").Locator;
    captionButton: import("playwright-core").Locator;
    moreButton: import("playwright-core").Locator;
    openCardStyleMenu: () => Promise<void>;
    openMoreMenu: () => Promise<void>;
    cardStyleHorizontalButton: import("playwright-core").Locator;
    cardStyleListButton: import("playwright-core").Locator;
};
//# sourceMappingURL=query.d.ts.map