import { Store } from '@toeverything/infra';
import { map } from 'rxjs';
import { BUILD_IN_SERVERS } from '../constant';
export class ServerListStore extends Store {
    constructor(globalStateService) {
        super();
        this.globalStateService = globalStateService;
    }
    watchServerList() {
        return this.globalStateService.globalState
            .watch('serverList')
            .pipe(map(servers => {
            const serverList = [...BUILD_IN_SERVERS, ...(servers ?? [])];
            return serverList;
        }));
    }
    getServerList() {
        return [
            ...BUILD_IN_SERVERS,
            ...(this.globalStateService.globalState.get('serverList') ?? []),
        ];
    }
    addServer(server, serverConfig) {
        const oldServers = this.globalStateService.globalState.get('serverList') ??
            [];
        if (oldServers.some(s => s.baseUrl === server.baseUrl)) {
            throw new Error('Server with same base url already exists, ' + server.baseUrl);
        }
        this.updateServerConfig(server.id, serverConfig);
        this.globalStateService.globalState.set('serverList', [
            ...oldServers,
            server,
        ]);
    }
    removeServer(serverId) {
        const oldServers = this.globalStateService.globalState.get('serverList') ??
            [];
        this.globalStateService.globalState.set('serverList', oldServers.filter(server => server.id !== serverId));
    }
    watchServerConfig(serverId) {
        return this.globalStateService.globalState
            .watch(`serverConfig:${serverId}`)
            .pipe(map(config => {
            if (!config) {
                return BUILD_IN_SERVERS.find(server => server.id === serverId)
                    ?.config;
            }
            else {
                return config;
            }
        }));
    }
    getServerConfig(serverId) {
        return (this.globalStateService.globalState.get(`serverConfig:${serverId}`) ?? BUILD_IN_SERVERS.find(server => server.id === serverId)?.config);
    }
    updateServerConfig(serverId, config) {
        this.globalStateService.globalState.set(`serverConfig:${serverId}`, config);
    }
}
//# sourceMappingURL=server-list.js.map