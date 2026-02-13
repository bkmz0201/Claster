import { Service } from '@toeverything/infra';
import type { Observable } from 'rxjs';
import { GroupByProvider } from '../../provider';
import type { GroupByParams } from '../../types';
export declare class SystemGroupByProvider extends Service implements GroupByProvider {
    groupBy$(items$: Observable<Set<string>>, params: GroupByParams): Observable<Map<string, Set<string>>>;
}
//# sourceMappingURL=system.d.ts.map