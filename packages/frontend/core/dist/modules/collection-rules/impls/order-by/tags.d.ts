import type { DocsService } from '@affine/core/modules/doc';
import type { TagService } from '@affine/core/modules/tag';
import { Service } from '@toeverything/infra';
import { type Observable } from 'rxjs';
import type { OrderByProvider } from '../../provider';
import type { OrderByParams } from '../../types';
export declare class TagsOrderByProvider extends Service implements OrderByProvider {
    private readonly docsService;
    private readonly tagService;
    constructor(docsService: DocsService, tagService: TagService);
    orderBy$(_items$: Observable<Set<string>>, params: OrderByParams): Observable<string[]>;
}
//# sourceMappingURL=tags.d.ts.map