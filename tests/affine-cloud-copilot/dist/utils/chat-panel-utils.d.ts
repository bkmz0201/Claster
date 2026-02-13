import type { Page } from '@playwright/test';
type ChatStatus = 'loading' | 'success' | 'error' | 'idle' | 'transmitting';
type ChatUserMessage = {
    role: 'user';
    content: string;
};
type ChatAssistantMessage = {
    role: 'assistant';
    status: ChatStatus;
    title: string;
    content: string;
};
type ChatActionMessage = {
    role: 'action';
    title: string;
    content: string;
};
type ChatMessage = ChatUserMessage | ChatAssistantMessage | ChatActionMessage;
export declare class ChatPanelUtils {
    static openChatPanel(page: Page): Promise<void>;
    static closeChatPanel(page: Page): Promise<void>;
    static typeChat(page: Page, content: string): Promise<void>;
    static typeChatSequentially(page: Page, content: string): Promise<void>;
    static makeChat(page: Page, content: string): Promise<void>;
    static clearChat(page: Page): Promise<void>;
    static collectHistory(page: Page): Promise<ChatMessage[]>;
    private static expectHistory;
    static expectToHaveHistory(page: Page, expected: (Partial<ChatUserMessage> | Partial<ChatAssistantMessage> | Partial<ChatActionMessage>)[]): Promise<void>;
    static waitForHistory(page: Page, expected: (Partial<ChatUserMessage> | Partial<ChatAssistantMessage> | Partial<ChatActionMessage>)[], timeout?: number): Promise<void>;
    static getLatestAssistantMessage(page: Page): Promise<{
        message: import("playwright-core").Locator;
        content: string;
        actions: {
            copy: () => Promise<void>;
            retry: () => Promise<void>;
            insert: () => Promise<void>;
            saveAsBlock: () => Promise<void>;
            saveAsDoc: () => Promise<void>;
            addAsNote: () => Promise<void>;
        };
    }>;
    static getLatestAIActionMessage(page: Page): Promise<{
        message: import("playwright-core").Locator;
        answer: import("playwright-core").Locator;
        prompt: import("playwright-core").Locator;
        actionName: import("playwright-core").Locator;
    }>;
    static chatWithDoc(page: Page, docName: string): Promise<void>;
    static chatWithAttachments(page: Page, attachments: {
        name: string;
        mimeType: string;
        buffer: Buffer;
    }[], text: string): Promise<void>;
    static uploadImages(page: Page, images: {
        name: string;
        mimeType: string;
        buffer: Buffer;
    }[]): Promise<void>;
    static chatWithImages(page: Page, images: {
        name: string;
        mimeType: string;
        buffer: Buffer;
    }[], text: string): Promise<void>;
    static chatWithTags(page: Page, tags: string[]): Promise<void>;
    static chatWithCollections(page: Page, collections: string[]): Promise<void>;
    static waitForEmbeddingProgress(page: Page): Promise<void>;
    static openChatInputPreference(page: Page): Promise<void>;
    static enableNetworkSearch(page: Page): Promise<void>;
    static disableNetworkSearch(page: Page): Promise<void>;
    static enableReasoning(page: Page): Promise<void>;
    static disableReasoning(page: Page): Promise<void>;
    static isNetworkSearchEnabled(page: Page): Promise<boolean>;
}
export {};
//# sourceMappingURL=chat-panel-utils.d.ts.map