import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class NumberPropertyFilterProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    filter$(params) {
        const method = params.method;
        const values$ = this.docsService.propertyValues$('custom:' + params.key);
        const filterValue = Number(params.value);
        if (method === 'is-not-empty') {
            return values$.pipe(map(o => {
                const match = new Set();
                for (const [id, value] of o) {
                    if (value !== undefined && value !== null && value !== '') {
                        match.add(id);
                    }
                }
                return match;
            }));
        }
        else if (method === 'is-empty') {
            return values$.pipe(map(o => {
                const match = new Set();
                for (const [id, value] of o) {
                    if (value === undefined || value === null || value === '') {
                        match.add(id);
                    }
                }
                return match;
            }));
        }
        else if (method === '=' ||
            method === '≠' ||
            method === '>' ||
            method === '<' ||
            method === '≥' ||
            method === '≤') {
            return values$.pipe(map(o => {
                const match = new Set();
                for (const [id, value] of o) {
                    const numValue = Number(value);
                    switch (method) {
                        case '=':
                            if (Math.abs(numValue - filterValue) < Number.EPSILON) {
                                match.add(id);
                            }
                            break;
                        case '≠':
                            if (Math.abs(numValue - filterValue) >= Number.EPSILON) {
                                match.add(id);
                            }
                            break;
                        case '>':
                            if (numValue > filterValue) {
                                match.add(id);
                            }
                            break;
                        case '<':
                            if (numValue < filterValue) {
                                match.add(id);
                            }
                            break;
                        case '≥':
                            if (numValue >= filterValue) {
                                match.add(id);
                            }
                            break;
                        case '≤':
                            if (numValue <= filterValue) {
                                match.add(id);
                            }
                            break;
                    }
                }
                return match;
            }));
        }
        throw new Error(`Unsupported method: ${method}`);
    }
}
//# sourceMappingURL=number.js.map