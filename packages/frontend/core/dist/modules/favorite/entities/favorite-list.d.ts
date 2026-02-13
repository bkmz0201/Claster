import { Entity } from '@toeverything/infra';
import type { FavoriteSupportTypeUnion } from '../constant';
import type { FavoriteRecord, FavoriteStore } from '../stores/favorite';
export declare class FavoriteList extends Entity {
    private readonly store;
    list$: import("@toeverything/infra").LiveData<FavoriteRecord[]>;
    sortedList$: import("@toeverything/infra").LiveData<FavoriteRecord[]>;
    isLoading$: import("@toeverything/infra").LiveData<boolean>;
    constructor(store: FavoriteStore);
    /**
     * get favorite record by type and id
     */
    favorite$(type: FavoriteSupportTypeUnion, id: string): import("@toeverything/infra").LiveData<FavoriteRecord | undefined>;
    isFavorite$(type: FavoriteSupportTypeUnion, id: string): import("@toeverything/infra").LiveData<boolean>;
    add(type: FavoriteSupportTypeUnion, id: string, index?: string): FavoriteRecord;
    toggle(type: FavoriteSupportTypeUnion, id: string, index?: string): void | FavoriteRecord;
    remove(type: FavoriteSupportTypeUnion, id: string): void;
    reorder(type: FavoriteSupportTypeUnion, id: string, index: string): void;
    indexAt(at: 'before' | 'after', targetRecord?: {
        type: FavoriteSupportTypeUnion;
        id: string;
    }): string;
}
//# sourceMappingURL=favorite-list.d.ts.map