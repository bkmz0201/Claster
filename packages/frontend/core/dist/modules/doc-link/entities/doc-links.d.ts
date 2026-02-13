import { Entity, LiveData } from '@toeverything/infra';
import type { DocService } from '../../doc';
import type { DocsSearchService } from '../../docs-search';
export interface Link {
    docId: string;
    title: string;
    params?: URLSearchParams;
}
export declare class DocLinks extends Entity {
    private readonly docsSearchService;
    private readonly docService;
    constructor(docsSearchService: DocsSearchService, docService: DocService);
    links$: LiveData<Link[]>;
}
//# sourceMappingURL=doc-links.d.ts.map