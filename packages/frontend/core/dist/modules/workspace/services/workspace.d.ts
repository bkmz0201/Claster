import { Service } from '@toeverything/infra';
import { Workspace } from '../entities/workspace';
export declare class WorkspaceService extends Service {
    _workspace: Workspace | null;
    get workspace(): Workspace;
    dispose(): void;
}
//# sourceMappingURL=workspace.d.ts.map