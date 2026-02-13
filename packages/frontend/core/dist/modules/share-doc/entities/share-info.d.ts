import type { PublicDocMode } from '@affine/graphql';
import { Entity, LiveData } from '@toeverything/infra';
import type { DocService } from '../../doc';
import type { WorkspaceService } from '../../workspace';
import type { ShareStore } from '../stores/share';
export declare class ShareInfo extends Entity {
    private readonly workspaceService;
    private readonly docService;
    private readonly store;
    info$: LiveData<{
        __typename?: "DocType";
        id: string;
        mode: PublicDocMode;
        defaultRole: import("@affine/graphql").DocRole;
        public: boolean;
        title: string | null;
        summary: string | null;
    } | null | undefined>;
    isShared$: LiveData<boolean | undefined>;
    sharedMode$: LiveData<PublicDocMode | null | undefined>;
    error$: LiveData<any>;
    isRevalidating$: LiveData<boolean>;
    constructor(workspaceService: WorkspaceService, docService: DocService, store: ShareStore);
    revalidate: import("@toeverything/infra").Effect<unknown>;
    waitForRevalidation(signal?: AbortSignal): Promise<boolean>;
    enableShare(mode: PublicDocMode): Promise<void>;
    changeShare(mode: PublicDocMode): Promise<void>;
    disableShare(): Promise<void>;
}
//# sourceMappingURL=share-info.d.ts.map