import { Entity, LiveData } from '@toeverything/infra';
import type { FolderStore } from '../stores/folder';
import { FolderNode } from './folder-node';
export declare class FolderTree extends Entity {
    private readonly folderStore;
    constructor(folderStore: FolderStore);
    readonly rootFolder: FolderNode;
    isLoading$: LiveData<boolean>;
    folderNode$(id: string): LiveData<FolderNode | null>;
}
//# sourceMappingURL=folder-tree.d.ts.map