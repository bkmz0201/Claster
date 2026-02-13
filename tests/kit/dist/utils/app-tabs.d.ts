import type { Page } from '@playwright/test';
export declare function expectActiveTab(page: Page, index: number, activeViewIndex?: number): Promise<void>;
export declare function expectTabTitle(page: Page, index: number, title: string | string[]): Promise<void>;
export declare function expectTabCount(page: Page, count: number): Promise<void>;
export declare function closeTab(page: Page, index: number): Promise<void>;
//# sourceMappingURL=app-tabs.d.ts.map