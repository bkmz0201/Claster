import type { AIDraftService, AIToolsConfigService } from '@affine/core/modules/ai-button';
import type { AIModelService } from '@affine/core/modules/ai-button/services/models';
import type { ServerService, SubscriptionService } from '@affine/core/modules/cloud';
import type { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import type { FeatureFlagService } from '@affine/core/modules/feature-flag';
import type { PeekViewService } from '@affine/core/modules/peek-view';
import type { AppThemeService } from '@affine/core/modules/theme';
import type { WorkbenchService } from '@affine/core/modules/workbench';
import type { CopilotChatHistoryFragment } from '@affine/graphql';
import { type NotificationService } from '@blocksuite/affine/shared/services';
import type { EditorHost } from '@blocksuite/affine/std';
import { ShadowlessElement } from '@blocksuite/affine/std';
import type { ExtensionType, Store } from '@blocksuite/affine/store';
import { type PropertyValues } from 'lit';
import type { SearchMenuConfig } from '../components/ai-chat-add-context';
import type { DocDisplayConfig } from '../components/ai-chat-chips';
import type { AINetworkSearchConfig, AIPlaygroundConfig, AIReasoningConfig } from '../components/ai-chat-input';
import type { ChatStatus } from '../components/ai-chat-messages';
import type { AppSidebarConfig } from './chat-config';
declare const ChatPanel_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class ChatPanel extends ChatPanel_base {
    static styles: import("lit").CSSResult;
    accessor host: EditorHost;
    accessor doc: Store;
    accessor playgroundConfig: AIPlaygroundConfig;
    accessor appSidebarConfig: AppSidebarConfig;
    accessor networkSearchConfig: AINetworkSearchConfig;
    accessor reasoningConfig: AIReasoningConfig;
    accessor searchMenuConfig: SearchMenuConfig;
    accessor docDisplayConfig: DocDisplayConfig;
    accessor extensions: ExtensionType[];
    accessor serverService: ServerService;
    accessor affineFeatureFlagService: FeatureFlagService;
    accessor affineWorkspaceDialogService: WorkspaceDialogService;
    accessor affineWorkbenchService: WorkbenchService;
    accessor affineThemeService: AppThemeService;
    accessor notificationService: NotificationService;
    accessor aiDraftService: AIDraftService;
    accessor aiToolsConfigService: AIToolsConfigService;
    accessor peekViewService: PeekViewService;
    accessor subscriptionService: SubscriptionService;
    accessor aiModelService: AIModelService;
    accessor onAISubscribe: () => Promise<void>;
    accessor session: CopilotChatHistoryFragment | null | undefined;
    accessor embeddingProgress: [number, number];
    accessor status: ChatStatus;
    private isSidebarOpen;
    private sidebarWidth;
    private hasPinned;
    private get isInitialized();
    private readonly getSessionIdFromUrl;
    private readonly setSession;
    private readonly initSession;
    private readonly createSession;
    private readonly deleteSession;
    private readonly updateSession;
    private readonly newSession;
    private readonly openSession;
    private readonly openDoc;
    private readonly togglePin;
    private readonly rebindSession;
    private readonly initPanel;
    private readonly resetPanel;
    private readonly onEmbeddingProgressChange;
    private readonly onContextChange;
    protected updated(changedProperties: PropertyValues): void;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'chat-panel': ChatPanel;
    }
}
export {};
//# sourceMappingURL=index.d.ts.map