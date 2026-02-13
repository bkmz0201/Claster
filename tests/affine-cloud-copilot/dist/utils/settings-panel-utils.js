import { cleanupWorkspace } from '@affine-test/kit/utils/cloud';
import { expect } from '@playwright/test';
const WORKSPACE_EMBEDDING_SWITCH_TEST_ID = 'workspace-embedding-setting-switch';
export class SettingsPanelUtils {
    static async openSettingsPanel(page) {
        if (await page.getByTestId('workspace-setting:embedding').isHidden()) {
            await page.getByTestId('slider-bar-workspace-setting-button').click();
            await page.getByTestId('workspace-setting:embedding').click();
            await page.getByTestId('workspace-embedding-setting-header').waitFor({
                state: 'visible',
            });
        }
    }
    static async closeSettingsPanel(page) {
        if (await page.getByTestId('workspace-embedding-setting-wrapper').isVisible()) {
            await page.getByTestId('modal-close-button').click();
            await page.getByTestId('workspace-embedding-setting-wrapper').waitFor({
                state: 'hidden',
            });
        }
    }
    static async isWorkspaceEmbeddingEnabled(page) {
        const input = await page
            .getByTestId(WORKSPACE_EMBEDDING_SWITCH_TEST_ID)
            .locator('input');
        return (await input.getAttribute('value')) === 'on';
    }
    static async waitForWorkspaceEmbeddingSwitchToBe(page, enabled) {
        const input = await page
            .getByTestId(WORKSPACE_EMBEDDING_SWITCH_TEST_ID)
            .locator('input');
        await expect(input).toHaveAttribute('value', enabled ? 'on' : 'off');
    }
    static async toggleWorkspaceEmbedding(page) {
        const input = await page.getByTestId(WORKSPACE_EMBEDDING_SWITCH_TEST_ID);
        await input.click();
    }
    static async enableWorkspaceEmbedding(page, waitForEnabled = true) {
        const enabled = await this.isWorkspaceEmbeddingEnabled(page);
        if (!enabled) {
            await this.toggleWorkspaceEmbedding(page);
        }
        if (waitForEnabled) {
            await this.waitForWorkspaceEmbeddingSwitchToBe(page, true);
        }
    }
    static async disableWorkspaceEmbedding(page, waitForDisabled = true) {
        const enabled = await this.isWorkspaceEmbeddingEnabled(page);
        if (enabled) {
            await this.toggleWorkspaceEmbedding(page);
        }
        if (waitForDisabled) {
            await this.waitForWorkspaceEmbeddingSwitchToBe(page, false);
        }
    }
    static async uploadWorkspaceEmbedding(page, attachments) {
        await page.evaluate(() => {
            delete window.showOpenFilePicker;
        });
        for (const attachment of attachments) {
            const fileChooserPromise = page.waitForEvent('filechooser');
            await page
                .getByTestId('workspace-embedding-setting-upload-button')
                .click();
            const fileChooser = await fileChooserPromise;
            await fileChooser.setFiles(attachment);
            await page
                .getByTestId('workspace-embedding-setting-attachment-uploading-item')
                .waitFor({ state: 'hidden' });
        }
    }
    static async removeAllAttachments(page) {
        const itemId = 'workspace-embedding-setting-attachment-item';
        let count = await page.getByTestId(itemId).count();
        while (count > 0) {
            const attachmentItem = await page.getByTestId(itemId).first();
            const hasErrorItem = await attachmentItem
                .getByTestId('workspace-embedding-setting-attachment-error-item')
                .isVisible();
            await attachmentItem
                .getByTestId('workspace-embedding-setting-attachment-delete-button')
                .click();
            if (!hasErrorItem) {
                await page.getByTestId('confirm-modal-confirm').click();
            }
            await page.waitForTimeout(1000);
            count = await page.getByTestId(itemId).count();
        }
    }
    static async clickRemoveAttachment(page, attachment, shouldConfirm = true) {
        const attachmentItem = await page
            .getByTestId('workspace-embedding-setting-attachment-item')
            .filter({ hasText: attachment });
        await attachmentItem
            .getByTestId('workspace-embedding-setting-attachment-delete-button')
            .click();
        if (shouldConfirm) {
            await page.getByTestId('confirm-modal-confirm').click();
        }
    }
    static async removeAttachment(page, attachment, shouldConfirm = true) {
        await this.clickRemoveAttachment(page, attachment, shouldConfirm);
        await page
            .getByTestId('workspace-embedding-setting-attachment-item')
            .filter({ hasText: attachment })
            .waitFor({
            state: 'hidden',
        });
    }
    static async ignoreDocForEmbedding(page, doc, shouldWaitForRefresh = true) {
        // Open Dos Searcher
        const ignoreDocsButton = await page.getByTestId('workspace-embedding-setting-ignore-docs-button');
        await ignoreDocsButton.click();
        // Search and select the doc
        const searcher = await page.getByTestId('doc-selector-layout');
        const searchInput = await page.getByTestId('doc-selector-search-input');
        await searchInput.focus();
        await page.keyboard.insertText(doc);
        const pageListItem = searcher.getByTestId('doc-list-item');
        await expect(pageListItem).toHaveCount(1);
        const pageListItemTitle = pageListItem.getByTestId('doc-list-item-title');
        await expect(pageListItemTitle).toHaveText(doc);
        await pageListItem.click();
        await searcher.getByTestId('doc-selector-confirm-button').click();
        if (shouldWaitForRefresh) {
            const ignoredDocs = await page.getByTestId('workspace-embedding-setting-ignore-docs-list');
            await expect(ignoredDocs
                .getByTestId('workspace-embedding-setting-ignore-docs-list-item')
                .filter({ hasText: doc })).toBeVisible();
        }
    }
    static async clearAllIgnoredDocs(page) {
        const ignoredDocs = await page.getByTestId('ignore-doc-title').all();
        for (const ignoredDoc of ignoredDocs) {
            const doc = await ignoredDoc.innerText();
            // Open Dos Searcher
            const ignoreDocsButton = await page.getByTestId('workspace-embedding-setting-ignore-docs-button');
            await ignoreDocsButton.click();
            // Search and select the doc
            const searcher = await page.getByTestId('doc-selector-layout');
            const searchInput = await page.getByTestId('doc-selector-search-input');
            await searchInput.focus();
            await page.keyboard.insertText(doc);
            const pageListItem = searcher.getByTestId('page-list-item');
            await expect(pageListItem).toHaveCount(1);
            await pageListItem.getByTestId('affine-checkbox').uncheck();
            await searcher.getByTestId('doc-selector-confirm-button').click();
        }
    }
    static async waitForEmbeddingStatus(page, timeout, status = 'synced') {
        await expect(async () => {
            await cleanupWorkspace(page.url().split('/').slice(-2)[0] || '');
            await this.openSettingsPanel(page);
            const title = page.getByTestId('embedding-progress-title');
            // oxlint-disable-next-line prefer-dom-node-dataset
            const progressAttr = await title.getAttribute('data-progress');
            expect(progressAttr).not.toBe('loading');
            expect(progressAttr).toBe(status);
        }).toPass({ timeout });
    }
    static async waitForEmbeddingComplete(page, timeout = 30000) {
        await this.waitForEmbeddingStatus(page, timeout);
        // check embedding progress count
        await expect(async () => {
            const count = page.getByTestId('embedding-progress-count');
            const countText = await count.textContent();
            if (countText) {
                const [embedded, total] = countText.split('/').map(Number);
                expect(embedded).toBe(total);
                expect(embedded).toBeGreaterThan(0);
            }
        }).toPass({ timeout });
    }
    static async waitForFileEmbeddingReadiness(page, expectedFileCount, timeout = 30000) {
        await expect(async () => {
            const attachmentList = page.getByTestId('workspace-embedding-setting-attachment-list');
            const attachmentItems = attachmentList.getByTestId('workspace-embedding-setting-attachment-item');
            await expect(attachmentItems).toHaveCount(expectedFileCount);
        }).toPass({ timeout });
        await this.waitForEmbeddingComplete(page, timeout);
    }
}
//# sourceMappingURL=settings-panel-utils.js.map