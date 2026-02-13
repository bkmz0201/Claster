import { activateLicenseMutation, deactivateLicenseMutation, getLicenseQuery, installLicenseMutation, } from '@affine/graphql';
import { Store } from '@toeverything/infra';
export class SelfhostLicenseStore extends Store {
    constructor(workspaceServerService) {
        super();
        this.workspaceServerService = workspaceServerService;
    }
    async getLicense(workspaceId, signal) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        const data = await this.workspaceServerService.server.gql({
            query: getLicenseQuery,
            variables: {
                workspaceId: workspaceId,
            },
            context: {
                signal,
            },
        });
        return data.workspace.license;
    }
    async activate(workspaceId, license, signal) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        const data = await this.workspaceServerService.server.gql({
            query: activateLicenseMutation,
            variables: {
                workspaceId: workspaceId,
                license: license,
            },
            context: {
                signal,
            },
        });
        return data.activateLicense;
    }
    async deactivate(workspaceId, signal) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        const data = await this.workspaceServerService.server.gql({
            query: deactivateLicenseMutation,
            variables: {
                workspaceId: workspaceId,
            },
            context: {
                signal,
            },
        });
        return data.deactivateLicense;
    }
    async installLicense(workspaceId, license, signal) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        const data = await this.workspaceServerService.server.gql({
            query: installLicenseMutation,
            variables: {
                workspaceId: workspaceId,
                license: license,
            },
            context: {
                signal,
            },
        });
        return data.installLicense;
    }
}
//# sourceMappingURL=selfhost-license.js.map