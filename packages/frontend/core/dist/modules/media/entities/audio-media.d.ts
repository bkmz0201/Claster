import { Entity, LiveData, type MediaStats } from '@toeverything/infra';
import type { WorkspaceService } from '../../workspace';
/**
 * Interface for audio sources that can be played by AudioMedia
 */
export interface AudioSource {
    /**
     * The source ID (blob id) for the blob
     */
    blobId: string;
    /**
     * The metadata of the audio source Web Media Session API
     */
    metadata: MediaMetadata;
}
export type AudioMediaPlaybackState = 'idle' | 'playing' | 'paused' | 'stopped';
export interface AudioMediaSyncState {
    state: AudioMediaPlaybackState;
    seekOffset: number;
    updateTime: number;
    playbackRate: number;
}
/**
 * Audio media entity.
 * Controls the playback of audio media.
 */
export declare class AudioMedia extends Entity<AudioSource> {
    private readonly workspaceService;
    constructor(workspaceService: WorkspaceService);
    loading$: LiveData<boolean>;
    loadError$: LiveData<Error | null>;
    waveform$: LiveData<number[] | null>;
    duration$: LiveData<number | null>;
    /**
     * LiveData that exposes the current playback state and data for global state synchronization
     */
    playbackState$: LiveData<AudioMediaSyncState>;
    stats$: LiveData<{
        waveform: number[];
        duration: number;
    }>;
    private readonly available;
    private readonly audioElement;
    private updatePlaybackState;
    getBuffer(): Promise<Uint8Array<ArrayBufferLike>>;
    private loadAudioBuffer;
    readonly revalidateBuffer: import("@toeverything/infra").Effect<unknown>;
    get waveform(): number[] | null;
    getStats(): Pick<MediaStats, 'duration' | 'waveform'>;
    private setupMediaSession;
    private updateMediaSessionMetadata;
    private updateMediaSessionPositionState;
    private updateMediaSessionPlaybackState;
    private cleanupMediaSession;
    play(skipUpdate?: boolean): void;
    pause(skipUpdate?: boolean): void;
    stop(skipUpdate?: boolean): void;
    seekTo(seekTime: number, skipUpdate?: boolean): void;
    syncState(state: AudioMediaSyncState): void;
    /**
     * Get the current playback seek position
     */
    getCurrentSeekPosition(): number;
    /**
     * Get the playback state data
     */
    getPlaybackStateData(): AudioMediaSyncState;
    private calculateStatsFromBuffer;
    /**
     * Calculate the waveform of the audio buffer for visualization
     */
    private calculateWaveform;
    /**
     * Set the playback rate (speed) of the audio and update the shared state
     */
    setPlaybackRate(rate: number): void;
}
//# sourceMappingURL=audio-media.d.ts.map