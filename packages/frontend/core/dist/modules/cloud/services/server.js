import { Service } from '@toeverything/infra';
export class ServerService extends Service {
    constructor(serverScope) {
        super();
        this.serverScope = serverScope;
        this.server = this.serverScope.server;
    }
}
//# sourceMappingURL=server.js.map