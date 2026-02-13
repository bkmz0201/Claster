import type { CopilotChatHistoryFragment } from '@affine/graphql';
import { type NotificationService } from '@blocksuite/affine/shared/services';
import { ShadowlessElement } from '@blocksuite/affine/std';
import type { Store } from '@blocksuite/affine/store';
import type { ChatContextValue } from '../ai-chat-content';
declare const AIHistoryClear_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class AIHistoryClear extends AIHistoryClear_base {
    accessor chatContextValue: ChatContextValue;
    accessor session: CopilotChatHistoryFragment | null | undefined;
    accessor notificationService: NotificationService;
    accessor doc: Store;
    accessor onHistoryCleared: () => void;
    static styles: import("lit").CSSResult;
    private get _isHistoryClearDisabled();
    private readonly _cleanupHistories;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
//# sourceMappingURL=ai-history-clear.d.ts.map