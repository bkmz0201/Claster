import { Service } from '@toeverything/infra';
import { GlobalContext } from '../entities/global-context';
export class GlobalContextService extends Service {
    constructor() {
        super(...arguments);
        this.globalContext = this.framework.createEntity(GlobalContext);
    }
}
//# sourceMappingURL=global-context.js.map