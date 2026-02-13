import { expect } from '@playwright/test';
export class ChatPanelUtils {
    static async openChatPanel(page) {
        if (await page.getByTestId('sidebar-tab-chat').isHidden()) {
            await page.getByTestId('right-sidebar-toggle').click({
                delay: 200,
            });
            await page.waitForTimeout(500); // wait the sidebar stable
        }
        await page.getByTestId('sidebar-tab-chat').click();
        await expect(page.getByTestId('sidebar-tab-content-chat')).toBeVisible();
    }
    static async closeChatPanel(page) {
        await page.getByTestId('right-sidebar-close').click({
            delay: 200,
        });
        await expect(page.getByTestId('sidebar-tab-content-chat')).toBeHidden();
    }
    static async typeChat(page, content) {
        await page.getByTestId('chat-panel-input').focus();
        await page.keyboard.type(content);
    }
    static async typeChatSequentially(page, content) {
        const input = await page.locator('chat-panel-input textarea').nth(0);
        await input.pressSequentially(content, {
            delay: 50,
        });
    }
    static async makeChat(page, content) {
        await this.typeChat(page, content);
        await page.keyboard.press('Enter');
    }
    static async clearChat(page) {
        await page.getByTestId('chat-panel-clear').click();
        await page.getByTestId('confirm-modal-confirm').click();
        await page.waitForTimeout(500);
    }
    static async collectHistory(page) {
        return await page.evaluate(() => {
            const chatPanel = document.querySelector('[data-testid="chat-panel-messages"]');
            if (!chatPanel) {
                return [];
            }
            const messages = chatPanel.querySelectorAll('chat-message-user,chat-message-assistant,chat-message-action');
            return Array.from(messages).map(m => {
                const isAssistant = m.dataset.testid === 'chat-message-assistant';
                const isChatAction = m.dataset.testid === 'chat-message-action';
                const isUser = !isAssistant && !isChatAction;
                if (isUser) {
                    return {
                        role: 'user',
                        content: m.querySelector('[data-testid="chat-content-pure-text"]')?.innerText || '',
                    };
                }
                if (isAssistant) {
                    return {
                        role: 'assistant',
                        status: m.dataset.status,
                        title: m.querySelector('.user-info')?.innerText || '',
                        content: m.querySelector('chat-content-rich-text editor-host')
                            ?.innerText || '',
                    };
                }
                // Must be chat action at this point
                return {
                    role: 'action',
                    title: m.querySelector('.user-info')?.innerText || '',
                    content: m.querySelector('chat-content-rich-text editor-host')
                        ?.innerText || '',
                };
            });
        });
    }
    static expectHistory(history, expected) {
        expect(history).toHaveLength(expected.length);
        history.forEach((message, index) => {
            const expectedMessage = expected[index];
            expect(message).toMatchObject(expectedMessage);
        });
    }
    static async expectToHaveHistory(page, expected) {
        const history = await this.collectHistory(page);
        this.expectHistory(history, expected);
    }
    static async waitForHistory(page, expected, timeout = 2 * 60000) {
        await expect(async () => {
            const history = await this.collectHistory(page);
            this.expectHistory(history, expected);
        }).toPass({ timeout });
    }
    static async getLatestAssistantMessage(page) {
        const message = page.getByTestId('chat-message-assistant').last();
        const actions = await message.getByTestId('chat-actions');
        const actionList = await message.getByTestId('chat-action-list');
        return {
            message,
            content: (await message
                .locator('chat-content-rich-text editor-host')
                .allInnerTexts()).join(' '),
            actions: {
                copy: async () => actions.getByTestId('action-copy-button').click(),
                retry: async () => actions.getByTestId('action-retry-button').click(),
                insert: async () => actionList.getByTestId('action-insert').click(),
                saveAsBlock: async () => actionList.getByTestId('action-save-as-block').click(),
                saveAsDoc: async () => actionList.getByTestId('action-save-as-doc').click(),
                addAsNote: async () => actionList.getByTestId('action-add-to-edgeless-as-note').click(),
            },
        };
    }
    static async getLatestAIActionMessage(page) {
        const message = page.getByTestId('chat-message-action').last();
        const actionName = await message.getByTestId('action-name');
        await actionName.click();
        const answer = await message.getByTestId('answer-prompt');
        const prompt = await message.getByTestId('chat-message-action-prompt');
        return {
            message,
            answer,
            prompt,
            actionName,
        };
    }
    static async chatWithDoc(page, docName) {
        const withButton = page.getByTestId('chat-panel-with-button');
        await withButton.hover();
        await withButton.click({ delay: 200 });
        const withMenu = page.getByTestId('ai-add-popover');
        await withMenu.waitFor({ state: 'visible' });
        await withMenu.getByText(docName).click();
        await page.getByTestId('chat-panel-chips').getByText(docName);
    }
    static async chatWithAttachments(page, attachments, text) {
        await page.evaluate(() => {
            delete window.showOpenFilePicker;
        });
        for (const attachment of attachments) {
            const fileChooserPromise = page.waitForEvent('filechooser');
            const withButton = page.getByTestId('chat-panel-with-button');
            await withButton.hover();
            await withButton.click({ delay: 200 });
            const withMenu = page.getByTestId('ai-add-popover');
            await withMenu.waitFor({ state: 'visible' });
            await withMenu.getByTestId('ai-chat-with-files').click();
            const fileChooser = await fileChooserPromise;
            await fileChooser.setFiles(attachment);
            await expect(async () => {
                const states = await page
                    .getByTestId('chat-panel-chip')
                    .evaluateAll(elements => elements.map(el => el.getAttribute('data-state')));
                expect(states.every(state => state === 'finished')).toBe(true);
            }).toPass({ timeout: 20000 });
        }
        await expect(async () => {
            const states = await page
                .getByTestId('chat-panel-chip')
                .evaluateAll(elements => elements.map(el => el.getAttribute('data-state')));
            expect(states).toHaveLength(attachments.length);
            expect(states.every(state => state === 'finished')).toBe(true);
        }).toPass({ timeout: 20000 });
        await this.makeChat(page, text);
    }
    static async uploadImages(page, images) {
        await page.evaluate(() => {
            delete window.showOpenFilePicker;
        });
        const fileChooserPromise = page.waitForEvent('filechooser');
        const withButton = page.getByTestId('chat-panel-with-button');
        await withButton.hover();
        await withButton.click({ delay: 200 });
        const withMenu = page.getByTestId('ai-add-popover');
        await withMenu.waitFor({ state: 'visible' });
        await withMenu.getByTestId('ai-chat-with-images').click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(images);
    }
    static async chatWithImages(page, images, text) {
        await this.uploadImages(page, images);
        await page.waitForSelector('ai-chat-input .image-container');
        await this.makeChat(page, text);
    }
    static async chatWithTags(page, tags) {
        for (const tag of tags) {
            const withButton = page.getByTestId('chat-panel-with-button');
            await withButton.hover();
            await withButton.click({ delay: 200 });
            const withMenu = page.getByTestId('ai-add-popover');
            await withMenu.waitFor({ state: 'visible' });
            await withMenu.getByTestId('ai-chat-with-tags').click();
            await withMenu.getByText(tag).click();
            await page.getByTestId('chat-panel-chips').getByText(tag);
            await this.waitForEmbeddingProgress(page);
            await withMenu.waitFor({
                state: 'hidden',
            });
        }
    }
    static async chatWithCollections(page, collections) {
        for (const collection of collections) {
            const withButton = page.getByTestId('chat-panel-with-button');
            await withButton.hover();
            await withButton.click({ delay: 200 });
            const withMenu = page.getByTestId('ai-add-popover');
            await withMenu.waitFor({ state: 'visible' });
            await withMenu.getByTestId('ai-chat-with-collections').click();
            await withMenu.getByText(collection).click();
            await page.getByTestId('chat-panel-chips').getByText(collection);
            await this.waitForEmbeddingProgress(page);
            await withMenu.waitFor({
                state: 'hidden',
            });
        }
    }
    static async waitForEmbeddingProgress(page) {
        try {
            await page.getByTestId('chat-panel-embedding-progress').waitFor({
                state: 'visible',
            });
            await page.getByTestId('chat-panel-embedding-progress').waitFor({
                state: 'hidden',
            });
        }
        catch {
            // do nothing
        }
    }
    static async openChatInputPreference(page) {
        const trigger = page.getByTestId('chat-input-preference-trigger');
        await trigger.click();
        await page.getByTestId('chat-input-preference').waitFor({
            state: 'visible',
        });
    }
    static async enableNetworkSearch(page) {
        await this.openChatInputPreference(page);
        const networkSearch = page.getByTestId('chat-network-search');
        if ((await networkSearch.getAttribute('data-active')) === 'false') {
            await networkSearch.click();
        }
    }
    static async disableNetworkSearch(page) {
        await this.openChatInputPreference(page);
        const networkSearch = page.getByTestId('chat-network-search');
        if ((await networkSearch.getAttribute('data-active')) === 'true') {
            await networkSearch.click();
        }
    }
    static async enableReasoning(page) {
        await this.openChatInputPreference(page);
        const reasoning = page.getByTestId('chat-reasoning');
        if ((await reasoning.getAttribute('data-active')) === 'false') {
            await reasoning.click();
        }
    }
    static async disableReasoning(page) {
        await this.openChatInputPreference(page);
        const reasoning = page.getByTestId('chat-reasoning');
        if ((await reasoning.getAttribute('data-active')) === 'true') {
            await reasoning.click();
        }
    }
    static async isNetworkSearchEnabled(page) {
        const networkSearch = await page.getByTestId('chat-network-search');
        return (await networkSearch.getAttribute('aria-disabled')) === 'false';
    }
}
//# sourceMappingURL=chat-panel-utils.js.map