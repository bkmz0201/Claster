import { Service } from '@toeverything/infra';
import { FavoriteList } from '../entities/favorite-list';
export class FavoriteService extends Service {
    constructor() {
        super(...arguments);
        this.favoriteList = this.framework.createEntity(FavoriteList);
    }
}
//# sourceMappingURL=favorite.js.map