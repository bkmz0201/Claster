import type { Locator, Page } from '@playwright/test';
export declare function waitForLogMessage(page: Page, log: string): Promise<boolean>;
export declare function removeWithRetry(filePath: string, maxRetries?: number, delay?: number): Promise<boolean>;
export declare function isContainedInBoundingBox(container: Locator, element: Locator, includeDescendant?: boolean): Promise<boolean>;
//# sourceMappingURL=utils.d.ts.map