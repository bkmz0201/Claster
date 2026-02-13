import { Store } from '@toeverything/infra';
import { Observable } from 'rxjs';
import type { WorkspaceServerService } from '../../cloud';
import type { CacheStorage } from '../../storage';
import type { WorkspaceService } from '../../workspace';
export declare class DocSummaryStore extends Store {
    private readonly workspaceService;
    private readonly workspaceServerService;
    private readonly cacheStorage;
    get indexer(): import("@affine/nbstore").IndexerFrontend;
    private readonly gql;
    constructor(workspaceService: WorkspaceService, workspaceServerService: WorkspaceServerService, cacheStorage: CacheStorage);
    getDocSummaryFromCloud(docId: string): Promise<string | undefined>;
    watchDocSummaryFromIndexer(docId: string): Observable<string>;
    setDocSummaryCache(docId: string, summary: string): Promise<void>;
    watchDocSummaryCache(docId: string): Observable<string | undefined>;
}
//# sourceMappingURL=doc-summary.d.ts.map