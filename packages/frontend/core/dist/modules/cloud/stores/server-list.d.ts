import { Store } from '@toeverything/infra';
import type { GlobalStateService } from '../../storage';
import type { ServerConfig, ServerMetadata } from '../types';
export declare class ServerListStore extends Store {
    private readonly globalStateService;
    constructor(globalStateService: GlobalStateService);
    watchServerList(): import("rxjs").Observable<ServerMetadata[]>;
    getServerList(): ServerMetadata[];
    addServer(server: ServerMetadata, serverConfig: ServerConfig): void;
    removeServer(serverId: string): void;
    watchServerConfig(serverId: string): import("rxjs").Observable<ServerConfig | undefined>;
    getServerConfig(serverId: string): ServerConfig | undefined;
    updateServerConfig(serverId: string, config: ServerConfig): void;
}
//# sourceMappingURL=server-list.d.ts.map