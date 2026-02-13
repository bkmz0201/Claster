import type { ReferenceParams } from '@blocksuite/affine/model';
import { Entity, LiveData } from '@toeverything/infra';
import type { DocsService } from '../../doc';
import type { DocDisplayMetaService } from '../../doc-display-meta';
import type { WorkspaceService } from '../../workspace';
import type { QuickSearchSession } from '../providers/quick-search-provider';
import type { QuickSearchItem } from '../types/item';
type LinkPayload = {
    docId: string;
} & ReferenceParams;
export declare class LinksQuickSearchSession extends Entity implements QuickSearchSession<'link', LinkPayload> {
    private readonly workspaceService;
    private readonly docsService;
    private readonly docDisplayMetaService;
    constructor(workspaceService: WorkspaceService, docsService: DocsService, docDisplayMetaService: DocDisplayMetaService);
    query$: LiveData<string>;
    items$: LiveData<QuickSearchItem<"link", LinkPayload>[]>;
    query(query: string): void;
}
export {};
//# sourceMappingURL=links.d.ts.map