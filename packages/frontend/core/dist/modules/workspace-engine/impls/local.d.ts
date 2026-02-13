import { LiveData, Service } from '@toeverything/infra';
import type { WorkspaceFlavourProvider, WorkspaceFlavoursProvider } from '../../workspace';
export declare const LOCAL_WORKSPACE_LOCAL_STORAGE_KEY = "affine-local-workspace";
export declare function getLocalWorkspaceIds(): string[];
export declare function setLocalWorkspaceIds(idsOrUpdater: string[] | ((ids: string[]) => string[])): void;
export declare class LocalWorkspaceFlavoursProvider extends Service implements WorkspaceFlavoursProvider {
    constructor();
    workspaceFlavours$: LiveData<WorkspaceFlavourProvider[]>;
}
//# sourceMappingURL=local.d.ts.map