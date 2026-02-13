import { type ExtensionType, type Schema, type Workspace } from '@blocksuite/store';
type ImportNotionZipOptions = {
    collection: Workspace;
    schema: Schema;
    imported: Blob;
    extensions: ExtensionType[];
};
type PageIcon = {
    type: 'emoji' | 'image';
    content: string;
};
type FolderHierarchy = {
    name: string;
    path: string;
    children: Map<string, FolderHierarchy>;
    pageId?: string;
    parentPath?: string;
    icon?: PageIcon;
};
type ImportNotionZipResult = {
    entryId: string | undefined;
    pageIds: string[];
    isWorkspaceFile: boolean;
    hasMarkdown: boolean;
    folderHierarchy?: FolderHierarchy;
};
/**
 * Imports a Notion zip file into the BlockSuite collection.
 *
 * @param options - The options for importing.
 * @param options.collection - The BlockSuite document collection.
 * @param options.schema - The schema of the BlockSuite document collection.
 * @param options.imported - The imported zip file as a Blob.
 *
 * @returns A promise that resolves to an object containing:
 *          - entryId: The ID of the entry page (if any).
 *          - pageIds: An array of imported page IDs.
 *          - isWorkspaceFile: Whether the imported file is a workspace file.
 *          - hasMarkdown: Whether the zip contains markdown files.
 *          - folderHierarchy: The parsed folder hierarchy from the Notion export.
 */
declare function importNotionZip({ collection, schema, imported, extensions, }: ImportNotionZipOptions): Promise<ImportNotionZipResult>;
export declare const NotionHtmlTransformer: {
    importNotionZip: typeof importNotionZip;
};
export {};
//# sourceMappingURL=notion-html.d.ts.map