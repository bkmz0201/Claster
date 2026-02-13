import { Service } from '@toeverything/infra';
import type { Observable } from 'rxjs';
import { OrderByProvider } from '../../provider';
import type { OrderByParams } from '../../types';
export declare class SystemOrderByProvider extends Service implements OrderByProvider {
    orderBy$(items$: Observable<Set<string>>, params: OrderByParams): Observable<string[]>;
}
//# sourceMappingURL=system.d.ts.map