import type { DocsService } from '@affine/core/modules/doc';
import { Service } from '@toeverything/infra';
import { type Observable } from 'rxjs';
import type { GroupByProvider } from '../../provider';
import type { GroupByParams } from '../../types';
export declare class EdgelessThemeGroupByProvider extends Service implements GroupByProvider {
    private readonly docsService;
    constructor(docsService: DocsService);
    groupBy$(_items$: Observable<Set<string>>, _params: GroupByParams): Observable<Map<string, Set<string>>>;
}
//# sourceMappingURL=edgeless-theme.d.ts.map