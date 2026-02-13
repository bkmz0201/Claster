import { claimAudioTranscriptionMutation, getAudioTranscriptionQuery, retryAudioTranscriptionMutation, submitAudioTranscriptionMutation, } from '@affine/graphql';
import { Entity } from '@toeverything/infra';
import { GraphQLService } from '../../cloud/services/graphql';
export class AudioTranscriptionJobStore extends Entity {
    constructor(workspaceService, workspaceServerService, defaultServerService) {
        super();
        this.workspaceService = workspaceService;
        this.workspaceServerService = workspaceServerService;
        this.defaultServerService = defaultServerService;
        this.submitAudioTranscription = async () => {
            const graphqlService = this.graphqlService;
            if (!graphqlService) {
                throw new Error('No graphql service available');
            }
            const files = await this.props.getAudioFiles();
            const response = await graphqlService.gql({
                timeout: 0, // default 15s is too short for audio transcription
                query: submitAudioTranscriptionMutation,
                variables: {
                    workspaceId: this.currentWorkspaceId,
                    blobId: this.props.blobId,
                    blobs: files,
                },
            });
            if (!response.submitAudioTranscription?.id) {
                throw new Error('Failed to submit audio transcription');
            }
            return response.submitAudioTranscription;
        };
        this.retryAudioTranscription = async (jobId) => {
            const graphqlService = this.graphqlService;
            if (!graphqlService) {
                throw new Error('No graphql service available');
            }
            const response = await graphqlService.gql({
                query: retryAudioTranscriptionMutation,
                variables: {
                    jobId,
                    workspaceId: this.currentWorkspaceId,
                },
            });
            if (!response.retryAudioTranscription) {
                throw new Error('Failed to retry audio transcription');
            }
            return response.retryAudioTranscription;
        };
        this.getAudioTranscription = async (blobId, jobId) => {
            const graphqlService = this.graphqlService;
            if (!graphqlService) {
                throw new Error('No graphql service available');
            }
            const currentWorkspaceId = this.currentWorkspaceId;
            if (!currentWorkspaceId) {
                throw new Error('No current workspace id');
            }
            const response = await graphqlService.gql({
                query: getAudioTranscriptionQuery,
                variables: {
                    workspaceId: currentWorkspaceId,
                    jobId,
                    blobId,
                },
            });
            if (!response.currentUser?.copilot?.audioTranscription) {
                return null;
            }
            return response.currentUser.copilot.audioTranscription;
        };
        this.claimAudioTranscription = async (jobId) => {
            const graphqlService = this.graphqlService;
            if (!graphqlService) {
                throw new Error('No graphql service available');
            }
            const response = await graphqlService.gql({
                query: claimAudioTranscriptionMutation,
                variables: {
                    jobId,
                },
            });
            if (!response.claimAudioTranscription) {
                throw new Error('Failed to claim transcription result');
            }
            return response.claimAudioTranscription;
        };
    }
    get serverService() {
        return (this.workspaceServerService.server || this.defaultServerService.server);
    }
    get graphqlService() {
        return this.serverService?.scope.get(GraphQLService);
    }
    get currentWorkspaceId() {
        return this.workspaceService.workspace.id;
    }
}
//# sourceMappingURL=audio-transcription-job-store.js.map