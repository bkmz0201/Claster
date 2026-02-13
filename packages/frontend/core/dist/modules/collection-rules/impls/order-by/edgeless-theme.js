import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class EdgelessThemeOrderByProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    orderBy$(_items$, params) {
        return this.docsService.propertyValues$('edgelessColorTheme').pipe(map(values => {
            const docs = Array.from(values).map(([id, value]) => ({
                id,
                theme: value ?? 'system',
            }));
            if (params.desc) {
                return docs
                    .sort((a, b) => b.theme.localeCompare(a.theme))
                    .map(doc => doc.id);
            }
            else {
                return docs
                    .sort((a, b) => a.theme.localeCompare(b.theme))
                    .map(doc => doc.id);
            }
        }));
    }
}
//# sourceMappingURL=edgeless-theme.js.map