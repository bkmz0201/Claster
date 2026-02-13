import { Entity, LiveData } from '@toeverything/infra';
import type { CollectionRulesService } from '../../collection-rules';
import type { CollectionInfo, CollectionStore } from '../stores/collection';
export declare class Collection extends Entity<{
    id: string;
}> {
    private readonly store;
    private readonly rulesService;
    constructor(store: CollectionStore, rulesService: CollectionRulesService);
    id: string;
    info$: LiveData<CollectionInfo>;
    name$: LiveData<string>;
    allowList$: LiveData<string[]>;
    rules$: LiveData<{
        filters: import("../../collection-rules").FilterParams[];
    }>;
    /**
     * Returns a list of document IDs that match the collection rules and allow list.
     *
     * For performance optimization,
     * Developers must explicitly call `watch()` to retrieve the result and properly manage the subscription lifecycle.
     */
    watch(): import("rxjs").Observable<string[]>;
    updateInfo(info: Partial<CollectionInfo>): void;
    addDoc(...docIds: string[]): void;
    removeDoc(...docIds: string[]): void;
}
//# sourceMappingURL=collection.d.ts.map