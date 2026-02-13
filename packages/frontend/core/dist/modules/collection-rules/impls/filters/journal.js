import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class JournalFilterProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    filter$(params) {
        const method = params.method;
        if (method === 'is') {
            return this.docsService.propertyValues$('journal').pipe(map(values => {
                const match = new Set();
                for (const [id, value] of values) {
                    if (!!value === (params.value === 'true' ? true : false)) {
                        match.add(id);
                    }
                }
                return match;
            }));
        }
        else if (method === 'is-not') {
            return this.docsService.propertyValues$('journal').pipe(map(values => {
                const match = new Set();
                for (const [id, value] of values) {
                    if (!value === (params.value === 'true' ? true : false)) {
                        match.add(id);
                    }
                }
                return match;
            }));
        }
        throw new Error(`Unsupported method: ${params.method}`);
    }
}
//# sourceMappingURL=journal.js.map