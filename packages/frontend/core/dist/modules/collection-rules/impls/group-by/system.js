import { Service } from '@toeverything/infra';
import { GroupByProvider } from '../../provider';
export class SystemGroupByProvider extends Service {
    groupBy$(items$, params) {
        const provider = this.framework.getOptional(GroupByProvider('system:' + params.key));
        if (!provider) {
            throw new Error('Unsupported system group by: ' + params.key);
        }
        return provider.groupBy$(items$, params);
    }
}
//# sourceMappingURL=system.js.map