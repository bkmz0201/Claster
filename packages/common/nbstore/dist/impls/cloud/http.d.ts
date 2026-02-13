import { DummyConnection } from '../../connection';
export declare class HttpConnection extends DummyConnection {
    private readonly serverBaseUrl;
    private readonly requestHeaders?;
    readonly fetch: (input: string, init?: RequestInit & {
        timeout?: number;
    }) => Promise<Response>;
    readonly fetchArrayBuffer: (input: string, init?: RequestInit) => Promise<ArrayBuffer | null>;
    readonly gql: <Query extends import("@affine/graphql").GraphQLQuery>(options: import("@affine/graphql").QueryOptions<Query>) => Promise<import("@affine/graphql").QueryResponse<Query>>;
    constructor(serverBaseUrl: string, requestHeaders?: Record<string, string> | undefined);
}
//# sourceMappingURL=http.d.ts.map