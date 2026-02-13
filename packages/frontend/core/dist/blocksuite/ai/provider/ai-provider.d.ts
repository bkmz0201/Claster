import type { EditorHost } from '@blocksuite/affine/std';
import { BehaviorSubject, Subject } from 'rxjs';
import type { ChatContextValue } from '../components/ai-chat-content';
export interface AIUserInfo {
    id: string;
    email: string;
    name: string;
    avatarUrl: string | null;
}
export interface AIChatParams {
    host: EditorHost;
    input?: string;
    mode?: 'page' | 'edgeless';
    autoSelect?: boolean;
    context?: Partial<ChatContextValue | null>;
    fromAnswer?: boolean;
}
export interface AISendParams {
    host: EditorHost;
    input: string;
    context?: Partial<ChatContextValue | null>;
}
export interface AIEmbeddingStatus {
    embedded: number;
    total: number;
}
export type ActionEventType = 'started' | 'finished' | 'error' | 'aborted:paywall' | 'aborted:login-required' | 'aborted:server-error' | 'aborted:stop' | 'aborted:timeout' | 'result:insert' | 'result:replace' | 'result:use-as-caption' | 'result:add-page' | 'result:add-note' | 'result:continue-in-chat' | 'result:discard' | 'result:retry';
/**
 * AI provider for the block suite
 *
 * To use it, downstream (affine) has to provide AI actions implementation,
 * user info etc
 *
 * TODO: breakdown into different parts?
 */
export declare class AIProvider {
    static get slots(): {
        requestOpenWithChat: BehaviorSubject<AIChatParams | null>;
        requestSendWithChat: BehaviorSubject<AISendParams | null>;
        requestInsertTemplate: Subject<{
            template: string;
            mode: "page" | "edgeless";
        }>;
        requestLogin: Subject<{
            host?: EditorHost | null;
        }>;
        requestUpgradePlan: Subject<{
            host?: EditorHost | null;
        }>;
        actions: Subject<{
            action: keyof BlockSuitePresets.AIActions;
            options: BlockSuitePresets.AITextActionOptions;
            event: ActionEventType;
        }>;
        userInfo: Subject<AIUserInfo | null>;
        previewPanelOpenChange: Subject<boolean>;
    };
    static get actions(): Partial<BlockSuitePresets.AIActions>;
    static get userInfo(): AIUserInfo | Promise<AIUserInfo> | null;
    static get photoEngine(): BlockSuitePresets.AIPhotoEngineService | null;
    static get histories(): BlockSuitePresets.AIHistoryService | null;
    static get session(): BlockSuitePresets.AISessionService | null;
    static get context(): BlockSuitePresets.AIContextService | null;
    static get actionHistory(): {
        action: keyof BlockSuitePresets.AIActions;
        options: BlockSuitePresets.AITextActionOptions;
    }[];
    static get toggleGeneralAIOnboarding(): ((value: boolean) => void) | null;
    static get forkChat(): ((options: BlockSuitePresets.AIForkChatSessionOptions) => string | Promise<string>) | null;
    static get embedding(): BlockSuitePresets.AIEmbeddingService | null;
    private static readonly instance;
    static LAST_ACTION_SESSIONID: string;
    static MAX_LOCAL_HISTORY: number;
    private readonly actions;
    private photoEngine;
    private histories;
    private session;
    private context;
    private toggleGeneralAIOnboarding;
    private forkChat;
    private readonly slots;
    private readonly actionHistory;
    private userInfoFn;
    private embedding;
    private provideAction;
    static provide(id: 'userInfo', fn: () => AIUserInfo | Promise<AIUserInfo> | null): void;
    static provide(id: 'session', service: BlockSuitePresets.AISessionService): void;
    static provide(id: 'context', service: BlockSuitePresets.AIContextService): void;
    static provide(id: 'histories', service: BlockSuitePresets.AIHistoryService): void;
    static provide(id: 'photoEngine', engine: BlockSuitePresets.AIPhotoEngineService): void;
    static provide(id: 'forkChat', fn: (options: BlockSuitePresets.AIForkChatSessionOptions) => string | Promise<string>): void;
    static provide(id: 'onboarding', fn: (value: boolean) => void): void;
    static provide(id: 'embedding', service: BlockSuitePresets.AIEmbeddingService): void;
    static provide<T extends keyof BlockSuitePresets.AIActions>(id: T, action: (...options: Parameters<BlockSuitePresets.AIActions[T]>) => Promise<ReturnType<BlockSuitePresets.AIActions[T]>>): void;
}
//# sourceMappingURL=ai-provider.d.ts.map