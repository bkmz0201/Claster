import { Entity, LiveData } from '@toeverything/infra';
import type { WorkspaceService } from '../../workspace';
import type { QuickSearchSession } from '../providers/quick-search-provider';
import type { QuickSearchItem } from '../types/item';
type ExternalLinkPayload = {
    url: string;
};
export declare class ExternalLinksQuickSearchSession extends Entity implements QuickSearchSession<'external-link', ExternalLinkPayload> {
    private readonly workspaceService;
    constructor(workspaceService: WorkspaceService);
    query$: LiveData<string>;
    items$: LiveData<QuickSearchItem<"external-link", ExternalLinkPayload>[]>;
    query(query: string): void;
}
export {};
//# sourceMappingURL=external-links.d.ts.map