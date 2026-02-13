import { getDocSummaryQuery } from '@affine/graphql';
import { Store } from '@toeverything/infra';
import { map, Observable } from 'rxjs';
export class DocSummaryStore extends Store {
    get indexer() {
        return this.workspaceService.workspace.engine.indexer;
    }
    constructor(workspaceService, workspaceServerService, cacheStorage) {
        super();
        this.workspaceService = workspaceService;
        this.workspaceServerService = workspaceServerService;
        this.cacheStorage = cacheStorage;
        this.gql = this.workspaceServerService.server?.gql;
    }
    async getDocSummaryFromCloud(docId) {
        return this.gql?.({
            query: getDocSummaryQuery,
            variables: {
                workspaceId: this.workspaceService.workspace.id,
                docId,
            },
        }).then(res => res.workspace.doc.summary ?? '');
    }
    watchDocSummaryFromIndexer(docId) {
        return new Observable(subscribe => {
            const undoIndexer = this.indexer.addPriority(docId, 10);
            const undoSync = this.workspaceService.workspace.engine.doc.addPriority(docId, 10);
            const sub = this.indexer
                .search$('doc', {
                type: 'match',
                field: 'docId',
                match: docId,
            }, {
                fields: ['summary'],
                pagination: {
                    limit: 1,
                },
            })
                .pipe(map(({ nodes }) => {
                const node = nodes.at(0);
                return ((typeof node?.fields.summary === 'string'
                    ? node?.fields.summary
                    : node?.fields.summary[0]) ?? '');
            }))
                .subscribe(subscribe);
            return () => {
                undoIndexer();
                undoSync();
                sub.unsubscribe();
            };
        });
    }
    async setDocSummaryCache(docId, summary) {
        return this.cacheStorage.set(`doc-summary:${this.workspaceService.workspace.id}:${docId}`, summary);
    }
    watchDocSummaryCache(docId) {
        return this.cacheStorage.watch(`doc-summary:${this.workspaceService.workspace.id}:${docId}`);
    }
}
//# sourceMappingURL=doc-summary.js.map