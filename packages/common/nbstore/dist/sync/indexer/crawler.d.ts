import { type Doc as YDoc } from 'yjs';
import { IndexerDocument } from '../../storage';
export declare function crawlingDocData({ ydoc, rootYDoc, spaceId, docId, }: {
    ydoc: YDoc;
    rootYDoc: YDoc;
    spaceId: string;
    docId: string;
}): Promise<{
    blocks: IndexerDocument<'block'>[];
    preview?: string;
} | undefined>;
//# sourceMappingURL=crawler.d.ts.map