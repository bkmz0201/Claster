import { AttachmentBlockModel } from '@blocksuite/affine/model';
import { type AudioMediaKey, type MediaStats, type PlaybackState, Service } from '@toeverything/infra';
import type { WorkbenchService } from '../../workbench';
import { AudioMedia } from '../entities/audio-media';
import type { BaseGlobalMediaStateProvider } from '../providers/global-audio-state';
export declare class AudioMediaManagerService extends Service {
    private readonly globalMediaState;
    private readonly workbench;
    private readonly mediaPool;
    private readonly mediaDisposables;
    private readonly desktopApi;
    constructor(globalMediaState: BaseGlobalMediaStateProvider, workbench: WorkbenchService);
    private observeGlobalPlaybackState;
    get playbackState$(): import("@toeverything/infra").LiveData<PlaybackState | null | undefined>;
    get playbackStats$(): import("@toeverything/infra").LiveData<MediaStats | null | undefined>;
    ensureMediaEntity(input: AttachmentBlockModel | MediaStats): {
        media: AudioMedia;
        release: () => void;
    };
    play(): void;
    pause(): void;
    stop(): void;
    seekTo(time: number): void;
    /**
     * Sets the playback rate (speed) for the current audio
     * @param rate The playback rate (0.5 to 4.0)
     */
    setPlaybackRate(rate: number): void;
    focusAudioMedia(key: AudioMediaKey, tabId: string | null): void;
    private getActiveMediaKey;
    private getGlobalPlaybackState;
    private getGlobalMediaStats;
    private ensureExclusivePlayback;
    get currentTabId(): string;
    private normalizeEntityDescriptor;
    /**
     * Pause all playing media except the one with the given ID
     * IN THE CURRENT TAB
     */
    private pauseAllMedia;
    private stopAllMedia;
}
//# sourceMappingURL=audio-media-manager.d.ts.map