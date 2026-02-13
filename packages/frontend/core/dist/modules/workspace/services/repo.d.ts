import type { WorkerInitOptions } from '@affine/nbstore/worker/client';
import { ObjectPool, Service } from '@toeverything/infra';
import type { Workspace } from '../entities/workspace';
import type { WorkspaceOpenOptions } from '../open-options';
import type { WorkspaceFlavoursService } from './flavours';
import type { WorkspaceListService } from './list';
import type { WorkspaceProfileService } from './profile';
export declare class WorkspaceRepositoryService extends Service {
    private readonly flavoursService;
    private readonly profileRepo;
    private readonly workspacesListService;
    constructor(flavoursService: WorkspaceFlavoursService, profileRepo: WorkspaceProfileService, workspacesListService: WorkspaceListService);
    pool: ObjectPool<string, Workspace>;
    /**
     * open workspace reference by metadata.
     *
     * You basically don't need to call this function directly, use the react hook `useWorkspace(metadata)` instead.
     *
     * @returns the workspace reference and a release function, don't forget to call release function when you don't
     * need the workspace anymore.
     */
    open: (options: WorkspaceOpenOptions, customEngineWorkerInitOptions?: WorkerInitOptions) => {
        workspace: Workspace;
        dispose: () => void;
    };
    openByWorkspaceId: (workspaceId: string) => {
        workspace: Workspace;
        dispose: () => void;
    } | undefined;
    instantiate(openOptions: WorkspaceOpenOptions, customEngineWorkerInitOptions?: WorkerInitOptions): Workspace;
}
//# sourceMappingURL=repo.d.ts.map