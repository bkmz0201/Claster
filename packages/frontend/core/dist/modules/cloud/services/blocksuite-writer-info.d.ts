import { Service } from '@toeverything/infra';
import { type Workspace } from '../../workspace';
import type { WorkspaceServerService } from './workspace-server';
/**
 * This service is used to set the writer info for the blocksuite editor.
 */
export declare class BlocksuiteWriterInfoService extends Service {
    private readonly workspaceServerService;
    constructor(workspaceServerService: WorkspaceServerService);
    onWorkspaceInitialized(workspace: Workspace): void;
}
//# sourceMappingURL=blocksuite-writer-info.d.ts.map