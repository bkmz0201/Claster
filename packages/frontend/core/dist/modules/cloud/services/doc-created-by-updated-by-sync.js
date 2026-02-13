import { catchErrorInto, effect, fromPromise, LiveData, onStart, Service, throwIfAborted, } from '@toeverything/infra';
import { clamp } from 'lodash-es';
import { combineLatest, exhaustMap, finalize, map } from 'rxjs';
/**
 * This service is used to sync createdBy and updatedBy data from the cloud to local doc properties.
 *
 * # When sync is needed
 *
 * 1. When the user is an owner or admin
 * 2. When the root doc sync is complete
 * 3. When a doc is missing createdBy data
 * 4. When workspace has not been marked as `DocCreatedByUpdatedBySynced`
 */
export class DocCreatedByUpdatedBySyncService extends Service {
    constructor(workspaceService, docsService, workspacePermissionService, docCreatedByUpdatedBySyncStore) {
        super();
        this.workspaceService = workspaceService;
        this.docsService = docsService;
        this.workspacePermissionService = workspacePermissionService;
        this.docCreatedByUpdatedBySyncStore = docCreatedByUpdatedBySyncStore;
        this.syncing$ = new LiveData(false);
        this.error$ = new LiveData(null);
        // sync progress 0.0 - 1.0
        this.progress$ = new LiveData(0);
        this.sync = effect(exhaustMap(() => {
            return fromPromise(async (signal) => {
                let afterCursor = null;
                let finishedCount = 0;
                while (true) {
                    const result = await this.docCreatedByUpdatedBySyncStore.getDocCreatedByUpdatedByList(afterCursor);
                    throwIfAborted(signal);
                    for (const edge of result.workspace.docs.edges) {
                        const docId = edge.node.id;
                        const docRecord = this.docsService.list.doc$(docId).value;
                        if (docRecord) {
                            if (edge.node.creatorId) {
                                docRecord.setCreatedBy(edge.node.creatorId);
                            }
                            if (edge.node.lastUpdaterId) {
                                docRecord.setUpdatedBy(edge.node.lastUpdaterId);
                            }
                        }
                        finishedCount++;
                    }
                    this.progress$.value = clamp(finishedCount / result.workspace.docs.totalCount, 0, 1);
                    if (!result.workspace.docs.pageInfo.hasNextPage) {
                        break;
                    }
                    afterCursor = result.workspace.docs.pageInfo.endCursor;
                }
                this.docCreatedByUpdatedBySyncStore.setDocCreatedByUpdatedBySynced(true);
            }).pipe(catchErrorInto(this.error$), onStart(() => {
                this.syncing$.value = true;
                this.progress$.value = 0;
                this.error$.value = null;
            }), finalize(() => {
                this.syncing$.value = false;
            }));
        }));
        this.workspaceRootDocSynced$ = this.workspaceService.workspace.engine.doc
            .docState$(this.workspaceService.workspace.id)
            .pipe(map(doc => doc.synced));
        this.isOwnerOrAdmin$ = this.workspacePermissionService.permission.isOwnerOrAdmin$;
        this.missingCreatedBy$ = this.docsService
            .propertyValues$('createdBy')
            .pipe(map(allDocsCreatedBy => {
            let missingCreatedBy = false;
            for (const createdBy of allDocsCreatedBy.values()) {
                if (!createdBy) {
                    missingCreatedBy = true;
                    break;
                }
            }
            return missingCreatedBy;
        }));
        this.markedSynced$ = this.docCreatedByUpdatedBySyncStore.watchDocCreatedByUpdatedBySynced();
        this.needSync$ = LiveData.from(combineLatest([
            this.workspaceRootDocSynced$,
            this.isOwnerOrAdmin$,
            this.missingCreatedBy$,
            this.markedSynced$,
        ]).pipe(map(([workspaceRootDocSynced, isOwnerOrAdmin, missingCreatedBy, markedSynced,]) => workspaceRootDocSynced &&
            isOwnerOrAdmin &&
            missingCreatedBy &&
            !markedSynced &&
            this.workspaceService.workspace.flavour !== 'local')), false);
    }
    dispose() {
        super.dispose();
        this.sync.unsubscribe();
    }
}
//# sourceMappingURL=doc-created-by-updated-by-sync.js.map