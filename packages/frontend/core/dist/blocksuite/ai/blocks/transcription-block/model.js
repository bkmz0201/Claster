import { BlockModel, BlockSchemaExtension, defineBlockSchema, } from '@blocksuite/affine/store';
export const TranscriptionBlockFlavour = 'affine:transcription';
const defaultProps = {
    transcription: {},
    jobId: undefined,
    createdBy: undefined, // the user id of the creator
};
export const TranscriptionBlockSchema = defineBlockSchema({
    flavour: TranscriptionBlockFlavour,
    props: () => defaultProps,
    metadata: {
        version: 1,
        role: 'attachment-viewer',
        parent: ['affine:attachment'],
        children: ['affine:callout'],
    },
    toModel: () => new TranscriptionBlockModel(),
});
export class TranscriptionBlockModel extends BlockModel {
}
export const TranscriptionBlockSchemaExtension = BlockSchemaExtension(TranscriptionBlockSchema);
//# sourceMappingURL=model.js.map