import { type TranscriptionBlockModel } from '@affine/core/blocksuite/ai/blocks/transcription-block/model';
import type { AttachmentBlockModel } from '@blocksuite/affine/model';
import { Entity, LiveData } from '@toeverything/infra';
import type { WorkspaceService } from '../../workspace';
import type { AudioMediaManagerService } from '../services/audio-media-manager';
import type { MeetingSettingsService } from '../services/meeting-settings';
import type { AudioMedia } from './audio-media';
import { AudioTranscriptionJob } from './audio-transcription-job';
export declare class AudioAttachmentBlock extends Entity<AttachmentBlockModel> {
    readonly audioMediaManagerService: AudioMediaManagerService;
    readonly workspaceService: WorkspaceService;
    readonly meetingSettingsService: MeetingSettingsService;
    private readonly refCount$;
    readonly audioMedia: AudioMedia;
    constructor(audioMediaManagerService: AudioMediaManagerService, workspaceService: WorkspaceService, meetingSettingsService: MeetingSettingsService);
    rendering$: LiveData<boolean>;
    expanded$: LiveData<boolean>;
    readonly transcriptionBlock$: LiveData<TranscriptionBlockModel | null>;
    hasTranscription$: LiveData<boolean | null>;
    transcriptionJob: AudioTranscriptionJob;
    mount(): void;
    unmount(): void;
    private createTranscriptionJob;
    readonly transcribe: () => Promise<void>;
    private readonly fillTranscriptionResult;
}
//# sourceMappingURL=audio-attachment-block.d.ts.map