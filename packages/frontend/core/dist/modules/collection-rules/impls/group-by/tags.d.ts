import type { DocsService } from '@affine/core/modules/doc';
import type { TagService } from '@affine/core/modules/tag';
import { Service } from '@toeverything/infra';
import { type Observable } from 'rxjs';
import type { GroupByProvider } from '../../provider';
import type { GroupByParams } from '../../types';
export declare class TagsGroupByProvider extends Service implements GroupByProvider {
    private readonly docsService;
    private readonly tagService;
    constructor(docsService: DocsService, tagService: TagService);
    groupBy$(_items$: Observable<Set<string>>, _params: GroupByParams): Observable<Map<string, Set<string>>>;
}
//# sourceMappingURL=tags.d.ts.map