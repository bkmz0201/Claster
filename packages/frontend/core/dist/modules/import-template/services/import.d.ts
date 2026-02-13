import type { DocMode } from '@blocksuite/affine/model';
import { Service } from '@toeverything/infra';
import { type WorkspaceMetadata, type WorkspacesService } from '../../workspace';
export declare class ImportTemplateService extends Service {
    private readonly workspacesService;
    constructor(workspacesService: WorkspacesService);
    importToWorkspace(workspaceMetadata: WorkspaceMetadata, docBinary: Uint8Array, mode: DocMode): Promise<string>;
    importToNewWorkspace(flavour: string, workspaceName: string, docBinary: Uint8Array): Promise<{
        workspaceId: string;
        docId: string;
    }>;
}
//# sourceMappingURL=import.d.ts.map