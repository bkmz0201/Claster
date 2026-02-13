import type { GraphQLQuery } from './graphql';
import type { Mutations, Queries } from './schema';
export type NotArray<T> = T extends Array<unknown> ? never : T;
export type FetchInit = RequestInit & {
    timeout?: number;
};
export type _QueryVariables<Q extends GraphQLQuery> = Q['id'] extends Queries['name'] ? Extract<Queries, {
    name: Q['id'];
}>['variables'] : Q['id'] extends Mutations['name'] ? Extract<Mutations, {
    name: Q['id'];
}>['variables'] : undefined;
export type QueryVariables<Q extends GraphQLQuery> = _QueryVariables<Q> extends never | Record<string, never> ? never : _QueryVariables<Q>;
export type QueryResponse<Q extends GraphQLQuery> = Extract<Queries | Mutations, {
    name: Q['id'];
}>['response'];
type NullableKeys<T> = {
    [K in keyof T]: null extends T[K] ? K : never;
}[keyof T];
type NonNullableKeys<T> = {
    [K in keyof T]: null extends T[K] ? never : K;
}[keyof T];
export type RecursiveMaybeFields<T> = T extends number | boolean | string | null | undefined ? T : {
    [K in NullableKeys<T>]?: RecursiveMaybeFields<T[K]>;
} & {
    [K in NonNullableKeys<T>]: RecursiveMaybeFields<T[K]>;
};
type AllowedRequestContext = Omit<RequestInit, 'method' | 'body'>;
export interface RequestBody {
    operationName?: string;
    variables: any;
    query: string;
    form?: FormData;
}
type QueryVariablesOption<Q extends GraphQLQuery> = QueryVariables<Q> extends never ? {
    variables?: undefined;
} : {
    variables: RecursiveMaybeFields<QueryVariables<Q>>;
};
export type RequestOptions<Q extends GraphQLQuery> = QueryVariablesOption<Q> & {
    /**
     * parameter passed to `fetch` function
     */
    context?: AllowedRequestContext;
    /**
     * Whether keep null or undefined value in variables.
     *
     * if `false` given, `{ a: 0, b: undefined, c: null }` will be converted to `{ a: 0 }`
     *
     * @default true
     */
    keepNilVariables?: boolean;
    /**
     * Request timeout in milliseconds
     * @default 15000
     */
    timeout?: number;
    /**
     * Abort signal
     */
    signal?: AbortSignal;
};
export type QueryOptions<Q extends GraphQLQuery> = RequestOptions<Q> & {
    query: Q;
};
export type MutationOptions<M extends GraphQLQuery> = RequestOptions<M> & {
    mutation: M;
};
export declare function transformToForm(body: RequestBody): FormData;
export declare const gqlFetcherFactory: (endpoint: string, fetcher?: (input: string, init?: FetchInit) => Promise<Response>) => <Query extends GraphQLQuery>(options: QueryOptions<Query>) => Promise<QueryResponse<Query>>;
export {};
//# sourceMappingURL=fetcher.d.ts.map