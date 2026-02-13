/**
 * Attachment block audio media.
 * blockId/docId/workspaceId are used to identify the source of the media
 * to control the exclusivity playback state of audio across the whole application.
 */
export interface AttachmentBlockAudioMedia {
    blobId: string;
    blockId: string;
    docId: string;
    workspaceId: string;
}
export interface AudioMediaDescriptor {
    key: AudioMediaKey;
    tabId: string | null;
    name: string;
    size: number;
    blobId: string;
}
export type AudioMediaKey = `${string}/${string}/${string}/${string}`;
export declare const attachmentBlockAudioMediaKey: (media: AttachmentBlockAudioMedia) => AudioMediaKey;
export declare const parseAudioMediaKey: (key: AudioMediaKey) => AttachmentBlockAudioMedia;
type State = 'idle' | 'playing' | 'paused' | 'stopped';
export interface MediaStats {
    key: AudioMediaKey;
    tabId: string | null;
    duration: number;
    name: string;
    size: number;
    waveform: number[];
}
export interface PlaybackState {
    key: AudioMediaKey;
    tabId: string | null;
    state: State;
    /**
     * Whenever the user seek the media, the startSeekOffset will be updated
     */
    seekOffset: number;
    /**
     * Whenever the media state is updated.
     * the updateTime will be updated. It is in milliseconds (unix timestamp).
     * The current playback position (0-based, in seconds) is calculated by `seekOffset + (Date.now() - updateTime) / 1000 * rate`
     */
    updateTime: number;
    /**
     * the playback rate
     */
    playbackRate: number;
}
export {};
//# sourceMappingURL=types.d.ts.map