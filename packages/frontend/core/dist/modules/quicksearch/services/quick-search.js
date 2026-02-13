import { Service } from '@toeverything/infra';
import { QuickSearch } from '../entities/quick-search';
export class QuickSearchService extends Service {
    constructor() {
        super(...arguments);
        this.quickSearch = this.framework.createEntity(QuickSearch);
    }
}
//# sourceMappingURL=quick-search.js.map