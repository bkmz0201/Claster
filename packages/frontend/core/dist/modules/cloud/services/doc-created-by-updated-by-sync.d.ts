import { LiveData, Service } from '@toeverything/infra';
import type { DocsService } from '../../doc';
import type { WorkspacePermissionService } from '../../permissions';
import type { WorkspaceService } from '../../workspace';
import type { DocCreatedByUpdatedBySyncStore } from '../stores/doc-created-by-updated-by-sync';
/**
 * This service is used to sync createdBy and updatedBy data from the cloud to local doc properties.
 *
 * # When sync is needed
 *
 * 1. When the user is an owner or admin
 * 2. When the root doc sync is complete
 * 3. When a doc is missing createdBy data
 * 4. When workspace has not been marked as `DocCreatedByUpdatedBySynced`
 */
export declare class DocCreatedByUpdatedBySyncService extends Service {
    private readonly workspaceService;
    private readonly docsService;
    private readonly workspacePermissionService;
    private readonly docCreatedByUpdatedBySyncStore;
    constructor(workspaceService: WorkspaceService, docsService: DocsService, workspacePermissionService: WorkspacePermissionService, docCreatedByUpdatedBySyncStore: DocCreatedByUpdatedBySyncStore);
    syncing$: LiveData<boolean>;
    error$: LiveData<any>;
    progress$: LiveData<number>;
    sync: import("@toeverything/infra").Effect<unknown>;
    private readonly workspaceRootDocSynced$;
    private readonly isOwnerOrAdmin$;
    private readonly missingCreatedBy$;
    private readonly markedSynced$;
    needSync$: LiveData<boolean | null>;
    dispose(): void;
}
//# sourceMappingURL=doc-created-by-updated-by-sync.d.ts.map