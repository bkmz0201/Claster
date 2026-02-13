import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class UpdatedByGroupByProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    groupBy$(_items$, _params) {
        return this.docsService.propertyValues$('updatedBy').pipe(map(o => {
            const result = new Map();
            for (const [id, value] of o) {
                if (value === undefined) {
                    continue;
                }
                const set = result.get(value) ?? new Set();
                set.add(id);
                result.set(value, set);
            }
            return result;
        }));
    }
}
//# sourceMappingURL=updated-by.js.map