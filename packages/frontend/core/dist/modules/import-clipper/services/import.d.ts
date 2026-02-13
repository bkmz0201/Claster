import { Service } from '@toeverything/infra';
import { type WorkspaceMetadata, type WorkspacesService } from '../../workspace';
export interface ClipperInput {
    title: string;
    contentMarkdown: string;
    contentHtml: string;
    attachments: Record<string, Blob>;
    workspace?: 'select-by-user' | 'last-open-workspace';
}
export declare class ImportClipperService extends Service {
    private readonly workspacesService;
    constructor(workspacesService: WorkspacesService);
    importToWorkspace(workspaceMetadata: WorkspaceMetadata, clipperInput: ClipperInput): Promise<string>;
    importToNewWorkspace(flavour: string, workspaceName: string, clipperInput: ClipperInput): Promise<{
        workspaceId: string;
        docId: string;
    }>;
}
//# sourceMappingURL=import.d.ts.map