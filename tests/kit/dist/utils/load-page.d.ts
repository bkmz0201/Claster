import type { Page } from '@playwright/test';
export declare let coreUrl: string;
export declare function setCoreUrl(url: string): void;
export declare function openHomePage(page: Page): Promise<void>;
export declare function open404Page(page: Page): Promise<void>;
export declare function confirmCreateJournal(page: Page): Promise<void>;
export declare function openJournalsPage(page: Page): Promise<void>;
//# sourceMappingURL=load-page.d.ts.map