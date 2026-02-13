import { BlockSuiteError, ErrorCode, } from '@blocksuite/affine/global/exceptions';
import { NoopLogger } from '@blocksuite/affine/global/utils';
import { nanoid, } from '@blocksuite/affine/store';
import { BlobEngine, MemoryBlobSource, } from '@blocksuite/affine/sync';
import { Subject } from 'rxjs';
import { DocImpl } from './doc';
import { WorkspaceMetaImpl } from './meta';
export class WorkspaceImpl {
    get docs() {
        return this.blockCollections;
    }
    constructor({ id, rootDoc, blobSource, onLoadDoc, onLoadAwareness, onCreateDoc, featureFlagService, }) {
        this.blockCollections = new Map();
        this.slots = {
            /* eslint-disable rxjs/finnish */
            docListUpdated: new Subject(),
            /* eslint-enable rxjs/finnish */
        };
        this.id = id || '';
        this.featureFlagService = featureFlagService;
        this.doc = rootDoc;
        this.onLoadDoc = onLoadDoc;
        this.onLoadDoc?.(this.doc);
        this.onLoadAwareness = onLoadAwareness;
        this.onCreateDoc = onCreateDoc;
        blobSource = blobSource ?? new MemoryBlobSource();
        const logger = new NoopLogger();
        this.blobSync = new BlobEngine(blobSource, [], logger);
        this.idGenerator = nanoid;
        this.meta = new WorkspaceMetaImpl(this.doc);
        this._bindDocMetaEvents();
    }
    _bindDocMetaEvents() {
        this.meta.docMetaAdded.subscribe(docId => {
            const doc = new DocImpl({
                id: docId,
                collection: this,
                doc: this.doc,
            });
            this.blockCollections.set(doc.id, doc);
        });
        this.meta.docMetaUpdated.subscribe(() => this.slots.docListUpdated.next());
        this.meta.docMetaRemoved.subscribe(id => {
            const doc = this._getDoc(id);
            if (!doc)
                return;
            this.blockCollections.delete(id);
            doc.remove();
        });
    }
    _hasDoc(docId) {
        return this.docs.has(docId);
    }
    /**
     * By default, only an empty doc will be created.
     * If the `init` parameter is passed, a `surface`, `note`, and `paragraph` block
     * will be created in the doc simultaneously.
     */
    createDoc(docId) {
        if (this.onCreateDoc) {
            const id = this.onCreateDoc(docId);
            const doc = this.getDoc(id);
            if (!doc) {
                throw new BlockSuiteError(ErrorCode.DocCollectionError, 'create doc failed');
            }
            return doc;
        }
        const id = docId ?? this.idGenerator();
        if (this._hasDoc(id)) {
            throw new BlockSuiteError(ErrorCode.DocCollectionError, 'doc already exists');
        }
        this.meta.addDocMeta({
            id,
            title: '',
            createDate: Date.now(),
            tags: [],
        });
        return this.getDoc(id);
    }
    _getDoc(docId) {
        const space = this.docs.get(docId);
        return space ?? null;
    }
    getDoc(docId) {
        const doc = this._getDoc(docId);
        return doc;
    }
    removeDoc(docId) {
        const docMeta = this.meta.getDocMeta(docId);
        if (!docMeta) {
            throw new BlockSuiteError(ErrorCode.DocCollectionError, `doc meta not found: ${docId}`);
        }
        const blockCollection = this._getDoc(docId);
        if (!blockCollection)
            return;
        blockCollection.dispose();
        this.meta.removeDocMeta(docId);
        this.blockCollections.delete(docId);
    }
    dispose() {
        this.blockCollections.forEach(doc => doc.dispose());
    }
}
//# sourceMappingURL=workspace.js.map