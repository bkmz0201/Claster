import { type Locator, type Page } from '@playwright/test';
export declare function expandCollapsibleSection(page: Page, name: string): Promise<Locator>;
/**
 * Click header "<" button
 */
export declare function pageBack(page: Page): Promise<void>;
export declare function getAttrOfActiveElement(page: Page, attrName?: string): Promise<string | null>;
/**
 * Open the context menu of an navigation panel node
 * @returns Menu Locator
 */
export declare function openNavigationPanelNodeMenu(page: Page, node: Locator): Promise<Locator>;
export declare function openTab(page: Page, name: 'home' | 'all' | 'Journal' | 'New Page'): Promise<void>;
//# sourceMappingURL=utils.d.ts.map