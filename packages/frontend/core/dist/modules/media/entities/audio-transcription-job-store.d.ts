import { Entity } from '@toeverything/infra';
import type { DefaultServerService, WorkspaceServerService } from '../../cloud';
import type { WorkspaceService } from '../../workspace';
export declare class AudioTranscriptionJobStore extends Entity<{
    readonly blobId: string;
    readonly getAudioFiles: () => Promise<File[]>;
}> {
    private readonly workspaceService;
    private readonly workspaceServerService;
    private readonly defaultServerService;
    constructor(workspaceService: WorkspaceService, workspaceServerService: WorkspaceServerService, defaultServerService: DefaultServerService);
    private get serverService();
    private get graphqlService();
    private get currentWorkspaceId();
    submitAudioTranscription: () => Promise<{
        __typename?: "TranscriptionResultType";
        id: string;
        status: import("@affine/graphql").AiJobStatus;
    }>;
    retryAudioTranscription: (jobId: string) => Promise<{
        __typename?: "TranscriptionResultType";
        id: string;
        status: import("@affine/graphql").AiJobStatus;
    }>;
    getAudioTranscription: (blobId: string, jobId?: string) => Promise<{
        __typename?: "TranscriptionResultType";
        id: string;
        status: import("@affine/graphql").AiJobStatus;
        title: string | null;
        summary: string | null;
        transcription: Array<{
            __typename?: "TranscriptionItemType";
            speaker: string;
            start: string;
            end: string;
            transcription: string;
        }> | null;
    } | null>;
    claimAudioTranscription: (jobId: string) => Promise<{
        __typename?: "TranscriptionResultType";
        id: string;
        status: import("@affine/graphql").AiJobStatus;
        title: string | null;
        summary: string | null;
        actions: string | null;
        transcription: Array<{
            __typename?: "TranscriptionItemType";
            speaker: string;
            start: string;
            end: string;
            transcription: string;
        }> | null;
    }>;
}
//# sourceMappingURL=audio-transcription-job-store.d.ts.map