import { Service } from '@toeverything/infra';
export class WorkspaceServerService extends Service {
    constructor() {
        super(...arguments);
        this.server = null;
    }
    bindServer(server) {
        this.server = server;
    }
}
//# sourceMappingURL=workspace-server.js.map