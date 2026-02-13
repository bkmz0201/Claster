import type { IndexerSyncState } from '@affine/nbstore';
import { LiveData, Service } from '@toeverything/infra';
import { type Observable } from 'rxjs';
import type { DocsService } from '../../doc/services/docs';
import type { WorkspaceService } from '../../workspace';
export declare class DocsSearchService extends Service {
    private readonly workspaceService;
    private readonly docsService;
    constructor(workspaceService: WorkspaceService, docsService: DocsService);
    get indexer(): import("@affine/nbstore").IndexerFrontend;
    readonly indexerState$: LiveData<IndexerSyncState>;
    searchTitle$(query: string): Observable<string[]>;
    search$(query: string): Observable<{
        docId: string;
        title: string;
        score: number;
        blockId?: string;
        blockContent?: string;
    }[]>;
    watchRefsFrom(ids: string | string[]): Observable<{
        title: string;
        docId: string;
        params: URLSearchParams | undefined;
    }[]>;
    watchDatabasesTo(docId: string): Observable<{
        docId: string;
        rowId: string;
        databaseBlockId: string;
        databaseName: string | undefined;
    }[]>;
    watchDocSummary(docId: string): Observable<string | null>;
}
//# sourceMappingURL=docs-search.d.ts.map