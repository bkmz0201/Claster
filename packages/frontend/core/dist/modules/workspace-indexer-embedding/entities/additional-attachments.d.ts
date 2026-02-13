import type { WorkspaceService } from '@affine/core/modules/workspace';
import type { PaginationInput } from '@affine/graphql';
import { Entity, LiveData } from '@toeverything/infra';
import type { EmbeddingStore } from '../stores/embedding';
import type { LocalAttachmentFile, PersistedAttachmentFile } from '../types';
interface Attachments {
    totalCount: number;
    pageInfo: {
        endCursor: string | null;
        hasNextPage: boolean;
    };
    edges: {
        node: PersistedAttachmentFile;
    }[];
}
export declare class AdditionalAttachments extends Entity {
    private readonly workspaceService;
    private readonly store;
    error$: LiveData<any>;
    attachments$: LiveData<Attachments>;
    loading$: LiveData<boolean>;
    uploadingAttachments$: LiveData<LocalAttachmentFile[]>;
    constructor(workspaceService: WorkspaceService, store: EmbeddingStore);
    mergedAttachments$: LiveData<(PersistedAttachmentFile | LocalAttachmentFile)[]>;
    getAttachments: import("@toeverything/infra").Effect<PaginationInput>;
    addAttachments: (files: File[]) => void;
    removeAttachment: (id: string) => Promise<void>;
    dispose(): void;
}
export {};
//# sourceMappingURL=additional-attachments.d.ts.map