import { Service } from '@toeverything/infra';
import { switchMap } from 'rxjs';
import { OrderByProvider } from '../../provider';
export class PropertyOrderByProvider extends Service {
    constructor(workspacePropertyService) {
        super();
        this.workspacePropertyService = workspacePropertyService;
    }
    orderBy$(items$, params) {
        const property$ = this.workspacePropertyService.propertyInfo$(params.key);
        return property$.pipe(switchMap(property => {
            if (!property) {
                throw new Error('Unknown property');
            }
            const type = property.type;
            const provider = this.framework.getOptional(OrderByProvider('property:' + type));
            if (!provider) {
                throw new Error('Unsupported property type');
            }
            return provider.orderBy$(items$, params);
        }));
    }
}
//# sourceMappingURL=property.js.map