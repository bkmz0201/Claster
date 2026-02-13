import { type Framework } from '@toeverything/infra';
export { FavoriteSupportType, type FavoriteSupportTypeUnion, isFavoriteSupportType, } from './constant';
export type { FavoriteList } from './entities/favorite-list';
export { FavoriteService } from './services/favorite';
export { CompatibleFavoriteItemsAdapter, MigrationFavoriteItemsAdapter, } from './services/old/adapter';
export declare function configureFavoriteModule(framework: Framework): void;
//# sourceMappingURL=index.d.ts.map