import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class JournalGroupByProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    groupBy$(_items$, _params) {
        return this.docsService.propertyValues$('journal').pipe(map(values => {
            const result = new Map();
            for (const [id, value] of values) {
                const isJournal = value ? 'true' : 'false';
                if (!result.has(isJournal)) {
                    result.set(isJournal, new Set([id]));
                }
                else {
                    result.get(isJournal)?.add(id);
                }
            }
            return result;
        }));
    }
}
//# sourceMappingURL=journal.js.map