import { BlockModel } from '@blocksuite/affine/store';
export declare const TranscriptionBlockFlavour = "affine:transcription";
export declare const TranscriptionBlockSchema: {
    version: number;
    model: {
        props: import("@blocksuite/store").PropsGetter<TranscriptionBlockProps>;
        flavour: "affine:transcription";
    } & {
        version: number;
        role: "attachment-viewer";
        parent: string[];
        children: string[];
    };
    transformer?: ((transformerConfig: Map<string, unknown>) => import("@blocksuite/store").BaseBlockTransformer<TranscriptionBlockProps>) | undefined;
};
export type TranscriptionBlockProps = {
    transcription: Record<string, any>;
    jobId?: string;
    createdBy?: string;
};
export declare class TranscriptionBlockModel extends BlockModel<TranscriptionBlockProps> {
}
export declare const TranscriptionBlockSchemaExtension: import("@blocksuite/store").ExtensionType;
//# sourceMappingURL=model.d.ts.map