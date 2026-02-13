import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class CheckboxPropertyGroupByProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    groupBy$(_items$, params) {
        return this.docsService.propertyValues$('custom:' + params.key).pipe(map(values => {
            const result = new Map();
            for (const [id, value] of values) {
                // Treat undefined or any non-true value as false for checkbox grouping
                const v = value === 'true' ? 'true' : 'false';
                const set = result.get(v) ?? new Set();
                set.add(id);
                result.set(v, set);
            }
            return result;
        }));
    }
}
//# sourceMappingURL=checkbox.js.map