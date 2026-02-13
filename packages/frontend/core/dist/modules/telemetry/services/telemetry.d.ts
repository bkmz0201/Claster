import { Service } from '@toeverything/infra';
import type { ServersService } from '../../cloud';
import type { GlobalContextService } from '../../global-context';
export declare class TelemetryService extends Service {
    private readonly globalContextService;
    private readonly serversService;
    private readonly disposableFns;
    private readonly currentAccount$;
    constructor(globalContextService: GlobalContextService, serversService: ServersService);
    onApplicationStart(): void;
    registerMiddlewares(): void;
    extractGlobalContext(): {
        page?: string;
        serverId?: string;
    };
    dispose(): void;
}
//# sourceMappingURL=telemetry.d.ts.map