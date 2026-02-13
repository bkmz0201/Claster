import { Service } from '@toeverything/infra';
import {} from 'rxjs';
import { FilterProvider } from '../../provider';
export class SystemFilterProvider extends Service {
    filter$(params) {
        const provider = this.framework.getOptional(FilterProvider('system:' + params.key));
        if (!provider) {
            throw new Error('Unsupported system filter: ' + params.key);
        }
        return provider.filter$(params);
    }
}
//# sourceMappingURL=system.js.map