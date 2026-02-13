import type { DocsService } from '@affine/core/modules/doc';
import { Service } from '@toeverything/infra';
import { type Observable } from 'rxjs';
import type { FilterProvider } from '../../provider';
import type { FilterParams } from '../../types';
export declare class JournalFilterProvider extends Service implements FilterProvider {
    private readonly docsService;
    constructor(docsService: DocsService);
    filter$(params: FilterParams): Observable<Set<string>>;
}
//# sourceMappingURL=journal.d.ts.map