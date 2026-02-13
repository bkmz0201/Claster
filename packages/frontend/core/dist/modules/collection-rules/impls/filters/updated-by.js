import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class UpdatedByFilterProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    filter$(params) {
        const method = params.method;
        if (method === 'include') {
            const userIds = params.value?.split(',').filter(Boolean) ?? [];
            return this.docsService.propertyValues$('updatedBy').pipe(map(o => {
                const match = new Set();
                for (const [id, value] of o) {
                    if (value && userIds.includes(value)) {
                        match.add(id);
                    }
                }
                return match;
            }));
        }
        throw new Error(`Unsupported method: ${params.method}`);
    }
}
//# sourceMappingURL=updated-by.js.map