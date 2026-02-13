import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class TrashFilterProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    filter$(params) {
        if (params.value === 'true') {
            return this.docsService.allTrashDocIds$().pipe(map(ids => new Set(ids)));
        }
        else {
            return this.docsService
                .allNonTrashDocIds$()
                .pipe(map(ids => new Set(ids)));
        }
    }
}
//# sourceMappingURL=trash.js.map