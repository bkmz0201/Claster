import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class TitleOrderByProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    orderBy$(_items$, params) {
        const isDesc = params.desc;
        return this.docsService.allDocTitle$().pipe(map(o => {
            return o
                .sort((a, b) => (a.title === b.title ? 0 : a.title > b.title ? 1 : -1) *
                (isDesc ? -1 : 1))
                .map(i => i.id);
        }));
    }
}
//# sourceMappingURL=title.js.map