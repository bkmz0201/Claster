import { LiveData, Service } from '@toeverything/infra';
import type { DocsService } from '../../doc';
import type { TemplateDocService } from '../../template-doc';
import type { JournalStore } from '../store/journal';
export type MaybeDate = Date | string | number;
export declare const JOURNAL_DATE_FORMAT = "YYYY-MM-DD";
export declare class JournalService extends Service {
    private readonly store;
    private readonly docsService;
    private readonly templateDocService;
    constructor(store: JournalStore, docsService: DocsService, templateDocService: TemplateDocService);
    allJournalDates$: LiveData<Set<string | null | undefined>>;
    journalDate$(docId: string): LiveData<string | undefined>;
    journalToday$(docId: string): LiveData<boolean>;
    setJournalDate(docId: string, date: string): void;
    removeJournalDate(docId: string): void;
    journalsByDate$(date: string): LiveData<import("../../doc").DocRecord[]>;
    private createJournal;
    ensureJournalByDate(maybeDate: MaybeDate): import("../../doc").DocRecord;
}
//# sourceMappingURL=journal.d.ts.map