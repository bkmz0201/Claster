import { onStart, Service } from '@toeverything/infra';
import { combineLatest, map, of } from 'rxjs';
export class SharedFilterProvider extends Service {
    constructor(shareDocsListService, docsService) {
        super();
        this.shareDocsListService = shareDocsListService;
        this.docsService = docsService;
    }
    filter$(params) {
        const method = params.method;
        if (method === 'is') {
            return combineLatest([
                this.shareDocsListService.shareDocs?.list$ ??
                    of([]),
                this.docsService.allDocIds$(),
            ]).pipe(onStart(() => {
                this.shareDocsListService.shareDocs?.revalidate();
            }), map(([shareDocsList, allDocIds]) => {
                const shareDocIds = new Set(shareDocsList.map(item => item.id));
                if (params.value === 'true') {
                    return shareDocIds;
                }
                else if (params.value === 'false') {
                    const notShareDocIds = new Set();
                    for (const id of allDocIds) {
                        if (!shareDocIds.has(id)) {
                            notShareDocIds.add(id);
                        }
                    }
                    return notShareDocIds;
                }
                else {
                    throw new Error(`Unsupported value: ${params.value}`);
                }
            }));
        }
        throw new Error(`Unsupported method: ${params.method}`);
    }
}
//# sourceMappingURL=shared.js.map