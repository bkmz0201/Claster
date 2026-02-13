import { Service } from '@toeverything/infra';
import { combineLatest, map } from 'rxjs';
export class FavoriteFilterProvider extends Service {
    constructor(favoriteService, docsService) {
        super();
        this.favoriteService = favoriteService;
        this.docsService = docsService;
    }
    filter$(params) {
        const method = params.method;
        if (method === 'is') {
            return combineLatest([
                this.favoriteService.favoriteList.list$,
                this.docsService.allDocIds$(),
            ]).pipe(map(([favoriteList, allDocIds]) => {
                const favoriteDocIds = new Set();
                for (const { id, type } of favoriteList) {
                    if (type === 'doc') {
                        favoriteDocIds.add(id);
                    }
                }
                if (params.value === 'true') {
                    return favoriteDocIds;
                }
                else if (params.value === 'false') {
                    const notFavoriteDocIds = new Set();
                    for (const id of allDocIds) {
                        if (!favoriteDocIds.has(id)) {
                            notFavoriteDocIds.add(id);
                        }
                    }
                    return notFavoriteDocIds;
                }
                else {
                    throw new Error(`Unsupported value: ${params.value}`);
                }
            }));
        }
        throw new Error(`Unsupported method: ${params.method}`);
    }
}
//# sourceMappingURL=favorite.js.map