import { addWorkspaceEmbeddingFilesMutation, addWorkspaceEmbeddingIgnoredDocsMutation, getAllWorkspaceEmbeddingIgnoredDocsQuery, getWorkspaceConfigQuery, getWorkspaceEmbeddingFilesQuery, getWorkspaceEmbeddingStatusQuery, removeWorkspaceEmbeddingFilesMutation, removeWorkspaceEmbeddingIgnoredDocsMutation, setEnableDocEmbeddingMutation, } from '@affine/graphql';
import { Store } from '@toeverything/infra';
export class EmbeddingStore extends Store {
    constructor(workspaceServerService) {
        super();
        this.workspaceServerService = workspaceServerService;
    }
    async getEnabled(workspaceId, signal) {
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
        return data.workspace.enableDocEmbedding;
    }
    async updateEnabled(workspaceId, enabled, signal) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        await this.workspaceServerService.server.gql({
            query: setEnableDocEmbeddingMutation,
            variables: {
                id: workspaceId,
                enableDocEmbedding: enabled,
            },
            context: {
                signal,
            },
        });
    }
    async getIgnoredDocs(workspaceId, signal) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        const data = await this.workspaceServerService.server.gql({
            query: getAllWorkspaceEmbeddingIgnoredDocsQuery,
            variables: {
                workspaceId,
            },
            context: { signal },
        });
        return data.workspace.embedding.allIgnoredDocs;
    }
    async updateIgnoredDocs(workspaceId, add, remove, signal) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        await Promise.all([
            this.workspaceServerService.server.gql({
                query: addWorkspaceEmbeddingIgnoredDocsMutation,
                variables: {
                    workspaceId,
                    add,
                },
                context: { signal },
            }),
            this.workspaceServerService.server.gql({
                query: removeWorkspaceEmbeddingIgnoredDocsMutation,
                variables: {
                    workspaceId,
                    remove,
                },
                context: { signal },
            }),
        ]);
    }
    async addEmbeddingFile(workspaceId, blob, signal) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        await this.workspaceServerService.server.gql({
            query: addWorkspaceEmbeddingFilesMutation,
            variables: {
                workspaceId,
                blob,
            },
            context: { signal },
        });
    }
    async addEmbeddingFiles(workspaceId, files, signal) {
        for (const file of files) {
            await this.addEmbeddingFile(workspaceId, file, signal);
        }
    }
    async removeEmbeddingFile(workspaceId, fileId, signal) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        await this.workspaceServerService.server.gql({
            query: removeWorkspaceEmbeddingFilesMutation,
            variables: {
                workspaceId,
                fileId,
            },
            context: { signal },
        });
    }
    async removeEmbeddingFiles(workspaceId, fileIds, signal) {
        for (const fileId of fileIds) {
            await this.removeEmbeddingFile(workspaceId, fileId, signal);
        }
    }
    async getEmbeddingFiles(workspaceId, pagination, signal) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        const data = await this.workspaceServerService.server.gql({
            query: getWorkspaceEmbeddingFilesQuery,
            variables: {
                workspaceId,
                pagination,
            },
            context: { signal },
        });
        return data.workspace.embedding.files;
    }
    async getEmbeddingProgress(workspaceId, signal) {
        if (!this.workspaceServerService.server) {
            throw new Error('No Server');
        }
        const data = await this.workspaceServerService.server.gql({
            query: getWorkspaceEmbeddingStatusQuery,
            variables: {
                workspaceId,
            },
            context: { signal },
        });
        return data.queryWorkspaceEmbeddingStatus;
    }
}
//# sourceMappingURL=embedding.js.map