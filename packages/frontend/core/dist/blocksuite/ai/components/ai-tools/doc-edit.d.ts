import { type EditorHost, ShadowlessElement } from '@blocksuite/affine/std';
import type { NotificationService } from '@blocksuite/affine-shared/services';
import { BlockDiffProvider } from '../../services/block-diff';
import { diffMarkdown } from '../../utils/apply-model/markdown-diff';
import type { ToolError } from './type';
interface DocEditToolCall {
    type: 'tool-call';
    toolCallId: string;
    toolName: 'doc_edit';
}
interface DocEditToolResult {
    type: 'tool-result';
    toolCallId: string;
    toolName: 'doc_edit';
    args: {
        instructions: string;
        code_edit: string;
        doc_id: string;
    };
    result: {
        result: {
            op: string;
            updates: string;
            originalContent: string;
            changedContent: string;
        }[];
    } | ToolError | null;
}
declare const DocEditTool_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class DocEditTool extends DocEditTool_base {
    static styles: import("lit").CSSResult;
    accessor host: EditorHost | null;
    accessor data: DocEditToolCall | DocEditToolResult;
    accessor renderRichText: (text: string) => string;
    accessor notificationService: NotificationService;
    accessor isCollapsed: boolean;
    accessor applyingMap: Record<string, boolean>;
    accessor acceptingMap: Record<string, boolean>;
    get blockDiffService(): BlockDiffProvider | null | undefined;
    get isBusy(): undefined;
    isBusyForOp(op: string): boolean;
    private _handleApply;
    private _handleReject;
    private _handleAccept;
    private _toggleCollapse;
    private _handleCopy;
    renderToolCall(): import("lit-html").TemplateResult<1>;
    renderSantizedText(text: string): string;
    renderBlockDiffs(diffs: ReturnType<typeof diffMarkdown>): import("lit-html").TemplateResult<1>;
    renderToolResult(): unknown;
    protected render(): unknown;
}
export {};
//# sourceMappingURL=doc-edit.d.ts.map