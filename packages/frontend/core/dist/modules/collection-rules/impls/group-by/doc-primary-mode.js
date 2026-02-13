import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class DocPrimaryModeGroupByProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    groupBy$(_items$, _params) {
        return this.docsService.propertyValues$('primaryMode').pipe(map(values => {
            const result = new Map();
            for (const [id, value] of values) {
                const mode = value ?? 'page';
                if (!result.has(mode)) {
                    result.set(mode, new Set([id]));
                }
                else {
                    result.get(mode)?.add(id);
                }
            }
            return result;
        }));
    }
}
//# sourceMappingURL=doc-primary-mode.js.map