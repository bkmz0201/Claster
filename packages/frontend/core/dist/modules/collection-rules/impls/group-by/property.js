import { Service } from '@toeverything/infra';
import { switchMap } from 'rxjs';
import { GroupByProvider } from '../../provider';
export class PropertyGroupByProvider extends Service {
    constructor(workspacePropertyService) {
        super();
        this.workspacePropertyService = workspacePropertyService;
    }
    groupBy$(items$, params) {
        const property$ = this.workspacePropertyService.propertyInfo$(params.key);
        return property$.pipe(switchMap(property => {
            if (!property) {
                throw new Error('Unknown property');
            }
            const type = property.type;
            const provider = this.framework.getOptional(GroupByProvider('property:' + type));
            if (!provider) {
                throw new Error('Unsupported property type');
            }
            return provider.groupBy$(items$, params);
        }));
    }
}
//# sourceMappingURL=property.js.map