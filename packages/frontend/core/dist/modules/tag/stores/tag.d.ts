import type { DocsPropertiesMeta } from '@blocksuite/affine/store';
import { LiveData, Store } from '@toeverything/infra';
import type { WorkspaceService } from '../../workspace';
export type Tag = {
    value: string;
    id: string;
    color: string;
    createDate?: number | Date | undefined;
    updateDate?: number | Date | undefined;
    parentId?: string | undefined;
};
export declare class TagStore extends Store {
    private readonly workspaceService;
    get properties(): DocsPropertiesMeta;
    tagOptions$: LiveData<any[]>;
    subscribe(cb: () => void): () => void;
    constructor(workspaceService: WorkspaceService);
    watchTagIds(): import("rxjs").Observable<any[]>;
    createNewTag(value: string, color: string): string;
    updateProperties: (properties: DocsPropertiesMeta) => void;
    updateTagOptions: (options: Tag[]) => void;
    updateTagOption: (id: string, option: Tag) => void;
    removeTagOption: (id: string) => void;
    updatePageTags: (pageId: string, tags: string[]) => void;
    deleteTag(id: string): void;
    watchTagInfo(id: string): LiveData<Tag | undefined>;
    updateTagInfo(id: string, tagInfo: Partial<Tag>): void;
    watchTagPageIds(id: string): import("rxjs").Observable<string[]>;
}
//# sourceMappingURL=tag.d.ts.map