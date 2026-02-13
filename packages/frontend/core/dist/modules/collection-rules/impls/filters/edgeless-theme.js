import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class EdgelessThemeFilterProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    filter$(params) {
        const method = params.method;
        if (method === 'is') {
            return this.docsService.propertyValues$('edgelessColorTheme').pipe(map(values => {
                const match = new Set();
                for (const [id, value] of values) {
                    if ((value ?? 'system') === params.value) {
                        match.add(id);
                    }
                }
                return match;
            }));
        }
        else if (method === 'is-not') {
            return this.docsService.propertyValues$('edgelessColorTheme').pipe(map(values => {
                const match = new Set();
                for (const [id, value] of values) {
                    if ((value ?? 'system') !== params.value) {
                        match.add(id);
                    }
                }
                return match;
            }));
        }
        throw new Error(`Unsupported method: ${params.method}`);
    }
}
//# sourceMappingURL=edgeless-theme.js.map