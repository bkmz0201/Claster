import { Service } from '@toeverything/infra';
import { FolderTree } from '../entities/folder-tree';
export class OrganizeService extends Service {
    constructor() {
        super(...arguments);
        this.folderTree = this.framework.createEntity(FolderTree);
    }
}
//# sourceMappingURL=organize.js.map