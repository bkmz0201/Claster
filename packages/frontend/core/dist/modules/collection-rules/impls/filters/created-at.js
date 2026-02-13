import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
import { basicDateFilter } from './date';
export class CreatedAtFilterProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    filter$(params) {
        return this.docsService.allDocsCreatedDate$().pipe(map(docs => new Map(docs.map(doc => [doc.id, doc.createDate]))), basicDateFilter(params));
    }
}
//# sourceMappingURL=created-at.js.map