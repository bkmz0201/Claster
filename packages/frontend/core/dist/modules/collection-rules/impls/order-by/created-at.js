import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class CreatedAtOrderByProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    orderBy$(_items$, params) {
        return this.docsService.allDocsCreatedDate$().pipe(map(docs => {
            if (params.desc) {
                return docs
                    .sort((a, b) => (b.createDate ?? 0) - (a.createDate ?? 0))
                    .map(doc => doc.id);
            }
            else {
                return docs
                    .sort((a, b) => (a.createDate ?? 0) - (b.createDate ?? 0))
                    .map(doc => doc.id);
            }
        }));
    }
}
//# sourceMappingURL=created-at.js.map