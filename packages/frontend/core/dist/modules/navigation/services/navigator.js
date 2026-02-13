import { Service } from '@toeverything/infra';
import { Navigator } from '../entities/navigator';
export class NavigatorService extends Service {
    constructor() {
        super(...arguments);
        this.navigator = this.framework.createEntity(Navigator);
    }
}
//# sourceMappingURL=navigator.js.map