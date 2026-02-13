import { Service } from '@toeverything/infra';
import type { DocService } from '../../doc';
import type { JournalService } from './journal';
export declare class JournalDocService extends Service {
    private readonly docService;
    private readonly journalService;
    constructor(docService: DocService, journalService: JournalService);
    readonly journalDate$: import("@toeverything/infra").LiveData<string | undefined>;
    setJournalDate(date: string): void;
}
//# sourceMappingURL=journal-doc.d.ts.map