import type { PeekViewService } from '@affine/core/modules/peek-view';
import { ShadowlessElement } from '@blocksuite/std';
import type { Signal } from '@preact/signals-core';
import { nothing } from 'lit';
interface DocKeywordSearchToolCall {
    type: 'tool-call';
    toolCallId: string;
    toolName: string;
    args: {
        query: string;
    };
}
interface DocKeywordSearchToolResult {
    type: 'tool-result';
    toolCallId: string;
    toolName: string;
    args: {
        query: string;
    };
    result: Array<{
        title: string;
        docId: string;
    }>;
}
declare const DocKeywordSearchResult_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/lit").DisposableClass>;
export declare class DocKeywordSearchResult extends DocKeywordSearchResult_base {
    accessor data: DocKeywordSearchToolCall | DocKeywordSearchToolResult;
    accessor width: Signal<number | undefined> | undefined;
    accessor onOpenDoc: (docId: string, sessionId?: string) => void;
    accessor peekViewService: PeekViewService;
    renderToolCall(): import("lit-html").TemplateResult<1>;
    renderToolResult(): import("lit-html").TemplateResult<1> | typeof nothing;
    protected render(): import("lit-html").TemplateResult<1> | typeof nothing;
}
export {};
//# sourceMappingURL=doc-keyword-search-result.d.ts.map