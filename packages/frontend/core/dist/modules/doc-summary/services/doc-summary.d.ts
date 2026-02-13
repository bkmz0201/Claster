import { Service } from '@toeverything/infra';
import { Observable } from 'rxjs';
import type { FeatureFlagService } from '../../feature-flag';
import type { WorkspaceService } from '../../workspace';
import type { DocSummaryStore } from '../stores/doc-summary';
export declare class DocSummaryService extends Service {
    private readonly workspaceService;
    private readonly store;
    private readonly featureFlagService;
    constructor(workspaceService: WorkspaceService, store: DocSummaryStore, featureFlagService: FeatureFlagService);
    private readonly docSummaryCache;
    watchDocSummary(docId: string): Observable<string | undefined>;
    private readonly revalidateDocSummaryFromCloud;
    dispose(): void;
}
//# sourceMappingURL=doc-summary.d.ts.map