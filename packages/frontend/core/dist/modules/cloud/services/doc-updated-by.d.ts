import { Service } from '@toeverything/infra';
import type { Doc } from '../../doc';
import type { WorkspaceServerService } from './workspace-server';
export declare class DocUpdatedByService extends Service {
    private readonly workspaceServerService;
    constructor(workspaceServerService: WorkspaceServerService);
    onDocInitialized(doc: Doc): void;
}
//# sourceMappingURL=doc-updated-by.d.ts.map