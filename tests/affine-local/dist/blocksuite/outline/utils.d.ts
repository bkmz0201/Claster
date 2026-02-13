import type { Locator, Page } from '@playwright/test';
export declare function createTitle(page: Page): Promise<Locator>;
export declare function createHeadings(page: Page, gap?: number): Promise<Locator[]>;
export declare function getVerticalCenterFromLocator(locator: Locator): Promise<number>;
//# sourceMappingURL=utils.d.ts.map