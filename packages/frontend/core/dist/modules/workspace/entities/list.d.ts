import { Entity, LiveData } from '@toeverything/infra';
import type { WorkspaceMetadata } from '../metadata';
import type { WorkspaceFlavoursService } from '../services/flavours';
export declare class WorkspaceList extends Entity {
    private readonly flavoursService;
    workspaces$: LiveData<WorkspaceMetadata[]>;
    isRevalidating$: LiveData<boolean>;
    workspace$(id: string): LiveData<WorkspaceMetadata | undefined>;
    constructor(flavoursService: WorkspaceFlavoursService);
    revalidate(): void;
    waitForRevalidation(signal?: AbortSignal): Promise<boolean>;
}
//# sourceMappingURL=list.d.ts.map