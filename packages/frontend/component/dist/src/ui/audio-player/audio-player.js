import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { CloseIcon, ForwardThirtySecondsIcon, RewindFifteenSecondsIcon, VoiceIcon, } from '@blocksuite/icons/rc';
import { clamp } from 'lodash-es';
import { useCallback } from 'react';
import { Button, IconButton } from '../button';
import { AnimatedPlayIcon } from '../lottie';
import { Menu, MenuItem } from '../menu';
import * as styles from './audio-player.css';
import { AudioWaveform } from './audio-waveform';
// Format seconds to mm:ss
const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};
// Playback rate options
const playbackRates = [0.5, 0.75, 1, 1.5, 1.75, 2, 3];
export const AudioPlayer = ({ name, description, playbackState, seekTime, duration, notesEntry, waveform, loading, onPlay, onPause, onSeek, onClick, playbackRate, onPlaybackRateChange, }) => {
    // Handle progress bar click
    const handleProgressClick = useCallback((progress) => {
        const newTime = progress * duration;
        onSeek(newTime);
    }, [duration, onSeek]);
    const handlePlayToggle = useCallback((e) => {
        e.stopPropagation();
        if (loading) {
            return;
        }
        if (playbackState === 'playing') {
            onPause(e);
        }
        else {
            onPlay(e);
        }
    }, [loading, playbackState, onPause, onPlay]);
    const handlePlaybackRateChange = useCallback((rate) => {
        onPlaybackRateChange(rate);
    }, [onPlaybackRateChange]);
    // Calculate progress percentage
    const progressPercentage = duration > 0 ? seekTime / duration : 0;
    return (_jsxs("div", { className: styles.root, onClick: onClick, children: [_jsxs("div", { className: styles.upper, children: [_jsxs("div", { className: styles.upperLeft, children: [_jsxs("div", { className: styles.upperRow, children: [_jsx(VoiceIcon, {}), _jsx("div", { className: styles.nameLabel, children: name })] }), _jsx("div", { className: styles.upperRow, children: _jsx("div", { className: styles.description, children: description }) })] }), _jsxs("div", { className: styles.upperRight, children: [_jsx(Menu, { rootOptions: { modal: false }, items: _jsx(_Fragment, { children: playbackRates.map(rate => (_jsxs(MenuItem, { selected: rate === playbackRate, onClick: () => handlePlaybackRateChange(rate), children: [rate, "x"] }, rate))) }), children: _jsxs(Button, { variant: "plain", className: styles.playbackRateDisplay, children: [playbackRate, "x"] }) }), notesEntry, _jsx(AnimatedPlayIcon, { onClick: handlePlayToggle, className: styles.controlButton, state: playbackState === 'playing' ? 'pause' : 'play' })] })] }), _jsxs("div", { className: styles.progressContainer, children: [_jsx("div", { className: styles.timeDisplay, children: formatTime(seekTime) }), _jsx(AudioWaveform, { waveform: waveform || [], progress: progressPercentage, onManualSeek: handleProgressClick, loading: !waveform || waveform.length === 0 }), _jsx("div", { className: styles.timeDisplay, children: formatTime(duration) })] })] }));
};
export const MiniAudioPlayer = ({ name, playbackState, seekTime, duration, waveform, onPlay, onPause, onSeek, onClick, onStop, }) => {
    // Handle progress bar click
    const handleProgressClick = useCallback((progress) => {
        const newTime = progress * duration;
        onSeek(newTime);
    }, [duration, onSeek]);
    const handlePlayToggle = useCallback((e) => {
        e.stopPropagation();
        if (playbackState === 'playing') {
            onPause(e);
        }
        else {
            onPlay(e);
        }
    }, [playbackState, onPlay, onPause]);
    const handleRewind = useCallback((e) => {
        e.stopPropagation();
        onSeek(clamp(seekTime - 15, 0, duration));
    }, [seekTime, duration, onSeek]);
    const handleForward = useCallback((e) => {
        e.stopPropagation();
        onSeek(clamp(seekTime + 30, 0, duration));
    }, [seekTime, duration, onSeek]);
    const handleClose = useCallback((e) => {
        e.stopPropagation();
        onStop(e);
    }, [onStop]);
    // Calculate progress percentage
    const progressPercentage = duration > 0 ? seekTime / duration : 0;
    return (_jsxs("div", { className: styles.miniRoot, onClick: onClick, children: [_jsx("div", { className: styles.miniNameLabel, children: name }), _jsxs("div", { className: styles.miniPlayerContainer, children: [_jsx(IconButton, { icon: _jsx(RewindFifteenSecondsIcon, {}), size: 18, variant: "plain", onClick: handleRewind }), _jsx(AnimatedPlayIcon, { onClick: handlePlayToggle, className: styles.controlButton, state: playbackState === 'playing' ? 'pause' : 'play' }), _jsx(IconButton, { icon: _jsx(ForwardThirtySecondsIcon, {}), size: 18, variant: "plain", onClick: handleForward })] }), _jsx(IconButton, { className: styles.miniCloseButton, icon: _jsx(CloseIcon, {}), size: 16, variant: "plain", onClick: handleClose }), _jsx("div", { className: styles.miniProgressContainer, children: _jsx(AudioWaveform, { waveform: waveform || [], progress: progressPercentage, onManualSeek: handleProgressClick, mini: true }) })] }));
};
//# sourceMappingURL=audio-player.js.map