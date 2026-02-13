import { LiveData, Store } from '@toeverything/infra';
import type { WorkspaceDBService } from '../../db';
import type { FavoriteSupportTypeUnion } from '../constant';
export interface FavoriteRecord {
    type: FavoriteSupportTypeUnion;
    id: string;
    index: string;
}
export declare class FavoriteStore extends Store {
    private readonly workspaceDBService;
    constructor(workspaceDBService: WorkspaceDBService);
    watchIsLoading(): LiveData<boolean>;
    watchFavorites(): LiveData<FavoriteRecord[]>;
    addFavorite(type: FavoriteSupportTypeUnion, id: string, index: string): FavoriteRecord;
    reorderFavorite(type: FavoriteSupportTypeUnion, id: string, index: string): void;
    removeFavorite(type: FavoriteSupportTypeUnion, id: string): void;
    watchFavorite(type: FavoriteSupportTypeUnion, id: string): LiveData<FavoriteRecord | undefined>;
    private toRecord;
    /**
     * parse favorite key
     * key format: ${type}:${id}
     * type: collection | doc | tag
     * @returns null if key is invalid
     */
    private parseKey;
    private encodeKey;
}
//# sourceMappingURL=favorite.d.ts.map