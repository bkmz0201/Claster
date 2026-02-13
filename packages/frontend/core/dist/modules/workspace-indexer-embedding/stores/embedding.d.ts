import type { WorkspaceServerService } from '@affine/core/modules/cloud';
import { type PaginationInput } from '@affine/graphql';
import { Store } from '@toeverything/infra';
export declare class EmbeddingStore extends Store {
    private readonly workspaceServerService;
    constructor(workspaceServerService: WorkspaceServerService);
    getEnabled(workspaceId: string, signal?: AbortSignal): Promise<boolean>;
    updateEnabled(workspaceId: string, enabled: boolean, signal?: AbortSignal): Promise<void>;
    getIgnoredDocs(workspaceId: string, signal?: AbortSignal): Promise<{
        __typename?: "CopilotWorkspaceIgnoredDoc";
        docId: string;
        createdAt: string;
    }[]>;
    updateIgnoredDocs(workspaceId: string, add: string[], remove: string[], signal?: AbortSignal): Promise<void>;
    addEmbeddingFile(workspaceId: string, blob: File, signal?: AbortSignal): Promise<void>;
    addEmbeddingFiles(workspaceId: string, files: File[], signal?: AbortSignal): Promise<void>;
    removeEmbeddingFile(workspaceId: string, fileId: string, signal?: AbortSignal): Promise<void>;
    removeEmbeddingFiles(workspaceId: string, fileIds: string[], signal?: AbortSignal): Promise<void>;
    getEmbeddingFiles(workspaceId: string, pagination: PaginationInput, signal?: AbortSignal): Promise<{
        __typename?: "PaginatedCopilotWorkspaceFileType";
        totalCount: number;
        pageInfo: {
            __typename?: "PageInfo";
            endCursor: string | null;
            hasNextPage: boolean;
        };
        edges: Array<{
            __typename?: "CopilotWorkspaceFileTypeEdge";
            node: {
                __typename?: "CopilotWorkspaceFile";
                fileId: string;
                fileName: string;
                blobId: string;
                mimeType: string;
                size: number;
                createdAt: string;
            };
        }>;
    }>;
    getEmbeddingProgress(workspaceId: string, signal?: AbortSignal): Promise<{
        __typename?: "ContextWorkspaceEmbeddingStatus";
        total: number;
        embedded: number;
    }>;
}
//# sourceMappingURL=embedding.d.ts.map