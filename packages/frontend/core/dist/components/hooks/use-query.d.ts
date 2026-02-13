import type { GraphQLQuery, QueryOptions, QueryResponse } from '@affine/graphql';
import type { GraphQLError } from 'graphql';
import type { SWRConfiguration, SWRResponse } from 'swr';
/**
 * A `useSWR` wrapper for sending graphql queries
 *
 * @example
 *
 * ```ts
 * import { someQuery, someQueryWithNoVars } from '@affine/graphql'
 *
 * const swrResponse1 = useQuery({
 *   query: workspaceByIdQuery,
 *   variables: { id: '1' }
 * })
 *
 * const swrResponse2 = useQuery({
 *   query: someQueryWithNoVars
 * })
 * ```
 */
type useQueryFn = <Query extends GraphQLQuery>(options?: QueryOptions<Query>, config?: Omit<SWRConfiguration<QueryResponse<Query>, GraphQLError, (options: QueryOptions<Query>) => Promise<QueryResponse<Query>>>, 'fetcher'>) => SWRResponse<QueryResponse<Query>, GraphQLError, {
    suspense: true;
}>;
export declare const useQuery: useQueryFn;
export declare const useQueryImmutable: useQueryFn;
export declare function useQueryInfinite<Query extends GraphQLQuery>(options: Omit<QueryOptions<Query>, 'variables'> & {
    getVariables: (pageIndex: number, previousPageData: QueryResponse<Query>) => QueryOptions<Query>['variables'];
}, config?: Omit<SWRConfiguration<QueryResponse<Query>, GraphQLError | GraphQLError[], (options: QueryOptions<Query>) => Promise<QueryResponse<Query>>>, 'fetcher'>): {
    data: QueryResponse<Query>[] | undefined;
    error: GraphQLError | GraphQLError[] | undefined;
    loadingMore: false | undefined;
    loadMore: () => void;
};
export {};
//# sourceMappingURL=use-query.d.ts.map