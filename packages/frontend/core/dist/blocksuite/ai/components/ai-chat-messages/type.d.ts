import { z } from 'zod';
export declare const StreamObjectSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"text-delta">;
    textDelta: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "text-delta";
    textDelta: string;
}, {
    type: "text-delta";
    textDelta: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"reasoning">;
    textDelta: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "reasoning";
    textDelta: string;
}, {
    type: "reasoning";
    textDelta: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"tool-call">;
    toolCallId: z.ZodString;
    toolName: z.ZodString;
    args: z.ZodRecord<z.ZodString, z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    type: "tool-call";
    args: Record<string, any>;
    toolCallId: string;
    toolName: string;
}, {
    type: "tool-call";
    args: Record<string, any>;
    toolCallId: string;
    toolName: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"tool-result">;
    toolCallId: z.ZodString;
    toolName: z.ZodString;
    args: z.ZodRecord<z.ZodString, z.ZodAny>;
    result: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    type: "tool-result";
    args: Record<string, any>;
    toolCallId: string;
    toolName: string;
    result?: any;
}, {
    type: "tool-result";
    args: Record<string, any>;
    toolCallId: string;
    toolName: string;
    result?: any;
}>]>;
export type StreamObject = z.infer<typeof StreamObjectSchema>;
declare const ChatMessageSchema: z.ZodObject<{
    id: z.ZodString;
    content: z.ZodString;
    role: z.ZodUnion<[z.ZodLiteral<"user">, z.ZodLiteral<"assistant">]>;
    createdAt: z.ZodString;
    streamObjects: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"text-delta">;
        textDelta: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "text-delta";
        textDelta: string;
    }, {
        type: "text-delta";
        textDelta: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"reasoning">;
        textDelta: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "reasoning";
        textDelta: string;
    }, {
        type: "reasoning";
        textDelta: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"tool-call">;
        toolCallId: z.ZodString;
        toolName: z.ZodString;
        args: z.ZodRecord<z.ZodString, z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        type: "tool-call";
        args: Record<string, any>;
        toolCallId: string;
        toolName: string;
    }, {
        type: "tool-call";
        args: Record<string, any>;
        toolCallId: string;
        toolName: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"tool-result">;
        toolCallId: z.ZodString;
        toolName: z.ZodString;
        args: z.ZodRecord<z.ZodString, z.ZodAny>;
        result: z.ZodAny;
    }, "strip", z.ZodTypeAny, {
        type: "tool-result";
        args: Record<string, any>;
        toolCallId: string;
        toolName: string;
        result?: any;
    }, {
        type: "tool-result";
        args: Record<string, any>;
        toolCallId: string;
        toolName: string;
        result?: any;
    }>]>, "many">>;
    attachments: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    userId: z.ZodOptional<z.ZodString>;
    userName: z.ZodOptional<z.ZodString>;
    avatarUrl: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    role: "user" | "assistant";
    content: string;
    createdAt: string;
    userId?: string | undefined;
    avatarUrl?: string | undefined;
    streamObjects?: ({
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
    })[] | undefined;
    attachments?: string[] | undefined;
    userName?: string | undefined;
}, {
    id: string;
    role: "user" | "assistant";
    content: string;
    createdAt: string;
    userId?: string | undefined;
    avatarUrl?: string | undefined;
    streamObjects?: ({
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
    })[] | undefined;
    attachments?: string[] | undefined;
    userName?: string | undefined;
}>;
export declare const ChatMessagesSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    content: z.ZodString;
    role: z.ZodUnion<[z.ZodLiteral<"user">, z.ZodLiteral<"assistant">]>;
    createdAt: z.ZodString;
    streamObjects: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"text-delta">;
        textDelta: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "text-delta";
        textDelta: string;
    }, {
        type: "text-delta";
        textDelta: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"reasoning">;
        textDelta: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "reasoning";
        textDelta: string;
    }, {
        type: "reasoning";
        textDelta: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"tool-call">;
        toolCallId: z.ZodString;
        toolName: z.ZodString;
        args: z.ZodRecord<z.ZodString, z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        type: "tool-call";
        args: Record<string, any>;
        toolCallId: string;
        toolName: string;
    }, {
        type: "tool-call";
        args: Record<string, any>;
        toolCallId: string;
        toolName: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"tool-result">;
        toolCallId: z.ZodString;
        toolName: z.ZodString;
        args: z.ZodRecord<z.ZodString, z.ZodAny>;
        result: z.ZodAny;
    }, "strip", z.ZodTypeAny, {
        type: "tool-result";
        args: Record<string, any>;
        toolCallId: string;
        toolName: string;
        result?: any;
    }, {
        type: "tool-result";
        args: Record<string, any>;
        toolCallId: string;
        toolName: string;
        result?: any;
    }>]>, "many">>;
    attachments: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    userId: z.ZodOptional<z.ZodString>;
    userName: z.ZodOptional<z.ZodString>;
    avatarUrl: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    role: "user" | "assistant";
    content: string;
    createdAt: string;
    userId?: string | undefined;
    avatarUrl?: string | undefined;
    streamObjects?: ({
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
    })[] | undefined;
    attachments?: string[] | undefined;
    userName?: string | undefined;
}, {
    id: string;
    role: "user" | "assistant";
    content: string;
    createdAt: string;
    userId?: string | undefined;
    avatarUrl?: string | undefined;
    streamObjects?: ({
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
    })[] | undefined;
    attachments?: string[] | undefined;
    userName?: string | undefined;
}>, "many">;
export type ChatMessage = z.infer<typeof ChatMessageSchema>;
export type ChatAction = {
    action: string;
    messages: ChatMessage[];
    sessionId: string;
    createdAt: string;
};
export type HistoryMessage = ChatMessage | ChatAction;
export type MessageRole = 'user' | 'assistant';
export type MessageUserInfo = {
    userId?: string;
    userName?: string;
    avatarUrl?: string;
};
export declare function isChatAction(item: HistoryMessage): item is ChatAction;
export declare function isChatMessage(item: HistoryMessage): item is ChatMessage;
export type ChatStatus = 'loading' | 'success' | 'error' | 'idle' | 'transmitting';
export {};
//# sourceMappingURL=type.d.ts.map