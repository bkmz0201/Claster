import type { DocMeta, Workspace } from '@blocksuite/affine/store';
/**
 * Get pageMetas excluding journal pages without updatedDate
 * If you want to get all pageMetas, use `useAllBlockSuitePageMeta` instead
 * @returns
 */
export declare function useBlockSuiteDocMeta(docCollection: Workspace): DocMeta[];
export declare function useDocMetaHelper(): {
    setDocTitle: (docId: string, newTitle: string) => void;
    setDocMeta: (docId: string, docMeta: Partial<DocMeta>) => void;
    getDocMeta: (docId: string) => Partial<DocMeta> | undefined;
};
//# sourceMappingURL=use-block-suite-page-meta.d.ts.map