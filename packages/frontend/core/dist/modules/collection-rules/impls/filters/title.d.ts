import type { DocsSearchService } from '@affine/core/modules/docs-search';
import { Service } from '@toeverything/infra';
import { type Observable } from 'rxjs';
import type { FilterProvider } from '../../provider';
import type { FilterParams } from '../../types';
export declare class TitleFilterProvider extends Service implements FilterProvider {
    private readonly docsSearchService;
    constructor(docsSearchService: DocsSearchService);
    filter$(params: FilterParams): Observable<Set<string>>;
}
//# sourceMappingURL=title.d.ts.map