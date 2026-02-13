import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class EdgelessThemeGroupByProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    groupBy$(_items$, _params) {
        return this.docsService.propertyValues$('edgelessColorTheme').pipe(map(values => {
            const result = new Map();
            for (const [id, value] of values) {
                const theme = value ?? 'system';
                if (!result.has(theme)) {
                    result.set(theme, new Set([id]));
                }
                else {
                    result.get(theme)?.add(id);
                }
            }
            return result;
        }));
    }
}
//# sourceMappingURL=edgeless-theme.js.map