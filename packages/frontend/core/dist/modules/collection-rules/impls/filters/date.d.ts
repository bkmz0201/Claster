import type { DocsService } from '@affine/core/modules/doc';
import { Service } from '@toeverything/infra';
import { type Observable } from 'rxjs';
import type { FilterProvider } from '../../provider';
import type { FilterParams } from '../../types';
export declare class DatePropertyFilterProvider extends Service implements FilterProvider {
    private readonly docsService;
    constructor(docsService: DocsService);
    filter$(params: FilterParams): Observable<Set<string>>;
}
export declare function basicDateFilter(params: FilterParams): (upstream$: Observable<Map<string, string | number | undefined>>) => Observable<Set<string>>;
//# sourceMappingURL=date.d.ts.map