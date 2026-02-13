import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class TextPropertyFilterProvider extends Service {
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
                    if (value === params.value) {
                        match.add(id);
                    }
                }
                return match;
            }));
        }
        else if (method === 'is-not') {
            return this.docsService.propertyValues$('custom:' + params.key).pipe(map(o => {
                const match = new Set();
                for (const [id, value] of o) {
                    if (value !== params.value) {
                        match.add(id);
                    }
                }
                return match;
            }));
        }
        else if (method === 'is-not-empty') {
            return this.docsService.propertyValues$('custom:' + params.key).pipe(map(o => {
                const match = new Set();
                for (const [id, value] of o) {
                    if (value) {
                        match.add(id);
                    }
                }
                return match;
            }));
        }
        else if (method === 'is-empty') {
            return this.docsService.propertyValues$('custom:' + params.key).pipe(map(o => {
                const match = new Set();
                for (const [id, value] of o) {
                    if (!value) {
                        match.add(id);
                    }
                }
                return match;
            }));
        }
        throw new Error(`Unsupported method: ${method}`);
    }
}
//# sourceMappingURL=text.js.map