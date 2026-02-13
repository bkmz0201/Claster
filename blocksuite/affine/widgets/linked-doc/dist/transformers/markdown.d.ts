import type { ExtensionType, Schema, Store, Workspace } from '@blocksuite/store';
type ImportMarkdownToBlockOptions = {
    doc: Store;
    markdown: string;
    blockId: string;
    extensions: ExtensionType[];
};
type ImportMarkdownToDocOptions = {
    collection: Workspace;
    schema: Schema;
    markdown: string;
    fileName?: string;
    extensions: ExtensionType[];
};
type ImportMarkdownZipOptions = {
    collection: Workspace;
    schema: Schema;
    imported: Blob;
    extensions: ExtensionType[];
};
/**
 * Exports a doc to a Markdown file or a zip archive containing Markdown and assets.
 * @param doc The doc to export
 * @returns A Promise that resolves when the export is complete
 */
declare function exportDoc(doc: Store): Promise<void>;
/**
 * Imports Markdown content into a specific block within a doc.
 * @param options Object containing import options
 * @param options.doc The target doc
 * @param options.markdown The Markdown content to import
 * @param options.blockId The ID of the block where the content will be imported
 * @returns A Promise that resolves when the import is complete
 */
declare function importMarkdownToBlock({ doc, markdown, blockId, extensions, }: ImportMarkdownToBlockOptions): Promise<void>;
/**
 * Imports Markdown content into a new doc within a collection.
 * @param options Object containing import options
 * @param options.collection The target doc collection
 * @param options.schema The schema of the target doc collection
 * @param options.markdown The Markdown content to import
 * @param options.fileName Optional filename for the imported doc
 * @returns A Promise that resolves to the ID of the newly created doc, or undefined if import fails
 */
declare function importMarkdownToDoc({ collection, schema, markdown, fileName, extensions, }: ImportMarkdownToDocOptions): Promise<string | undefined>;
/**
 * Imports a zip file containing Markdown files and assets into a collection.
 * @param options Object containing import options
 * @param options.collection The target doc collection
 * @param options.schema The schema of the target doc collection
 * @param options.imported The zip file as a Blob
 * @returns A Promise that resolves to an array of IDs of the newly created docs
 */
declare function importMarkdownZip({ collection, schema, imported, extensions, }: ImportMarkdownZipOptions): Promise<string[]>;
export declare const MarkdownTransformer: {
    exportDoc: typeof exportDoc;
    importMarkdownToBlock: typeof importMarkdownToBlock;
    importMarkdownToDoc: typeof importMarkdownToDoc;
    importMarkdownZip: typeof importMarkdownZip;
};
export {};
//# sourceMappingURL=markdown.d.ts.map