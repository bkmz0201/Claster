import type { DocsService } from '@affine/core/modules/doc';
import { Service } from '@toeverything/infra';
import { type Observable } from 'rxjs';
import type { OrderByProvider } from '../../provider';
import type { OrderByParams } from '../../types';
export declare class NumberPropertyOrderByProvider extends Service implements OrderByProvider {
    private readonly docsService;
    constructor(docsService: DocsService);
    orderBy$(_items$: Observable<Set<string>>, params: OrderByParams): Observable<string[]>;
}
//# sourceMappingURL=number.d.ts.map