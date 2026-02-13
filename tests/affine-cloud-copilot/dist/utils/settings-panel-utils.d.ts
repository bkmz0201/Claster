import { type Page } from '@playwright/test';
export declare class SettingsPanelUtils {
    static openSettingsPanel(page: Page): Promise<void>;
    static closeSettingsPanel(page: Page): Promise<void>;
    static isWorkspaceEmbeddingEnabled(page: Page): Promise<boolean>;
    static waitForWorkspaceEmbeddingSwitchToBe(page: Page, enabled: boolean): Promise<void>;
    static toggleWorkspaceEmbedding(page: Page): Promise<void>;
    static enableWorkspaceEmbedding(page: Page, waitForEnabled?: boolean): Promise<void>;
    static disableWorkspaceEmbedding(page: Page, waitForDisabled?: boolean): Promise<void>;
    static uploadWorkspaceEmbedding(page: Page, attachments: {
        name: string;
        mimeType: string;
        buffer: Buffer;
    }[]): Promise<void>;
    static removeAllAttachments(page: Page): Promise<void>;
    static clickRemoveAttachment(page: Page, attachment: string, shouldConfirm?: boolean): Promise<void>;
    static removeAttachment(page: Page, attachment: string, shouldConfirm?: boolean): Promise<void>;
    static ignoreDocForEmbedding(page: Page, doc: string, shouldWaitForRefresh?: boolean): Promise<void>;
    static clearAllIgnoredDocs(page: Page): Promise<void>;
    private static waitForEmbeddingStatus;
    static waitForEmbeddingComplete(page: Page, timeout?: number): Promise<void>;
    static waitForFileEmbeddingReadiness(page: Page, expectedFileCount: number, timeout?: number): Promise<void>;
}
//# sourceMappingURL=settings-panel-utils.d.ts.map