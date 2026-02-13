import { Service } from '@toeverything/infra';
import { FindInPage } from '../entities/find-in-page';
export class FindInPageService extends Service {
    constructor() {
        super(...arguments);
        this.findInPage = this.framework.createEntity(FindInPage);
    }
}
//# sourceMappingURL=find-in-page.js.map