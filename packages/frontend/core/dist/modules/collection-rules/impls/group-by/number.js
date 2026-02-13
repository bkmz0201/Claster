import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class NumberPropertyGroupByProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    groupBy$(_items$, params) {
        return this.docsService.propertyValues$('custom:' + params.key).pipe(map(o => {
            const result = new Map();
            for (const [id, value] of o) {
                const number = Number(value);
                if (Number.isNaN(number)) {
                    continue;
                }
                // normalize all number to string
                const strValue = String(number);
                const set = result.get(strValue) ?? new Set();
                set.add(id);
                result.set(strValue, set);
            }
            return result;
        }));
    }
}
//# sourceMappingURL=number.js.map