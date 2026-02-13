import { backoffRetry, effect, Entity, fromPromise, LiveData, onComplete, onStart, } from '@toeverything/infra';
import { exhaustMap, map, tap } from 'rxjs';
import { ServerScope } from '../scopes/server';
import { AuthService } from '../services/auth';
import { FetchService } from '../services/fetch';
import { GraphQLService } from '../services/graphql';
import { ServerConfigStore } from '../stores/server-config';
export class Server extends Entity {
    get account$() {
        return this.scope.framework.get(AuthService).session.account$;
    }
    constructor(serverListStore) {
        super();
        this.serverListStore = serverListStore;
        this.id = this.props.serverMetadata.id;
        this.baseUrl = this.props.serverMetadata.baseUrl;
        this.scope = this.framework.createScope(ServerScope, {
            server: this,
        });
        this.serverConfigStore = this.scope.framework.get(ServerConfigStore);
        this.fetch = this.scope.framework.get(FetchService).fetch;
        this.gql = this.scope.framework.get(GraphQLService).gql;
        this.serverMetadata = this.props.serverMetadata;
        this.config$ = LiveData.from(this.serverListStore.watchServerConfig(this.serverMetadata.id).pipe(map(config => {
            if (!config) {
                throw new Error('Failed to load server config');
            }
            return config;
        })), null);
        this.isConfigRevalidating$ = new LiveData(false);
        this.features$ = this.config$.map(config => {
            return Array.from(new Set(config.features)).reduce((acc, cur) => {
                acc[cur.toLowerCase()] = true;
                return acc;
            }, {});
        });
        this.credentialsRequirement$ = this.config$.map(config => {
            return config ? config.credentialsRequirement : null;
        });
        this.revalidateConfig = effect(exhaustMap(() => {
            return fromPromise(signal => this.serverConfigStore.fetchServerConfig(this.baseUrl, signal)).pipe(backoffRetry({
                count: Infinity,
            }), tap(config => {
                this.serverListStore.updateServerConfig(this.serverMetadata.id, {
                    credentialsRequirement: config.credentialsRequirement,
                    features: config.features,
                    oauthProviders: config.oauthProviders,
                    serverName: config.name,
                    type: config.type,
                    version: config.version,
                    initialized: config.initialized,
                });
            }), onStart(() => {
                this.isConfigRevalidating$.next(true);
            }), onComplete(() => {
                this.isConfigRevalidating$.next(false);
            }));
        }));
    }
    async waitForConfigRevalidation(signal) {
        try {
            this.revalidateConfig();
            await this.isConfigRevalidating$.waitFor(isRevalidating => !isRevalidating, signal);
        }
        catch (error) {
            if (error instanceof Event && error.type === 'abort')
                return;
            console.error('Config revalidation failed:', error);
        }
    }
    dispose() {
        this.scope.dispose();
        this.revalidateConfig.unsubscribe();
    }
}
//# sourceMappingURL=server.js.map