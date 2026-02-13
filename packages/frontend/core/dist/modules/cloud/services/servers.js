import { Unreachable } from '@affine/env/constant';
import { LiveData, ObjectPool, Service } from '@toeverything/infra';
import { nanoid } from 'nanoid';
import { Observable, switchMap } from 'rxjs';
import { Server } from '../entities/server';
import { ServerStarted } from '../events/server-started';
export class ServersService extends Service {
    constructor(serverListStore, serverConfigStore) {
        super();
        this.serverListStore = serverListStore;
        this.serverConfigStore = serverConfigStore;
        this.servers$ = LiveData.from(this.serverListStore.watchServerList().pipe(switchMap(metadatas => {
            const refs = metadatas.map(metadata => {
                const exists = this.serverPool.get(metadata.id);
                if (exists) {
                    return exists;
                }
                const server = this.framework.createEntity(Server, {
                    serverMetadata: metadata,
                });
                server.revalidateConfig();
                server.scope.eventBus.emit(ServerStarted, server);
                const ref = this.serverPool.put(metadata.id, server);
                return ref;
            });
            return new Observable(subscribe => {
                subscribe.next(refs.map(ref => ref.obj));
                return () => {
                    refs.forEach(ref => {
                        ref.release();
                    });
                };
            });
        })), []);
        this.serversWithAccount$ = this.servers$
            .map(servers => servers.map(server => server.account$.map(account => ({
            server,
            account,
        }))))
            .flat();
        this.serverPool = new ObjectPool({
            onDelete(obj) {
                obj.dispose();
            },
        });
    }
    server$(id) {
        return this.servers$.map(servers => servers.find(server => server.id === id));
    }
    serverByBaseUrl$(url) {
        return this.servers$.map(servers => servers.find(server => server.baseUrl === url));
    }
    addServer(metadata, config) {
        this.serverListStore.addServer(metadata, config);
    }
    removeServer(id) {
        this.serverListStore.removeServer(id);
    }
    async addServerByBaseUrl(baseUrl) {
        const config = await this.serverConfigStore.fetchServerConfig(baseUrl);
        const id = nanoid();
        this.serverListStore.addServer({ id, baseUrl }, {
            credentialsRequirement: config.credentialsRequirement,
            features: config.features,
            oauthProviders: config.oauthProviders,
            serverName: config.name,
            type: config.type,
            initialized: config.initialized,
            version: config.version,
        });
    }
    getServerByBaseUrl(baseUrl) {
        return this.servers$.value.find(s => s.baseUrl === baseUrl);
    }
    async addOrGetServerByBaseUrl(baseUrl) {
        const server = this.getServerByBaseUrl(baseUrl);
        if (server) {
            return server;
        }
        else {
            await this.addServerByBaseUrl(baseUrl);
            const server = this.getServerByBaseUrl(baseUrl);
            if (!server) {
                throw new Unreachable();
            }
            return server;
        }
    }
}
//# sourceMappingURL=servers.js.map