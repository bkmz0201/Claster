import { Entity, LiveData } from '@toeverything/infra';
import type { WorkspaceServerService } from '../../cloud';
import type { DocsService } from '../../doc';
import type { DocDisplayMetaService } from '../../doc-display-meta';
import type { DocsSearchService } from '../../docs-search';
import type { FeatureFlagService } from '../../feature-flag';
import type { WorkspaceService } from '../../workspace';
import type { QuickSearchSession } from '../providers/quick-search-provider';
import type { QuickSearchItem } from '../types/item';
interface DocsPayload {
    docId: string;
    title?: string;
    blockId?: string | undefined;
    blockContent?: string | undefined;
}
export declare class DocsQuickSearchSession extends Entity implements QuickSearchSession<'docs', DocsPayload> {
    private readonly workspaceService;
    private readonly workspaceServerService;
    private readonly docsSearchService;
    private readonly docsService;
    private readonly docDisplayMetaService;
    private readonly featureFlagService;
    constructor(workspaceService: WorkspaceService, workspaceServerService: WorkspaceServerService, docsSearchService: DocsSearchService, docsService: DocsService, docDisplayMetaService: DocDisplayMetaService, featureFlagService: FeatureFlagService);
    private readonly isSupportServerIndexer;
    private readonly isEnableBatterySaveMode;
    private readonly isIndexerLoading$;
    private readonly isQueryLoading$;
    isCloudWorkspace: boolean;
    searchLocallyItem: QuickSearchItem<"docs", DocsPayload>;
    isLoading$: LiveData<boolean>;
    error$: LiveData<any>;
    lastQuery: string;
    items$: LiveData<QuickSearchItem<"docs", DocsPayload>[]>;
    searchLocally: boolean;
    query: import("@toeverything/infra").Effect<string>;
    dispose(): void;
}
export {};
//# sourceMappingURL=docs.d.ts.map