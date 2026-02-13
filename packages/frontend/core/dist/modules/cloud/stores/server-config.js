import { gqlFetcherFactory, oauthProvidersQuery, serverConfigQuery, ServerFeature, } from '@affine/graphql';
import { Store } from '@toeverything/infra';
export class ServerConfigStore extends Store {
    constructor() {
        super();
    }
    async fetchServerConfig(serverBaseUrl, abortSignal) {
        const gql = gqlFetcherFactory(`${serverBaseUrl}/graphql`, globalThis.fetch);
        const serverConfigData = await gql({
            query: serverConfigQuery,
            context: {
                signal: abortSignal,
                headers: {
                    'x-affine-version': BUILD_CONFIG.appVersion,
                },
            },
        });
        if (serverConfigData.serverConfig.features.includes(ServerFeature.OAuth)) {
            const oauthProvidersData = await gql({
                query: oauthProvidersQuery,
                context: {
                    signal: abortSignal,
                    headers: {
                        'x-affine-version': BUILD_CONFIG.appVersion,
                    },
                },
            });
            return {
                ...serverConfigData.serverConfig,
                ...oauthProvidersData.serverConfig,
            };
        }
        return { ...serverConfigData.serverConfig, oauthProviders: [] };
    }
}
//# sourceMappingURL=server-config.js.map