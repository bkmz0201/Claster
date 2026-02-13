import { Entity, LiveData } from '@toeverything/infra';
import type { CollectionService } from '../../collection';
import type { QuickSearchSession } from '../providers/quick-search-provider';
import type { QuickSearchItem } from '../types/item';
export declare class CollectionsQuickSearchSession extends Entity implements QuickSearchSession<'collections', {
    collectionId: string;
}> {
    private readonly collectionService;
    constructor(collectionService: CollectionService);
    query$: LiveData<string>;
    items$: LiveData<QuickSearchItem<'collections', {
        collectionId: string;
    }>[]>;
    query(query: string): void;
}
//# sourceMappingURL=collections.d.ts.map