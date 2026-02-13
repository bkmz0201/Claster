import { Entity, LiveData } from '@toeverything/infra';
import { map } from 'rxjs';
import { FolderNode } from './folder-node';
export class FolderTree extends Entity {
    constructor(folderStore) {
        super();
        this.folderStore = folderStore;
        this.rootFolder = this.framework.createEntity(FolderNode, {
            id: null,
        });
        this.isLoading$ = this.folderStore.watchIsLoading();
    }
    // get folder by id
    folderNode$(id) {
        return LiveData.from(this.folderStore.watchNodeInfo(id).pipe(map(info => {
            if (!info) {
                return null;
            }
            return this.framework.createEntity(FolderNode, {
                id,
            });
        })), null);
    }
}
//# sourceMappingURL=folder-tree.js.map