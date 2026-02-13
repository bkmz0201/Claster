import { Entity } from '@toeverything/infra';
import { throttle } from 'lodash-es';
export class Doc extends Entity {
    constructor(scope, store, workspaceService) {
        super();
        this.scope = scope;
        this.store = store;
        this.workspaceService = workspaceService;
        this.yDoc = this.scope.props.blockSuiteDoc.spaceDoc;
        this.blockSuiteDoc = this.scope.props.blockSuiteDoc;
        this.record = this.scope.props.record;
        this.meta$ = this.record.meta$;
        this.properties$ = this.record.properties$;
        this.primaryMode$ = this.record.primaryMode$;
        this.title$ = this.record.title$;
        this.trash$ = this.record.trash$;
        this.createdAt$ = this.record.createdAt$;
        this.updatedAt$ = this.record.updatedAt$;
        this.createdBy$ = this.record.createdBy$;
        this.updatedBy$ = this.record.updatedBy$;
        const handleTransactionThrottled = throttle((trx) => {
            if (trx.local) {
                this.setUpdatedAt(Date.now());
            }
        }, 1000, {
            leading: true,
            trailing: true,
        });
        this.yDoc.on('afterTransaction', handleTransactionThrottled);
        this.disposables.push(() => {
            this.yDoc.off('afterTransaction', handleTransactionThrottled);
            handleTransactionThrottled.cancel();
        });
        this.disposables.push(this.workspaceService.workspace.engine.doc.addPriority(this.id, 100));
        this.disposables.push(this.workspaceService.workspace.engine.indexer.addPriority(this.id, 100));
    }
    /**
     * for convenience
     */
    get workspace() {
        return this.workspaceService.workspace;
    }
    get id() {
        return this.scope.props.docId;
    }
    setCreatedAt(createdAt) {
        this.record.setMeta({ createDate: createdAt });
    }
    setUpdatedAt(updatedAt) {
        this.record.setMeta({ updatedDate: updatedAt });
    }
    setCreatedBy(createdBy) {
        this.setProperty('createdBy', createdBy);
    }
    setUpdatedBy(updatedBy) {
        this.setProperty('updatedBy', updatedBy);
    }
    customProperty$(propertyId) {
        return this.record.customProperty$(propertyId);
    }
    setProperty(propertyId, value) {
        return this.record.setProperty(propertyId, value);
    }
    updateProperties(properties) {
        return this.record.updateProperties(properties);
    }
    getProperties() {
        return this.record.getProperties();
    }
    setCustomProperty(propertyId, value) {
        return this.record.setCustomProperty(propertyId, value);
    }
    setPrimaryMode(mode) {
        return this.record.setPrimaryMode(mode);
    }
    getPrimaryMode() {
        return this.record.getPrimaryMode();
    }
    togglePrimaryMode() {
        this.setPrimaryMode((this.getPrimaryMode() === 'edgeless' ? 'page' : 'edgeless'));
    }
    moveToTrash() {
        return this.record.moveToTrash();
    }
    restoreFromTrash() {
        return this.record.restoreFromTrash();
    }
    waitForSyncReady() {
        return this.store.waitForDocLoadReady(this.id);
    }
    addPriorityLoad(priority) {
        return this.store.addPriorityLoad(this.id, priority);
    }
    changeDocTitle(newTitle) {
        const pageBlock = this.blockSuiteDoc.getBlocksByFlavour('affine:page').at(0)
            ?.model;
        if (pageBlock) {
            this.blockSuiteDoc.transact(() => {
                pageBlock.props.title.delete(0, pageBlock.props.title.length);
                pageBlock.props.title.insert(newTitle, 0);
            });
            this.record.setMeta({ title: newTitle });
        }
    }
}
//# sourceMappingURL=doc.js.map