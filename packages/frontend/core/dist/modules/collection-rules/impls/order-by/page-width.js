import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class PageWidthOrderByProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    orderBy$(_items$, params) {
        return this.docsService.propertyValues$('pageWidth').pipe(map(values => {
            const docs = Array.from(values).map(([id, value]) => ({
                id,
                width: value ?? 'standard',
            }));
            if (params.desc) {
                return docs
                    .sort((a, b) => b.width.localeCompare(a.width))
                    .map(doc => doc.id);
            }
            else {
                return docs
                    .sort((a, b) => a.width.localeCompare(b.width))
                    .map(doc => doc.id);
            }
        }));
    }
}
//# sourceMappingURL=page-width.js.map