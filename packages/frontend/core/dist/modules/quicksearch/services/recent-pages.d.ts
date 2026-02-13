import { Service } from '@toeverything/infra';
import type { DocRecord, DocsService } from '../../doc';
import type { WorkspaceLocalState } from '../../workspace';
export declare class RecentDocsService extends Service {
    private readonly localState;
    private readonly docsService;
    constructor(localState: WorkspaceLocalState, docsService: DocsService);
    addRecentDoc(pageId: string): void;
    getRecentDocs(): DocRecord[];
    private getRecentDocIds;
}
//# sourceMappingURL=recent-pages.d.ts.map