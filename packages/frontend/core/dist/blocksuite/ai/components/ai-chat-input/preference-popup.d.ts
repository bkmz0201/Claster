import type { AIToolsConfigService } from '@affine/core/modules/ai-button';
import type { AIModelService } from '@affine/core/modules/ai-button/services/models';
import type { ServerService, SubscriptionService } from '@affine/core/modules/cloud';
import { type CopilotChatHistoryFragment } from '@affine/graphql';
import type { NotificationService } from '@blocksuite/affine-shared/services';
import { ShadowlessElement } from '@blocksuite/std';
declare const ChatInputPreference_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class ChatInputPreference extends ChatInputPreference_base {
    static styles: import("lit").CSSResult;
    accessor session: CopilotChatHistoryFragment | null | undefined;
    accessor extendedThinking: boolean;
    accessor onExtendedThinkingChange: ((extendedThinking: boolean) => void) | undefined;
    accessor networkSearchVisible: boolean;
    accessor isNetworkActive: boolean;
    accessor onNetworkActiveChange: ((isNetworkActive: boolean) => void) | undefined;
    accessor serverService: ServerService;
    accessor toolsConfigService: AIToolsConfigService;
    accessor notificationService: NotificationService;
    accessor subscriptionService: SubscriptionService;
    accessor aiModelService: AIModelService;
    accessor onAISubscribe: () => Promise<void>;
    model: import("@preact/signals-core").ReadonlySignal<import("@affine/core/modules/ai-button/services/models").AIModel | undefined>;
    openPreference(e: Event): void;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
//# sourceMappingURL=preference-popup.d.ts.map