import { type OauthProvidersQuery, type ServerConfigQuery } from '@affine/graphql';
import { Store } from '@toeverything/infra';
export type ServerConfigType = ServerConfigQuery['serverConfig'] & OauthProvidersQuery['serverConfig'];
export declare class ServerConfigStore extends Store {
    constructor();
    fetchServerConfig(serverBaseUrl: string, abortSignal?: AbortSignal): Promise<ServerConfigType>;
}
//# sourceMappingURL=server-config.d.ts.map