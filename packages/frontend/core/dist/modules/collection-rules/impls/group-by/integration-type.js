import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class IntegrationTypeGroupByProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    groupBy$(_items$, _params) {
        return this.docsService.propertyValues$('integrationType').pipe(map(values => {
            const result = new Map();
            for (const [id, value] of values) {
                const integrationType = value;
                if (!integrationType) {
                    continue;
                }
                if (!result.has(integrationType)) {
                    result.set(integrationType, new Set([id]));
                }
                else {
                    result.get(integrationType)?.add(id);
                }
            }
            return result;
        }));
    }
}
//# sourceMappingURL=integration-type.js.map