import { LiveData, type MediaStats, type PlaybackState } from '@toeverything/infra';
import type { GlobalState } from '../../storage';
export declare const GlobalMediaStateProvider: import("@toeverything/infra").Identifier<BaseGlobalMediaStateProvider> & ((variant: string) => import("@toeverything/infra").Identifier<BaseGlobalMediaStateProvider>);
/**
 * Base class for media state providers
 */
export declare abstract class BaseGlobalMediaStateProvider {
    abstract readonly playbackState$: LiveData<PlaybackState | null | undefined>;
    abstract readonly stats$: LiveData<MediaStats | null | undefined>;
    /**
     * Update the playback state
     * @param state Full state object or partial state to update
     */
    abstract updatePlaybackState(state: Partial<PlaybackState> | null): void;
    /**
     * Update the media stats
     * @param stats Full stats object or partial stats to update
     */
    abstract updateStats(stats: Partial<MediaStats> | null): void;
}
/**
 * Provider for global media state in Electron environment
 * This ensures only one media is playing at a time across all tabs
 */
export declare class ElectronGlobalMediaStateProvider extends BaseGlobalMediaStateProvider {
    private readonly globalState;
    constructor(globalState: GlobalState);
    readonly playbackState$: LiveData<PlaybackState | null | undefined>;
    readonly stats$: LiveData<MediaStats | null | undefined>;
    updatePlaybackState(state: Partial<PlaybackState> | null): void;
    updateStats(stats: Partial<MediaStats> | null): void;
}
/**
 * Provider for global media state in Web environment
 * This is a simplified version that only works within the current tab
 */
export declare class WebGlobalMediaStateProvider extends BaseGlobalMediaStateProvider {
    readonly playbackState$: LiveData<PlaybackState | null | undefined>;
    readonly stats$: LiveData<MediaStats | null | undefined>;
    /**
     * Update the playback state
     */
    updatePlaybackState(state: Partial<PlaybackState> | null): void;
    /**
     * Update the media stats
     */
    updateStats(stats: Partial<MediaStats> | null): void;
}
//# sourceMappingURL=global-audio-state.d.ts.map