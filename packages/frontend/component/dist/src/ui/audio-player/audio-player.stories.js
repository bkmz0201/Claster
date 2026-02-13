import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import bytes from 'bytes';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AudioPlayer, MiniAudioPlayer } from './audio-player';
const AudioWrapper = () => {
    const [audioFile, setAudioFile] = useState(null);
    const [waveform, setWaveform] = useState(null);
    const [playbackState, setPlaybackState] = useState('idle');
    const [seekTime, setSeekTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [loading, setLoading] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1.0);
    const audioRef = useRef(null);
    const audioUrlRef = useRef(null);
    // Generate waveform data from audio file
    const generateWaveform = async (audioBuffer) => {
        const channelData = audioBuffer.getChannelData(0);
        const samples = 1000;
        const blockSize = Math.floor(channelData.length / samples);
        const waveformData = [];
        for (let i = 0; i < samples; i++) {
            const start = i * blockSize;
            const end = start + blockSize;
            let sum = 0;
            for (let j = start; j < end; j++) {
                sum += Math.abs(channelData[j]);
            }
            waveformData.push(sum / blockSize);
        }
        // Normalize waveform data
        const max = Math.max(...waveformData);
        return waveformData.map(val => val / max);
    };
    const handleFileChange = useCallback(async (file) => {
        setLoading(true);
        setAudioFile(file);
        setPlaybackState('idle');
        setSeekTime(0);
        setDuration(0);
        setWaveform(null);
        // Revoke previous URL if exists
        if (audioUrlRef.current) {
            URL.revokeObjectURL(audioUrlRef.current);
        }
        // Create new URL for the audio file
        const fileUrl = URL.createObjectURL(file);
        audioUrlRef.current = fileUrl;
        try {
            const arrayBuffer = await file.arrayBuffer();
            const audioContext = new AudioContext();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            const waveformData = await generateWaveform(audioBuffer);
            setWaveform(waveformData);
        }
        catch (error) {
            console.error('Error processing audio file:', error);
        }
        finally {
            setLoading(false);
        }
    }, []);
    // Cleanup object URL when component unmounts
    useEffect(() => {
        return () => {
            if (audioUrlRef.current) {
                URL.revokeObjectURL(audioUrlRef.current);
            }
        };
    }, []);
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('audio/')) {
            handleFileChange(file).catch(console.error);
        }
    }, [handleFileChange]);
    const handleFileSelect = useCallback((e) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileChange(file).catch(console.error);
        }
    }, [handleFileChange]);
    const handlePlay = useCallback((e) => {
        e.stopPropagation();
        if (audioRef.current) {
            const playPromise = audioRef.current.play();
            // Handle play promise to catch any errors
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                    setPlaybackState('playing');
                })
                    .catch(error => {
                    console.error('Error playing audio:', error);
                    setPlaybackState('paused');
                });
            }
        }
    }, []);
    const handlePause = useCallback((e) => {
        e.stopPropagation();
        if (audioRef.current) {
            audioRef.current.pause();
            setPlaybackState('paused');
        }
    }, []);
    const handleStop = useCallback((e) => {
        e.stopPropagation();
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setPlaybackState('stopped');
            setSeekTime(0);
        }
    }, []);
    const handleSeek = useCallback((time) => {
        if (audioRef.current) {
            // Ensure time is within valid range
            const clampedTime = Math.max(0, Math.min(time, audioRef.current.duration));
            audioRef.current.currentTime = clampedTime;
            if (playbackState === 'stopped') {
                setPlaybackState('paused');
            }
        }
    }, [playbackState]);
    const handlePlaybackRateChange = useCallback((rate) => {
        if (audioRef.current) {
            audioRef.current.playbackRate = rate;
            setPlaybackRate(rate);
        }
    }, []);
    const description = useMemo(() => {
        return audioFile ? _jsx(_Fragment, { children: bytes(audioFile.size) }) : null;
    }, [audioFile]);
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !audioFile)
            return;
        const updateTime = () => {
            setSeekTime(audio.currentTime);
        };
        const updateDuration = () => {
            if (!isNaN(audio.duration) && isFinite(audio.duration)) {
                setDuration(audio.duration);
                setPlaybackState('paused');
                setLoading(false);
            }
        };
        // Handle direct interaction with audio element controls
        const handleNativeTimeUpdate = () => {
            setSeekTime(audio.currentTime);
        };
        const handleNativePlay = () => {
            setPlaybackState('playing');
        };
        const handleNativePause = () => {
            if (audio.currentTime >= audio.duration - 0.1) {
                setPlaybackState('stopped');
                setSeekTime(0);
            }
            else {
                setPlaybackState('paused');
            }
        };
        const handleEnded = () => {
            setPlaybackState('stopped');
            setSeekTime(0);
        };
        const handlePlaying = () => {
            setPlaybackState('playing');
        };
        const handlePaused = () => {
            if (audio.currentTime === 0) {
                setPlaybackState('stopped');
            }
            else {
                setPlaybackState('paused');
            }
        };
        const handleError = () => {
            console.error('Audio playback error');
            setPlaybackState('stopped');
            setLoading(false);
        };
        const handleWaiting = () => {
            setLoading(true);
        };
        const handleCanPlay = () => {
            setLoading(false);
        };
        // Add all event listeners
        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('seeking', handleNativeTimeUpdate);
        audio.addEventListener('seeked', handleNativeTimeUpdate);
        audio.addEventListener('play', handleNativePlay);
        audio.addEventListener('pause', handleNativePause);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('durationchange', updateDuration);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('playing', handlePlaying);
        audio.addEventListener('pause', handlePaused);
        audio.addEventListener('error', handleError);
        audio.addEventListener('waiting', handleWaiting);
        audio.addEventListener('canplay', handleCanPlay);
        return () => {
            // Remove all event listeners
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('seeking', handleNativeTimeUpdate);
            audio.removeEventListener('seeked', handleNativeTimeUpdate);
            audio.removeEventListener('play', handleNativePlay);
            audio.removeEventListener('pause', handleNativePause);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('durationchange', updateDuration);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('playing', handlePlaying);
            audio.removeEventListener('pause', handlePaused);
            audio.removeEventListener('error', handleError);
            audio.removeEventListener('waiting', handleWaiting);
            audio.removeEventListener('canplay', handleCanPlay);
        };
    }, [audioFile]);
    return (_jsx("div", { style: {
            width: '100%',
            minWidth: '600px',
            minHeight: '200px',
            border: '2px dashed #ccc',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            gap: '20px',
        }, onDrop: handleDrop, onDragOver: e => e.preventDefault(), children: !audioFile ? (_jsxs(_Fragment, { children: [_jsx("div", { children: "Drag & drop an audio file here, or" }), _jsx("input", { type: "file", accept: "audio/*", onChange: handleFileSelect, style: { maxWidth: '200px' } })] })) : (_jsxs(_Fragment, { children: [_jsx("audio", { ref: audioRef, src: audioUrlRef.current || '', preload: "metadata", controls: true, style: { width: '100%', maxWidth: '600px' } }), _jsx(MiniAudioPlayer, { name: audioFile.name, description: description, waveform: waveform, playbackState: playbackState, seekTime: seekTime, duration: duration, loading: loading, onPlay: handlePlay, onPause: handlePause, onStop: handleStop, onSeek: handleSeek, playbackRate: playbackRate, onPlaybackRateChange: handlePlaybackRateChange }), _jsx(AudioPlayer, { name: audioFile.name, description: description, waveform: waveform, playbackState: playbackState, seekTime: seekTime, duration: duration, loading: loading || waveform === null, onPlay: handlePlay, onPause: handlePause, onStop: handleStop, onSeek: handleSeek, playbackRate: playbackRate, onPlaybackRateChange: handlePlaybackRateChange })] })) }));
};
const meta = {
    title: 'UI/AudioPlayer',
    component: AudioWrapper,
    parameters: {
        layout: 'centered',
    },
};
export default meta;
export const Default = {};
//# sourceMappingURL=audio-player.stories.js.map