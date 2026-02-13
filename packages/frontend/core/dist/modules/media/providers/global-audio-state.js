import { createIdentifier, LiveData, } from '@toeverything/infra';
const GLOBAL_MEDIA_PLAYBACK_STATE_KEY = 'media:playback-state';
const GLOBAL_MEDIA_STATS_KEY = 'media:stats';
export const GlobalMediaStateProvider = createIdentifier('GlobalMediaStateProvider');
/**
 * Base class for media state providers
 */
export class BaseGlobalMediaStateProvider {
}
/**
 * Provider for global media state in Electron environment
 * This ensures only one media is playing at a time across all tabs
 */
export class ElectronGlobalMediaStateProvider extends BaseGlobalMediaStateProvider {
    constructor(globalState) {
        super();
        this.globalState = globalState;
        this.playbackState$ = LiveData.from(this.globalState.watch(GLOBAL_MEDIA_PLAYBACK_STATE_KEY), this.globalState.get(GLOBAL_MEDIA_PLAYBACK_STATE_KEY));
        this.stats$ = LiveData.from(this.globalState.watch(GLOBAL_MEDIA_STATS_KEY), this.globalState.get(GLOBAL_MEDIA_STATS_KEY));
    }
    updatePlaybackState(state) {
        if (state === null) {
            this.globalState.set(GLOBAL_MEDIA_PLAYBACK_STATE_KEY, null);
            return;
        }
        const currentState = this.playbackState$.value;
        const newState = currentState
            ? { ...currentState, ...state }
            : state;
        this.globalState.set(GLOBAL_MEDIA_PLAYBACK_STATE_KEY, newState);
    }
    updateStats(stats) {
        if (stats === null) {
            this.globalState.set(GLOBAL_MEDIA_STATS_KEY, null);
            return;
        }
        const currentStats = this.stats$.value;
        const newStats = currentStats
            ? { ...currentStats, ...stats }
            : stats;
        this.globalState.set(GLOBAL_MEDIA_STATS_KEY, newStats);
    }
}
/**
 * Provider for global media state in Web environment
 * This is a simplified version that only works within the current tab
 */
export class WebGlobalMediaStateProvider extends BaseGlobalMediaStateProvider {
    constructor() {
        super(...arguments);
        this.playbackState$ = new LiveData(null);
        this.stats$ = new LiveData(null);
    }
    /**
     * Update the playback state
     */
    updatePlaybackState(state) {
        if (state === null) {
            this.playbackState$.setValue(null);
            return;
        }
        const currentState = this.playbackState$.value;
        const newState = currentState
            ? { ...currentState, ...state }
            : state;
        this.playbackState$.setValue(newState);
    }
    /**
     * Update the media stats
     */
    updateStats(stats) {
        if (stats === null) {
            this.stats$.setValue(null);
            return;
        }
        const currentStats = this.stats$.value;
        const newStats = currentStats
            ? { ...currentStats, ...stats }
            : stats;
        this.stats$.setValue(newStats);
    }
}
//# sourceMappingURL=global-audio-state.js.map