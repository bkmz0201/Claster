import type { Observable } from 'rxjs';
import type { FilterParams, GroupByParams, OrderByParams } from '../types';
export interface FilterProvider {
    filter$(params: FilterParams): Observable<Set<string>>;
}
export declare const FilterProvider: import("@toeverything/infra").Identifier<FilterProvider> & ((variant: string) => import("@toeverything/infra").Identifier<FilterProvider>);
export interface GroupByProvider {
    groupBy$(items$: Observable<Set<string>>, params: GroupByParams): Observable<Map<string, Set<string>>>;
}
export declare const GroupByProvider: import("@toeverything/infra").Identifier<GroupByProvider> & ((variant: string) => import("@toeverything/infra").Identifier<GroupByProvider>);
export interface OrderByProvider {
    orderBy$(items$: Observable<Set<string>>, params: OrderByParams): Observable<string[]>;
}
export declare const OrderByProvider: import("@toeverything/infra").Identifier<OrderByProvider> & ((variant: string) => import("@toeverything/infra").Identifier<OrderByProvider>);
//# sourceMappingURL=index.d.ts.map