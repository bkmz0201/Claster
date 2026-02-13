import { Service } from '@toeverything/infra';
import { combineLatest, map } from 'rxjs';
export class CheckboxPropertyOrderByProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    orderBy$(_items$, params) {
        const isDesc = params.desc;
        return combineLatest([
            this.docsService.list.docs$, // We need the complete doc list as docs without property values should default to false
            this.docsService.propertyValues$('custom:' + params.key),
        ]).pipe(map(([docs, values]) => {
            const result = [];
            for (const doc of docs) {
                const value = values.get(doc.id) === 'true' ? true : false;
                result.push([doc.id, value]);
            }
            return result
                .sort((a, b) => (a[1] === b[1] ? 0 : a[1] ? 1 : -1) * (isDesc ? -1 : 1))
                .map(i => i[0]);
        }));
    }
}
//# sourceMappingURL=checkbox.js.map