import type { DocsService } from '@affine/core/modules/doc';
import type { TagService } from '@affine/core/modules/tag';
import { Service } from '@toeverything/infra';
import { type Observable } from 'rxjs';
import type { FilterProvider } from '../../provider';
import type { FilterParams } from '../../types';
export declare class TagsFilterProvider extends Service implements FilterProvider {
    private readonly tagService;
    private readonly docsService;
    constructor(tagService: TagService, docsService: DocsService);
    filter$(params: FilterParams): Observable<Set<string>>;
}
//# sourceMappingURL=tags.d.ts.map