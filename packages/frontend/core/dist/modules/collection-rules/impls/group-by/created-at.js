import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class CreatedAtGroupByProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    groupBy$(_items$, _params) {
        return this.docsService.allDocsCreatedDate$().pipe(map(docs => {
            const result = new Map();
            docs.forEach(doc => {
                if (!doc.createDate) {
                    return;
                }
                const date = new Date(doc.createDate);
                const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                if (!result.has(formattedDate)) {
                    result.set(formattedDate, new Set([doc.id]));
                }
                else {
                    result.get(formattedDate)?.add(doc.id);
                }
            });
            return result;
        }));
    }
}
//# sourceMappingURL=created-at.js.map