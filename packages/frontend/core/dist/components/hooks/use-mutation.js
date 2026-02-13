import { GraphQLService } from '@affine/core/modules/cloud';
import { useService } from '@toeverything/infra';
import { useMemo } from 'react';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
export function useMutation(options, config) {
    const graphqlService = useService(GraphQLService);
    return useSWRMutation(() => ['cloud', options.mutation.id], (_, { arg }) => graphqlService.gql({
        ...options,
        query: options.mutation,
        variables: arg,
    }), config);
}
// use this to revalidate all queries that match the filter
export const useMutateQueryResource = () => {
    const { mutate } = useSWRConfig();
    const revalidateResource = useMemo(() => (query, varsFilter = _vars => true) => {
        return mutate(key => {
            const res = Array.isArray(key) &&
                key[0] === 'cloud' &&
                key[1] === query.id &&
                varsFilter(key[2]);
            if (res) {
                console.debug('revalidate resource', key);
            }
            return res;
        });
    }, [mutate]);
    return revalidateResource;
};
//# sourceMappingURL=use-mutation.js.map