import type { TagMeta } from '@affine/core/components/page-list';
import type { DocMeta } from '@blocksuite/affine/store';
import type { LinkedMenuGroup } from '@blocksuite/affine/widgets/linked-doc';
import { Service } from '@toeverything/infra';
import type { CollectionMeta, CollectionService } from '../../collection';
import type { DocDisplayMetaService } from '../../doc-display-meta';
import type { DocsSearchService } from '../../docs-search';
import { type RecentDocsService } from '../../quicksearch';
import type { TagService } from '../../tag';
import type { WorkspaceService } from '../../workspace';
export type SearchDocMenuAction = (meta: DocMeta) => Promise<void> | void;
export type SearchTagMenuAction = (tagId: TagMeta) => Promise<void> | void;
export type SearchCollectionMenuAction = (collection: CollectionMeta) => Promise<void> | void;
export declare class SearchMenuService extends Service {
    private readonly workspaceService;
    private readonly docDisplayMetaService;
    private readonly recentDocsService;
    private readonly docsSearch;
    private readonly tagService;
    private readonly collectionService;
    constructor(workspaceService: WorkspaceService, docDisplayMetaService: DocDisplayMetaService, recentDocsService: RecentDocsService, docsSearch: DocsSearchService, tagService: TagService, collectionService: CollectionService);
    getDocMenuGroup(query: string, action: SearchDocMenuAction, abortSignal: AbortSignal): LinkedMenuGroup;
    private getRecentDocMenuGroup;
    private getSearchDocMenuGroup;
    private searchDocs$;
    private toDocMenuItem;
    private highlightFuseTitle;
    getTagMenuGroup(query: string, action: SearchTagMenuAction, _abortSignal: AbortSignal): LinkedMenuGroup;
    private toTagMenuItem;
    getCollectionMenuGroup(query: string, action: SearchCollectionMenuAction, _abortSignal: AbortSignal): LinkedMenuGroup;
    private toCollectionMenuItem;
}
//# sourceMappingURL=index.d.ts.map