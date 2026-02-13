import { Entity, LiveData } from '@toeverything/infra';
import type { WorkspaceDialogService } from '../../dialogs';
import type { DocDisplayMetaService } from '../../doc-display-meta';
import { type JournalService } from '../../journal';
import type { QuickSearchSession } from '../providers/quick-search-provider';
import type { QuickSearchItem } from '../types/item';
type JournalQuickSearchItem = QuickSearchItem<'date-picker', {
    getDocId: () => Promise<string | undefined>;
}>;
export declare class JournalsQuickSearchSession extends Entity implements QuickSearchSession<'date-picker', {
    getDocId: () => Promise<string | undefined>;
}> {
    private readonly journalService;
    private readonly dialogService;
    private readonly docDisplayMetaService;
    constructor(journalService: JournalService, dialogService: WorkspaceDialogService, docDisplayMetaService: DocDisplayMetaService);
    query$: LiveData<string>;
    items$: LiveData<JournalQuickSearchItem[]>;
    query(query: string): void;
}
export {};
//# sourceMappingURL=journals.d.ts.map