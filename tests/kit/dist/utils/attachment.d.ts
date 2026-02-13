import type { Page } from '@playwright/test';
export declare function importFile(page: Page, file: string, fn?: (page: Page) => Promise<void>): Promise<void>;
export declare function importAttachment(page: Page, file: string): Promise<void>;
//# sourceMappingURL=attachment.d.ts.map