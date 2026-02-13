import type { TranscriptionBlockProps } from '@affine/core/blocksuite/ai/blocks/transcription-block/model';
import { UserFriendlyError } from '@affine/error';
import { AiJobStatus } from '@affine/graphql';
import { Entity, LiveData } from '@toeverything/infra';
import type { DefaultServerService, WorkspaceServerService } from '../../cloud';
import type { TranscriptionResult } from './types';
export type TranscriptionStatus = {
    status: 'waiting-for-job';
} | {
    status: 'started';
} | {
    status: AiJobStatus.pending;
} | {
    status: AiJobStatus.running;
} | {
    status: AiJobStatus.failed;
    error: UserFriendlyError;
} | {
    status: AiJobStatus.finished;
} | {
    status: AiJobStatus.claimed;
    result: TranscriptionResult;
};
export declare class AudioTranscriptionJob extends Entity<{
    readonly blockProps: TranscriptionBlockProps;
    readonly blobId: string;
    readonly getAudioFiles: () => Promise<File[]>;
}> {
    private readonly workspaceServerService;
    private readonly defaultServerService;
    constructor(workspaceServerService: WorkspaceServerService, defaultServerService: DefaultServerService);
    disposed: boolean;
    private readonly _status$;
    private readonly store;
    status$: LiveData<TranscriptionStatus>;
    transcribing$: LiveData<boolean>;
    error$: LiveData<UserFriendlyError | null>;
    readonly preflightCheck: () => Promise<{
        error: string;
        userId: string;
    } | undefined>;
    start(): Promise<TranscriptionStatus>;
    private untilJobFinishedOrClaimed;
    claim(): Promise<void>;
    isCreator(): boolean | "" | undefined;
    private get serverService();
    get currentUserId(): string | undefined;
}
//# sourceMappingURL=audio-transcription-job.d.ts.map