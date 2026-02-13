import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class UpdatedAtOrderByProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    orderBy$(_items$, params) {
        return this.docsService.allDocsUpdatedDate$().pipe(map(docs => {
            if (params.desc) {
                return docs
                    .filter(doc => doc.updatedDate)
                    .sort((a, b) => (b.updatedDate ?? 0) - (a.updatedDate ?? 0))
                    .map(doc => doc.id);
            }
            else {
                return docs
                    .filter(doc => doc.updatedDate)
                    .sort((a, b) => (a.updatedDate ?? 0) - (b.updatedDate ?? 0))
                    .map(doc => doc.id);
            }
        }));
    }
}
//# sourceMappingURL=updated-at.js.map