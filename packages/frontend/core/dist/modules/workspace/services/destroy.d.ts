import { Service } from '@toeverything/infra';
import type { WorkspaceMetadata } from '../metadata';
import type { WorkspaceFlavoursService } from './flavours';
export declare class WorkspaceDestroyService extends Service {
    private readonly flavoursService;
    constructor(flavoursService: WorkspaceFlavoursService);
    deleteWorkspace: (metadata: WorkspaceMetadata) => Promise<void>;
}
//# sourceMappingURL=destroy.d.ts.map