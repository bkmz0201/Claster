import { LiveData, Service } from '@toeverything/infra';
import dayjs from 'dayjs';
export const JOURNAL_DATE_FORMAT = 'YYYY-MM-DD';
export class JournalService extends Service {
    constructor(store, docsService, templateDocService) {
        super();
        this.store = store;
        this.docsService = docsService;
        this.templateDocService = templateDocService;
        this.allJournalDates$ = this.store.allJournalDates$;
    }
    journalDate$(docId) {
        return LiveData.from(this.store.watchDocJournalDate(docId), undefined);
    }
    journalToday$(docId) {
        return LiveData.computed(get => {
            const date = get(this.journalDate$(docId));
            if (!date)
                return false;
            return dayjs(date).isSame(dayjs(), 'day');
        });
    }
    setJournalDate(docId, date) {
        this.store.setDocJournalDate(docId, date);
    }
    removeJournalDate(docId) {
        this.store.removeDocJournalDate(docId);
    }
    journalsByDate$(date) {
        return this.store.docsByJournalDate$(date);
    }
    createJournal(maybeDate) {
        const day = dayjs(maybeDate);
        const title = day.format(JOURNAL_DATE_FORMAT);
        const docRecord = this.docsService.createDoc({
            title,
        });
        // set created date to match the journal date
        docRecord.setMeta({
            createDate: dayjs()
                .set('year', day.year())
                .set('month', day.month())
                .set('date', day.date())
                .toDate()
                .getTime(),
        });
        const enablePageTemplate = this.templateDocService.setting.enablePageTemplate$.value;
        const pageTemplateDocId = this.templateDocService.setting.pageTemplateDocId$.value;
        const journalTemplateDocId = this.templateDocService.setting.journalTemplateDocId$.value;
        // if journal template configured
        if (journalTemplateDocId) {
            this.docsService
                .duplicateFromTemplate(journalTemplateDocId, docRecord.id)
                .catch(console.error);
        }
        // journal template not configured, use page template
        else if (enablePageTemplate && pageTemplateDocId) {
            this.docsService
                .duplicateFromTemplate(pageTemplateDocId, docRecord.id)
                .catch(console.error);
        }
        this.setJournalDate(docRecord.id, title);
        return docRecord;
    }
    ensureJournalByDate(maybeDate) {
        const day = dayjs(maybeDate);
        const title = day.format(JOURNAL_DATE_FORMAT);
        const docs = this.journalsByDate$(title).value;
        if (docs.length)
            return docs[0];
        return this.createJournal(maybeDate);
    }
}
//# sourceMappingURL=journal.js.map