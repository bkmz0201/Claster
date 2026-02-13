import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class NumberPropertyOrderByProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    orderBy$(_items$, params) {
        const isDesc = params.desc;
        return this.docsService.propertyValues$('custom:' + params.key).pipe(map(o => {
            return Array.from(o)
                .map(v => [v[0], Number(v[1])])
                .filter((i) => !Number.isNaN(i[1])) // filter NaN value
                .sort((a, b) => (a[1] - b[1]) * (isDesc ? -1 : 1))
                .map(i => i[0]);
        }));
    }
}
//# sourceMappingURL=number.js.map