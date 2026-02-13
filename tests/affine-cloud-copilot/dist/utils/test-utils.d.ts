import type { Store } from '@blocksuite/affine/store';
import type { Page } from '@playwright/test';
declare global {
    interface Window {
        doc: Store;
    }
}
export declare class TestUtils {
    private static instance;
    private isProduction;
    private constructor();
    static getInstance(): TestUtils;
    getUser(): Promise<{
        name: string;
        email: string;
        password: string;
        id: string;
    }> | {
        email: string;
        password: string;
    };
    createNewPage(page: Page): Promise<void>;
    setupTestEnvironment(page: Page, defaultModel?: string): Promise<void>;
    createTestWorkspace(page: Page, name?: string): Promise<void>;
}
//# sourceMappingURL=test-utils.d.ts.map