import { Service } from '@toeverything/infra';
import type { Server } from '../entities/server';
import type { ServersService } from './servers';
export declare class DefaultServerService extends Service {
    private readonly serversService;
    readonly server: Server;
    constructor(serversService: ServersService);
    waitForSelfhostedServerConfig(): Promise<void>;
}
//# sourceMappingURL=default-server.d.ts.map