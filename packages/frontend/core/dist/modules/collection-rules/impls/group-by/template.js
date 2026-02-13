import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class TemplateGroupByProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    groupBy$(_items$, _params) {
        return this.docsService.propertyValues$('isTemplate').pipe(map(values => {
            const result = new Map();
            for (const [id, value] of values) {
                const isTemplate = value ? 'true' : 'false';
                if (!result.has(isTemplate)) {
                    result.set(isTemplate, new Set([id]));
                }
                else {
                    result.get(isTemplate)?.add(id);
                }
            }
            return result;
        }));
    }
}
//# sourceMappingURL=template.js.map