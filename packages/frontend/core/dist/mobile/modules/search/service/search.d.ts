import { CollectionsQuickSearchSession, DocsQuickSearchSession, RecentDocsQuickSearchSession, TagsQuickSearchSession } from '@affine/core/modules/quicksearch';
import { Service } from '@toeverything/infra';
export declare class MobileSearchService extends Service {
    readonly recentDocs: RecentDocsQuickSearchSession;
    readonly collections: CollectionsQuickSearchSession;
    readonly docs: DocsQuickSearchSession;
    readonly tags: TagsQuickSearchSession;
}
//# sourceMappingURL=search.d.ts.map