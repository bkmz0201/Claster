import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
import { basicDateFilter } from './date';
export class UpdatedAtFilterProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    filter$(params) {
        return this.docsService.allDocsUpdatedDate$().pipe(map(docs => new Map(docs.map(doc => [doc.id, doc.updatedDate]))), basicDateFilter(params));
    }
}
//# sourceMappingURL=updated-at.js.map