export type Block = {
    id: string;
    type: string;
    content: string;
};
export type PatchOp = {
    op: 'replace';
    id: string;
    content: string;
} | {
    op: 'delete';
    id: string;
} | {
    op: 'insert';
    index: number;
    after: string;
    block: Block;
};
export declare function parseMarkdownToBlocks(markdown: string): Block[];
export declare function diffMarkdown(oldMarkdown: string, newMarkdown: string): {
    patches: PatchOp[];
    newBlocks: Block[];
    oldBlocks: Block[];
};
//# sourceMappingURL=markdown-diff.d.ts.map