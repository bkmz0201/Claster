import { LifeCycleWatcher } from '@blocksuite/affine/std';
import { Extension, type Store } from '@blocksuite/affine/store';
import { type Container } from '@blocksuite/global/di';
import { LiveData } from '@toeverything/infra';
import { type RenderDiffs } from '../utils/apply-model/generate-render-diff';
interface RejectMap {
    deletes: string[];
    inserts: string[];
    updates: string[];
}
type AcceptDelete = {
    type: 'delete';
    payload: {
        id: string;
    };
};
type AcceptUpdate = {
    type: 'update';
    payload: {
        id: string;
        content: string;
    };
};
type AcceptInsert = {
    type: 'insert';
    payload: {
        from: string;
        offset: number;
        content: string;
    };
};
type Accept = AcceptDelete | AcceptUpdate | AcceptInsert;
type RejectDelete = {
    type: 'delete';
    payload: {
        id: string;
    };
};
type RejectUpdate = {
    type: 'update';
    payload: {
        id: string;
    };
};
type RejectInsert = {
    type: 'insert';
    payload: {
        from: string;
        offset: number;
    };
};
type Reject = RejectDelete | RejectUpdate | RejectInsert;
export interface BlockDiffProvider {
    diffMap$: LiveData<RenderDiffs>;
    rejects$: LiveData<RejectMap>;
    isBatchingApply: boolean;
    /**
     * Set the original markdown
     * @param originalMarkdown - The original markdown
     */
    setOriginalMarkdown(originalMarkdown: string | null): void;
    /**
     * Set the changed markdown
     * @param changedMarkdown - The changed markdown
     */
    setChangedMarkdown(changedMarkdown: string | null): void;
    /**
     * Apply the diff to the doc
     * @param doc - The doc
     * @param changedMarkdown - The changed markdown
     */
    apply(doc: Store, changedMarkdown: string): Promise<void>;
    /**
     * Clear the diff map
     */
    clearDiff(): void;
    /**
     * Get the diff map
     */
    getDiff(): RenderDiffs;
    /**
     * Check if there is any diff
     */
    hasDiff(): boolean;
    /**
     * Accept all the diffs
     */
    acceptAll(doc: Store): Promise<void>;
    /**
     * Accept a diff
     */
    accept(accept: Accept, doc: Store): Promise<void>;
    /**
     * Reject all the diffs
     */
    rejectAll(): void;
    /**
     * Reject a diff
     */
    reject(reject: Reject): void;
    /**
     * Check if a diff is rejected
     */
    isRejected(type: 'delete' | 'update' | 'insert', index: string): boolean;
    /**
     * Get the total number of diffs
     */
    getTotalDiffs(): number;
    /**
     * Get the markdown from the doc
     * @param doc - The doc
     */
    getMarkdownFromDoc(doc: Store): Promise<string>;
    /**
     * Get the index of a block in the doc
     * @param doc - The doc
     * @param blockId - The id of the block
     */
    getBlockIndexById(doc: Store, blockId: string): number;
}
export declare const BlockDiffProvider: import("@blocksuite/global/di").ServiceIdentifier<BlockDiffProvider> & (<U extends BlockDiffProvider = BlockDiffProvider>(variant: import("@blocksuite/global/di").ServiceVariant) => import("@blocksuite/global/di").ServiceIdentifier<U>);
export declare class BlockDiffService extends Extension implements BlockDiffProvider {
    rejects$: LiveData<RejectMap>;
    diffMap$: LiveData<RenderDiffs>;
    private originalMarkdown;
    private changedMarkdown;
    isBatchingApply: boolean;
    static setup(di: Container): void;
    getBlockIndexById(doc: Store, blockId: string): number;
    hasDiff(): boolean;
    setOriginalMarkdown(originalMarkdown: string): void;
    setChangedMarkdown(changedMarkdown: string): void;
    apply(doc: Store, changedMarkdown: string): Promise<void>;
    private _refreshDiff;
    getDiff(): RenderDiffs;
    clearDiff(): void;
    clearRejects(): void;
    acceptAll(doc: Store): Promise<void>;
    accept(accept: Accept, doc: Store): Promise<void>;
    rejectAll(): void;
    reject(reject: Reject): void;
    isRejected(type: 'delete' | 'update' | 'insert', index: string): boolean;
    getTotalDiffs(): number;
    getMarkdownFromDoc: (doc: Store) => Promise<string>;
}
export declare class BlockDiffWatcher extends LifeCycleWatcher {
    static key: string;
    private _blockUpdatedSubscription;
    created(): void;
    private readonly _refreshOriginalMarkdown;
    mounted(): void;
    unmounted(): void;
}
export {};
//# sourceMappingURL=block-diff.d.ts.map