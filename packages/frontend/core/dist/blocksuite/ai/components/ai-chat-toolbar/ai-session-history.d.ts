import type { CopilotChatHistoryFragment } from '@affine/graphql';
import { ShadowlessElement } from '@blocksuite/affine/std';
import { type PropertyValues } from 'lit';
import type { DocDisplayConfig } from '../ai-chat-chips';
declare const AISessionHistory_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class AISessionHistory extends AISessionHistory_base {
    static styles: import("lit").CSSResult;
    accessor session: CopilotChatHistoryFragment | null | undefined;
    accessor workspaceId: string;
    accessor docDisplayConfig: DocDisplayConfig;
    accessor onSessionClick: (sessionId: string) => void;
    accessor onSessionDelete: (session: BlockSuitePresets.AIRecentSession) => void;
    accessor onDocClick: (docId: string, sessionId: string) => void;
    accessor scrollContainer: HTMLElement;
    private accessor sessions;
    private accessor loadingMore;
    private accessor hasMore;
    private accessor currentOffset;
    private readonly pageSize;
    private groupSessionsByTime;
    private getRecentSessions;
    private readonly onScroll;
    connectedCallback(): void;
    firstUpdated(changedProperties: PropertyValues): void;
    private renderSessionGroup;
    private renderSessionDoc;
    private renderLoading;
    private renderEmpty;
    private renderHistory;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
//# sourceMappingURL=ai-session-history.d.ts.map