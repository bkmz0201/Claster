import type { GetWorkspacePageMetaByIdQuery } from '@affine/graphql';
import { Entity, LiveData } from '@toeverything/infra';
import type { DocService } from '../../doc';
import type { GlobalCache } from '../../storage';
import type { CloudDocMetaStore } from '../stores/cloud-doc-meta';
export type CloudDocMetaType = GetWorkspacePageMetaByIdQuery['workspace']['pageMeta'];
export declare class CloudDocMeta extends Entity {
    private readonly store;
    private readonly docService;
    private readonly cache;
    constructor(store: CloudDocMetaStore, docService: DocService, cache: GlobalCache);
    readonly docId: string;
    readonly workspaceId: string;
    readonly cacheKey: string;
    meta$: LiveData<{
        __typename?: "WorkspaceDocMeta";
        createdAt: string;
        updatedAt: string;
        createdBy: {
            __typename?: "EditorType";
            name: string;
            avatarUrl: string | null;
        } | null;
        updatedBy: {
            __typename?: "EditorType";
            name: string;
            avatarUrl: string | null;
        } | null;
    } | undefined>;
    isRevalidating$: LiveData<boolean>;
    error$: LiveData<any>;
    revalidate: import("@toeverything/infra").Effect<unknown>;
}
//# sourceMappingURL=cloud-doc-meta.d.ts.map