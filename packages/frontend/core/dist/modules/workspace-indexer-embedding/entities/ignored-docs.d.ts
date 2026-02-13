import type { WorkspaceService } from '@affine/core/modules/workspace';
import { Entity, LiveData } from '@toeverything/infra';
import type { EmbeddingStore } from '../stores/embedding';
import type { IgnoredDoc } from '../types';
export declare class IgnoredDocs extends Entity {
    private readonly workspaceService;
    private readonly store;
    docs$: LiveData<IgnoredDoc[]>;
    error$: LiveData<any>;
    loading$: LiveData<boolean>;
    constructor(workspaceService: WorkspaceService, store: EmbeddingStore);
    getIgnoredDocs: import("@toeverything/infra").Effect<unknown>;
    updateIgnoredDocs: ({ add, remove, }: {
        add: string[];
        remove: string[];
    }) => Promise<void>;
    dispose(): void;
}
//# sourceMappingURL=ignored-docs.d.ts.map