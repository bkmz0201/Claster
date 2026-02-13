import type { CopilotChatHistoryFragment } from '@affine/graphql';
import type { NotificationService } from '@blocksuite/affine/shared/services';
import { ShadowlessElement } from '@blocksuite/affine/std';
import type { DocDisplayConfig } from '../ai-chat-chips';
import type { ChatStatus } from '../ai-chat-messages';
declare const AIChatToolbar_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class AIChatToolbar extends AIChatToolbar_base {
    accessor session: CopilotChatHistoryFragment | null | undefined;
    accessor workspaceId: string;
    accessor docId: string | undefined;
    accessor status: ChatStatus;
    accessor onNewSession: () => void;
    accessor onTogglePin: () => Promise<void>;
    accessor onOpenSession: (sessionId: string) => void;
    accessor onOpenDoc: (docId: string, sessionId: string) => void;
    accessor onSessionDelete: (session: BlockSuitePresets.AIRecentSession) => void;
    accessor docDisplayConfig: DocDisplayConfig;
    accessor notificationService: NotificationService;
    accessor historyButton: HTMLDivElement;
    private abortController;
    get isGenerating(): boolean;
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
    private readonly onPinClick;
    private readonly unpinConfirm;
    private readonly onPlusClick;
    private readonly onSessionClick;
    private readonly onDocClick;
    private readonly toggleHistoryMenu;
    closeHistoryMenu(): void;
}
export {};
//# sourceMappingURL=ai-chat-toolbar.d.ts.map