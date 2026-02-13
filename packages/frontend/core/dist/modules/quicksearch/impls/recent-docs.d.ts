import { Entity, LiveData } from '@toeverything/infra';
import type { DocDisplayMetaService } from '../../doc-display-meta';
import type { QuickSearchSession } from '../providers/quick-search-provider';
import type { RecentDocsService } from '../services/recent-pages';
import type { QuickSearchItem } from '../types/item';
export declare class RecentDocsQuickSearchSession extends Entity implements QuickSearchSession<'recent-doc', {
    docId: string;
}> {
    private readonly recentDocsService;
    private readonly docDisplayMetaService;
    constructor(recentDocsService: RecentDocsService, docDisplayMetaService: DocDisplayMetaService);
    query$: LiveData<string>;
    items$: LiveData<QuickSearchItem<'recent-doc', {
        docId: string;
    }>[]>;
    query(query: string): void;
}
//# sourceMappingURL=recent-docs.d.ts.map