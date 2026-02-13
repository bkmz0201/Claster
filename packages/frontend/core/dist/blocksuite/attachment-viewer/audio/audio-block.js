import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { AnimatedTranscribeIcon, Button, Tooltip, useConfirmModal, } from '@affine/component';
import { AudioPlayer } from '@affine/component/ui/audio-player';
import { useEnableAI } from '@affine/core/components/hooks/affine/use-enable-ai';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { useSeekTime } from '@affine/core/components/hooks/use-seek-time';
import { CurrentServerScopeProvider } from '@affine/core/components/providers/current-server-scope';
import { PublicUserLabel } from '@affine/core/modules/cloud/views/public-user';
import { GlobalDialogService } from '@affine/core/modules/dialogs';
import { AudioAttachmentService } from '@affine/core/modules/media/services/audio-attachment';
import { Trans, useI18n } from '@affine/i18n';
import track from '@affine/track';
import { ResetIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import bytes from 'bytes';
import { useCallback, useEffect, useMemo, useState } from 'react';
import * as styles from './audio-block.css';
import { TranscriptionBlock } from './transcription-block';
const AttachmentAudioPlayer = ({ block }) => {
    const audioMedia = block.audioMedia;
    const playbackState = useLiveData(audioMedia.playbackState$);
    const stats = useLiveData(audioMedia.stats$);
    const expanded = useLiveData(block.expanded$);
    const [preflightChecking, setPreflightChecking] = useState(false);
    const transcribing = useLiveData(block.transcriptionJob.transcribing$) || preflightChecking;
    const loading = useLiveData(audioMedia.loading$);
    const loadingError = useLiveData(audioMedia.loadError$);
    const error = useLiveData(block.transcriptionJob.error$);
    const transcribed = useLiveData(block.hasTranscription$);
    const handleClick = useCallback((e) => {
        e.stopPropagation();
    }, []);
    const confirmModal = useConfirmModal();
    const seekTime = useSeekTime(playbackState, stats.duration);
    const handlePlay = useCallback(() => {
        audioMedia?.play();
    }, [audioMedia]);
    const handlePause = useCallback(() => {
        audioMedia?.pause();
    }, [audioMedia]);
    const handleStop = useCallback(() => {
        audioMedia?.stop();
    }, [audioMedia]);
    const handleSeek = useCallback((time) => {
        audioMedia?.seekTo(time);
    }, [audioMedia]);
    const handlePlaybackRateChange = useCallback((rate) => {
        audioMedia?.setPlaybackRate(rate);
    }, [audioMedia]);
    const reload = useCallback(() => {
        audioMedia?.revalidateBuffer();
    }, [audioMedia]);
    const t = useI18n();
    const enableAi = useEnableAI();
    const globalDialogService = useService(GlobalDialogService);
    const handleNotesClick = useAsyncCallback(async () => {
        if (!enableAi || transcribing) {
            return;
        }
        if (transcribed) {
            block.expanded$.setValue(!expanded);
            track.doc.editor.audioBlock.openTranscribeNotes({
                type: 'Meeting record',
                method: 'success',
                option: expanded ? 'off' : 'on',
            });
            return;
        }
        if (!block.transcriptionJob.currentUserId) {
            confirmModal.openConfirmModal({
                title: t['com.affine.ai.login-required.dialog-title'](),
                description: t['com.affine.ai.login-required.dialog-content'](),
                confirmText: t['com.affine.ai.login-required.dialog-confirm'](),
                confirmButtonOptions: {
                    variant: 'primary',
                },
                cancelText: t['com.affine.ai.login-required.dialog-cancel'](),
                onConfirm: () => {
                    globalDialogService.open('sign-in', {});
                },
            });
            track.doc.editor.audioBlock.openTranscribeNotes({
                type: 'Meeting record',
                method: 'not signed in',
            });
            return;
        }
        setPreflightChecking(true);
        const result = await block.transcriptionJob.preflightCheck();
        setPreflightChecking(false);
        if (result?.error === 'created-by-others') {
            confirmModal.openConfirmModal({
                title: t['com.affine.audio.transcribe.non-owner.confirm.title'](),
                description: (_jsxs(Trans, { i18nKey: "com.affine.audio.transcribe.non-owner.confirm.message", children: ["Please contact ", _jsx(PublicUserLabel, { id: result.userId }), " to upgrade AI rights or resend the attachment."] })),
                onCancel: false,
                confirmText: t['Confirm'](),
                confirmButtonOptions: {
                    variant: 'primary',
                },
            });
            track.doc.editor.audioBlock.openTranscribeNotes({
                type: 'Meeting record',
                method: 'not owner',
            });
        }
        else {
            await block.transcribe();
            track.doc.editor.audioBlock.transcribeRecording({
                type: 'Meeting record',
                method: 'success',
                option: 'handle transcribing',
            });
        }
    }, [
        enableAi,
        transcribing,
        transcribed,
        block,
        expanded,
        confirmModal,
        t,
        globalDialogService,
    ]);
    const notesEntry = useMemo(() => {
        if (!enableAi) {
            return null;
        }
        const inner = (_jsx(Button, { variant: "plain", prefix: _jsx(AnimatedTranscribeIcon, { state: transcribing ? 'transcribing' : 'idle' }), size: "large", prefixClassName: styles.notesButtonIcon, className: styles.notesButton, onClick: handleNotesClick, children: transcribing
                ? t['com.affine.audio.transcribing']()
                : t['com.affine.audio.notes']() }));
        if (transcribing) {
            return (_jsx(Tooltip, { content: t['com.affine.audio.transcribing'](), children: inner }));
        }
        return inner;
    }, [enableAi, transcribing, handleNotesClick, t]);
    const descriptionEntry = useMemo(() => {
        if (loadingError) {
            return (_jsxs(_Fragment, { children: [_jsx("div", { className: styles.error, children: loadingError.message }), _jsxs("button", { className: styles.reloadButton, onClick: reload, children: [_jsx(ResetIcon, { className: styles.reloadButtonIcon }), "Reload"] })] }));
        }
        if (!loading && error) {
            return _jsx("div", { className: styles.error, children: error.message });
        }
        return _jsx(_Fragment, { children: bytes(block.props.props.size) });
    }, [loading, loadingError, error, reload, block.props.props.size]);
    return (_jsx(AudioPlayer, { name: block.props.props.name, description: descriptionEntry, loading: stats.duration === 0, playbackState: playbackState?.state || 'idle', waveform: stats.waveform, seekTime: seekTime, duration: stats.duration, onClick: handleClick, onPlay: handlePlay, onPause: handlePause, onStop: handleStop, onSeek: handleSeek, playbackRate: playbackState?.playbackRate || 1.0, onPlaybackRateChange: handlePlaybackRateChange, notesEntry: _jsx(CurrentServerScopeProvider, { children: notesEntry }) }));
};
const useAttachmentMediaBlock = (model) => {
    const audioAttachmentService = useService(AudioAttachmentService);
    const [audioAttachmentBlock, setAttachmentMedia] = useState(undefined);
    useEffect(() => {
        if (!model.props.sourceId) {
            return;
        }
        const entity = audioAttachmentService.get(model);
        if (!entity) {
            return;
        }
        const audioAttachmentBlock = entity.obj;
        setAttachmentMedia(audioAttachmentBlock);
        audioAttachmentBlock.mount();
        return () => {
            audioAttachmentBlock.unmount();
            entity.release();
        };
    }, [audioAttachmentService, model]);
    return audioAttachmentBlock;
};
export const AudioBlockEmbedded = ({ model }) => {
    const audioAttachmentBlock = useAttachmentMediaBlock(model);
    const transcriptionBlock = useLiveData(audioAttachmentBlock?.transcriptionBlock$);
    const expanded = useLiveData(audioAttachmentBlock?.expanded$);
    return (_jsxs("div", { className: styles.root, children: [audioAttachmentBlock && (_jsx(AttachmentAudioPlayer, { block: audioAttachmentBlock })), transcriptionBlock && expanded && (_jsx(TranscriptionBlock, { block: transcriptionBlock }))] }));
};
//# sourceMappingURL=audio-block.js.map