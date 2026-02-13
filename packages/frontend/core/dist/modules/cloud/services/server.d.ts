import { Service } from '@toeverything/infra';
import type { ServerScope } from '../scopes/server';
export declare class ServerService extends Service {
    private readonly serverScope;
    readonly server: import("..").Server;
    constructor(serverScope: ServerScope);
}
//# sourceMappingURL=server.d.ts.map