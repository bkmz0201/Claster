import { Service } from '@toeverything/infra';
import { OrderByProvider } from '../../provider';
export class SystemOrderByProvider extends Service {
    orderBy$(items$, params) {
        const provider = this.framework.getOptional(OrderByProvider('system:' + params.key));
        if (!provider) {
            throw new Error('Unsupported system order by: ' + params.key);
        }
        return provider.orderBy$(items$, params);
    }
}
//# sourceMappingURL=system.js.map