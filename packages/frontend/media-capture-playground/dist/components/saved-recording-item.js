import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { formatDuration, socket } from '../utils';
import { DefaultAppIcon, DeleteIcon, ErrorIcon, ForwardIcon, LoadingSpinner, MicrophoneIcon, PauseIcon, PlayIcon, RewindIcon, WarningIcon, } from './icons';
// Audio player controls component
function AudioControls({ audioRef, playbackRate, onPlaybackRateChange, onSeek, onPlayPause, }) {
    const [currentTime, setCurrentTime] = React.useState('00:00');
    const [duration, setDuration] = React.useState('00:00');
    React.useEffect(() => {
        const audio = audioRef.current;
        if (!audio)
            return;
        const formatTime = (time) => {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        };
        const updateTime = () => {
            setCurrentTime(formatTime(audio.currentTime));
            setDuration(formatTime(audio.duration));
        };
        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateTime);
        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateTime);
        };
    }, [audioRef]);
    return (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("button", { onClick: () => onSeek(-15), className: "p-2 hover:bg-gray-50 rounded-lg transition-all duration-200 border border-transparent hover:border-gray-100 hover:shadow-sm", title: "Back 15 seconds", children: _jsx(RewindIcon, {}) }), _jsx("button", { onClick: onPlayPause, className: "p-2 hover:bg-gray-50 rounded-lg transition-all duration-200 border border-transparent hover:border-gray-100 hover:shadow-sm", children: audioRef.current?.paused ? _jsx(PlayIcon, {}) : _jsx(PauseIcon, {}) }), _jsx("button", { onClick: () => onSeek(30), className: "p-2 hover:bg-gray-50 rounded-lg transition-all duration-200 border border-transparent hover:border-gray-100 hover:shadow-sm", title: "Forward 30 seconds", children: _jsx(ForwardIcon, {}) }), _jsxs("div", { className: "text-sm font-mono text-gray-500 ml-2", children: [currentTime, " ", _jsx("span", { className: "text-gray-400", children: "/" }), " ", duration] })] }), _jsxs("button", { onClick: onPlaybackRateChange, className: "px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray-100 hover:shadow-sm", children: [playbackRate, "x"] })] }));
}
// Waveform visualization component
function WaveformVisualizer({ containerRef, waveformData, currentTime, fileName, }) {
    return (_jsx("div", { className: "relative h-14 bg-gray-50 overflow-hidden rounded-lg border border-gray-100", ref: containerRef, children: _jsx("div", { className: "absolute inset-0 flex items-end", children: waveformData.map((amplitude, i) => (_jsx("div", { className: "flex-1 bg-red-400 transition-all duration-200", style: {
                    height: `${Math.max(amplitude * 100, 3)}%`,
                    opacity: i < Math.floor(currentTime * waveformData.length) ? 1 : 0.3,
                    margin: '0 0.5px',
                } }, `${fileName}-bar-${i}`))) }) }));
}
// Update TranscriptionMessage component
function TranscriptionMessage({ item, isNewSpeaker, isCurrentMessage, }) {
    return (_jsxs("div", { className: "flex items-start gap-3 group transition-all duration-300 w-full", children: [_jsx("div", { className: "w-[120px] flex-shrink-0", children: _jsxs("div", { className: "flex flex-col items-start gap-1", children: [isNewSpeaker && (_jsx("div", { className: `px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors duration-300 ${isCurrentMessage
                                ? 'bg-blue-100 text-blue-700 border-blue-200'
                                : 'bg-blue-50 text-blue-600 border-blue-100'}`, children: item.speaker })), _jsx("div", { className: `text-[11px] font-mono ml-2 transition-colors duration-300 ${isCurrentMessage ? 'text-blue-500' : 'text-gray-400'}`, children: item.start_time })] }) }), _jsx("div", { className: "flex-1 min-w-0 w-full", children: _jsx("div", { className: `text-sm leading-relaxed rounded-xl px-4 py-2 border transition-all inline-flex duration-300 ${isCurrentMessage
                        ? 'bg-blue-50/50 text-blue-900 border-blue-200 shadow-md'
                        : 'bg-white text-gray-600 border-gray-100 shadow-sm hover:shadow-md'}`, children: item.transcription }) })] }));
}
// Add new Summary component
function TranscriptionSummary({ summary }) {
    return (_jsxs("div", { className: "mb-6 bg-blue-50/50 rounded-xl p-4 border border-blue-100", children: [_jsx("div", { className: "text-xs font-medium text-blue-600 mb-2 uppercase tracking-wider", children: "Summary" }), _jsx("div", { className: "text-sm text-gray-700 leading-relaxed prose prose-sm max-w-none prose-headings:text-gray-900 prose-a:text-blue-600 whitespace-pre-wrap", children: _jsx(ReactMarkdown, { children: summary }) })] }));
}
// Update TranscriptionContent component
function TranscriptionContent({ transcriptionData, currentAudioTime, }) {
    const parseTimestamp = (timestamp) => {
        // Handle "MM:SS" format (without hours)
        const [minutes, seconds] = timestamp.split(':');
        return parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
    };
    return (_jsxs("div", { className: "space-y-2 py-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 w-full", children: [_jsx(TranscriptionSummary, { summary: transcriptionData.summary }), transcriptionData.segments.map((item, index) => {
                const isNewSpeaker = index === 0 ||
                    transcriptionData.segments[index - 1].speaker !== item.speaker;
                const startTime = parseTimestamp(item.start_time);
                // Use next segment's start time as end time, or add 3 seconds for the last segment
                const endTime = index < transcriptionData.segments.length - 1
                    ? parseTimestamp(transcriptionData.segments[index + 1].start_time)
                    : startTime + 3;
                const isCurrentMessage = currentAudioTime >= startTime && currentAudioTime < endTime;
                return (_jsx(TranscriptionMessage, { item: item, isNewSpeaker: isNewSpeaker, isCurrentMessage: isCurrentMessage }, `${item.speaker}-${item.start_time}-${index}`));
            })] }));
}
// Update TranscriptionStatus component
function TranscriptionStatus({ transcription, transcriptionError, currentAudioTime, }) {
    if (!transcription && !transcriptionError) {
        return null;
    }
    if (transcription?.transcriptionStatus === 'pending') {
        return (_jsx("div", { className: "my-2", children: _jsxs("div", { className: "text-sm text-gray-600 bg-gray-50/50 p-4 border border-gray-100 w-full", children: [_jsxs("div", { className: "font-medium text-gray-900 mb-4 flex items-center sticky top-0 bg-gray-50/50 backdrop-blur-sm z-10 py-2", children: [_jsx(MicrophoneIcon, {}), _jsx("span", { children: "Processing Audio" })] }), _jsx("div", { className: "flex items-center justify-center py-8", children: _jsxs("div", { className: "flex flex-col items-center gap-3", children: [_jsx(LoadingSpinner, {}), _jsxs("div", { className: "text-sm text-gray-600", children: [_jsx("span", { className: "font-medium", children: "Starting transcription" }), _jsx("span", { className: "text-gray-400 animate-pulse", children: "..." })] }), _jsx("div", { className: "text-xs text-gray-400 max-w-sm text-center", children: "This may take a few moments depending on the length of the recording" })] }) })] }) }));
    }
    if (transcriptionError) {
        return (_jsxs("div", { className: "text-xs text-red-500 m-2 flex items-center bg-red-50 rounded-lg p-2 border border-red-100", children: [_jsx(ErrorIcon, {}), transcriptionError] }));
    }
    if (transcription?.transcriptionStatus === 'completed' &&
        transcription.transcription) {
        try {
            const transcriptionData = transcription.transcription;
            if (!transcriptionData.segments ||
                !Array.isArray(transcriptionData.segments)) {
                throw new Error('Invalid transcription data format');
            }
            return (_jsx("div", { className: "my-2", children: _jsxs("div", { className: "text-sm text-gray-600 bg-gray-50/50 p-4 border border-gray-100 w-full", children: [_jsxs("div", { className: "font-medium text-gray-900 mb-4 flex items-center sticky top-0 bg-gray-50/50 backdrop-blur-sm z-10 py-2", children: [_jsx(MicrophoneIcon, {}), _jsx("span", { children: "Conversation Transcript" })] }), transcriptionData.title && (_jsxs("div", { className: "mb-4 bg-blue-50/50 rounded-lg p-3 border border-blue-100", children: [_jsx("div", { className: "text-xs font-medium text-blue-600 uppercase tracking-wider mb-1", children: "Title" }), _jsx("div", { className: "text-base font-medium text-gray-900", children: transcriptionData.title })] })), _jsx(TranscriptionContent, { transcriptionData: transcriptionData, currentAudioTime: currentAudioTime })] }) }));
        }
        catch (error) {
            return (_jsx("div", { className: "text-sm text-red-500 bg-red-50 rounded-lg p-2 border border-red-100 m-2", children: error instanceof Error
                    ? error.message
                    : 'Failed to parse transcription data' }));
        }
    }
    return null;
}
// Add new RecordingHeader component
function RecordingHeader({ metadata, fileName, recordingDate, duration, error, isDeleting, showDeleteConfirm, setShowDeleteConfirm, handleDeleteClick, }) {
    const [imgError, setImgError] = React.useState(false);
    const isGlobalRecording = metadata?.isGlobal;
    return (_jsxs("div", { className: "flex items-start space-x-4 p-4 bg-gray-50/30", children: [_jsx("div", { className: "relative w-12 h-12 flex-shrink-0", children: !imgError && !isGlobalRecording ? (_jsx("img", { src: `/api/recordings/${fileName}/icon.png`, alt: metadata?.appName || 'Unknown Application', className: "w-12 h-12 object-contain rounded-lg bg-gray-50 border border-gray-100 shadow-sm transition-transform duration-200 hover:scale-105", onError: () => setImgError(true) })) : (_jsx("div", { className: "w-12 h-12 rounded-xl flex items-center justify-center text-gray-500 bg-gray-50 border border-gray-100 shadow-sm", children: _jsx(DefaultAppIcon, {}) })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-gray-900 font-semibold text-base truncate", children: metadata?.appName || 'Unknown Application' }), isGlobalRecording && (_jsx("span", { className: "text-xs px-2 py-0.5 bg-blue-50 rounded-full text-blue-600 font-medium border border-blue-100", children: "System Audio" })), _jsx("span", { className: "text-xs px-2 py-0.5 bg-gray-50 rounded-full text-gray-600 font-medium border border-gray-100", children: duration })] }), _jsx("div", { className: "flex items-center", children: showDeleteConfirm ? (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("button", { onClick: () => setShowDeleteConfirm(false), className: "h-8 px-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100", disabled: isDeleting, children: "Cancel" }), _jsx("button", { onClick: handleDeleteClick, className: "h-8 px-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-100 disabled:opacity-50 disabled:cursor-not-allowed", disabled: isDeleting, children: isDeleting ? (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(LoadingSpinner, {}), _jsx("span", { children: "Deleting..." })] })) : ('Confirm') })] })) : (_jsx("button", { onClick: () => setShowDeleteConfirm(true), className: "h-8 w-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors", title: "Delete recording", children: _jsx(DeleteIcon, {}) })) })] }), _jsx("div", { className: "text-sm text-gray-600 mt-1", children: recordingDate }), _jsx("div", { className: "text-xs text-gray-400 font-mono mt-0.5 truncate", children: metadata?.bundleIdentifier || fileName }), error && (_jsxs("div", { className: "text-xs text-red-500 mt-2 flex items-center bg-red-50 rounded-lg p-2 border border-red-100", children: [_jsx(ErrorIcon, {}), error] }))] })] }));
}
// Add new AudioPlayer component
function AudioPlayer({ isLoading, error, audioRef, playbackRate, handlePlaybackRateChange, handleSeek, handlePlayPause, containerRef, waveformData, currentTime, fileName, }) {
    return (_jsx("div", { className: "px-4 pb-4", children: isLoading && !error ? (_jsxs("div", { className: "h-14 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100", children: [_jsx(LoadingSpinner, {}), _jsx("span", { className: "ml-2 text-sm text-gray-600 font-medium", children: "Loading audio..." })] })) : (_jsxs("div", { className: "flex flex-col space-y-3", children: [_jsx(AudioControls, { audioRef: audioRef, playbackRate: playbackRate, onPlaybackRateChange: handlePlaybackRateChange, onSeek: handleSeek, onPlayPause: handlePlayPause }), _jsx(WaveformVisualizer, { containerRef: containerRef, waveformData: waveformData, currentTime: currentTime, fileName: fileName })] })) }));
}
// Add new TranscribeButton component
function TranscribeButton({ transcriptionStatus, onTranscribe, }) {
    return (_jsx("div", { className: "px-4 pb-4", children: _jsx("div", { className: "flex justify-end", children: _jsx("button", { onClick: onTranscribe, disabled: transcriptionStatus === 'pending', className: `h-8 px-3 text-sm font-medium rounded-lg transition-colors border flex items-center space-x-2
            ${transcriptionStatus === 'pending'
                    ? 'bg-blue-50 text-blue-600 border-blue-200 cursor-not-allowed'
                    : transcriptionStatus === 'completed'
                        ? 'text-blue-600 hover:bg-blue-50 border-blue-100'
                        : transcriptionStatus === 'error'
                            ? 'text-red-600 hover:bg-red-50 border-red-100'
                            : 'text-blue-600 hover:bg-blue-50 border-blue-100'}`, children: transcriptionStatus === 'pending' ? (_jsxs(_Fragment, { children: [_jsx(LoadingSpinner, {}), _jsx("span", { children: "Transcribing..." })] })) : transcriptionStatus === 'completed' ? (_jsxs(_Fragment, { children: [_jsx(MicrophoneIcon, {}), _jsx("span", { children: "Transcribe Again" })] })) : transcriptionStatus === 'error' ? (_jsxs(_Fragment, { children: [_jsx(WarningIcon, {}), _jsx("span", { children: "Retry Transcription" })] })) : (_jsxs(_Fragment, { children: [_jsx(MicrophoneIcon, {}), _jsx("span", { children: "Transcribe" })] })) }) }) }));
}
// Main SavedRecordingItem component (simplified)
export function SavedRecordingItem({ recording, }) {
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
    const [playbackRate, setPlaybackRate] = React.useState(1);
    const [waveformData, setWaveformData] = React.useState([]);
    const [currentTime, setCurrentTime] = React.useState(0);
    const audioRef = React.useRef(null);
    const containerRef = React.useRef(null);
    const [segments, setSegments] = React.useState(40);
    const [currentAudioTime, setCurrentAudioTime] = React.useState(0);
    const [transcriptionError, setTranscriptionError] = React.useState(null);
    const metadata = recording.metadata;
    // Ensure we have a valid filename, fallback to an empty string if undefined
    const fileName = recording.wav || '';
    const recordingDate = metadata
        ? new Date(metadata.recordingStartTime).toLocaleString()
        : 'Unknown date';
    const duration = metadata
        ? formatDuration(metadata.recordingDuration * 1000)
        : 'Unknown duration';
    // Update current audio time
    React.useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const handleTimeUpdate = () => {
                setCurrentAudioTime(audio.currentTime);
            };
            audio.addEventListener('timeupdate', handleTimeUpdate);
            return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
        }
        return () => { };
    }, []);
    // Calculate number of segments based on container width
    React.useEffect(() => {
        const updateSegments = () => {
            if (containerRef.current) {
                // Each bar should be at least 2px wide (1px bar + 1px gap)
                const width = containerRef.current.offsetWidth;
                setSegments(Math.floor(width / 2));
            }
        };
        updateSegments();
        const resizeObserver = new ResizeObserver(updateSegments);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }
        return () => resizeObserver.disconnect();
    }, []);
    const processAudioData = React.useCallback(async () => {
        try {
            // Check if fileName is empty
            if (!fileName) {
                throw new Error('Invalid recording filename');
            }
            const response = await fetch(`/api/recordings/${fileName}/recording.wav`);
            if (!response.ok) {
                throw new Error(`Failed to fetch audio file (${response.status}): ${response.statusText}`);
            }
            const audioContext = new AudioContext();
            const arrayBuffer = await response.arrayBuffer();
            // Ensure we have data to process
            if (!arrayBuffer || arrayBuffer.byteLength === 0) {
                throw new Error('No audio data received');
            }
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            const channelData = audioBuffer.getChannelData(0);
            // Process the audio data in chunks to create the waveform
            const numberOfSamples = channelData.length;
            const samplesPerSegment = Math.floor(numberOfSamples / segments);
            const waveform = [];
            for (let i = 0; i < segments; i++) {
                const start = i * samplesPerSegment;
                const end = start + samplesPerSegment;
                const segmentData = channelData.slice(start, end);
                // Calculate RMS (root mean square) for better amplitude representation
                const rms = Math.sqrt(segmentData.reduce((sum, sample) => sum + sample * sample, 0) /
                    segmentData.length);
                waveform.push(rms);
            }
            // Normalize the waveform data to a 0-1 range
            const maxAmplitude = Math.max(...waveform);
            const normalizedWaveform = waveform.map(amp => amp / maxAmplitude);
            setWaveformData(normalizedWaveform);
            setIsLoading(false);
        }
        catch (err) {
            console.error('Error processing audio:', err);
            setError(err instanceof Error ? err.message : 'Failed to process audio data');
            setIsLoading(false);
        }
    }, [fileName, segments]);
    React.useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const handleError = (e) => {
                console.error('Audio error:', e);
                setError('Failed to load audio');
                setIsLoading(false);
            };
            const handleLoadedMetadata = () => {
                void processAudioData().catch(err => {
                    console.error('Error processing audio data:', err);
                    setError('Failed to process audio data');
                    setIsLoading(false);
                });
            };
            const handleTimeUpdate = () => {
                setCurrentTime(audio.currentTime / audio.duration);
            };
            audio.addEventListener('error', handleError);
            audio.addEventListener('loadedmetadata', handleLoadedMetadata);
            audio.addEventListener('timeupdate', handleTimeUpdate);
            return () => {
                audio.removeEventListener('error', handleError);
                audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audio.removeEventListener('timeupdate', handleTimeUpdate);
            };
        }
        return () => { };
    }, [processAudioData]);
    const handlePlayPause = React.useCallback(() => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                void audioRef.current.play();
            }
            else {
                audioRef.current.pause();
            }
        }
    }, []);
    const handleSeek = React.useCallback((seconds) => {
        if (audioRef.current) {
            audioRef.current.currentTime += seconds;
        }
    }, []);
    const handlePlaybackRateChange = React.useCallback(() => {
        if (audioRef.current) {
            const newRate = playbackRate === 1 ? 1.5 : 1;
            audioRef.current.playbackRate = newRate;
            setPlaybackRate(newRate);
        }
    }, [playbackRate]);
    const handleDelete = React.useCallback(async () => {
        setIsDeleting(true);
        setError(null); // Clear any previous errors
        try {
            // Check if filename is valid
            if (!recording.wav) {
                throw new Error('Invalid recording filename');
            }
            const response = await fetch(`/api/recordings/${recording.wav}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                let errorMessage;
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error;
                }
                catch {
                    errorMessage = `Server error (${response.status}): ${response.statusText}`;
                }
                throw new Error(errorMessage);
            }
            setShowDeleteConfirm(false);
        }
        catch (err) {
            console.error('Error deleting recording:', err);
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        }
        finally {
            setIsDeleting(false);
        }
    }, [recording.wav]);
    const handleDeleteClick = React.useCallback(() => {
        void handleDelete().catch(err => {
            console.error('Unexpected error during deletion:', err);
            setError('An unexpected error occurred');
        });
    }, [handleDelete]);
    React.useEffect(() => {
        // Listen for transcription events
        socket.on('apps:recording-transcription-start', (data) => {
            if (recording.wav && data.filename === recording.wav) {
                setTranscriptionError(null);
            }
        });
        socket.on('apps:recording-transcription-end', (data) => {
            if (recording.wav && data.filename === recording.wav && !data.success) {
                setTranscriptionError(data.error || 'Transcription failed');
            }
        });
        return () => {
            socket.off('apps:recording-transcription-start');
            socket.off('apps:recording-transcription-end');
        };
    }, [recording.wav]);
    const handleTranscribe = React.useCallback(async () => {
        try {
            // Check if filename is valid
            if (!recording.wav) {
                throw new Error('Invalid recording filename');
            }
            const response = await fetch(`/api/recordings/${recording.wav}/transcribe`, {
                method: 'POST',
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to start transcription');
            }
        }
        catch (err) {
            setTranscriptionError(err instanceof Error ? err.message : 'Failed to start transcription');
        }
    }, [recording.wav]);
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden mb-3 border border-gray-100 hover:border-gray-200", children: [_jsx(RecordingHeader, { metadata: metadata, fileName: fileName, recordingDate: recordingDate, duration: duration, error: error, isDeleting: isDeleting, showDeleteConfirm: showDeleteConfirm, setShowDeleteConfirm: setShowDeleteConfirm, handleDeleteClick: handleDeleteClick, transcriptionError: transcriptionError }), _jsx(AudioPlayer, { isLoading: isLoading, error: error, audioRef: audioRef, playbackRate: playbackRate, handlePlaybackRateChange: handlePlaybackRateChange, handleSeek: handleSeek, handlePlayPause: handlePlayPause, containerRef: containerRef, waveformData: waveformData, currentTime: currentTime, fileName: fileName }), _jsx("audio", { ref: audioRef, src: fileName ? `/api/recordings/${fileName}/recording.wav` : '', preload: "metadata", className: "hidden" }), _jsx(TranscriptionStatus, { transcription: recording.transcription, transcriptionError: transcriptionError, currentAudioTime: currentAudioTime }), _jsx(TranscribeButton, { transcriptionStatus: recording.transcription?.transcriptionStatus, onTranscribe: () => void handleTranscribe() })] }));
}
//# sourceMappingURL=saved-recording-item.js.map