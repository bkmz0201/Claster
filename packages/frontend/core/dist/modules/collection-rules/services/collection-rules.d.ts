import { Service } from '@toeverything/infra';
import { type Observable } from 'rxjs';
import type { FilterParams, GroupByParams, OrderByParams } from '../types';
export declare class CollectionRulesService extends Service {
    constructor();
    watch(options: {
        /**
         * Primary filters
         *
         * If filters.length === 0, no items will be matched
         */
        filters?: FilterParams[];
        groupBy?: GroupByParams;
        orderBy?: OrderByParams;
        /**
         * Additional allowed items that bypass primary filters but are still subject to extraFilters
         */
        extraAllowList?: string[];
        /**
         * Additional filters that will be applied after the primary filters and extraAllowList
         *
         * Useful for applying system-level filters such as trash, empty journal, etc.
         *
         * Note: If the primary filters match no items, these extraFilters will not be applied.
         */
        extraFilters?: FilterParams[];
    }): Observable<{
        groups: {
            key: string;
            items: string[];
        }[];
        filterErrors: any[];
    }>;
}
//# sourceMappingURL=collection-rules.d.ts.map