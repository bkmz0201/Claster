import type { DocsService } from '@affine/core/modules/doc';
import type { ShareDocsListService } from '@affine/core/modules/share-doc';
import { Service } from '@toeverything/infra';
import { type Observable } from 'rxjs';
import type { FilterProvider } from '../../provider';
import type { FilterParams } from '../../types';
export declare class SharedFilterProvider extends Service implements FilterProvider {
    private readonly shareDocsListService;
    private readonly docsService;
    constructor(shareDocsListService: ShareDocsListService, docsService: DocsService);
    filter$(params: FilterParams): Observable<Set<string>>;
}
//# sourceMappingURL=shared.d.ts.map