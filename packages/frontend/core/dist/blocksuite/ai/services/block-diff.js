import { parsePageDoc } from '@affine/reader';
import { LifeCycleWatcher } from '@blocksuite/affine/std';
import { Extension } from '@blocksuite/affine/store';
import { createIdentifier } from '@blocksuite/global/di';
import { LiveData } from '@toeverything/infra';
import { applyPatchToDoc } from '../utils/apply-model/apply-patch-to-doc';
import { generateRenderDiff, } from '../utils/apply-model/generate-render-diff';
export const BlockDiffProvider = createIdentifier('AffineBlockDiffService');
export class BlockDiffService extends Extension {
    constructor() {
        super(...arguments);
        this.rejects$ = new LiveData({
            deletes: [],
            inserts: [],
            updates: [],
        });
        this.diffMap$ = new LiveData({
            deletes: [],
            inserts: {},
            updates: {},
        });
        this.originalMarkdown = null;
        this.changedMarkdown = null;
        this.isBatchingApply = false;
        this.getMarkdownFromDoc = async (doc) => {
            const job = doc.getTransformer();
            const snapshot = job.docToSnapshot(doc);
            const spaceDoc = doc.doc.spaceDoc;
            if (!snapshot) {
                throw new Error('Failed to get snapshot');
            }
            const parsed = parsePageDoc({
                doc: spaceDoc,
                workspaceId: doc.workspace.id,
                buildBlobUrl: (blobId) => {
                    return `/${doc.workspace.id}/blobs/${blobId}`;
                },
                buildDocUrl: (docId) => {
                    return `/workspace/${doc.workspace.id}/${docId}`;
                },
                aiEditable: true,
            });
            return parsed.md;
        };
    }
    static setup(di) {
        di.addImpl(BlockDiffProvider, BlockDiffService);
    }
    getBlockIndexById(doc, blockId) {
        const notes = doc.getBlocksByFlavour('affine:note');
        if (notes.length === 0)
            return 0;
        const note = notes[0].model;
        return note.children.findIndex(child => child.id === blockId);
    }
    hasDiff() {
        const { deletes, updates, inserts } = this.diffMap$.value;
        if (deletes.length > 0 ||
            Object.keys(updates).length > 0 ||
            Object.keys(inserts).length > 0) {
            return true;
        }
        return false;
    }
    setOriginalMarkdown(originalMarkdown) {
        this.originalMarkdown = originalMarkdown;
        this._refreshDiff();
    }
    setChangedMarkdown(changedMarkdown) {
        this.changedMarkdown = changedMarkdown;
        this.clearRejects();
        this._refreshDiff();
    }
    async apply(doc, changedMarkdown) {
        this.originalMarkdown = await this.getMarkdownFromDoc(doc);
        this.changedMarkdown = changedMarkdown;
        this.clearRejects();
        this._refreshDiff();
    }
    _refreshDiff() {
        if (!this.originalMarkdown || !this.changedMarkdown) {
            this.clearDiff();
            return;
        }
        const diffMap = generateRenderDiff(this.originalMarkdown, this.changedMarkdown);
        this.diffMap$.next(diffMap);
    }
    getDiff() {
        return this.diffMap$.value;
    }
    clearDiff() {
        this.diffMap$.next({
            deletes: [],
            inserts: {},
            updates: {},
        });
    }
    clearRejects() {
        this.rejects$.next({
            deletes: [],
            inserts: [],
            updates: [],
        });
    }
    async acceptAll(doc) {
        this.isBatchingApply = true;
        const { deletes, updates, inserts } = this.diffMap$.value;
        try {
            for (const [id, content] of Object.entries(updates)) {
                await applyPatchToDoc(doc, [{ op: 'replace', id, content }]);
            }
            for (const [from, blocks] of Object.entries(inserts)) {
                let baseIndex = 0;
                if (from !== 'HEAD') {
                    baseIndex = this.getBlockIndexById(doc, from) + 1;
                }
                for (const [offset, block] of blocks.entries()) {
                    await applyPatchToDoc(doc, [
                        { op: 'insert', index: baseIndex + offset, after: from, block },
                    ]);
                }
            }
            for (const id of deletes) {
                await applyPatchToDoc(doc, [{ op: 'delete', id }]);
            }
            this.diffMap$.next({
                deletes: [],
                inserts: {},
                updates: {},
            });
        }
        finally {
            this.isBatchingApply = false;
        }
    }
    async accept(accept, doc) {
        const { type, payload } = accept;
        switch (type) {
            case 'delete': {
                await applyPatchToDoc(doc, [{ op: 'delete', id: payload.id }]);
                break;
            }
            case 'update': {
                await applyPatchToDoc(doc, [
                    { op: 'replace', id: payload.id, content: payload.content },
                ]);
                break;
            }
            case 'insert': {
                const block = this.diffMap$.value.inserts[payload.from][payload.offset];
                let baseIndex = 0;
                if (payload.from !== 'HEAD') {
                    baseIndex = this.getBlockIndexById(doc, payload.from) + 1;
                }
                await applyPatchToDoc(doc, [
                    {
                        op: 'insert',
                        index: baseIndex + payload.offset,
                        after: payload.from,
                        block,
                    },
                ]);
                break;
            }
        }
    }
    rejectAll() {
        this.clearDiff();
        this.clearRejects();
        this.changedMarkdown = null;
    }
    reject(reject) {
        const rejects = this.rejects$.value;
        switch (reject.type) {
            case 'delete':
                this.rejects$.next({
                    ...rejects,
                    deletes: [...rejects.deletes, reject.payload.id],
                });
                break;
            case 'update':
                this.rejects$.next({
                    ...rejects,
                    updates: [...rejects.updates, reject.payload.id],
                });
                break;
            case 'insert':
                this.rejects$.next({
                    ...rejects,
                    inserts: [
                        ...rejects.inserts,
                        `${reject.payload.from}:${reject.payload.offset}`,
                    ],
                });
                break;
        }
    }
    isRejected(type, index) {
        const rejects = this.rejects$.value;
        if (type === 'delete') {
            return rejects.deletes.includes(index);
        }
        if (type === 'update') {
            return rejects.updates.includes(index);
        }
        if (type === 'insert') {
            return rejects.inserts.includes(index);
        }
        return false;
    }
    getTotalDiffs() {
        const rejects = this.rejects$.value;
        const { deletes, updates, inserts } = this.diffMap$.value;
        const insertCount = Object.values(inserts).reduce((sum, arr) => sum + arr.length, 0);
        const rejectDeleteCount = rejects.deletes.length;
        const rejectUpdateCount = rejects.updates.length;
        const rejectInsertCount = rejects.inserts.length;
        return (deletes.length +
            Object.keys(updates).length +
            insertCount -
            rejectDeleteCount -
            rejectUpdateCount -
            rejectInsertCount);
    }
}
export class BlockDiffWatcher extends LifeCycleWatcher {
    constructor() {
        super(...arguments);
        this._blockUpdatedSubscription = null;
        this._refreshOriginalMarkdown = async () => {
            const diffService = this.std.get(BlockDiffProvider);
            if (!diffService.hasDiff() || diffService.isBatchingApply) {
                return;
            }
            const markdown = await diffService.getMarkdownFromDoc(this.std.store);
            if (markdown) {
                diffService.setOriginalMarkdown(markdown);
            }
        };
    }
    static { this.key = 'block-diff-watcher'; }
    created() {
        super.created();
    }
    mounted() {
        super.mounted();
        this._blockUpdatedSubscription =
            this.std.store.slots.blockUpdated.subscribe(() => {
                this._refreshOriginalMarkdown().catch(err => {
                    console.error('Failed to refresh original markdown', err);
                });
            });
    }
    unmounted() {
        super.unmounted();
        this._blockUpdatedSubscription?.unsubscribe();
    }
}
//# sourceMappingURL=block-diff.js.map