import { Service } from '@toeverything/infra';
import { catchError, combineLatest, distinctUntilChanged, map, of, share, throttleTime, } from 'rxjs';
import { FilterProvider, GroupByProvider, OrderByProvider } from '../provider';
export class CollectionRulesService extends Service {
    constructor() {
        super();
    }
    watch(options) {
        const { filters = [], groupBy, orderBy, extraAllowList, extraFilters = [], } = options;
        // STEP 1: FILTER
        const filterProviders = this.framework.getAll(FilterProvider);
        const primaryFiltered$ = filters.length === 0
            ? of({
                filtered: new Set([]),
                filterErrors: [],
            })
            : combineLatest(filters.map(filter => {
                const provider = filterProviders.get(filter.type);
                if (!provider) {
                    return of({
                        error: new Error(`Unsupported filter type: ${filter.type}`),
                    });
                }
                return provider.filter$(filter).pipe(distinctUntilChanged((prev, curr) => {
                    return prev.isSubsetOf(curr) && curr.isSubsetOf(prev);
                }), catchError(error => {
                    console.log(error);
                    return of({ error });
                }));
            })).pipe(map(results => {
                const aggregated = results.reduce((acc, result) => {
                    if ('error' in acc) {
                        return acc;
                    }
                    if ('error' in result) {
                        return acc;
                    }
                    return acc.intersection(result);
                });
                const filtered = 'error' in aggregated ? new Set() : aggregated;
                return {
                    filtered: filtered,
                    filterErrors: results.map(i => ('error' in i ? i.error : null)),
                };
            }));
        const extraFiltered$ = extraFilters.length === 0
            ? of(null)
            : combineLatest(extraFilters.map(filter => {
                const provider = filterProviders.get(filter.type);
                if (!provider) {
                    throw new Error(`Unsupported filter type: ${filter.type}`);
                }
                return provider.filter$(filter).pipe(distinctUntilChanged((prev, curr) => {
                    return prev.isSubsetOf(curr) && curr.isSubsetOf(prev);
                }));
            })).pipe(map(results => {
                return results.reduce((acc, result) => {
                    return acc.intersection(result);
                });
            }));
        const finalFiltered$ = combineLatest([
            primaryFiltered$,
            extraFiltered$,
        ]).pipe(map(([primary, extra]) => ({
            filtered: extra === null
                ? primary.filtered.union(new Set(extraAllowList ?? []))
                : primary.filtered
                    .union(new Set(extraAllowList ?? []))
                    .intersection(extra),
            filterErrors: primary.filterErrors,
        })));
        // STEP 2: ORDER BY
        const orderByProvider = orderBy
            ? this.framework.getOptional(OrderByProvider(orderBy.type))
            : null;
        const ordered$ = finalFiltered$.pipe(last$ => {
            if (orderBy && orderByProvider) {
                const shared$ = last$.pipe(share());
                const items$ = shared$.pipe(map(i => i.filtered), 
                // avoid re-ordering the same items
                distinctUntilChanged((prev, curr) => {
                    return prev.isSubsetOf(curr) && curr.isSubsetOf(prev);
                }));
                return combineLatest([
                    orderByProvider.orderBy$(items$, orderBy).pipe(catchError(error => {
                        // Return an empty array when orderBy fails, typically when the orderBy property has been deleted
                        console.error(error);
                        return of([]);
                    })),
                    shared$,
                ]).pipe(map(([ordered, last]) => {
                    return {
                        ordered: Array.from(ordered),
                        ...last,
                    };
                }));
            }
            return last$.pipe(map(last => ({
                ordered: Array.from(last.filtered),
                ...last,
            })));
        });
        // STEP 3: GROUP BY
        const groupByProvider = groupBy
            ? this.framework.getOptional(GroupByProvider(groupBy.type))
            : null;
        const grouped$ = ordered$.pipe(last$ => {
            if (groupBy && groupByProvider) {
                const shared$ = last$.pipe(share());
                const items$ = shared$.pipe(map(i => i.filtered), 
                // avoid re-grouping the same items
                distinctUntilChanged((prev, curr) => {
                    return prev.isSubsetOf(curr) && curr.isSubsetOf(prev);
                }));
                return combineLatest([
                    groupByProvider.groupBy$(items$, groupBy).pipe(catchError(error => {
                        // Return an empty array when groupBy fails, typically when the groupBy property has been deleted
                        console.error(error);
                        return of(new Map());
                    })),
                    shared$,
                ]).pipe(map(([grouped, last]) => {
                    return {
                        grouped: grouped,
                        ...last,
                    };
                }));
            }
            return last$.pipe(map(last => ({
                grouped: new Map([['', last.filtered]]),
                ...last,
            })));
        });
        // STEP 4: Merge the results
        const final$ = grouped$.pipe(throttleTime(300, undefined, { leading: true, trailing: true }), // throttle the results to avoid too many re-renders
        map(({ grouped, ordered, filtered, filterErrors }) => {
            const result = [];
            function addToResult(key, item) {
                const existing = result.find(i => i.key === key);
                if (existing) {
                    existing.items.push(item);
                }
                else {
                    result.push({ key: key, items: [item] });
                }
            }
            // this step ensures that all filtered items are present in ordered
            const finalOrdered = new Set(ordered.concat(Array.from(filtered)));
            for (const item of finalOrdered) {
                const included = filtered.has(item);
                if (!included) {
                    continue;
                }
                const groups = [];
                for (const [group, items] of grouped) {
                    if (items.has(item)) {
                        groups.push(group);
                    }
                }
                if (groups.length === 0) {
                    // ungrouped items
                    addToResult('', item);
                }
                else {
                    for (const group of groups) {
                        addToResult(group, item);
                    }
                }
            }
            return { groups: result, filterErrors };
        }));
        return final$;
    }
}
//# sourceMappingURL=collection-rules.js.map