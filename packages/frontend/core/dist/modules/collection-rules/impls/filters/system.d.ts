import { Service } from '@toeverything/infra';
import { type Observable } from 'rxjs';
import { FilterProvider } from '../../provider';
import type { FilterParams } from '../../types';
export declare class SystemFilterProvider extends Service implements FilterProvider {
    filter$(params: FilterParams): Observable<Set<string>>;
}
//# sourceMappingURL=system.d.ts.map