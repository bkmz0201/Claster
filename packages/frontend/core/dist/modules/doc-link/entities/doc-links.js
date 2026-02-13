import { Entity, LiveData } from '@toeverything/infra';
export class DocLinks extends Entity {
    constructor(docsSearchService, docService) {
        super();
        this.docsSearchService = docsSearchService;
        this.docService = docService;
        this.links$ = LiveData.from(this.docsSearchService.watchRefsFrom(this.docService.doc.id), []);
    }
}
//# sourceMappingURL=doc-links.js.map