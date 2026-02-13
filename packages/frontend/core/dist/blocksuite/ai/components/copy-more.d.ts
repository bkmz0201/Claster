import type { CopilotChatHistoryFragment } from '@affine/graphql';
import type { EditorHost } from '@blocksuite/affine/std';
import type { NotificationService } from '@blocksuite/affine-shared/services';
import { LitElement, type PropertyValues } from 'lit';
import type { ChatAction } from '../_common/chat-actions-handle';
declare const ChatCopyMore_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class ChatCopyMore extends ChatCopyMore_base {
    static styles: import("lit").CSSResult;
    private get _selectionValue();
    private get _currentTextSelection();
    private get _currentBlockSelections();
    private accessor _showMoreMenu;
    private accessor _moreButton;
    private accessor _moreMenu;
    private _morePopper;
    accessor host: EditorHost | null | undefined;
    accessor actions: ChatAction[];
    accessor session: CopilotChatHistoryFragment | null | undefined;
    accessor content: string;
    accessor messageId: string | undefined;
    accessor isLast: boolean;
    accessor withMargin: boolean;
    accessor retry: () => void;
    accessor testId: string;
    accessor notificationService: NotificationService;
    private _toggle;
    private readonly _notifySuccess;
    protected updated(changed: PropertyValues): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'chat-copy-more': ChatCopyMore;
    }
}
export {};
//# sourceMappingURL=copy-more.d.ts.map