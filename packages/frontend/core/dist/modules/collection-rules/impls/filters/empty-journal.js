import { Service } from '@toeverything/infra';
import { combineLatest, map } from 'rxjs';
export class EmptyJournalFilterProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    filter$(params) {
        return combineLatest([
            this.docsService.allDocsUpdatedDate$(),
            this.docsService.propertyValues$('journal'),
        ]).pipe(map(([updatedAts, journalValues]) => {
            const match = new Set();
            for (const { id, updatedDate } of updatedAts) {
                const isJournal = journalValues.get(id);
                const isEmptyJournal = updatedDate === undefined && isJournal;
                if ((params.value === 'false' && !isEmptyJournal) ||
                    (params.value === 'true' && isEmptyJournal)) {
                    match.add(id);
                }
            }
            return match;
        }));
    }
}
//# sourceMappingURL=empty-journal.js.map