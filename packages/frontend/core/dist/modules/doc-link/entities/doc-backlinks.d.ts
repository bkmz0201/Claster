import { Entity, LiveData } from '@toeverything/infra';
import type { DocService, DocsService } from '../../doc';
import type { DocsSearchService } from '../../docs-search';
import type { FeatureFlagService } from '../../feature-flag';
import type { WorkspaceService } from '../../workspace';
export interface Backlink {
    docId: string;
    blockId: string;
    title: string;
    noteBlockId?: string;
    displayMode?: string;
    parentBlockId?: string;
    parentFlavour?: string;
    markdownPreview?: string;
}
export declare class DocBacklinks extends Entity {
    private readonly docsSearchService;
    private readonly docService;
    private readonly docsService;
    private readonly featureFlagService;
    private readonly workspaceService;
    constructor(docsSearchService: DocsSearchService, docService: DocService, docsService: DocsService, featureFlagService: FeatureFlagService, workspaceService: WorkspaceService);
    backlinks$: LiveData<Backlink[] | undefined>;
    isLoading$: LiveData<boolean>;
    error$: LiveData<any>;
    revalidateFromCloud: import("@toeverything/infra").Effect<unknown>;
}
//# sourceMappingURL=doc-backlinks.d.ts.map