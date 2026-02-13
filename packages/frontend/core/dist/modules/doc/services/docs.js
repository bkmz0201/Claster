import { DebugLogger } from '@affine/debug';
import { Unreachable } from '@affine/env/constant';
import { replaceIdMiddleware } from '@blocksuite/affine/shared/adapters';
import { Slice, Text, Transformer } from '@blocksuite/affine/store';
import { ObjectPool, Service } from '@toeverything/infra';
import { combineLatest, map } from 'rxjs';
import { initDocFromProps } from '../../../blocksuite/initialization';
import { getAFFiNEWorkspaceSchema } from '../../workspace';
import { DocRecordList } from '../entities/record-list';
import { DocCreated, DocInitialized } from '../events';
import { DocScope } from '../scopes/doc';
import { DocService } from './doc';
const logger = new DebugLogger('DocsService');
export class DocsService extends Service {
    /**
     * Get all property values of a property, used for search
     *
     * Results may include docs in trash or deleted docs
     * Legacy property data such as old `journal` will not be included in the values
     */
    propertyValues$(propertyKey) {
        return combineLatest([
            this.store.watchDocIds(),
            this.docPropertiesStore.watchPropertyAllValues(propertyKey),
        ]).pipe(map(([docIds, propertyValues]) => {
            const result = new Map();
            for (const docId of docIds) {
                result.set(docId, propertyValues.get(docId));
            }
            return result;
        }));
    }
    /**
     * used for search
     */
    allDocsCreatedDate$() {
        return this.store.watchAllDocCreateDate();
    }
    /**
     * used for search
     */
    allDocsUpdatedDate$() {
        return this.store.watchAllDocUpdatedDate();
    }
    allDocsTagIds$() {
        return this.store.watchAllDocTagIds();
    }
    allDocIds$() {
        return this.store.watchDocIds();
    }
    allNonTrashDocIds$() {
        return this.store.watchNonTrashDocIds();
    }
    allTrashDocIds$() {
        return this.store.watchTrashDocIds();
    }
    allDocTitle$() {
        return this.store.watchAllDocTitle();
    }
    constructor(store, docPropertiesStore, docCreateMiddlewares) {
        super();
        this.store = store;
        this.docPropertiesStore = docPropertiesStore;
        this.docCreateMiddlewares = docCreateMiddlewares;
        this.list = this.framework.createEntity(DocRecordList);
        this.pool = new ObjectPool({
            onDelete(obj) {
                obj.scope.dispose();
            },
        });
    }
    loaded(docId) {
        const exists = this.pool.get(docId);
        if (exists) {
            return { doc: exists.obj, release: exists.release };
        }
        return null;
    }
    open(docId) {
        const docRecord = this.list.doc$(docId).value;
        if (!docRecord) {
            throw new Error('Doc record not found');
        }
        const blockSuiteDoc = this.store.getBlockSuiteDoc(docId);
        if (!blockSuiteDoc) {
            throw new Error('Doc not found');
        }
        const exists = this.pool.get(docId);
        if (exists) {
            return { doc: exists.obj, release: exists.release };
        }
        const docScope = this.framework.createScope(DocScope, {
            docId,
            blockSuiteDoc,
            record: docRecord,
        });
        try {
            blockSuiteDoc.load();
        }
        catch (e) {
            logger.error('Failed to load doc', {
                docId,
                error: e,
            });
        }
        const doc = docScope.get(DocService).doc;
        doc.scope.emitEvent(DocInitialized, doc);
        const { obj, release } = this.pool.put(docId, doc);
        return { doc: obj, release };
    }
    createDoc(options = {}) {
        for (const middleware of this.docCreateMiddlewares) {
            options = middleware.beforeCreate
                ? middleware.beforeCreate(options)
                : options;
        }
        const id = this.store.createDoc(options.id);
        const docStore = this.store.getBlockSuiteDoc(id);
        if (!docStore) {
            throw new Error('Failed to create doc');
        }
        if (options.skipInit !== true) {
            initDocFromProps(docStore, options.docProps, options);
        }
        const docRecord = this.list.doc$(id).value;
        if (!docRecord) {
            throw new Unreachable();
        }
        if (options.primaryMode) {
            docRecord.setPrimaryMode(options.primaryMode);
        }
        if (options.isTemplate) {
            docRecord.setProperty('isTemplate', true);
        }
        for (const middleware of this.docCreateMiddlewares) {
            middleware.afterCreate?.(docRecord, options);
        }
        docRecord.setCreatedAt(Date.now());
        docRecord.setUpdatedAt(Date.now());
        this.eventBus.emit(DocCreated, {
            doc: docRecord,
            docCreateOptions: options,
        });
        return docRecord;
    }
    async addLinkedDoc(targetDocId, linkedDocId) {
        const { doc, release } = this.open(targetDocId);
        const disposePriorityLoad = doc.addPriorityLoad(10);
        await doc.waitForSyncReady();
        disposePriorityLoad();
        const text = new Text([
            {
                insert: ' ',
                attributes: {
                    reference: {
                        type: 'LinkedPage',
                        pageId: linkedDocId,
                    },
                },
            },
        ]);
        const [frame] = doc.blockSuiteDoc.getBlocksByFlavour('affine:note');
        frame &&
            doc.blockSuiteDoc.addBlock('affine:paragraph', // TODO(eyhn): fix type
            { text }, frame.id);
        release();
    }
    async changeDocTitle(docId, newTitle) {
        const { doc, release } = this.open(docId);
        const disposePriorityLoad = doc.addPriorityLoad(10);
        await doc.waitForSyncReady();
        disposePriorityLoad();
        doc.changeDocTitle(newTitle);
        release();
    }
    async duplicate(sourceDocId, _targetDocId) {
        const targetDocId = _targetDocId ?? this.createDoc().id;
        // check if source doc is removed
        if (this.list.doc$(sourceDocId).value?.trash$.value) {
            console.warn(`Template doc(id: ${sourceDocId}) is removed, skip duplicate`);
            return targetDocId;
        }
        const { release: sourceRelease, doc: sourceDoc } = this.open(sourceDocId);
        const { release: targetRelease, doc: targetDoc } = this.open(targetDocId);
        await sourceDoc.waitForSyncReady();
        // duplicate doc content
        try {
            const sourceBsDoc = this.store.getBlockSuiteDoc(sourceDocId);
            const targetBsDoc = this.store.getBlockSuiteDoc(targetDocId);
            if (!sourceBsDoc)
                throw new Error('Source doc not found');
            if (!targetBsDoc)
                throw new Error('Target doc not found');
            // clear the target doc (both surface and note)
            targetBsDoc.root?.children.forEach(child => targetBsDoc.deleteBlock(child));
            const collection = this.store.getBlocksuiteCollection();
            const transformer = new Transformer({
                schema: getAFFiNEWorkspaceSchema(),
                blobCRUD: collection.blobSync,
                docCRUD: {
                    create: (id) => {
                        this.createDoc({ id });
                        const store = collection.getDoc(id)?.getStore({ id });
                        if (!store) {
                            throw new Error('Failed to create doc');
                        }
                        return store;
                    },
                    get: (id) => collection.getDoc(id)?.getStore({ id }) ?? null,
                    delete: (id) => collection.removeDoc(id),
                },
                middlewares: [replaceIdMiddleware(collection.idGenerator)],
            });
            const slice = Slice.fromModels(sourceBsDoc, [
                ...(sourceBsDoc.root?.children ?? []),
            ]);
            const snapshot = transformer.sliceToSnapshot(slice);
            if (!snapshot) {
                throw new Error('Failed to create snapshot');
            }
            await transformer.snapshotToSlice(snapshot, targetBsDoc, targetBsDoc.root?.id);
        }
        catch (e) {
            logger.error('Failed to duplicate doc', {
                sourceDocId,
                targetDocId,
                originalTargetDocId: _targetDocId,
                error: e,
            });
        }
        finally {
            sourceRelease();
            targetRelease();
        }
        // duplicate doc meta
        targetDoc.record.setMeta({
            tags: sourceDoc.meta$.value.tags,
        });
        // duplicate doc title
        const originalTitle = sourceDoc.title$.value;
        const lastDigitRegex = /\((\d+)\)$/;
        const match = originalTitle.match(lastDigitRegex);
        const newNumber = match ? parseInt(match[1], 10) + 1 : 1;
        const newPageTitle = originalTitle.replace(lastDigitRegex, '') + `(${newNumber})`;
        targetDoc.changeDocTitle(newPageTitle);
        // duplicate doc properties
        const properties = sourceDoc.getProperties();
        const removedProperties = ['id', 'isTemplate', 'journal'];
        removedProperties.forEach(key => {
            delete properties[key];
        });
        targetDoc.updateProperties(properties);
        return targetDocId;
    }
    /**
     * Duplicate a doc from template
     * @param sourceDocId - the id of the source doc to be duplicated
     * @param _targetDocId - the id of the target doc to be duplicated, if not provided, a new doc will be created
     * @returns the id of the new doc
     */
    async duplicateFromTemplate(sourceDocId, _targetDocId) {
        const targetDocId = _targetDocId ?? this.createDoc().id;
        // check if source doc is removed
        if (this.list.doc$(sourceDocId).value?.trash$.value) {
            console.warn(`Template doc(id: ${sourceDocId}) is removed, skip duplicate`);
            return targetDocId;
        }
        const { release: sourceRelease, doc: sourceDoc } = this.open(sourceDocId);
        const { release: targetRelease, doc: targetDoc } = this.open(targetDocId);
        await sourceDoc.waitForSyncReady();
        // duplicate doc content
        try {
            const sourceBsDoc = this.store.getBlockSuiteDoc(sourceDocId);
            const targetBsDoc = this.store.getBlockSuiteDoc(targetDocId);
            if (!sourceBsDoc)
                throw new Error('Source doc not found');
            if (!targetBsDoc)
                throw new Error('Target doc not found');
            // clear the target doc (both surface and note)
            targetBsDoc.root?.children.forEach(child => targetBsDoc.deleteBlock(child));
            const collection = this.store.getBlocksuiteCollection();
            const transformer = new Transformer({
                schema: getAFFiNEWorkspaceSchema(),
                blobCRUD: collection.blobSync,
                docCRUD: {
                    create: (id) => {
                        this.createDoc({ id });
                        const store = collection.getDoc(id)?.getStore({ id });
                        if (!store) {
                            throw new Error('Failed to create doc');
                        }
                        return store;
                    },
                    get: (id) => collection.getDoc(id)?.getStore({ id }) ?? null,
                    delete: (id) => collection.removeDoc(id),
                },
                middlewares: [replaceIdMiddleware(collection.idGenerator)],
            });
            const slice = Slice.fromModels(sourceBsDoc, [
                ...(sourceBsDoc.root?.children ?? []),
            ]);
            const snapshot = transformer.sliceToSnapshot(slice);
            if (!snapshot) {
                throw new Error('Failed to create snapshot');
            }
            await transformer.snapshotToSlice(snapshot, targetBsDoc, targetBsDoc.root?.id);
        }
        catch (e) {
            logger.error('Failed to duplicate doc', {
                sourceDocId,
                targetDocId,
                originalTargetDocId: _targetDocId,
                error: e,
            });
        }
        finally {
            sourceRelease();
            targetRelease();
        }
        // duplicate doc properties
        const properties = sourceDoc.getProperties();
        const removedProperties = ['id', 'isTemplate', 'journal'];
        removedProperties.forEach(key => {
            delete properties[key];
        });
        targetDoc.updateProperties(properties);
        return targetDocId;
    }
}
//# sourceMappingURL=docs.js.map