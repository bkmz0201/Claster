import { LiveData, Service } from '@toeverything/infra';
import { Server } from '../entities/server';
import type { ServerConfigStore } from '../stores/server-config';
import type { ServerListStore } from '../stores/server-list';
import type { ServerConfig, ServerMetadata } from '../types';
export declare class ServersService extends Service {
    private readonly serverListStore;
    private readonly serverConfigStore;
    constructor(serverListStore: ServerListStore, serverConfigStore: ServerConfigStore);
    servers$: LiveData<Server[]>;
    serversWithAccount$: LiveData<{
        server: Server;
        account: import("..").AuthAccountInfo | null;
    }[]>;
    server$(id: string): LiveData<Server | undefined>;
    serverByBaseUrl$(url: string): LiveData<Server | undefined>;
    private readonly serverPool;
    addServer(metadata: ServerMetadata, config: ServerConfig): void;
    removeServer(id: string): void;
    addServerByBaseUrl(baseUrl: string): Promise<void>;
    getServerByBaseUrl(baseUrl: string): Server | undefined;
    addOrGetServerByBaseUrl(baseUrl: string): Promise<Server>;
}
//# sourceMappingURL=servers.d.ts.map