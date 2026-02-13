import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class TitleFilterProvider extends Service {
    constructor(docsSearchService) {
        super();
        this.docsSearchService = docsSearchService;
    }
    filter$(params) {
        const method = params.method;
        if (method === 'match') {
            return this.docsSearchService
                .searchTitle$(params.value ?? '')
                .pipe(map(list => new Set(list)));
        }
        throw new Error(`Unsupported method: ${params.method}`);
    }
}
//# sourceMappingURL=title.js.map