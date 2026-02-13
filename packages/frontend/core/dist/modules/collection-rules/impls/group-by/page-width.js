import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class PageWidthGroupByProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    groupBy$(_items$, _params) {
        return this.docsService.propertyValues$('pageWidth').pipe(map(values => {
            const result = new Map();
            for (const [id, value] of values) {
                const pageWidth = value ?? 'standard';
                if (!result.has(pageWidth)) {
                    result.set(pageWidth, new Set([id]));
                }
                else {
                    result.get(pageWidth)?.add(id);
                }
            }
            return result;
        }));
    }
}
//# sourceMappingURL=page-width.js.map