import { LiveData, Store } from '@toeverything/infra';
import type { Observable } from 'rxjs';
import type { DocsService } from '../../doc';
export declare class JournalStore extends Store {
    private readonly docsService;
    constructor(docsService: DocsService);
    allJournalDates$: LiveData<Set<string | null | undefined>>;
    watchDocJournalDate(docId: string): Observable<string | undefined>;
    setDocJournalDate(docId: string, date: string): void;
    removeDocJournalDate(docId: string): void;
    getDocsByJournalDate(date: string): import("../../doc").DocRecord[];
    docsByJournalDate$(date: string): LiveData<import("../../doc").DocRecord[]>;
}
//# sourceMappingURL=journal.d.ts.map