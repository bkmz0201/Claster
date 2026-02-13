import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class DocPrimaryModeOrderByProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    orderBy$(_items$, params) {
        return this.docsService.propertyValues$('primaryMode').pipe(map(values => {
            const docs = Array.from(values).map(([id, value]) => ({
                id,
                mode: value ?? 'page',
            }));
            if (params.desc) {
                return docs
                    .sort((a, b) => b.mode.localeCompare(a.mode))
                    .map(doc => doc.id);
            }
            else {
                return docs
                    .sort((a, b) => a.mode.localeCompare(b.mode))
                    .map(doc => doc.id);
            }
        }));
    }
}
//# sourceMappingURL=doc-primary-mode.js.map