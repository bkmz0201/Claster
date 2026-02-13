import type { AIToolsConfig } from '@affine/core/modules/ai-button';
import { addContextBlobMutation, addContextCategoryMutation, addContextDocMutation, addContextFileMutation, createCopilotMessageMutation, createCopilotSessionMutation, forkCopilotSessionMutation, getCopilotHistoriesQuery, getCopilotHistoryIdsQuery, getCopilotSessionsQuery, type GraphQLQuery, type PaginationInput, type QueryOptions, type QueryResponse, removeContextBlobMutation, removeContextCategoryMutation, removeContextDocMutation, removeContextFileMutation, type RequestOptions, updateCopilotSessionMutation } from '@affine/graphql';
import { GeneralNetworkError, PaymentRequiredError, UnauthorizedError } from './error';
export declare enum Endpoint {
    Stream = "stream",
    StreamObject = "stream-object",
    Workflow = "workflow",
    Images = "images"
}
type OptionsField<T extends GraphQLQuery> = RequestOptions<T>['variables'] extends {
    options: infer U;
} ? U : never;
export declare function resolveError(err: any): UnauthorizedError | PaymentRequiredError | GeneralNetworkError;
export declare function handleError(src: any): UnauthorizedError | PaymentRequiredError | GeneralNetworkError;
export declare class CopilotClient {
    readonly gql: <Query extends GraphQLQuery>(options: QueryOptions<Query>) => Promise<QueryResponse<Query>>;
    readonly fetcher: (input: string, init?: RequestInit) => Promise<Response>;
    readonly eventSource: (url: string, eventSourceInitDict?: EventSourceInit) => EventSource;
    constructor(gql: <Query extends GraphQLQuery>(options: QueryOptions<Query>) => Promise<QueryResponse<Query>>, fetcher: (input: string, init?: RequestInit) => Promise<Response>, eventSource: (url: string, eventSourceInitDict?: EventSourceInit) => EventSource);
    createSession(options: OptionsField<typeof createCopilotSessionMutation>): Promise<string>;
    updateSession(options: OptionsField<typeof updateCopilotSessionMutation>): Promise<string>;
    forkSession(options: OptionsField<typeof forkCopilotSessionMutation>): Promise<string>;
    createMessage(options: OptionsField<typeof createCopilotMessageMutation>): Promise<string>;
    getSession(workspaceId: string, sessionId: string): Promise<{
        __typename?: "CopilotHistories";
        sessionId: string;
        workspaceId: string;
        docId: string | null;
        parentSessionId: string | null;
        promptName: string;
        model: string;
        optionalModels: Array<string>;
        action: string | null;
        pinned: boolean;
        title: string | null;
        tokens: number;
        createdAt: string;
        updatedAt: string;
        messages: Array<{
            __typename?: "ChatMessage";
            id: string | null;
            role: string;
            content: string;
            attachments: Array<string> | null;
            createdAt: string;
            streamObjects: Array<{
                __typename?: "StreamObject";
                type: string;
                textDelta: string | null;
                toolCallId: string | null;
                toolName: string | null;
                args: Record<string, string> | null;
                result: Record<string, string> | null;
            }> | null;
        }>;
    } | undefined>;
    getSessions(workspaceId: string, pagination: PaginationInput, docId?: string, options?: RequestOptions<typeof getCopilotSessionsQuery>['variables']['options'], signal?: AbortSignal): Promise<{
        __typename?: "CopilotHistories";
        sessionId: string;
        workspaceId: string;
        docId: string | null;
        parentSessionId: string | null;
        promptName: string;
        model: string;
        optionalModels: Array<string>;
        action: string | null;
        pinned: boolean;
        title: string | null;
        tokens: number;
        createdAt: string;
        updatedAt: string;
        messages: Array<{
            __typename?: "ChatMessage";
            id: string | null;
            role: string;
            content: string;
            attachments: Array<string> | null;
            createdAt: string;
            streamObjects: Array<{
                __typename?: "StreamObject";
                type: string;
                textDelta: string | null;
                toolCallId: string | null;
                toolName: string | null;
                args: Record<string, string> | null;
                result: Record<string, string> | null;
            }> | null;
        }>;
    }[] | undefined>;
    getRecentSessions(workspaceId: string, limit?: number, offset?: number): Promise<{
        __typename?: "CopilotHistories";
        sessionId: string;
        workspaceId: string;
        docId: string | null;
        parentSessionId: string | null;
        promptName: string;
        model: string;
        optionalModels: Array<string>;
        action: string | null;
        pinned: boolean;
        title: string | null;
        tokens: number;
        createdAt: string;
        updatedAt: string;
        messages: Array<{
            __typename?: "ChatMessage";
            id: string | null;
            role: string;
            content: string;
            attachments: Array<string> | null;
            createdAt: string;
            streamObjects: Array<{
                __typename?: "StreamObject";
                type: string;
                textDelta: string | null;
                toolCallId: string | null;
                toolName: string | null;
                args: Record<string, string> | null;
                result: Record<string, string> | null;
            }> | null;
        }>;
    }[] | undefined>;
    getHistories(workspaceId: string, pagination: PaginationInput, docId?: string, options?: RequestOptions<typeof getCopilotHistoriesQuery>['variables']['options']): Promise<{
        __typename?: "CopilotHistories";
        sessionId: string;
        workspaceId: string;
        docId: string | null;
        parentSessionId: string | null;
        promptName: string;
        model: string;
        optionalModels: Array<string>;
        action: string | null;
        pinned: boolean;
        title: string | null;
        tokens: number;
        createdAt: string;
        updatedAt: string;
        messages: Array<{
            __typename?: "ChatMessage";
            id: string | null;
            role: string;
            content: string;
            attachments: Array<string> | null;
            createdAt: string;
            streamObjects: Array<{
                __typename?: "StreamObject";
                type: string;
                textDelta: string | null;
                toolCallId: string | null;
                toolName: string | null;
                args: Record<string, string> | null;
                result: Record<string, string> | null;
            }> | null;
        }>;
    }[] | undefined>;
    getHistoryIds(workspaceId: string, pagination: PaginationInput, docId?: string, options?: RequestOptions<typeof getCopilotHistoryIdsQuery>['variables']['options']): Promise<{
        __typename?: "CopilotHistories";
        sessionId: string;
        pinned: boolean;
        messages: Array<{
            __typename?: "ChatMessage";
            id: string | null;
            role: string;
            createdAt: string;
        }>;
    }[] | undefined>;
    cleanupSessions(input: {
        workspaceId: string;
        docId: string | undefined;
        sessionIds: string[];
    }): Promise<string[]>;
    createContext(workspaceId: string, sessionId: string): Promise<string>;
    getContextId(workspaceId: string, sessionId: string): Promise<string | undefined>;
    addContextDoc(options: OptionsField<typeof addContextDocMutation>): Promise<{
        __typename?: "CopilotContextDoc";
        id: string;
        createdAt: number;
        status: import("@affine/graphql").ContextEmbedStatus | null;
    }>;
    removeContextDoc(options: OptionsField<typeof removeContextDocMutation>): Promise<boolean>;
    addContextFile(content: File, options: OptionsField<typeof addContextFileMutation>): Promise<{
        __typename?: "CopilotContextFile";
        id: string;
        createdAt: number;
        name: string;
        mimeType: string;
        chunkSize: number;
        error: string | null;
        status: import("@affine/graphql").ContextEmbedStatus;
        blobId: string;
    }>;
    removeContextFile(options: OptionsField<typeof removeContextFileMutation>): Promise<boolean>;
    addContextCategory(options: OptionsField<typeof addContextCategoryMutation>): Promise<{
        __typename?: "CopilotContextCategory";
        id: string;
        createdAt: number;
        type: import("@affine/graphql").ContextCategories;
        docs: Array<{
            __typename?: "CopilotContextDoc";
            id: string;
            createdAt: number;
            status: import("@affine/graphql").ContextEmbedStatus | null;
        }>;
    }>;
    removeContextCategory(options: OptionsField<typeof removeContextCategoryMutation>): Promise<boolean>;
    getContextDocsAndFiles(workspaceId: string, sessionId: string, contextId: string): Promise<{
        __typename?: "CopilotContext";
        blobs: Array<{
            __typename?: "CopilotContextBlob";
            id: string;
            status: import("@affine/graphql").ContextEmbedStatus | null;
            createdAt: number;
        }>;
        docs: Array<{
            __typename?: "CopilotContextDoc";
            id: string;
            status: import("@affine/graphql").ContextEmbedStatus | null;
            createdAt: number;
        }>;
        files: Array<{
            __typename?: "CopilotContextFile";
            id: string;
            name: string;
            mimeType: string;
            blobId: string;
            chunkSize: number;
            error: string | null;
            status: import("@affine/graphql").ContextEmbedStatus;
            createdAt: number;
        }>;
        tags: Array<{
            __typename?: "CopilotContextCategory";
            type: import("@affine/graphql").ContextCategories;
            id: string;
            createdAt: number;
            docs: Array<{
                __typename?: "CopilotContextDoc";
                id: string;
                status: import("@affine/graphql").ContextEmbedStatus | null;
                createdAt: number;
            }>;
        }>;
        collections: Array<{
            __typename?: "CopilotContextCategory";
            type: import("@affine/graphql").ContextCategories;
            id: string;
            createdAt: number;
            docs: Array<{
                __typename?: "CopilotContextDoc";
                id: string;
                status: import("@affine/graphql").ContextEmbedStatus | null;
                createdAt: number;
            }>;
        }>;
    } | undefined>;
    matchContext(content: string, contextId?: string, workspaceId?: string, limit?: number, scopedThreshold?: number, threshold?: number): Promise<{
        files: {
            __typename?: "ContextMatchedFileChunk";
            fileId: string;
            blobId: string;
            name: string;
            mimeType: string;
            chunk: number;
            content: string;
            distance: number | null;
        }[] | undefined;
        docs: {
            __typename?: "ContextMatchedDocChunk";
            docId: string;
            chunk: number;
            content: string;
            distance: number | null;
        }[] | undefined;
    }>;
    chatText({ sessionId, messageId, reasoning, webSearch, modelId, toolsConfig, signal, }: {
        sessionId: string;
        messageId?: string;
        reasoning?: boolean;
        webSearch?: boolean;
        modelId?: string;
        toolsConfig?: AIToolsConfig;
        signal?: AbortSignal;
    }): Promise<string>;
    chatTextStream({ sessionId, messageId, reasoning, webSearch, modelId, toolsConfig, }: {
        sessionId: string;
        messageId?: string;
        reasoning?: boolean;
        webSearch?: boolean;
        modelId?: string;
        toolsConfig?: AIToolsConfig;
    }, endpoint?: Endpoint): EventSource;
    imagesStream(sessionId: string, messageId?: string, seed?: string, endpoint?: Endpoint): EventSource;
    paramsToQueryString(params: Record<string, string | boolean | undefined | Record<string, any>>): string;
    getEmbeddingStatus(workspaceId: string): Promise<{
        __typename?: "ContextWorkspaceEmbeddingStatus";
        total: number;
        embedded: number;
    }>;
    applyDocUpdates(workspaceId: string, docId: string, op: string, updates: string): Promise<string>;
    addContextBlob(options: OptionsField<typeof addContextBlobMutation>): Promise<{
        __typename?: "CopilotContextBlob";
        id: string;
        createdAt: number;
        status: import("@affine/graphql").ContextEmbedStatus | null;
    }>;
    removeContextBlob(options: OptionsField<typeof removeContextBlobMutation>): Promise<boolean>;
}
export {};
//# sourceMappingURL=copilot-client.d.ts.map