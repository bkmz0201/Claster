interface AudioEncodingConfig {
    sampleRate: number;
    numberOfChannels: number;
    bitrate?: number;
}
/**
 * Creates and configures an Opus encoder with the given settings
 */
export declare function createOpusEncoder(config: AudioEncodingConfig): {
    encoder: AudioEncoder;
    encodedChunks: EncodedAudioChunk[];
};
/**
 * Creates a mp4 container with the encoded audio chunks
 */
export declare function muxToMp4(encodedChunks: EncodedAudioChunk[], config: AudioEncodingConfig): Uint8Array;
/**
 * Encodes raw audio data to Opus in MP4 container.
 */
export declare function encodeRawBufferToOpus({ filepath, sampleRate, numberOfChannels, }: {
    filepath: string;
    sampleRate: number;
    numberOfChannels: number;
}): Promise<Uint8Array>;
/**
 * Encodes an audio file Blob to Opus in MP4 container with specified bitrate.
 * @param blob Input audio file blob (supports any browser-decodable format)
 * @param targetBitrate Target bitrate in bits per second (bps)
 * @returns Promise resolving to encoded MP4 data as Uint8Array
 */
export declare function encodeAudioBlobToOpus(blob: Blob | ArrayBuffer | Uint8Array, targetBitrate?: number): Promise<Uint8Array>;
export declare function encodeAudioBlobToOpusSlices(blob: Blob | ArrayBuffer | Uint8Array, targetBitrate?: number): Promise<Uint8Array[]>;
export declare const createStreamEncoder: (recordingId: number, codecs: {
    sampleRate: number;
    numberOfChannels: number;
    targetBitrate?: number;
}) => {
    id: number;
    next: () => Promise<void>;
    poll: () => Promise<void>;
    flush: () => Promise<void>;
    close: () => void;
    finish: () => Promise<Uint8Array<ArrayBufferLike>>;
    [Symbol.dispose]: () => void;
};
export type OpusStreamEncoder = ReturnType<typeof createStreamEncoder>;
export {};
//# sourceMappingURL=opus-encoding.d.ts.map