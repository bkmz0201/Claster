import type { BlobStorage, DocStorage } from '@affine/nbstore';
import type { Workspace } from '@blocksuite/affine/store';
import { Service } from '@toeverything/infra';
import type { WorkspaceFlavoursService } from './flavours';
export declare class WorkspaceFactoryService extends Service {
    private readonly flavoursService;
    constructor(flavoursService: WorkspaceFlavoursService);
    /**
     * create workspace
     * @param flavour workspace flavour
     * @param initial callback to put initial data to workspace
     * @returns workspace id
     */
    create: (flavour: string, initial?: (docCollection: Workspace, blobFrontend: BlobStorage, docFrontend: DocStorage) => Promise<void>) => Promise<import("..").WorkspaceMetadata>;
}
//# sourceMappingURL=factory.d.ts.map