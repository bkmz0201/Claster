import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class PageWidthFilterProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    filter$(params) {
        const method = params.method;
        if (method === 'is') {
            return this.docsService.propertyValues$('pageWidth').pipe(map(values => {
                const match = new Set();
                for (const [id, value] of values) {
                    if ((value ?? 'standard') === params.value) {
                        match.add(id);
                    }
                }
                return match;
            }));
        }
        else if (method === 'is-not') {
            return this.docsService.propertyValues$('pageWidth').pipe(map(values => {
                const match = new Set();
                for (const [id, value] of values) {
                    if ((value ?? 'standard') !== params.value) {
                        match.add(id);
                    }
                }
                return match;
            }));
        }
        throw new Error(`Unsupported method: ${params.method}`);
    }
}
//# sourceMappingURL=page-width.js.map