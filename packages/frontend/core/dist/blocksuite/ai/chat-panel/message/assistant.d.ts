import type { FeatureFlagService } from '@affine/core/modules/feature-flag';
import type { PeekViewService } from '@affine/core/modules/peek-view';
import type { AppThemeService } from '@affine/core/modules/theme';
import type { CopilotChatHistoryFragment } from '@affine/graphql';
import { type BlockStdScope, type EditorHost, ShadowlessElement } from '@blocksuite/affine/std';
import type { ExtensionType } from '@blocksuite/affine/store';
import type { NotificationService } from '@blocksuite/affine-shared/services';
import type { Signal } from '@preact/signals-core';
import type { DocDisplayConfig } from '../../components/ai-chat-chips';
import { type ChatMessage, type ChatStatus } from '../../components/ai-chat-messages';
import { type AIError } from '../../provider';
declare const ChatMessageAssistant_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class ChatMessageAssistant extends ChatMessageAssistant_base {
    static styles: import("lit").CSSResult;
    accessor host: EditorHost | null | undefined;
    accessor std: BlockStdScope | null | undefined;
    accessor item: ChatMessage;
    accessor isLast: boolean;
    accessor status: ChatStatus;
    accessor error: AIError | null;
    accessor extensions: ExtensionType[];
    accessor affineFeatureFlagService: FeatureFlagService;
    accessor affineThemeService: AppThemeService;
    accessor session: CopilotChatHistoryFragment | null | undefined;
    accessor retry: () => void;
    accessor testId: string;
    accessor width: Signal<number | undefined> | undefined;
    accessor notificationService: NotificationService;
    accessor independentMode: boolean | undefined;
    accessor docDisplayService: DocDisplayConfig;
    accessor peekViewService: PeekViewService;
    accessor onOpenDoc: (docId: string, sessionId?: string) => void;
    get state(): "finished" | "generating";
    renderHeader(): import("lit-html").TemplateResult<1>;
    renderContent(): import("lit-html").TemplateResult<1>;
    private renderImages;
    private renderStreamObjects;
    private renderRichText;
    private renderEditorActions;
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'chat-message-assistant': ChatMessageAssistant;
    }
}
export {};
//# sourceMappingURL=assistant.d.ts.map