import '../blocksuite/block-suite-editor';
import { type WorkspacesService } from '../modules/workspace';
export declare function buildShowcaseWorkspace(workspacesService: WorkspacesService, flavour: string, workspaceName: string): Promise<{
    meta: import("../modules/workspace").WorkspaceMetadata;
    defaultDocId: string | undefined;
}>;
export declare function createFirstAppData(workspacesService: WorkspacesService): Promise<{
    meta: import("../modules/workspace").WorkspaceMetadata;
    defaultPageId: string | undefined;
} | undefined>;
//# sourceMappingURL=first-app-data.d.ts.map