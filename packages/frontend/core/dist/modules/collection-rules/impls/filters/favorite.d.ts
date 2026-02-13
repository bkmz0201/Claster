import type { DocsService } from '@affine/core/modules/doc';
import type { FavoriteService } from '@affine/core/modules/favorite';
import { Service } from '@toeverything/infra';
import { type Observable } from 'rxjs';
import type { FilterProvider } from '../../provider';
import type { FilterParams } from '../../types';
export declare class FavoriteFilterProvider extends Service implements FilterProvider {
    private readonly favoriteService;
    private readonly docsService;
    constructor(favoriteService: FavoriteService, docsService: DocsService);
    filter$(params: FilterParams): Observable<Set<string>>;
}
//# sourceMappingURL=favorite.d.ts.map