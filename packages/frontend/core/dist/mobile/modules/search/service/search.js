import { CollectionsQuickSearchSession, DocsQuickSearchSession, RecentDocsQuickSearchSession, TagsQuickSearchSession, } from '@affine/core/modules/quicksearch';
import { Service } from '@toeverything/infra';
export class MobileSearchService extends Service {
    constructor() {
        super(...arguments);
        this.recentDocs = this.framework.createEntity(RecentDocsQuickSearchSession);
        this.collections = this.framework.createEntity(CollectionsQuickSearchSession);
        this.docs = this.framework.createEntity(DocsQuickSearchSession);
        this.tags = this.framework.createEntity(TagsQuickSearchSession);
    }
}
//# sourceMappingURL=search.js.map