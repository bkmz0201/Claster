import type { AudioMediaPlaybackState } from '@affine/core/modules/media/entities/audio-media';
export declare const useSeekTime: (playbackState: {
    state: AudioMediaPlaybackState;
    seekOffset: number;
    updateTime: number;
    playbackRate: number;
} | undefined | null, duration?: number) => number;
//# sourceMappingURL=use-seek-time.d.ts.map