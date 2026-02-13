import { Entity } from '@toeverything/infra';
import { WorkspaceEngineBeforeStart } from '../events';
export class WorkspaceEngine extends Entity {
    constructor(workspaceService, nbstoreService, featureFlagService) {
        super();
        this.workspaceService = workspaceService;
        this.nbstoreService = nbstoreService;
        this.featureFlagService = featureFlagService;
        this.started = false;
    }
    get doc() {
        if (!this.client) {
            throw new Error('Engine is not initialized');
        }
        return this.client.docFrontend;
    }
    get blob() {
        if (!this.client) {
            throw new Error('Engine is not initialized');
        }
        return this.client.blobFrontend;
    }
    get indexer() {
        if (!this.client) {
            throw new Error('Engine is not initialized');
        }
        return this.client.indexerFrontend;
    }
    get awareness() {
        if (!this.client) {
            throw new Error('Engine is not initialized');
        }
        return this.client.awarenessFrontend;
    }
    start() {
        if (this.started) {
            throw new Error('Engine is already started');
        }
        this.started = true;
        const { store, dispose } = this.nbstoreService.openStore((this.props.isSharedMode ? 'shared:' : '') +
            `workspace:${this.workspaceService.workspace.flavour}:${this.workspaceService.workspace.id}`, this.props.engineWorkerInitOptions);
        if (this.featureFlagService.flags.enable_battery_save_mode.value &&
            this.workspaceService.workspace.flavour !== 'local') {
            store.enableBatterySaveMode().catch(err => {
                console.error('error enabling battery save mode', err);
            });
        }
        this.client = store;
        this.disposables.push(dispose);
        this.eventBus.emit(WorkspaceEngineBeforeStart, this);
        const rootDoc = this.workspaceService.workspace.docCollection.doc;
        // priority load root doc
        this.doc.addPriority(rootDoc.guid, 100);
        this.indexer.addPriority(rootDoc.guid, 100);
        this.doc.start();
        this.disposables.push(() => this.doc.stop());
        // fully migrate blobs from v1 to v2, its won't do anything if v1 storage is not exist
        store.blobFrontend.fullDownload('v1').catch(() => {
            // should never reach here
        });
    }
}
//# sourceMappingURL=engine.js.map