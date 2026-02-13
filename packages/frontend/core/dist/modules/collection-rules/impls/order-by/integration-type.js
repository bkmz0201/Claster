import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class IntegrationTypeOrderByProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    orderBy$(_items$, params) {
        return this.docsService.propertyValues$('integrationType').pipe(map(values => {
            const docs = Array.from(values)
                .filter(([, value]) => value !== undefined)
                .map(([id, value]) => ({
                id,
                type: value,
            }));
            if (params.desc) {
                return docs
                    .sort((a, b) => b.type.localeCompare(a.type))
                    .map(doc => doc.id);
            }
            else {
                return docs
                    .sort((a, b) => a.type.localeCompare(b.type))
                    .map(doc => doc.id);
            }
        }));
    }
}
//# sourceMappingURL=integration-type.js.map