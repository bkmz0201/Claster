import type { WorkspaceService } from '@affine/core/modules/workspace';
import { Entity, LiveData } from '@toeverything/infra';
import type { EmbeddingStore } from '../stores/embedding';
import type { LocalAttachmentFile } from '../types';
interface Progress {
    embedded: number;
    total: number;
}
export declare class EmbeddingProgress extends Entity {
    private readonly workspaceService;
    private readonly store;
    progress$: LiveData<Progress | null>;
    error$: LiveData<any>;
    loading$: LiveData<boolean>;
    private readonly EMBEDDING_PROGRESS_POLL_INTERVAL;
    private readonly stopEmbeddingProgress$;
    uploadingAttachments$: LiveData<LocalAttachmentFile[]>;
    constructor(workspaceService: WorkspaceService, store: EmbeddingStore);
    startEmbeddingProgressPolling(): void;
    stopEmbeddingProgressPolling(): void;
    getEmbeddingProgress: import("@toeverything/infra").Effect<unknown>;
    dispose(): void;
}
export {};
//# sourceMappingURL=embedding-progress.d.ts.map