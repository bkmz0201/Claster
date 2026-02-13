import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class CheckboxPropertyFilterProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    filter$(params) {
        const method = params.method;
        if (method === 'is') {
            return this.docsService.propertyValues$('custom:' + params.key).pipe(map(o => {
                const match = new Set();
                for (const [id, value] of o) {
                    if ((value === 'true' ? 'true' : 'false') === params.value) {
                        match.add(id);
                    }
                }
                return match;
            }));
        }
        if (method === 'is-not') {
            return this.docsService.propertyValues$('custom:' + params.key).pipe(map(o => {
                const match = new Set();
                for (const [id, value] of o) {
                    if ((value === 'true' ? 'true' : 'false') !== params.value) {
                        match.add(id);
                    }
                }
                return match;
            }));
        }
        throw new Error(`Unsupported method: ${params.method}`);
    }
}
//# sourceMappingURL=checkbox.js.map