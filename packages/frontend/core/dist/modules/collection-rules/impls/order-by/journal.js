import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class JournalOrderByProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    orderBy$(_items$, params) {
        const isDesc = params.desc;
        return this.docsService.propertyValues$('journal').pipe(map(values => {
            return Array.from(values)
                .map(([id, value]) => ({
                id,
                isJournal: !!value,
            }))
                .sort((a, b) => {
                if (a.isJournal === b.isJournal) {
                    return 0;
                }
                return (a.isJournal ? 1 : -1) * (isDesc ? -1 : 1);
            })
                .map(doc => doc.id);
        }));
    }
}
//# sourceMappingURL=journal.js.map