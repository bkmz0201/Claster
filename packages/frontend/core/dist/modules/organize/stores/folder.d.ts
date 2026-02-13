import { Store } from '@toeverything/infra';
import type { WorkspaceDBService } from '../../db';
export declare class FolderStore extends Store {
    private readonly dbService;
    constructor(dbService: WorkspaceDBService);
    watchNodeInfo(nodeId: string): import("rxjs").Observable<{
        data: string;
        type: string;
        index: string;
        id: string;
        parentId?: string | null | undefined;
    } | null>;
    watchNodeChildren(parentId: string | null): import("rxjs").Observable<{
        data: string;
        type: string;
        index: string;
        id: string;
        parentId?: string | null | undefined;
    }[]>;
    watchIsLoading(): import("@toeverything/infra").LiveData<boolean>;
    isAncestor(childId: string, ancestorId: string): boolean;
    createLink(parentId: string, type: 'doc' | 'tag' | 'collection', nodeId: string, index: string): void;
    renameNode(nodeId: string, name: string): void;
    createFolder(parentId: string | null, name: string, index: string): string;
    removeFolder(folderId: string): void;
    removeLink(linkId: string): void;
    moveNode(nodeId: string, parentId: string | null, index: string): void;
}
//# sourceMappingURL=folder.d.ts.map