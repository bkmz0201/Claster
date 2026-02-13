import { Service } from '@toeverything/infra';
import type { WorkspaceMetadata } from '..';
import type { WorkspaceDestroyService } from './destroy';
import type { WorkspaceFactoryService } from './factory';
import type { WorkspaceFlavoursService } from './flavours';
import type { WorkspaceListService } from './list';
import type { WorkspaceProfileService } from './profile';
import type { WorkspaceRepositoryService } from './repo';
import type { WorkspaceTransformService } from './transform';
export declare class WorkspacesService extends Service {
    private readonly flavoursService;
    private readonly listService;
    private readonly profileRepo;
    private readonly transform;
    private readonly workspaceRepo;
    private readonly workspaceFactory;
    private readonly destroy;
    get list(): import("../entities/list").WorkspaceList;
    constructor(flavoursService: WorkspaceFlavoursService, listService: WorkspaceListService, profileRepo: WorkspaceProfileService, transform: WorkspaceTransformService, workspaceRepo: WorkspaceRepositoryService, workspaceFactory: WorkspaceFactoryService, destroy: WorkspaceDestroyService);
    get deleteWorkspace(): (metadata: WorkspaceMetadata) => Promise<void>;
    get getProfile(): (metadata: WorkspaceMetadata) => import("../entities/profile").WorkspaceProfile;
    get transformLocalToCloud(): (local: import("..").Workspace, accountId: string, flavour: string) => Promise<WorkspaceMetadata>;
    get open(): (options: import("..").WorkspaceOpenOptions, customEngineWorkerInitOptions?: import("@affine/nbstore/worker/client").WorkerInitOptions) => {
        workspace: import("..").Workspace;
        dispose: () => void;
    };
    get openByWorkspaceId(): (workspaceId: string) => {
        workspace: import("..").Workspace;
        dispose: () => void;
    } | undefined;
    get create(): (flavour: string, initial?: (docCollection: import("@blocksuite/store").Workspace, blobFrontend: import("@affine/nbstore").BlobStorage, docFrontend: import("@affine/nbstore").DocStorage) => Promise<void>) => Promise<WorkspaceMetadata>;
    getWorkspaceBlob(meta: WorkspaceMetadata, blob: string): Promise<Blob | null | undefined>;
    getWorkspaceFlavourProvider(meta: WorkspaceMetadata): import("..").WorkspaceFlavourProvider | undefined;
    getAllWorkspaceProfile(): import("../entities/profile").WorkspaceProfile[];
}
//# sourceMappingURL=workspaces.d.ts.map