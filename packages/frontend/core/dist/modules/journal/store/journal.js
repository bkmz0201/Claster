import { LiveData, Store } from '@toeverything/infra';
function isJournalString(j) {
    return j ? !!j?.match(/^\d{4}-\d{2}-\d{2}$/) : false;
}
export class JournalStore extends Store {
    constructor(docsService) {
        super();
        this.docsService = docsService;
        this.allJournalDates$ = LiveData.computed(get => {
            return new Set(get(this.docsService.list.docs$)
                .filter(doc => {
                const journal = get(doc.properties$.selector(p => p.journal));
                return !!journal && isJournalString(journal);
            })
                .map(doc => get(doc.properties$.selector(p => p.journal))));
        });
    }
    watchDocJournalDate(docId) {
        return LiveData.computed(get => {
            const doc = get(this.docsService.list.doc$(docId));
            if (!doc) {
                // if doc not exists
                return undefined;
            }
            const journal = get(doc.properties$.selector(p => p.journal));
            if (journal && !isJournalString(journal)) {
                return undefined;
            }
            return journal ?? undefined;
        });
    }
    setDocJournalDate(docId, date) {
        const doc = this.docsService.list.doc$(docId).value;
        if (!doc) {
            // doc not exists, do nothing
            return;
        }
        doc.setProperty('journal', date);
    }
    removeDocJournalDate(docId) {
        this.setDocJournalDate(docId, '');
    }
    getDocsByJournalDate(date) {
        return this.docsService.list.docs$.value.filter(doc => doc.properties$.value.journal === date);
    }
    docsByJournalDate$(date) {
        return LiveData.computed(get => {
            return get(this.docsService.list.docs$).filter(doc => {
                const journal = get(doc.properties$.selector(p => p.journal));
                return journal === date;
            });
        });
    }
}
//# sourceMappingURL=journal.js.map