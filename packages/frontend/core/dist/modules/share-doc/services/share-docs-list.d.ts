import { Service } from '@toeverything/infra';
import type { WorkspaceService } from '../../workspace';
import { ShareDocsList } from '../entities/share-docs-list';
export declare class ShareDocsListService extends Service {
    private readonly workspaceService;
    constructor(workspaceService: WorkspaceService);
    shareDocs: ShareDocsList | null;
    dispose(): void;
}
//# sourceMappingURL=share-docs-list.d.ts.map