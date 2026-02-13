import type { FeatureFlagService } from '@affine/core/modules/feature-flag';
import { type EditorHost } from '@blocksuite/affine/std';
import type { BlockModel, Slice, SliceSnapshot, Store, TransformerMiddleware } from '@blocksuite/affine/store';
import { Transformer } from '@blocksuite/affine/store';
export declare function getContentFromSlice(host: EditorHost, slice: Slice, type?: 'markdown' | 'plain-text'): Promise<string>;
export declare const markdownToSnapshot: (markdown: string, store: Store, host?: EditorHost) => Promise<{
    snapshot: SliceSnapshot;
    transformer: Transformer;
} | {
    snapshot: null;
    transformer: Transformer;
}>;
export declare function insertFromMarkdown(host: EditorHost | undefined, markdown: string, doc: Store, parent?: string, index?: number, id?: string): Promise<BlockModel<object>[]>;
export declare function replaceFromMarkdown(host: EditorHost | undefined, markdown: string, doc: Store, parent: string, index: number, id: string): Promise<void>;
export declare function markDownToDoc(answer: string, middlewares?: TransformerMiddleware[], affineFeatureFlagService?: FeatureFlagService): Promise<Store>;
//# sourceMappingURL=markdown-utils.d.ts.map