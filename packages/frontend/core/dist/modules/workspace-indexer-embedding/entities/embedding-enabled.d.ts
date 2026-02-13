import type { WorkspaceService } from '@affine/core/modules/workspace';
import { Entity, LiveData } from '@toeverything/infra';
import type { EmbeddingStore } from '../stores/embedding';
export declare class EmbeddingEnabled extends Entity {
    private readonly workspaceService;
    private readonly store;
    enabled$: LiveData<boolean | null>;
    loading$: LiveData<boolean>;
    error$: LiveData<any>;
    constructor(workspaceService: WorkspaceService, store: EmbeddingStore);
    getEnabled: import("@toeverything/infra").Effect<unknown>;
    setEnabled: (enabled: boolean) => Promise<void>;
    dispose(): void;
}
//# sourceMappingURL=embedding-enabled.d.ts.map