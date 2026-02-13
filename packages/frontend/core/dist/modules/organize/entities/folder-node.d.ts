import { Entity, LiveData } from '@toeverything/infra';
import type { FolderStore } from '../stores/folder';
export declare class FolderNode extends Entity<{
    id: string | null;
}> {
    readonly store: FolderStore;
    id: string | null;
    info$: LiveData<{
        data: string;
        type: (string & {}) | "folder" | "doc" | "tag" | "collection";
        index: string;
        id: string;
        parentId?: string | null;
    } | null>;
    type$: LiveData<(string & {}) | "" | "doc" | "collection" | "tag" | "folder">;
    data$: LiveData<string | undefined>;
    name$: LiveData<string>;
    children$: LiveData<FolderNode[]>;
    sortedChildren$: LiveData<FolderNode[]>;
    index$: LiveData<string>;
    constructor(store: FolderStore);
    contains(childId: string | null): boolean;
    beChildOf(parentId: string | null): boolean;
    filterInvalidChildren(child: {
        type: string;
    }): boolean;
    createFolder(name: string, index: string): string;
    createLink(type: 'doc' | 'tag' | 'collection', targetId: string, index: string): void;
    delete(): void;
    moveHere(childId: string, index: string): void;
    rename(name: string): void;
    indexAt(at: 'before' | 'after', targetId?: string): string;
}
//# sourceMappingURL=folder-node.d.ts.map