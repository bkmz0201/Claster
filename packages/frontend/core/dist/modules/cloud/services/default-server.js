import { ServerDeploymentType } from '@affine/graphql';
import { Service } from '@toeverything/infra';
export class DefaultServerService extends Service {
    constructor(serversService) {
        super();
        this.serversService = serversService;
        // global server is always affine-cloud
        const server = this.serversService.server$('affine-cloud').value;
        if (!server) {
            throw new Error('No server found');
        }
        this.server = server;
    }
    async waitForSelfhostedServerConfig() {
        if (this.server.config$.value.type === ServerDeploymentType.Selfhosted) {
            await this.server.waitForConfigRevalidation();
        }
    }
}
//# sourceMappingURL=default-server.js.map