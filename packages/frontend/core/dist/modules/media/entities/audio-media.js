import { DebugLogger } from '@affine/debug';
import { catchErrorInto, effect, Entity, fromPromise, LiveData, onComplete, onStart, } from '@toeverything/infra';
import { clamp } from 'lodash-es';
import { mergeMap, switchMap } from 'rxjs';
const logger = new DebugLogger('AttachmentBlockMedia');
/**
 * Audio media entity.
 * Controls the playback of audio media.
 */
export class AudioMedia extends Entity {
    constructor(workspaceService) {
        super();
        this.workspaceService = workspaceService;
        this.loading$ = new LiveData(false);
        this.loadError$ = new LiveData(null);
        this.waveform$ = new LiveData(null);
        this.duration$ = new LiveData(null);
        /**
         * LiveData that exposes the current playback state and data for global state synchronization
         */
        this.playbackState$ = new LiveData({
            state: 'idle',
            seekOffset: 0,
            updateTime: 0,
            playbackRate: 1.0,
        });
        this.stats$ = LiveData.computed(get => {
            const waveform = get(this.waveform$) ?? [];
            const duration = get(this.duration$) ?? 0;
            return { waveform, duration };
        });
        // `MediaSession` is available
        this.available = 'mediaSession' in navigator;
        this.revalidateBuffer = effect(switchMap(() => {
            return fromPromise(async () => {
                return this.loadAudioBuffer();
            }).pipe(mergeMap(async (blob) => {
                const url = URL.createObjectURL(blob);
                // Set the audio element source
                this.audioElement.src = url;
                // If the media is playing, resume the playback
                if (this.playbackState$.getValue().state === 'playing') {
                    this.play(true);
                }
                this.audioElement.onloadedmetadata = () => {
                    this.duration$.setValue(this.audioElement.duration);
                };
                const startTime = performance.now();
                // calculating audio stats is expensive. Maybe persist the result in cache?
                const stats = await this.calculateStatsFromBuffer(blob);
                this.waveform$.setValue(stats.waveform);
                logger.debug(`Calculate audio stats time: ${performance.now() - startTime}ms`);
            }), onStart(() => {
                this.loadError$.setValue(null);
                this.loading$.setValue(true);
            }), onComplete(() => {
                this.loading$.setValue(false);
            }), catchErrorInto(this.loadError$));
        }));
        // Create audio element
        this.audioElement = new Audio();
        // Set up event listeners for the audio element
        const onPlay = () => {
            this.updatePlaybackState('playing', this.playbackState$.getValue().seekOffset, Date.now());
            this.updateMediaSessionPlaybackState('playing');
        };
        const onPause = () => {
            this.pause();
        };
        const onEnded = () => {
            this.pause();
        };
        // Add event listeners
        this.audioElement.addEventListener('play', onPlay);
        this.audioElement.addEventListener('pause', onPause);
        this.audioElement.addEventListener('ended', onEnded);
        this.revalidateBuffer();
        // React to playbackState$ changes to update playbackRate and media session
        const playbackStateSub = this.playbackState$.subscribe(state => {
            this.audioElement.playbackRate = state.playbackRate;
            this.updateMediaSessionPositionState(this.audioElement.currentTime);
        });
        this.disposables.push(() => playbackStateSub.unsubscribe());
        this.disposables.push(() => {
            // Clean up audio resources before calling super.dispose
            try {
                // Remove event listeners
                this.audioElement.removeEventListener('play', onPlay);
                this.audioElement.removeEventListener('pause', onPause);
                this.audioElement.removeEventListener('ended', onEnded);
                // Revoke blob URL if it exists
                if (this.audioElement.src &&
                    this.audioElement.src.startsWith('blob:')) {
                    URL.revokeObjectURL(this.audioElement.src);
                }
                this.audioElement.pause();
                this.audioElement.src = '';
                this.audioElement.load(); // Reset and release resources
                // Clean up media session
                this.cleanupMediaSession();
            }
            catch (e) {
                // Ignore errors during cleanup
                logger.warn('Error cleaning up audio element during disposal', e);
            }
        });
    }
    updatePlaybackState(state, seekOffset, updateTime = Date.now(), playbackRate) {
        const prev = this.playbackState$.getValue();
        this.playbackState$.setValue({
            state,
            seekOffset,
            updateTime,
            playbackRate: playbackRate ?? prev.playbackRate ?? 1.0,
        });
    }
    async getBuffer() {
        const blobId = this.props.blobId;
        if (!blobId) {
            throw new Error('Audio source ID not found');
        }
        const blobRecord = await this.workspaceService.workspace.engine.blob.get(blobId);
        if (!blobRecord) {
            throw new Error('Audio blob not found');
        }
        return blobRecord.data;
    }
    async loadAudioBuffer() {
        const uint8Array = await this.getBuffer();
        return new Blob([uint8Array]);
    }
    get waveform() {
        return this.waveform$.getValue();
    }
    getStats() {
        return this.stats$.getValue();
    }
    setupMediaSession() {
        if (!this.available) {
            return;
        }
        // Set up media session action handlers
        navigator.mediaSession.setActionHandler('play', () => {
            this.play();
        });
        navigator.mediaSession.setActionHandler('pause', () => {
            this.pause();
        });
        navigator.mediaSession.setActionHandler('stop', () => {
            this.stop();
        });
        navigator.mediaSession.setActionHandler('seekto', details => {
            if (details.seekTime !== undefined) {
                this.seekTo(details.seekTime);
            }
        });
    }
    updateMediaSessionMetadata() {
        if (!this.available || !this.props.metadata) {
            return;
        }
        navigator.mediaSession.metadata = this.props.metadata;
    }
    updateMediaSessionPositionState(seekTime) {
        if (!this.available) {
            return;
        }
        const duration = this.audioElement.duration || 0;
        const playbackRate = this.playbackState$.getValue().playbackRate ?? 1.0;
        if (duration > 0) {
            navigator.mediaSession.setPositionState({
                duration,
                position: seekTime,
                playbackRate,
            });
        }
    }
    updateMediaSessionPlaybackState(state) {
        if (!this.available) {
            return;
        }
        navigator.mediaSession.playbackState =
            state === 'playing' ? 'playing' : 'paused';
        this.updateMediaSessionMetadata();
    }
    cleanupMediaSession() {
        if (!this.available) {
            return;
        }
        navigator.mediaSession.metadata = null;
        // Reset all action handlers
        navigator.mediaSession.setActionHandler('play', null);
        navigator.mediaSession.setActionHandler('pause', null);
        navigator.mediaSession.setActionHandler('stop', null);
        navigator.mediaSession.setActionHandler('seekto', null);
    }
    play(skipUpdate) {
        if (!this.audioElement.src) {
            return;
        }
        const duration = this.audioElement.duration || 0;
        const currentSeek = this.getCurrentSeekPosition();
        if (!skipUpdate || currentSeek >= duration) {
            // If we're at the end of the track, reset the seek position to 0
            if (currentSeek >= duration) {
                this.audioElement.currentTime = 0;
                this.updatePlaybackState('playing', 0);
            }
            else {
                this.updatePlaybackState('playing', this.playbackState$.getValue().seekOffset);
            }
        }
        // Play the audio element
        this.audioElement.play().catch(error => {
            logger.error('Error playing audio:', error);
            this.updatePlaybackState('paused', this.audioElement.currentTime);
        });
        // Set up media session when playback starts
        this.setupMediaSession();
        this.updateMediaSessionPositionState(this.audioElement.currentTime);
        this.updateMediaSessionPlaybackState('playing');
    }
    pause(skipUpdate) {
        if (!this.audioElement.src) {
            return;
        }
        if (!skipUpdate) {
            // Update startSeekOffset before pausing
            this.updatePlaybackState('paused', this.audioElement.currentTime);
        }
        // Pause the audio element
        this.audioElement.pause();
        this.updateMediaSessionPlaybackState('paused');
    }
    stop(skipUpdate) {
        if (!this.audioElement.src) {
            return;
        }
        // Pause the audio element and reset position
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        if (!skipUpdate) {
            // Reset the seek position
            this.updatePlaybackState('stopped', 0);
        }
        this.updateMediaSessionPlaybackState('stopped');
        // Clean up media session when stopped
        this.cleanupMediaSession();
    }
    // Add a seekTo method to handle seeking
    seekTo(seekTime, skipUpdate) {
        if (!this.audioElement.src) {
            return;
        }
        const duration = this.audioElement.duration;
        // Clamp the time value between 0 and duration
        const clampedTime = clamp(0, seekTime, duration || 0);
        // Update the audio element's current time
        this.audioElement.currentTime = clampedTime;
        // Update startSeekOffset and startTime if playing
        const currentState = this.playbackState$.getValue();
        if (!skipUpdate) {
            this.updatePlaybackState(currentState.state, clampedTime);
        }
        this.updateMediaSessionPositionState(clampedTime);
    }
    syncState(state) {
        const currentState = this.playbackState$.getValue();
        if (state.updateTime <= currentState.updateTime) {
            return;
        }
        this.updatePlaybackState(state.state, state.seekOffset, state.updateTime, state.playbackRate);
        if (state.state !== currentState.state) {
            if (state.state === 'playing') {
                this.play(true);
            }
            else if (state.state === 'paused') {
                this.pause(true);
            }
            else if (state.state === 'stopped') {
                this.stop(true);
            }
        }
        this.seekTo(state.seekOffset, true);
        this.audioElement.playbackRate = state.playbackRate ?? 1.0;
    }
    /**
     * Get the current playback seek position
     */
    getCurrentSeekPosition() {
        if (this.playbackState$.getValue().state === 'playing') {
            // For playing state, use the actual current time from audio element
            return this.audioElement.currentTime;
        }
        // For other states, return the stored offset
        return this.playbackState$.getValue().seekOffset;
    }
    /**
     * Get the playback state data
     */
    getPlaybackStateData() {
        return this.playbackState$.getValue();
    }
    async calculateStatsFromBuffer(buffer) {
        const audioContext = new AudioContext();
        const audioBuffer = await audioContext.decodeAudioData(await buffer.arrayBuffer());
        const waveform = await this.calculateWaveform(audioBuffer);
        return { waveform };
    }
    /**
     * Calculate the waveform of the audio buffer for visualization
     */
    async calculateWaveform(audioBuffer) {
        // Get the first channel's data
        const channelData = audioBuffer.getChannelData(0);
        const samples = 1000; // Number of points in the waveform
        const blockSize = Math.floor(channelData.length / samples);
        const waveform = [];
        // First pass: calculate raw averages
        for (let i = 0; i < samples; i++) {
            const start = i * blockSize;
            const end = start + blockSize;
            let sum = 0;
            for (let j = start; j < end; j++) {
                sum += Math.abs(channelData[j]);
            }
            const average = sum / blockSize;
            waveform.push(average);
        }
        // Second pass: normalize to make max value 1
        const maxValue = Math.max(...waveform);
        if (maxValue > 0) {
            for (let i = 0; i < waveform.length; i++) {
                waveform[i] = waveform[i] / maxValue;
            }
        }
        return waveform;
    }
    /**
     * Set the playback rate (speed) of the audio and update the shared state
     */
    setPlaybackRate(rate) {
        // Clamp the rate to a reasonable range (e.g., 0.5x to 4x)
        const clamped = clamp(rate, 0.5, 4.0);
        const prev = this.playbackState$.getValue();
        this.updatePlaybackState(prev.state, this.getCurrentSeekPosition(), Date.now(), clamped);
    }
}
//# sourceMappingURL=audio-media.js.map