import type { StreamObject } from '../components/ai-chat-messages';
export declare function mergeStreamObjects(chunks?: StreamObject[]): ({
    type: "text-delta";
    textDelta: string;
} | {
    type: "reasoning";
    textDelta: string;
} | {
    type: "tool-call";
    args: Record<string, any>;
    toolCallId: string;
    toolName: string;
} | {
    type: "tool-result";
    args: Record<string, any>;
    toolCallId: string;
    toolName: string;
    result?: any;
})[];
export declare function mergeStreamContent(chunks: StreamObject[]): string;
//# sourceMappingURL=stream-objects.d.ts.map