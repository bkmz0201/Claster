import { Service } from '@toeverything/infra';
import type { Workspace } from '../entities/workspace';
import type { WorkspaceMetadata } from '../metadata';
import type { WorkspaceDestroyService } from './destroy';
import type { WorkspaceFactoryService } from './factory';
export declare class WorkspaceTransformService extends Service {
    private readonly factory;
    private readonly destroy;
    constructor(factory: WorkspaceFactoryService, destroy: WorkspaceDestroyService);
    /**
     * helper function to transform local workspace to cloud workspace
     *
     * @param accountId - all local user data will be transformed to this account
     */
    transformLocalToCloud: (local: Workspace, accountId: string, flavour: string) => Promise<WorkspaceMetadata>;
}
//# sourceMappingURL=transform.d.ts.map