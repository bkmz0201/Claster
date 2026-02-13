import type { ServerFeature } from '@affine/graphql';
import { Entity, LiveData } from '@toeverything/infra';
import { ServerScope } from '../scopes/server';
import { ServerConfigStore } from '../stores/server-config';
import type { ServerListStore } from '../stores/server-list';
import type { ServerConfig, ServerMetadata } from '../types';
type LowercaseServerFeature = Lowercase<ServerFeature>;
type ServerFeatureRecord = {
    [key in LowercaseServerFeature]: boolean;
};
export declare class Server extends Entity<{
    serverMetadata: ServerMetadata;
}> {
    private readonly serverListStore;
    readonly id: string;
    readonly baseUrl: string;
    readonly scope: ServerScope;
    readonly serverConfigStore: ServerConfigStore;
    readonly fetch: (input: string, init?: import("../services/fetch").FetchInit) => Promise<Response>;
    readonly gql: <Query extends import("@affine/graphql").GraphQLQuery>(options: import("@affine/graphql").QueryOptions<Query>) => Promise<import("@affine/graphql").QueryResponse<Query>>;
    get account$(): LiveData<import("./session").AuthAccountInfo | null>;
    readonly serverMetadata: ServerMetadata;
    constructor(serverListStore: ServerListStore);
    readonly config$: LiveData<ServerConfig>;
    readonly isConfigRevalidating$: LiveData<boolean>;
    readonly features$: LiveData<ServerFeatureRecord>;
    readonly credentialsRequirement$: LiveData<import("@affine/graphql").CredentialsRequirementType | null>;
    readonly revalidateConfig: import("@toeverything/infra").Effect<unknown>;
    waitForConfigRevalidation(signal?: AbortSignal): Promise<void>;
    dispose(): void;
}
export {};
//# sourceMappingURL=server.d.ts.map