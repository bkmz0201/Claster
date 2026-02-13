import { Service } from '@toeverything/infra';
import type { DocsService } from '../../doc';
import type { WorkbenchService } from '../../workbench';
import type { QuickSearchService } from './quick-search';
export declare class CMDKQuickSearchService extends Service {
    private readonly quickSearchService;
    private readonly workbenchService;
    private readonly docsService;
    constructor(quickSearchService: QuickSearchService, workbenchService: WorkbenchService, docsService: DocsService);
    toggle(): void;
}
//# sourceMappingURL=cmdk.d.ts.map