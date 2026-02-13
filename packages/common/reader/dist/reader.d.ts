import { type Doc as YDoc, Map as YMap } from 'yjs';
export interface BlockDocumentInfo {
    docId: string;
    blockId: string;
    content?: string | string[];
    flavour: string;
    blob?: string[];
    refDocId?: string[];
    ref?: string[];
    parentFlavour?: string;
    parentBlockId?: string;
    additional?: {
        databaseName?: string;
        displayMode?: string;
        noteBlockId?: string;
    };
    yblock: YMap<any>;
    markdownPreview?: string;
}
export declare function readAllBlocksFromDoc({ ydoc, rootYDoc, spaceId, maxSummaryLength, }: {
    ydoc: YDoc;
    rootYDoc?: YDoc;
    spaceId: string;
    maxSummaryLength?: number;
}): Promise<{
    blocks: BlockDocumentInfo[];
    title: string;
    summary: string;
} | undefined>;
/**
 * Get all docs from the root doc
 */
export declare function readAllDocsFromRootDoc(rootDoc: YDoc, options?: {
    includeTrash?: boolean;
}): Map<string, {
    title: string | undefined;
}>;
export declare function readAllDocIdsFromRootDoc(rootDoc: YDoc, options?: {
    includeTrash?: boolean;
}): string[];
export { parseBlock, parseBlockToMd, parsePageDoc } from './doc-parser/parser';
//# sourceMappingURL=reader.d.ts.map