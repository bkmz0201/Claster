import { Service } from '@toeverything/infra';
import { switchMap } from 'rxjs';
import { FilterProvider } from '../../provider';
export class PropertyFilterProvider extends Service {
    constructor(workspacePropertyService) {
        super();
        this.workspacePropertyService = workspacePropertyService;
    }
    filter$(params) {
        const property$ = this.workspacePropertyService.propertyInfo$(params.key);
        return property$.pipe(switchMap(property => {
            if (!property) {
                throw new Error('Unknown property');
            }
            const type = property.type;
            const provider = this.framework.getOptional(FilterProvider('property:' + type));
            if (!provider) {
                throw new Error(`Unsupported property type: ${type}`);
            }
            return provider.filter$(params);
        }));
    }
}
//# sourceMappingURL=property.js.map