import { CodeBlockHighlighter } from '@blocksuite/affine/blocks/code';
import { ColorScheme } from '@blocksuite/affine/model';
import { type BlockStdScope } from '@blocksuite/affine/std';
import type { NotificationService } from '@blocksuite/affine-shared/services';
import type { Signal } from '@preact/signals-core';
import { LitElement } from 'lit';
import { type ThemedToken } from 'shiki';
import { ArtifactTool } from './artifact-tool';
import type { ToolError } from './type';
interface CodeArtifactToolCall {
    type: 'tool-call';
    toolCallId: string;
    toolName: string;
    args: {
        title: string;
    };
}
interface CodeArtifactToolResult {
    type: 'tool-result';
    toolCallId: string;
    toolName: string;
    args: {
        title: string;
    };
    result: {
        title: string;
        html: string;
        size: number;
    } | ToolError | null;
}
declare const CodeHighlighter_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class CodeHighlighter extends CodeHighlighter_base {
    static styles: import("lit").CSSResult;
    accessor std: BlockStdScope;
    accessor code: string;
    accessor language: string;
    accessor showLineNumbers: boolean;
    highlightTokens: Signal<ThemedToken[][]>;
    get highlighter(): CodeBlockHighlighter;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _updateHighlightTokens;
    private _tokenStyle;
    render(): import("lit-html").TemplateResult<1>;
}
/**
 * Component to render code artifact tool call/result inside chat.
 */
export declare class CodeArtifactTool extends ArtifactTool<CodeArtifactToolCall | CodeArtifactToolResult> {
    static styles: import("lit").CSSResult;
    accessor std: BlockStdScope | undefined;
    accessor notificationService: NotificationService;
    private accessor mode;
    protected getBanner(theme: ColorScheme): import("lit-html").TemplateResult<1>;
    protected getCardMeta(): {
        title: string;
        className: string;
    };
    protected getIcon(): import("lit-html").TemplateResult<1>;
    protected getPreviewContent(): import("lit-html").TemplateResult<1>;
    get clipboard(): import("@blocksuite/std").Clipboard | undefined;
    protected getPreviewControls(): import("lit-html").TemplateResult<1> | undefined;
    protected getErrorTemplate(): import("lit-html").TemplateResult<1> | null;
}
export {};
//# sourceMappingURL=code-artifact.d.ts.map