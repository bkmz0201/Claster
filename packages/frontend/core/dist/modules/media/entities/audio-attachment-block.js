import { TranscriptionBlockFlavour, } from '@affine/core/blocksuite/ai/blocks/transcription-block/model';
import { insertFromMarkdown } from '@affine/core/blocksuite/utils';
import { encodeAudioBlobToOpusSlices } from '@affine/core/utils/opus-encoding';
import { DebugLogger } from '@affine/debug';
import { AiJobStatus } from '@affine/graphql';
import track from '@affine/track';
import { Text } from '@blocksuite/affine/store';
import { computed } from '@preact/signals-core';
import { Entity, LiveData } from '@toeverything/infra';
import { cssVarV2 } from '@toeverything/theme/v2';
import { AudioTranscriptionJob } from './audio-transcription-job';
const logger = new DebugLogger('audio-attachment-block');
// BlockSuiteError: yText must not contain "\r" because it will break the range synchronization
function sanitizeText(text) {
    return text.replace(/\r/g, '');
}
const colorOptions = [
    cssVarV2.text.highlight.fg.red,
    cssVarV2.text.highlight.fg.green,
    cssVarV2.text.highlight.fg.blue,
    cssVarV2.text.highlight.fg.yellow,
    cssVarV2.text.highlight.fg.purple,
    cssVarV2.text.highlight.fg.orange,
    cssVarV2.text.highlight.fg.teal,
    cssVarV2.text.highlight.fg.grey,
    cssVarV2.text.highlight.fg.magenta,
];
export class AudioAttachmentBlock extends Entity {
    constructor(audioMediaManagerService, workspaceService, meetingSettingsService) {
        super();
        this.audioMediaManagerService = audioMediaManagerService;
        this.workspaceService = workspaceService;
        this.meetingSettingsService = meetingSettingsService;
        this.refCount$ = new LiveData(0);
        // rendering means the attachment is visible in the editor
        // it is used to determine if we should show show the audio player on the sidebar
        this.rendering$ = this.refCount$.map(refCount => refCount > 0);
        this.expanded$ = new LiveData(true);
        this.transcriptionBlock$ = LiveData.fromSignal(computed(() => {
            // find the last transcription block
            for (const key of [...this.props.childMap.value.keys()].reverse()) {
                const block = this.props.store.getBlock$(key);
                if (block?.flavour === TranscriptionBlockFlavour) {
                    return block.model;
                }
            }
            return null;
        }));
        this.hasTranscription$ = LiveData.computed(get => {
            const transcriptionBlock = get(this.transcriptionBlock$);
            if (!transcriptionBlock) {
                return null;
            }
            const childMap = get(LiveData.fromSignal(transcriptionBlock.childMap));
            return childMap.size > 0;
        });
        this.transcriptionJob = this.createTranscriptionJob();
        this.transcribe = async () => {
            try {
                // if job is already running, we should not start it again
                if (this.transcriptionJob.status$.value.status !== 'waiting-for-job') {
                    return;
                }
                const status = await this.transcriptionJob.start();
                if (status.status === AiJobStatus.claimed) {
                    await this.fillTranscriptionResult(status.result);
                }
            }
            catch (error) {
                track.doc.editor.audioBlock.transcribeRecording({
                    type: 'Meeting record',
                    method: 'fail',
                });
                logger.error('Error transcribing audio:', error);
                throw error;
            }
        };
        this.fillTranscriptionResult = async (result) => {
            this.props.props.caption = result.title ?? '';
            const addCalloutBlock = (emoji, title, collapsed = false) => {
                const calloutId = this.props.store.addBlock('affine:callout', {
                    emoji,
                }, this.transcriptionBlock$.value?.id);
                this.props.store.addBlock('affine:paragraph', {
                    type: 'h6',
                    collapsed,
                    text: new Text([
                        {
                            insert: title,
                        },
                    ]),
                }, calloutId);
                return calloutId;
            };
            const fillTranscription = (segments) => {
                const calloutId = addCalloutBlock('💬', 'Transcript', true);
                const speakerToColors = new Map();
                for (const segment of segments) {
                    let color = speakerToColors.get(segment.speaker);
                    if (!color) {
                        color = colorOptions[speakerToColors.size % colorOptions.length];
                        speakerToColors.set(segment.speaker, color);
                    }
                    const deltaInserts = [
                        {
                            insert: sanitizeText(segment.start + ' ' + segment.speaker),
                            attributes: {
                                color,
                                bold: true,
                            },
                        },
                        {
                            insert: ': ' + sanitizeText(segment.transcription),
                        },
                    ];
                    this.props.store.addBlock('affine:paragraph', {
                        text: new Text(deltaInserts),
                    }, calloutId);
                }
            };
            const fillSummary = async (summary) => {
                const calloutId = addCalloutBlock('📑', 'Summary');
                await insertFromMarkdown(undefined, summary, this.props.store, calloutId, 1);
            };
            const fillActions = async (actions) => {
                if (!actions) {
                    return;
                }
                const calloutId = addCalloutBlock('🎯', 'Todo');
                await insertFromMarkdown(undefined, actions ?? '', this.props.store, calloutId, 1);
            };
            fillTranscription(result.segments);
            if (this.meetingSettingsService.settings.autoTranscriptionSummary) {
                await fillSummary(result.summary);
            }
            if (this.meetingSettingsService.settings.autoTranscriptionTodo) {
                await fillActions(result.actions);
            }
        };
        const mediaRef = audioMediaManagerService.ensureMediaEntity(this.props);
        this.audioMedia = mediaRef.media;
        this.disposables.push(() => mediaRef.release());
        this.disposables.push(() => {
            this.transcriptionJob.dispose();
        });
    }
    mount() {
        if (this.transcriptionJob.isCreator() &&
            this.transcriptionJob.status$.value.status === 'waiting-for-job' &&
            !this.hasTranscription$.value) {
            this.transcribe().catch(error => {
                logger.error('Error transcribing audio:', error);
            });
        }
        this.refCount$.setValue(this.refCount$.value + 1);
    }
    unmount() {
        this.refCount$.setValue(this.refCount$.value - 1);
    }
    createTranscriptionJob() {
        if (!this.props.props.sourceId) {
            throw new Error('No source id');
        }
        let transcriptionBlockProps = this.transcriptionBlock$.value?.props;
        if (!transcriptionBlockProps) {
            // transcription block is not created yet, we need to create it
            this.props.store.addBlock('affine:transcription', {
                transcription: {},
            }, this.props.id);
            transcriptionBlockProps = this.transcriptionBlock$.value?.props;
        }
        if (!transcriptionBlockProps) {
            throw new Error('No transcription block props');
        }
        const job = this.framework.createEntity(AudioTranscriptionJob, {
            blobId: this.props.props.sourceId,
            blockProps: transcriptionBlockProps,
            getAudioFiles: async () => {
                const buffer = await this.audioMedia.getBuffer();
                if (!buffer) {
                    throw new Error('No audio buffer available');
                }
                const slices = await encodeAudioBlobToOpusSlices(buffer, 64000);
                const files = slices.map((slice, index) => {
                    const blob = new Blob([slice], { type: 'audio/opus' });
                    return new File([blob], this.props.props.name + `-${index}.opus`, {
                        type: 'audio/opus',
                    });
                });
                return files;
            },
        });
        return job;
    }
}
//# sourceMappingURL=audio-attachment-block.js.map