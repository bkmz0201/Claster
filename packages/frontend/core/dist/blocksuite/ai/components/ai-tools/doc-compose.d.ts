import type { ColorScheme } from '@blocksuite/affine/model';
import type { NotificationService } from '@blocksuite/affine-shared/services';
import type { BlockStdScope } from '@blocksuite/std';
import { ArtifactTool } from './artifact-tool';
import type { ToolError } from './type';
interface DocComposeToolCall {
    type: 'tool-call';
    toolCallId: string;
    toolName: string;
    args: {
        title: string;
    };
}
interface DocComposeToolResult {
    type: 'tool-result';
    toolCallId: string;
    toolName: string;
    args: {
        title: string;
    };
    result: {
        title: string;
        markdown: string;
        wordCount: number;
    } | ToolError | null;
}
/**
 * Component to render doc compose tool call/result inside chat.
 */
export declare class DocComposeTool extends ArtifactTool<DocComposeToolCall | DocComposeToolResult> {
    static styles: import("lit").CSSResult;
    accessor std: BlockStdScope | undefined;
    accessor notificationService: NotificationService;
    protected getBanner(theme: ColorScheme): import("lit-html").TemplateResult<1>;
    protected getCardMeta(): {
        title: string;
        className: string;
    };
    protected getIcon(): import("lit-html").TemplateResult<1>;
    protected getPreviewContent(): import("lit-html").TemplateResult<1>;
    protected getPreviewControls(): import("lit-html").TemplateResult<1> | undefined;
    protected getErrorTemplate(): import("lit-html").TemplateResult<1> | null;
}
export {};
//# sourceMappingURL=doc-compose.d.ts.map