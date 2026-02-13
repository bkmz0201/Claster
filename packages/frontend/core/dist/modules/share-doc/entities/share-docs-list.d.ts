import { DebugLogger } from '@affine/debug';
import { Entity, LiveData } from '@toeverything/infra';
import type { GlobalCache } from '../../storage';
import type { WorkspaceService } from '../../workspace';
import type { ShareDocsStore } from '../stores/share-docs';
export declare const logger: DebugLogger;
export declare class ShareDocsList extends Entity {
    private readonly workspaceService;
    private readonly store;
    private readonly cache;
    list$: LiveData<{
        __typename?: "DocType";
        id: string;
        mode: import("@affine/graphql").PublicDocMode;
    }[]>;
    isLoading$: LiveData<boolean>;
    error$: LiveData<any>;
    constructor(workspaceService: WorkspaceService, store: ShareDocsStore, cache: GlobalCache);
    revalidate: import("@toeverything/infra").Effect<unknown>;
    dispose(): void;
}
//# sourceMappingURL=share-docs-list.d.ts.map