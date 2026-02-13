import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class TemplateOrderByProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    orderBy$(_items$, params) {
        return this.docsService.propertyValues$('isTemplate').pipe(map(values => {
            const docs = Array.from(values).map(([id, value]) => ({
                id,
                isTemplate: value ? 'true' : 'false',
            }));
            if (params.desc) {
                return docs
                    .sort((a, b) => b.isTemplate.localeCompare(a.isTemplate))
                    .map(doc => doc.id);
            }
            else {
                return docs
                    .sort((a, b) => a.isTemplate.localeCompare(b.isTemplate))
                    .map(doc => doc.id);
            }
        }));
    }
}
//# sourceMappingURL=template.js.map