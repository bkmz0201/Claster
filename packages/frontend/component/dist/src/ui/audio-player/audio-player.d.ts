import { type MouseEventHandler, type ReactNode } from 'react';
export interface AudioPlayerProps {
    name: string;
    description?: ReactNode;
    waveform: number[] | null;
    playbackState: 'idle' | 'playing' | 'paused' | 'stopped';
    seekTime: number;
    duration: number;
    loading?: boolean;
    notesEntry?: ReactNode;
    onClick?: MouseEventHandler<HTMLDivElement>;
    onPlay: MouseEventHandler;
    onPause: MouseEventHandler;
    onStop: MouseEventHandler;
    onSeek: (newTime: number) => void;
    playbackRate: number;
    onPlaybackRateChange: (rate: number) => void;
}
export declare const AudioPlayer: ({ name, description, playbackState, seekTime, duration, notesEntry, waveform, loading, onPlay, onPause, onSeek, onClick, playbackRate, onPlaybackRateChange, }: AudioPlayerProps) => import("react/jsx-runtime").JSX.Element;
export declare const MiniAudioPlayer: ({ name, playbackState, seekTime, duration, waveform, onPlay, onPause, onSeek, onClick, onStop, }: AudioPlayerProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=audio-player.d.ts.map