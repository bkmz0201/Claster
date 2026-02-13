import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class TextPropertyOrderByProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    orderBy$(_items$, params) {
        const isDesc = params.desc;
        return this.docsService.propertyValues$('custom:' + params.key).pipe(map(o => {
            return Array.from(o)
                .filter((i) => !!i[1]) // filter empty value
                .sort((a, b) => (a[1] === b[1] ? 0 : a[1] > b[1] ? 1 : -1) * (isDesc ? -1 : 1))
                .map(i => i[0]);
        }));
    }
}
//# sourceMappingURL=text.js.map