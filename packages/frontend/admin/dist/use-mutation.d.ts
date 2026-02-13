import type { GraphQLQuery, MutationOptions, QueryResponse, QueryVariables, RecursiveMaybeFields } from '@affine/graphql';
import type { GraphQLError } from 'graphql';
import type { Key } from 'swr';
import type { SWRMutationConfiguration, SWRMutationResponse } from 'swr/mutation';
/**
 * A useSWRMutation wrapper for sending graphql mutations
 *
 * @example
 *
 * ```ts
 * import { someMutation } from '@affine/graphql'
 *
 * const { trigger } = useMutation({
 *  mutation: someMutation,
 * })
 *
 * trigger({ name: 'John Doe' })
 */
export declare function useMutation<Mutation extends GraphQLQuery, K extends Key = Key>(options: Omit<MutationOptions<Mutation>, 'variables'>, config?: Omit<SWRMutationConfiguration<QueryResponse<Mutation>, GraphQLError, K, QueryVariables<Mutation>>, 'fetcher'>): SWRMutationResponse<QueryResponse<Mutation>, GraphQLError, K, QueryVariables<Mutation>>;
export declare const useMutateQueryResource: () => <Q extends GraphQLQuery>(query: Q, varsFilter?: (vars: RecursiveMaybeFields<QueryVariables<Q>>) => boolean) => Promise<any[]>;
//# sourceMappingURL=use-mutation.d.ts.map