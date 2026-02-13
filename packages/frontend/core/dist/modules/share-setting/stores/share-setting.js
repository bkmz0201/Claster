import { getWorkspaceConfigQuery, setEnableAiMutation, setEnableUrlPreviewMutation, } from '@affine/graphql';
import { Store } from '@toeverything/infra';
export class WorkspaceShareSettingStore extends Store {
    constructor(workspaceServerService) {
        super();
        this.workspaceServerService = workspaceServerService;
    }
    async fetchWorkspaceConfig(workspaceId, signal) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        const data = await this.workspaceServerService.server.gql({
            query: getWorkspaceConfigQuery,
            variables: {
                id: workspaceId,
            },
            context: {
                signal,
            },
        });
        return data.workspace;
    }
    async updateWorkspaceEnableAi(workspaceId, enableAi, signal) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        await this.workspaceServerService.server.gql({
            query: setEnableAiMutation,
            variables: {
                id: workspaceId,
                enableAi,
            },
            context: {
                signal,
            },
        });
    }
    async updateWorkspaceEnableUrlPreview(workspaceId, enableUrlPreview, signal) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        await this.workspaceServerService.server.gql({
            query: setEnableUrlPreviewMutation,
            variables: {
                id: workspaceId,
                enableUrlPreview,
            },
            context: {
                signal,
            },
        });
    }
}
//# sourceMappingURL=share-setting.js.map