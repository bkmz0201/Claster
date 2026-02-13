import { GraphQLService } from '@affine/core/modules/cloud';
import { useService } from '@toeverything/infra';
import { useCallback, useMemo } from 'react';
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import useSWRInfinite from 'swr/infinite';
const createUseQuery = (immutable) => (options, config) => {
    const configWithSuspense = useMemo(() => ({
        suspense: true,
        ...config,
    }), [config]);
    const graphqlService = useService(GraphQLService);
    const useSWRFn = immutable ? useSWRImmutable : useSWR;
    return useSWRFn(options ? () => ['cloud', options.query.id, options.variables] : null, options ? () => graphqlService.gql(options) : null, configWithSuspense);
};
export const useQuery = createUseQuery(false);
export const useQueryImmutable = createUseQuery(true);
export function useQueryInfinite(options, config) {
    const configWithSuspense = useMemo(() => ({
        suspense: true,
        ...config,
    }), [config]);
    const graphqlService = useService(GraphQLService);
    const { data, setSize, size, error } = useSWRInfinite((pageIndex, previousPageData) => [
        'cloud',
        options.query.id,
        options.getVariables(pageIndex, previousPageData),
    ], async ([_, __, variables]) => {
        const params = { ...options, variables };
        return graphqlService.gql(params);
    }, configWithSuspense);
    const loadingMore = size > 0 && data && !data[size - 1];
    // TODO(@Peng): find a generic way to know whether or not there are more items to load
    const loadMore = useCallback(() => {
        if (loadingMore) {
            return;
        }
        setSize(size => size + 1).catch(err => {
            console.error(err);
        });
    }, [loadingMore, setSize]);
    return {
        data,
        error,
        loadingMore,
        loadMore,
    };
}
//# sourceMappingURL=use-query.js.map