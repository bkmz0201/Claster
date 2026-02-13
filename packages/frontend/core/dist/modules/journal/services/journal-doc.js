import { Service } from '@toeverything/infra';
export class JournalDocService extends Service {
    constructor(docService, journalService) {
        super();
        this.docService = docService;
        this.journalService = journalService;
        this.journalDate$ = this.journalService.journalDate$(this.docService.doc.id);
    }
    setJournalDate(date) {
        this.journalService.setJournalDate(this.docService.doc.id, date);
    }
}
//# sourceMappingURL=journal-doc.js.map