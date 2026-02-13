import { Service } from '@toeverything/infra';
import { ShareDocsList } from '../entities/share-docs-list';
export class ShareDocsListService extends Service {
    constructor(workspaceService) {
        super();
        this.workspaceService = workspaceService;
        this.shareDocs = this.workspaceService.workspace.flavour !== 'local'
            ? this.framework.createEntity(ShareDocsList)
            : null;
    }
    dispose() {
        this.shareDocs?.dispose();
    }
}
//# sourceMappingURL=share-docs-list.js.map