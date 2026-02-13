import { DebugLogger } from '@affine/debug';
import { ObjectPool, Service } from '@toeverything/infra';
import { WorkspaceInitialized } from '../events';
import { WorkspaceScope } from '../scopes/workspace';
import { WorkspaceService } from './workspace';
const logger = new DebugLogger('affine:workspace-repository');
export class WorkspaceRepositoryService extends Service {
    constructor(flavoursService, profileRepo, workspacesListService) {
        super();
        this.flavoursService = flavoursService;
        this.profileRepo = profileRepo;
        this.workspacesListService = workspacesListService;
        this.pool = new ObjectPool({
            onDelete(workspace) {
                workspace.scope.dispose();
            },
            onDangling(workspace) {
                return workspace.canGracefulStop;
            },
        });
        /**
         * open workspace reference by metadata.
         *
         * You basically don't need to call this function directly, use the react hook `useWorkspace(metadata)` instead.
         *
         * @returns the workspace reference and a release function, don't forget to call release function when you don't
         * need the workspace anymore.
         */
        this.open = (options, customEngineWorkerInitOptions) => {
            if (options.isSharedMode) {
                const workspace = this.instantiate(options, customEngineWorkerInitOptions);
                return {
                    workspace,
                    dispose: () => {
                        workspace.scope.dispose();
                    },
                };
            }
            const exist = this.pool.get(options.metadata.id);
            if (exist) {
                return {
                    workspace: exist.obj,
                    dispose: exist.release,
                };
            }
            const workspace = this.instantiate(options, customEngineWorkerInitOptions);
            const ref = this.pool.put(workspace.meta.id, workspace);
            return {
                workspace: ref.obj,
                dispose: ref.release,
            };
        };
        this.openByWorkspaceId = (workspaceId) => {
            const workspaceMetadata = this.workspacesListService.list.workspace$(workspaceId).value;
            return workspaceMetadata && this.open({ metadata: workspaceMetadata });
        };
    }
    instantiate(openOptions, customEngineWorkerInitOptions) {
        logger.info(`open workspace [${openOptions.metadata.flavour}] ${openOptions.metadata.id} `);
        const flavourProvider = this.flavoursService.flavours$.value.find(p => p.flavour === openOptions.metadata.flavour);
        const engineWorkerInitOptions = customEngineWorkerInitOptions ??
            flavourProvider?.getEngineWorkerInitOptions(openOptions.metadata.id);
        if (!engineWorkerInitOptions) {
            throw new Error(`Unknown workspace flavour: ${openOptions.metadata.flavour}`);
        }
        const workspaceScope = this.framework.createScope(WorkspaceScope, {
            openOptions,
            engineWorkerInitOptions,
        });
        const workspace = workspaceScope.get(WorkspaceService).workspace;
        workspace.engine.start();
        workspaceScope.emitEvent(WorkspaceInitialized, workspace);
        flavourProvider?.onWorkspaceInitialized?.(workspace);
        this.profileRepo
            .getProfile(openOptions.metadata)
            .syncWithWorkspace(workspace);
        return workspace;
    }
}
//# sourceMappingURL=repo.js.map