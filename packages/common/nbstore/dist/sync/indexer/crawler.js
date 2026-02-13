import { readAllBlocksFromDoc } from '@affine/reader';
import {} from 'yjs';
import { IndexerDocument } from '../../storage';
export async function crawlingDocData({ ydoc, rootYDoc, spaceId, docId, }) {
    const result = await readAllBlocksFromDoc({
        ydoc,
        rootYDoc,
        spaceId,
        maxSummaryLength: 1000,
    });
    if (!result) {
        return undefined;
    }
    return {
        blocks: result.blocks.map(block => IndexerDocument.from(`${docId}:${block.blockId}`, {
            docId: block.docId,
            blockId: block.blockId,
            content: block.content,
            flavour: block.flavour,
            blob: block.blob,
            refDocId: block.refDocId,
            ref: block.ref,
            parentFlavour: block.parentFlavour,
            parentBlockId: block.parentBlockId,
            additional: block.additional
                ? JSON.stringify(block.additional)
                : undefined,
            markdownPreview: block.markdownPreview,
        })),
        preview: result.summary,
    };
}
//# sourceMappingURL=crawler.js.map